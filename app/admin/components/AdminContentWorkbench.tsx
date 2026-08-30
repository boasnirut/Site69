"use client";

import { ChangeEvent, useMemo, useState, useTransition } from "react";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  FileImage,
  FileText,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
  Upload,
  XCircle
} from "lucide-react";
import type { AdminContentRecord } from "../actions";
import { saveContentCollection, uploadAdminAsset } from "../actions";

type CollectionKey = "achievements" | "activities";

type WorkbenchConfig = {
  collection: CollectionKey;
  eyebrow: string;
  title: string;
  description: string;
  emptyText: string;
  categories: string[];
  supportsGallery: boolean;
};

type FormState = {
  id: string;
  title: string;
  category: string;
  content: string;
  imgUrl: string;
  imagesText: string;
  albumUrl: string;
  date: string;
  status: "published" | "draft";
};

const achievementCategories = [
  "รางวัลและผลงานตนเอง",
  "รางวัลและผลงานผู้เรียน",
  "รางวัลผลงานสถานศึกษา",
  "Best Practice",
  "นวัตกรรม",
  "งานวิจัย",
  "การพัฒนาตนเอง",
  "การอบรมและสัมมนา",
  "การประชุมและเสวนา",
  "การเสริมสร้างทักษะ"
];

const activityCategories = [
  "กิจกรรมการเรียนรู้",
  "กิจกรรมพัฒนาผู้เรียน",
  "กิจกรรมโรงเรียน",
  "กิจกรรมชุมชน",
  "PLC",
  "อื่นๆ"
];

export const workbenchConfigs: Record<CollectionKey, WorkbenchConfig> = {
  achievements: {
    collection: "achievements",
    eyebrow: "Portfolio Manager",
    title: "จัดการรางวัลและผลงาน",
    description: "เพิ่ม แก้ไข ลบ จัดลำดับ และเปิด/ปิดการแสดงผลของผลงานที่ใช้ร่วมกันในหน้าแรกและหน้ารางวัล",
    emptyText: "ยังไม่มีรายการผลงานในหมวดนี้",
    categories: achievementCategories,
    supportsGallery: false
  },
  activities: {
    collection: "activities",
    eyebrow: "Activity Gallery Manager",
    title: "จัดการภาพกิจกรรม",
    description: "จัดการกิจกรรมแบบหลายภาพต่อกิจกรรม พร้อมภาพปก ลิงก์อัลบั้ม และสถานะเผยแพร่",
    emptyText: "ยังไม่มีรายการกิจกรรม",
    categories: activityCategories,
    supportsGallery: true
  }
};

const todayInputValue = () => new Date().toISOString().slice(0, 10);

const createBlankForm = (category: string): FormState => ({
  id: "",
  title: "",
  category,
  content: "",
  imgUrl: "",
  imagesText: "",
  albumUrl: "",
  date: todayInputValue(),
  status: "published"
});

const getDateInputValue = (value: string) => {
  if (!value) return todayInputValue();
  return value.slice(0, 10);
};

const toRecordDate = (value: string) => {
  if (!value) return new Date().toISOString();
  if (value.includes("T")) return value;
  return new Date(`${value}T00:00:00+07:00`).toISOString();
};

const parseImages = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const isDocument = (url: string) => {
  const lower = url.toLowerCase();
  return lower.endsWith(".pdf") || lower.includes("drive.google.com/file/d/");
};

const formatDate = (value: string) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(value));
};

