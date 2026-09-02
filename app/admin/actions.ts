"use server";

import fallbackContent from "@/data/content.json";
import { getGithubFileContent, updateGithubFile, uploadGithubBase64File } from "@/lib/github-api";
import { revalidatePath } from "next/cache";

const CONTENT_FILE_PATH = "data/content.json";

export type AdminContentStatus = "published" | "draft";

export type AdminContentRecord = {
  id: string;
  title: string;
  category: string;
  content: string;
  imgUrl: string;
  images?: string[];
  albumUrl?: string;
  date: string;
  status: AdminContentStatus;
};

export type PaEvidenceItem = string;

export type PaWorkloadRow = {
  activity: string;
  hours: string;
};

export type PaWorkloadGroup = {
  title: string;
  hours: string;
  rows: PaWorkloadRow[];
};

export type PaEducationItem = {
  level: string;
  credential: string;
  school: string;
  province: string;
  logo: string;
};

export type PaStandardItem = {
  title: string;
  tasks: string[];
  outcomes: string[];
  selfAssessmentLevel?: string;
  indicators: string[];
  images?: PaEvidenceItem[];
};

export type PaStandardDomain = {
  domain: string;
  description: string;
  items: PaStandardItem[];
};

export type PaChallengeItem = {
  title: string;
  subtitle: string;
  problem: string;
  methods: string[];
  expected: string[];
  selfAssessmentLevel?: string;
  images?: PaEvidenceItem[];
};

export type PaSettings = {
  general: {
    name: string;
    position: string;
    school: string;
    affiliation: string;
    salary: string;
    agreementPeriod: string;
    classroomType: string;
    workloadHours: string;
    preface: string;
    pdfTitle: string;
    agreementPdfUrl: string;
    agreementDownloadUrl?: string;
  };
  reportGeneral: {
    education: PaEducationItem[];
    leave: string[];
  };
  workloadGroups: PaWorkloadGroup[];
  reportStandards: PaStandardDomain[];
  challenges: PaChallengeItem[];
};

export type AdminContentData = {
  achievements: AdminContentRecord[];
  activities: AdminContentRecord[];
  pageVisuals?: Record<string, unknown>;
  paSettings?: PaSettings;
};

type SaveCollectionResult = {
  ok: boolean;
  message: string;
  records?: AdminContentRecord[];
};

type UploadResult = {
  ok: boolean;
  message: string;
  url?: string;
};

type SavePaSettingsResult = {
  ok: boolean;
  message: string;
  settings?: PaSettings;
};

export async function fetchContent() {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_OWNER || !process.env.GITHUB_REPO) {
    if (process.env.NODE_ENV !== "development") {
      return fallbackContent;
    }
  }

  const fileData = await getGithubFileContent(CONTENT_FILE_PATH);

  if (!fileData) {
    return fallbackContent;
  }

  try {
    return JSON.parse(fileData.content);
  } catch (error) {
    console.error("Failed to parse content.json", error);
    return fallbackContent;
  }
}

function normalizeRecord(record: AdminContentRecord): AdminContentRecord {
  const images = Array.isArray(record.images)
    ? record.images.map((image) => image.trim()).filter(Boolean)
    : undefined;

  return {
    id: record.id || String(Date.now()),
    title: record.title.trim(),
    category: record.category.trim(),
    content: record.content.trim(),
    imgUrl: record.imgUrl.trim(),
    images,
    albumUrl: record.albumUrl?.trim() || "",
    date: record.date || new Date().toISOString(),
    status: record.status === "draft" ? "draft" : "published"
  };
}

function validateRecords(records: AdminContentRecord[]) {
  for (const record of records) {
    if (!record.title.trim()) {
      return "กรุณาระบุชื่อรายการให้ครบ";
    }

    if (!record.category.trim()) {
      return "กรุณาระบุหมวดหมู่ให้ครบ";
    }
  }

  return null;
}

export async function saveContentCollection(
  collection: "achievements" | "activities",
  records: AdminContentRecord[]
): Promise<SaveCollectionResult> {
  try {
    const normalizedRecords = records.map(normalizeRecord);
    const validationError = validateRecords(normalizedRecords);

    if (validationError) {
      return { ok: false, message: validationError };
    }

    const currentContent = (await fetchContent()) as AdminContentData;
    const nextContent: AdminContentData = {
      ...currentContent,
      achievements: collection === "achievements" ? normalizedRecords : currentContent.achievements || [],
      activities: collection === "activities" ? normalizedRecords : currentContent.activities || []
    };

    await updateGithubFile(
      CONTENT_FILE_PATH,
      `${JSON.stringify(nextContent, null, 2)}\n`,
      `Update ${collection} content`
    );

    revalidatePath("/");
    revalidatePath("/achievements");
    revalidatePath("/achievements/awards");
    revalidatePath("/achievements/academic");
    revalidatePath("/achievements/development");
    revalidatePath("/activities");
    revalidatePath(`/admin/${collection}`);

    return {
      ok: true,
      message: "บันทึกข้อมูลเรียบร้อยแล้ว",
      records: normalizedRecords
    };
  } catch (error) {
    console.error(`Failed to save ${collection}`, error);
    return {
      ok: false,
      message: "บันทึกไม่สำเร็จ กรุณาตรวจการตั้งค่า GitHub หรือสิทธิ์การเขียนไฟล์"
    };
  }
}

const cleanLines = (items: string[] | undefined) =>
  Array.isArray(items) ? items.map((item) => item.trim()).filter(Boolean) : [];

