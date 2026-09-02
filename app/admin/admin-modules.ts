import {
  BadgeCheck,
  CalendarDays,
  Camera,
  Home,
  Images,
  MonitorPlay,
  Settings,
  Trophy,
  UsersRound
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AdminModuleKey =
  | "home"
  | "classroom"
  | "homeroom"
  | "achievements"
  | "activities"
  | "pa"
  | "hero"
  | "settings";

export type AdminModule = {
  key: AdminModuleKey;
  name: string;
  href: string;
  eyebrow: string;
  description: string;
  status: "รอออกแบบ" | "โครงใหม่";
  icon: LucideIcon;
  scope: string[];
};

export const adminModules: AdminModule[] = [
  {
    key: "home",
    name: "หน้าหลัก",
    href: "/admin/home",
    eyebrow: "Homepage",
    description: "จัดการข้อความหน้าแรก ปฏิทินกิจกรรม และปุ่มเชื่อมโยงหลัก",
    status: "รอออกแบบ",
    icon: Home,
    scope: ["ข้อความ Hero", "ปฏิทินกิจกรรม", "ปุ่มลิงก์หน้าแรก", "สถิติ SAR"]
  },
  {
    key: "classroom",
    name: "ห้องเรียนออนไลน์",
    href: "/admin/classroom",
    eyebrow: "Online Learning",
    description: "จัดการรายวิชา ลิงก์ห้องเรียนออนไลน์ ใบงาน แบบทดสอบ และตารางสอน",
    status: "รอออกแบบ",
    icon: MonitorPlay,
    scope: ["รายวิชา", "สื่อการสอน", "ลิงก์ Google Classroom", "ตารางสอน"]
  },
  {
    key: "homeroom",
    name: "งานประจำชั้น",
    href: "/admin/homeroom",
    eyebrow: "Student Care",
    description: "จัดการข้อมูลนักเรียน SDQ ตารางเรียน และกองทุนสำรองห้องเรียน",
    status: "รอออกแบบ",
    icon: UsersRound,
    scope: ["รายชื่อนักเรียน", "ข้อมูล SDQ", "ตารางเรียน ม.3", "กองทุนสำรองห้องเรียน"]
  },
  {
    key: "achievements",
    name: "รางวัลและผลงาน",
    href: "/admin/achievements",
    eyebrow: "Portfolio",
    description: "จัดการรางวัล ผลงานตนเอง ผลงานผู้เรียน ผลงานสถานศึกษา และการพัฒนาตนเอง",
    status: "โครงใหม่",
    icon: Trophy,
    scope: ["ผลงานครู", "ผลงานผู้เรียน", "ผลงานสถานศึกษา", "อบรมและพัฒนาตนเอง"]
  },
  {
    key: "activities",
    name: "ภาพกิจกรรม",
    href: "/admin/activities",
    eyebrow: "Activity Gallery",
    description: "จัดการกิจกรรม อัลบั้มภาพหลายภาพต่อกิจกรรม และการจัดลำดับการแสดงผล",
    status: "โครงใหม่",
    icon: Camera,
    scope: ["กิจกรรม", "ภาพหลายภาพ", "ลิงก์ Google Photos", "เปิด/ปิดการแสดงผล"]
  },
  {
    key: "pa",
    name: "การพัฒนางานตามข้อตกลง PA",
    href: "/admin/pa",
    eyebrow: "Performance Agreement",
    description: "จัดการข้อมูลทั่วไป ภาระงาน องค์ประกอบที่ 1 ประเด็นท้าทาย และเอกสาร PDF ของหน้า PA",
    status: "โครงใหม่",
    icon: BadgeCheck,
    scope: ["ข้อมูลทั่วไป", "ภาระงาน ก.ค.ศ.", "องค์ประกอบที่ 1", "องค์ประกอบที่ 2", "ไฟล์ PDF/หลักฐาน"]
  },
  {
    key: "hero",
    name: "ภาพหน้าปกเว็บไซต์",
    href: "/admin/hero",
    eyebrow: "Page Visuals",
    description: "จัดการภาพปกและข้อความนำของแต่ละหน้า",
    status: "รอออกแบบ",
    icon: Images,
    scope: ["ภาพปกทุกหน้า", "ข้อความหัวหน้า", "คำอธิบายหน้า", "ตัวอย่างก่อนบันทึก"]
  },
  {
    key: "settings",
    name: "ตั้งค่าระบบ",
    href: "/admin/settings",
    eyebrow: "System Settings",
    description: "ตั้งค่ารหัสผ่าน ผู้ดูแลระบบ การเชื่อมต่อ GitHub และสถานะเผยแพร่",
    status: "รอออกแบบ",
    icon: Settings,
    scope: ["รหัสผ่าน", "GitHub token", "Vercel deploy", "นำเข้า/ส่งออกข้อมูล"]
  }
];

export const adminDashboardStats = [
  { label: "โมดูลที่จะสร้างใหม่", value: String(adminModules.length), icon: CalendarDays },
  { label: "ระบบเดิมที่ถูกรื้อ", value: "ปิดแล้ว", icon: BadgeCheck },
  { label: "ข้อมูลหน้าเว็บหลัก", value: "คงเดิม", icon: Images },
  { label: "สถานะเผยแพร่", value: "ยังไม่ deploy", icon: MonitorPlay }
];

export const getAdminModule = (key: AdminModuleKey) => adminModules.find((module) => module.key === key);
