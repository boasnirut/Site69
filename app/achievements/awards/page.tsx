import { Sparkles } from "lucide-react";
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { getAwardsSections } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AwardsPage() {
  const contentData = await fetchContent();
  const awardsSections = getAwardsSections(contentData.achievements || []);
  return (
    <>
      <section className="section-block achievement-hub pt-8">
        <div className="section-heading">
          <span className="eyebrow">Awards</span>
          <h2>รางวัลและเกียรติยศ</h2>
          <p>รวมภาพความภูมิใจ รางวัลที่ได้รับ และความสำเร็จของครู นักเรียน และสถานศึกษา</p>
        </div>

        <div className="achievement-section-stack">
          {awardsSections.map((section) => {
            if (!section.cards || section.cards.length === 0) return null;
            return (
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
            );
          })}
        </div>
      </section>
    </>
  );
}
