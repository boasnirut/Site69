import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock3, Layers3 } from "lucide-react";
import type { AdminModule } from "../admin-modules";

type AdminModulePlaceholderProps = {
  module: AdminModule;
};

export function AdminModulePlaceholder({ module }: AdminModulePlaceholderProps) {
  const Icon = module.icon;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับภาพรวมระบบ
          </Link>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              {module.eyebrow}
            </span>
            <h1 className="mt-3 text-2xl sm:text-3xl font-black text-white">{module.name}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">{module.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-amber-500/25 bg-black/35 px-5 py-4 shadow-lg">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-300">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <span className="block text-xs text-slate-500">สถานะโมดูล</span>
            <strong className="text-sm text-amber-200">{module.status}</strong>
          </div>
        </div>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex items-center gap-3 border-b border-white/10 pb-5">
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/10 p-3 text-amber-300">
            <Layers3 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">New Admin Module</span>
            <h2 className="text-xl font-bold text-white">ขอบเขตที่จะสร้างใหม่</h2>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {module.scope.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/25 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <span className="text-sm leading-relaxed text-slate-200">{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-dashed border-amber-500/25 bg-amber-500/[0.06] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 text-amber-300">
            <Clock3 className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">พร้อมสำหรับออกแบบรายละเอียดในขั้นถัดไป</h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              หน้านี้เป็นโครงใหม่แทนระบบบริหารจัดการเดิม ยังไม่มีการบันทึก แก้ไข หรือลบข้อมูลจริง เพื่อให้ตรวจเลย์เอาต์และลำดับเมนูก่อนเริ่มพัฒนาแต่ละส่วน
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
