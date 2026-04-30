import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "navy",
  className,
  href = "/",
}: {
  variant?: "navy" | "white";
  className?: string;
  href?: string | null;
}) {
  const src =
    variant === "navy"
      ? "/brand/minova-logo-navy-header.png"
      : "/brand/minova-logo-white-header.png";

  const img = (
    <Image
      src={src}
      alt="Minova Commerce"
      width={160}
      height={40}
      priority
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );

  if (href === null) return img;
  return (
    <Link
      href={href}
      aria-label="Minova Commerce — home"
      className="inline-flex items-center"
    >
      {img}
    </Link>
  );
}
