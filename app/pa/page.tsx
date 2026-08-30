import Link from "next/link";
import { 
  ArrowRight, 
  BookOpenCheck, 
  CheckCircle2, 
  ClipboardCheck, 
  Clock, 
  Download, 
  FileText, 
  Sparkles, 
  Target, 
  UserCheck 
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PaTimelineNav } from "@/components/PaTimelineNav";
import { paAgreementGeneral, paAgreementStandards, paChallenges, paWorkload2569 } from "@/lib/pa-data";
import { getPageVisuals } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

const paMenu = [
  { id: "pa-general", label: "ข้อมูลทั่วไป" },
  { id: "pa-workload", label: "ภาระงาน ก.ค.ศ." },
  { id: "pa-standards", label: "มาตรฐานตำแหน่ง" },
  { id: "pa-challenges", label: "ประเด็นท้าทาย" },
  { id: "pa-pdf", label: "เอกสาร PDF" }
];

export default async function PaPage() {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  const paSettings = content.paSettings || {};
  const general = paSettings.general || {};

  const agreementGeneral = [
    { label: "ผู้จัดทำข้อตกลง", value: general.name || paAgreementGeneral[0].value },
    { label: "ตำแหน่ง / วิทยฐานะ", value: general.position || paAgreementGeneral[1].value },
    { label: "สถานศึกษา", value: general.school || paAgreementGeneral[2].value },
    { label: "สังกัด", value: general.affiliation || paAgreementGeneral[3].value },
    { label: "รอบข้อตกลง", value: general.agreementPeriod || paAgreementGeneral[4].value },
    { label: "เงินเดือน", value: paAgreementGeneral[5]?.value || "รับโอน / ตามเกณฑ์ ก.ค.ศ." }
  ];

  const workloadHours = general.workloadHours || "43";
  const agreementPdfUrl = general.agreementPdfUrl || "/pa-agreement-2569-placeholder.pdf";
  const activeChallenges = paSettings.challenges?.length ? paSettings.challenges : paChallenges;

  return (
    <>
      <PageHero {...visuals.pa} />

      {/* Floating Frameless Vertical Timeline Navigation on Far Left Screen Edge */}
      <PaTimelineNav items={paMenu} />

      <main className="max-w-[1180px] mx-auto px-4 py-8 space-y-10">
        
        {/* Top Tab Switcher between PA Agreement and PA Report */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">ระบบข้อตกลงและรายงาน PA 2569</span>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/pa" 
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-sm flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>ข้อตกลง PA (แบบ PA 1/ส)</span>
            </Link>
            <Link 
              href="/pa/report" 
              className="px-4 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>รายงานการพัฒนางาน (PA)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Section 1: ข้อมูลทั่วไปของผู้ประเมิน */}
        <section id="pa-general" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">General Information</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">ข้อมูลทั่วไปของผู้จัดทำข้อตกลง</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agreementGeneral.map((item) => (
              <div key={item.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all">
                <span className="block text-xs font-medium text-slate-400 mb-1">{item.label}</span>
                <strong className="block text-sm sm:text-base font-semibold text-white">{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: ภาระงานตามที่ ก.ค.ศ. กำหนด */}
        <section id="pa-workload" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Workload</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">ภาระงานตามที่ ก.ค.ศ. กำหนด</h2>
              </div>
            </div>

            {/* Total Hours Badge */}
            <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 self-start md:self-auto">
              <span className="text-3xl font-extrabold text-amber-400">{workloadHours}</span>
              <div className="text-left">
                <strong className="block text-sm font-bold text-white">ชั่วโมง / สัปดาห์</strong>
                <span className="text-xs text-amber-300/80">ภาระงานรวมปฏิบัติหน้าที่จริง</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paWorkload2569.map((group) => (
              <div key={group.title} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-base font-bold text-white">{group.title}</h3>
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold whitespace-nowrap">
                      {group.hours} ชม./สัปดาห์
                    </span>
                  </div>

                  <div className="divide-y divide-white/5 text-xs text-slate-300">
                    {group.rows.map((row) => (
                      <div key={`${group.title}-${row.activity}`} className="py-2 flex items-center justify-between gap-4">
                        <span className="text-slate-300 font-medium">{row.activity}</span>
                        <span className="font-bold text-white whitespace-nowrap">{row.hours} ชม.</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: มาตรฐานตำแหน่งครู */}
        <section id="pa-standards" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Position Standards</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">ส่วนที่ 1 ข้อตกลงตามมาตรฐานตำแหน่งครู</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">แบ่งตาม 3 ด้านการประเมินคุณภาพการจัดการเรียนรู้ การส่งเสริมและพัฒนาตนเอง</p>
            </div>
          </div>

          <div className="space-y-8">
            {paAgreementStandards.map((domain, domainIdx) => (
              <div key={domain.domain} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
                {/* Domain Header */}
                <div className="p-5 bg-white/[0.03] border-b border-white/10 flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm shrink-0">
                    0{domainIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{domain.domain}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{domain.description}</p>
                  </div>
                </div>

                {/* Standard Items */}
                <div className="p-4 sm:p-6 space-y-6">
                  {domain.items.map((item) => (
                    <div key={item.title} className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-4">
                      <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {/* Tasks */}
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            งานที่จะปฏิบัติ
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.tasks.map((task) => (
                              <li key={task} className="leading-relaxed">{task}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Outcomes */}
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ผลลัพธ์ที่คาดหวัง
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.outcomes.map((outcome) => (
                              <li key={outcome} className="leading-relaxed">{outcome}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Indicators */}
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ตัวชี้วัด
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.indicators.map((indicator) => (
                              <li key={indicator} className="leading-relaxed">{indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: ประเด็นท้าทาย */}
        <section id="pa-challenges" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Challenge Issue</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">ส่วนที่ 2 ข้อตกลงในการพัฒนางานที่เป็นประเด็นท้าทาย</h2>
            </div>
          </div>

          <div className="space-y-6">
            {activeChallenges.map((challenge: any) => (
              <div key={challenge.title} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="space-y-1">
                  <span className="inline-block text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                    {challenge.title}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2">{challenge.subtitle}</h3>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <strong className="block text-amber-300 font-semibold">สภาพปัญหาการจัดการเรียนรู้และคุณภาพผู้เรียน:</strong>
                  <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {challenge.problem}
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <strong className="block text-emerald-300 font-semibold">วิธีการดำเนินการให้บรรลุเป้าหมาย:</strong>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {challenge.methods?.map((method: string, idx: number) => (
                      <li key={method} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-300 flex items-start gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-amber-300">ผลลัพธ์การพัฒนาที่คาดหวัง:</strong>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                      {challenge.expected?.join(" / ")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: เอกสาร PDF */}
        <section id="pa-pdf" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">PDF Document</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">เอกสารข้อตกลง PA 2569 (ไฟล์ฉบับเต็ม)</h2>
              </div>
            </div>

            <a 
              href={agreementPdfUrl} 
              download 
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 transition-all shadow-md self-start sm:self-auto"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>ดาวน์โหลดเอกสาร PDF</span>
            </a>
          </div>

          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <iframe 
              className="w-full h-full border-0" 
              src={`${agreementPdfUrl}#toolbar=1`}
              title="ข้อตกลง PA 2569 PDF" 
            />
          </div>
        </section>

      </main>
    </>
  );
}
