import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { PageExperience } from "@/components/PageExperience";
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700&family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Prompt:wght@300;400;500;600;700&family=Sarabun:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <PageExperience />
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
