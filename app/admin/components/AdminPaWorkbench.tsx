"use client";

import { ChangeEvent, useMemo, useState, useTransition } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  GraduationCap,
  ImagePlus,
  Plus,
  Save,
  Target,
  Trash2,
  Upload,
  UserCheck,
  XCircle
} from "lucide-react";
import type {
  PaChallengeItem,
  PaEducationItem,
  PaEvidenceItem,
  PaEvidenceType,
  PaSettings,
  PaStandardDomain,
  PaStandardItem,
  PaWorkloadGroup,
  PaWorkloadRow
} from "../actions";
import { savePaSettings, uploadAdminAsset } from "../actions";

type PaTab = "general" | "workload" | "standards" | "challenges" | "document";

const tabs: { id: PaTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "general", label: "ข้อมูลทั่วไป", icon: UserCheck },
  { id: "workload", label: "ภาระงาน", icon: Clock },
  { id: "standards", label: "องค์ประกอบที่ 1", icon: BookOpenCheck },
  { id: "challenges", label: "องค์ประกอบที่ 2", icon: Target },
  { id: "document", label: "เอกสาร PDF", icon: FileText }
];

const assessmentLevels = [
  { value: "1", label: "ระดับ 1 ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวังมาก", tone: "red" },
  { value: "2", label: "ระดับ 2 ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวัง", tone: "yellow" },
  { value: "3", label: "ระดับ 3 ปฏิบัติได้ตามระดับฯที่คาดหวัง", tone: "blue" },
  { value: "4", label: "ระดับ 4 ปฏิบัติได้สูงกว่าระดับฯที่คาดหวัง", tone: "green" }
];

const linesToText = (items?: string[]) => (items || []).join("\n");
const textToLines = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

const evidenceTypes: PaEvidenceType[] = ["image", "pdf", "link"];

type PaEvidenceDraft = {
  type: PaEvidenceType;
  title: string;
  url: string;
};

type EvidenceCopySource = {
  key: string;
  label: string;
  items: PaEvidenceItem[];
};

const inferEvidenceType = (url: string, type?: PaEvidenceType): PaEvidenceType => {
  if (type && evidenceTypes.includes(type)) return type;
  const lowerUrl = url.toLowerCase();
  if (lowerUrl.endsWith(".pdf") || lowerUrl.includes("drive.google.com/file/d/")) return "pdf";
  if (/\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i.test(url)) return "image";
  return "link";
};

const getEvidenceFileTitle = (fileName: string) => fileName.replace(/\.[^.]+$/, "").trim() || "หลักฐานอ้างอิง";

const normalizeEvidenceDraft = (item: PaEvidenceItem): PaEvidenceDraft => {
  if (typeof item === "string") {
    const url = item.trim();
    return {
      type: inferEvidenceType(url),
      title: "",
      url
    };
  }

  const url = (item.url || "").trim();
  return {
    type: inferEvidenceType(url, item.type),
    title: (item.title || "").trim(),
    url
  };
};

const normalizeEvidenceDrafts = (items?: PaEvidenceItem[]) =>
  (items || [])
    .map(normalizeEvidenceDraft)
    .filter((item) => item.url);

const countEvidenceByType = (items?: PaEvidenceItem[]) => {
  const normalizedItems = normalizeEvidenceDrafts(items);
  return {
    total: normalizedItems.length,
    image: normalizedItems.filter((item) => item.type === "image").length,
    pdf: normalizedItems.filter((item) => item.type === "pdf").length,
    link: normalizedItems.filter((item) => item.type === "link").length
  };
};

const blankEducation = (): PaEducationItem => ({
  level: "",
  credential: "",
  school: "",
  province: "",
  logo: ""
});

const blankWorkloadRow = (): PaWorkloadRow => ({ activity: "", hours: "" });

const blankWorkloadGroup = (): PaWorkloadGroup => ({
  title: "กลุ่มภาระงานใหม่",
  hours: "0",
  rows: [blankWorkloadRow()]
});

const blankStandardItem = (): PaStandardItem => ({
  title: "หัวข้อย่อยใหม่",
  tasks: [],
  outcomes: [],
  selfAssessmentLevel: "3",
  indicators: [],
  images: []
});

const blankDomain = (): PaStandardDomain => ({
  domain: "ด้านใหม่",
  description: "",
  items: [blankStandardItem()]
});

const blankChallenge = (): PaChallengeItem => ({
  title: "ประเด็นท้าทายใหม่",
  subtitle: "",
  problem: "",
  methods: [],
  expected: [],
  selfAssessmentLevel: "3",
  images: []
});

