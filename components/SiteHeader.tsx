"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="กลับหน้าแรก">
        <span className="brand-mark">
          <img src="/8045-transparent.png" alt="" />
        </span>
        <span>
          <strong>Nirut Sewana</strong>
          <small>ครูนิรุทธิ์ เสวะนา</small>
        </span>
      </Link>

      <nav className={open ? "nav-links open" : "nav-links"} aria-label="เมนูหลัก">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              className={active ? "nav-link active" : "nav-link"}
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
            >
              <Icon aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        className="icon-button mobile-menu"
        type="button"
        aria-expanded={open}
        aria-label="เปิดเมนู"
        onClick={() => setOpen((value) => !value)}
      >
        <Menu aria-hidden="true" />
      </button>
    </header>
  );
}
