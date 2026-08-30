# เว็บไซต์ครูนิรุทธิ์ เสวะนา (Teacher Evidence Site)

เว็บไซต์แฟ้มสะสมผลงานและการจัดการเรียนการสอนแบบดิจิทัล พัฒนาด้วย Next.js (App Router), Tailwind CSS v4, Framer Motion และ 3D Interactive (Spline)

สามารถเข้าถึงหน้าหลักได้ 5 ส่วน ดังนี้:

- **ห้องเรียนออนไลน์** (`/classroom`) - บทเรียน สื่อ ใบงาน และแบบทดสอบ
- **งานประจำชั้น** (`/homeroom`) - ระบบดูแลช่วยเหลือนักเรียน งานที่ปรึกษา และเงินสวัสดิการ
- **รางวัลและผลงาน** (`/achievements`) - เกียรติบัตร นวัตกรรม และผลงานนักเรียน
- **ภาพกิจกรรม** (`/activities`) - คลังภาพกิจกรรมในชั้นเรียนและชุมชนการเรียนรู้
- **การพัฒนางานตามข้อตกลง (PA)** (`/pa`) - เป้าหมาย ตัวชี้วัด หลักฐาน และผลลัพธ์ (SAR)

## การติดตั้งและรันโปรเจกต์ในเครื่อง

```bash
npm install
npm run dev
```

จากนั้นเปิด `http://localhost:3000`

## โครงสร้างและการแก้ไขข้อมูล

เว็บไซต์ถูกออกแบบให้แยกข้อมูล (Data) ออกจากหน้าแสดงผล (UI) เพื่อง่ายต่อการดูแลรักษา:

- **ข้อมูลเนื้อหาหลัก:** สามารถแก้ไขได้ในโฟลเดอร์ `lib/` 
  - `lib/site-data.ts` - เมนู สถิติ และข้อมูล SAR บนหน้าหลัก
  - `lib/pa-data.ts` - ข้อมูลตัวชี้วัดและหลักฐาน PA
  - `lib/schedule-data.ts` - ข้อมูลตารางกิจกรรม/ตารางสอน
- **หน้าแสดงผล (Pages):** อยู่ในโฟลเดอร์ `app/` เช่น `app/page.tsx` (หน้าแรก) และโฟลเดอร์หน้าย่อยต่างๆ
- **คอมโพเนนต์ (Components):** อยู่ในโฟลเดอร์ `components/` เช่น `HeroStage.tsx`, `ActivityCalendar.tsx` 
- **สไตล์ (Styles):** ปรับแต่งความสวยงามหลักได้ที่ `app/globals.css`

## โมเดล 3D (Spline)

เว็บไซต์มีการใช้งานโมเดล 3D "GENKUB - Greeting robot" บนหน้าแรก เพื่อสร้างปฏิสัมพันธ์กับผู้ใช้ หากต้องการเปลี่ยนโมเดล สามารถแก้ไขได้ที่ `components/HeroStage.tsx` หรือตั้งค่า Environment Variable ใน Vercel:

```bash
NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/your-scene/scene.splinecode
```

## การ Deployment (GitHub + Vercel)

โปรเจกต์นี้เชื่อมต่อ CI/CD ระหว่าง GitHub และ Vercel ไว้เรียบร้อยแล้ว (Repository: `boasnirut/Site69`)

1. **อัปเดตโค้ดขึ้น GitHub:**
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```
2. **Vercel จะทำการ Deploy ให้อัตโนมัติ:** รอประมาณ 1-2 นาที เว็บไซต์เวอร์ชันใหม่จะออนไลน์ทันที