export function AdminPaWorkbench({ initialSettings }: { initialSettings: PaSettings }) {
  const [settings, setSettings] = useState<PaSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<PaTab>("general");
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [selectedChallengeIndex, setSelectedChallengeIndex] = useState(0);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(() => {
    const standardItems = settings.reportStandards.reduce((total, domain) => total + domain.items.length, 0);
    const evidenceFiles =
      settings.reportStandards.reduce((total, domain) => total + domain.items.reduce((sum, item) => sum + (item.images?.length || 0), 0), 0) +
      settings.challenges.reduce((total, challenge) => total + (challenge.images?.length || 0), 0);

    return {
      workload: settings.workloadGroups.length,
      standards: standardItems,
      challenges: settings.challenges.length,
      evidence: evidenceFiles
    };
  }, [settings]);

  const evidenceCopySources = useMemo<EvidenceCopySource[]>(() => {
    const standardSources = settings.reportStandards.flatMap((domain, domainIndex) =>
      domain.items.map((item, itemIndex) => ({
        key: `standard-${domainIndex}-${itemIndex}`,
        label: `${domain.domain || `ด้านที่ ${domainIndex + 1}`} / ${item.title || `หัวข้อย่อยที่ ${itemIndex + 1}`}`,
        items: item.images || []
      }))
    );

    const challengeSources = settings.challenges.map((challenge, index) => ({
      key: `challenge-${index}`,
      label: `องค์ประกอบที่ 2 / ${challenge.title || `ประเด็นที่ ${index + 1}`}`,
      items: challenge.images || []
    }));

    return [...standardSources, ...challengeSources].filter((source) => countEvidenceByType(source.items).total > 0);
  }, [settings]);

  const selectedDomain = settings.reportStandards[selectedDomainIndex] || settings.reportStandards[0];
  const selectedItem = selectedDomain?.items[selectedItemIndex] || selectedDomain?.items[0];
  const selectedChallenge = settings.challenges[selectedChallengeIndex] || settings.challenges[0];

  const updateGeneral = (field: keyof PaSettings["general"], value: string) => {
    setSettings((current) => ({
      ...current,
      general: { ...current.general, [field]: value }
    }));
  };

  const updateEducation = (index: number, field: keyof PaEducationItem, value: string) => {
    setSettings((current) => ({
      ...current,
      reportGeneral: {
        ...current.reportGeneral,
        education: current.reportGeneral.education.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item))
      }
    }));
  };

  const addEducation = () => {
    setSettings((current) => ({
      ...current,
      reportGeneral: {
        ...current.reportGeneral,
        education: [...current.reportGeneral.education, blankEducation()]
      }
    }));
  };

  const removeEducation = (index: number) => {
    setSettings((current) => ({
      ...current,
      reportGeneral: {
        ...current.reportGeneral,
        education: current.reportGeneral.education.filter((_, itemIndex) => itemIndex !== index)
      }
    }));
  };

  const updateLeave = (value: string) => {
    setSettings((current) => ({
      ...current,
      reportGeneral: { ...current.reportGeneral, leave: textToLines(value) }
    }));
  };

  const updateWorkloadGroup = (index: number, field: keyof Omit<PaWorkloadGroup, "rows">, value: string) => {
    setSettings((current) => ({
      ...current,
      workloadGroups: current.workloadGroups.map((group, groupIndex) => (groupIndex === index ? { ...group, [field]: value } : group))
    }));
  };

  const updateWorkloadRow = (groupIndex: number, rowIndex: number, field: keyof PaWorkloadRow, value: string) => {
    setSettings((current) => ({
      ...current,
      workloadGroups: current.workloadGroups.map((group, currentGroupIndex) =>
        currentGroupIndex === groupIndex
          ? {
              ...group,
              rows: group.rows.map((row, currentRowIndex) => (currentRowIndex === rowIndex ? { ...row, [field]: value } : row))
            }
          : group
      )
    }));
  };

  const addWorkloadGroup = () => {
    setSettings((current) => ({ ...current, workloadGroups: [...current.workloadGroups, blankWorkloadGroup()] }));
  };

  const removeWorkloadGroup = (index: number) => {
    setSettings((current) => ({ ...current, workloadGroups: current.workloadGroups.filter((_, groupIndex) => groupIndex !== index) }));
  };

  const addWorkloadRow = (groupIndex: number) => {
    setSettings((current) => ({
      ...current,
      workloadGroups: current.workloadGroups.map((group, currentGroupIndex) =>
        currentGroupIndex === groupIndex ? { ...group, rows: [...group.rows, blankWorkloadRow()] } : group
      )
    }));
  };

  const removeWorkloadRow = (groupIndex: number, rowIndex: number) => {
    setSettings((current) => ({
      ...current,
      workloadGroups: current.workloadGroups.map((group, currentGroupIndex) =>
        currentGroupIndex === groupIndex ? { ...group, rows: group.rows.filter((_, currentRowIndex) => currentRowIndex !== rowIndex) } : group
      )
    }));
  };

  const updateDomain = (field: keyof Omit<PaStandardDomain, "items">, value: string) => {
    setSettings((current) => ({
      ...current,
      reportStandards: current.reportStandards.map((domain, index) => (index === selectedDomainIndex ? { ...domain, [field]: value } : domain))
    }));
  };

  const updateStandardItem = (field: keyof PaStandardItem, value: string | string[] | PaEvidenceItem[]) => {
    setSettings((current) => ({
      ...current,
      reportStandards: current.reportStandards.map((domain, domainIndex) =>
        domainIndex === selectedDomainIndex
          ? {
              ...domain,
              items: domain.items.map((item, itemIndex) => (itemIndex === selectedItemIndex ? { ...item, [field]: value } : item))
            }
          : domain
      )
    }));
  };

  const addDomain = () => {
    setSettings((current) => ({ ...current, reportStandards: [...current.reportStandards, blankDomain()] }));
    setSelectedDomainIndex(settings.reportStandards.length);
    setSelectedItemIndex(0);
  };

  const addStandardItem = () => {
    setSettings((current) => ({
      ...current,
      reportStandards: current.reportStandards.map((domain, index) =>
        index === selectedDomainIndex ? { ...domain, items: [...domain.items, blankStandardItem()] } : domain
      )
    }));
    setSelectedItemIndex(selectedDomain?.items.length || 0);
  };

  const removeStandardItem = () => {
    if (!selectedDomain || selectedDomain.items.length <= 1) return;

    setSettings((current) => ({
      ...current,
      reportStandards: current.reportStandards.map((domain, domainIndex) =>
        domainIndex === selectedDomainIndex ? { ...domain, items: domain.items.filter((_, itemIndex) => itemIndex !== selectedItemIndex) } : domain
      )
    }));
    setSelectedItemIndex(0);
  };

  const updateChallenge = (field: keyof PaChallengeItem, value: string | string[] | PaEvidenceItem[]) => {
    setSettings((current) => ({
      ...current,
      challenges: current.challenges.map((challenge, index) => (index === selectedChallengeIndex ? { ...challenge, [field]: value } : challenge))
    }));
  };

  const addChallenge = () => {
    setSettings((current) => ({ ...current, challenges: [...current.challenges, blankChallenge()] }));
    setSelectedChallengeIndex(settings.challenges.length);
  };

  const removeChallenge = () => {
    if (settings.challenges.length <= 1) return;
    setSettings((current) => ({ ...current, challenges: current.challenges.filter((_, index) => index !== selectedChallengeIndex) }));
    setSelectedChallengeIndex(0);
  };

  const uploadFile = async (file: File, folder = "pa") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const result = await uploadAdminAsset(formData);

    if (!result.ok || !result.url) {
      throw new Error(result.message);
    }

    return result.url;
  };

  const handlePdfUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      try {
        const url = await uploadFile(file);
        updateGeneral("agreementPdfUrl", url);
        updateGeneral("agreementDownloadUrl", url);
        setMessage({ type: "success", text: "อัปโหลดไฟล์ PDF แล้ว กดบันทึกเพื่อใช้งานบนหน้า PA" });
      } catch (error) {
        setMessage({ type: "error", text: error instanceof Error ? error.message : "อัปโหลดไฟล์ไม่สำเร็จ" });
      } finally {
        event.target.value = "";
      }
    });
  };

  const handleEvidenceUpload = (event: ChangeEvent<HTMLInputElement>, target: "standard" | "challenge", evidenceType: "image" | "pdf") => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    startTransition(async () => {
      try {
        const uploaded: PaEvidenceItem[] = [];
        for (const file of files) {
          const url = await uploadFile(file);
          uploaded.push({
            type: evidenceType,
            title: evidenceType === "pdf" ? getEvidenceFileTitle(file.name) : "",
            url
          });
        }

        if (target === "standard") {
          updateStandardItem("images", [...(selectedItem?.images || []), ...uploaded]);
        } else {
          updateChallenge("images", [...(selectedChallenge?.images || []), ...uploaded]);
        }

        setMessage({ type: "success", text: "เพิ่มไฟล์หลักฐานแล้ว กดบันทึกเพื่อเผยแพร่บนหน้า PA" });
      } catch (error) {
        setMessage({ type: "error", text: error instanceof Error ? error.message : "อัปโหลดไฟล์ไม่สำเร็จ" });
      } finally {
        event.target.value = "";
      }
    });
  };

  const saveSettings = () => {
    startTransition(async () => {
      const result = await savePaSettings(settings);

      if (result.ok && result.settings) {
        setSettings(result.settings);
        setMessage({ type: "success", text: "บันทึกข้อมูล PA เรียบร้อยแล้ว หน้า PA จะดึงข้อมูลชุดนี้ไปแสดง" });
        return;
      }

      setMessage({ type: "error", text: result.message });
    });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6" style={{ fontFamily: 'Arial, "Noto Sans Thai", "Tahoma", sans-serif' }}>
      <section className="overflow-hidden rounded-3xl border border-amber-500/20 bg-[radial-gradient(circle_at_top_right,rgba(255,138,31,0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-2xl shadow-black/30 sm:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-black/35 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-300">
              <BookOpenCheck className="h-4 w-4" />
              PA Content Manager
            </span>
            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">จัดการหน้า PA</h1>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
                แก้ข้อมูลรายงานผลการประเมินและหลักฐานการพัฒนางานตามข้อตกลงให้ตรงกับหน้า PA โดยบันทึกลงข้อมูลกลางของเว็บไซต์
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-[520px]">
            <Stat label="กลุ่มภาระงาน" value={stats.workload} />
            <Stat label="หัวข้อมาตรฐาน" value={stats.standards} />
            <Stat label="ประเด็นท้าทาย" value={stats.challenges} />
            <Stat label="หลักฐาน" value={stats.evidence} />
          </div>
        </div>
      </section>

      {message ? <StatusMessage type={message.type} text={message.text} /> : null}

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`inline-flex min-h-11 items-center gap-2 rounded-2xl border px-4 text-sm font-bold transition ${
                isActive
                  ? "border-amber-400/50 bg-amber-400/20 text-amber-100 shadow-lg shadow-amber-500/10"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-amber-400/30 hover:text-white"
              }`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 shadow-xl shadow-black/20 sm:p-6">
        {activeTab === "general" ? (
          <GeneralPanel
            settings={settings}
            updateGeneral={updateGeneral}
            updateEducation={updateEducation}
            addEducation={addEducation}
            removeEducation={removeEducation}
            updateLeave={updateLeave}
          />
        ) : null}

        {activeTab === "workload" ? (
          <WorkloadPanel
            groups={settings.workloadGroups}
            updateGroup={updateWorkloadGroup}
            updateRow={updateWorkloadRow}
            addGroup={addWorkloadGroup}
            removeGroup={removeWorkloadGroup}
            addRow={addWorkloadRow}
            removeRow={removeWorkloadRow}
          />
        ) : null}

        {activeTab === "standards" ? (
          <StandardsPanel
            domains={settings.reportStandards}
            selectedDomainIndex={selectedDomainIndex}
            selectedItemIndex={selectedItemIndex}
            selectedDomain={selectedDomain}
            selectedItem={selectedItem}
            setSelectedDomainIndex={(index) => {
              setSelectedDomainIndex(index);
              setSelectedItemIndex(0);
            }}
            setSelectedItemIndex={setSelectedItemIndex}
            updateDomain={updateDomain}
            updateItem={updateStandardItem}
            addDomain={addDomain}
            addItem={addStandardItem}
            removeItem={removeStandardItem}
            onEvidenceUpload={(event, evidenceType) => handleEvidenceUpload(event, "standard", evidenceType)}
            copySources={evidenceCopySources.filter((source) => source.key !== `standard-${selectedDomainIndex}-${selectedItemIndex}`)}
          />
        ) : null}

        {activeTab === "challenges" ? (
          <ChallengesPanel
            challenges={settings.challenges}
            selectedIndex={selectedChallengeIndex}
            selectedChallenge={selectedChallenge}
            setSelectedIndex={setSelectedChallengeIndex}
            updateChallenge={updateChallenge}
            addChallenge={addChallenge}
            removeChallenge={removeChallenge}
            onEvidenceUpload={(event, evidenceType) => handleEvidenceUpload(event, "challenge", evidenceType)}
            copySources={evidenceCopySources.filter((source) => source.key !== `challenge-${selectedChallengeIndex}`)}
          />
        ) : null}

        {activeTab === "document" ? (
          <DocumentPanel settings={settings} updateGeneral={updateGeneral} onPdfUpload={handlePdfUpload} />
        ) : null}
      </section>

      <div className="sticky bottom-4 z-10 flex justify-end">
        <button
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 text-sm font-black text-black shadow-xl shadow-orange-500/25 transition hover:brightness-110 disabled:cursor-wait disabled:opacity-60"
          type="button"
          disabled={isPending}
          onClick={saveSettings}
        >
          <Save className="h-5 w-5" />
          {isPending ? "กำลังบันทึก..." : "บันทึกข้อมูล PA ทั้งหมด"}
        </button>
      </div>
    </div>
  );
}

