import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grand Master Spas — Premium Hot Tubs & Swim Spas",
    template: "%s | Grand Master Spas",
  },
  description:
    "Discover premium hot tubs and swim spas crafted for ultimate relaxation. BMW-level design meets therapeutic hydrotherapy.",
  metadataBase: new URL("https://grandmasterspas.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${notoSerif.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-gms-charcoal">
        {children}
      </body>
    </html>
  );
}