function normalizePaSettings(settings: PaSettings): PaSettings {
  return {
    general: {
      name: settings.general.name.trim(),
      position: settings.general.position.trim(),
      school: settings.general.school.trim(),
      affiliation: settings.general.affiliation.trim(),
      salary: settings.general.salary.trim(),
      agreementPeriod: settings.general.agreementPeriod.trim(),
      classroomType: settings.general.classroomType.trim(),
      workloadHours: settings.general.workloadHours.trim(),
      preface: settings.general.preface.trim(),
      pdfTitle: settings.general.pdfTitle.trim(),
      agreementPdfUrl: settings.general.agreementPdfUrl.trim(),
      agreementDownloadUrl: settings.general.agreementDownloadUrl?.trim() || ""
    },
    reportGeneral: {
      education: settings.reportGeneral.education
        .map((item) => ({
          level: item.level.trim(),
          credential: item.credential.trim(),
          school: item.school.trim(),
          province: item.province.trim(),
          logo: item.logo.trim()
        }))
        .filter((item) => item.level || item.credential || item.school),
      leave: cleanLines(settings.reportGeneral.leave)
    },
    workloadGroups: settings.workloadGroups
      .map((group) => ({
        title: group.title.trim(),
        hours: group.hours.trim(),
        rows: group.rows
          .map((row) => ({ activity: row.activity.trim(), hours: row.hours.trim() }))
          .filter((row) => row.activity || row.hours)
      }))
      .filter((group) => group.title || group.rows.length),
    reportStandards: settings.reportStandards
      .map((domain) => ({
        domain: domain.domain.trim(),
        description: domain.description.trim(),
        items: domain.items
          .map((item) => ({
            title: item.title.trim(),
            tasks: cleanLines(item.tasks),
            outcomes: cleanLines(item.outcomes),
            selfAssessmentLevel: ["1", "2", "3", "4"].includes(item.selfAssessmentLevel || "") ? item.selfAssessmentLevel : "3",
            indicators: cleanLines(item.indicators),
            images: cleanLines(item.images)
          }))
          .filter((item) => item.title)
      }))
      .filter((domain) => domain.domain || domain.items.length),
    challenges: settings.challenges
      .map((challenge) => ({
        title: challenge.title.trim(),
        subtitle: challenge.subtitle.trim(),
        problem: challenge.problem.trim(),
        methods: cleanLines(challenge.methods),
        expected: cleanLines(challenge.expected),
        selfAssessmentLevel: ["1", "2", "3", "4"].includes(challenge.selfAssessmentLevel || "") ? challenge.selfAssessmentLevel : "3",
        images: cleanLines(challenge.images)
      }))
      .filter((challenge) => challenge.title || challenge.subtitle)
  };
}

function validatePaSettings(settings: PaSettings) {
  if (!settings.general.name) return "กรุณาระบุชื่อผู้จัดทำข้อตกลง";
  if (!settings.general.preface) return "กรุณาระบุคำนำ";
  if (!settings.workloadGroups.length) return "กรุณาระบุภาระงานอย่างน้อย 1 กลุ่ม";
  if (!settings.reportStandards.length) return "กรุณาระบุองค์ประกอบที่ 1 อย่างน้อย 1 ด้าน";
  if (!settings.challenges.length) return "กรุณาระบุประเด็นท้าทายอย่างน้อย 1 ประเด็น";
  return null;
}

export async function savePaSettings(settings: PaSettings): Promise<SavePaSettingsResult> {
  try {
    const normalizedSettings = normalizePaSettings(settings);
    const validationError = validatePaSettings(normalizedSettings);

    if (validationError) {
      return { ok: false, message: validationError };
    }

    const currentContent = (await fetchContent()) as AdminContentData;
    const nextContent: AdminContentData = {
      ...currentContent,
      achievements: currentContent.achievements || [],
      activities: currentContent.activities || [],
      paSettings: normalizedSettings
    };

    await updateGithubFile(
      CONTENT_FILE_PATH,
      `${JSON.stringify(nextContent, null, 2)}\n`,
      "Update PA management content"
    );

    revalidatePath("/pa");
    revalidatePath("/admin/pa");

    return {
      ok: true,
      message: "บันทึกข้อมูล PA เรียบร้อยแล้ว",
      settings: normalizedSettings
    };
  } catch (error) {
    console.error("Failed to save PA settings", error);
    return {
      ok: false,
      message: "บันทึกข้อมูล PA ไม่สำเร็จ กรุณาตรวจการตั้งค่า GitHub หรือสิทธิ์การเขียนไฟล์"
    };
  }
}

export async function uploadAdminAsset(formData: FormData): Promise<UploadResult> {
  try {
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "admin");

    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, message: "ไม่พบไฟล์ที่ต้องการอัปโหลด" };
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      return { ok: false, message: "รองรับเฉพาะไฟล์ JPG, PNG, WebP และ PDF" };
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "bin";
    const safeExtension = extension === "jpeg" ? "jpg" : extension;
    const safeFolder = folder.replace(/[^a-z0-9-]/gi, "").toLowerCase() || "admin";
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${safeExtension}`;
    const repoPath = `public/uploads/${safeFolder}-${fileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const base64Content = Buffer.from(arrayBuffer).toString("base64");

    await uploadGithubBase64File(repoPath, base64Content, `Upload admin asset ${fileName}`);

    return {
      ok: true,
      message: "อัปโหลดไฟล์เรียบร้อยแล้ว",
      url: `/uploads/${safeFolder}-${fileName}`
    };
  } catch (error) {
    console.error("Failed to upload admin asset", error);
    return {
      ok: false,
      message: "อัปโหลดไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"
    };
  }
}
