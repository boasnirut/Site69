"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import { Menu, LogIn, ChevronDown } from "lucide-react";
import { navigation } from "@/lib/site-data";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 200); // slight delay to prevent flickering
  };

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
          const hasSub = item.subItems && item.subItems.length > 0;
          const isHovered = hoveredMenu === item.label;

          return (
            <div 
              key={item.href} 
              className="relative"
              onMouseEnter={() => hasSub && handleMouseEnter(item.label)}
              onMouseLeave={() => hasSub && handleMouseLeave()}
            >
              <Link
                className={active ? "nav-link active" : "nav-link"}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
                {hasSub && <ChevronDown className={`w-4 h-4 transition-transform ${isHovered ? "rotate-180" : ""}`} />}
              </Link>

              {/* Shifting Dropdown Menu */}
              {hasSub && (
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {item.subItems!.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => {
                              setOpen(false);
                              setHoveredMenu(null);
                            }}
                            className="flex flex-col px-4 py-3 rounded-xl hover:bg-white/10 transition-colors group"
                          >
                            <span className="text-sm font-medium text-white group-hover:text-orange-400 transition-colors">
                              {subItem.label}
                            </span>
                            <span className="text-xs text-white/50 group-hover:text-white/70 transition-colors">
                              {subItem.description}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          );
        })}
      </nav>

      <div className="header-actions">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-400 transition-all shadow-sm active:scale-95 cursor-pointer" 
          aria-label="เข้าสู่ระบบผู้ดูแล"
        >
          <LogIn className="w-4 h-4 text-amber-400" aria-hidden="true" />
          <span>เข้าสู่ระบบ</span>
        </Link>
        <button
          className="icon-button mobile-menu"
          type="button"
          aria-expanded={open}
          aria-label="เปิดเมนู"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
