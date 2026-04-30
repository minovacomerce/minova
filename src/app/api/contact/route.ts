import { NextResponse } from "next/server";
import { z } from "zod";

// Simple in-memory rate limit. Production should swap this for a proper
// store (Vercel KV, Upstash, Redis…), but this is enough to slow down
// scraped resubmissions on a single instance.
const HITS = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().max(60).optional().or(z.literal("")),
  subject: z.enum(["sourcing", "distribution", "brokerage", "general"]),
  volume: z.enum(["below_10k", "10k_100k", "100k_1m", "above_1m", "undefined"]),
  message: z.string().min(1).max(5000),
  // Honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

function stripTags(input: string) {
  return input.replace(/<\/?[a-z][^>]*>/gi, "");
}

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = HITS.get(ip);
  if (entry && now - entry.ts < WINDOW_MS) {
    if (entry.count >= MAX_PER_WINDOW) {
      return NextResponse.json(
        { ok: false, error: "rate_limited" },
        { status: 429 }
      );
    }
    entry.count += 1;
  } else {
    HITS.set(ip, { count: 1, ts: now });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 }
    );
  }

  // Honeypot filled → bot. Pretend success and silently drop the message.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Sanitize before any downstream use (email send, store, etc.)
  const safe = {
    name: stripTags(parsed.data.name),
    company: stripTags(parsed.data.company),
    email: parsed.data.email,
    phone: parsed.data.phone ? stripTags(parsed.data.phone) : "",
    subject: parsed.data.subject,
    volume: parsed.data.volume,
    message: stripTags(parsed.data.message),
  };

  // For now we just log on the server — real delivery (transactional email,
  // CRM webhook) is wired in via env vars later. The endpoint already returns
  // the right success shape so the client UI works end-to-end.
  console.info("[contact] received", {
    ip,
    company: safe.company,
    subject: safe.subject,
    volume: safe.volume,
    msgLen: safe.message.length,
  });

  return NextResponse.json({ ok: true });
}

export const runtime = "nodejs";
