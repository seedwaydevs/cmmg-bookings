import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarSimple from "@/components/ruixen/navbar-simple";
import FooterPro from "@/components/ruixen/footer-pro";
import PromoPopup from "@/components/PromoPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CMMG Studios",
  description: "CMMG Studio Booking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PromoPopup />
        <NavbarSimple />
        <div className="min-h-screen">{children}</div>
        <FooterPro />
      </body>
    </html>
  );
}
