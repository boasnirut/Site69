"use client";

import { useEffect, useState } from "react";

export type TimelineNavItem = {
  id: string;
  label: string;
};

export function PaTimelineNav({ items }: { items: TimelineNavItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav 
      aria-label="สารบัญเนื้อหาแบบจุดนำทาง"
      className="fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex flex-col items-start print:hidden"
    >
      {/* Outer vertical line with dots - NO outer card, NO background box frame */}
      <div className="relative pl-1 py-2 flex flex-col gap-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-blue-600/50">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div key={item.id} className="relative flex items-center group">
              {/* Bullet Dot */}
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                aria-label={item.label}
                className="relative z-10 p-1 flex items-center justify-center cursor-pointer outline-none"
              >
                <span 
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-red-600 ring-4 ring-red-600/40 scale-125 shadow-lg shadow-red-600/50" 
                      : "bg-blue-600 hover:bg-blue-400 hover:scale-110"
                  }`} 
                />
              </a>

              {/* Hover Tooltip Text Badge (Displays ONLY when mouse hovers over the dot/row) */}
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`absolute left-8 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-2xl transition-all duration-300 ease-out border opacity-0 pointer-events-none -translate-x-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 ${
                  isActive
                    ? "bg-[#0B2545] text-white border-blue-400/60 ring-2 ring-blue-500/20"
                    : "bg-black/90 text-slate-200 border-white/20 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
