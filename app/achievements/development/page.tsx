import { Sparkles, Award } from "lucide-react";
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { getDevelopmentSections } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function DevelopmentPage() {
  const contentData = await fetchContent();
  const developmentSections = getDevelopmentSections(contentData.achievements || []);
  const hasCards = developmentSections.some((s) => s.cards && s.cards.length > 0);

  return (
    <section className="section-block achievement-hub pt-8">
      <div className="section-heading">
        <span className="eyebrow">Self Development</span>
        <h2>การพัฒนาตนเอง</h2>
        <p>หลักสูตรการอบรม การสัมมนา การประชุมทางวิชาการ และการพัฒนาทักษะเสริมสร้างวิชาชีพ</p>
      </div>

      {hasCards ? (
        <div className="achievement-section-stack">
          {developmentSections.map((section) => {
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
      ) : (
        <div className="text-center py-16 text-white/50 bg-black/20 rounded-xl border border-white/5 max-w-2xl mx-auto my-8">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-40 text-orange-400" />
          <h3 className="text-lg font-medium text-white/80 mb-1">ยังไม่มีข้อมูลการพัฒนาตนเอง</h3>
          <p className="text-sm">สามารถเพิ่มข้อมูลหลักสูตรอบรม/สัมมนาผ่านระบบแอดมิน</p>
        </div>
      )}
    </section>
  );
}
