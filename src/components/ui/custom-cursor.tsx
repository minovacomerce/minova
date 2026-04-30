"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);
    document.body.dataset.cursor = "on";

    let dx = -100;
    let dy = -100;
    let rx = -100;
    let ry = -100;
    let tx = -100;
    let ty = -100;
    let raf = 0;
    let scale = 1;
    let targetScale = 1;

    function move(e: MouseEvent) {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function loop() {
      dx += (tx - dx) * 0.5;
      dy += (ty - dy) * 0.5;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      scale += (targetScale - scale) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    }

    function over(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (
        t.closest(
          'a, button, [role="button"], input, textarea, label[for], [data-cursor-grow]'
        )
      ) {
        targetScale = 2.4;
      } else {
        targetScale = 1;
      }
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursor;
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-white/40 mix-blend-difference will-change-transform"
        style={{ transition: "border-color .25s ease" }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference will-change-transform"
      />
    </>
  );
}
