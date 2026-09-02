import {
  BookOpenCheck,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Info,
  Sparkles,
  Target,
  UserCheck
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PaEvidenceGallery } from "@/components/PaEvidenceGallery";
import { PaAssessmentInfoPopover } from "@/components/PaAssessmentInfoPopover";
import { PaTimelineNav } from "@/components/PaTimelineNav";
import {
  paAgreementGeneral,
  paChallenges,
  paReportGeneral,
  paReportStandards,
  paWorkload2569
} from "@/lib/pa-data";
import { getPageVisuals } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";
import type { PaSettings } from "@/app/admin/actions";

type EducationItem = {
  level: string;
  credential: string;
  school: string;
  province: string;
  logo: string;
};

const paMenu = [
  { id: "report-preface", label: "คำนำ" },
  { id: "report-general", label: "ข้อมูลทั่วไป" },
  { id: "report-workload", label: "ภาระงาน ก.ค.ศ." },
  { id: "report-component-1", label: "องค์ประกอบที่ 1" },
  { id: "report-component-2", label: "องค์ประกอบที่ 2" },
  { id: "report-pdf", label: "เอกสาร PDF" }
];

const assessmentLevels = {
  "1": {
    label: "ระดับ 1",
    description: "ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวังมาก",
    className: "pa-assessment-card pa-assessment-card--red"
  },
  "2": {
    label: "ระดับ 2",
    description: "ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวัง",
    className: "pa-assessment-card pa-assessment-card--yellow"
  },
  "3": {
    label: "ระดับ 3",
    description: "ปฏิบัติได้ตามระดับฯที่คาดหวัง",
    className: "pa-assessment-card pa-assessment-card--blue"
  },
  "4": {
    label: "ระดับ 4",
    description: "ปฏิบัติได้สูงกว่าระดับฯที่คาดหวัง",
    className: "pa-assessment-card pa-assessment-card--green"
  }
};

function SelfAssessmentBadge({ level }: { level?: string }) {
  const assessment = assessmentLevels[(level || "3") as keyof typeof assessmentLevels] || assessmentLevels["3"];

  return (
    <div className={assessment.className}>
      <div className="pa-assessment-card__header">
        <span>ระดับผลการประเมินตนเอง</span>
        <PaAssessmentInfoPopover />
      </div>
      <strong>{assessment.label}</strong>
      <p>{assessment.description}</p>
    </div>
  );
}

