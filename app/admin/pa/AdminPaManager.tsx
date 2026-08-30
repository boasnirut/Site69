"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BadgeCheck, 
  FileText, 
  Upload, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  LoaderCircle, 
  Trash2, 
  Target, 
  UserCheck, 
  Clock, 
  ExternalLink,
  Images,
  Pencil,
  Plus,
  BookOpenCheck,
  FileCheck2,
  Sparkles,
  Link2
} from "lucide-react";
import { fetchContent, savePaSettings, uploadPaPdf } from "@/app/admin/actions";
import { paReportGeneral, paChallenges as defaultChallenges } from "@/lib/pa-data";
import "../admin.css";

export function AdminPaManager({ initialSection = "general" }: { initialSection?: string }) {
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. General Profile & Workload Form
  const [generalForm, setGeneralForm] = useState({
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

  // PDF Upload state
  const [uploadingPdfType, setUploadingPdfType] = useState<"agreement" | "report" | null>(null);

  // 2. Challenges State
  const [challenges, setChallenges] = useState<any[]>(defaultChallenges);
  const [editingChallengeIndex, setEditingChallengeIndex] = useState<number | null>(null);
  const [challengeForm, setChallengeForm] = useState({
    title: "",
    subtitle: "",
    problem: "",
    methodsStr: "",
    expectedStr: "",
    albumUrl: ""
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const content = await fetchContent();
        if (content.paSettings) {
          if (content.paSettings.general) {
            setGeneralForm((prev) => ({ ...prev, ...content.paSettings.general }));
          }
          if (content.paSettings.challenges?.length) {
            setChallenges(content.paSettings.challenges);
          }
        }
      } catch (err) {
        console.error("Failed to load PA settings", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSaveAll = async (overrideData?: any) => {
    setSaving(true);
    setMessage(null);

    try {
      const dataToSave = overrideData || {
        general: generalForm,
        challenges: challenges
      };

      const res = await savePaSettings(dataToSave);
      if (res.success) {
        setMessage({ type: "success", text: "บันทึกข้อมูลการพัฒนางานตามข้อตกลง (PA) เรียบร้อยแล้ว" });
      } else {
        setMessage({ type: "error", text: res.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาดในการบันทึก" });
    } finally {
      setSaving(false);
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "agreement" | "report") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdfType(type);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdfFile", file);
      formData.append("documentType", type);

      const res = await uploadPaPdf(formData);
      if (res.success && res.pdfUrl) {
        const updatedForm = {
          ...generalForm,
          [type === "agreement" ? "agreementPdfUrl" : "reportPdfUrl"]: res.pdfUrl
        };
        setGeneralForm(updatedForm);
        await handleSaveAll({ general: updatedForm, challenges });
        setMessage({ 
          type: "success", 
          text: `อัปโหลดและบันทึกไฟล์ PDF ${type === "agreement" ? "ข้อตกลง PA" : "รายงานผล PA"} เรียบร้อยแล้ว` 
        });
      } else {
        setMessage({ type: "error", text: res.error || "อัปโหลดไฟล์ PDF ไม่สำเร็จ" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "เกิดข้อผิดพลาดในการอัปโหลด PDF" });
    } finally {
      setUploadingPdfType(null);
    }
  };

  const handleEditChallenge = (index: number) => {
    const item = challenges[index];
    if (!item) return;
    setEditingChallengeIndex(index);
    setChallengeForm({
      title: item.title || "",
      subtitle: item.subtitle || "",
      problem: item.problem || "",
      methodsStr: item.methods ? item.methods.join("\n") : "",
      expectedStr: item.expected ? item.expected.join("\n") : "",
      albumUrl: item.albumUrl || ""
    });
  };

  const handleSaveChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    const methodsArray = challengeForm.methodsStr.split("\n").map(s => s.trim()).filter(Boolean);
    const expectedArray = challengeForm.expectedStr.split("\n").map(s => s.trim()).filter(Boolean);

    const newChallengeObj = {
      title: challengeForm.title,
      subtitle: challengeForm.subtitle,
      problem: challengeForm.problem,
      methods: methodsArray,
      expected: expectedArray,
      albumUrl: challengeForm.albumUrl
    };

    let updatedChallenges = [...challenges];
    if (editingChallengeIndex !== null) {
      updatedChallenges[editingChallengeIndex] = newChallengeObj;
    } else {
      updatedChallenges.push(newChallengeObj);
    }

    setChallenges(updatedChallenges);
    setEditingChallengeIndex(null);
    setChallengeForm({ title: "", subtitle: "", problem: "", methodsStr: "", expectedStr: "", albumUrl: "" });
    await handleSaveAll({ general: generalForm, challenges: updatedChallenges });
  };

  const handleDeleteChallenge = async (index: number) => {
    if (!confirm("คุณต้องการลบประเด็นท้าทายนี้ใช่หรือไม่?")) return;
    const updatedChallenges = challenges.filter((_, i) => i !== index);
    setChallenges(updatedChallenges);
    await handleSaveAll({ general: generalForm, challenges: updatedChallenges });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoaderCircle className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="admin-page space-y-6">
      
      {/* Top Header Card with Dropdown Section Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111827] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20">
            <BadgeCheck className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-wide">
              ระบบบริหารจัดการ การพัฒนางานตามข้อตกลง (PA)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              เลือกส่วนที่ต้องการแก้ไขจากดร็อปดาวน์ลิสต์ด้านขวาเพื่อจัดการชุดข้อมูล
            </p>
          </div>
        </div>

        {/* Dropdown Selector */}
        <div className="flex items-center gap-2 self-start lg:self-auto bg-black/40 p-2 rounded-xl border border-white/10">
          <label className="text-xs font-bold text-amber-300 whitespace-nowrap pl-2">
            เลือกส่วนที่จะแก้ไข:
          </label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-4 py-2.5 rounded-lg bg-[#0d1321] border border-amber-500/40 text-amber-300 font-bold text-xs shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
          >
            <option value="general">📋 1. ข้อมูลทั่วไป & ภาระงาน ก.ค.ศ. (PA 1/ส)</option>
            <option value="pdf">📄 2. ไฟล์เอกสาร PDF (ข้อตกลง PA & รายงานผล PA)</option>
            <option value="challenges">🎯 3. ข้อตกลงประเด็นท้าทาย (Challenge Issues)</option>
            <option value="preface">📖 4. คำนำรายงานการพัฒนางาน (Preface / SAR)</option>
            <option value="evidence">🖼️ 5. ภาพหลักฐานและร่องรอยการพัฒนางาน (PA Evidence)</option>
          </select>
        </div>
      </div>

      {/* Notification Toast */}
      {message && (
        <div className={`p-4 rounded-xl text-sm font-semibold flex items-center gap-3 shadow-lg ${
          message.type === "success" 
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" 
            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
        }`}>
          {message.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* 2-COLUMN LAYOUT MATCHING ACHIEVEMENTS/ACTIVITIES THEME */}
      
      {/* SECTION 1: 📋 ข้อมูลทั่วไป & ภาระงาน ก.ค.ศ. */}
      {selectedSection === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Editor Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }} 
            className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl self-start"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <UserCheck className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">แก้ไขข้อมูลทั่วไป & ภาระงาน ก.ค.ศ.</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ชื่อ-นามสกุล ผู้จัดทำ</label>
              <input 
                type="text"
                value={generalForm.name}
                onChange={(e) => setGeneralForm((p) => ({ ...p, name: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ตำแหน่ง / วิทยฐานะ</label>
              <input 
                type="text"
                value={generalForm.position}
                onChange={(e) => setGeneralForm((p) => ({ ...p, position: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">สถานศึกษา</label>
              <input 
                type="text"
                value={generalForm.school}
                onChange={(e) => setGeneralForm((p) => ({ ...p, school: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">สังกัดหน่วยงาน</label>
              <input 
                type="text"
                value={generalForm.affiliation}
                onChange={(e) => setGeneralForm((p) => ({ ...p, affiliation: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">รอบข้อตกลง PA</label>
              <input 
                type="text"
                value={generalForm.agreementPeriod}
                onChange={(e) => setGeneralForm((p) => ({ ...p, agreementPeriod: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ภาระงานรวม (ชั่วโมง/สัปดาห์)</label>
              <input 
                type="text"
                value={generalForm.workloadHours}
                onChange={(e) => setGeneralForm((p) => ({ ...p, workloadHours: e.target.value }))}
                className="news-editor__input"
                required
              />
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="news-editor__btn news-editor__btn--submit flex items-center gap-2 cursor-pointer"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>บันทึกข้อมูลส่วนที่ 1</span>
              </button>
            </div>
          </form>

          {/* Right 2 Columns: Live Preview List Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111827] p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                <span>ตัวอย่างการแสดงผลข้อมูลส่วนตัวและภาระงาน PA</span>
              </h3>
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold">
                สดจากฐานข้อมูล
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
                <span className="text-xs font-medium text-slate-400">ผู้จัดทำข้อตกลง</span>
                <strong className="block text-base font-bold text-white">{generalForm.name}</strong>
                <span className="text-xs text-amber-300">{generalForm.position}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
                <span className="text-xs font-medium text-slate-400">สถานศึกษา & สังกัด</span>
                <strong className="block text-base font-bold text-white">{generalForm.school}</strong>
                <span className="text-xs text-slate-300">{generalForm.affiliation}</span>
              </div>

              <div className="p-5 rounded-2xl bg-[#111827] border border-white/10 space-y-2">
                <span className="text-xs font-medium text-slate-400">รอบข้อตกลง PA</span>
                <strong className="block text-base font-bold text-white">{generalForm.agreementPeriod}</strong>
              </div>

              <div className="p-5 rounded-2xl bg-[#111827] border border-amber-500/30 bg-amber-500/5 space-y-2">
                <span className="text-xs font-medium text-amber-300">ภาระงานรวม ก.ค.ศ.</span>
                <strong className="block text-2xl font-extrabold text-amber-400">{generalForm.workloadHours} ชม./สัปดาห์</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: 📄 ไฟล์เอกสาร PDF */}
      {selectedSection === "pdf" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: PDF Manager Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}
            className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-5 shadow-xl self-start"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">จัดการไฟล์เอกสาร PDF</h2>
            </div>

            {/* 1. Agreement PDF */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">1. ไฟล์ข้อตกลง PA (PDF)</span>
                <a href={generalForm.agreementPdfUrl} target="_blank" rel="noreferrer" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> เปิดดู
                </a>
              </div>
              <input 
                type="text"
                value={generalForm.agreementPdfUrl}
                onChange={(e) => setGeneralForm((p) => ({ ...p, agreementPdfUrl: e.target.value }))}
                className="news-editor__input text-xs"
                placeholder="/pa-agreement-2569-placeholder.pdf"
              />
              <label className="block cursor-pointer">
                <div className="px-3 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs text-center text-amber-300 font-bold flex items-center justify-center gap-2 transition-all">
                  {uploadingPdfType === "agreement" ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>อัปโหลดไฟล์ PDF ข้อตกลง PA ใหม่</span>
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => handlePdfUpload(e, "agreement")} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* 2. Report PDF */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">2. ไฟล์รายงานผล PA (PDF)</span>
                <a href={generalForm.reportPdfUrl} target="_blank" rel="noreferrer" className="text-xs text-amber-400 hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" /> เปิดดู
                </a>
              </div>
              <input 
                type="text"
                value={generalForm.reportPdfUrl}
                onChange={(e) => setGeneralForm((p) => ({ ...p, reportPdfUrl: e.target.value }))}
                className="news-editor__input text-xs"
                placeholder="/pa-report-2569-placeholder.pdf"
              />
              <label className="block cursor-pointer">
                <div className="px-3 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-xs text-center text-amber-300 font-bold flex items-center justify-center gap-2 transition-all">
                  {uploadingPdfType === "report" ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  <span>อัปโหลดไฟล์ PDF รายงานผล PA ใหม่</span>
                </div>
                <input 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => handlePdfUpload(e, "report")} 
                  className="hidden" 
                />
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full news-editor__btn news-editor__btn--submit flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>บันทึกเส้นทางไฟล์ PDF</span>
              </button>
            </div>
          </form>

          {/* Right 2 Columns: Live PDF Previews */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#111827] p-5 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>ตัวอย่างไฟล์ PDF ข้อตกลง PA (แบบ PA 1/ส)</span>
              </h3>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-white/10 bg-black/50">
                <iframe src={`${generalForm.agreementPdfUrl}#toolbar=0`} className="w-full h-full border-0" title="PDF Preview 1" />
              </div>
            </div>

            <div className="bg-[#111827] p-5 rounded-2xl border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>ตัวอย่างไฟล์ PDF รายงานผล PA (SAR)</span>
              </h3>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border border-white/10 bg-black/50">
                <iframe src={`${generalForm.reportPdfUrl}#toolbar=0`} className="w-full h-full border-0" title="PDF Preview 2" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: 🎯 ข้อตกลงประเด็นท้าทาย */}
      {selectedSection === "challenges" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Challenge Form */}
          <form onSubmit={handleSaveChallenge} className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl self-start">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">
                  {editingChallengeIndex !== null ? "แก้ไขประเด็นท้าทาย" : "เพิ่มประเด็นท้าทายใหม่"}
                </h2>
              </div>
              {editingChallengeIndex !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingChallengeIndex(null);
                    setChallengeForm({ title: "", subtitle: "", problem: "", methodsStr: "", expectedStr: "", albumUrl: "" });
                  }}
                  className="text-xs text-rose-400 hover:underline"
                >
                  ยกเลิก
                </button>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ชื่อประเด็นท้าทาย</label>
              <input 
                type="text"
                value={challengeForm.title}
                onChange={(e) => setChallengeForm((p) => ({ ...p, title: e.target.value }))}
                className="news-editor__input"
                placeholder="ประเด็นท้าทายที่ 1..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ชื่อเรื่อง / หัวข้อประเด็นท้าทาย</label>
              <input 
                type="text"
                value={challengeForm.subtitle}
                onChange={(e) => setChallengeForm((p) => ({ ...p, subtitle: e.target.value }))}
                className="news-editor__input"
                placeholder="การพัฒนาทักษะ..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">สภาพปัญหาการจัดการเรียนรู้</label>
              <textarea 
                rows={3}
                value={challengeForm.problem}
                onChange={(e) => setChallengeForm((p) => ({ ...p, problem: e.target.value }))}
                className="news-editor__textarea"
                placeholder="อธิบายสภาพปัญหา..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">วิธีการดำเนินการ (บรรทัดละ 1 ข้อ)</label>
              <textarea 
                rows={3}
                value={challengeForm.methodsStr}
                onChange={(e) => setChallengeForm((p) => ({ ...p, methodsStr: e.target.value }))}
                className="news-editor__textarea"
                placeholder="1. วิเคราะห์หลักสูตร..."
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">ผลลัพธ์ที่คาดหวัง (บรรทัดละ 1 ข้อ)</label>
              <textarea 
                rows={3}
                value={challengeForm.expectedStr}
                onChange={(e) => setChallengeForm((p) => ({ ...p, expectedStr: e.target.value }))}
                className="news-editor__textarea"
                placeholder="นักเรียนร้อยละ 80 ผ่านเกณฑ์..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full news-editor__btn news-editor__btn--submit flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{editingChallengeIndex !== null ? "บันทึกการแก้ไข" : "เพิ่มประเด็นท้าทาย"}</span>
              </button>
            </div>
          </form>

          {/* Right 2 Columns: Challenge Items List Cards */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between bg-[#111827] p-4 rounded-xl border border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>รายการประเด็นท้าทายทั้งหมด ({challenges.length})</span>
              </h3>
            </div>

            <div className="space-y-4">
              {challenges.map((item, idx) => (
                <div key={idx} className="bg-[#111827] p-5 rounded-2xl border border-white/10 space-y-3 shadow-lg">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30">
                        {item.title}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{item.subtitle}</h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditChallenge(idx)}
                        className="p-2 rounded-lg bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 transition-all cursor-pointer"
                        title="แก้ไข"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteChallenge(idx)}
                        className="p-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/30 text-rose-300 transition-all cursor-pointer"
                        title="ลบ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    <strong>สภาพปัญหา:</strong> {item.problem}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: 📖 คำนำรายงานการพัฒนางาน */}
      {selectedSection === "preface" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Preface Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}
            className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl self-start"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <BookOpenCheck className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">แก้ไขคำนำในรายงานผล PA (SAR)</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">บทความคำนำ</label>
              <textarea 
                rows={8}
                value={generalForm.preface}
                onChange={(e) => setGeneralForm((p) => ({ ...p, preface: e.target.value }))}
                className="news-editor__textarea"
                placeholder="กรอกข้อความคำนำ..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full news-editor__btn news-editor__btn--submit flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>บันทึกคำนำ SAR</span>
              </button>
            </div>
          </form>

          {/* Right 2 Columns: Live Preface Preview */}
          <div className="lg:col-span-2 bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4" />
              <span>ตัวอย่างการแสดงผลคำนำในหน้ารายงาน PA</span>
            </h3>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-sm text-slate-200 leading-relaxed">
              {generalForm.preface || "ยังไม่มีบทความคำนำ..."}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: 🖼️ ภาพหลักฐานและร่องรอยการพัฒนางาน */}
      {selectedSection === "evidence" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Evidence Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSaveAll(); }}
            className="bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl self-start"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Images className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">จัดการภาพหลักฐานร่องรอย PA</h2>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">อัลบั้ม Google Photos (ดึงรูปภาพร่องรอยอัตโนมัติ)</label>
              <input 
                type="url"
                value={generalForm.evidenceAlbumUrl}
                onChange={(e) => setGeneralForm((p) => ({ ...p, evidenceAlbumUrl: e.target.value }))}
                className="news-editor__input"
                placeholder="https://photos.app.goo.gl/..."
              />
              <p className="text-[11px] text-slate-400 mt-1">
                ระบบจะทำการดึงรูปภาพจากอัลบั้ม Google Photos ไปสร้างแกลเลอรีหลักฐานร่องรอยในหน้ารายงาน PA โดยอัตโนมัติ
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full news-editor__btn news-editor__btn--submit flex items-center justify-center gap-2 cursor-pointer"
              >
                {saving ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>บันทึกอัลบั้มรูปภาพหลักฐาน</span>
              </button>
            </div>
          </form>

          {/* Right 2 Columns: Evidence Preview Card */}
          <div className="lg:col-span-2 bg-[#111827] p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Images className="w-4 h-4" />
              <span>สถานะอัลบั้มรูปภาพหลักฐานร่องรอย PA</span>
            </h3>

            {generalForm.evidenceAlbumUrl ? (
              <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/30 space-y-3">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> ลิงก์อัลบั้มพร้อมใช้งาน
                </span>
                <p className="text-xs text-slate-300 break-all bg-white/5 p-3 rounded-xl border border-white/10 font-mono">
                  {generalForm.evidenceAlbumUrl}
                </p>
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-black/20 border border-dashed border-white/20 text-center text-slate-400 text-xs">
                ยังไม่ได้ระบุลิงก์อัลบั้ม Google Photos สำหรับสแครปรูปภาพหลักฐาน
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
