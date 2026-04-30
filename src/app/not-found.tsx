import type { Metadata } from "next";
import Link from "next/link";
import { codecPro, inter } from "./fonts";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html
      lang="en"
      className={cn(
        codecPro.variable,
        inter.variable,
        "h-full antialiased"
      )}
    >
      <body className="bg-[var(--navy)] text-white">
        <section className="relative flex min-h-screen items-center justify-center px-5 text-center">
          <div className="max-w-2xl">
            <p className="eyebrow text-[var(--accent)]">404 — Page not found</p>
            <h1 className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-[-0.02em] md:text-6xl">
              Looks like this lane isn&apos;t on our map.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.65] text-[var(--slate-300)] md:text-lg">
              The page you&apos;re looking for has moved or doesn&apos;t exist.
              Let&apos;s get you back on course.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/en"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-medium text-[var(--navy)] transition-colors hover:bg-[var(--accent)]"
              >
                Back to home
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
