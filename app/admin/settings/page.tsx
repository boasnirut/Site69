import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">ตั้งค่าระบบ</h1>
        <p className="text-white/60 text-sm">จัดการข้อมูลผู้ดูแลระบบและการตั้งค่าเว็บไซต์เบื้องต้น</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">ข้อมูลผู้ดูแลระบบ</h2>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">ชื่อแสดงผล</label>
              <input 
                type="text" 
                defaultValue="ครูนิรุทธิ์ เสวะนา"
                className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">ชื่อผู้ใช้ (Username)</label>
              <input 
                type="text" 
                defaultValue="boasnirut"
                disabled
                className="w-full bg-black/30 border border-white/10 rounded-lg py-2.5 px-4 text-white/50 cursor-not-allowed"
              />
              <p className="text-xs text-white/40 mt-1">ไม่สามารถเปลี่ยนชื่อผู้ใช้ได้</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h3 className="text-md font-medium text-white mb-4">เปลี่ยนรหัสผ่าน</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">รหัสผ่านใหม่</label>
                <input 
                  type="password" 
                  placeholder="ปล่อยว่างหากไม่ต้องการเปลี่ยน"
                  className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">ยืนยันรหัสผ่านใหม่</label>
                <input 
                  type="password" 
                  placeholder="พิมพ์รหัสผ่านใหม่อีกครั้ง"
                  className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="button" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors">
              <Save className="w-4 h-4" />
              บันทึกการตั้งค่า
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
