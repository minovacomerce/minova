import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import {
  buildConfirmationEmail,
  buildInquiryEmail,
  type ContactPayload,
} from "@/lib/email-templates";

export const runtime = "nodejs";

/* -------------------------------------------------------------------------- */
/*                                rate limiting                                */
/* -------------------------------------------------------------------------- */

// Simple per-IP cooldown. In-memory only, so it survives just one Vercel
// instance — enough to make casual scraping painful. Promote to Upstash KV
// for distributed enforcement when traffic warrants it.
const SUBMISSION_COOLDOWN_MS = 30_000;
const lastSubmitByIp = new Map<string, number>();

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* -------------------------------------------------------------------------- */
/*                                  schema                                    */
/* -------------------------------------------------------------------------- */

const SubjectEnum = z.enum([
  "sourcing",
  "distribution",
  "brokerage",
  "partnership",
  "other",
]);

// Loose phone pattern — digits, spaces, +, parens, hyphens. Min 4 chars.
// Optional, so empty string is also accepted.
const phonePattern = /^[\d\s+()-]{4,}$/;

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  company: z.string().max(200).optional().or(z.literal("")),
  phone: z
    .union([
      z.literal(""),
      z.string().max(50).regex(phonePattern),
    ])
    .optional(),
  subject: SubjectEnum,
  volume: z.string().max(100).optional().or(z.literal("")),
  message: z.string().min(5).max(5000),
  locale: z.enum(["en", "de"]),
  // Honeypot — must remain empty. Bots that auto-fill every input get caught.
  honeypot: z.string().max(0).optional().or(z.literal("")),
});

const MAX_BODY_BYTES = 50 * 1024;

/* -------------------------------------------------------------------------- */
/*                                handlers                                    */
/* -------------------------------------------------------------------------- */

export async function POST(req: Request) {
  // Reject anything that's not JSON to keep the surface small.
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { success: false, error: "unsupported_media_type" },
      { status: 415 }
    );
  }

  // Read raw body, enforce 50 KB cap before JSON parsing.
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_body" },
      { status: 400 }
    );
  }
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { success: false, error: "payload_too_large" },
      { status: 413 }
    );
  }

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { success: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const parsed = ContactSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "validation_failed" },
      { status: 400 }
    );
  }

  // Honeypot triggered — silently respond as if submitted.
  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return NextResponse.json({ success: true });
  }

  // Per-IP rate limit.
  const ip = getClientIp(req);
  const now = Date.now();
  const last = lastSubmitByIp.get(ip);
  if (last && now - last < SUBMISSION_COOLDOWN_MS) {
    return NextResponse.json(
      { success: false, error: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil(
            (SUBMISSION_COOLDOWN_MS - (now - last)) / 1000
          ).toString(),
        },
      }
    );
  }

  // Build the typed payload (HTML escaping happens inside the templates).
  const payload: ContactPayload = {
    name: parsed.data.name.trim(),
    email: parsed.data.email.trim(),
    company: parsed.data.company?.trim() || undefined,
    phone: parsed.data.phone?.trim() || undefined,
    subject: parsed.data.subject,
    volume: parsed.data.volume?.trim() || undefined,
    message: parsed.data.message.trim(),
    locale: parsed.data.locale,
  };

  const apiKey = process.env.RESEND_API_KEY;
  const inboxAddress = process.env.CONTACT_FORM_TO;
  const fromAddress = process.env.CONTACT_FORM_FROM;

  // Local-dev fallback: if env vars aren't set, log a redacted line and
  // pretend success. This keeps `npm run dev` usable without secrets.
  if (!apiKey || !inboxAddress || !fromAddress) {
    console.info("[contact] dev fallback — no Resend env, submission accepted", {
      ip,
      subject: payload.subject,
      locale: payload.locale,
      messageLength: payload.message.length,
    });
    lastSubmitByIp.set(ip, now);
    return NextResponse.json({ success: true });
  }

  // Render and send both emails.
  const inquiry = buildInquiryEmail(payload);
  const confirmation = buildConfirmationEmail(payload);
  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: fromAddress,
        to: inboxAddress,
        replyTo: payload.email,
        subject: inquiry.subject,
        html: inquiry.html,
        text: inquiry.text,
      }),
      resend.emails.send({
        from: fromAddress,
        to: payload.email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ]);
  } catch (err) {
    // Never log PII (no email, name or message body in logs).
    console.error("[contact] resend failed", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { success: false, error: "send_failed" },
      { status: 500 }
    );
  }

  lastSubmitByIp.set(ip, now);
  return NextResponse.json({ success: true });
}

/* -------------------------------------------------------------------------- */
/*                          method-not-allowed catch-all                      */
/* -------------------------------------------------------------------------- */

const methodNotAllowed = () =>
  NextResponse.json(
    { success: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;
