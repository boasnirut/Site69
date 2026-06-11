import { BadgeCheck, BookOpenCheck, ClipboardCheck, FileCheck2, Lightbulb, Target, UsersRound } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { pageVisuals } from "@/lib/site-data";

const workload = [
  { label: "ชั่วโมงสอนตามตารางสอน", value: "24", detail: "วิทยาการคำนวณ ออกแบบและเทคโนโลยี หน้าที่พลเมือง ต้านทุจริต สุขศึกษา พลศึกษา แนะแนว และกิจกรรมพัฒนาผู้เรียน" },
  { label: "ส่งเสริมและสนับสนุนการเรียนรู้", value: "8", detail: "จัดทำแผนการสอน วัดและประเมินผล และ PLC" },
  { label: "พัฒนาคุณภาพสถานศึกษา", value: "6", detail: "งานวิชาการ หัวหน้ากลุ่มสาระสุขศึกษาและพลศึกษา เทคโนโลยีสารสนเทศ และประชาสัมพันธ์" },
  { label: "ตอบสนองนโยบายและจุดเน้น", value: "5", detail: "โรงเรียนวิถีพุทธ โรงเรียนสุจริต ห้องเรียนขยายโอกาสคุณภาพ และระบบดูแลช่วยเหลือ" }
];

const paStandards = [
  {
    title: "ด้านการจัดการเรียนรู้",
    icon: BookOpenCheck,
    task: "พัฒนาหลักสูตร ออกแบบ Active Learning/PBL สร้างเว็บแอป Cyber Safety และนวัตกรรม Smart Packaging ด้วย NFC Tag",
    outcome: "ผู้เรียนมี Digital Literacy ทักษะอาชีพ และมีชิ้นงาน/ภาระงานที่เชื่อมโยงบริบทชุมชน",
    indicator: "ผู้เรียนร้อยละ 80 ผ่านเกณฑ์ และร้อยละ 100 มีบรรจุภัณฑ์อัจฉริยะที่ใช้ NFC Tag"
  },
  {
    title: "ด้านส่งเสริมและสนับสนุนการจัดการเรียนรู้",
    icon: UsersRound,
    task: "จัดทำข้อมูลสารสนเทศผู้เรียน รายวิชา ระบบดูแลช่วยเหลือ ประสานผู้ปกครองและภาคีเครือข่าย",
    outcome: "มีข้อมูลผู้เรียนเป็นปัจจุบัน ใช้ติดตาม วางแผน และส่งเสริมศักยภาพผู้เรียนได้ตรงจุด",
    indicator: "ข้อมูลสารสนเทศเป็นปัจจุบันร้อยละ 100 และผู้เรียนได้รับการดูแลตามระบบสถานศึกษา"
  },
  {
    title: "ด้านพัฒนาตนเองและวิชาชีพ",
    icon: Lightbulb,
    task: "เข้าร่วมอบรม/PLC แลกเปลี่ยนการแก้ปัญหาเด็กติดเกม โซเชียล และพัฒนารูปแบบโครงงานอาชีพฐานนวัตกรรม",
    outcome: "นำความรู้มาพัฒนาเว็บแอป Cyber Safety และนวัตกรรม Smart Packaging ที่ตอบโจทย์ผู้เรียน",
    indicator: "เข้าร่วม PLC ไม่น้อยกว่า 50 ชั่วโมง/ปีการศึกษา และมีรายงานผลการใช้นวัตกรรมอย่างน้อย 1 เรื่อง"
  }
];

