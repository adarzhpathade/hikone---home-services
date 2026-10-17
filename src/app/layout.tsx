import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontMona, fontManrope, fontInter } from "@/lib/fonts";
import { MotionProvider } from "@/components/providers/motion-provider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Urban — High-End On-Demand Services",
  description: "Curated architectural service platform for home and personal care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontMona.variable} ${fontManrope.variable} ${fontInter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
