# Nirut Sewana Digital Learning Website

เว็บไซต์ครูนิรุทธิ์ เสวะนา สำหรับรวมแฟ้มผลงานครู ห้องเรียนออนไลน์ งานประจำชั้น ภาพกิจกรรม รางวัลผลงาน และรายงานผลการพัฒนางานตามข้อตกลง (PA) ประจำปีงบประมาณ 2569

โปรเจกต์นี้พัฒนาด้วย Next.js App Router และออกแบบให้ deploy ผ่าน GitHub + Vercel โดยใช้ธีมภาพรวมแบบดิจิทัล/ไซเบอร์ สีหลักดำ เทาเข้ม ส้มทอง และเอฟเฟกต์เรืองแสง

## สถานะล่าสุดของโปรเจกต์

สถานะ ณ วันที่ 30 สิงหาคม 2569:

- หน้าเว็บสาธารณะยังใช้งานตามโครงล่าสุด และ deploy อยู่ที่ `https://boasnirut.in.th`
- Repository หลักคือ `boasnirut/Site69`
- Commit ล่าสุดที่ deploy แล้วก่อนเริ่มรื้อระบบจัดการใหม่คือ `18d41cb`
- ระบบบริหารจัดการเดิมถูกรื้อออกจากโค้ด local แล้ว แต่ยังไม่ได้ commit/push/deploy
- ระบบบริหารจัดการใหม่กำลังอยู่ในขั้นวางโครงหน้า admin เป็น placeholder เพื่อออกแบบใหม่ทีละโมดูล
- หน้า PA ถูกยุบเหลือหน้าเดียวที่ `/pa` แล้ว และไม่ใช้ `/pa/report` เป็นหน้าย่อยอีก
- ข้อมูลรางวัล/ผลงาน และภาพกิจกรรมบนเว็บจริงใช้ fallback จาก `data/content.json` ได้ แม้ production จะยังไม่ได้ตั้งค่า GitHub env ครบ

## Tech Stack

- Next.js `16.2.9`
- React `19.2.7`
- TypeScript `6.0.3`
- Tailwind CSS `4.3.0`
- Framer Motion `12.40.0`
- Lucide React สำหรับ icon
- Spline สำหรับโมเดล 3D หน้าแรก
- react-zoom-pan-pinch สำหรับดูภาพขนาดใหญ่
- Deploy ด้วย Vercel ผ่าน GitHub

## คำสั่งพื้นฐาน

ติดตั้ง dependency:

```bash
npm install
```

รันเว็บในเครื่อง:

```bash
npm run dev
```

เปิดดูตัวอย่าง:

```text
http://localhost:3000
```

ตรวจสอบ build:

```bash
npm run build
```

ตรวจ TypeScript:

```bash
npm run typecheck
```

## โครงสร้างไฟล์สำคัญ

```text
app/
  page.tsx                    หน้าแรก
  layout.tsx                  Root layout และ metadata
  globals.css                 ธีมหลักของเว็บ
  classroom/page.tsx          ห้องเรียนออนไลน์
  homeroom/page.tsx           งานประจำชั้น
  achievements/page.tsx       รางวัลและผลงาน
  achievements/academic/      ผลงานวิชาการ
  achievements/awards/        รางวัลและเกียรติยศ
  achievements/development/   การอบรมและพัฒนาตนเอง
  activities/page.tsx         ภาพกิจกรรม
  pa/page.tsx                 PA หน้าเดียว
  admin/                      ระบบบริหารจัดการใหม่ที่กำลังเริ่มทำใหม่

components/
  HeroStage.tsx               Hero หน้าแรก พร้อม Spline/โลโก้/ไซบอร์ก
  PageHero.tsx                Hero ของแต่ละหน้าย่อย
  SiteHeader.tsx              เมนูหลักด้านบน
  Footer.tsx                  ส่วนท้ายเว็บ
  AchievementCarousel.tsx     สไลด์รางวัลและผลงาน
  ActivityGallery.tsx         แกลเลอรีกิจกรรม
  ActivitySlider.tsx          สไลด์ภาพกิจกรรม
  ActivityCalendar.tsx        ปฏิทินกิจกรรม
  HomeroomClassroom.tsx       ข้อมูลห้อง ม.3 และ dashboard นักเรียน
  HomeroomReserveFund.tsx     รายงานกองทุนสำรองห้องเรียน
  PaEvidenceGallery.tsx       แกลเลอรีหลักฐาน PA
  PaTimelineNav.tsx           เมนูนำทางในหน้า PA
  PageExperience.tsx          เอฟเฟกต์โหลดหน้า/notification

lib/
  site-data.ts                navigation, ข้อมูลหน้าแรก, ข้อมูลรางวัล/กิจกรรม fallback
  pa-data.ts                  ข้อมูล PA และหลักฐาน
  schedule-data.ts            ตารางสอน/ตารางเรียน
  github-api.ts               อ่าน/เขียนไฟล์ผ่าน GitHub API
  utils.ts                    utility className

data/
  content.json                ข้อมูลรางวัลและภาพกิจกรรมหลัก

public/
  46.png                      ภาพปกหน้าหลัก
  47.png                      ภาพปกภาพกิจกรรม
  48.png                      ภาพปกรางวัลและผลงาน
  49.png                      ภาพปกห้องเรียนออนไลน์
  50.png                      ภาพปกงานประจำชั้น
  51.png                      ภาพปก PA
  8045.png                    โลโก้หลัก
  8045.ico                    favicon
  boasnirut.png               ภาพครู
  calendar-events.csv         ข้อมูลปฏิทินกิจกรรม
  homeroom-students.csv       ข้อมูลนักเรียน ม.3
  pa-report-60-68-2.pdf       ไฟล์รายงาน PA
  pa-agreement-2569-placeholder.pdf ไฟล์ข้อตกลง PA จำลอง
  uploads/                    ไฟล์ที่เคยอัปโหลด
```

