import Link from "next/link";
import { ArrowLeft, BadgeCheck, BookOpenCheck, ClipboardCheck, FileText, GraduationCap, Images, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { PaEvidenceGallery } from "@/components/PaEvidenceGallery";
import { paChallenges, paReportGeneral, paReportStandards, paWorkload2569 } from "@/lib/pa-data";
import { pageVisuals } from "@/lib/site-data";

const reportMenu = [
  { href: "#report-preface", label: "คำนำ" },
  { href: "#report-general", label: "ข้อมูลทั่วไป" },
  { href: "#report-component-1", label: "องค์ประกอบที่ 1" },
  { href: "#report-component-2", label: "องค์ประกอบที่ 2" },
  { href: "#report-pdf", label: "ไฟล์ PDF" }
];

export default function PaReportPage() {
  return (
    <>
      <PageHero
        {...pageVisuals.pa}
        eyebrow="PA Report 2569"
        title="รายงานผลการพัฒนางานตามข้อตกลง (PA)"
        description="หน้าย่อยรายงานผล PA ประจำปีงบประมาณ 2569 อ้างอิงโครงสร้างจากไฟล์ “[นิรุทธิ์]-รายงาน PA 60-68-2.pdf” และใช้ประเด็นท้าทายจากแบบข้อตกลง PA 2569"
      />

      <section className="section-block pa-report-section">
        <div className="pa-action-strip">
          <div>
            <FileText aria-hidden="true" />
            <div>
              <strong>กลับไปหน้าแบบข้อตกลง PA 2569</strong>
              <span>ดูข้อมูลต้นทางจากไฟล์ DOCX เช่น ภาระงาน มาตรฐานตำแหน่ง และประเด็นท้าทาย</span>
            </div>
          </div>
          <Link href="/pa">
            <ArrowLeft aria-hidden="true" />
            กลับหน้า PA
          </Link>
        </div>

        <nav className="pa-subnav" aria-label="เมนูย่อยรายงาน PA 2569">
          {reportMenu.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <section className="pa-agreement-panel" id="report-preface">
          <div className="pa-report-title">
            <FileText aria-hidden="true" />
            <div>
              <span className="eyebrow">Preface</span>
              <h3>คำนำ</h3>
            </div>
          </div>
          <p className="pa-lead-text">{paReportGeneral.preface}</p>
        </section>

        <section className="pa-agreement-panel" id="report-general">
          <div className="pa-report-title">
            <ClipboardCheck aria-hidden="true" />
            <div>
              <span className="eyebrow">General Information</span>
              <h3>ข้อมูลทั่วไป</h3>
            </div>
          </div>

          <div className="pa-report-overview">
            <article className="pa-profile-infographic">
              <span>ข้อมูลผู้จัดทำข้อตกลง</span>
              <h4>{paReportGeneral.maker[0]}</h4>
              <ul>
                {paReportGeneral.maker.slice(1).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="pa-education-timeline">
              <h4>ประวัติการศึกษา</h4>
              <ol>
                {paReportGeneral.education.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </article>

            <div className="pa-mini-info-stack">
              <article>
                <h4>ประวัติการลา</h4>
                <ul>
                  {paReportGeneral.leave.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="pa-report-workload-card">
                <h4>งานที่ได้รับมอบหมาย/ภาระงานตามที่ ก.ค.ศ. กำหนด</h4>
                <div className="pa-report-workload-stack">
                  {paWorkload2569.map((group) => (
                    <section className="pa-report-workload-group" key={group.title}>
                      <div className="pa-report-workload-head">
                        <strong>{group.title}</strong>
                        <span>{group.hours} ชม./สัปดาห์</span>
                      </div>
                      <div className="pa-workload-table-wrap">
                        <table className="pa-workload-table compact">
                          <thead>
                            <tr>
                              <th>วิชา/กิจกรรม</th>
                              <th>จำนวนชั่วโมง/สัปดาห์</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.rows.map((row) => (
                              <tr key={`${group.title}-${row.activity}`}>
                                <td>{row.activity}</td>
                                <td>{row.hours}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="pa-agreement-panel" id="report-component-1">
          <div className="pa-report-title">
            <BookOpenCheck aria-hidden="true" />
            <div>
              <span className="eyebrow">Component 1</span>
              <h3>องค์ประกอบที่ 1 รายงานการประเมินประสิทธิภาพและประสิทธิผลปฏิบัติงานตามมาตรฐานตำแหน่ง</h3>
            </div>
          </div>

          <div className="pa-domain-stack">
            {paReportStandards.map((domain) => (
              <article className="pa-domain-card report" key={domain.domain}>
                <div className="pa-domain-head">
                  <GraduationCap aria-hidden="true" />
                  <div>
                    <h3>{domain.domain}</h3>
                    <p>{domain.description}</p>
                  </div>
                </div>

                <div className="pa-standard-detail-list">
                  {domain.items.map((item) => (
                    <section className="pa-standard-detail-card" key={item.title}>
                      <h4>{item.title}</h4>
                      <div className="pa-detail-columns">
                        <div>
                          <span>งานที่ดำเนินการ</span>
                          <ul>
                            {item.tasks.map((task) => (
                              <li key={task}>{task}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span>ผลลัพธ์ที่เกิดขึ้น</span>
                          <ul>
                            {item.outcomes.map((outcome) => (
                              <li key={outcome}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span>ตัวชี้วัด/หลักฐาน</span>
                          <ul>
                            {item.indicators.map((indicator) => (
                              <li key={indicator}>{indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <PaEvidenceGallery images={item.images} title={item.title} />
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pa-agreement-panel" id="report-component-2">
          <div className="pa-report-title">
            <Target aria-hidden="true" />
            <div>
              <span className="eyebrow">Component 2</span>
              <h3>องค์ประกอบที่ 2 รายงานผลข้อตกลงที่เป็นประเด็นท้าทาย</h3>
            </div>
          </div>

          <div className="pa-standard-detail-list">
            {paChallenges.map((challenge) => (
              <section className="pa-standard-detail-card pa-report-challenge-card" key={challenge.title}>
                <h4>{challenge.title}</h4>
                <p className="pa-challenge-subtitle">{challenge.subtitle}</p>

                <div className="pa-detail-columns">
                  <div>
                    <span>สภาพปัญหาการจัดการเรียนรู้และคุณภาพการเรียนรู้ของผู้เรียน</span>
                    <p>{challenge.problem}</p>
                  </div>
                  <div>
                    <span>วิธีการดำเนินการให้บรรลุเป้าหมาย</span>
                    <ul>
                      {challenge.methods.map((method) => (
                        <li key={method}>{method}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span>ผลลัพธ์การพัฒนาที่คาดหวัง</span>
                    <ul>
                      {challenge.expected.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pa-evidence-note">
                  <Images aria-hidden="true" />
                  <p>หลักฐานอ้างอิง: ภาพกิจกรรมการจัดการเรียนรู้ การใช้สื่อดิจิทัล การทำโครงงานอาชีพ การนำเสนอผลงาน และการแลกเปลี่ยนเรียนรู้ PLC</p>
                </div>
                <PaEvidenceGallery images={challenge.images} title={challenge.title} />
              </section>
            ))}
          </div>
        </section>

        <section className="pa-pdf-panel" id="report-pdf">
          <div className="pa-report-title">
            <BadgeCheck aria-hidden="true" />
            <div>
              <span className="eyebrow">Original Report File</span>
              <h3>ไฟล์รายงาน PA อ้างอิง</h3>
            </div>
            <a href="/pa-report-60-68-2.pdf" download>ดาวน์โหลด PDF</a>
          </div>
          <iframe src="/pa-report-60-68-2.pdf#toolbar=1" title="รายงาน PA 60-68-2" />
        </section>
      </section>
    </>
  );
}
