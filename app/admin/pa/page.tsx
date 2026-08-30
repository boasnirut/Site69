import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function AdminPAPage() {
  return (
    <div className="max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-[#111827] border border-white/10 text-center space-y-4 shadow-2xl">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-xl font-bold text-white">ระบบบริหารจัดการ การพัฒนางานตามข้อตกลง (PA)</h1>
      <p className="text-sm text-slate-400 leading-relaxed">
        ระบบบริหารจัดการส่วนนี้ถูกยกเลิก/ปิดใช้งานชั่วคราวตามคำขอของคุณครู<br />
        หน้าเว็บสาธารณะ PA จะคงการแสดงผลตามปกติ
      </p>
      <div className="pt-2">
        <Link 
          href="/admin" 
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับสู่แดชบอร์ดแอดมิน</span>
        </Link>
      </div>
    </div>
  );
}