## Route ของเว็บ

หน้าเว็บสาธารณะ:

| Path | หน้าที่ |
| --- | --- |
| `/` | หน้าแรก แนะนำเว็บไซต์ SAR summary และรายการผลงาน/กิจกรรมบางส่วน |
| `/classroom` | ห้องเรียนออนไลน์และตารางสอนของครูนิรุทธิ์ |
| `/homeroom` | งานประจำชั้น ม.3, สมาชิกห้องเรียน, dashboard, ตารางเรียน และกองทุนสำรอง |
| `/achievements` | รางวัลและผลงานทั้งหมด |
| `/achievements/awards` | รางวัลและเกียรติยศ |
| `/achievements/academic` | ผลงานวิชาการ |
| `/achievements/development` | การอบรมและพัฒนาตนเอง |
| `/activities` | ภาพกิจกรรม |
| `/pa` | รายงานผลการประเมินและหลักฐานการพัฒนางานตามข้อตกลง ประจำปีงบประมาณ 2569 |

หน้า admin:

| Path | สถานะ |
| --- | --- |
| `/admin/login` | หน้าเข้าสู่ระบบ |
| `/admin` | Dashboard ระบบบริหารจัดการใหม่ |
| `/admin/home` | Placeholder จัดการหน้าหลัก |
| `/admin/classroom` | Placeholder จัดการห้องเรียนออนไลน์ |
| `/admin/homeroom` | Placeholder จัดการงานประจำชั้น |
| `/admin/achievements` | Placeholder จัดการรางวัลและผลงาน |
| `/admin/activities` | Placeholder จัดการภาพกิจกรรม |
| `/admin/pa` | Placeholder จัดการ PA |
| `/admin/hero` | Placeholder จัดการภาพปก |
| `/admin/settings` | Placeholder ตั้งค่าระบบ |

หมายเหตุ: หน้า admin ทุกหน้าที่ไม่ใช่ `/admin/login` ถูกป้องกันด้วย `middleware.ts`

## ภาพปกของแต่ละหน้า

ภาพปกล่าสุดที่ต้องใช้:

| หน้า | ไฟล์ |
| --- | --- |
| หน้าหลัก | `/46.png` |
| ห้องเรียนออนไลน์ | `/49.png` |
| งานประจำชั้น | `/50.png` |
| รางวัลและผลงาน | `/48.png` |
| ภาพกิจกรรม | `/47.png` |
| PA | `/51.png` |

ถ้าภาพบนเว็บจริงยังไม่เปลี่ยน ให้ตรวจลำดับนี้:

1. ตรวจว่าไฟล์อยู่ใน `public/`
2. ตรวจว่า route ใช้ path ใหม่จริง
3. ตรวจ fallback ใน `lib/site-data.ts`
4. ตรวจว่า commit ถูก push แล้ว
5. รอ Vercel build ล่าสุดเสร็จ
6. Hard refresh browser หรือ clear cache

## ข้อมูลหน้าเว็บหลัก

ข้อมูลหลักของเว็บแบ่งเป็น 2 กลุ่ม:

1. ข้อมูล hardcoded ใน `lib/site-data.ts`, `lib/pa-data.ts`, `lib/schedule-data.ts`
2. ข้อมูลจัดการได้จาก `data/content.json`

