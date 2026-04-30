import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const codecPro = localFont({
  src: [
    {
      path: "../../public/fonts/codec-pro/CodecPro-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/codec-pro/CodecPro-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    // Synthesized bolder weights mapped to Regular — the supplied family ships
    // only Regular + Italic. Browsers will faux-bold for headlines that ask
    // for 600/700/800; that's acceptable for now and Just Works once heavier
    // cuts are licensed and dropped into /public/fonts/codec-pro.
    {
      path: "../../public/fonts/codec-pro/CodecPro-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/codec-pro/CodecPro-Regular.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/codec-pro/CodecPro-Regular.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/codec-pro/CodecPro-Regular.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-codec-pro",
  display: "swap",
  preload: true,
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
