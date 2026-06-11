import { Award, Medal, Sparkles } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { awards, pageVisuals, portfolioGallery } from "@/lib/site-data";

export default function AchievementsPage() {
  return (
    <>
      <PageHero {...pageVisuals.achievements} />

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Highlights</span>
          <h2>รางวัลและผลงานสำคัญ</h2>
          <p>คัดเลือกหลักฐานที่สะท้อนผลการพัฒนาผู้เรียนและการพัฒนาวิชาชีพ</p>
        </div>
        <div className="award-list">
          {awards.map((award) => (
            <article className="award-card" key={award.title}>
              <div className="award-year">
                <Medal aria-hidden="true" />
                <span>{award.year}</span>
              </div>
              <div>
                <span className="tag">{award.type}</span>
                <h3>{award.title}</h3>
                <p>{award.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading align-start">
          <span className="eyebrow">Portfolio Gallery</span>
          <h2>แฟ้มภาพหลักฐาน</h2>
        </div>
        <div className="gallery-grid">
          {portfolioGallery.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <div>
                <Award aria-hidden="true" />
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="callout-band light">
        <div>
          <span className="eyebrow">Evidence Quality</span>
          <h2>หลักฐานเด่นควรเชื่อมถึงไฟล์จริง</h2>
          <p>แต่ละรายการสามารถเพิ่มลิงก์เกียรติบัตร รูปภาพ คลิปวิดีโอ หรือแฟ้มเอกสารเพื่อใช้ประกอบการประเมิน</p>
        </div>
        <Sparkles aria-hidden="true" />
      </section>
    </>
  );
}
