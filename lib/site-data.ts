import {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpenCheck,
  CalendarCheck,
  Camera,
  ClipboardCheck,
  FileCheck2,
  GraduationCap,
  Images,
  LayoutDashboard,
  LineChart,
  MonitorPlay,
  Presentation,
  Sparkles,
  Trophy,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import contentData from "@/data/content.json";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  subItems?: { href: string; label: string; description: string; }[];
};

export const navigation: NavItem[] = [
  {
    href: "/",
    label: "หน้าหลัก",
    description: "หน้าแรกเว็บไซต์ครูนิรุทธิ์ เสวะนา",
    icon: LayoutDashboard
  },
  {
    href: "/classroom",
    label: "ห้องเรียนออนไลน์",
    description: "บทเรียน สื่อ ใบงาน และการประเมินผู้เรียน",
    icon: MonitorPlay
  },
  {
    href: "/homeroom",
    label: "งานประจำชั้น",
    description: "ระบบดูแลช่วยเหลือนักเรียนและงานที่ปรึกษา",
    icon: UsersRound
  },
  {
    href: "/achievements",
    label: "รางวัลและผลงาน",
    description: "ผลงานครู นักเรียน และชุมชนการเรียนรู้",
    icon: Trophy,
    subItems: [
      { href: "/achievements", label: "รางวัลและเกียรติยศ", description: "รางวัลตนเอง ผู้เรียน และสถานศึกษา" },
      { href: "/achievements/academic", label: "ผลงานวิชาการ", description: "Best Practice, นวัตกรรม และงานวิจัย" },
      { href: "/achievements/development", label: "การพัฒนาตนเอง", description: "อบรม, สัมมนา, ประชุม และเสริมทักษะ" }
    ]
  },
  {
    href: "/activities",
    label: "ภาพกิจกรรม",
    description: "คลังภาพกิจกรรมการเรียนรู้และกิจกรรมพัฒนาผู้เรียน",
    icon: Images
  },
  {
    href: "/pa",
    label: "การพัฒนางานตามข้อตกลง (PA)",
    description: "เป้าหมาย ตัวชี้วัด หลักฐาน และผลลัพธ์",
    icon: BadgeCheck,
    subItems: [
      { href: "/pa", label: "ข้อตกลงในการพัฒนางาน (PA)", description: "กรอบข้อตกลง ภาระงาน และการประเมิน PA" },
      { href: "/pa/report", label: "รายงานการพัฒนางาน (PA)", description: "สรุปผลการพัฒนางานตามข้อตกลง (PA)" }
    ]
  }
];

export const summaryStats = [
  { label: "แผนการจัดการเรียนรู้", value: "24", detail: "หน่วยการเรียน", icon: BookOpenCheck },
  { label: "หลักฐานประเมิน", value: "86", detail: "รายการ", icon: FileCheck2 },
  { label: "นักเรียนในความดูแล", value: "128", detail: "คน", icon: UsersRound },
  { label: "ผลสัมฤทธิ์ดีขึ้น", value: "18%", detail: "เทียบก่อนเรียน", icon: LineChart }
];

export const homeSections = [
  {
    title: "ห้องเรียนออนไลน์",
    href: "/classroom",
    eyebrow: "Online Learning",
    description: "บทเรียน สื่อ ใบงาน แบบทดสอบ และผลสะท้อนกลับจากนักเรียน",
    icon: MonitorPlay
  },
  {
    title: "งานประจำชั้น",
    href: "/homeroom",
    eyebrow: "Student Care",
    description: "ข้อมูลดูแลช่วยเหลือนักเรียน งานโฮมรูม และการประสานผู้ปกครอง",
    icon: UsersRound
  },
  {
    title: "รางวัลและผลงาน",
    href: "/achievements",
    eyebrow: "Portfolio",
    description: "เกียรติบัตร ผลงานนักเรียน นวัตกรรม และการเผยแพร่ผลงาน",
    icon: Award
  },
  {
    title: "ภาพกิจกรรม",
    href: "/activities",
    eyebrow: "Activity Gallery",
    description: "ภาพกิจกรรมในชั้นเรียน กิจกรรมพัฒนาผู้เรียน และชุมชนการเรียนรู้",
    icon: Camera
  },
  {
    title: "การพัฒนางานตามข้อตกลง (PA)",
    href: "/pa",
    eyebrow: "Performance Agreement",
    description: "ประเด็นท้าทาย ตัวชี้วัด วิธีดำเนินงาน และหลักฐานผลลัพธ์",
    icon: BadgeCheck
  }
];

