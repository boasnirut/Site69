import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirut Sewana | ครูนิรุทธิ์ เสวะนา",
  description: "เว็บไซต์ครูนิรุทธิ์ เสวะนา เพื่อการเรียนรู้แบบดิจิทัล ห้องเรียนออนไลน์ ภาพกิจกรรม ผลงาน และ PA",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="th" data-scroll-behavior="smooth">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