`data/content.json` เก็บข้อมูลสำคัญ 2 หมวด:

- `achievements` สำหรับรางวัล ผลงาน วิชาการ และการอบรม
- `activities` สำหรับภาพกิจกรรม

Production fallback ปัจจุบัน:

- `app/admin/actions.ts` เรียก `fetchContent()`
- ถ้าไม่มี `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO` ใน production จะคืนค่า `data/content.json`
- ถ้ามี env ครบ จะพยายามอ่าน `data/content.json` จาก GitHub API
- ถ้าอ่าน GitHub ไม่ได้หรือ JSON เสีย จะ fallback กลับมาใช้ไฟล์ local

จุดนี้สำคัญมาก เพราะเคยเกิดปัญหาเว็บจริงไม่แสดงรางวัล/ภาพกิจกรรม เนื่องจาก production ไม่มี GitHub config แล้ว `fetchContent()` คืนค่าว่าง

## หน้าแรก

ไฟล์หลัก:

- `app/page.tsx`
- `components/HeroStage.tsx`
- `components/AchievementCarousel.tsx`
- `components/ActivityGallery.tsx`

เนื้อหาปัจจุบัน:

- Hero พร้อมโมเดล 3D/ไซบอร์กและโลโก้
- ข้อความเว็บครูนิรุทธิ์ เสวะนา
- SAR Summary แสดง GPA, SD และคุณภาพผู้เรียน
- แสดงรางวัลและเกียรติยศบางส่วน
- แสดงผลงานวิชาการบางส่วน
- แสดงการพัฒนาตนเองบางส่วน
- แสดงภาพกิจกรรมบางส่วน

Spline scene สามารถตั้งผ่าน env:

```text
NEXT_PUBLIC_SPLINE_SCENE=https://prod.spline.design/your-scene/scene.splinecode
```

ถ้าไม่ตั้ง env ให้ดูค่า default ใน `components/HeroStage.tsx`

## ห้องเรียนออนไลน์

ไฟล์หลัก:

- `app/classroom/page.tsx`
- `lib/schedule-data.ts`
- `components/PageHero.tsx`

เนื้อหาปัจจุบัน:

- Hero ใช้ภาพ `/49.png`
- รายวิชา/พื้นที่เรียนรู้ออนไลน์
- ตารางสอนของครูนิรุทธิ์จากไฟล์ตารางเรียนที่เคยวิเคราะห์
- ตารางควรแสดงเป็นตารางเดียวแบบตารางเรียนปกติ ไม่แยกรายวัน

## งานประจำชั้น

ไฟล์หลัก:

- `app/homeroom/page.tsx`
- `components/HomeroomClassroom.tsx`
- `components/HomeroomReserveFund.tsx`
- `lib/schedule-data.ts`
- `public/homeroom-students.csv`

ข้อมูลปัจจุบัน:

- ครูประจำชั้นมัธยมศึกษาปีที่ 3
- นักเรียนทั้งหมด 20 คน
- ชาย 9 คน หญิง 11 คน
- สมาชิกในห้องเรียนแสดงเป็น 3D cards
- การ์ดนักเรียนแสดงเลขที่ ชื่อเล่น รูป ชื่อ-นามสกุล และสถิติ SDQ
- Dashboard คำนวณจากข้อมูลนักเรียน
- ตารางเรียน ม.3 จากไฟล์ตารางเรียนที่เคยวิเคราะห์
- รายงานกองทุนสำรองห้องเรียน พร้อม model/visual แบบ 3D และรายการเงิน
- รายการเงินทุนสำรองใช้ pagination แสดงหน้าละ 3 รายการ

แนวทางพัฒนาต่อ:

- ปุ่มแก้ไขควรมีปุ่มเดียวบริเวณหัวข้อ Student Members
- เมื่อกดแก้ไข ให้ขอรหัส `42010113`
- ถ้ารหัสถูก ให้เปิด modal ตารางนักเรียนทุกคน
- แก้ไขข้อมูลนักเรียนจากตารางเดียว แล้วบันทึกกลับ CSV
- Dashboard ต้องคำนวณใหม่อัตโนมัติหลังบันทึก

## รางวัลและผลงาน

ไฟล์หลัก:

- `app/achievements/page.tsx`
- `app/achievements/awards/page.tsx`
- `app/achievements/academic/page.tsx`
- `app/achievements/development/page.tsx`
- `components/AchievementCarousel.tsx`
- `components/AchievementSubNav.tsx`
- `data/content.json`

หมวดข้อมูลที่ผู้ใช้ต้องการ:

