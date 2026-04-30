import "./globals.css";

// Root layout — kept minimal so the locale-aware layout in `[locale]/layout.tsx`
// can own <html lang> and the actual chrome. This shell exists so that
// non-localized routes (e.g. the global `not-found.tsx` fallback for paths the
// middleware can't resolve) still render through the App Router.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
