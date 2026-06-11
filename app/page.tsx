import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, GraduationCap, PieChart } from "lucide-react";
import { ActivitySlider } from "@/components/ActivitySlider";
import { HeroStage } from "@/components/HeroStage";
import { homeSections, sarGpa, sarQualityCharts, summaryStats } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <HeroStage />
      </section>

      <section className="stats-band" aria-label="ตัวเลขสรุป">
        {summaryStats.map((item) => {
          const Icon = item.icon;
          return (
            <article className="stat-card" key={item.label}>
              <Icon aria-hidden="true" />
              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
                <small>{item.detail}</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Navigation</span>
          <h2>เข้าสู่แฟ้มงานแต่ละด้าน</h2>
          <p>เลือกเปิดหน้าข้อมูลที่ต้องการจากปุ่มด้านล่าง จัดกลุ่มหลักฐานให้เข้าถึงง่ายและเข้ากับธีมเว็บไซต์</p>
        </div>
        <div className="portal-grid">
          {homeSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link className="portal-button" href={section.href} key={section.title}>
                <span className="portal-icon">
                  <Icon aria-hidden="true" />
                </span>
                <span className="portal-copy">
                  <small>{section.eyebrow}</small>
                  <strong>{section.title}</strong>
                  <em>{section.description}</em>
                </span>
                <ArrowRight aria-hidden="true" className="portal-arrow" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section-block sar-section">
        <div className="section-heading">
          <span className="eyebrow">Self-Assessment Report</span>
          <h2>รายงานผลการปฏิบัติงานและผลการประเมินตนเองรายบุคคล</h2>
          <p>สรุปข้อมูลจาก SAR ปีการศึกษา 2568 โดยเน้นผลสัมฤทธิ์ผู้เรียนและภาพรวมคุณภาพผู้เรียน</p>
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

      <ActivitySlider />
    </>
  );
}
