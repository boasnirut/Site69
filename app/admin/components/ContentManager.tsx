"use client";

import { FileEdit, Plus, Trash2, Loader2, GripVertical, Save, X } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { addOrEditContent, deleteContent, reorderContent } from "../actions";
import { Reorder } from "framer-motion";

type ContentItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  status: string;
  content: string;
  imgUrl: string;
  albumUrl?: string;
  type?: string;
};

export function ContentManager({ 
  initialData, 
  fixedType,
  categories
}: { 
  initialData: { achievements: any[], activities: any[] }, 
  fixedType?: string,
  categories?: string[] 
}) {
  const [isPending, startTransition] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
  
  // State for items and reordering
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isReordered, setIsReordered] = useState(false);

  useEffect(() => {
    const allContent = [
      ...(initialData.achievements || []).map(a => ({ ...a, type: "achievements" })),
      ...(initialData.activities || []).map(a => ({ ...a, type: "activities" }))
    ]
    .filter(item => fixedType ? item.type === fixedType : true);
    
    // We don't sort by date anymore if we want manual ordering to stick.
    // Assuming the JSON array order is the exact order they want.
    setItems(allContent);
    setIsReordered(false);
  }, [initialData, fixedType]);

  const handleDelete = (type: string, id: string) => {
    if (confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่? (จะอัปเดตขึ้น GitHub ทันที)")) {
      startTransition(async () => {
        const res = await deleteContent(type, id);
        if (res.error) alert(res.error);
      });
    }
  };

  const handleEdit = (item: ContentItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Client-side validation for file size
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 3 * 1024 * 1024) { // 3MB limit
        alert("ไฟล์รูปภาพมีขนาดใหญ่เกินไป (สูงสุด 3MB) กรุณาย่อขนาดรูปภาพก่อนอัปโหลดครับ");
        return;
      }
    }

    if (editingItem) {
      formData.append("id", editingItem.id);
    }
    
    startTransition(async () => {
      const res = await addOrEditContent(formData);
      if (res.error) {
        alert(res.error);
      } else {
        setShowForm(false);
        setEditingItem(null);
      }
    });
  };

  const handleSaveOrder = () => {
    if (!fixedType) return; // Reordering only works within a specific type
    
    startTransition(async () => {
      const ids = items.map(item => item.id);
      const res = await reorderContent(fixedType, ids);
      if (res.error) {
        alert(res.error);
      } else {
        setIsReordered(false);
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">จัดการเนื้อหาเว็บไซต์ (Git-based)</h1>
          <p className="text-white/60 text-sm">การบันทึกข้อมูลจะถูกส่งไปยัง GitHub และอัปเดตเว็บอัตโนมัติ</p>
        </div>
        <div className="flex items-center gap-2">
          {isReordered && (
            <button 
              onClick={handleSaveOrder}
              disabled={isPending}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              บันทึกลำดับ
            </button>
          )}
          <button 
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setEditingItem(null);
              } else {
                setShowForm(true);
              }
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-colors"
          >
            {showForm ? "ยกเลิก" : <><Plus className="w-4 h-4" /> เพิ่มเนื้อหาใหม่</>}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">
              {editingItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูลใหม่"}
            </h2>
            {editingItem && (
              <button onClick={() => { setShowForm(false); setEditingItem(null); }} className="text-white/50 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fixedType ? (
                <input type="hidden" name="type" value={fixedType} />
              ) : (
                <div>
                  <label className="block text-sm text-white/80 mb-1">ประเภท</label>
                  <select name="type" defaultValue={editingItem?.type || "achievements"} className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white">
                    <option value="achievements">รางวัลและผลงาน</option>
                    <option value="activities">ภาพกิจกรรม</option>
                  </select>
                </div>
              )}
              
              {fixedType === "activities" ? (
                <input type="hidden" name="category" value="ภาพกิจกรรม" />
              ) : (
                <div className={fixedType ? "col-span-1 md:col-span-2" : ""}>
                  <label className="block text-sm text-white/80 mb-1">หมวดหมู่</label>
                  {categories && categories.length > 0 ? (
                    <select name="category" defaultValue={editingItem?.category || categories[0]} className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white">
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  ) : (
                    <input name="category" type="text" defaultValue={editingItem?.category || ""} placeholder="เช่น นวัตกรรม, งานวิจัย" required className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white" />
                  )}
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">ชื่อเรื่อง</label>
              <input name="title" type="text" defaultValue={editingItem?.title || ""} required className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white" />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">รายละเอียด</label>
              <textarea name="content" required defaultValue={editingItem?.content || ""} className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white h-20" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/80 mb-1">อัปโหลดรูปภาพปกใหม่ (จากเครื่อง)</label>
                <input name="imageFile" type="file" accept="image/*" className="w-full bg-black/50 border border-white/20 rounded-lg py-1.5 px-3 text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-500/20 file:text-orange-400 hover:file:bg-orange-500/30 cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">หรือ วางลิงก์รูปภาพปก/ไฟล์เอกสาร</label>
                <input name="imgUrl" type="text" defaultValue={editingItem?.imgUrl || ""} placeholder="เช่น /uploads/activity-01.jpg หรือลิงก์รูปภาพ" className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white" />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1 flex items-center justify-between">
                <span>แนบลิงก์อัลบั้ม Google Photos (ถ้ามี)</span>
                <span className="text-xs text-orange-400 font-normal">เช่น https://photos.app.goo.gl/...</span>
              </label>
              <input 
                name="albumUrl" 
                type="url" 
                defaultValue={editingItem?.albumUrl || ""} 
                placeholder="https://photos.app.goo.gl/..." 
                className="w-full bg-black/50 border border-white/20 rounded-lg py-2 px-3 text-white focus:border-orange-500 focus:outline-none" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isPending}
              className="bg-white text-black px-6 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {isPending ? "กำลังบันทึกไปยัง GitHub..." : (editingItem ? "บันทึกการแก้ไข" : "บันทึกข้อมูล")}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5 text-sm font-medium text-white/50">
          <div className="col-span-1 text-center">จัดลำดับ</div>
          <div className="col-span-4">ชื่อเนื้อหา</div>
          <div className="col-span-2">หมวดหมู่</div>
          <div className="col-span-3">วันที่อัปเดต</div>
          <div className="col-span-2 text-right">จัดการ</div>
        </div>

        {/* Draggable List */}
        <Reorder.Group 
          axis="y" 
          values={items} 
          onReorder={(newOrder) => {
            setItems(newOrder);
            setIsReordered(true);
          }}
          className="divide-y divide-white/10"
        >
          {items.length === 0 ? (
            <div className="p-8 text-center text-white/50">ไม่พบข้อมูล</div>
          ) : items.map((item) => (
            <Reorder.Item 
              key={`${item.type}-${item.id}`} 
              value={item}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors cursor-grab active:cursor-grabbing bg-[#050505]"
            >
              <div className="col-span-1 flex justify-center text-white/30">
                <GripVertical className="w-5 h-5" />
              </div>
              <div className="col-span-4 font-medium text-white truncate pr-4">
                {item.title}
              </div>
              <div className="col-span-2">
                <span className="bg-white/10 px-2 py-1 rounded text-xs truncate max-w-full inline-block">
                  {item.category}
                </span>
              </div>
              <div className="col-span-3 text-white/60 text-sm">
                {new Date(item.date).toLocaleDateString("th-TH")}
              </div>
              <div className="col-span-2 flex items-center justify-end gap-3">
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(item); }}
                  disabled={isPending}
                  className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                  <FileEdit className="w-4 h-4" /> <span className="hidden sm:inline">แก้ไข</span>
                </button>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(item.type!, item.id); }}
                  disabled={isPending}
                  className="text-red-400 hover:text-red-300 font-medium text-sm flex items-center gap-1 disabled:opacity-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> <span className="hidden sm:inline">ลบ</span>
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
      
      {isReordered && (
        <p className="text-orange-400 text-sm text-right mt-2 flex items-center justify-end gap-2">
          <span>⚠️ ลำดับมีการเปลี่ยนแปลง อย่าลืมกด <strong>บันทึกลำดับ</strong> ด้านบนนะครับ</span>
        </p>
      )}
    </div>
  );
}
