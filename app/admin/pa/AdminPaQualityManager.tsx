"use client";

import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  FileText, 
  Plus, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  LoaderCircle, 
  Save, 
  Pencil, 
  Trash2, 
  Link2, 
  ExternalLink, 
  Images, 
  BadgeCheck,
  UserCheck,
  Clock,
  Target,
  Upload,
  BookOpenCheck
} from "lucide-react";
import { fetchContent, savePaRecord, deletePaRecord, savePaSettings, uploadPaPdf } from "@/app/admin/actions";
import { paReportGeneral } from "@/lib/pa-data";
import "../admin.css";

export const paLevels = [
  {
    id: "pa_agreement",
    label: "ข้อตกลงในการพัฒนางาน (แบบ PA 1/ส)",
    shortLabel: "ข้อตกลง PA",
    summary: "3 ด้าน 15 ตัวชี้วัด + ประเด็นท้าทาย",
    description: "เอกสารและข้อตกลงในการพัฒนางานตามมาตรฐานตำแหน่งและภาระงาน ก.ค.ศ.",
    indicators: [
      { code: "general_info", title: "ข้อมูลทั่วไป & ภาระงาน ก.ค.ศ." },
      { code: "pdf_agreement", title: "ไฟล์เอกสาร PDF ข้อตกลง PA (แบบ PA 1/ส)" },
      { code: "1.1", title: "ด้านการจัดการเรียนรู้ 1.1 การสร้างและหรือพัฒนาหลักสูตร" },
      { code: "1.2", title: "ด้านการจัดการเรียนรู้ 1.2 ออกแบบการจัดการเรียนรู้" },
      { code: "1.3", title: "ด้านการจัดการเรียนรู้ 1.3 จัดกิจกรรมการเรียนรู้" },
      { code: "1.4", title: "ด้านการจัดการเรียนรู้ 1.4 สร้างและหรือพัฒนาสื่อ นวัตกรรม เทคโนโลยี" },
      { code: "1.5", title: "ด้านการจัดการเรียนรู้ 1.5 วัดและประเมินผลการเรียนรู้" },
      { code: "1.6", title: "ด้านการจัดการเรียนรู้ 1.6 ศึกษา วิเคราะห์ และสังเคราะห์ เพื่อแก้ปัญหา" },
      { code: "1.7", title: "ด้านการจัดการเรียนรู้ 1.7 จัดบรรยากาศที่ส่งเสริมและพัฒนาผู้เรียน" },
      { code: "1.8", title: "ด้านการจัดการเรียนรู้ 1.8 อบรมและพัฒนาคุณลักษณะที่ดีของผู้เรียน" },
      { code: "2.1", title: "ด้านการส่งเสริมและสนับสนุน 2.1 จัดทำข้อมูลสารสนเทศผู้เรียนและรายวิชา" },
      { code: "2.2", title: "ด้านการส่งเสริมและสนับสนุน 2.2 ดำเนินการตามระบบดูแลช่วยเหลือผู้เรียน" },
      { code: "2.3", title: "ด้านการส่งเสริมและสนับสนุน 2.3 ปฏิบัติงานวิชาการ และงานอื่น ๆ" },
      { code: "2.4", title: "ด้านการส่งเสริมและสนับสนุน 2.4 ประสานความร่วมมือกับผู้ปกครอง ภาคีเครือข่าย" },
      { code: "3.1", title: "ด้านการพัฒนาตนเองและวิชาชีพ 3.1 พัฒนาตนเองอย่างเป็นระบบและต่อเนื่อง" },
      { code: "3.2", title: "ด้านการพัฒนาตนเองและวิชาชีพ 3.2 มีส่วนร่วมในการแลกเปลี่ยนเรียนรู้ทางวิชาชีพ (PLC)" },
      { code: "3.3", title: "ด้านการพัฒนาตนเองและวิชาชีพ 3.3 นำความรู้ความสามารถทักษะที่ได้จากการพัฒนาตนเองมาใช้" },
      { code: "challenge", title: "ส่วนที่ 2 ข้อตกลงในการพัฒนางานที่เป็นประเด็นท้าทาย" }
    ]
  },
  {
    id: "pa_report",
    label: "รายงานการพัฒนางานตามข้อตกลง (PA / SAR)",
    shortLabel: "รายงานผล PA",
    summary: "คำนำ + 2 องค์ประกอบ + ภาพหลักฐานร่องรอย",
    description: "รายงานการประเมินตนเอง (SAR) และหลักฐานร่องรอยการพัฒนางาน",
    indicators: [
      { code: "preface", title: "คำนำรายงานการประเมินตนเอง (SAR)" },
      { code: "pdf_report", title: "ไฟล์เอกสาร PDF รายงานผล PA (SAR ฉบับเต็ม)" },
      { code: "profile_history", title: "ข้อมูลผู้จัดทำ ประวัติการศึกษา และประวัติการลา" },
      { code: "comp1", title: "องค์ประกอบที่ 1 รายงานผลการประเมินตามมาตรฐานตำแหน่ง" },
      { code: "comp2", title: "องค์ประกอบที่ 2 สรุปผลการดำเนินงานประเด็นท้าทาย" },
      { code: "evidence_gallery", title: "ภาพหลักฐานร่องรอยการพัฒนางาน (Google Photos & รูปภาพ)" }
    ]
  }
];

