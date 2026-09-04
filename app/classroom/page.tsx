import { BookOpenCheck, ExternalLink, FileText, ListChecks, Package, PlayCircle, Presentation, School, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { classScheduleSummary, nirutTeachingSchedule, schedulePeriods } from "@/lib/schedule-data";
import { getPageVisuals } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

const courseSpaces = [
  {
    title: "ความรู้เท่าทันดิจิทัลและความปลอดภัยออนไลน์",
    level: "Digital Literacy & Cyber Safety • ม.3",
    lessons: "เว็บแอปบทเรียน",
    assessments: "Pre-test / Post-test / Dashboard",
    href: "/classroom-lessons/digital-literacy/index1.html",
    planHref: "/classroom-lessons/digital-literacy/lesson-plan.html",
    icon: ShieldCheck
  },
  {
    title: "นวัตกรบรรจุภัณฑ์อัจฉริยะ",
    level: "Smart Packaging with NFC Tag • ม.3",
    lessons: "เว็บแอปโครงงาน",
    assessments: "กิจกรรมจำลอง / เกียรติบัตร / Dashboard",
    href: "/classroom-lessons/smart-packaging/index1.html",
    planHref: "/classroom-lessons/smart-packaging/lesson-plan.html",
    icon: Package
  }
];

const classroomFlow = [
  "จัดเก็บลิงก์บทเรียน สื่อการสอน ใบงาน และแบบทดสอบตามรายวิชา",
  "เชื่อมโยงหลักฐานการสอนกับชั้นเรียนที่รับผิดชอบในแต่ละสัปดาห์",
  "ใช้ตารางสอนเป็นตัวตั้งต้นในการวางแผนสื่อและติดตามงานผู้เรียน",
  "สรุปผลการส่งงานและสะท้อนผลการเรียนรู้เพื่อนำไปพัฒนาการสอน"
];

const days = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

function getTeacherSlot(day: string, time: string) {
  return nirutTeachingSchedule.find((slot) => slot.day === day && slot.time === time);
}

export default async function ClassroomPage() {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  return (
    <>
      <PageHero
        {...visuals.classroom}
      />

      <section className="section-block schedule-section">
        <div className="section-heading">
          <span className="eyebrow">Teaching Schedule</span>
          <h2>ตารางสอนครูนิรุทธิ์</h2>
          <p>
            วิเคราะห์จากไฟล์ {classScheduleSummary.source} เฉพาะคาบที่ระบุชื่อผู้สอน “นิรุทธิ์”
            สำหรับ {classScheduleSummary.term} ({classScheduleSummary.startsAt})
          </p>
        </div>

        <div className="schedule-summary-grid">
          <div className="schedule-summary-card">
            <BookOpenCheck aria-hidden="true" />
            <strong>{nirutTeachingSchedule.length}</strong>
            <span>คาบสอน/สัปดาห์</span>
          </div>
          <div className="schedule-summary-card">
            <School aria-hidden="true" />
            <strong>ป.5, ม.1-ม.3</strong>
            <span>ระดับชั้นที่เกี่ยวข้อง</span>
          </div>
          <div className="schedule-summary-card">
            <Presentation aria-hidden="true" />
            <strong>5 วัน</strong>
            <span>ครอบคลุมวันจันทร์ถึงศุกร์</span>
          </div>
        </div>

        <div className="single-schedule-card">
          <div className="single-schedule-head">
            <h3>ตารางสอนรายสัปดาห์</h3>
            <span>{nirutTeachingSchedule.length} คาบ</span>
          </div>
          <div className="schedule-table-wrap">
            <table className="schedule-table weekly-schedule-table">
              <thead>
                <tr>
                  <th>วัน</th>
                  {schedulePeriods.map((period) => (
                    <th key={period}>{period}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <th scope="row">{day}</th>
                    {schedulePeriods.map((period) => {
                      const slot = getTeacherSlot(day, period);
                      return (
                        <td className={slot ? "schedule-filled-cell" : "schedule-empty-cell"} key={`${day}-${period}`}>
                          {slot ? (
                            <div className="schedule-cell-content">
                              <span className="schedule-class-chip">{slot.className}</span>
                              <strong>{slot.subject}</strong>
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Learning Units</span>
          <h2>หน่วยการเรียนรู้ออนไลน์</h2>
          <p>รวบรวมเว็บแอปบทเรียนที่จัดทำไว้เป็นรายเนื้อหา พร้อมเปิดใช้งานสื่อ แบบประเมิน และแผนการจัดการเรียนรู้ได้ทันที</p>
        </div>
        <div className="course-grid lesson-grid">
          {courseSpaces.map((course) => {
            const Icon = course.icon;

            return (
            <article className="course-card lesson-card" key={course.title}>
              <div className="course-card-head">
                <Icon aria-hidden="true" />
                <span>นำเข้าแล้ว</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.level}</p>
              <div className="meta-row">
                <strong>{course.lessons}</strong>
                <strong>{course.assessments}</strong>
              </div>
              <div className="lesson-card-actions">
                <a className="button primary" href={course.href} aria-label={`เปิดบทเรียน ${course.title}`}>
                  <ExternalLink aria-hidden="true" />
                  เปิดบทเรียน
                </a>
                <a className="button ghost" href={course.planHref} aria-label={`เปิดแผนการจัดการเรียนรู้ ${course.title}`}>
                  <FileText aria-hidden="true" />
                  แผนการจัดการเรียนรู้
                </a>
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="section-block two-column">
        <div className="info-panel">
          <PlayCircle aria-hidden="true" />
          <h2>สื่อและกิจกรรมออนไลน์</h2>
          <p>
            พื้นที่นี้รองรับลิงก์วิดีโอ สไลด์ ใบงาน แบบทดสอบ และแฟ้มส่งงานของนักเรียน
            เพื่อให้ตรวจสอบย้อนหลังได้ง่ายและเชื่อมกับตารางสอนได้ชัดเจน
          </p>
        </div>
        <div className="checklist">
          {classroomFlow.map((item) => (
            <div className="check-row" key={item}>
              <ListChecks aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
