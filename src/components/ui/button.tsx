import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";

const button = cva(
  "group relative inline-flex items-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-[var(--navy)] hover:bg-[var(--accent)] hover:text-[var(--navy)]",
        secondary:
          "border border-white/30 text-white hover:border-white hover:bg-white/5",
        ghost: "text-white hover:text-[var(--accent)]",
        accent:
          "bg-[var(--accent)] text-[var(--navy)] hover:bg-white",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  href?: string;
  arrow?: boolean;
  external?: boolean;
}

export function Button({
  className,
  variant,
  size,
  href,
  arrow = false,
  external,
  children,
  ...props
}: ButtonProps) {
  const inner = (
    <>
      <span className="inline-flex items-center gap-2">{children}</span>
      {arrow ? (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      ) : null}
    </>
  );

  const cls = cn(button({ variant, size, className }));

  if (href) {
    const isExternal = external || /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className={cls}
        >
          {inner}
        </a>
      );
    }
    // Split out optional hash so the i18n Link can keep proper typing on the
    // pathname while the # fragment rides along.
    const [pathname, hash] = href.split("#") as [AppPathname, string?];
    return (
      <Link
        href={hash ? { pathname, hash } : pathname}
        className={cls}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {inner}
    </button>
  );
}
