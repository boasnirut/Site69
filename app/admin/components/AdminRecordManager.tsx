"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  LoaderCircle, 
  FileImage, 
  FileText, 
  GripVertical, 
  Link2,
  Trophy,
  Images,
  Sparkles
} from "lucide-react";
import { addOrEditContent, deleteContent, reorderContent } from "@/app/admin/actions";

type RecordItem = {
  id: string;
  title: string;
  category?: string;
  content?: string;
  imgUrl?: string;
  albumUrl?: string;
  date?: string;
  status?: string;
  author?: string;
  document_urls?: string[];
  [key: string]: any;
};

interface AdminRecordManagerProps {
  type: "achievements" | "activities";
  title: string;
  eyebrow: string;
  categories: string[];
  items: RecordItem[];
  onRefresh?: () => void;
}

export function AdminRecordManager({
  type,
  title,
  eyebrow,
  categories,
  items: initialItems,
  onRefresh
}: AdminRecordManagerProps) {
  const [items, setItems] = useState<RecordItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: categories[0] || "ทั่วไป",
    content: "",
    albumUrl: "",
    imgUrl: "",
    date: new Date().toISOString().slice(0, 10),
    status: "published"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([""]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Drag & Drop Reorder States
  const [draggedId, setDraggedId] = useState<string>("");
  const [dropTargetId, setDropTargetId] = useState<string>("");
  const [orderBaseline, setOrderBaseline] = useState<string[]>([]);
  const [orderSaving, setOrderSaving] = useState(false);
  const [orderMessage, setOrderMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const orderDirty = orderBaseline.length > 0;

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage(null);
  };

  const chooseImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const reset = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: categories[0] || "ทั่วไป",
      content: "",
      albumUrl: "",
      imgUrl: "",
      date: new Date().toISOString().slice(0, 10),
      status: "published"
    });
    setImageFile(null);
    setPreview("");
    setAttachmentUrls([""]);
    setMessage(null);
  };

  const edit = (item: RecordItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title || "",
      category: item.category || categories[0] || "ทั่วไป",
      content: item.content || "",
      albumUrl: item.albumUrl || "",
      imgUrl: item.imgUrl || "",
      date: item.date ? item.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      status: item.status || "published"
    });
    setImageFile(null);
    setPreview(item.imgUrl || "");
    setAttachmentUrls(item.document_urls && item.document_urls.length > 0 ? item.document_urls : [""]);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const updateAttachmentUrl = (index: number, value: string) => {
    setAttachmentUrls((prev) => prev.map((url, i) => (i === index ? value : url)));
    setMessage(null);
  };

  const addAttachmentUrl = () => {
    if (attachmentUrls.length < 5) {
      setAttachmentUrls((prev) => [...prev, ""]);
    }
  };

  const removeAttachmentUrl = (index: number) => {
    setAttachmentUrls((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length ? next : [""];
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setMessage({ type: "error", text: "กรุณากรอกหัวข้อรายการ" });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      if (editingId) formData.append("id", editingId);
      formData.append("type", type);
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("content", form.content);
      formData.append("albumUrl", form.albumUrl);
      formData.append("imgUrl", form.imgUrl);
      formData.append("status", form.status);

      const validUrls = attachmentUrls.filter((u) => u.trim());
      formData.append("document_urls", JSON.stringify(validUrls));

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const res = await addOrEditContent(formData);
      if (res.success) {
        setMessage({
          type: "success",
          text: editingId ? "บันทึกการแก้ไขเรียบร้อยแล้ว" : "เพิ่มข้อมูลเรียบร้อยแล้ว"
        });
        reset();
        if (onRefresh) onRefresh();
      } else {
        setMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการบันทึก" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาด" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: RecordItem) => {
    if (!confirm(`คุณต้องการลบรายการ "${item.title}" ใช่หรือไม่?`)) return;

    try {
      const res = await deleteContent(type, item.id);
      if (res.success) {
        setMessage({ type: "success", text: "ลบรายการเรียบร้อยแล้ว" });
        setItems((prev) => prev.filter((i) => i.id !== item.id));
        if (onRefresh) onRefresh();
      } else {
        setMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการลบ" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาด" });
    }
  };

  // Drag & Drop Handlers
  const dragStart = (e: React.DragEvent, item: RecordItem) => {
    if (orderSaving) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.id);
    setDraggedId(item.id);
    if (!orderBaseline.length) {
      setOrderBaseline(items.map((i) => i.id));
    }
    setOrderMessage(null);
  };

  const dragOver = (e: React.DragEvent, item: RecordItem) => {
    if (!draggedId || draggedId === item.id) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTargetId(item.id);
  };

  const drop = (e: React.DragEvent, targetItem: RecordItem) => {
    e.preventDefault();
    const sourceId = draggedId || e.dataTransfer.getData("text/plain");
    setDraggedId("");
    setDropTargetId("");
    if (!sourceId || sourceId === targetItem.id) return;

    setItems((prev) => {
      const sourceIndex = prev.findIndex((i) => i.id === sourceId);
      const targetIndex = prev.findIndex((i) => i.id === targetItem.id);
      if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return prev;
      const next = [...prev];
      const [moved] = next.splice(sourceIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setOrderMessage(null);
  };

  const cancelOrder = () => {
    if (!orderBaseline.length) return;
    const itemMap = new Map(items.map((i) => [i.id, i]));
    const restored = orderBaseline.map((id) => itemMap.get(id)).filter(Boolean) as RecordItem[];
    setItems(restored);
    setOrderBaseline([]);
    setDraggedId("");
    setDropTargetId("");
    setOrderMessage(null);
  };

  const saveOrder = async () => {
    setOrderSaving(true);
    setOrderMessage(null);
    try {
      const reorderedIds = items.map((i) => i.id);
      const res = await reorderContent(type, reorderedIds);
      if (res.success) {
        setOrderBaseline([]);
        setOrderMessage({ type: "success", text: "บันทึกลำดับการแสดงผลเรียบร้อยแล้ว" });
        if (onRefresh) onRefresh();
      } else {
        setOrderMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการบันทึกลำดับ" });
      }
    } catch (err: any) {
      setOrderMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาดในการบันทึกลำดับ" });
    } finally {
      setOrderSaving(false);
    }
  };

  return (
    <section className="admin-content-grid">
      {/* LEFT COLUMN: Item Form Editor */}
      <form className="news-editor" onSubmit={handleSubmit}>
        <div className="admin-section-heading">
          <div>
            <span>{eyebrow}</span>
            <h2>{editingId ? `แก้ไข${title}` : `เพิ่ม${title}`}</h2>
          </div>
          {editingId ? (
            <button className="admin-icon-button" type="button" onClick={reset} aria-label="ยกเลิกแก้ไข">
              <X size={20} />
            </button>
          ) : (
            type === "achievements" ? <Trophy size={26} /> : <Images size={26} />
          )}
        </div>

        <div className="news-editor__grid">
          {/* Title */}
          <label className="news-field news-field--wide">
            <span>หัวข้อ / ชื่อรายการ</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={update}
              placeholder="กรอกหัวข้อหรือชื่อรายการ"
              required
            />
          </label>

          {/* Category Select */}
          <label className="news-field">
            <span>หมวดหมู่</span>
            <select name="category" value={form.category} onChange={update}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          {/* Status Select */}
          <label className="news-field">
            <span>สถานะการเผยแพร่</span>
            <select name="status" value={form.status} onChange={update}>
              <option value="published">เผยแพร่บนเว็บไซต์</option>
              <option value="draft">ฉบับร่าง (ปิดการแสดง)</option>
            </select>
          </label>

          {/* Google Photos Album Link */}
          <label className="news-field news-field--wide">
            <span>ลิงก์อัลบั้ม Google Photos (ดึงภาพอัตโนมัติ)</span>
            <input
              type="url"
              name="albumUrl"
              value={form.albumUrl}
              onChange={update}
              placeholder="https://photos.app.goo.gl/..."
            />
          </label>

          {/* Excerpt / Detail Content */}
          <label className="news-field news-field--wide">
            <span>รายละเอียด / รายการบันทึก</span>
            <textarea
              name="content"
              value={form.content}
              onChange={update}
              rows={5}
              placeholder="กรอกรายละเอียดเพิ่มเติม"
            />
          </label>
        </div>

        {/* Cover Image Upload & Live Preview */}
        <div className="news-field news-field--wide mt-3">
          <span>รูปภาพหน้าปก / ตัวอย่าง</span>
          <label className={`image-uploader ${preview ? "image-uploader--selected" : ""}`}>
            {preview ? (
              <img src={preview} alt="ตัวอย่างรูปภาพ" />
            ) : (
              <>
                <span>
                  <FileImage size={27} />
                </span>
                <strong>คลิกเพื่อเลือกรูปภาพหน้าปก</strong>
                <small>รองรับ JPG, PNG หรือ WebP</small>
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={chooseImage}
            />
          </label>
        </div>

        {/* Attachment Links */}
        <div className="news-field quality-link-fields record-attachment-links mt-3">
          <div className="quality-link-fields__heading flex justify-between items-center mb-2">
            <span>ลิงก์ไฟล์แนบ / เอกสารประกอบ (สูงสุด 5 รายการ)</span>
            <button
              type="button"
              className="text-xs text-amber-400 font-bold flex items-center gap-1 hover:text-amber-300 cursor-pointer"
              onClick={addAttachmentUrl}
              disabled={attachmentUrls.length >= 5}
            >
              <Plus size={14} /> เพิ่มลิงก์
            </button>
          </div>
          {attachmentUrls.map((url, idx) => (
            <div className="quality-link-fields__row flex items-center gap-2 mb-2" key={idx}>
              <input
                type="url"
                value={url}
                onChange={(e) => updateAttachmentUrl(idx, e.target.value)}
                placeholder={`ลิงก์ไฟล์แนบที่ ${idx + 1} (เช่น Google Drive, PDF)`}
                className="flex-1"
              />
              {attachmentUrls.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAttachmentUrl(idx)}
                  className="p-2 text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Alerts & Submitting state */}
        {message && (
          <p className={`admin-message admin-message--${message.type} mt-3`}>
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </p>
        )}

        <button
          className="admin-button admin-button--primary w-full mt-4 cursor-pointer"
          type="submit"
          disabled={submitting}
        >
          {submitting ? <LoaderCircle className="spin" size={19} /> : <Save size={19} />}
          {submitting ? "กำลังบันทึก..." : editingId ? "บันทึกการแก้ไข" : `เพิ่ม${title}`}
        </button>
      </form>

      {/* RIGHT COLUMN: Database Items List */}
      <div className="admin-list-card">
        <div className="admin-section-heading">
          <div>
            <span>DATABASE</span>
            <h2>รายการที่บันทึกไว้ ({items.length})</h2>
          </div>
          {type === "achievements" ? <Trophy size={26} /> : <Images size={26} />}
        </div>

        {/* Drag Hint Banner */}
        {items.length > 1 && (
          <div className="admin-reorder-guide flex items-center gap-2 text-xs text-amber-400/90 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 mb-3">
            <GripVertical size={16} className="text-amber-400" />
            <span>คลิกค้างที่ไอคอนจุดทางซ้ายเพื่อลากสลับลำดับการแสดงผล</span>
          </div>
        )}

        {/* Order Dirty Action Banner */}
        {orderDirty && (
          <div className="admin-reorder-confirm p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-between gap-3 mb-4 shadow-lg">
            <div className="text-xs">
              <strong className="block text-amber-300 font-bold">มีการเปลี่ยนลำดับรายการ</strong>
              <span className="text-slate-300">กดยืนยันเพื่อให้ลำดับใหม่แสดงบนเว็บไซต์</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={cancelOrder}
                disabled={orderSaving}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700 cursor-pointer transition-all"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={saveOrder}
                disabled={orderSaving}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                {orderSaving ? <LoaderCircle className="animate-spin" size={14} /> : <Save size={14} />}
                <span>{orderSaving ? "กำลังบันทึก..." : "ยืนยันการเปลี่ยนลำดับ"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Order Status Message */}
        {orderMessage && (
          <p className={`admin-message admin-message--${orderMessage.type} mb-4 p-3 rounded-xl flex items-center gap-2 text-xs font-bold ${
            orderMessage.type === "success" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
          }`}>
            {orderMessage.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{orderMessage.text}</span>
          </p>
        )}

        {!items.length ? (
          <div className="admin-empty py-12 text-center text-slate-400">
            <Sparkles size={32} className="mx-auto mb-2 opacity-50 text-amber-400" />
            <strong>ยังไม่มีข้อมูลในหมวดนี้</strong>
          </div>
        ) : (
          <div className="admin-record-list space-y-3">
            {items.map((item) => (
              <article
                key={item.id}
                className={`is-reorderable transition-all rounded-xl border p-3 flex items-center gap-3 bg-[#0d1321] ${
                  draggedId === item.id ? "opacity-40 bg-amber-500/10 border-amber-500/40" : "border-white/10 hover:border-amber-500/30"
                } ${dropTargetId === item.id ? "border-amber-400 border-2 bg-amber-500/10 scale-[1.01]" : ""}`}
                onDragOver={(e) => dragOver(e, item)}
                onDragLeave={() => setDropTargetId("")}
                onDrop={(e) => drop(e, item)}
              >
                <span
                  className="admin-record-list__drag cursor-grab active:cursor-grabbing p-1 text-slate-400 hover:text-amber-400 transition-colors shrink-0"
                  title="คลิกค้างแล้วลากเพื่อสลับลำดับ"
                  draggable={!orderSaving}
                  onDragStart={(e) => dragStart(e, item)}
                  onDragEnd={() => {
                    setDraggedId("");
                    setDropTargetId("");
                  }}
                >
                  <GripVertical size={20} />
                </span>

                <div className="admin-news-list__image shrink-0">
                  {item.imgUrl ? (
                    <img src={item.imgUrl} alt="" className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <FileImage size={22} />
                    </div>
                  )}
                </div>

                <div className="admin-record-list__copy flex-1 min-w-0">
                  <span className="text-amber-400 font-bold text-xs block">
                    {item.category} • {item.status === "draft" ? "ฉบับร่าง" : "เผยแพร่"}
                  </span>
                  <h3 className="font-bold text-slate-100 text-sm truncate mt-0.5">{item.title}</h3>
                  {item.albumUrl && (
                    <small className="admin-record-list__links flex items-center gap-1 text-slate-400 text-[11px] mt-0.5">
                      <Link2 size={12} /> เชื่อมกับ Google Photos
                    </small>
                  )}
                  <small className="admin-record-list__audit text-slate-400 text-[11px] block mt-0.5">
                    บันทึกเมื่อ {item.date ? new Date(item.date).toLocaleDateString("th-TH") : "ไม่ระบุ"}
                  </small>
                </div>

                <div className="admin-record-list__actions flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => edit(item)}
                    title="แก้ไข"
                    className="p-2 rounded-lg bg-amber-500/15 text-amber-300 hover:bg-amber-500/30 transition-all cursor-pointer"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    type="button"
                    className="is-danger p-2 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/30 transition-all cursor-pointer"
                    onClick={() => handleDelete(item)}
                    title="ลบ"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