export const evidenceTimeline = [
  {
    period: "ภาคเรียนที่ 1",
    title: "วางแผนและออกแบบหน่วยการเรียนรู้",
    detail: "จัดทำแผนการสอนเชิงรุก แบบประเมินก่อนเรียน และเครื่องมือเก็บหลักฐาน",
    icon: CalendarCheck
  },
  {
    period: "ระหว่างภาคเรียน",
    title: "จัดกิจกรรมและติดตามผลผู้เรียน",
    detail: "บันทึกผลการเรียนรู้ สะท้อนผลรายสัปดาห์ และดูแลผู้เรียนเป็นรายบุคคล",
    icon: ClipboardCheck
  },
  {
    period: "ปลายภาคเรียน",
    title: "สรุปผลและเผยแพร่ผลงาน",
    detail: "จัดทำรายงานผลสัมฤทธิ์ คัดเลือกหลักฐานเด่น และเตรียมรับการประเมิน",
    icon: Sparkles
  }
];

export const sarProfile = [
  { label: "ชื่อ-สกุล", value: "นายนิรุทธิ์ เสวะนา" },
  { label: "ตำแหน่ง", value: "ครู คศ.1" },
  { label: "กลุ่มสาระ", value: "วิทยาศาสตร์และเทคโนโลยี" },
  { label: "สถานศึกษา", value: "โรงเรียนบ้านน้ำพร" },
  { label: "สังกัด", value: "สพป.เลย เขต 1" }
];

export const sarGpa = [
  { level: "ม.1", gpa: "2.46", sd: "1.22" },
  { level: "ม.2", gpa: "3.25", sd: "1.02" },
  { level: "ม.3", gpa: "3.50", sd: "1.02" }
];

export const sarQuality = [
  {
    title: "คุณลักษณะอันพึงประสงค์",
    values: ["ดีเยี่ยม 60.5%", "ดี 20.9%", "ผ่าน 18.6%"]
  },
  {
    title: "ทักษะการอ่าน คิดวิเคราะห์ และเขียน",
    values: ["ดีเยี่ยม 62.8%", "ดี 27.9%", "ผ่าน 9.3%"]
  }
];

export const sarQualityCharts = [
  {
    title: "คุณลักษณะอันพึงประสงค์",
    excellent: 60.5,
    good: 20.9,
    passed: 18.6
  },
  {
    title: "ทักษะการอ่าน คิดวิเคราะห์ และเขียน",
    excellent: 62.8,
    good: 27.9,
    passed: 9.3
  }
];

export const sarTeachingSubjects = [
  { subject: "วิทยาการคำนวณ", level: "ป.4-ป.6", hours: "3 ชม./สัปดาห์" },
  { subject: "ออกแบบและเทคโนโลยี", level: "ม.1-ม.3", hours: "6 ชม./สัปดาห์" },
  { subject: "สุขศึกษาและพลศึกษา", level: "ป.6-ม.3", hours: "7 ชม./สัปดาห์" },
  { subject: "การงานอาชีพ", level: "ม.3", hours: "1 ชม./สัปดาห์" },
  { subject: "ต้านทุจริตศึกษา", level: "ป.5-ป.6", hours: "2 ชม./สัปดาห์" },
  { subject: "ลูกเสือ-เนตรนารี", level: "ป.1-ม.3", hours: "1 ชม./สัปดาห์" },
  { subject: "โรงเรียนวิถีพุทธ", level: "ป.1-ม.3", hours: "1 ชม./สัปดาห์" }
];

export const sarAssignments = [
  "งานบริหารทั่วไป",
  "งานเทคโนโลยีสารสนเทศ",
  "งานกิจการนักเรียน",
  "งานสภานักเรียน",
  "งานอาคารสถานที่",
  "ประจำชั้นมัธยมศึกษาปีที่ 3",
  "งานประชาสัมพันธ์",
  "งานระบบฐานข้อมูล",
  "งานแนะแนว"
];

