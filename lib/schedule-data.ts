export type TeachingSlot = {
  day: string;
  time: string;
  className: string;
  subject: string;
};

export type ClassScheduleDay = {
  day: string;
  slots: {
    time: string;
    subject: string;
    teacher?: string;
    isBreak?: boolean;
  }[];
};

export const schedulePeriods = [
  "08.30 - 09.30 น.",
  "09.30 - 10.30 น.",
  "10.30 - 11.30 น.",
  "11.30 - 12.30 น.",
  "12.30 - 13.30 น.",
  "13.30 - 14.30 น.",
  "14.30 - 15.30 น."
];

export const nirutTeachingSchedule: TeachingSlot[] = [
  { day: "จันทร์", time: "13.30 - 14.30 น.", className: "ม.1", subject: "สังคม" },
  { day: "จันทร์", time: "12.30 - 13.30 น.", className: "ม.2", subject: "สังคม" },
  { day: "จันทร์", time: "10.30 - 11.30 น.", className: "ม.3", subject: "วิทยาศาสตร์เพิ่มเติม" },
  { day: "จันทร์", time: "14.30 - 15.30 น.", className: "ม.3", subject: "หน้าที่พลเมือง" },
  { day: "อังคาร", time: "12.30 - 13.30 น.", className: "ป.5", subject: "กิจกรรมสังคมศึกษาฯ" },
  { day: "อังคาร", time: "09.30 - 10.30 น.", className: "ม.1", subject: "ประวัติศาสตร์" },
  { day: "อังคาร", time: "10.30 - 11.30 น.", className: "ม.1", subject: "วิทยาศาสตร์เพิ่มเติม" },
  { day: "อังคาร", time: "14.30 - 15.30 น.", className: "ม.1", subject: "พลศึกษา" },
  { day: "อังคาร", time: "13.30 - 14.30 น.", className: "ม.2", subject: "ประวัติศาสตร์" },
  { day: "อังคาร", time: "08.30 - 09.30 น.", className: "ม.3", subject: "สังคม" },
  { day: "พุธ", time: "09.30 - 10.30 น.", className: "ป.5", subject: "กิจกรรมสังคมศึกษาฯ" },
  { day: "พุธ", time: "10.30 - 11.30 น.", className: "ม.2", subject: "วิทยาศาสตร์เพิ่มเติม" },
  { day: "พุธ", time: "13.30 - 14.30 น.", className: "ม.2", subject: "พลศึกษา" },
  { day: "พุธ", time: "12.30 - 13.30 น.", className: "ม.3", subject: "สังคม" },
  { day: "พุธ", time: "14.30 - 15.30 น.", className: "ม.3", subject: "พลศึกษา" },
  { day: "พฤหัสบดี", time: "08.30 - 09.30 น.", className: "ม.1", subject: "สังคม" },
  { day: "พฤหัสบดี", time: "09.30 - 10.30 น.", className: "ม.1", subject: "สังคม" },
  { day: "พฤหัสบดี", time: "12.30 - 13.30 น.", className: "ม.1", subject: "พลศึกษา" },
  { day: "พฤหัสบดี", time: "10.30 - 11.30 น.", className: "ม.2", subject: "สังคม" },
  { day: "พฤหัสบดี", time: "13.30 - 14.30 น.", className: "ม.3", subject: "สังคม" },
  { day: "ศุกร์", time: "09.30 - 10.30 น.", className: "ป.5", subject: "กิจกรรมพลเมืองดีฯ" },
  { day: "ศุกร์", time: "08.30 - 09.30 น.", className: "ม.2", subject: "สังคม" },
  { day: "ศุกร์", time: "12.30 - 13.30 น.", className: "ม.3", subject: "ประวัติศาสตร์" }
];

