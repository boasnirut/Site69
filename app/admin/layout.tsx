"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  LogOut, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { logout } from "./login/actions";
import { useEffect, useRef, useTransition } from "react";
import "./admin.css";
import { adminModules } from "./admin-modules";

const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000;

const sidebarMenu = [
  { name: "ภาพรวมระบบ", href: "/admin", icon: LayoutDashboard },
  ...adminModules.map((module) => ({ name: module.name, href: module.href, icon: module.icon })),
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const logoutTimerRef = useRef<number | null>(null);

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    const clearLogoutTimer = () => {
      if (logoutTimerRef.current) {
        window.clearTimeout(logoutTimerRef.current);
      }
    };

    const resetLogoutTimer = () => {
      clearLogoutTimer();
      logoutTimerRef.current = window.setTimeout(() => {
        startTransition(() => {
          logout();
        });
      }, INACTIVITY_TIMEOUT_MS);
    };

    const activityEvents = ["pointerdown", "pointermove", "keydown", "wheel", "scroll", "touchstart"];

    resetLogoutTimer();
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, resetLogoutTimer, { passive: true });
    });

    return () => {
      clearLogoutTimer();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, resetLogoutTimer);
      });
    };
  }, [pathname, startTransition]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div
      className="flex min-h-[calc(100vh-76px)] bg-[#070a12] text-white"
      style={{ fontFamily: 'Arial, "Noto Sans Thai", "Tahoma", sans-serif' }}
    >
      {/* Sidebar - Inspired by School Admin Portal */}
      <aside className="w-64 shrink-0 bg-[#0d1321]/90 border-r border-amber-500/20 flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-lg shadow-orange-500/20">
              <ShieldCheck className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Admin Rebuild</h2>
              <p className="text-xs text-amber-400 font-medium">Nirut Sewana</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5">
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
      <main className="flex-1 min-w-0 bg-[#070a12]">
        <header className="h-16 border-b border-amber-500/20 bg-[#0d1321]/80 flex items-center px-8 justify-between backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Rebuild Center</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-sm font-bold text-black shadow-md">
              N
            </div>
            <span className="text-sm font-semibold text-slate-200">ครูนิรุทธิ์ เสวะนา (Administrator)</span>
          </div>
        </header>
        
        <div className="p-6 xl:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