function GeneralPanel({
  settings,
  updateGeneral,
  updateEducation,
  addEducation,
  removeEducation,
  updateLeave
}: {
  settings: PaSettings;
  updateGeneral: (field: keyof PaSettings["general"], value: string) => void;
  updateEducation: (index: number, field: keyof PaEducationItem, value: string) => void;
  addEducation: () => void;
  removeEducation: (index: number) => void;
  updateLeave: (value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <PanelHeading icon={UserCheck} eyebrow="General Information" title="ข้อมูลทั่วไปและคำนำ" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Field label="ผู้จัดทำข้อตกลง">
          <input value={settings.general.name} onChange={(event) => updateGeneral("name", event.target.value)} />
        </Field>
        <Field label="ตำแหน่ง / วิทยฐานะ">
          <input value={settings.general.position} onChange={(event) => updateGeneral("position", event.target.value)} />
        </Field>
        <Field label="สถานศึกษา">
          <input value={settings.general.school} onChange={(event) => updateGeneral("school", event.target.value)} />
        </Field>
        <Field label="สังกัด">
          <input value={settings.general.affiliation} onChange={(event) => updateGeneral("affiliation", event.target.value)} />
        </Field>
        <Field label="เงินเดือน">
          <input value={settings.general.salary} onChange={(event) => updateGeneral("salary", event.target.value)} />
        </Field>
        <Field label="รอบข้อตกลง">
          <input value={settings.general.agreementPeriod} onChange={(event) => updateGeneral("agreementPeriod", event.target.value)} />
        </Field>
        <Field label="ประเภทห้องเรียน">
          <input value={settings.general.classroomType} onChange={(event) => updateGeneral("classroomType", event.target.value)} />
        </Field>
        <Field label="ภาระงานรวม ชั่วโมง/สัปดาห์">
          <input value={settings.general.workloadHours} onChange={(event) => updateGeneral("workloadHours", event.target.value)} />
        </Field>
      </div>

      <Field label="คำนำ">
        <textarea rows={5} value={settings.general.preface} onChange={(event) => updateGeneral("preface", event.target.value)} />
      </Field>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <PanelMiniHeading icon={GraduationCap} title="ประวัติการศึกษา" />
            <button className="admin-pa-mini-button" type="button" onClick={addEducation}>
              <Plus className="h-4 w-4" />
              เพิ่ม
            </button>
          </div>
          <div className="space-y-3">
            {settings.reportGeneral.education.map((item, index) => (
              <div className="grid grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 md:grid-cols-2" key={`${item.school}-${index}`}>
                <Field label="ระดับ">
                  <input value={item.level} onChange={(event) => updateEducation(index, "level", event.target.value)} />
                </Field>
                <Field label="วุฒิ / รายละเอียด">
                  <input value={item.credential} onChange={(event) => updateEducation(index, "credential", event.target.value)} />
                </Field>
                <Field label="สถานศึกษา">
                  <input value={item.school} onChange={(event) => updateEducation(index, "school", event.target.value)} />
                </Field>
                <Field label="จังหวัด">
                  <input value={item.province} onChange={(event) => updateEducation(index, "province", event.target.value)} />
                </Field>
                <Field label="ไฟล์โลโก้ / URL">
                  <input value={item.logo} onChange={(event) => updateEducation(index, "logo", event.target.value)} />
                </Field>
                <div className="flex items-end justify-end">
                  <button className="admin-pa-danger-button" type="button" onClick={() => removeEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                    ลบรายการนี้
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <PanelMiniHeading icon={Clock} title="ประวัติการลา" />
          <div className="mt-4">
            <Field label="ใส่ 1 รายการต่อ 1 บรรทัด">
              <textarea rows={12} value={linesToText(settings.reportGeneral.leave)} onChange={(event) => updateLeave(event.target.value)} />
            </Field>
          </div>
        </section>
      </div>
    </div>
  );
}

function WorkloadPanel({
  groups,
  updateGroup,
  updateRow,
  addGroup,
  removeGroup,
  addRow,
  removeRow
}: {
  groups: PaWorkloadGroup[];
  updateGroup: (index: number, field: keyof Omit<PaWorkloadGroup, "rows">, value: string) => void;
  updateRow: (groupIndex: number, rowIndex: number, field: keyof PaWorkloadRow, value: string) => void;
  addGroup: () => void;
  removeGroup: (index: number) => void;
  addRow: (groupIndex: number) => void;
  removeRow: (groupIndex: number, rowIndex: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PanelHeading icon={Clock} eyebrow="Workload" title="ภาระงานตามที่ ก.ค.ศ. กำหนด" />
        <button className="admin-pa-action-button" type="button" onClick={addGroup}>
          <Plus className="h-4 w-4" />
          เพิ่มกลุ่มภาระงาน
        </button>
      </div>

      <div className="space-y-5">
        {groups.map((group, groupIndex) => (
          <article className="rounded-2xl border border-white/10 bg-black/25 p-4" key={`${group.title}-${groupIndex}`}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_160px_auto]">
              <Field label="ชื่อกลุ่มภาระงาน">
                <input value={group.title} onChange={(event) => updateGroup(groupIndex, "title", event.target.value)} />
              </Field>
              <Field label="ชั่วโมงรวม">
                <input value={group.hours} onChange={(event) => updateGroup(groupIndex, "hours", event.target.value)} />
              </Field>
              <div className="flex items-end justify-end">
                <button className="admin-pa-danger-button" type="button" onClick={() => removeGroup(groupIndex)}>
                  <Trash2 className="h-4 w-4" />
                  ลบกลุ่ม
                </button>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[minmax(0,1fr)_150px_44px] bg-amber-400/12 text-xs font-bold text-amber-100">
                <div className="p-3">วิชา/กิจกรรม</div>
                <div className="p-3">จำนวนชั่วโมง/สัปดาห์</div>
                <div className="p-3" />
              </div>
              {group.rows.map((row, rowIndex) => (
                <div className="grid grid-cols-[minmax(0,1fr)_150px_44px] border-t border-white/10" key={`${row.activity}-${rowIndex}`}>
                  <input
                    className="admin-pa-table-input"
                    value={row.activity}
                    onChange={(event) => updateRow(groupIndex, rowIndex, "activity", event.target.value)}
                  />
                  <input
                    className="admin-pa-table-input"
                    value={row.hours}
                    onChange={(event) => updateRow(groupIndex, rowIndex, "hours", event.target.value)}
                  />
                  <button className="grid place-items-center text-red-200 hover:bg-red-400/10" type="button" onClick={() => removeRow(groupIndex, rowIndex)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <button className="admin-pa-mini-button mt-3" type="button" onClick={() => addRow(groupIndex)}>
              <Plus className="h-4 w-4" />
              เพิ่มแถว
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

function StandardsPanel({
  domains,
  selectedDomainIndex,
  selectedItemIndex,
  selectedDomain,
  selectedItem,
  setSelectedDomainIndex,
  setSelectedItemIndex,
  updateDomain,
  updateItem,
  addDomain,
  addItem,
  removeItem,
  onEvidenceUpload,
  copySources
}: {
  domains: PaStandardDomain[];
  selectedDomainIndex: number;
  selectedItemIndex: number;
  selectedDomain?: PaStandardDomain;
  selectedItem?: PaStandardItem;
  setSelectedDomainIndex: (index: number) => void;
  setSelectedItemIndex: (index: number) => void;
  updateDomain: (field: keyof Omit<PaStandardDomain, "items">, value: string) => void;
  updateItem: (field: keyof PaStandardItem, value: string | string[] | PaEvidenceItem[]) => void;
  addDomain: () => void;
  addItem: () => void;
  removeItem: () => void;
  onEvidenceUpload: (event: ChangeEvent<HTMLInputElement>, evidenceType: "image" | "pdf") => void;
  copySources: EvidenceCopySource[];
}) {
  if (!selectedDomain || !selectedItem) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PanelHeading icon={BookOpenCheck} eyebrow="Component 1" title="องค์ประกอบที่ 1 ตามมาตรฐานตำแหน่ง" />
        <button className="admin-pa-action-button" type="button" onClick={addDomain}>
          <Plus className="h-4 w-4" />
          เพิ่มด้าน
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-black/25 p-3">
          <span className="mb-3 block px-2 text-xs font-bold text-amber-300">เลือกด้าน</span>
          <div className="space-y-2">
            {domains.map((domain, index) => (
              <button
                className={`w-full rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${
                  selectedDomainIndex === index ? "border-amber-400/45 bg-amber-400/15 text-amber-100" : "border-white/10 bg-white/[0.03] text-slate-300"
                }`}
                key={`${domain.domain}-${index}`}
                type="button"
                onClick={() => setSelectedDomainIndex(index)}
              >
                {domain.domain || `ด้านที่ ${index + 1}`}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="ชื่อด้าน">
              <input value={selectedDomain.domain} onChange={(event) => updateDomain("domain", event.target.value)} />
            </Field>
            <Field label="เลือกหัวข้อย่อย">
              <select value={selectedItemIndex} onChange={(event) => setSelectedItemIndex(Number(event.target.value))}>
                {selectedDomain.items.map((item, index) => (
                  <option key={`${item.title}-${index}`} value={index}>
                    {item.title || `หัวข้อย่อยที่ ${index + 1}`}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="คำอธิบายด้าน">
            <textarea rows={3} value={selectedDomain.description} onChange={(event) => updateDomain("description", event.target.value)} />
          </Field>

          <div className="flex flex-wrap gap-2">
            <button className="admin-pa-mini-button" type="button" onClick={addItem}>
              <Plus className="h-4 w-4" />
              เพิ่มหัวข้อย่อย
            </button>
            <button className="admin-pa-danger-button" type="button" onClick={removeItem}>
              <Trash2 className="h-4 w-4" />
              ลบหัวข้อย่อย
            </button>
          </div>

          <Field label="ชื่อหัวข้อย่อย">
            <input value={selectedItem.title} onChange={(event) => updateItem("title", event.target.value)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="งานที่ปฏิบัติ">
              <textarea rows={8} value={linesToText(selectedItem.tasks)} onChange={(event) => updateItem("tasks", textToLines(event.target.value))} />
            </Field>
            <Field label="ผลลัพธ์">
              <textarea rows={8} value={linesToText(selectedItem.outcomes)} onChange={(event) => updateItem("outcomes", textToLines(event.target.value))} />
            </Field>
          </div>

          <AssessmentLevelField
            value={selectedItem.selfAssessmentLevel || "3"}
            onChange={(value) => updateItem("selfAssessmentLevel", value)}
          />

          <Field label="ตัวชี้วัด / หลักฐาน">
            <textarea rows={6} value={linesToText(selectedItem.indicators)} onChange={(event) => updateItem("indicators", textToLines(event.target.value))} />
          </Field>

          <EvidenceEditor
            value={selectedItem.images || []}
            onChange={(items) => updateItem("images", items)}
            onUpload={onEvidenceUpload}
            copySources={copySources}
          />
        </section>
      </div>
    </div>
  );
}

function ChallengesPanel({
  challenges,
  selectedIndex,
  selectedChallenge,
  setSelectedIndex,
  updateChallenge,
  addChallenge,
  removeChallenge,
  onEvidenceUpload,
  copySources
}: {
  challenges: PaChallengeItem[];
  selectedIndex: number;
  selectedChallenge?: PaChallengeItem;
  setSelectedIndex: (index: number) => void;
  updateChallenge: (field: keyof PaChallengeItem, value: string | string[] | PaEvidenceItem[]) => void;
  addChallenge: () => void;
  removeChallenge: () => void;
  onEvidenceUpload: (event: ChangeEvent<HTMLInputElement>, evidenceType: "image" | "pdf") => void;
  copySources: EvidenceCopySource[];
}) {
  if (!selectedChallenge) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PanelHeading icon={Target} eyebrow="Component 2" title="ประเด็นท้าทาย" />
        <div className="flex flex-wrap gap-2">
          <button className="admin-pa-action-button" type="button" onClick={addChallenge}>
            <Plus className="h-4 w-4" />
            เพิ่มประเด็น
          </button>
          <button className="admin-pa-danger-button" type="button" onClick={removeChallenge}>
            <Trash2 className="h-4 w-4" />
            ลบประเด็น
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="rounded-2xl border border-white/10 bg-black/25 p-3">
          <span className="mb-3 block px-2 text-xs font-bold text-amber-300">เลือกประเด็น</span>
          <div className="space-y-2">
            {challenges.map((challenge, index) => (
              <button
                className={`w-full rounded-xl border px-3 py-2 text-left text-xs font-bold transition ${
                  selectedIndex === index ? "border-amber-400/45 bg-amber-400/15 text-amber-100" : "border-white/10 bg-white/[0.03] text-slate-300"
                }`}
                key={`${challenge.title}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
              >
                {challenge.title || `ประเด็นที่ ${index + 1}`}
              </button>
            ))}
          </div>
        </aside>

        <section className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-4">
          <Field label="ชื่อประเด็น">
            <input value={selectedChallenge.title} onChange={(event) => updateChallenge("title", event.target.value)} />
          </Field>
          <Field label="ชื่อเรื่อง / คำอธิบายย่อ">
            <textarea rows={3} value={selectedChallenge.subtitle} onChange={(event) => updateChallenge("subtitle", event.target.value)} />
          </Field>
          <Field label="สภาพปัญหาการจัดการเรียนรู้และคุณภาพการเรียนรู้ของผู้เรียน">
            <textarea rows={5} value={selectedChallenge.problem} onChange={(event) => updateChallenge("problem", event.target.value)} />
          </Field>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Field label="วิธีการดำเนินการให้บรรลุเป้าหมาย">
              <textarea rows={9} value={linesToText(selectedChallenge.methods)} onChange={(event) => updateChallenge("methods", textToLines(event.target.value))} />
            </Field>
            <Field label="ผลลัพธ์การพัฒนาที่คาดหวัง">
              <textarea rows={9} value={linesToText(selectedChallenge.expected)} onChange={(event) => updateChallenge("expected", textToLines(event.target.value))} />
            </Field>
          </div>

          <AssessmentLevelField
            value={selectedChallenge.selfAssessmentLevel || "3"}
            onChange={(value) => updateChallenge("selfAssessmentLevel", value)}
          />

          <EvidenceEditor
            value={selectedChallenge.images || []}
            onChange={(items) => updateChallenge("images", items)}
            onUpload={onEvidenceUpload}
            copySources={copySources}
          />
        </section>
      </div>
    </div>
  );
}

function DocumentPanel({
  settings,
  updateGeneral,
  onPdfUpload
}: {
  settings: PaSettings;
  updateGeneral: (field: keyof PaSettings["general"], value: string) => void;
  onPdfUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-6">
      <PanelHeading icon={FileText} eyebrow="PDF Document" title="เอกสาร PDF ในหน้า PA" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Field label="ชื่อเอกสาร">
          <input value={settings.general.pdfTitle} onChange={(event) => updateGeneral("pdfTitle", event.target.value)} />
        </Field>
        <Field label="ลิงก์ไฟล์ PDF ที่ใช้แสดง">
          <input value={settings.general.agreementPdfUrl} onChange={(event) => updateGeneral("agreementPdfUrl", event.target.value)} />
        </Field>
        <Field label="ลิงก์ดาวน์โหลด PDF">
          <input value={settings.general.agreementDownloadUrl || ""} onChange={(event) => updateGeneral("agreementDownloadUrl", event.target.value)} />
        </Field>
        <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-amber-400/30 bg-black/25 px-4 py-5 text-center text-sm text-slate-300 transition hover:border-amber-300/60 hover:bg-amber-400/[0.06]">
          <Upload className="h-8 w-8 text-amber-300" />
          <strong className="mt-2 text-white">อัปโหลด PDF ใหม่</strong>
          <span className="mt-1 text-xs text-slate-500">ระบบจะเติมลิงก์ไฟล์ให้อัตโนมัติ หลังจากนั้นกดบันทึก</span>
          <input className="sr-only" type="file" accept="application/pdf" onChange={onPdfUpload} />
        </label>
      </div>
    </div>
  );
}

function EvidenceEditor({
  value,
  onChange,
  onUpload,
  copySources
}: {
  value: PaEvidenceItem[];
  onChange: (items: PaEvidenceItem[]) => void;
  onUpload: (event: ChangeEvent<HTMLInputElement>, evidenceType: "image" | "pdf") => void;
  copySources: EvidenceCopySource[];
}) {
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [copySourceKey, setCopySourceKey] = useState("");
  const items = normalizeEvidenceDrafts(value);
  const selectedCopySource = copySources.find((source) => source.key === copySourceKey);

  const updateEvidence = (index: number, field: keyof PaEvidenceDraft, nextValue: string) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: nextValue } : item)));
  };

  const removeEvidence = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const addLink = () => {
    const url = linkUrl.trim();
    if (!url) return;

    onChange([
      ...items,
      {
        type: "link",
        title: linkTitle.trim() || "ลิงก์หลักฐานอ้างอิง",
        url
      }
    ]);
    setLinkTitle("");
    setLinkUrl("");
  };

  const copyEvidence = () => {
    if (!selectedCopySource) return;

    const existingUrls = new Set(items.map((item) => item.url));
    const copiedItems = normalizeEvidenceDrafts(selectedCopySource.items).filter((item) => !existingUrls.has(item.url));

    if (!copiedItems.length) return;

    onChange([...items, ...copiedItems]);
    setCopySourceKey("");
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PanelMiniHeading icon={ImagePlus} title="ภาพ / PDF / ลิงก์หลักฐานอ้างอิง" />
      </div>

      {copySources.length ? (
        <div className="admin-pa-evidence-copy">
          <div className="admin-pa-evidence-copy__heading">
            <Copy className="h-5 w-5" />
            <div>
              <strong>คัดลอกหลักฐานจากหัวข้ออื่น</strong>
              <span>เลือกหัวข้อที่มีหลักฐาน แล้วระบบจะเพิ่มเฉพาะรายการที่ยังไม่ซ้ำ</span>
            </div>
          </div>
          <div className="admin-pa-evidence-copy__controls">
            <select value={copySourceKey} onChange={(event) => setCopySourceKey(event.target.value)}>
              <option value="">เลือกหัวข้อ/ตัวชี้วัดต้นทาง</option>
              {copySources.map((source) => {
                const count = countEvidenceByType(source.items);

                return (
                  <option key={source.key} value={source.key}>
                    {source.label} ({count.total} รายการ: ภาพ {count.image}, PDF {count.pdf}, ลิงก์ {count.link})
                  </option>
                );
              })}
            </select>
            <button className="admin-pa-mini-button" type="button" onClick={copyEvidence} disabled={!selectedCopySource}>
              <Copy className="h-4 w-4" />
              คัดลอก
            </button>
          </div>
        </div>
      ) : null}

      <div className="admin-pa-evidence-upload-grid">
        <label className="admin-pa-evidence-upload">
          <ImagePlus className="h-5 w-5" />
          <strong>อัปโหลดภาพหลักฐาน</strong>
          <span>รองรับ JPG, PNG, WebP, GIF และ AVIF</span>
          <input className="sr-only" type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => onUpload(event, "image")} />
        </label>

        <label className="admin-pa-evidence-upload">
          <FileText className="h-5 w-5" />
          <strong>อัปโหลด PDF หลักฐาน</strong>
          <span>ระบบตั้งชื่อจากไฟล์ก่อน แล้วแก้ชื่อได้ในรายการด้านล่าง</span>
          <input className="sr-only" type="file" multiple accept="application/pdf" onChange={(event) => onUpload(event, "pdf")} />
        </label>
      </div>

      <div className="admin-pa-link-builder">
        <Field label="ชื่อปุ่มลิงก์">
          <input value={linkTitle} onChange={(event) => setLinkTitle(event.target.value)} placeholder="เช่น เอกสาร Drive / แบบประเมินออนไลน์" />
        </Field>
        <Field label="URL ลิงก์หลักฐาน">
          <input value={linkUrl} onChange={(event) => setLinkUrl(event.target.value)} placeholder="https://..." />
        </Field>
        <button className="admin-pa-mini-button" type="button" onClick={addLink}>
          <Plus className="h-4 w-4" />
          เพิ่มลิงก์
        </button>
      </div>

      <div className="admin-pa-evidence-list">
        {items.length ? (
          items.map((item, index) => (
            <div className="admin-pa-evidence-row" key={`${item.url}-${index}`}>
              <select value={item.type} onChange={(event) => updateEvidence(index, "type", event.target.value as PaEvidenceType)}>
                <option value="image">ภาพ</option>
                <option value="pdf">PDF</option>
                <option value="link">ลิงก์</option>
              </select>
              <input
                value={item.title}
                onChange={(event) => updateEvidence(index, "title", event.target.value)}
                placeholder={item.type === "image" ? "ชื่อภาพ (ไม่บังคับ)" : "ชื่อหลักฐานที่จะแสดง"}
              />
              <input value={item.url} onChange={(event) => updateEvidence(index, "url", event.target.value)} placeholder="/uploads/example.jpg หรือ https://..." />
              <button className="admin-pa-icon-danger-button" type="button" onClick={() => removeEvidence(index)} aria-label="ลบหลักฐานรายการนี้">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="admin-pa-empty-note">ยังไม่มีหลักฐานอ้างอิงในหัวข้อนี้</div>
        )}
      </div>
    </div>
  );
}

function AssessmentLevelField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const selectedLevel = assessmentLevels.find((level) => level.value === value) || assessmentLevels[2];

  return (
    <div className={`admin-pa-assessment-field admin-pa-assessment-field--${selectedLevel.tone}`}>
      <div>
        <span>ระดับผลการประเมินตนเอง</span>
        <strong>{selectedLevel.label}</strong>
      </div>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {assessmentLevels.map((level) => (
          <option key={level.value} value={level.value}>
            {level.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function PanelHeading({ icon: Icon, eyebrow, title }: { icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/30 bg-amber-400/12 text-amber-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-amber-300">{eyebrow}</span>
        <h2 className="mt-1 text-xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );
}

function PanelMiniHeading({ icon: Icon, title }: { icon: React.ComponentType<{ className?: string }>; title: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-5 w-5 text-amber-300" />
      <h3 className="text-base font-bold text-white">{title}</h3>
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

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <strong className="block text-2xl font-black text-white">{value}</strong>
      <span className="mt-1 block text-xs font-semibold text-slate-400">{label}</span>
    </div>
  );
}

function StatusMessage({ type, text }: { type: "success" | "error"; text: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lg ${
        type === "success" ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100" : "border-red-400/25 bg-red-400/10 text-red-100"
      }`}
    >
      {type === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0" />}
      <span>{text}</span>
    </div>
  );
}
