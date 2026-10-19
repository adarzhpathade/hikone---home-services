import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { fontMona, fontManrope, fontInter } from "@/lib/fonts";
import { NavigationSettled } from "@/components/navigation/navigation-settled";
import { MotionProvider } from "@/components/providers/motion-provider";
import "@/styles/globals.css";

export const viewport: Viewport = {
  themeColor: "#EEEFEA",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Hikone — High-End On-Demand Home Appliance Services",
  description: "Curated architectural service platform for precision appliance care and repair.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Hikone",
  },
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
        <NavigationSettled />
      </body>
    </html>
  );
}
