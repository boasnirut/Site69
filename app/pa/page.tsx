import { BadgeCheck, FileCheck2, Target } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { paEvidence, paObjectives, pageVisuals, rubricCards } from "@/lib/site-data";

export default function PaPage() {
  return (
    <>
      <PageHero {...pageVisuals.pa} />

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">PA Objectives</span>
          <h2>เป้าหมายและตัวชี้วัด</h2>
          <p>จัดประเด็นตามกรอบการพัฒนางาน เพื่อเห็นเป้าหมาย วิธีดำเนินงาน และผลลัพธ์ร่วมกัน</p>
        </div>
        <div className="pa-grid">
          {paObjectives.map((item) => (
            <article className="pa-card" key={item.title}>
              <Target aria-hidden="true" />
              <h3>{item.title}</h3>
              <strong>{item.metric}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-column">
        <div className="rubric-panel">
          {rubricCards.map((card) => {
            const Icon = card.icon;
            return (
              <article className="rubric-card" key={card.label}>
                <Icon aria-hidden="true" />
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </article>
            );
          })}
        </div>
        <div className="evidence-panel">
          <span className="eyebrow">PA Evidence</span>
          <h2>รายการหลักฐานประกอบการประเมิน</h2>
          {paEvidence.map((item) => (
            <div className="check-row" key={item}>
              <FileCheck2 aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="callout-band">
        <div>
          <span className="eyebrow">Outcome</span>
          <h2>เชื่อม PA กับผลลัพธ์ผู้เรียน</h2>
          <p>หน้า PA ออกแบบให้ใส่หลักฐานเชิงประจักษ์ เช่น คะแนนก่อนเรียน หลังเรียน ชิ้นงาน และบันทึกหลังสอนได้ต่อเนื่อง</p>
        </div>
        <BadgeCheck aria-hidden="true" />
      </section>
    </>
  );
}
