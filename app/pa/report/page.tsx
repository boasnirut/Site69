import Link from "next/link";
import { 
  ArrowRight, 
  BookOpenCheck, 
  CheckCircle2, 
  ClipboardCheck, 
  FileText, 
  Sparkles, 
  Target, 
  UserCheck 
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PaTimelineNav } from "@/components/PaTimelineNav";
import { PaEvidenceGallery } from "@/components/PaEvidenceGallery";
import { paChallenges, paReportGeneral, paReportStandards } from "@/lib/pa-data";
import { getPageVisuals } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

const reportMenu = [
  { id: "report-preface", label: "คำนำ" },
  { id: "report-general", label: "ข้อมูลทั่วไป" },
  { id: "report-component-1", label: "องค์ประกอบที่ 1" },
  { id: "report-component-2", label: "องค์ประกอบที่ 2" },
  { id: "report-pdf", label: "เอกสาร PDF" }
];

export default async function PaReportPage() {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  const paSettings = content.paSettings || {};
  const general = paSettings.general || {};

  const prefaceText = general.preface || paReportGeneral.preface;
  const reportPdfUrl = general.reportPdfUrl || "/pa-report-2569-placeholder.pdf";
  const activeChallenges = paSettings.challenges?.length ? paSettings.challenges : paChallenges;

  const reportMaker = [
    general.name || paReportGeneral.maker[0],
    general.position || paReportGeneral.maker[1],
    general.school || paReportGeneral.maker[2],
    general.affiliation || paReportGeneral.maker[3],
    general.agreementPeriod || paReportGeneral.maker[4]
  ];

  return (
    <>
      <div className="print-hide">
        <PageHero
          {...visuals.pa}
          eyebrow="PA Report 2569"
          title="รายงานผลการพัฒนางานตามข้อตกลง (PA)"
          description="รายงานผลการประเมินและหลักฐานการพัฒนางานตามข้อตกลงประจำปีงบประมาณ 2569"
        />
      </div>

      {/* Floating Frameless Vertical Timeline Navigation on Far Left Screen Edge */}
      <PaTimelineNav items={reportMenu} />

      <main className="max-w-[1180px] mx-auto px-4 py-8 space-y-10">

        {/* Top Tab Switcher between PA Agreement and PA Report */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md print-hide">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm font-semibold text-white/90">ระบบข้อตกลงและรายงาน PA 2569</span>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              href="/pa" 
              className="px-4 py-2 rounded-xl text-xs font-medium text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              <span>ข้อตกลง PA (แบบ PA 1/ส)</span>
            </Link>
            <Link 
              href="/pa/report" 
              className="px-4 py-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/40 shadow-sm flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>รายงานการพัฒนางาน (PA)</span>
            </Link>
          </div>
        </div>

        {/* Section 1: คำนำ */}
        <section id="report-preface" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Preface</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">คำนำ</h2>
            </div>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-black/30 p-5 rounded-2xl border border-white/5">
            {prefaceText}
          </p>
        </section>

        {/* Section 2: ข้อมูลทั่วไป & ประวัติ */}
        <section id="report-general" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">General Information</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">ข้อมูลทั่วไปของผู้จัดทำรายงาน</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ข้อมูลผู้จัดทำ</span>
              <h3 className="text-base font-bold text-white">{reportMaker[0]}</h3>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {reportMaker.slice(1).map((item) => (
                  <li key={item} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* Education Timeline */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ประวัติการศึกษา</span>
              <div className="space-y-2">
                {paReportGeneral.education.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 text-xs text-slate-300">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[11px] shrink-0 mt-0.5">
                      0{index + 1}
                    </span>
                    <p className="leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leave Record */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ประวัติการลา</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {paReportGeneral.leave.map((item) => (
                  <li key={item} className="leading-relaxed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: องค์ประกอบที่ 1 */}
        <section id="report-component-1" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Component 1</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">องค์ประกอบที่ 1 รายงานการประเมินประสิทธิภาพตามมาตรฐานตำแหน่ง</h2>
            </div>
          </div>

          <div className="space-y-8">
            {paReportStandards.map((domain, domainIdx) => (
              <div key={domain.domain} className="rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden">
                <div className="p-5 bg-white/[0.03] border-b border-white/10 flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm shrink-0">
                    0{domainIdx + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{domain.domain}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{domain.description}</p>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-6">
                  {domain.items.map((item) => (
                    <div key={item.title} className="p-5 rounded-xl bg-black/30 border border-white/5 space-y-4">
                      <h4 className="text-sm sm:text-base font-bold text-amber-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item.title}</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            งานที่ปฏิบัติ
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                            {item.tasks.map((task) => (
                              <li key={task} className="leading-relaxed">{task}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ผลลัพธ์
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                            {item.outcomes.map((outcome) => (
                              <li key={outcome} className="leading-relaxed">{outcome}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ตัวชี้วัด / หลักฐาน
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300 list-disc list-inside">
                            {item.indicators.map((indicator) => (
                              <li key={indicator} className="leading-relaxed">{indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {item.images?.length ? (
                        <div className="pt-2">
                          <PaEvidenceGallery title={item.title} images={item.images} />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: องค์ประกอบที่ 2 */}
        <section id="report-component-2" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Component 2</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">องค์ประกอบที่ 2 ประเด็นท้าทายในการพัฒนาผลลัพธ์การเรียนรู้ของผู้เรียน</h2>
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
                  <strong className="block text-amber-300 font-semibold">สรุปผลการดำเนินงานประเด็นท้าทาย:</strong>
                  <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {challenge.problem}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: เอกสาร PDF */}
        <section id="report-pdf" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">PDF Document</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">ไฟล์รายงาน PA (รายงานฉบับเต็ม)</h2>
              </div>
            </div>
          </div>

          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <iframe 
              className="w-full h-full border-0" 
              src={`${reportPdfUrl}#toolbar=1`} 
              title="รายงาน PA PDF" 
            />
          </div>
        </section>

      </main>
    </>
  );
}
