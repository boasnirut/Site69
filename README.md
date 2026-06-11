# เว็บไซต์ประเมินผลงานครูและการจัดการเรียนการสอน

เว็บนี้ทำด้วย Next.js สำหรับนำขึ้น GitHub และ Vercel ได้ทันที มีหน้าเชื่อมต่อหลัก 4 ส่วน:

- ห้องเรียนออนไลน์
- งานประจำชั้น
- รางวัลและผลงาน
- การพัฒนางานตามข้อตกลง (PA)

## เริ่มใช้งานในเครื่อง

```bash
npm install
npm run dev
```

จากนั้นเปิด `http://localhost:3000`

## แก้ข้อความและรายการหลักฐาน

- ข้อมูลเมนูและเนื้อหาหลักอยู่ที่ `lib/site-data.ts`
- โครงหน้าแรกอยู่ที่ `app/page.tsx`
- หน้าย่อยอยู่ในโฟลเดอร์ `app/classroom`, `app/homeroom`, `app/achievements`, และ `app/pa`
- สีและหน้าตาเว็บอยู่ที่ `app/globals.css`

## ใช้ฉาก Spline

ถ้ามีลิงก์ฉากจาก Spline ให้เพิ่มตัวแปรนี้ใน Vercel:

```bash
NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/your-scene/scene.splinecode
```

ถ้ายังไม่ได้ใส่ลิงก์ เว็บจะใช้ฉาก Spline ตัวอย่างจากธีมแนบไว้ให้ก่อน

## โครงธีมแบบ Spline / shadcn

ธีมหน้าแรกใช้การ์ดพื้นดำพร้อม spotlight และ Spline 3D ตามตัวอย่างที่แนบมา โดยวางคอมโพเนนต์ไว้ที่:

- `components/ui/splite.tsx`
- `components/ui/spotlight.tsx`
- `components/ui/card.tsx`
- `lib/utils.ts`

โปรเจกต์เปิดใช้ Tailwind CSS ผ่าน `postcss.config.mjs` และ `app/globals.css` แล้ว

## นำขึ้น GitHub

```bash
git init
git add .
git commit -m "Create teacher portfolio website"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

## นำขึ้น Vercel

1. เข้า Vercel แล้วเลือก Add New Project
2. Import repository จาก GitHub
3. เลือก Framework เป็น Next.js
4. กด Deploy
5. ถ้าจะใช้ Spline ให้เพิ่ม `NEXT_PUBLIC_SPLINE_SCENE` ใน Project Settings > Environment Variables
