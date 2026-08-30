"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, BookOpen, GraduationCap } from "lucide-react";

export function AchievementSubNav() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/achievements/awards",
      altHrefs: ["/achievements"],
      label: "รางวัลและเกียรติยศ",
      icon: Trophy
    },
    {
      href: "/achievements/academic",
      altHrefs: [],
      label: "ผลงานวิชาการ",
      icon: BookOpen
    },
    {
      href: "/achievements/development",
      altHrefs: [],
      label: "การพัฒนาตนเอง",
      icon: GraduationCap
    }
  ];

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 my-6 px-4">
      <div className="inline-flex p-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl gap-1.5 shadow-xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || tab.altHrefs.includes(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold shadow-lg scale-[1.02]"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
