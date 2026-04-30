"use client";

import { useEffect, useRef } from "react";

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce && videoRef.current) videoRef.current.pause();
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/hero-cargo-ship-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-cargo-ship.mp4" type="video/mp4" />
      </video>
      {/* Navy tint so headline stays legible */}
      <div className="absolute inset-0 bg-[var(--navy)]/65" />
      {/* Bottom gradient for seamless transition into navy body */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--navy)]/40 to-[var(--navy)]" />
    </div>
  );
}
