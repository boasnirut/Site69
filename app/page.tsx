import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, GraduationCap, PieChart } from "lucide-react";
import { HeroStage } from "@/components/HeroStage";
import { 
  sarGpa, 
  sarQualityCharts, 
  getActivityGallery, 
  getAwardsAchievements,
  getAcademicAchievements, 
  getDevelopmentAchievements 
} from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";
import { AchievementCarousel } from "@/components/AchievementCarousel";
import { ActivityGallery } from "@/components/ActivityGallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await fetchContent();
  const achievements = content.achievements || [];
  
  // 1. รางวัลและเกียรติยศ (3 รายการแรก)
  const awardsItems = getAwardsAchievements(achievements).slice(0, 3);
  
  // 2. ผลงานวิชาการ (3 รายการแรก)
  const academicItems = getAcademicAchievements(achievements).slice(0, 3);
  
  // 3. การพัฒนาตนเอง (3 รายการแรก)
  const developmentItems = getDevelopmentAchievements(achievements).slice(0, 3);
  
  // 4. ภาพกิจกรรม (3 รายการแรก)
  const activityItems = getActivityGallery(content.activities || []).slice(0, 3);

  return (
    <>
      {/* Hero Stage */}
      <section className="hero-section">
        <HeroStage />
      </section>

      {/* SAR Summary Section */}
      <section className="section-block sar-section">
        <div className="section-heading text-center flex flex-col items-center justify-center">
          <span className="eyebrow">Self-Assessment Report</span>
          <h2 className="text-center">รายงานผลการปฏิบัติงานและผลการประเมินตนเองรายบุคคล</h2>
          <p className="text-center max-w-2xl mx-auto">สรุปข้อมูลจาก SAR ปีการศึกษา 2568 โดยเน้นผลสัมฤทธิ์ผู้เรียนและภาพรวมคุณภาพผู้เรียน</p>
        </div>

        <div className="sar-compact-layout">
          <article className="sar-card infographic-card">
            <div className="sar-card-head">
              <GraduationCap aria-hidden="true" />
              <h3>ผลการเรียนเฉลี่ย (GPA) และ SD</h3>
            </div>
            <div className="gpa-infographic">
              {sarGpa.map((item) => {
                const percent = `${(Number(item.gpa) / 4) * 100}%`;
                return (
                  <div className="gpa-metric" key={item.level}>
                    <div>
                      <span>{item.level}</span>
                      <strong>{item.gpa}</strong>
                      <em>SD {item.sd}</em>
                    </div>
                    <div className="gpa-track" aria-label={`${item.level} GPA ${item.gpa}`}>
                      <span style={{ width: percent }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="sar-card infographic-card">
            <div className="sar-card-head">
              <PieChart aria-hidden="true" />
              <h3>คุณภาพผู้เรียน</h3>
            </div>
            <div className="quality-infographic">
              {sarQualityCharts.map((item) => {
                const goodEnd = item.excellent + item.good;
                const chartStyle = {
                  "--excellent": `${item.excellent}%`,
                  "--good-end": `${goodEnd}%`
                } as CSSProperties;

                return (
                  <div className="quality-chart-card" key={item.title}>
                    <div className="donut-chart" style={chartStyle}>
                      <strong>{item.excellent}%</strong>
                      <span>ดีเยี่ยม</span>
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <div className="quality-legend">
                        <span className="excellent">ดีเยี่ยม {item.excellent}%</span>
                        <span className="good">ดี {item.good}%</span>
                        <span className="passed">ผ่าน {item.passed}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <div className="sar-teacher-figure" aria-label="ครูนิรุทธิ์ เสวะนา">
            <img src="/boasnirut.png" alt="ครูนิรุทธิ์ เสวะนา" />
          </div>
        </div>
      </section>

      {/* 1. รางวัลและเกียรติยศ (แสดงเฉพาะเมื่อมีข้อมูล) */}
      {awardsItems.length > 0 && (
        <section className="section-block bg-black/20">
          <div className="section-heading text-center flex flex-col items-center justify-center mb-6">
            <span className="eyebrow">Awards & Recognition</span>
            <h2 className="text-center">รางวัลและเกียรติยศ</h2>
            <Link href="/achievements/awards" className="text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1 text-sm font-medium mt-2">
              ดูรางวัลทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <AchievementCarousel cards={awardsItems} cardsPerView={3} />
        </section>
      )}

      {/* 2. ผลงานวิชาการ (แสดงเฉพาะเมื่อมีข้อมูล) */}
      {academicItems.length > 0 && (
        <section className="section-block">
          <div className="section-heading text-center flex flex-col items-center justify-center mb-6">
            <span className="eyebrow">Academic Achievements</span>
            <h2 className="text-center">ผลงานวิชาการ</h2>
            <Link href="/achievements/academic" className="text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1 text-sm font-medium mt-2">
              ดูผลงานวิชาการทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <AchievementCarousel cards={academicItems} cardsPerView={3} isA4={true} />
        </section>
      )}

      {/* 3. การพัฒนาตนเอง (แสดงเฉพาะเมื่อมีข้อมูล) */}
      {developmentItems.length > 0 && (
        <section className="section-block bg-black/20">
          <div className="section-heading text-center flex flex-col items-center justify-center mb-6">
            <span className="eyebrow">Self Development</span>
            <h2 className="text-center">การพัฒนาตนเอง</h2>
            <Link href="/achievements/development" className="text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1 text-sm font-medium mt-2">
              ดูการพัฒนาตนเองทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <AchievementCarousel cards={developmentItems} cardsPerView={3} />
        </section>
      )}

      {/* 4. ภาพกิจกรรม (แสดงเฉพาะเมื่อมีข้อมูล) */}
      {activityItems.length > 0 && (
        <section className="section-block">
          <div className="section-heading text-center flex flex-col items-center justify-center mb-6">
            <span className="eyebrow">Activity Gallery</span>
            <h2 className="text-center">ภาพกิจกรรม</h2>
            <Link href="/activities" className="text-orange-400 hover:text-orange-300 flex items-center justify-center gap-1 text-sm font-medium mt-2">
              ดูกิจกรรมทั้งหมด <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <ActivityGallery initialActivities={activityItems} hideHeading={true} />
        </section>
      )}
    </>
  );
}