- รางวัลและผลงานตนเอง
- รางวัลและผลงานผู้เรียน
- รางวัลผลงานสถานศึกษา
- การอบรมและพัฒนาตนเอง

ข้อมูลควรอ่านจาก `data/content.json` เป็นหลัก เพื่อให้หน้าแรก หน้าแยก และระบบ admin ใช้ข้อมูลชุดเดียวกัน

## ภาพกิจกรรม

ไฟล์หลัก:

- `app/activities/page.tsx`
- `components/ActivityGallery.tsx`
- `components/ActivitySlider.tsx`
- `data/content.json`

พฤติกรรมที่ควรรักษา:

- แต่ละกิจกรรมมีภาพได้มากกว่า 1 ภาพ
- รูปภาพในกิจกรรมเลื่อนอัตโนมัติทุก 5 วินาที
- มีปุ่มเลื่อนภาพ
- คลิกกิจกรรมเพื่อดูภาพทั้งหมด
- คลิกภาพเพื่อดูขนาดใหญ่ ซูมเข้า/ออกได้
- ข้อมูลในหน้าแรกและหน้าภาพกิจกรรมต้องดึงจากแหล่งเดียวกัน ไม่แก้ซ้ำหลายที่

## PA

ไฟล์หลัก:

- `app/pa/page.tsx`
- `lib/pa-data.ts`
- `components/PaEvidenceGallery.tsx`
- `components/PaTimelineNav.tsx`
- `public/pa-report-60-68-2.pdf`
- `public/pa-agreement-2569-placeholder.pdf`

สถานะล่าสุด:

- หน้า PA เหลือหน้าเดียวที่ `/pa`
- ไม่มีหน้าย่อย `/pa/report`
- ใช้ข้อมูลจากส่วนรายงานผลการพัฒนางานตามข้อตกลง (PA)
- ยังคงข้อมูลทั่วไปของผู้จัดทำข้อตกลง
- ยังคงภาระงานตามที่ ก.ค.ศ. กำหนด
- ภาระงานควรแสดงเป็นตาราง 2 คอลัมน์ คือ `วิชา/กิจกรรม` และ `จำนวนชั่วโมง/สัปดาห์`
- ต้องไม่มีแถบเลื่อนข้อมูลในส่วนภาระงาน
- มีไฟล์ PDF รายงาน PA แสดงในหน้า
- มีไฟล์ PDF ข้อตกลง PA แบบ placeholder ให้แทนไฟล์จริงชั่วคราว

ถ้าผู้ใช้เอาไฟล์จริงมาใส่ ให้แทนที่:

```text
public/pa-agreement-2569-placeholder.pdf
```

ข้อควรระวัง:

- `public/pa-report-60-68-2.pdf` มีขนาดใหญ่ ควรระวัง GitHub/Vercel limit
- ถ้าต้องแก้ข้อความ PA ให้แก้ที่ `lib/pa-data.ts` ก่อน
- ถ้าต้องแก้ layout ให้แก้ที่ `app/pa/page.tsx` และ component ที่เกี่ยวข้อง

## ระบบบริหารจัดการใหม่

ระบบเดิมถูกรื้อออกแล้วเพื่อเริ่มต้นใหม่อย่างเป็นระเบียบ

ไฟล์ที่เกี่ยวข้อง:

- `app/admin/page.tsx`
- `app/admin/layout.tsx`
- `app/admin/admin-modules.ts`
- `app/admin/components/AdminModulePlaceholder.tsx`
- `app/admin/actions.ts`
- `app/admin/login/page.tsx`
- `app/admin/login/actions.ts`
- `middleware.ts`

ไฟล์ระบบจัดการเดิมที่ถูกลบใน local:

- `app/admin/components/AdminRecordManager.tsx`
- `app/admin/components/ContentManager.tsx`
- `app/admin/hero/HeroSettingsForm.tsx`

อย่านำระบบเดิมกลับมาโดยไม่จำเป็น เพราะผู้ใช้ตั้งใจให้รื้อระบบบริหารจัดการและเริ่มออกแบบใหม่

### Login ปัจจุบัน

ระบบ login อยู่ที่:

- `app/admin/login/page.tsx`
- `app/admin/login/actions.ts`
- `middleware.ts`

ข้อมูล login ปัจจุบันในโค้ด:

```text
username: boasnirut
password: 42010113
cookie: admin_token=authenticated
อายุ cookie: 1 วัน
```

ข้อเสนอสำหรับรอบถัดไป:

- ย้าย username/password ไปไว้ใน environment variables
- ใช้ `ADMIN_USERNAME`
- ใช้ `ADMIN_PASSWORD`
- อย่า hardcode รหัสผ่านไว้ใน repository ระยะยาว

### เมนู admin ใหม่

เมนูอยู่ใน `app/admin/admin-modules.ts`

มี 8 โมดูล:

| โมดูล | Path | ขอบเขต |
| --- | --- | --- |
| หน้าหลัก | `/admin/home` | ข้อความ Hero, ปฏิทินกิจกรรม, ปุ่มลิงก์, สถิติ SAR |
| ห้องเรียนออนไลน์ | `/admin/classroom` | รายวิชา, สื่อ, ลิงก์ Google Classroom, ตารางสอน |
| งานประจำชั้น | `/admin/homeroom` | นักเรียน, SDQ, ตารางเรียน ม.3, กองทุนสำรอง |
| รางวัลและผลงาน | `/admin/achievements` | ผลงานครู, ผู้เรียน, สถานศึกษา, อบรม |
| ภาพกิจกรรม | `/admin/activities` | กิจกรรม, หลายภาพต่อกิจกรรม, Google Photos, เปิด/ปิด |
| PA | `/admin/pa` | ข้อมูลทั่วไป, ภาระงาน, องค์ประกอบ 1, องค์ประกอบ 2 |
| ภาพหน้าปก | `/admin/hero` | ภาพปกทุกหน้า, ข้อความนำ, preview |
| ตั้งค่าระบบ | `/admin/settings` | รหัสผ่าน, GitHub token, deploy, import/export |

### หลักการออกแบบระบบ admin ใหม่

ระบบใหม่ควรยึดหลักนี้:

1. แยกโมดูลตามหน้าเว็บจริง
2. ทุกโมดูลใช้ธีมเดียวกับเว็บหลัก
3. แก้ไขข้อมูลจากหน้า admin แล้วหน้าเว็บจริงต้องอัปเดตจากข้อมูลชุดเดียวกัน
4. ลดการแก้ไฟล์หลายจุด
5. ทุก action สำคัญต้องมี notification สำเร็จ/ไม่สำเร็จ
6. Loading ระหว่างเปลี่ยนหน้าหรือบันทึก ให้ใช้ notification แบบโลโก้ขนาดเล็กกลางจอ พร้อม blur ฉากหลัง
7. Notification สำเร็จ/ไม่สำเร็จ ให้ใช้เครื่องหมายถูก/กากบาท ไม่ใช้โลโก้
8. ปุ่มแก้ไข/เพิ่ม/ลบที่สำคัญต้องขอรหัสหรือผ่าน session admin
9. Import/export CSV ต้องใช้ encoding UTF-8 เพื่อป้องกันภาษาไทยเพี้ยน
10. รูปภาพที่อัปโหลดควรอยู่ใน `public/uploads/`

## คู่มือระบบบริหารจัดการใหม่

### 1. Dashboard หลัก

Path: `/admin`

หน้าที่:

- แสดงภาพรวมโมดูลทั้งหมด
- บอกสถานะว่าโมดูลใดสร้างแล้ว/ยังรอออกแบบ
- เป็นจุดเริ่มต้นไปยังโมดูลย่อย

ควรเพิ่มในอนาคต:

- สถานะข้อมูลล่าสุด
- จำนวนกิจกรรม
- จำนวนผลงาน
- จำนวนภาพที่อัปโหลด
- วันเวลาที่แก้ไขล่าสุด
- ปุ่ม export ข้อมูลทั้งหมด

### 2. จัดการหน้าหลัก

Path: `/admin/home`

ควรจัดการ:

- ชื่อเว็บ
- ชื่อรอง
- ข้อความ Hero
- ปุ่มลิงก์บน Hero
- สถิติ SAR
- ปฏิทินกิจกรรมหน้าแรก ถ้าจะนำกลับมาใช้งาน

ข้อมูลที่ควรบันทึก:

```text
data/home.json
data/calendar-events.csv
```

### 3. จัดการห้องเรียนออนไลน์

Path: `/admin/classroom`

ควรจัดการ:

- รายวิชา
- ลิงก์ห้องเรียนออนไลน์
- สื่อการสอน
- ใบงาน
- แบบทดสอบ
- ตารางสอน

ข้อเสนอข้อมูล:

```text
data/classroom.json
data/teacher-schedule.csv
```

### 4. จัดการงานประจำชั้น

Path: `/admin/homeroom`

ควรจัดการ:

