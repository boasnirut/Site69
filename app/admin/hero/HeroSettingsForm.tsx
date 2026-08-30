"use client";

import { useState, useTransition } from "react";
import { Save, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { savePageVisuals, uploadHeroImage } from "@/app/admin/actions";

export function HeroSettingsForm({ initialVisuals }: { initialVisuals: any }) {
  const [visuals, setVisuals] = useState(initialVisuals);
  const [isPending, startTransition] = useTransition();
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);

  const pages = [
    { key: "classroom", label: "ห้องเรียนออนไลน์" },
    { key: "homeroom", label: "งานประจำชั้น" },
    { key: "achievements", label: "รางวัลและผลงาน" },
    { key: "activities", label: "ภาพกิจกรรม" },
    { key: "pa", label: "การพัฒนางานตามข้อตกลง (PA)" }
  ];

  const handleChange = (pageKey: string, field: string, value: string) => {
    setVisuals((prev: any) => ({
      ...prev,
      [pageKey]: {
        ...prev[pageKey],
        [field]: value
      }
    }));
    setSaveStatus("idle");
  };

  const handleImageUpload = async (pageKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(pageKey);
    try {
      const formData = new FormData();
      formData.append("imageFile", file);
      formData.append("pageKey", pageKey);

      const result = await uploadHeroImage(formData);
      
      if (result.success && result.imgUrl) {
        handleChange(pageKey, "image", result.imgUrl);
      } else {
        throw new Error(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Failed to upload image", error);
      alert("ไม่สามารถอัปโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setUploadingImage(null);
    }
  };

  const handleSave = () => {
    startTransition(async () => {
      const result = await savePageVisuals(visuals);
      setSaveStatus(result.success ? "success" : "error");
      if (result.success) {
        setTimeout(() => setSaveStatus("idle"), 3000);
      }
    });
  };

  return (
    <div className="space-y-6">
      {pages.map((page) => {
        const data = visuals[page.key] || {};
        return (
          <div key={page.key} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">{page.label}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Eyebrow (ข้อความเล็กด้านบน)</label>
                  <input 
                    type="text" 
                    value={data.eyebrow || ""}
                    onChange={(e) => handleChange(page.key, "eyebrow", e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">หัวข้อหลัก</label>
                  <input 
                    type="text" 
                    value={data.title || ""}
                    onChange={(e) => handleChange(page.key, "title", e.target.value)}
                    className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">คำอธิบาย</label>
                  <textarea 
                    value={data.description || ""}
                    onChange={(e) => handleChange(page.key, "description", e.target.value)}
                    rows={3}
                    className="w-full bg-black/50 border border-white/20 rounded-lg py-2.5 px-4 text-white focus:outline-none focus:border-white/50 resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-white/80 mb-2">รูปภาพพื้นหลัง</label>
                <div className="relative aspect-video bg-black/50 rounded-lg border border-white/10 overflow-hidden flex flex-col items-center justify-center">
                  {data.image ? (
                    <img src={data.image} alt={page.label} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                  ) : (
                    <ImageIcon className="w-10 h-10 text-white/20 mb-2" />
                  )}
                  
                  {uploadingImage === page.key ? (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  ) : (
                    <label className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer bg-black/0 hover:bg-black/40 transition-colors">
                      <span className="bg-orange-500/90 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
                        <Upload className="w-4 h-4" />
                        เปลี่ยนรูปภาพ
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(page.key, e)}
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-white/50">ขนาดที่แนะนำ: 1920x1080 (16:9)</p>
              </div>
            </div>
          </div>
        );
      })}

      <div className="sticky bottom-6 flex justify-end p-4 bg-[#050505]/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="text-sm text-green-400 font-medium">บันทึกข้อมูลเรียบร้อย</span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm text-red-400 font-medium">เกิดข้อผิดพลาด กรุณาลองใหม่</span>
          )}
          <button 
            type="button" 
            onClick={handleSave}
            disabled={isPending}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isPending ? "กำลังบันทึก..." : "บันทึกการตั้งค่า"}
          </button>
        </div>
      </div>
    </div>
  );
}
