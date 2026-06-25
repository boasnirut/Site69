import { HeartHandshake, PhoneCall, UserCheck } from "lucide-react";
import { HomeroomClassroom } from "@/components/HomeroomClassroom";
import { HomeroomReserveFund } from "@/components/HomeroomReserveFund";
import { PageHero } from "@/components/PageHero";
import { classScheduleSummary, m3ClassSchedule, schedulePeriods } from "@/lib/schedule-data";

const advisoryTasks = [
  "ติดตามการมาเรียน พฤติกรรม และข้อมูล SDQ ของนักเรียนเป็นรายบุคคล",
  "ประสานผู้ปกครองและบันทึกหลักฐานการดูแลช่วยเหลือนักเรียนอย่างต่อเนื่อง",
  "ใช้ข้อมูลตารางเรียน ม.3 เพื่อวางแผนโฮมรูม การติดตามงาน และการนัดหมายกิจกรรม",
  "สรุปข้อมูลชั้นเรียนเพื่อใช้ประกอบการประเมินและพัฒนาผู้เรียน"
];

const totalLearningSlots = m3ClassSchedule.reduce(
  (total, day) => total + day.slots.filter((slot) => !slot.isBreak).length,
  0
);

function getClassSlot(day: string, time: string) {
  return m3ClassSchedule.find((item) => item.day === day)?.slots.find((slot) => slot.time === time);
}

export default function HomeroomPage() {
  return (
    <>
      <PageHero
        eyebrow="Student Care"
        title="งานประจำชั้น"
        description="ฐานข้อมูลดูแลช่วยเหลือนักเรียนชั้นมัธยมศึกษาปีที่ 3 พร้อมแดชบอร์ด สมาชิกในห้องเรียน และตารางเรียนประจำสัปดาห์"
        image="/C1-web.jpg"
      />

      <HomeroomClassroom />

      <HomeroomReserveFund />

      <section className="section-block schedule-section">
        <div className="section-heading">
          <span className="eyebrow">Class Schedule</span>
          <h2>ตารางเรียนชั้นมัธยมศึกษาปีที่ 3</h2>
          <p>
            วิเคราะห์จากไฟล์ {classScheduleSummary.source} โดยเลือกแถวของ ม.3 สำหรับ {classScheduleSummary.term}
            ({classScheduleSummary.startsAt})
          </p>
        </div>

        <div className="schedule-summary-grid">
          <div className="schedule-summary-card">
            <strong>{totalLearningSlots}</strong>
            <span>คาบเรียน/สัปดาห์</span>
          </div>
          <div className="schedule-summary-card">
            <strong>ม.3</strong>
            <span>ห้องเรียนประจำชั้น</span>
          </div>
          <div className="schedule-summary-card">
            <strong>5 วัน</strong>
            <span>ตารางเรียนรายสัปดาห์</span>
          </div>
        </div>

        <div className="single-schedule-card">
          <div className="single-schedule-head">
            <h3>ตารางเรียนรายสัปดาห์</h3>
            <span>{totalLearningSlots} คาบเรียน</span>
          </div>
          <div className="schedule-table-wrap">
            <table className="schedule-table weekly-schedule-table class-schedule-table">
              <thead>
                <tr>
                  <th>วัน</th>
                  {schedulePeriods.map((period) => (
                    <th key={period}>{period}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m3ClassSchedule.map((day) => (
                  <tr key={day.day}>
                    <th scope="row">{day.day}</th>
                    {schedulePeriods.map((period) => {
                      const slot = getClassSlot(day.day, period);
                      return (
                        <td
                          className={slot?.isBreak ? "schedule-break-cell" : "schedule-filled-cell"}
                          key={`${day.day}-${period}`}
                        >
                          <div className="schedule-cell-content">
                            <strong>{slot?.subject ?? "-"}</strong>
                            {slot?.teacher ? <span>ครู{slot.teacher}</span> : null}
                          </div>
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

      <section className="section-block two-column">
        <div className="info-panel green">
          <HeartHandshake aria-hidden="true" />
          <h2>งานที่ปรึกษาและการประสานผู้ปกครอง</h2>
          <p>
            จัดเก็บหลักฐานการดูแลนักเรียนอย่างต่อเนื่อง ทั้งบันทึกโฮมรูม การเยี่ยมบ้าน
            การติดตามงานตามตารางเรียน และการส่งต่อความช่วยเหลือ
          </p>
          <div className="contact-chip">
            <PhoneCall aria-hidden="true" />
            ช่องทางติดต่อผู้ปกครอง
          </div>
        </div>
        <div className="checklist">
          {advisoryTasks.map((item) => (
            <div className="check-row" key={item}>
              <UserCheck aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