function AssessmentLegend() {
  return (
    <section className="pa-assessment-legend scroll-mt-28" aria-label="หมายเหตุการแบ่งระดับผลการประเมินตนเอง">
      <div className="pa-assessment-legend__heading">
        <Info className="w-5 h-5" />
        <div>
          <span>Assessment Level Note</span>
          <h2>หมายเหตุการแบ่งระดับผลการประเมินตนเอง</h2>
        </div>
      </div>
      <div className="pa-assessment-legend__grid">
        {Object.values(assessmentLevels).map((item) => (
          <div key={item.label} className={`${item.className} pa-assessment-legend__item`}>
            <span>{item.label}</span>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkloadTable({ rows }: { rows: { activity: string; hours: string }[] }) {
  return (
    <div className="schedule-table-wrap pa-workload-table-wrap">
      <table className="schedule-table pa-workload-table">
        <thead>
          <tr>
            <th>วิชา/กิจกรรม</th>
            <th>จำนวนชั่วโมง/สัปดาห์</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.activity}-${row.hours}`}>
              <td className="schedule-filled-cell">
                <div className="schedule-cell-content">
                  <strong>{row.activity}</strong>
                </div>
              </td>
              <td className="schedule-filled-cell">
                <div className="schedule-cell-content">
                  <strong>{row.hours} ชั่วโมง</strong>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EducationTimeline({ items }: { items: EducationItem[] }) {
  return (
    <div className="pa-education-timeline enhanced">
      <div className="flex items-center gap-3">
        <GraduationCap className="w-5 h-5 text-amber-400" />
        <h3 className="text-base font-bold text-white">ประวัติการศึกษา</h3>
      </div>
      <ol>
        {items.map((item) => (
          <li key={`${item.school}-${item.level}`}>
            <span className="pa-education-logo">
              <img src={item.logo} alt={`โลโก้${item.school}`} />
            </span>
            <div>
              <strong>{item.level}</strong>
              <p>{item.credential}</p>
              <small>{item.school} · {item.province}</small>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default async function PaPage() {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  const paSettings = content.paSettings as Partial<PaSettings> | undefined;
  const general = (paSettings?.general || {}) as Partial<PaSettings["general"]>;
  const reportGeneral = (paSettings?.reportGeneral || {}) as Partial<PaSettings["reportGeneral"]>;

  const prefaceText = general.preface || paReportGeneral.preface;
  const agreementPdfUrl = general.agreementPdfUrl || "/pa-agreement-2569.pdf";
  const agreementDownloadUrl =
    general.agreementDownloadUrl ||
    (agreementPdfUrl === "/pa-agreement-2569.pdf" ? "/api/download/pa-agreement" : agreementPdfUrl);
  const pdfTitle = general.pdfTitle || "แบบบันทึกข้อตกลงในการปฎิบัติงาน PA";
  const activeChallenges = paSettings?.challenges?.length ? paSettings.challenges : paChallenges;
  const activeWorkloadGroups = paSettings?.workloadGroups?.length ? paSettings.workloadGroups : paWorkload2569;
  const activeReportStandards = paSettings?.reportStandards?.length ? paSettings.reportStandards : paReportStandards;
  const educationItems = reportGeneral.education?.length ? reportGeneral.education : paReportGeneral.education;
  const leaveItems = reportGeneral.leave?.length ? reportGeneral.leave : paReportGeneral.leave;
  const workloadHours = general.workloadHours || "43";
  const agreementGeneral = [
    { label: "ผู้จัดทำข้อตกลง", value: general.name || paAgreementGeneral[0].value },
    { label: "ตำแหน่ง / วิทยฐานะ", value: general.position || paAgreementGeneral[1].value },
    { label: "สถานศึกษา", value: general.school || paAgreementGeneral[2].value },
    { label: "สังกัด", value: general.affiliation || paAgreementGeneral[3].value },
    { label: "รอบข้อตกลง", value: general.agreementPeriod || paAgreementGeneral[5].value },
    { label: "เงินเดือน", value: general.salary || paAgreementGeneral[4].value },
    { label: "ประเภทห้องเรียน", value: general.classroomType || paAgreementGeneral[6].value }
  ];

  return (
    <>
      <PageHero
        {...visuals.pa}
        eyebrow="PA Report 2569"
        title="รายงานผลการประเมินและหลักฐานการพัฒนางานตามข้อตกลงประจำปีงบประมาณ 2569"
        description="สรุปผลการพัฒนางานตามข้อตกลง ข้อมูลผู้จัดทำ ภาระงานตามเกณฑ์ ก.ค.ศ. และหลักฐานผลลัพธ์การพัฒนาผู้เรียน"
      />

      <PaTimelineNav items={paMenu} />

      <main className="max-w-[1180px] mx-auto px-4 py-8 space-y-10">
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

        <section id="report-general" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
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
                <strong className="block text-sm sm:text-base font-semibold text-white leading-relaxed">{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <EducationTimeline items={educationItems} />

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">ประวัติการลา</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {leaveItems.map((item) => (
                  <div key={item} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-sm text-slate-300 leading-relaxed">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="report-workload" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
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

            <div className="flex items-center gap-4 px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 self-start md:self-auto">
              <span className="text-3xl font-extrabold text-amber-400">{workloadHours}</span>
              <div className="text-left">
                <strong className="block text-sm font-bold text-white">ชั่วโมง / สัปดาห์</strong>
                <span className="text-xs text-amber-300/80">ภาระงานรวมตามข้อตกลง</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {activeWorkloadGroups.map((group) => (
              <article key={group.title} className="p-5 rounded-2xl bg-black/30 border border-white/10 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-bold text-white">{group.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30">
                    รวม {group.hours} ชม./สัปดาห์
                  </span>
                </div>
                <WorkloadTable rows={group.rows} />
              </article>
            ))}
          </div>
        </section>

        <AssessmentLegend />

        <section id="report-component-1" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-8">
          <div className="flex items-center gap-3 border-b border-white/10 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Component 1</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">องค์ประกอบที่ 1 รายงานการประเมินประสิทธิภาพและประสิทธิผลการปฏิบัติงานตามมาตรฐานตำแหน่ง</h2>
            </div>
          </div>

          <div className="space-y-8">
            {activeReportStandards.map((domain, domainIndex) => (
              <details key={domain.domain} className="pa-domain-disclosure" open={domainIndex === 0}>
                <summary>
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold text-sm shrink-0">
                      0{domainIndex + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{domain.domain}</h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">{domain.description}</p>
                    </div>
                  </div>
                  <ChevronDown className="pa-disclosure-icon" aria-hidden="true" />
                </summary>

                <div className="p-4 sm:p-6 space-y-6">
                  {domain.items.map((item, itemIndex) => (
                    <details key={item.title} className="pa-standard-disclosure" open={domainIndex === 0 && itemIndex === 0}>
                      <summary>
                        <h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item.title}</span>
                        </h4>
                        <ChevronDown className="pa-disclosure-icon" aria-hidden="true" />
                      </summary>

                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            งานที่ปฏิบัติ
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.tasks.map((task) => (
                              <li key={task} className="leading-relaxed">{task}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            ผลลัพธ์
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.outcomes.map((outcome) => (
                              <li key={outcome} className="leading-relaxed">{outcome}</li>
                            ))}
                          </ul>
                        </div>

                        <SelfAssessmentBadge level={item.selfAssessmentLevel} />

                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            ตัวชี้วัด / หลักฐาน
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                            {item.indicators.map((indicator) => (
                              <li key={indicator} className="leading-relaxed">{indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {item.images?.length ? (
                        <div className="space-y-3">
                          <div className="pa-evidence-heading">
                            <strong>ภาพ / หลักฐานอ้างอิง</strong>
                            <span>รองรับไฟล์ภาพ PDF และลิงก์อ้างอิง</span>
                          </div>
                          <PaEvidenceGallery title={item.title} images={item.images} />
                        </div>
                      ) : null}
                    </details>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="report-component-2" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/30 space-y-6">
          <div className="flex items-center gap-3 border-b border-amber-500/20 pb-6">
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Component 2</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">องค์ประกอบที่ 2 รายงานผลข้อตกลงที่เป็นประเด็นท้าทาย</h2>
            </div>
          </div>

          <div className="space-y-6">
            {activeChallenges.map((challenge: any) => (
              <div key={challenge.title} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-5">
                <div className="space-y-1">
                  <span className="inline-block text-xs font-bold text-amber-400 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                    {challenge.title}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2 leading-relaxed">{challenge.subtitle}</h3>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <strong className="block text-amber-300 font-semibold">สภาพปัญหาการจัดการเรียนรู้และคุณภาพการเรียนรู้ของผู้เรียน</strong>
                  <p className="text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {challenge.problem}
                  </p>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <strong className="block text-emerald-300 font-semibold">วิธีการดำเนินการให้บรรลุเป้าหมาย</strong>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {challenge.methods?.map((method: string, index: number) => (
                      <li key={method} className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-slate-300 flex items-start gap-2">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{method}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs font-bold text-amber-300">ผลลัพธ์การพัฒนาที่คาดหวัง</strong>
                    <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                      {challenge.expected?.join(" / ")}
                    </p>
                  </div>
                </div>

                <SelfAssessmentBadge level={challenge.selfAssessmentLevel} />

                {challenge.images?.length ? (
                  <div className="space-y-3">
                    <div className="pa-evidence-heading">
                      <strong>ภาพ / หลักฐานอ้างอิง</strong>
                      <span>รองรับไฟล์ภาพ PDF และลิงก์อ้างอิง</span>
                    </div>
                    <PaEvidenceGallery title={challenge.title} images={challenge.images} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section id="report-pdf" className="scroll-mt-28 p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">PDF Document</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{pdfTitle}</h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 self-start sm:self-auto">
              <a
                href={agreementDownloadUrl}
                download="pa-agreement-2569.pdf"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 transition-all shadow-md"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>ดาวน์โหลดข้อตกลง PA</span>
              </a>
              <a
                href={agreementPdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-100 bg-white/5 hover:bg-white/10 border border-white/10 transition-all shadow-md"
              >
                <ExternalLink className="w-4 h-4 text-cyan-200" />
                <span>เปิดไฟล์ PDF</span>
              </a>
            </div>
          </div>

          <div className="w-full h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <iframe
              className="w-full h-full border-0"
              src={`${agreementPdfUrl}#toolbar=1`}
              title={`${pdfTitle} PDF`}
            />
          </div>
        </section>
      </main>
    </>
  );
}