- รายชื่อนักเรียน ม.3
- รูปนักเรียน
- ชื่อเล่น
- เพศ
- สถานะ SDQ
- ข้อมูลสถิติที่ใช้ใน dashboard
- ตารางเรียน ม.3
- กองทุนสำรองห้องเรียน

ข้อมูลที่มีอยู่แล้ว:

```text
public/homeroom-students.csv
```

ข้อเสนอข้อมูลเพิ่มเติม:

```text
data/homeroom-fund.csv
data/homeroom-schedule.csv
```

แนวทาง UI:

- ใช้ปุ่มแก้ไขปุ่มเดียวข้างหัวข้อ Student Members
- หลังผ่านรหัส ให้เปิด modal ตารางรายชื่อทุกคน
- ให้แก้ทีละแถวหรือแก้หลายแถวแล้วกดบันทึกครั้งเดียว
- หลังบันทึก ให้ refresh ข้อมูล dashboard อัตโนมัติ
- ส่วนกองทุนสำรองควรมีเพิ่ม/แก้ไข/ลบรายการ และ pagination หน้าละ 3 รายการ

### 5. จัดการรางวัลและผลงาน

Path: `/admin/achievements`

ควรจัดการ 4 หมวด:

- รางวัลและผลงานตนเอง
- รางวัลและผลงานผู้เรียน
- รางวัลผลงานสถานศึกษา
- การอบรมและพัฒนาตนเอง

ข้อมูลหลัก:

```text
data/content.json
```

Schema แนะนำ:

```json
{
  "id": "achievement-001",
  "category": "self | student | school | development | academic | awards",
  "title": "ชื่อรายการ",
  "description": "รายละเอียด",
  "year": "2569",
  "images": ["/uploads/example.jpg"],
  "fileUrl": "/uploads/example.pdf",
  "isPublished": true,
  "order": 1
}
```

### 6. จัดการภาพกิจกรรม

Path: `/admin/activities`

ควรจัดการ:

- ชื่อกิจกรรม
- วันที่
- รายละเอียด
- ภาพหลายภาพต่อกิจกรรม
- ภาพปกกิจกรรม
- ลิงก์ Google Photos ถ้ามี
- สถานะเปิด/ปิดการแสดงผล
- ลำดับการแสดงผล

ข้อมูลหลัก:

```text
data/content.json
```

Schema แนะนำ:

```json
{
  "id": "activity-001",
  "title": "ชื่อกิจกรรม",
  "date": "2569-08-30",
  "description": "รายละเอียด",
  "coverImage": "/uploads/activity-cover.jpg",
  "images": [
    "/uploads/activity-1.jpg",
    "/uploads/activity-2.jpg"
  ],
  "albumUrl": "https://photos.google.com/...",
  "isPublished": true,
  "order": 1
}
```

### 7. จัดการ PA

Path: `/admin/pa`

ควรจัดการ:

- ข้อมูลทั่วไปของผู้จัดทำข้อตกลง
- ภาระงานตามที่ ก.ค.ศ. กำหนด
- องค์ประกอบที่ 1
- องค์ประกอบที่ 2
- ประเด็นท้าทาย
- หลักฐานภาพประกอบ
- ไฟล์ PDF ข้อตกลง
- ไฟล์ PDF รายงาน

ข้อมูลปัจจุบัน:

```text
lib/pa-data.ts
```

ข้อเสนอระยะต่อไป:

- ย้ายข้อมูล PA จาก TypeScript ไปเป็น JSON เพื่อให้ admin แก้ได้ง่าย
- ใช้ `data/pa.json`
- ให้ `lib/pa-data.ts` ทำหน้าที่ normalize หรือ export fallback เท่านั้น

### 8. จัดการภาพปก

Path: `/admin/hero`

ควรจัดการ:

- ภาพปกแต่ละหน้า
- ข้อความหัวหน้า
- คำอธิบายหน้า
- preview ภาพก่อนบันทึก
- ตรวจสัดส่วนภาพไม่ให้ยืดหรือบีบ

ข้อมูลแนะนำ:

```text
data/page-heroes.json
```

### 9. ตั้งค่าระบบ

Path: `/admin/settings`

ควรจัดการ:

- เปลี่ยนรหัสผ่าน admin
- ตรวจสถานะ GitHub API
- ตรวจสถานะ Vercel deploy
- นำเข้า/ส่งออกข้อมูลทั้งหมด
- สำรองข้อมูลเป็น zip หรือ json

## แผนพัฒนาระบบบริหารจัดการใหม่

### Phase 1: วางแกนข้อมูลกลาง

เป้าหมาย:

- สร้างชนิดข้อมูลกลางสำหรับ admin
- เลือกว่าจะใช้ JSON หรือ CSV ในแต่ละส่วน
- ทำ helper อ่าน/เขียนข้อมูลแบบเดียวกันทุกโมดูล

งานที่ควรทำ:

- สร้าง `lib/admin-data.ts`
- สร้าง `lib/admin-auth.ts`
- สร้าง type สำหรับ `Achievement`, `Activity`, `Student`, `FundTransaction`, `PageHero`, `PaContent`
- ทำ function validate ข้อมูลก่อนบันทึก

### Phase 2: ระบบบันทึกข้อมูล

เป้าหมาย:

- ให้ admin แก้ข้อมูลแล้วบันทึกได้จริง

แนวทาง:

- development อ่าน/เขียนไฟล์ local
- production อ่าน/เขียนผ่าน GitHub API
- ใช้ `updateGithubFile()` และ `uploadGithubBase64File()` ใน `lib/github-api.ts`
- ทุกการบันทึกต้องแสดง toast สำเร็จ/ไม่สำเร็จ

### Phase 3: Upload รูปและไฟล์

เป้าหมาย:

- รองรับการอัปโหลดรูปภาพและ PDF จากหน้า admin

ข้อกำหนด:

- รูปอยู่ใน `public/uploads/`
- ตั้งชื่อไฟล์แบบไม่ชนกัน เช่น `timestamp-slug.ext`
- บีบอัดรูปหรือแนะนำขนาดที่เหมาะสม
- รองรับ `.jpg`, `.jpeg`, `.png`, `.webp`, `.pdf`
- ระวังไฟล์ PDF ใหญ่เกินไป

### Phase 4: ทำ CRUD ทีละโมดูล

ลำดับแนะนำ:

1. ภาพกิจกรรม เพราะมีผลต่อหน้าแรกและ `/activities`
2. รางวัลและผลงาน เพราะใช้ข้อมูลร่วมหลายหน้า
3. งานประจำชั้น เพราะมี CSV, dashboard และ pagination
4. ห้องเรียนออนไลน์ เพราะเกี่ยวกับตารางสอนและลิงก์
5. ภาพปก เพราะเป็นข้อมูลกลางทุกหน้า
6. PA เพราะข้อมูลเยอะและต้องระวัง layout
7. หน้าหลักและตั้งค่าระบบ

### Phase 5: Import/Export

เป้าหมาย:

- ผู้ใช้สำรองข้อมูลเองได้
- ย้ายข้อมูลกลับเข้าเว็บได้ง่าย

ควรมี:

- export `content.json`
- export/import `calendar-events.csv`
- export/import `homeroom-students.csv`
- export/import กองทุนสำรอง
- export ข้อมูลทั้งหมดเป็น zip ในอนาคต

ข้อควรระวัง:

- CSV ต้องเป็น UTF-8
- ระวัง comma ในข้อความภาษาไทย
- ถ้ามี field ยาว ควร escape ตามมาตรฐาน CSV

### Phase 6: Preview ก่อนเผยแพร่

เป้าหมาย:

- ผู้ใช้เห็นผลก่อนบันทึกหรือก่อน deploy

ควรทำ:

- preview card
- preview gallery
- preview page hero
- preview ตาราง
- validate ข้อความล้นบรรทัดบน mobile

### Phase 7: Deploy Workflow

เป้าหมาย:

- หลังแก้ข้อมูลผ่าน admin แล้วเผยแพร่ขึ้นเว็บจริงได้ปลอดภัย

แนวทาง:

- บันทึกข้อมูลผ่าน GitHub API ให้เกิด commit ใหม่
- Vercel auto deploy จาก GitHub
- หน้า admin แสดงสถานะว่า deploy ล่าสุดสำเร็จหรือยัง

## แนวทางสำหรับ AI หรือนักพัฒนาที่มาทำต่อ

ก่อนแก้ไข:

1. อ่าน README นี้ก่อน
2. ตรวจ `git status --short`
3. อย่าลบหรือย้อน user changes โดยไม่ถาม
4. ตรวจหน้าเว็บที่เกี่ยวข้องใน `app/`
5. ตรวจข้อมูลใน `lib/` และ `data/`
6. ถ้าแก้ admin ให้ดู `app/admin/admin-modules.ts` เป็นจุดตั้งต้น
7. ถ้าแก้ข้อมูลรางวัล/กิจกรรม ให้รักษา `data/content.json` เป็นแหล่งข้อมูลกลาง
8. ถ้าแก้ PA ให้ระวัง `lib/pa-data.ts` และ layout ไม่ให้ข้อความล้น
9. หลังแก้โค้ดให้รัน `npm run build`
10. อย่า commit/push/deploy เว้นแต่ผู้ใช้สั่งชัดเจน

