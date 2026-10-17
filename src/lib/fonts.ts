import localFont from "next/font/local";

export const fontMona = localFont({
  src: "../app/fonts/MonaSans-Variable.woff2",
  variable: "--font-mona",
  display: "swap",
  weight: "200 900",
});

export const fontManrope = localFont({
  src: "../app/fonts/Manrope-Variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const fontInter = localFont({
  src: "../app/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