export const sarAchievements = [
  "ครูชนคนคุณธรรม",
  "ครูชนคนดีศรีเลย 1",
  "รางวัลชนะเลิศ Comic Strip ระดับ ป.1-3",
  "ICT Talent ภาครัฐ ระดับดี"
];

export const sarDevelopment = [
  "AI สำหรับการจัดการเรียนรู้และการประเมินผล",
  "การรู้เท่าทันและการกำกับดูแล AI อย่างมีจริยธรรม",
  "Smart PA ด้วย AI สำหรับการประเมินและนวัตกรรม",
  "Google Gemini AI for Education",
  "การพัฒนาทักษะภาษาอังกฤษตามกรอบ CEFR"
];

export const courseSpaces = [
  {
    title: "วิทยาการคำนวณ ป.4-ป.6",
    level: "ประถมศึกษาตอนปลาย",
    lessons: "8 บทเรียน",
    assessments: "4 แบบประเมิน",
    status: "พร้อมใช้"
  },
  {
    title: "ออกแบบและเทคโนโลยี ม.1-ม.3",
    level: "มัธยมศึกษาตอนต้น",
    lessons: "10 บทเรียน",
    assessments: "6 แบบประเมิน",
    status: "กำลังอัปเดต"
  },
  {
    title: "Digital Literacy & Cyber Safety",
    level: "ม.3",
    lessons: "5 หน่วยการเรียนรู้",
    assessments: "Dashboard ติดตามผล",
    status: "หน่วยท้าทาย"
  },
  {
    title: "Smart Packaging NFC",
    level: "ม.3",
    lessons: "โครงงานอาชีพ",
    assessments: "Rubric ชิ้นงาน",
    status: "Project-based"
  }
];

export const classroomFlow = [
  "เชื่อมลิงก์บทเรียน วิดีโอ สไลด์ และใบงานในที่เดียว",
  "จัดเก็บแบบทดสอบก่อนเรียน หลังเรียน และผลสะท้อนกลับ",
  "รวบรวมชิ้นงานและแฟ้มส่งงานของนักเรียน",
  "สรุปผลการเรียนรู้เพื่อใช้เป็นหลักฐานประเมิน"
];

export const homeroomFocus = [
  { title: "นักเรียน ม.3", value: "20", detail: "ชาย 9 คน หญิง 11 คน" },
  { title: "การเยี่ยมบ้าน", value: "100%", detail: "จัดเก็บหลักฐานการเยี่ยมบ้านและการสื่อสารกับผู้ปกครอง" },
  { title: "กิจกรรมโฮมรูม", value: "รายสัปดาห์", detail: "บันทึกกิจกรรมเสริมวินัย คุณธรรม และทักษะชีวิต" },
  { title: "กลุ่มติดตามใกล้ชิด", value: "5 คน", detail: "ติดตามจาก SDQ การมาเรียน และข้อมูลครูที่ปรึกษา" }
];

export const advisoryTasks = [
  "คัดกรองนักเรียนและจัดทำข้อมูลสารสนเทศรายบุคคล",
  "บันทึกโฮมรูม การมาเรียน และพฤติกรรมสำคัญ",
  "ประสานผู้ปกครองผ่านช่องทางออนไลน์และโทรศัพท์",
  "ส่งต่อความช่วยเหลือเมื่อพบปัญหาด้านการเรียนหรือพฤติกรรม"
];

export const homeroomDashboard = [
  { label: "นักเรียนทั้งหมด", value: "20", detail: "ม.3", tone: "orange" },
  { label: "ชาย", value: "9", detail: "45%", tone: "blue" },
  { label: "หญิง", value: "11", detail: "55%", tone: "coral" },
  { label: "มาเรียนเฉลี่ย", value: "96.8%", detail: "เดือนล่าสุด", tone: "teal" },
  { label: "SDQ ปกติ", value: "15", detail: "75%", tone: "green" },
  { label: "ควรติดตาม", value: "5", detail: "เฝ้าระวัง 4 / ช่วยเหลือ 1", tone: "amber" }
];

