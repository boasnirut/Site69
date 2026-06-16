import { BookOpenCheck, ExternalLink, ListChecks, PlayCircle, Presentation, School } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { classScheduleSummary, nirutTeachingSchedule, schedulePeriods } from "@/lib/schedule-data";

const courseSpaces = [
  {
    title: "ห้องเรียนออนไลน์ ม.1",
    level: "สังคมศึกษา ประวัติศาสตร์ วิทยาศาสตร์เพิ่มเติม และพลศึกษา",
    lessons: "6 คาบ/สัปดาห์",
    assessments: "แฟ้มหลักฐาน"
  },
  {
    title: "ห้องเรียนออนไลน์ ม.2",
    level: "สังคมศึกษา ประวัติศาสตร์ วิทยาศาสตร์เพิ่มเติม และพลศึกษา",
    lessons: "6 คาบ/สัปดาห์",
    assessments: "ใบงาน/แบบทดสอบ"
  },
  {
    title: "ห้องเรียนออนไลน์ ม.3",
    level: "สังคมศึกษา ประวัติศาสตร์ วิทยาศาสตร์เพิ่มเติม พลศึกษา และหน้าที่พลเมือง",
    lessons: "7 คาบ/สัปดาห์",
    assessments: "ชิ้นงานผู้เรียน"
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

export default function ClassroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Online Learning"
        title="ห้องเรียนออนไลน์"
        description="พื้นที่รวมบทเรียน สื่อ ใบงาน แบบทดสอบ และตารางสอนเฉพาะรายวิชาของครูนิรุทธิ์ เพื่อจัดการเรียนรู้และตรวจสอบหลักฐานได้เป็นระบบ"
        image="/placeholder-classroom-hero.jpg"
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
          <span className="eyebrow">Course Spaces</span>
          <h2>ห้องเรียนและชุดบทเรียน</h2>
          <p>แยกห้องเรียนตามระดับชั้น พร้อมสถานะบทเรียน แบบประเมิน และแฟ้มหลักฐานการเรียนรู้</p>
        </div>
        <div className="course-grid">
          {courseSpaces.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-card-head">
                <Presentation aria-hidden="true" />
                <span>พร้อมใช้งาน</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.level}</p>
              <div className="meta-row">
                <strong>{course.lessons}</strong>
                <strong>{course.assessments}</strong>
              </div>
              <a className="button ghost" href="#" aria-label={`เปิด${course.title}`}>
                <ExternalLink aria-hidden="true" />
                ลิงก์ห้องเรียน
              </a>
            </article>
          ))}
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
