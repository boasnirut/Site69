import { Sparkles } from "lucide-react";
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { PageHero } from "@/components/PageHero";
import { achievementSections, pageVisuals } from "@/lib/site-data";

export default function AchievementsPage() {
  return (
    <>
      <PageHero {...pageVisuals.achievements} />

      <section className="section-block achievement-hub">
        <div className="section-heading">
          <span className="eyebrow">Portfolio Evidence</span>
          <h2>รางวัลและผลงาน</h2>
          <p>แยกหลักฐานเป็น 4 หมวด เพื่อจัดเก็บภาพรางวัล ผลงาน และการพัฒนาตนเองให้ค้นง่ายและนำเสนอได้เป็นระบบ</p>
        </div>

        <div className="achievement-section-stack">
          {achievementSections.map((section) => (
            <section className="achievement-showcase" key={section.title}>
              <div className="achievement-showcase-head">
                <div>
                  <span className="eyebrow">{section.eyebrow}</span>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <Sparkles aria-hidden="true" />
              </div>
              <AchievementCarousel cards={section.cards} cardsPerView={3} />
            </section>
          ))}
        </div>
      </section>

      <section className="callout-band light">
        <div>
          <span className="eyebrow">Evidence Quality</span>
          <h2>วางภาพจริงทับไฟล์จำลองได้ทันที</h2>
          <p>แต่ละหมวดเตรียมไฟล์ภาพตัวอย่างไว้แล้ว เมื่อนำภาพเกียรติบัตรหรือผลงานจริงมาวางทับชื่อไฟล์เดิม หน้าเว็บจะอัปเดตตามอัตโนมัติ</p>
        </div>
        <Sparkles aria-hidden="true" />
      </section>
    </>
  );
}
