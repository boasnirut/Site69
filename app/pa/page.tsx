import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpenCheck, ClipboardCheck, Download, FileText, Target, UsersRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { paAgreementGeneral, paAgreementStandards, paChallenges, paWorkload2569 } from "@/lib/pa-data";
import { pageVisuals } from "@/lib/site-data";

const paMenu = [
  { href: "#pa-general", label: "ข้อมูลทั่วไปของผู้ประเมิน" },
  { href: "#pa-workload", label: "ภาระงาน ก.ค.ศ." },
  { href: "#pa-standards", label: "มาตรฐานตำแหน่ง" },
  { href: "#pa-challenges", label: "ประเด็นท้าทาย" }
];

export default function PaPage() {
  return (
    <>
      <PageHero {...pageVisuals.pa} />

      <section className="section-block pa-document-section pa-2569-section">
        <div className="section-heading">
          <span className="eyebrow">PA Agreement 2569</span>
          <h2>ข้อตกลงในการพัฒนางาน (PA) ประจำปีงบประมาณ 2569</h2>
          <p>เรียบเรียงจากไฟล์ “นิรุทธิ์-แบบข้อตกลงในการพัฒนางาน PA.docx” โดยจัดข้อมูลให้ค้นง่าย ครบทั้งข้อมูลทั่วไป ภาระงาน มาตรฐานตำแหน่ง และประเด็นท้าทาย</p>
        </div>

        <div className="pa-action-strip">
          <div>
            <FileText aria-hidden="true" />
            <div>
              <strong>รายงานผล PA ประจำปีงบประมาณ 2569</strong>
              <span>หน้าย่อยอ้างอิงจากไฟล์รายงาน PA PDF พร้อมภาพหลักฐานแบบคลิกขยายดูภาพใหญ่ได้</span>
            </div>
          </div>
          <Link href="/pa/report">
            เปิดหน้ารายงานผล PA
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <nav className="pa-subnav" aria-label="เมนูย่อย PA 2569">
          {paMenu.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <section className="pa-agreement-panel" id="pa-general">
          <div className="pa-report-title">
            <ClipboardCheck aria-hidden="true" />
            <div>
              <span className="eyebrow">General Information</span>
              <h3>ข้อมูลทั่วไปของผู้ประเมิน</h3>
            </div>
          </div>
          <div className="pa-info-grid">
            {paAgreementGeneral.map((item) => (
              <article key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="pa-agreement-panel" id="pa-workload">
          <div className="pa-report-title">
            <UsersRound aria-hidden="true" />
            <div>
              <span className="eyebrow">Workload</span>
              <h3>ส่วนที่ 1 ข้อตกลงในการพัฒนางานตามมาตรฐานตำแหน่ง</h3>
            </div>
          </div>
          <div className="pa-total-card">
            <strong>43</strong>
            <div>
              <h4>ชั่วโมง/สัปดาห์</h4>
              <p>ภาระงานรวมตามที่ ก.ค.ศ. กำหนด แบ่งเป็นชั่วโมงสอน งานส่งเสริมสนับสนุน งานพัฒนาคุณภาพการศึกษา และงานตอบสนองนโยบาย/จุดเน้น</p>
            </div>
          </div>
          <div className="pa-workload-list detailed">
            {paWorkload2569.map((group) => (
              <article className="pa-workload-row" key={group.title}>
                <div>
                  <strong>{group.hours}</strong>
                  <span>ชม./สัปดาห์</span>
                </div>
                <section>
                  <h4>{group.title}</h4>
                  <div className="pa-workload-table-wrap">
                    <table className="pa-workload-table">
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
              </article>
            ))}
          </div>
        </section>

        <section className="pa-agreement-panel" id="pa-agreement-pdf">
          <div className="pa-report-title">
            <FileText aria-hidden="true" />
            <div>
              <span className="eyebrow">Agreement PDF</span>
              <h3>ไฟล์ข้อตกลงในการพัฒนางาน PA 2569</h3>
            </div>
            <a href="/pa-agreement-2569-placeholder.pdf" download>
              <Download aria-hidden="true" />
              ดาวน์โหลด PDF
            </a>
          </div>
          <p className="pa-lead-text">ไฟล์นี้เป็น PDF จำลองสำหรับจัดตำแหน่งบนเว็บไซต์ เมื่อนำไฟล์จริงมาใช้ สามารถวางทับไฟล์ชื่อ <strong>pa-agreement-2569-placeholder.pdf</strong> ในโฟลเดอร์ public ได้เลย</p>
          <iframe className="pa-agreement-pdf-frame" src="/pa-agreement-2569-placeholder.pdf#toolbar=1" title="ข้อตกลง PA 2569 PDF" />
        </section>

        <section className="pa-agreement-panel" id="pa-standards">
          <div className="section-heading compact">
            <span className="eyebrow">Position Standards</span>
            <h3>งานที่จะปฏิบัติตามมาตรฐานตำแหน่งครู</h3>
          </div>

          <div className="pa-domain-stack">
            {paAgreementStandards.map((domain) => (
              <article className="pa-domain-card" key={domain.domain}>
                <div className="pa-domain-head">
                  <BookOpenCheck aria-hidden="true" />
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
                          <span>งานที่จะปฏิบัติ</span>
                          <ul>
                            {item.tasks.map((task) => (
                              <li key={task}>{task}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span>ผลลัพธ์</span>
                          <ul>
                            {item.outcomes.map((outcome) => (
                              <li key={outcome}>{outcome}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span>ตัวชี้วัด</span>
                          <ul>
                            {item.indicators.map((indicator) => (
                              <li key={indicator}>{indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="pa-agreement-panel" id="pa-challenges">
          <div className="section-heading compact">
            <span className="eyebrow">Challenge Issues</span>
            <h3>ส่วนที่ 2 ข้อตกลงในการพัฒนางานที่เป็นประเด็นท้าทาย</h3>
          </div>

          <div className="pa-challenge-grid">
            {paChallenges.map((challenge) => (
              <article className="pa-challenge-card" key={challenge.title}>
                <span>{challenge.title}</span>
                <h3>{challenge.subtitle}</h3>
                <strong>สภาพปัญหาการจัดการเรียนรู้และคุณภาพการเรียนรู้ของผู้เรียน</strong>
                <p>{challenge.problem}</p>
                <strong>วิธีการดำเนินการให้บรรลุเป้าหมาย</strong>
                <ul>
                  {challenge.methods.map((method) => (
                    <li key={method}>{method}</li>
                  ))}
                </ul>
                <div>
                  <Target aria-hidden="true" />
                  <p>{challenge.expected.join(" / ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="callout-band">
          <div>
            <span className="eyebrow">Evidence Ready</span>
            <h2>จัดข้อมูล PA ให้พร้อมใช้เป็นแฟ้มหลักฐาน</h2>
            <p>หน้า PA นี้แยก “ข้อตกลง” และ “รายงานผล” ออกจากกัน เพื่อให้ดูง่ายและนำเสนอได้เป็นลำดับ ทั้งเป้าหมาย วิธีดำเนินงาน ตัวชี้วัด และหลักฐานที่สะท้อนผลลัพธ์ผู้เรียน</p>
          </div>
          <BadgeCheck aria-hidden="true" />
        </section>
      </section>
    </>
  );
}
