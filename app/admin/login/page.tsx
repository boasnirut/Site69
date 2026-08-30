"use client";

import { useActionState } from "react";
import { login } from "./actions";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#000", fontFamily: 'Arial, "Noto Sans Thai", "Tahoma", sans-serif' }}
    >
      <div className="w-full max-w-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/60">เข้าสู่ระบบเพื่อจัดการเนื้อหาเว็บไซต์</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1" htmlFor="username">ชื่อผู้ใช้</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input 
                id="username"
                name="username" 
                type="text" 
                required
                className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                placeholder="ระบุชื่อผู้ใช้"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1" htmlFor="password">รหัสผ่าน</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
              <input 
                id="password"
                name="password" 
                type="password" 
                required
                className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-white/50 transition-colors"
                placeholder="ระบุรหัสผ่าน"
              />
            </div>
          </div>

          {state?.error && (
            <div className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
              {state.error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-white text-black font-semibold py-2.5 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-50 mt-4"
          >
            {isPending ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
      </div>
    </div>
  );
}