export const paLevelMap = Object.fromEntries(paLevels.map((l) => [l.id, l]));

export function getPaIndicator(category: string, code: string) {
  const level = paLevelMap[category] || paLevels[0];
  return level.indicators.find((ind) => ind.code === code);
}

export function AdminPaQualityManager() {
  const [category, setCategory] = useState<string>("pa_agreement");
  const [indicatorCode, setIndicatorCode] = useState<string>("general_info");
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    name: paReportGeneral.maker[0] || "นายนิรุทธิ์ เสวะนา",
    position: paReportGeneral.maker[1] || "ตำแหน่งครู อันดับ คศ.1",
    school: paReportGeneral.maker[2] || "โรงเรียนบ้านน้ำพร อำเภอเชียงคาน จังหวัดเลย",
    affiliation: paReportGeneral.maker[3] || "สำนักงานเขตพื้นที่การศึกษาประถมศึกษาเลย เขต 1",
    agreementPeriod: paReportGeneral.maker[4] || "รอบรายงานปีงบประมาณ 2569",
    workloadHours: "43",
    agreementPdfUrl: "/pa-agreement-2569-placeholder.pdf",
    reportPdfUrl: "/pa-report-2569-placeholder.pdf",
    preface: paReportGeneral.preface || "",
    evidenceAlbumUrl: ""
  });

  // Dynamic Form Fields State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problem, setProblem] = useState("");
  const [tasksStr, setTasksStr] = useState("");
  const [outcomesStr, setOutcomesStr] = useState("");
  const [indicatorsStr, setIndicatorsStr] = useState("");
  const [methodsStr, setMethodsStr] = useState("");
  const [expectedStr, setExpectedStr] = useState("");
  
  // Document Links
  const [docUrls, setDocUrls] = useState<string[]>([""]);
  const [docNames, setDocNames] = useState<string[]>([""]);
  const [docTypes, setDocTypes] = useState<string[]>([""]);

  // File Upload
  const [file, setFile] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      setLoading(true);
      try {
        const content = await fetchContent();
        if (content.paEvidence) {
          setItems(content.paEvidence);
        }
        if (content.paSettings?.general) {
          setGeneralSettings((prev) => ({ ...prev, ...content.paSettings.general }));
        }
      } catch (err) {
        console.error("Failed to load PA evidence records", err);
      } finally {
        setLoading(false);
      }
    }
    loadRecords();
  }, []);

  const selectedLevel = paLevelMap[category] || paLevels[0];
  const indicators = selectedLevel.indicators;
  const currentIndicator = getPaIndicator(category, indicatorCode);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const nextLevel = paLevelMap[newCategory] || paLevels[0];
    setIndicatorCode(nextLevel.indicators[0].code);
    resetForm();
  };

  const handleIndicatorChange = (newCode: string) => {
    setIndicatorCode(newCode);
    resetForm();
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setProblem("");
    setTasksStr("");
    setOutcomesStr("");
    setIndicatorsStr("");
    setMethodsStr("");
    setExpectedStr("");
    setDocUrls([""]);
    setDocNames([""]);
    setDocTypes([""]);
    setFile(null);
    setMessage(null);
  };

  const handleEditRecord = (item: any) => {
    setCategory(item.category || "pa_agreement");
    setIndicatorCode(item.indicator_code || "1.1");
    setEditingId(item.id);
    setTitle(item.title || "");
    setDescription(item.description || "");
    setProblem(item.problem || "");
    setTasksStr(item.tasks ? item.tasks.join("\n") : "");
    setOutcomesStr(item.outcomes ? item.outcomes.join("\n") : "");
    setIndicatorsStr(item.indicators ? item.indicators.join("\n") : "");
    setMethodsStr(item.methods ? item.methods.join("\n") : "");
    setExpectedStr(item.expected ? item.expected.join("\n") : "");
    setDocUrls(item.document_urls?.length ? item.document_urls : [""]);
    setDocNames(item.document_names?.length ? item.document_names : [""]);
    setDocTypes(item.document_types?.length ? item.document_types : [""]);
    setFile(null);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveGeneralOrPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      if (file) {
        const formData = new FormData();
        formData.append("pdfFile", file);
        formData.append("documentType", indicatorCode === "pdf_agreement" ? "agreement" : "report");
        const pdfRes = await uploadPaPdf(formData);
        if (pdfRes.success && pdfRes.pdfUrl) {
          const fieldKey = indicatorCode === "pdf_agreement" ? "agreementPdfUrl" : "reportPdfUrl";
          generalSettings[fieldKey as keyof typeof generalSettings] = pdfRes.pdfUrl;
        }
      }

      const res = await savePaSettings({ general: generalSettings });
      if (res.success) {
        setMessage({ type: "success", text: "บันทึกข้อมูลเรียบร้อยแล้ว" });
      } else {
        setMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการบันทึก" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาดในการบันทึก" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSavePaRecordItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const formData = new FormData();
      if (editingId) formData.append("id", editingId);
      formData.append("category", category);
      formData.append("indicator_code", indicatorCode);
      formData.append("title", title || currentIndicator?.title || "หลักฐาน PA");
      formData.append("description", description);
      formData.append("status", "published");

      const validUrls = docUrls.filter((u) => u.trim());
      const validNames = docNames.slice(0, validUrls.length);
      const validTypes = docTypes.slice(0, validUrls.length);

      formData.append("document_urls", JSON.stringify(validUrls));
      formData.append("document_names", JSON.stringify(validNames));
      formData.append("document_types", JSON.stringify(validTypes));

      if (file) {
        formData.append("file", file);
      }

      const res = await savePaRecord(formData);
      if (res.success && res.record) {
        setItems((current) => {
          const next = current.filter((item) => item.id !== res.record.id);
          return [res.record, ...next];
        });
        setMessage({
          type: "success",
          text: editingId ? "บันทึกการแก้ไขหลักฐานเรียบร้อยแล้ว" : "เพิ่มเอกสารหลักฐาน PA เรียบร้อยแล้ว"
        });
        resetForm();
      } else {
        setMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการบันทึก" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาดในการบันทึก" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: any) => {
    if (!confirm(`ยืนยันการลบ “${item.title}” ใช่หรือไม่?`)) return;
    try {
      const res = await deletePaRecord(item.id);
      if (res.success) {
        setItems((current) => current.filter((existing) => existing.id !== item.id));
        setMessage({ type: "success", text: "ลบเอกสารหลักฐานเรียบร้อยแล้ว" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    }
  };

  // Filter items matching selected category & indicator
  const filteredItems = items.filter(
    (item) => item.category === category && item.indicator_code === indicatorCode
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircle className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <section className="admin-content-grid">
      
      {/* LEFT FORM: DYNAMICFORM FIELDS PER INDICATOR */}
      <div className="news-editor space-y-5">
        <div className="admin-section-heading">
          <div>
            <span>PERFORMANCE AGREEMENT (PA)</span>
            <h2>{editingId ? "แก้ไขข้อมูล PA" : "จัดการข้อมูล PA ตามตัวชี้วัด"}</h2>
          </div>
          <ShieldCheck size={28} className="text-amber-400" />
        </div>

        {/* Dropdown Selectors */}
        <div className="news-editor__grid">
          <label className="news-field">
            <span>ระดับ / ด้านการประเมิน PA</span>
            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)}>
              {paLevels.map((lvl) => (
                <option value={lvl.id} key={lvl.id}>{lvl.label}</option>
              ))}
            </select>
          </label>

          <label className="news-field">
            <span>ตัวชี้วัด / หมวดหมู่</span>
            <select value={indicatorCode} onChange={(e) => handleIndicatorChange(e.target.value)}>
              {indicators.map((ind) => (
                <option value={ind.code} key={ind.code}>
                  [{ind.code}] {ind.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Highlight Selected Indicator */}
        <div className="quality-selected-indicator p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
          <span className="text-xs font-bold text-amber-400">
            [{indicatorCode}] {selectedLevel.shortLabel}
          </span>
          <p className="text-sm font-semibold text-white mt-1">{currentIndicator?.title}</p>
        </div>

        {/* DYNAMIC FORM VIEW BASED ON INDICATOR CODE */}
        
        {/* CASE 1: ข้อมูลทั่วไป & ภาระงาน ก.ค.ศ. */}
        {indicatorCode === "general_info" && (
          <form onSubmit={handleSaveGeneralOrPdf} className="space-y-4">
            <div className="news-editor__grid">
              <label className="news-field">
                <span>ชื่อ-นามสกุล ผู้จัดทำ</span>
                <input
                  value={generalSettings.name}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </label>
              <label className="news-field">
                <span>ตำแหน่ง / วิทยฐานะ</span>
                <input
                  value={generalSettings.position}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, position: e.target.value }))}
                  required
                />
              </label>
              <label className="news-field">
                <span>สถานศึกษา</span>
                <input
                  value={generalSettings.school}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, school: e.target.value }))}
                  required
                />
              </label>
              <label className="news-field">
                <span>สังกัดหน่วยงาน</span>
                <input
                  value={generalSettings.affiliation}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, affiliation: e.target.value }))}
                  required
                />
              </label>
              <label className="news-field">
                <span>รอบข้อตกลง PA</span>
                <input
                  value={generalSettings.agreementPeriod}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, agreementPeriod: e.target.value }))}
                  required
                />
              </label>
              <label className="news-field">
                <span>ภาระงานรวม (ชั่วโมง/สัปดาห์)</span>
                <input
                  value={generalSettings.workloadHours}
                  onChange={(e) => setGeneralSettings((p) => ({ ...p, workloadHours: e.target.value }))}
                  required
                />
              </label>
            </div>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>บันทึกข้อมูลทั่วไป & ภาระงาน</span>
            </button>
          </form>
        )}

        {/* CASE 2: ไฟล์เอกสาร PDF */}
        {(indicatorCode === "pdf_agreement" || indicatorCode === "pdf_report") && (
          <form onSubmit={handleSaveGeneralOrPdf} className="space-y-4">
            <label className="news-field news-field--wide">
              <span>ลิงก์ไฟล์ PDF ({indicatorCode === "pdf_agreement" ? "ข้อตกลง PA" : "รายงานผล PA"})</span>
              <input
                value={indicatorCode === "pdf_agreement" ? generalSettings.agreementPdfUrl : generalSettings.reportPdfUrl}
                onChange={(e) => {
                  const val = e.target.value;
                  setGeneralSettings((p) => ({
                    ...p,
                    [indicatorCode === "pdf_agreement" ? "agreementPdfUrl" : "reportPdfUrl"]: val
                  }));
                }}
                required
              />
            </label>

            <label className="quality-file-uploader">
              <span><FileText size={27} /></span>
              <div>
                <strong>{file ? file.name : `อัปโหลดไฟล์ PDF ${indicatorCode === "pdf_agreement" ? "ข้อตกลง PA" : "รายงานผล PA"} ใหม่`}</strong>
                <small>รองรับไฟล์ PDF ไม่เกิน 100 MB</small>
              </div>
              <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>บันทึกไฟล์ PDF</span>
            </button>
          </form>
        )}

        {/* CASE 3: คำนำ SAR */}
        {indicatorCode === "preface" && (
          <form onSubmit={handleSaveGeneralOrPdf} className="space-y-4">
            <label className="news-field news-field--wide">
              <span>บทความคำนำรายงานการประเมินตนเอง (SAR)</span>
              <textarea
                rows={8}
                value={generalSettings.preface}
                onChange={(e) => setGeneralSettings((p) => ({ ...p, preface: e.target.value }))}
                required
              />
            </label>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>บันทึกคำนำ SAR</span>
            </button>
          </form>
        )}

        {/* CASE 4: ภาพหลักฐานร่องรอย (Google Photos) */}
        {indicatorCode === "evidence_gallery" && (
          <form onSubmit={handleSaveGeneralOrPdf} className="space-y-4">
            <label className="news-field news-field--wide">
              <span>อัลบั้ม Google Photos ภาพหลักฐานร่องรอยการพัฒนางาน</span>
              <input
                type="url"
                value={generalSettings.evidenceAlbumUrl}
                onChange={(e) => setGeneralSettings((p) => ({ ...p, evidenceAlbumUrl: e.target.value }))}
                placeholder="https://photos.app.goo.gl/..."
              />
            </label>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>บันทึกอัลบั้มภาพหลักฐาน</span>
            </button>
          </form>
        )}

        {/* CASE 5: ข้อตกลง / สรุปผลประเด็นท้าทาย */}
        {(indicatorCode === "challenge" || indicatorCode === "comp2") && (
          <form onSubmit={handleSavePaRecordItem} className="space-y-4">
            <label className="news-field news-field--wide">
              <span>ชื่อเรื่อง / หัวข้อประเด็นท้าทาย</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="เช่น การพัฒนาทักษะการเรียนรู้..."
                required
              />
            </label>

            <label className="news-field news-field--wide">
              <span>สภาพปัญหาการจัดการเรียนรู้และคุณภาพผู้เรียน</span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="รายละเอียดสภาพปัญหา..."
                required
              />
            </label>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>{editingId ? "บันทึกการแก้ไขประเด็นท้าทาย" : "เพิ่มประเด็นท้าทาย"}</span>
            </button>
          </form>
        )}

        {/* CASE 6: STANDARD PA INDICATORS (1.1 - 3.3, comp1, profile_history) */}
        {!["general_info", "pdf_agreement", "pdf_report", "preface", "evidence_gallery", "challenge", "comp2"].includes(indicatorCode) && (
          <form onSubmit={handleSavePaRecordItem} className="space-y-4">
            <label className="news-field news-field--wide">
              <span>ชื่อเอกสารหลักฐาน / สรุปผลการปฏิบัติงาน</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`เช่น รายงานผลการประเมินตัวชี้วัด ${indicatorCode}`}
                required
              />
            </label>

            <label className="news-field news-field--wide">
              <span>คำอธิบายรายละเอียด</span>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="รายละเอียดสั้น ๆ ของหลักฐานนี้"
              />
            </label>

            {/* Multiple Links Input */}
            <div className="news-field news-field--wide quality-link-fields">
              <div className="quality-link-fields__heading">
                <span>ลิงก์เอกสารบน Google Drive / Google Photos / เว็บไซต์ภายนอก</span>
                <button
                  type="button"
                  onClick={() => {
                    setDocUrls((p) => [...p, ""]);
                    setDocNames((p) => [...p, ""]);
                    setDocTypes((p) => [...p, ""]);
                  }}
                  className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1"
                >
                  <Plus size={16} /> เพิ่มลิงก์
                </button>
              </div>

              {docUrls.map((url, index) => (
                <div className="quality-link-fields__row" key={index}>
                  <div className="quality-link-fields__inputs">
                    <input
                      type="text"
                      value={docNames[index] || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDocNames((p) => p.map((v, i) => (i === index ? val : v)));
                      }}
                      placeholder={`ชื่อหลักฐานที่ ${index + 1}`}
                    />
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDocUrls((p) => p.map((v, i) => (i === index ? val : v)));
                      }}
                      placeholder={`https://drive.google.com/... (หลักฐานที่ ${index + 1})`}
                    />
                  </div>
                  {docUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDocUrls((p) => p.filter((_, i) => i !== index));
                        setDocNames((p) => p.filter((_, i) => i !== index));
                        setDocTypes((p) => p.filter((_, i) => i !== index));
                      }}
                      className="text-rose-400"
                    >
                      <X size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* File Upload Box */}
            <label className={`quality-file-uploader ${file ? "is-selected" : ""}`}>
              <span><FileText size={27} /></span>
              <div>
                <strong>{file ? file.name : "อัปโหลดไฟล์หลักฐานประกอบ (PDF หรือ รูปภาพ)"}</strong>
                <small>ไฟล์ละไม่เกิน 100 MB</small>
              </div>
              <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>

            <button type="submit" disabled={submitting} className="admin-button admin-button--primary w-full py-3 rounded-xl bg-amber-500 text-black font-bold text-sm flex items-center justify-center gap-2 cursor-pointer">
              {submitting ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}
              <span>{editingId ? "บันทึกการแก้ไขหลักฐาน" : "เพิ่มเอกสารหลักฐาน PA"}</span>
            </button>
          </form>
        )}

        {/* Message Toast */}
        {message && (
          <p className={`admin-message admin-message--${message.type} mt-4 p-3 rounded-xl flex items-center gap-2 text-sm font-bold ${
            message.type === "success" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
          }`}>
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </p>
        )}
      </div>

      {/* RIGHT COLUMN: LIVE EVIDENCE DATABASE CARDS */}
      <div className="admin-list-card">
        <div className="admin-section-heading">
          <div>
            <span>PA DATABASE & EVIDENCE</span>
            <h2>รายการหลักฐานในตัวชี้วัด [{indicatorCode}] ({filteredItems.length})</h2>
          </div>
          <FileText size={27} className="text-amber-400" />
        </div>

        {!filteredItems.length ? (
          <div className="admin-empty p-10 text-center text-slate-400 space-y-2">
            <FileText size={34} className="mx-auto text-amber-500/50" />
            <strong className="block text-base text-white">ยังไม่มีหลักฐานบันทึกในตัวชี้วัดนี้</strong>
            <p className="text-xs">กรอกแบบฟอร์มทางด้านซ้ายเพื่อเพิ่มหลักฐานสำหรับ [{indicatorCode}]</p>
          </div>
        ) : (
          <div className="admin-record-list quality-record-list space-y-3">
            {filteredItems.map((item) => (
              <article key={item.id} className="p-4 rounded-xl bg-[#0d1321] border border-white/10 hover:border-amber-500/30 transition-all flex items-start gap-4">
                <div className="p-3 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                  <FileText size={22} />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[11px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30">
                    {selectedLevel.shortLabel} · ตัวชี้วัด {item.indicator_code}
                  </span>
                  <h3 className="text-sm font-bold text-white truncate mt-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                  )}

                  {item.document_urls?.length ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {item.document_urls.map((url: string, idx: number) => (
                        <a 
                          key={idx} 
                          href={url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1 text-[11px] text-blue-300 hover:text-blue-200 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20"
                        >
                          <Link2 size={12} />
                          <span>{item.document_names?.[idx] || `หลักฐานที่ ${idx + 1}`}</span>
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button 
                    type="button" 
                    onClick={() => handleEditRecord(item)} 
                    className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 transition-all cursor-pointer"
                    title="แก้ไข"
                  >
                    <Pencil size={15} />
                  </button>
                  <button 
                    type="button" 
                    className="p-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 transition-all cursor-pointer"
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
