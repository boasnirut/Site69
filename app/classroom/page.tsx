import { ExternalLink, ListChecks, PlayCircle, Presentation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { classroomFlow, courseSpaces, pageVisuals } from "@/lib/site-data";

export default function ClassroomPage() {
  return (
    <>
      <PageHero {...pageVisuals.classroom} />

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Course Spaces</span>
          <h2>ห้องเรียนและชุดบทเรียน</h2>
          <p>แยกห้องเรียนตามระดับชั้น พร้อมสถานะบทเรียนและแบบประเมิน</p>
        </div>
        <div className="course-grid">
          {courseSpaces.map((course) => (
            <article className="course-card" key={course.title}>
              <div className="course-card-head">
                <Presentation aria-hidden="true" />
                <span>{course.status}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.level}</p>
              <div className="meta-row">
                <strong>{course.lessons}</strong>
                <strong>{course.assessments}</strong>
              </div>
              <a className="button ghost" href="#" aria-label={`เปิด${course.title}`}>
                <ExternalLink aria-hidden="true" />
                ลิงก์ห้องเรียน
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block two-column">
        <div className="info-panel">
          <PlayCircle aria-hidden="true" />
          <h2>สื่อและกิจกรรมออนไลน์</h2>
          <p>
            พื้นที่นี้รองรับลิงก์วิดีโอ สไลด์ ใบงาน แบบทดสอบ และแฟ้มส่งงานของนักเรียน เพื่อให้ตรวจสอบย้อนหลังได้ง่าย
          </p>
        </div>
        <div className="checklist">
          {classroomFlow.map((item) => (
            <div className="check-row" key={item}>
              <ListChecks aria-hidden="true" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