export const homeroomInsights = [
  { title: "แฟ้มประวัติรายบุคคล", value: "ครบ 20 คน", detail: "ข้อมูลพื้นฐาน ผู้ปกครอง สุขภาพ และช่องทางติดต่อ" },
  { title: "แผนติดตามรายสัปดาห์", value: "5 รายการ", detail: "กลุ่มที่ควรสังเกตจาก SDQ การมาเรียน หรือพฤติกรรม" },
  { title: "กิจกรรมเสริมทักษะชีวิต", value: "4 ประเด็น", detail: "วินัย ความรับผิดชอบ ความปลอดภัยออนไลน์ และการทำงานร่วมกัน" },
  { title: "หลักฐานพร้อมประเมิน", value: "บันทึก/ภาพ/รายงาน", detail: "ใช้ประกอบระบบดูแลช่วยเหลือนักเรียนและงานประจำชั้น" }
];

export const homeroomSdqSummary = [
  { label: "ปกติ", value: 15, percent: 75, color: "green" },
  { label: "เฝ้าระวัง", value: 4, percent: 20, color: "amber" },
  { label: "ควรช่วยเหลือ", value: 1, percent: 5, color: "coral" }
];

export const homeroomStudents = [
  { no: 1, nickname: "กัมปั้น", fullName: "ธันวา บุญตัน", gender: "ชาย", image: "/student-m3-01.jpg", attendance: 98, sdq: { emotional: 2, conduct: 1, hyperactivity: 3, peer: 2, prosocial: 8 } },
  { no: 2, nickname: "แคน", fullName: "ธีรศักดิ์ บุญมาก", gender: "ชาย", image: "/student-m3-02.jpg", attendance: 96, sdq: { emotional: 3, conduct: 2, hyperactivity: 4, peer: 2, prosocial: 7 } },
  { no: 3, nickname: "คิว", fullName: "วรเมธ แสงขาว", gender: "ชาย", image: "/student-m3-03.jpg", attendance: 95, sdq: { emotional: 4, conduct: 2, hyperactivity: 5, peer: 3, prosocial: 7 } },
  { no: 4, nickname: "อิค", fullName: "สุรศักดิ์ ฤทธิศักดิ์", gender: "ชาย", image: "/student-m3-04.jpg", attendance: 99, sdq: { emotional: 1, conduct: 1, hyperactivity: 2, peer: 1, prosocial: 9 } },
  { no: 5, nickname: "โชกุน", fullName: "ธนโชติ นิวงษา", gender: "ชาย", image: "/student-m3-05.jpg", attendance: 94, sdq: { emotional: 5, conduct: 3, hyperactivity: 5, peer: 4, prosocial: 6 } },
  { no: 6, nickname: "จูดี้", fullName: "ณัฏฐวี ซุ้ยไกร", gender: "ชาย", image: "/student-m3-06.jpg", attendance: 97, sdq: { emotional: 2, conduct: 2, hyperactivity: 3, peer: 2, prosocial: 8 } },
  { no: 7, nickname: "วีโก้", fullName: "อนุสรณ์ โพธิ์พันธุ์", gender: "ชาย", image: "/student-m3-07.jpg", attendance: 96, sdq: { emotional: 3, conduct: 1, hyperactivity: 4, peer: 2, prosocial: 8 } },
  { no: 8, nickname: "ไนท์", fullName: "กฤษณะพงษ์ ฝอยทอง", gender: "ชาย", image: "/student-m3-08.jpg", attendance: 91, sdq: { emotional: 6, conduct: 4, hyperactivity: 6, peer: 5, prosocial: 5 } },
  { no: 9, nickname: "ออกัส", fullName: "วชิรวิทย์ คำบุผา", gender: "ชาย", image: "/student-m3-09.jpg", attendance: 98, sdq: { emotional: 2, conduct: 1, hyperactivity: 3, peer: 1, prosocial: 9 } },
  { no: 10, nickname: "โบนัส", fullName: "กวินตรา สุกสัก", gender: "หญิง", image: "/student-m3-10.jpg", attendance: 99, sdq: { emotional: 2, conduct: 1, hyperactivity: 2, peer: 1, prosocial: 9 } },
  { no: 11, nickname: "จูน", fullName: "กวิสรา เนินสง่า", gender: "หญิง", image: "/student-m3-11.jpg", attendance: 97, sdq: { emotional: 3, conduct: 1, hyperactivity: 3, peer: 2, prosocial: 8 } },
  { no: 12, nickname: "จีจี้", fullName: "จันทร์จิรา ครองเคหา", gender: "หญิง", image: "/student-m3-12.jpg", attendance: 96, sdq: { emotional: 3, conduct: 2, hyperactivity: 4, peer: 2, prosocial: 8 } },
  { no: 13, nickname: "ทิพย์", fullName: "ชญานี พรหมสาส์น", gender: "หญิง", image: "/student-m3-13.jpg", attendance: 95, sdq: { emotional: 4, conduct: 2, hyperactivity: 4, peer: 3, prosocial: 7 } },
  { no: 14, nickname: "ใบไผ่", fullName: "ปรายฉัตร โคตรอาษา", gender: "หญิง", image: "/student-m3-14.jpg", attendance: 98, sdq: { emotional: 2, conduct: 1, hyperactivity: 2, peer: 2, prosocial: 9 } },
  { no: 15, nickname: "ผักบุ้ง", fullName: "รักษา แสงขาว", gender: "หญิง", image: "/student-m3-15.jpg", attendance: 97, sdq: { emotional: 2, conduct: 2, hyperactivity: 3, peer: 2, prosocial: 8 } },
  { no: 16, nickname: "ไป๋", fullName: "อินฑิรา ถามูล", gender: "หญิง", image: "/student-m3-16.jpg", attendance: 96, sdq: { emotional: 3, conduct: 1, hyperactivity: 3, peer: 2, prosocial: 8 } },
  { no: 17, nickname: "แอ้น", fullName: "อินทิรา มาลา", gender: "หญิง", image: "/student-m3-17.jpg", attendance: 94, sdq: { emotional: 5, conduct: 2, hyperactivity: 5, peer: 4, prosocial: 6 } },
  { no: 18, nickname: "น้ำปั่น", fullName: "กมลลักษณ์ ศรีพิพัฒน์", gender: "หญิง", image: "/student-m3-18.jpg", attendance: 99, sdq: { emotional: 1, conduct: 1, hyperactivity: 2, peer: 1, prosocial: 9 } },
  { no: 19, nickname: "แก้ม", fullName: "น้ำเหนือ แก้วไกรสร", gender: "หญิง", image: "/student-m3-19.jpg", attendance: 98, sdq: { emotional: 2, conduct: 1, hyperactivity: 2, peer: 1, prosocial: 9 } },
  { no: 20, nickname: "อ่อง", fullName: "อ่อง พรมสาส์น", gender: "หญิง", image: "/student-m3-20.jpg", attendance: 97, sdq: { emotional: 2, conduct: 2, hyperactivity: 3, peer: 2, prosocial: 8 } }
];

