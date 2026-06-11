import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import { activityGallery } from "@/lib/site-data";

export function ActivitySlider() {
  return (
    <section className="section-block activity-slider-section">
      <div className="slider-heading">
        <div>
          <span className="eyebrow">Activity Gallery</span>
          <h2>ภาพกิจกรรมการเรียนรู้</h2>
          <p>สไลด์นี้ใช้ข้อมูลชุดเดียวกับหน้า “ภาพกิจกรรม” แก้รายการที่เดียวแล้วแสดงผลร่วมกันทั้งสองส่วน</p>
        </div>
        <Link className="button secondary dark" href="/activities">
          <Images aria-hidden="true" />
          ดูภาพกิจกรรมทั้งหมด
        </Link>
      </div>

      <div className="activity-slider" aria-label="สไลด์ภาพกิจกรรม">
        {activityGallery.map((item) => (
          <Link className="activity-slide" href="/activities" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
            <ArrowRight aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}
