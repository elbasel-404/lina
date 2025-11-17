import { Geist, Geist_Mono } from "next/font/google";

export const mainFont = Geist({
  variable: "--font-main",
  subsets: ["latin"],
});

export const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});