export const awards = [
  {
    title: "นวัตกรรมการจัดการเรียนรู้ด้วย Coding",
    type: "ผลงานครู",
    year: "2568",
    detail: "ออกแบบกิจกรรมแก้ปัญหาเชิงคำนวณที่นักเรียนนำไปสร้างชิ้นงานได้จริง"
  },
  {
    title: "โครงงานนักเรียนด้านเทคโนโลยีเพื่อชุมชน",
    type: "ผลงานนักเรียน",
    year: "2568",
    detail: "นักเรียนพัฒนาต้นแบบสื่อดิจิทัลเพื่อสื่อสารข้อมูลท้องถิ่นและผลิตภัณฑ์ชุมชน"
  },
  {
    title: "การเผยแพร่สื่อการสอนออนไลน์",
    type: "ชุมชนการเรียนรู้",
    year: "2567",
    detail: "แลกเปลี่ยนสื่อ ใบงาน และแนวทางประเมินผลกับเครือข่ายครู"
  }
];

export const portfolioGallery = [
  {
    title: "เกียรติบัตรและการอบรม",
    image: "/placeholder-portfolio-certificates.jpg"
  },
  {
    title: "ผลงานผู้เรียน",
    image: "/placeholder-portfolio-student-work.jpg"
  },
  {
    title: "นวัตกรรมในชั้นเรียน",
    image: "/placeholder-portfolio-innovation.jpg"
  }
];

