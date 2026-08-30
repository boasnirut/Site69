import { BarChart3, UsersRound, BookOpenCheck, FileCheck2 } from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { label: "นักเรียนในความดูแล", value: "128", icon: UsersRound, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "แผนการจัดการเรียนรู้", value: "24", icon: BookOpenCheck, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" },
    { label: "หลักฐานประเมิน", value: "86", icon: FileCheck2, color: "text-teal-400", bg: "bg-teal-400/10 border-teal-400/20" },
    { label: "ผู้เข้าชมเว็บไซต์", value: "1,245", icon: BarChart3, color: "text-rose-400", bg: "bg-rose-400/10 border-rose-400/20" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ยินดีต้อนรับ, ครูนิรุทธิ์ 👋</h1>
        <p className="text-white/60">ภาพรวมระบบเว็บไซต์และสถิติเบื้องต้น</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`p-6 rounded-2xl border ${stat.bg} flex flex-col backdrop-blur-sm`}>
              <Icon className={`w-8 h-8 mb-4 ${stat.color}`} />
              <strong className="text-3xl font-bold text-white mb-1">{stat.value}</strong>
              <span className="text-sm font-medium text-white/70">{stat.label}</span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">อัปเดตล่าสุด</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-orange-400 mt-2" />
              <div>
                <p className="text-white text-sm">เพิ่มผลงาน "วิจัยในชั้นเรียน" ใหม่</p>
                <span className="text-xs text-white/50">2 ชั่วโมงที่แล้ว</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
              <div>
                <p className="text-white text-sm">อัปเดตภาพกิจกรรม "กิจกรรมเข้าค่าย"</p>
                <span className="text-xs text-white/50">1 วันที่แล้ว</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center border-dashed">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-white/40" />
          </div>
          <p className="text-white/60 text-sm">ส่วนสำหรับแสดงกราฟสถิติผู้เข้าชม<br/>(สามารถเชื่อมต่อ Google Analytics ได้ในอนาคต)</p>
        </div>
      </div>
    </div>
  );
}
