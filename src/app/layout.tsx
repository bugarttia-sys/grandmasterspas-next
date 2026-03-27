import type { Metadata } from "next";
import { Inter, Noto_Serif_Display, Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/chat/ChatWidget";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const notoSerifDisplay = Noto_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grand Master Spas — Premium Hot Tubs & Swim Spas",
    template: "%s | Grand Master Spas",
  },
  description:
    "Discover premium hot tubs and swim spas crafted for ultimate relaxation. Premium design meets therapeutic hydrotherapy.",
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
      className={cn("h-full", notoSerifDisplay.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