export const getAwardsSections = (achievements: any[]) => {
  const filterByCategory = (category: string) => achievements.filter(item => item.category === category);
  return [
    {
      title: "รางวัลและผลงานตนเอง",
      eyebrow: "Teacher Awards",
      description: "รวบรวมเกียรติบัตร ผลงานนวัตกรรม และหลักฐานเชิงประจักษ์ของครู",
      cards: filterByCategory("รางวัลและผลงานตนเอง")
    },
    {
      title: "รางวัลและผลงานผู้เรียน",
      eyebrow: "Student Awards",
      description: "แสดงผลงาน ชิ้นงาน การประกวด และความสำเร็จของนักเรียน",
      cards: filterByCategory("รางวัลและผลงานผู้เรียน")
    },
    {
      title: "รางวัลผลงานสถานศึกษา",
      eyebrow: "School Recognition",
      description: "จัดเก็บภาพผลงานระดับสถานศึกษา โครงการเด่น และความสำเร็จของโรงเรียน",
      cards: filterByCategory("รางวัลผลงานสถานศึกษา")
    }
  ];
};

export const getAwardsAchievements = (achievements: any[]) => {
  return achievements.filter(item => 
    ["รางวัลและผลงานตนเอง", "รางวัลและผลงานผู้เรียน", "รางวัลผลงานสถานศึกษา"].includes(item.category) ||
    (!["Best Practice", "นวัตกรรม", "งานวิจัย", "การพัฒนาตนเอง", "การอบรมและสัมมนา", "การประชุมและเสวนา", "การเสริมสร้างทักษะ"].includes(item.category))
  );
};

export const getAcademicAchievements = (achievements: any[]) => {
  return achievements.filter(item => ["Best Practice", "นวัตกรรม", "งานวิจัย"].includes(item.category));
};

export const getAcademicSections = (achievements: any[]) => {
  const filterByCategory = (category: string) => achievements.filter(item => item.category === category);
  return [
    {
      title: "Best Practice",
      eyebrow: "Best Practice",
      description: "วิธีปฏิบัติที่เป็นเลิศในการจัดการเรียนรู้",
      cards: filterByCategory("Best Practice")
    },
    {
      title: "นวัตกรรม",
      eyebrow: "Innovation",
      description: "สื่อนวัตกรรมและเทคโนโลยีเพื่อการศึกษา",
      cards: filterByCategory("นวัตกรรม")
    },
    {
      title: "งานวิจัย",
      eyebrow: "Research",
      description: "งานวิจัยในชั้นเรียนเพื่อพัฒนาผู้เรียน",
      cards: filterByCategory("งานวิจัย")
    }
  ];
};

export const getDevelopmentSections = (achievements: any[]) => {
  const filterByCategory = (category: string) => achievements.filter(item => item.category === category);
  return [
    {
      title: "การพัฒนาตนเองและวิชาชีพ",
      eyebrow: "Self Development",
      description: "ผลงานการพัฒนาตนเอง หลักสูตรอบรมพัฒนาครู และเกียรติบัตรเสริมทักษะ",
      cards: filterByCategory("การพัฒนาตนเอง")
    },
    {
      title: "การอบรมและสัมมนา",
      eyebrow: "Training & Seminars",
      description: "หลักสูตรการอบรม การประชุมทางวิชาการ และการสัมมนาพัฒนาวิชาชีพ",
      cards: filterByCategory("การอบรมและสัมมนา")
    },
    {
      title: "การประชุมและเสวนา",
      eyebrow: "Conferences & Meetings",
      description: "การเข้าร่วมประชุมเชิงปฏิบัติการและการแลกเปลี่ยนเรียนรู้ทางวิชาการ",
      cards: filterByCategory("การประชุมและเสวนา")
    },
    {
      title: "การเสริมสร้างทักษะ",
      eyebrow: "Skill Enhancement",
      description: "การพัฒนาทักษะดิจิทัล การเรียนรู้ตลอดชีวิต และเกียรติบัตรวิชาชีพ",
      cards: filterByCategory("การเสริมสร้างทักษะ")
    }
  ];
};

export const getDevelopmentAchievements = (achievements: any[]) => {
  return achievements.filter(item => ["การพัฒนาตนเอง", "การอบรมและสัมมนา", "การประชุมและเสวนา", "การเสริมสร้างทักษะ"].includes(item.category));
};

export const getActivityGallery = (activities: any[]) =>
  activities.map(item => ({
    id: item.id,
    title: item.title,
    category: item.category,
    image: item.imgUrl,
    images: item.images?.length ? item.images : [item.imgUrl],
    albumUrl: item.albumUrl || (item.imgUrl && (item.imgUrl.includes('photos.app.goo.gl') || item.imgUrl.includes('photos.google.com')) ? item.imgUrl : undefined),
    detail: item.content
  }));

