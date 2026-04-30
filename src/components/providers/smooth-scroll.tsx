"use client";

import { useLenis } from "@/hooks/use-lenis";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();
  return <>{children}</>;
}
