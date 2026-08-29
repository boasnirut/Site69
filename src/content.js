import {
  BookOpenText,
  ClipboardCheck,
  GraduationCap,
  Images,
  Laptop,
  MapPin,
  Megaphone,
  School,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react'

export const navItems = [
  { label: 'หน้าหลัก', href: '/' },
  { label: 'ห้องเรียนออนไลน์', href: '/classroom' },
  { label: 'งานประจำชั้น', href: '/homeroom' },
  { label: 'ผลงาน/รางวัล', href: '/achievements' },
  { label: 'ภาพกิจกรรม', href: '/activities' },
  { label: 'ข้อตกลงในการพัฒนางาน (PA)', href: '/pa' },
]

export const newsItems = [
  {
    category: 'ห้องเรียนออนไลน์',
    date: 'อัปเดต 2569',
    title: 'เปิดคลังสื่อการสอนดิจิทัล และใบงานวิทยาการคำนวณ 24 ชั่วโมง',
    excerpt:
      'นักเรียนและผู้สนใจสามารถเข้าเรียนออนไลน์ ดาวน์โหลดใบงาน และทดสอบย่อยประเมินตนเองได้ตลอดเวลา',
    icon: Laptop,
    accent: 'blue',
    featured: true,
  },
  {
    category: 'งานประจำชั้น',
    date: 'ภาคเรียนที่ 1/2569',
    title: 'ระบบคัดกรองนักเรียนรายบุคคล และพิกัด GPS บันทึกเยี่ยมบ้าน',
    excerpt:
      'สรุปผลประเมินพฤติกรรม SDQ ข้อมูลการเยี่ยมบ้าน และระบบติดตามความประพฤติและเวลาเรียนรายบุคคล',
    icon: Users,
    accent: 'green',
  },
  {
    category: 'ข้อตกลง PA',
    date: 'ประจำปีงบประมาณ 2569',
    title: 'รายงานผลการพัฒนางานตามข้อตกลง (Performance Agreement)',
    excerpt:
      'เอกสารร่องรอยการจัดประสบการณ์เรียนรู้ คลิปการสอน Active Learning และผลสัมฤทธิ์ผู้เรียน',
    icon: ClipboardCheck,
    accent: 'gold',
  },
]

export const activityItems = [
  {
    day: '15',
    month: 'พ.ค.',
    title: 'กิจกรรมปฐมนิเทศและคัดกรองนักเรียนรายบุคคล',
    meta: 'ห้องเรียนประจำชั้น · ระบบดูแลช่วยเหลือนักเรียน 100%',
    color: 'blue',
  },
  {
    day: '10',
    month: 'มิ.ย.',
    title: 'โครงการพัฒนาสื่อดิจิทัลเพื่อการเรียนรู้ Active Learning',
    meta: 'ห้องคอมพิวเตอร์ · การจัดการเรียนรู้บูรณาการเทคโนโลยี',
    color: 'green',
  },
  {
    day: '20',
    month: 'ก.ค.',
    title: 'กิจกรรมเยี่ยมบ้านนักเรียนแบบลงพิกัด GPS',
    meta: 'ชุมชนบ้านน้ำพร · การแลกเปลี่ยนเรียนรู้กับผู้ปกครอง',
    color: 'gold',
  },
]

export const services = [
  {
    title: 'หน้าหลัก',
    description: 'ศูนย์รวมข้อมูล สารสนเทศ ประวัติ และโครงสร้างพอร์ตโฟลิโอ',
    icon: School,
    href: '/',
  },
  {
    title: 'ห้องเรียนออนไลน์',
    description: 'คลังบทเรียน สื่อดิจิทัล แบบทดสอบย่อย และวิทยาการคำนวณ',
    icon: Laptop,
    href: '/classroom',
  },
  {
    title: 'งานประจำชั้น',
    description: 'ระบบคัดกรอง SDQ บันทึกการเยี่ยมบ้าน GPS และดูแลช่วยเหลือนักเรียน',
    icon: Users,
    href: '/homeroom',
  },
  {
    title: 'ผลงาน/รางวัล',
    description: 'รางวัลเกียรติยศ นวัตกรรมการสอน และความภาคภูมิใจในวิชาชีพ',
    icon: Trophy,
    href: '/achievements',
  },
  {
    title: 'ภาพกิจกรรม',
    description: 'คลังภาพบรรยากาศการเรียนรู้ กิจกรรมพัฒนาผู้เรียน และชุมชน',
    icon: Images,
    href: '/activities',
  },
  {
    title: 'ข้อตกลงในการพัฒนางาน (PA)',
    description: 'รายงานผลการประเมิน PA เอกสารร่องรอย และวิดีโอคลิปการสอน',
    icon: ClipboardCheck,
    href: '/pa',
  },
]

export const values = [
  {
    number: '01',
    title: 'การจัดการเรียนรู้ Active Learning',
    description: 'เน้นผู้เรียนเป็นสำคัญ พัฒนาทักษะคิดวิเคราะห์ ปฏิบัติตริง และประยุกต์ใช้เทคโนโลยี',
  },
  {
    number: '02',
    title: 'ระบบดูแลช่วยเหลือ 100%',
    description: 'ใส่ใจนักเรียนรายบุคคล ทั้งการเยี่ยมบ้าน คัดกรองพฤติกรรม SDQ และการช่วยเหลือตามสภาพจริง',
  },
  {
    number: '03',
    title: 'การพัฒนาตนเองอย่างต่อเนื่อง',
    description: 'มุ่งมั่นสร้างสรรค์นวัตกรรมการสอน และรายงานผลการพัฒนางานตามข้อตกลง PA อย่างเป็นระบบ',
  },
]

export const schoolHighlights = [
  { value: '100%', label: 'ดูแลนักเรียนรายบุคคล' },
  { value: 'Active', label: 'การจัดการเรียนรู้ดิจิทัล' },
  { value: 'PA 2569', label: 'ข้อตกลงพัฒนางาน' },
  { value: 'สพป.เลย 1', label: 'โรงเรียนบ้านน้ำพร' },
]

export const schoolInfo = {
  thaiName: 'นิรุทธิ์ เสวะนา',
  englishName: 'Nirut Sewana',
  educationLevels: 'คลังสื่อดิจิทัล • ดูแลนักเรียน • PA',
  schoolType: 'Personal Educator Hub & Portfolio',
  affiliation: 'โรงเรียนบ้านน้ำพร สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1',
  summary:
    'นิรุทธิ์ เสวะนา (Nirut Sewana) - เว็บไซต์ผลงาน คลังบทเรียนดิจิทัล งานประจำชั้น และรายงานผลการพัฒนางานตามข้อตกลง (PA)',
}

export const contactDetails = {
  address: 'เลขที่ 115 หมู่ 2 บ้านน้ำพร ตำบลปากตม อำเภอเชียงคาน จังหวัดเลย 42110',
  phone: '06-2546-1959',
  phoneHref: 'tel:0625461959',
  email: 'numporn@loei1.go.th',
  emailHref: 'mailto:numporn@loei1.go.th',
  messengerHref: 'https://m.me/471976926239771',
  facebookHref: 'https://www.facebook.com/NampornSchool/',
  mapHref: 'https://maps.app.goo.gl/ZTXbKacBqoMYUu4Q8',
}

export const trustPoints = [
  { icon: ShieldCheck, label: 'ข้อมูลและผลงานวิชาชีพ' },
  { icon: Users, label: 'ระบบดูแลนักเรียน 100%' },
  { icon: GraduationCap, label: 'นวัตกรรมสื่อการสอน' },
]