const challenges = [
  {
    title: "Digital Literacy & Cyber Safety",
    eyebrow: "ประเด็นท้าทายที่ 1",
    focus: "การพัฒนาความรู้เท่าทันดิจิทัลและความปลอดภัยออนไลน์ของนักเรียนชั้น ม.3 ด้วยเว็บแอปพลิเคชันสื่อการสอนแบบโต้ตอบ",
    problem: "นักเรียนมีความเสี่ยงจากการตั้งรหัสผ่านง่าย ไม่ตรวจสอบลิงก์ Phishing และเปิดเผยข้อมูลส่วนตัวมากเกินไป",
    method: ["ออกแบบหน่วยความปลอดภัยออนไลน์", "ใช้ PBL และ 5Es", "ทดลองผ่าน Password Lab / Phishing Simulator", "ใช้ Dashboard ติดตามและซ่อมเสริม", "แลกเปลี่ยนผลใน PLC"],
    result: "นักเรียนร้อยละ 80 มีผลสัมฤทธิ์และทักษะ Digital Literacy ผ่านเกณฑ์ และมีสื่อเว็บแอปที่ปรับประยุกต์กับบริบทผู้เรียน"
  },
  {
    title: "Digital Career Innovator",
    eyebrow: "ประเด็นท้าทายที่ 2",
    focus: "การพัฒนาทักษะนวัตกรอาชีพดิจิทัลผ่านบรรจุภัณฑ์อัจฉริยะ Smart Packaging ด้วย NFC Tag เชื่อมโยงผลิตภัณฑ์ชุมชน",
    problem: "ผู้เรียนยังขาดทักษะประยุกต์เทคโนโลยีดิจิทัลเชิงพาณิชย์ และผลิตภัณฑ์ชุมชนยังขาดการสร้างมูลค่าเพิ่ม",
    method: ["อบรม Packaging Design ด้วย Canva", "เรียนรู้ IoT และ NFC Tag", "ลงพื้นที่เลือกผลิตภัณฑ์ชุมชน", "สร้างฉลากสินค้าอัจฉริยะ", "ทดลองตลาดและรับ Feedback"],
    result: "นักเรียนร้อยละ 80 ผ่านเกณฑ์โครงงานอาชีพ และมีต้นแบบ Smart Packaging ที่ใช้งานจริงร่วมกับผลิตภัณฑ์ชุมชน"
  }
];

export default function PaPage() {
  return (
    <>
      <PageHero {...pageVisuals.pa} />

      <section className="section-block pa-document-section">
        <div className="section-heading">
          <span className="eyebrow">PA 2569</span>
          <h2>แบบข้อตกลงในการพัฒนางาน</h2>
          <p>สรุปข้อมูลจากไฟล์ “นิรุทธิ์-แบบข้อตกลงในการพัฒนางาน PA.docx” ระหว่างวันที่ 1 ตุลาคม 2568 ถึง 30 กันยายน 2569</p>
        </div>

        <div className="pa-profile-panel">
          <div>
            <span>ผู้จัดทำข้อตกลง</span>
            <h3>นายนิรุทธิ์ เสวะนา</h3>
            <p>ตำแหน่ง ครู คศ.1 โรงเรียนบ้านน้ำพร สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1</p>
          </div>
          <div>
            <strong>43</strong>
            <span>ชั่วโมง/สัปดาห์</span>
          </div>
        </div>

        <div className="pa-workload-grid">
          {workload.map((item) => (
            <article className="pa-workload-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Position Standards</span>
          <h2>งานที่จะปฏิบัติตามมาตรฐานตำแหน่งครู</h2>
        </div>
        <div className="pa-standard-grid">
          {paStandards.map((item) => {
            const Icon = item.icon;
            return (
              <article className="pa-standard-card" key={item.title}>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <dl>
                  <div>
                    <dt>งาน</dt>
                    <dd>{item.task}</dd>
                  </div>
                  <div>
                    <dt>ผลลัพธ์</dt>
                    <dd>{item.outcome}</dd>
                  </div>
                  <div>
                    <dt>ตัวชี้วัด</dt>
                    <dd>{item.indicator}</dd>
                  </div>
                </dl>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Challenge Issues</span>
          <h2>ประเด็นท้าทายในการพัฒนาผลลัพธ์การเรียนรู้</h2>
        </div>
        <div className="pa-challenge-grid">
          {challenges.map((item) => (
            <article className="pa-challenge-card" key={item.title}>
              <span>{item.eyebrow}</span>
              <h3>{item.title}</h3>
              <strong>{item.focus}</strong>
              <p>{item.problem}</p>
              <ul>
                {item.method.map((method) => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
              <div>
                <Target aria-hidden="true" />
                <p>{item.result}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="callout-band">
        <div>
          <span className="eyebrow">Evidence Focus</span>
          <h2>หลักฐานเน้นผลลัพธ์ผู้เรียนและการปฏิบัติจริง</h2>
          <p>หน้า PA นี้จัดข้อมูลให้เชื่อมโยงภาระงาน มาตรฐานตำแหน่ง ผลลัพธ์ ตัวชี้วัด และประเด็นท้าทาย เพื่อใช้เป็นแฟ้มหลักฐานประกอบการประเมินได้ชัดเจน</p>
        </div>
        <BadgeCheck aria-hidden="true" />
      </section>
    </>
  );
}
