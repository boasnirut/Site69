import { Sparkles } from "lucide-react";
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { getAcademicSections } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function AcademicPage() {
  const contentData = await fetchContent();
  const academicSections = getAcademicSections(contentData.achievements || []);
  return (
    <>
      <section className="section-block achievement-hub pt-8">
        <div className="section-heading">
          <span className="eyebrow">Academic Work</span>
          <h2>ผลงานวิชาการ</h2>
          <p>รวม Best Practice นวัตกรรมการจัดการเรียนรู้ และงานวิจัยในชั้นเรียน</p>
        </div>

        <div className="achievement-section-stack">
          {academicSections.map((section) => {
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
                <AchievementCarousel cards={section.cards} cardsPerView={3} isA4={true} />
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
