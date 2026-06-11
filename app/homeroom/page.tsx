import { HeartHandshake, PhoneCall, UserCheck } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { advisoryTasks, homeroomFocus, pageVisuals } from "@/lib/site-data";

export default function HomeroomPage() {
  return (
    <>
      <PageHero {...pageVisuals.homeroom} />

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Homeroom Dashboard</span>
          <h2>สรุปงานดูแลช่วยเหลือนักเรียน</h2>
          <p>แสดงข้อมูลที่ครูที่ปรึกษาใช้ติดตามและช่วยเหลือนักเรียนรายบุคคล</p>
        </div>
        <div className="focus-grid">
          {homeroomFocus.map((item) => (
            <article className="focus-card" key={item.title}>
              <span>{item.value}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-column">
        <div className="info-panel green">
          <HeartHandshake aria-hidden="true" />
          <h2>งานที่ปรึกษาและการประสานผู้ปกครอง</h2>
          <p>
            จัดเก็บหลักฐานการดูแลนักเรียนอย่างต่อเนื่อง ทั้งบันทึกโฮมรูม การเยี่ยมบ้าน และการส่งต่อความช่วยเหลือ
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
