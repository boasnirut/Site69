import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { adminDashboardStats, adminModules } from "./admin-modules";

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <section className="rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 via-white/[0.03] to-transparent p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-black/30 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              <ShieldCheck className="h-4 w-4" />
              Admin Rebuild Center
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">ระบบบริหารจัดการใหม่</h1>
              <p className="mt-3 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-300">
                โครงนี้เป็นจุดเริ่มต้นใหม่สำหรับจัดการเว็บไซต์ครูนิรุทธิ์ เสวะนา โดยรื้อฟอร์มเดิมออกก่อน และเตรียมสร้างระบบใหม่แบบแยกโมดูลทีละส่วน
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4">
            <span className="block text-xs font-semibold text-emerald-200">ข้อมูลเว็บไซต์หลัก</span>
            <strong className="text-sm text-white">ยังคงใช้ชุดข้อมูลเดิม</strong>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminDashboardStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Icon className="h-6 w-6 text-amber-300" />
              <strong className="mt-4 block text-2xl font-black text-white">{stat.value}</strong>
              <span className="mt-1 block text-sm text-slate-400">{stat.label}</span>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Module Map</span>
          <h2 className="mt-1 text-2xl font-bold text-white">แผนเมนูสำหรับระบบใหม่</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adminModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link
                key={module.key}
                href={module.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:border-amber-500/35 hover:bg-amber-500/[0.06]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/12 text-amber-300 ring-1 ring-amber-500/25">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-300">{module.eyebrow}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-300" />
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-white">{module.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-400">{module.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
