import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple — Everyday Calculator",
  description: "A beautiful, friendly calculator for everyday arithmetic.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
