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
  Sparkles,
  Trophy,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const navigation: NavItem[] = [
  {
    href: "/",
    label: "ภาพรวม",
    description: "หน้าหลักเว็บไซต์ครูนิรุทธิ์ เสวะนา",
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
    description: "ดูแลช่วยเหลือนักเรียนและงานที่ปรึกษา",
    icon: UsersRound
  },
  {
    href: "/achievements",
    label: "รางวัลและผลงาน",
    description: "ผลงานครู นักเรียน และชุมชนการเรียนรู้",
    icon: Trophy
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
    icon: BadgeCheck
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
  { subject: "ต้านทุจริต", level: "ป.5-ป.6", hours: "2 ชม./สัปดาห์" },
  { subject: "ลูกเสือเนตรนารี", level: "ป.1-ม.3", hours: "1 ชม./สัปดาห์" },
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
  "ครูชน คนดีศรีเลย 1",
  "ชนะเลิศ Comic Strip ป.1-3 กลุ่มคุณภาพ ฯ",
  "ICT Talent ภาครัฐ ระดับ “ดี”"
];

export const sarDevelopment = [
  "โมดูล A : AI สำหรับการจัดการเรียนรู้และการประเมินผล โครงการ AI for Teachers",
  "โมดูล B : การรู้เท่าทันและการกำกับดูแล AI อย่างมีจริยธรรม โครงการ AI for Teachers",
  "โมดูล P : Smart PA ด้วย AI สำหรับการประเมินและนวัตกรรม โครงการ AI for Teachers",
  "อบรมเชิงปฏิบัติการออนไลน์ Google Gemini AI for Education",
  "หลักสูตรพัฒนาทักษะภาษาอังกฤษตามกรอบมาตรฐาน CEFR ระดับ A1-A2",
  "หลักสูตรพัฒนาสมรรถนะดิจิทัลระดับพื้นฐาน (Basic Digital Competency) ด้วยระบบ e-Learning DC1-DC3",
  "มหกรรมการศึกษา Youth Vision : เปิดโลกการศึกษาเพื่ออนาคต และติดตามเป้าหมายการพัฒนาที่ยั่งยืนด้านการศึกษา (SDG4) จังหวัดเลย",
  "หลักสูตรพัฒนาสมรรถนะดิจิทัลระดับกลาง (Intermediate Digital Competency) ด้วยระบบ e-Learning DC4-DC5"
];

export const courseSpaces = [
  {
    title: "วิทยาการคำนวณ ม.1",
    level: "มัธยมศึกษาปีที่ 1",
    status: "เปิดเรียน",
    lessons: "12 บทเรียน",
    assessments: "6 แบบประเมิน"
  },
  {
    title: "การออกแบบและเทคโนโลยี ม.2",
    level: "มัธยมศึกษาปีที่ 2",
    status: "กำลังดำเนินการ",
    lessons: "10 บทเรียน",
    assessments: "5 แบบประเมิน"
  },
  {
    title: "Coding & AI เบื้องต้น",
    level: "กิจกรรมเสริมทักษะ",
    status: "คลังสื่อ",
    lessons: "8 บทเรียน",
    assessments: "4 แบบประเมิน"
  }
];

export const classroomFlow = [
  "กำหนดจุดประสงค์การเรียนรู้และภาระงาน",
  "จัดกิจกรรม Active Learning ผ่านสื่อออนไลน์",
  "ประเมินระหว่างเรียนด้วยแบบฝึกและแบบสะท้อนผล",
  "สรุปผลเป็นรายบุคคลเพื่อใช้ปรับการสอน"
];

export const homeroomFocus = [
  { title: "ข้อมูลนักเรียนรายบุคคล", value: "ครบ 100%", detail: "ประวัติ ครอบครัว สุขภาพ และความถนัด" },
  { title: "ติดตามการมาเรียน", value: "รายวัน", detail: "สรุปเวลาเรียนและแจ้งเตือนกลุ่มเสี่ยง" },
  { title: "ระบบดูแลช่วยเหลือ", value: "4 กลุ่ม", detail: "ปกติ เสี่ยง มีปัญหา และส่งเสริมพิเศษ" }
];

export const advisoryTasks = [
  "เยี่ยมบ้านและบันทึกผลการดูแลช่วยเหลือนักเรียน",
  "ประสานผู้ปกครองผ่านช่องทางออนไลน์ของห้องเรียน",
  "จัดกิจกรรมโฮมรูมด้านวินัย คุณธรรม และเป้าหมายอาชีพ",
  "ส่งต่อนักเรียนที่ต้องการความช่วยเหลือเฉพาะด้าน"
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
    detail: "นักเรียนพัฒนาต้นแบบสื่อดิจิทัลเพื่อสื่อสารข้อมูลท้องถิ่น"
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
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "ผลงานผู้เรียน",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "นวัตกรรมในชั้นเรียน",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=900&q=80"
  }
];

