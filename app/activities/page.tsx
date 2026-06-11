import { Camera, Images, Sparkles } from "lucide-react";
import { ActivityGallery } from "@/components/ActivityGallery";
import { PageHero } from "@/components/PageHero";
import { pageVisuals } from "@/lib/site-data";

export default function ActivitiesPage() {
  return (
    <>
      <PageHero {...pageVisuals.activities} />

      <ActivityGallery />

      <section className="section-block two-column">
        <div className="info-panel orange">
          <Camera aria-hidden="true" />
          <h2>เพิ่มภาพกิจกรรมจริงได้ภายหลัง</h2>
          <p>หน้านี้เตรียมพื้นที่สำหรับใส่ภาพจากโรงเรียน ห้องเรียน กิจกรรมประกวด กิจกรรมชุมนุม หรือการนำเสนอผลงานของนักเรียน</p>
        </div>
        <div className="checklist">
          {["กิจกรรมในชั้นเรียน", "กิจกรรมพัฒนาผู้เรียน", "ผลงานและการนำเสนอ", "กิจกรรม PLC และชุมชนการเรียนรู้"].map((item) => (
            <div className="check-row" key={item}>
              <Images aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="callout-band light">
        <div>
          <span className="eyebrow">Digital Learning</span>
          <h2>ภาพกิจกรรมช่วยเล่าเรื่องการเรียนรู้ได้ชัดขึ้น</h2>
          <p>ใช้ภาพประกอบคู่กับหลักฐานผลงาน เพื่อสะท้อนกระบวนการเรียนรู้และพัฒนาการของผู้เรียน</p>
        </div>
        <Sparkles aria-hidden="true" />
      </section>
    </>
  );
}
