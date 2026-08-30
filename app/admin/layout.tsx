"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  MonitorPlay, 
  UsersRound, 
  Trophy, 
  Images, 
  BadgeCheck,
  ExternalLink,
  ShieldCheck,
  ClipboardCheck,
  FileText
} from "lucide-react";
import { logout } from "./login/actions";
import { useTransition } from "react";
import "./admin.css";

const sidebarMenu = [
  { name: "ภาพรวมระบบ", href: "/admin", icon: LayoutDashboard },
  { name: "รางวัลและผลงาน", href: "/admin/achievements", icon: Trophy },
  { name: "ภาพกิจกรรม", href: "/admin/activities", icon: Images },
  { name: "ห้องเรียนออนไลน์", href: "/admin/classroom", icon: MonitorPlay },
  { name: "งานประจำชั้น", href: "/admin/homeroom", icon: UsersRound },
  { name: "ภาพหน้าปกและ Visuals", href: "/admin/hero", icon: Images },
  { name: "ตั้งค่าระบบ", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <div className="flex h-screen bg-[#070a12] text-white overflow-hidden font-sans">
      {/* Sidebar - Inspired by School Admin Portal */}
      <aside className="w-64 bg-[#0d1321]/90 border-r border-amber-500/20 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                ระบบบริหารจัดการ
              </h2>
              <p className="text-xs text-amber-400 font-medium">ครูนิรุทธิ์ เสวะนา</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {sidebarMenu.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const isReallyActive = item.href === "/admin" ? pathname === "/admin" : isActive;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isReallyActive 
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-300 shadow-md border border-amber-500/30 scale-[1.01]" 
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isReallyActive ? "text-amber-400" : "text-slate-400"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
          <Link 
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            กลับสู่หน้าเว็บไซต์หลัก
          </Link>
          <button 
            onClick={handleLogout}
            disabled={isPending}
            className="flex items-center gap-3 px-4 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium disabled:opacity-50 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            {isPending ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#070a12]">
        <header className="h-16 border-b border-amber-500/20 bg-[#0d1321]/80 flex items-center px-8 justify-between backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Management Portal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-black shadow-md">
              N
            </div>
            <span className="text-sm font-semibold text-slate-200">ครูนิรุทธิ์ เสวะนา (Administrator)</span>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