export const m3ClassSchedule: ClassScheduleDay[] = [
  {
    day: "จันทร์",
    slots: [
      { time: "08.30 - 09.30 น.", subject: "คณิตศาสตร์", teacher: "อิทธิภู" },
      { time: "09.30 - 10.30 น.", subject: "ภาษาไทย", teacher: "เอื้องคำ" },
      { time: "10.30 - 11.30 น.", subject: "วิทยาศาสตร์เพิ่มเติม", teacher: "นิรุทธิ์" },
      { time: "11.30 - 12.30 น.", subject: "รับประทานอาหารกลางวัน", isBreak: true },
      { time: "12.30 - 13.30 น.", subject: "ภาษาอังกฤษ", teacher: "รัตติกานต์" },
      { time: "13.30 - 14.30 น.", subject: "ศิลปะ", teacher: "รัตนา" },
      { time: "14.30 - 15.30 น.", subject: "หน้าที่พลเมือง", teacher: "นิรุทธิ์" }
    ]
  },
  {
    day: "อังคาร",
    slots: [
      { time: "08.30 - 09.30 น.", subject: "สังคม", teacher: "นิรุทธิ์" },
      { time: "09.30 - 10.30 น.", subject: "คณิตศาสตร์", teacher: "อิทธิภู" },
      { time: "10.30 - 11.30 น.", subject: "ศิลปะ", teacher: "รัตนา" },
      { time: "11.30 - 12.30 น.", subject: "รับประทานอาหารกลางวัน", isBreak: true },
      { time: "12.30 - 13.30 น.", subject: "ภาษาไทย", teacher: "เอื้องคำ" },
      { time: "13.30 - 14.30 น.", subject: "การงาน", teacher: "วันชื่น" },
      { time: "14.30 - 15.30 น.", subject: "แนะแนว", teacher: "เอื้องคำ" }
    ]
  },
  {
    day: "พุธ",
    slots: [
      { time: "08.30 - 09.30 น.", subject: "ภาษาอังกฤษ", teacher: "รัตติกานต์" },
      { time: "09.30 - 10.30 น.", subject: "วิทยาศาสตร์", teacher: "สุภาพร" },
      { time: "10.30 - 11.30 น.", subject: "ภาษาไทย", teacher: "เอื้องคำ" },
      { time: "11.30 - 12.30 น.", subject: "รับประทานอาหารกลางวัน", isBreak: true },
      { time: "12.30 - 13.30 น.", subject: "สังคม", teacher: "นิรุทธิ์" },
      { time: "13.30 - 14.30 น.", subject: "สุขศึกษา", teacher: "อิทธิภู" },
      { time: "14.30 - 15.30 น.", subject: "พลศึกษา", teacher: "นิรุทธิ์" }
    ]
  },
  {
    day: "พฤหัสบดี",
    slots: [
      { time: "08.30 - 09.30 น.", subject: "คณิตศาสตร์", teacher: "อิทธิภู" },
      { time: "09.30 - 10.30 น.", subject: "การงาน", teacher: "วันชื่น" },
      { time: "10.30 - 11.30 น.", subject: "วิทยาศาสตร์", teacher: "สุภาพร" },
      { time: "11.30 - 12.30 น.", subject: "รับประทานอาหารกลางวัน", isBreak: true },
      { time: "12.30 - 13.30 น.", subject: "ภาษาไทยเพิ่มเติม", teacher: "เอื้องคำ" },
      { time: "13.30 - 14.30 น.", subject: "สังคม", teacher: "นิรุทธิ์" },
      { time: "14.30 - 15.30 น.", subject: "ลูกเสือ" }
    ]
  },
  {
    day: "ศุกร์",
    slots: [
      { time: "08.30 - 09.30 น.", subject: "คณิตศาสตร์เพิ่มเติม", teacher: "อิทธิภู" },
      { time: "09.30 - 10.30 น.", subject: "วิทยาศาสตร์", teacher: "สุภาพร" },
      { time: "10.30 - 11.30 น.", subject: "ภาษาอังกฤษ", teacher: "รัตติกานต์" },
      { time: "11.30 - 12.30 น.", subject: "รับประทานอาหารกลางวัน", isBreak: true },
      { time: "12.30 - 13.30 น.", subject: "ประวัติศาสตร์", teacher: "นิรุทธิ์" },
      { time: "13.30 - 14.30 น.", subject: "ชุมนุม" },
      { time: "14.30 - 15.30 น.", subject: "วิถีพุทธ" }
    ]
  }
];

export const classScheduleSummary = {
  source: "ตารางเรียน 2569.1.xlsx",
  term: "ภาคเรียนที่ 1 ปีการศึกษา 2569",
  startsAt: "เริ่มใช้ 18 พฤษภาคม 2569"
};