export const paObjectives = [
  {
    title: "ด้านการจัดการเรียนรู้",
    metric: "ผู้เรียนร้อยละ 80 ผ่านเกณฑ์",
    detail: "พัฒนาบทเรียนเชิงรุกและใช้ข้อมูลผลประเมินเพื่อปรับการสอน"
  },
  {
    title: "ด้านการส่งเสริมผู้เรียน",
    metric: "ผู้เรียนมีแฟ้มสะสมงานครบถ้วน",
    detail: "ติดตามความก้าวหน้าและให้คำแนะนำเป็นรายบุคคล"
  },
  {
    title: "ด้านการพัฒนาตนเอง",
    metric: "เข้าร่วม PLC และเผยแพร่สื่อ",
    detail: "นำองค์ความรู้ใหม่มาปรับใช้และแบ่งปันกับเพื่อนครู"
  },
  {
    title: "ประเด็นท้าทาย",
    metric: "ผลสัมฤทธิ์หลังเรียนสูงขึ้น",
    detail: "ใช้สื่อดิจิทัลและภาระงานที่เชื่อมโยงปัญหาใกล้ตัว"
  }
];

export const paEvidence = [
  "แผนการจัดการเรียนรู้และบันทึกหลังสอน",
  "ผลงาน ชิ้นงาน และแบบประเมินของนักเรียน",
  "รายงานผลสัมฤทธิ์ก่อนเรียนและหลังเรียน",
  "ภาพกิจกรรม คลิปการสอน และเอกสาร PLC"
];

export const pageVisuals = {
  classroom: {
    eyebrow: "Online Learning",
    title: "ห้องเรียนออนไลน์",
    description: "พื้นที่รวมบทเรียน สื่อ ใบงาน แบบทดสอบ และผลประเมิน เพื่อให้การเรียนรู้ต่อเนื่องทั้งในและนอกห้องเรียน",
    image: "/placeholder-classroom-hero.jpg"
  },
  homeroom: {
    eyebrow: "Student Care",
    title: "งานประจำชั้น",
    description: "ฐานข้อมูลดูแลช่วยเหลือนักเรียน ติดตามพฤติกรรม การมาเรียน และการประสานผู้ปกครองอย่างเป็นระบบ",
    image: "/C1-web.jpg"
  },
  achievements: {
    eyebrow: "Portfolio",
    title: "รางวัลและผลงาน",
    description: "แฟ้มสะสมผลงานครูและนักเรียน แสดงหลักฐานเชิงประจักษ์จากการจัดการเรียนรู้และการพัฒนาวิชาชีพ",
    image: "/placeholder-achievements-hero.jpg"
  },
  activities: {
    eyebrow: "Activity Gallery",
    title: "ภาพกิจกรรม",
    description: "รวบรวมภาพกิจกรรมการเรียนรู้ กิจกรรมพัฒนาผู้เรียน และบรรยากาศการเรียนรู้แบบดิจิทัล",
    image: "/placeholder-activities-hero.jpg"
  },
  pa: {
    eyebrow: "Performance Agreement",
    title: "การพัฒนางานตามข้อตกลง (PA)",
    description: "จัดระบบเป้าหมาย ตัวชี้วัด วิธีดำเนินงาน และหลักฐานผลลัพธ์ให้ตรวจสอบได้ง่าย",
    image: "/placeholder-pa-hero.jpg"
  }
};

export const getPageVisuals = (contentData: any) => {
  if (!contentData || !contentData.pageVisuals) {
    return pageVisuals;
  }
  
  // Merge defaults with custom values
  const result: any = { ...pageVisuals };
  for (const key of Object.keys(pageVisuals)) {
    if (contentData.pageVisuals[key]) {
      result[key] = { ...pageVisuals[key as keyof typeof pageVisuals], ...contentData.pageVisuals[key] };
    }
  }
  return result;
};

export const rubricCards = [
  { label: "แผน", value: "ชัดเจน", icon: BarChart3 },
  { label: "หลักฐาน", value: "ครบถ้วน", icon: FileCheck2 },
  { label: "ผลลัพธ์", value: "ตรวจสอบได้", icon: GraduationCap }
];
