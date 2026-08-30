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

export type AdminContentData = {
  achievements: AdminContentRecord[];
  activities: AdminContentRecord[];
  pageVisuals?: Record<string, unknown>;
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