export function AdminContentWorkbench({
  collection,
  initialRecords
}: {
  collection: CollectionKey;
  initialRecords: AdminContentRecord[];
}) {
  const config = workbenchConfigs[collection];
  const [records, setRecords] = useState<AdminContentRecord[]>(initialRecords);
  const [form, setForm] = useState<FormState>(() => createBlankForm(config.categories[0]));
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(() => {
    const published = records.filter((record) => record.status === "published").length;
    const draft = records.length - published;
    const images = records.reduce((total, record) => total + (record.images?.length || (record.imgUrl ? 1 : 0)), 0);

    return { total: records.length, published, draft, images };
  }, [records]);

  const filteredRecords = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return records.filter((record) => {
      const matchesCategory = category === "ทั้งหมด" || record.category === category;
      const matchesSearch =
        !keyword ||
        record.title.toLowerCase().includes(keyword) ||
        record.content.toLowerCase().includes(keyword) ||
        record.category.toLowerCase().includes(keyword);

      return matchesCategory && matchesSearch;
    });
  }, [category, records, search]);

  const updateForm = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setForm(createBlankForm(config.categories[0]));
    setCoverFile(null);
    setGalleryFiles([]);
  };

  const editRecord = (record: AdminContentRecord) => {
    setForm({
      id: record.id,
      title: record.title,
      category: record.category,
      content: record.content,
      imgUrl: record.imgUrl || "",
      imagesText: record.images?.join("\n") || "",
      albumUrl: record.albumUrl || "",
      date: getDateInputValue(record.date),
      status: record.status || "published"
    });
    setCoverFile(null);
    setGalleryFiles([]);
  };

  const uploadFile = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const result = await uploadAdminAsset(formData);

    if (!result.ok || !result.url) {
      throw new Error(result.message);
    }

    return result.url;
  };

  const persistRecords = (nextRecords: AdminContentRecord[], successText: string) => {
    startTransition(async () => {
      const result = await saveContentCollection(collection, nextRecords);

      if (result.ok && result.records) {
        setRecords(result.records);
        setMessage({ type: "success", text: successText });
        return;
      }

      setMessage({ type: "error", text: result.message });
    });
  };

  const saveRecord = () => {
    startTransition(async () => {
      try {
        let nextCover = form.imgUrl.trim();
        let nextImages = parseImages(form.imagesText);

        if (coverFile) {
          nextCover = await uploadFile(coverFile, collection);
        }

        if (config.supportsGallery && galleryFiles.length > 0) {
          const uploadedImages = [];

          for (const file of galleryFiles) {
            uploadedImages.push(await uploadFile(file, collection));
          }

          nextImages = [...nextImages, ...uploadedImages];
        }

        if (config.supportsGallery && !nextCover && nextImages.length > 0) {
          nextCover = nextImages[0];
        }

        const nextRecord: AdminContentRecord = {
          id: form.id || String(Date.now()),
          title: form.title,
          category: form.category,
          content: form.content,
          imgUrl: nextCover,
          images: config.supportsGallery ? nextImages : undefined,
          albumUrl: form.albumUrl,
          date: toRecordDate(form.date),
          status: form.status
        };

        const nextRecords = form.id
          ? records.map((record) => (record.id === form.id ? nextRecord : record))
          : [nextRecord, ...records];

        const result = await saveContentCollection(collection, nextRecords);

        if (result.ok && result.records) {
          setRecords(result.records);
          resetForm();
          setMessage({ type: "success", text: form.id ? "แก้ไขรายการเรียบร้อยแล้ว" : "เพิ่มรายการใหม่เรียบร้อยแล้ว" });
          return;
        }

        setMessage({ type: "error", text: result.message });
      } catch (error) {
        setMessage({ type: "error", text: error instanceof Error ? error.message : "บันทึกไม่สำเร็จ" });
      }
    });
  };

  const deleteRecord = (record: AdminContentRecord) => {
    const confirmed = window.confirm(`ยืนยันการลบ "${record.title}" หรือไม่`);
    if (!confirmed) return;

    const nextRecords = records.filter((item) => item.id !== record.id);
    persistRecords(nextRecords, "ลบรายการเรียบร้อยแล้ว");

    if (form.id === record.id) {
      resetForm();
    }
  };

  const toggleStatus = (record: AdminContentRecord) => {
    const nextStatus: AdminContentRecord["status"] = record.status === "published" ? "draft" : "published";
    const nextRecords = records.map((item) => (item.id === record.id ? { ...item, status: nextStatus } : item));
    persistRecords(nextRecords, nextStatus === "published" ? "เปิดแสดงผลเรียบร้อยแล้ว" : "ซ่อนรายการเรียบร้อยแล้ว");
  };

  const moveRecord = (record: AdminContentRecord, direction: -1 | 1) => {
    const currentIndex = records.findIndex((item) => item.id === record.id);
    const targetIndex = currentIndex + direction;

    if (currentIndex < 0 || targetIndex < 0 || targetIndex >= records.length) return;

    const nextRecords = [...records];
    const [selectedRecord] = nextRecords.splice(currentIndex, 1);
    nextRecords.splice(targetIndex, 0, selectedRecord);
    persistRecords(nextRecords, "จัดลำดับรายการเรียบร้อยแล้ว");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${collection}-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const importedRecords = Array.isArray(parsed) ? parsed : parsed[collection];

        if (!Array.isArray(importedRecords)) {
          setMessage({ type: "error", text: "รูปแบบไฟล์ไม่ถูกต้อง" });
          return;
        }

        persistRecords(importedRecords, "นำเข้าข้อมูลเรียบร้อยแล้ว");
      } catch {
        setMessage({ type: "error", text: "อ่านไฟล์ JSON ไม่สำเร็จ" });
      } finally {
        event.target.value = "";
      }
    };
    reader.readAsText(file, "utf-8");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6" style={{ fontFamily: 'Arial, "Noto Sans Thai", "Tahoma", sans-serif' }}>
      <section className="overflow-hidden rounded-3xl border border-amber-500/20 bg-[radial-gradient(circle_at_top_right,rgba(255,138,31,0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              <FileImage className="h-4 w-4" />
              {config.eyebrow}
            </span>
            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">{config.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{config.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[520px]">
            <Stat label="ทั้งหมด" value={stats.total} />
            <Stat label="เผยแพร่" value={stats.published} />
            <Stat label="แบบร่าง" value={stats.draft} />
            <Stat label="ไฟล์ภาพ" value={stats.images} />
          </div>
        </div>
      </section>

      {message ? (
        <div
          className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg ${
            message.type === "success"
              ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
              : "border-red-400/25 bg-red-400/10 text-red-100"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.58fr)]">
        <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 xl:order-2 xl:max-h-[calc(100vh-3rem)] xl:overflow-auto">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Content List</span>
              <h2 className="mt-1 text-xl font-bold text-white">รายการทั้งหมด</h2>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row xl:w-full xl:flex-col">
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/15 px-4 text-sm font-bold text-amber-100 transition hover:bg-amber-500/25"
                type="button"
                onClick={resetForm}
              >
                <Plus className="h-4 w-4" />
                เพิ่มรายการใหม่
              </button>
              <button
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-slate-200 transition hover:bg-white/10"
                type="button"
                onClick={exportJson}
              >
                <Download className="h-4 w-4" />
                ส่งออก JSON
              </button>
              <label className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-slate-200 transition hover:bg-white/10">
                <Upload className="h-4 w-4" />
                นำเข้า JSON
                <input className="sr-only" type="file" accept="application/json,.json" onChange={importJson} />
              </label>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3">
            <label className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                className="h-12 w-full rounded-2xl border border-white/10 bg-black/30 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400/60"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ค้นหาชื่อ รายละเอียด หรือหมวดหมู่"
              />
            </label>
            <select
              className="h-12 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-amber-400/60"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="ทั้งหมด">ทั้งหมด</option>
              {config.categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 space-y-3">
            {filteredRecords.length === 0 ? (
              <div className="flex min-h-56 flex-col items-center justify-center rounded-3xl border border-dashed border-white/12 bg-black/25 text-center">
                <FileImage className="h-10 w-10 text-slate-500" />
                <strong className="mt-3 text-white">{config.emptyText}</strong>
                <span className="mt-1 text-sm text-slate-500">ลองเพิ่มรายการใหม่หรือเปลี่ยนตัวกรอง</span>
              </div>
            ) : (
              filteredRecords.map((record) => (
                <article
                  className={`grid gap-3 rounded-2xl border p-3 transition md:grid-cols-[76px_minmax(0,1fr)] ${
                    form.id === record.id
                      ? "border-amber-400/45 bg-amber-400/[0.08]"
                      : "border-white/10 bg-black/25 hover:border-amber-400/25"
                  }`}
                  key={record.id}
                >
                  <PreviewImage url={record.imgUrl || record.images?.[0] || ""} title={record.title} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-xs font-bold text-amber-200">{record.category}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${record.status === "published" ? "bg-emerald-400/10 text-emerald-200" : "bg-slate-400/10 text-slate-300"}`}>
                        {record.status === "published" ? "เผยแพร่" : "แบบร่าง"}
                      </span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-base font-bold leading-relaxed text-white">{record.title}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-400">{record.content || "ไม่มีรายละเอียด"}</p>
                    <small className="mt-2 block text-xs text-slate-500">{formatDate(record.date)}</small>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-2 md:col-span-2">
                    <IconButton label="เลื่อนขึ้น" onClick={() => moveRecord(record, -1)} disabled={records[0]?.id === record.id || isPending}>
                      <ArrowUp className="h-4 w-4" />
                    </IconButton>
                    <IconButton label="เลื่อนลง" onClick={() => moveRecord(record, 1)} disabled={records[records.length - 1]?.id === record.id || isPending}>
                      <ArrowDown className="h-4 w-4" />
                    </IconButton>
                    <IconButton label={record.status === "published" ? "ซ่อน" : "เผยแพร่"} onClick={() => toggleStatus(record)} disabled={isPending}>
                      {record.status === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </IconButton>
                    <IconButton label="แก้ไข" onClick={() => editRecord(record)} disabled={isPending}>
                      <Pencil className="h-4 w-4" />
                    </IconButton>
                    <IconButton label="ลบ" onClick={() => deleteRecord(record)} disabled={isPending} danger>
                      <Trash2 className="h-4 w-4" />
                    </IconButton>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-500/20 bg-[linear-gradient(180deg,rgba(255,138,31,0.08),rgba(255,255,255,0.035))] p-5 shadow-xl shadow-black/25 xl:order-1 xl:sticky xl:top-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-amber-300">Editor</span>
              <h2 className="mt-1 text-xl font-bold text-white">{form.id ? "แก้ไขรายการ" : "เพิ่มรายการใหม่"}</h2>
            </div>
            {form.id ? (
              <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10" type="button" onClick={resetForm}>
                ยกเลิกแก้ไข
              </button>
            ) : null}
          </div>

          <div className="mt-5 space-y-4">
            <Field label="ชื่อรายการ">
              <input value={form.title} onChange={(event) => updateForm("title", event.target.value)} placeholder="ระบุชื่อรายการ" />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="หมวดหมู่">
                <select value={form.category} onChange={(event) => updateForm("category", event.target.value)}>
                  {config.categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="วันที่">
                <input type="date" value={form.date} onChange={(event) => updateForm("date", event.target.value)} />
              </Field>
            </div>

            <Field label="รายละเอียด">
              <textarea rows={4} value={form.content} onChange={(event) => updateForm("content", event.target.value)} placeholder="เขียนรายละเอียดที่ต้องการแสดงบนเว็บ" />
            </Field>

            <Field label={config.supportsGallery ? "ภาพปกกิจกรรม หรือ URL ไฟล์" : "ภาพ/ไฟล์หลัก หรือ URL"}>
              <input value={form.imgUrl} onChange={(event) => updateForm("imgUrl", event.target.value)} placeholder="/uploads/example.jpg หรือ https://..." />
            </Field>

            <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-amber-400/30 bg-black/25 px-4 py-5 text-center text-sm text-slate-300 transition hover:border-amber-300/60 hover:bg-amber-400/[0.06]">
              <ImagePlus className="h-8 w-8 text-amber-300" />
              <strong className="mt-2 text-white">อัปโหลดภาพ/ไฟล์หลัก</strong>
              <span className="mt-1 text-xs text-slate-500">{coverFile ? coverFile.name : "รองรับ JPG, PNG, WebP และ PDF"}</span>
              <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={(event) => setCoverFile(event.target.files?.[0] || null)} />
            </label>

            {config.supportsGallery ? (
              <>
                <Field label="รายการภาพกิจกรรมเพิ่มเติม">
                  <textarea
                    rows={5}
                    value={form.imagesText}
                    onChange={(event) => updateForm("imagesText", event.target.value)}
                    placeholder={"ใส่ URL ภาพ 1 บรรทัดต่อ 1 ภาพ\n/uploads/activity-1.jpg\n/uploads/activity-2.jpg"}
                  />
                </Field>

                <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cyan-300/25 bg-black/25 px-4 py-5 text-center text-sm text-slate-300 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.05]">
                  <Upload className="h-8 w-8 text-cyan-200" />
                  <strong className="mt-2 text-white">อัปโหลดหลายภาพเข้ากิจกรรม</strong>
                  <span className="mt-1 text-xs text-slate-500">{galleryFiles.length ? `${galleryFiles.length} ไฟล์ที่เลือก` : "ระบบจะเพิ่ม URL ภาพต่อท้ายให้อัตโนมัติ"}</span>
                  <input
                    className="sr-only"
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(event) => setGalleryFiles(Array.from(event.target.files || []))}
                  />
                </label>
              </>
            ) : null}

            <Field label="ลิงก์อัลบั้ม/ลิงก์อ้างอิง">
              <input value={form.albumUrl} onChange={(event) => updateForm("albumUrl", event.target.value)} placeholder="https://photos.app.goo.gl/... หรือเว้นว่างได้" />
            </Field>

            <Field label="สถานะ">
              <select value={form.status} onChange={(event) => updateForm("status", event.target.value as "published" | "draft")}>
                <option value="published">เผยแพร่</option>
                <option value="draft">แบบร่าง</option>
              </select>
            </Field>

            <button
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 text-sm font-black text-black shadow-lg shadow-orange-500/20 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
              type="button"
              disabled={isPending}
              onClick={saveRecord}
            >
              <Save className="h-5 w-5" />
              {isPending ? "กำลังบันทึก..." : form.id ? "บันทึกการแก้ไข" : "เพิ่มรายการ"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <strong className="block text-2xl font-black text-white">{value}</strong>
      <span className="mt-1 block text-xs font-semibold text-slate-400">{label}</span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-300">{label}</span>
      <div className="[&_input]:min-h-11 [&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-black/35 [&_input]:px-3 [&_input]:text-sm [&_input]:text-white [&_input]:outline-none [&_input]:transition [&_input]:placeholder:text-slate-600 [&_input:focus]:border-amber-400/60 [&_select]:min-h-11 [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-white/10 [&_select]:bg-black/35 [&_select]:px-3 [&_select]:text-sm [&_select]:text-white [&_select]:outline-none [&_select:focus]:border-amber-400/60 [&_textarea]:w-full [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-black/35 [&_textarea]:px-3 [&_textarea]:py-3 [&_textarea]:text-sm [&_textarea]:leading-relaxed [&_textarea]:text-white [&_textarea]:outline-none [&_textarea]:transition [&_textarea]:placeholder:text-slate-600 [&_textarea:focus]:border-amber-400/60">
        {children}
      </div>
    </label>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
  danger = false
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-40 ${
        danger ? "border-red-400/25 bg-red-400/10 text-red-200 hover:bg-red-400/18" : "border-white/10 bg-white/5 text-slate-200 hover:border-amber-400/35 hover:text-amber-200"
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function PreviewImage({ url, title }: { url: string; title: string }) {
  if (!url) {
    return (
      <div className="grid h-20 w-full place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-500 md:h-20 md:w-20">
        <FileImage className="h-7 w-7" />
      </div>
    );
  }

  if (isDocument(url)) {
    return (
      <div className="grid h-20 w-full place-items-center rounded-2xl border border-white/10 bg-amber-400/10 text-amber-200 md:h-20 md:w-20">
        <FileText className="h-7 w-7" />
      </div>
    );
  }

  return (
    <div className="h-20 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] md:w-20">
      <img className="h-full w-full object-cover" src={url} alt={title} />
    </div>
  );
}