export const activityGallery = [
  {
    title: "กิจกรรมการเรียนรู้เชิงรุก",
    category: "Active Learning",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80",
    images: [
      "/AC1.JPG",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "ผู้เรียนร่วมกันคิด วิเคราะห์ ออกแบบ และนำเสนอผลงานจากสถานการณ์ใกล้ตัว"
  },
  {
    title: "ห้องเรียนดิจิทัล",
    category: "Digital Classroom",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
    images: [
      "/AT1.JPEG",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "ใช้เครื่องมือออนไลน์เพื่อเสริมการเรียนรู้และติดตามความก้าวหน้าของผู้เรียน"
  },
  {
    title: "กิจกรรมพัฒนาผู้เรียน",
    category: "Student Development",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1100&q=80",
    images: [
      "/C1-web.jpg",
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "ส่งเสริมทักษะชีวิต วินัย ความรับผิดชอบ และการทำงานร่วมกัน"
  },
  {
    title: "แลกเปลี่ยนเรียนรู้ PLC",
    category: "Professional Learning Community",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80",
    images: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "ร่วมออกแบบแนวทางจัดการเรียนรู้และพัฒนาสื่อกับเครือข่ายครู"
  },
  {
    title: "นำเสนอผลงานนักเรียน",
    category: "Student Showcase",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80",
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1100&q=80",
      "/AC1.JPG",
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "เปิดพื้นที่ให้ผู้เรียนสื่อสารแนวคิด ทดลอง และสะท้อนผลการเรียนรู้"
  },
  {
    title: "กิจกรรมเทคโนโลยีเพื่อชุมชน",
    category: "Technology for Community",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1100&q=80",
    images: [
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1100&q=80",
      "/AT1.JPEG",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1100&q=80"
    ],
    detail: "เชื่อมโยงความรู้ดิจิทัลกับการแก้ปัญหาและการสร้างคุณค่าให้ชุมชน"
  }
];

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
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
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
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1600&q=80"
  },
  activities: {
    eyebrow: "Activity Gallery",
    title: "ภาพกิจกรรม",
    description: "รวบรวมภาพกิจกรรมการเรียนรู้ กิจกรรมพัฒนาผู้เรียน และบรรยากาศการเรียนรู้แบบดิจิทัล",
    image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1600&q=80"
  },
  pa: {
    eyebrow: "Performance Agreement",
    title: "การพัฒนางานตามข้อตกลง (PA)",
    description: "จัดระบบเป้าหมาย ตัวชี้วัด วิธีดำเนินงาน และหลักฐานผลลัพธ์ให้ตรวจสอบได้ง่าย",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80"
  }
};

export const rubricCards = [
  { label: "แผน", value: "ชัดเจน", icon: BarChart3 },
  { label: "หลักฐาน", value: "ครบถ้วน", icon: FileCheck2 },
  { label: "ผลลัพธ์", value: "ตรวจสอบได้", icon: GraduationCap }
];