หลักการ UI:

- ใช้ธีมดำ เทาเข้ม ส้มทอง และ glow
- อย่าทำ UI เป็นสีเดียวทั้งหน้า
- อย่าใส่ card ซ้อน card
- ตรวจข้อความภาษาไทยไม่ให้เพี้ยน
- ตรวจข้อความไม่ให้ล้นบนมือถือ
- รูปภาพต้องไม่บีบหรือยืดผิดสัดส่วน
- ปุ่มควรใช้ icon จาก lucide-react
- ตารางต้องอ่านง่าย สมดุล และไม่มีแถบเลื่อนถ้าไม่จำเป็น

หลักการข้อมูล:

- ข้อมูลที่แสดงหลายหน้าต้องมี source เดียว
- หลีกเลี่ยง hardcode ซ้ำหลายไฟล์
- ใช้ JSON สำหรับข้อมูลโครงสร้างซับซ้อน
- ใช้ CSV สำหรับข้อมูลตารางที่ผู้ใช้คุ้นเคย เช่น นักเรียน กิจกรรมปฏิทิน และรายการเงิน
- รองรับ fallback local เสมอ เพื่อไม่ให้เว็บจริงว่างถ้า GitHub API มีปัญหา

## Environment Variables

ตัวแปรที่มีหรือควรใช้:

| Variable | ใช้ทำอะไร |
| --- | --- |
| `NEXT_PUBLIC_SPLINE_SCENE` | URL Spline scene หน้าแรก |
| `GITHUB_TOKEN` | Token สำหรับอ่าน/เขียนไฟล์ผ่าน GitHub API |
| `GITHUB_OWNER` | เจ้าของ repo เช่น `boasnirut` |
| `GITHUB_REPO` | ชื่อ repo เช่น `Site69` |
| `ADMIN_USERNAME` | แนะนำให้เพิ่มในอนาคต |
| `ADMIN_PASSWORD` | แนะนำให้เพิ่มในอนาคต |

ปัจจุบัน `app/admin/login/actions.ts` ยัง hardcode username/password อยู่ ควรแก้ในรอบพัฒนาระบบ admin จริง

## การ commit, push และ deploy

เมื่อผู้ใช้ตรวจตัวอย่างในเครื่องแล้วสั่งให้เผยแพร่:

```bash
git status --short
npm run build
git add .
git commit -m "ข้อความ commit"
git push origin main
```

จากนั้น Vercel จะ deploy อัตโนมัติ

หลัง deploy ควรตรวจ:

```text
https://boasnirut.in.th
https://boasnirut.in.th/classroom
https://boasnirut.in.th/homeroom
https://boasnirut.in.th/achievements
https://boasnirut.in.th/activities
https://boasnirut.in.th/pa
```

## Known Issues และงานค้าง

- ระบบ admin ใหม่ยังเป็น placeholder ยังบันทึกข้อมูลจริงไม่ได้
- รหัสผ่าน admin ยัง hardcoded
- ข้อมูล PA ยังอยู่ใน TypeScript ไม่ใช่ JSON
- ไฟล์ PDF PA มีขนาดใหญ่ ควรประเมินว่าจะเก็บใน repo ต่อหรือย้ายไป external storage
- ต้องตรวจ encoding ภาษาไทยทุกครั้งหลัง import/export CSV
- ต้องตรวจ production หลัง deploy เพราะข้อมูลบางส่วนพึ่ง fallback จาก `data/content.json`
- หน้าแรกใน local ปัจจุบันยังแสดง Activity Gallery ไม่ใช่ปฏิทินกิจกรรม
- ถ้าจะนำระบบปฏิทินกลับมา ต้องผูก `calendar-events.csv` กับ component ที่ใช้งานจริงอีกครั้ง

## สรุปสำหรับการพัฒนารอบถัดไป

เป้าหมายรอบถัดไปคือสร้างระบบบริหารจัดการใหม่จากโครง placeholder ที่มีอยู่ โดยเริ่มจากโมดูลที่กระทบผู้ใช้มากที่สุดก่อน ได้แก่ ภาพกิจกรรม รางวัลและผลงาน และงานประจำชั้น

อย่าเริ่มจากการรื้อหน้าเว็บสาธารณะ เพราะหน้าเว็บจริงใช้งานได้แล้ว ให้สร้าง admin ใหม่ให้มั่นคงก่อน แล้วค่อยเชื่อมข้อมูลจาก admin ไปยังหน้าเว็บทีละส่วน
