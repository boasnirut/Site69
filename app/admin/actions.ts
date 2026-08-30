"use server";

import { getGithubFileContent, updateGithubFile, uploadGithubBase64File } from "@/lib/github-api";
import { revalidatePath } from "next/cache";

const CONTENT_FILE_PATH = "data/content.json";

export async function fetchContent() {
  const fileData = await getGithubFileContent(CONTENT_FILE_PATH);
  
  if (!fileData) {
    return { achievements: [], activities: [] };
  }

  try {
    return JSON.parse(fileData.content);
  } catch (error) {
    console.error("Failed to parse content.json", error);
    return { achievements: [], activities: [] };
  }
}

export async function savePageVisuals(pageVisuals: any) {
  try {
    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    let data: any = { achievements: [], activities: [] };
    let sha = undefined;

    if (currentFile) {
      data = JSON.parse(currentFile.content);
      sha = currentFile.sha;
    }

    data.pageVisuals = pageVisuals;

    const newContent = JSON.stringify(data, null, 2);
    await updateGithubFile(CONTENT_FILE_PATH, newContent, "update: page visuals", sha);
    
    revalidatePath("/", "layout");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to save page visuals", error);
    return { success: false, error: "Failed to save page visuals" };
  }
}

export async function uploadHeroImage(formData: FormData) {
  try {
    const imageFile = formData.get("imageFile") as File;
    const pageKey = formData.get("pageKey") as string;
    
    if (!imageFile || imageFile.size === 0) {
      throw new Error("No image file provided");
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    
    const extension = imageFile.name.split('.').pop();
    const filename = `hero-${pageKey}-${Date.now()}.${extension}`;
    const uploadPath = `public/uploads/${filename}`;
    
    await uploadGithubBase64File(uploadPath, base64Data, `upload: new hero image for ${pageKey}`);
    
    return { success: true, imgUrl: `/uploads/${filename}` };
  } catch (error) {
    console.error("Failed to upload hero image", error);
    return { success: false, error: "Failed to upload hero image" };
  }
}

export async function addOrEditContent(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const type = formData.get("type") as string; // "achievements" or "activities"
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const contentText = formData.get("content") as string;
    let albumUrl = (formData.get("albumUrl") as string || "").trim();
    let imgUrl = (formData.get("imgUrl") as string || "").trim();
    const imageFile = formData.get("imageFile") as File | null;

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      
      const extension = imageFile.name.split('.').pop();
      const filename = `${Date.now()}-${Math.round(Math.random() * 1000)}.${extension}`;
      const uploadPath = `public/uploads/${filename}`;
      
      await uploadGithubBase64File(uploadPath, base64Data, `upload: ${filename}`);
      imgUrl = `/uploads/${filename}`;
    }

    // Extract cover image and photos from Google Photos album if albumUrl is provided
    let extractedImages: string[] = [];
    if (albumUrl) {
      try {
        const response = await fetch(albumUrl, {
          redirect: "follow",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "th-TH,th;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });

        if (response.ok) {
          const html = await response.text();
          
          // Match og:image
          const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                          html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
          
          if (ogMatch && ogMatch[1]) {
            const ogCover = ogMatch[1].replace(/=w\d+-h\d+.*$/, "") + "=w1200-h800-no";
            if (!imgUrl || imgUrl.includes("placeholder") || imgUrl === "") {
              imgUrl = ogCover;
            }
          }

          // Match album photo URLs
          const lh3Matches = html.match(/https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9_\-]+/gi) || [];
          if (lh3Matches.length > 0) {
            extractedImages = Array.from(new Set(lh3Matches)).map(url => url.replace(/=w\d+-h\d+.*$/, "") + "=w1200-h800-no");
            if (!imgUrl || imgUrl.includes("placeholder") || imgUrl === "") {
              imgUrl = extractedImages[0];
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch Google Photos album cover:", err);
      }
    }

    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    let data = { achievements: [], activities: [] };
    let sha = undefined;

    if (currentFile) {
      data = JSON.parse(currentFile.content);
      sha = currentFile.sha;
    }

    const newItem: any = {
      id: id || Date.now().toString(),
      title,
      category: category || "ภาพกิจกรรม",
      content: contentText,
      imgUrl: imgUrl || (type === "achievements" ? "/achievement-self-01.jpg" : "/placeholder-activity-student-development.jpg"),
      images: extractedImages.length > 0 ? extractedImages : undefined,
      albumUrl: albumUrl || "",
      date: new Date().toISOString(),
      status: "published"
    };

    if (type === "achievements") {
      if (id) {
        data.achievements = data.achievements.map((item: any) => item.id === id ? { ...item, ...newItem } : item) as never[];
      } else {
        data.achievements = [newItem, ...(data.achievements || [])] as never[];
      }
    } else {
      if (id) {
        data.activities = data.activities.map((item: any) => item.id === id ? { ...item, ...newItem } : item) as never[];
      } else {
        data.activities = [newItem, ...(data.activities || [])] as never[];
      }
    }

    await updateGithubFile(
      CONTENT_FILE_PATH,
      JSON.stringify(data, null, 2),
      `content: ${id ? 'Edit' : 'Add'} ${type} - ${title}`,
      sha
    );

    revalidatePath("/admin/achievements");
    revalidatePath("/admin/activities");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteContent(type: string, id: string) {
  try {
    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    if (!currentFile) throw new Error("Content file not found");

    const data = JSON.parse(currentFile.content);
    
    if (type === "achievements" && data.achievements) {
      data.achievements = data.achievements.filter((item: any) => item.id !== id);
    } else if (type === "activities" && data.activities) {
      data.activities = data.activities.filter((item: any) => item.id !== id);
    }

    await updateGithubFile(
      CONTENT_FILE_PATH,
      JSON.stringify(data, null, 2),
      `content: Delete ${type} item ${id}`,
      currentFile.sha
    );

    revalidatePath("/admin/achievements");
    revalidatePath("/admin/activities");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function reorderContent(type: string, reorderedIds: string[]) {
  try {
    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    if (!currentFile) throw new Error("Content file not found");

    const data = JSON.parse(currentFile.content);
    
    if (type === "achievements" && data.achievements) {
      // Create a map for quick lookup
      const itemsMap = new Map(data.achievements.map((item: any) => [item.id, item]));
      
      // Separate items that were reordered vs items that were not part of this specific list (e.g. other categories)
      const reorderedItems = reorderedIds.map(id => itemsMap.get(id)).filter(Boolean);
      const otherItems = data.achievements.filter((item: any) => !reorderedIds.includes(item.id));
      
      data.achievements = [...reorderedItems, ...otherItems] as never[];
    } else if (type === "activities" && data.activities) {
      const itemsMap = new Map(data.activities.map((item: any) => [item.id, item]));
      const reorderedItems = reorderedIds.map(id => itemsMap.get(id)).filter(Boolean);
      const otherItems = data.activities.filter((item: any) => !reorderedIds.includes(item.id));
      
      data.activities = [...reorderedItems, ...otherItems] as never[];
    }

    await updateGithubFile(
      CONTENT_FILE_PATH,
      JSON.stringify(data, null, 2),
      `content: Reorder ${type}`,
      currentFile.sha
    );

    revalidatePath("/admin/achievements");
    revalidatePath("/admin/activities");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function savePaSettings(paData: any) {
  try {
    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    let data: any = { achievements: [], activities: [] };
    let sha = undefined;

    if (currentFile) {
      data = JSON.parse(currentFile.content);
      sha = currentFile.sha;
    }

    data.paSettings = paData;

    const newContent = JSON.stringify(data, null, 2);
    await updateGithubFile(CONTENT_FILE_PATH, newContent, "update: PA settings and document info", sha);
    
    revalidatePath("/pa");
    revalidatePath("/pa/report");
    revalidatePath("/admin/pa");
    
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save PA settings", error);
    return { success: false, error: error.message || "Failed to save PA settings" };
  }
}

export async function uploadPaPdf(formData: FormData) {
  try {
    const pdfFile = formData.get("pdfFile") as File;
    const documentType = formData.get("documentType") as string; // "agreement" or "report"
    
    if (!pdfFile || pdfFile.size === 0) {
      throw new Error("No PDF file provided");
    }

    const arrayBuffer = await pdfFile.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString("base64");
    
    const filename = `pa-${documentType}-${Date.now()}.pdf`;
    const uploadPath = `public/uploads/${filename}`;
    
    await uploadGithubBase64File(uploadPath, base64Data, `upload: PA ${documentType} PDF`);
    
    return { success: true, pdfUrl: `/uploads/${filename}` };
  } catch (error: any) {
    console.error("Failed to upload PA PDF", error);
    return { success: false, error: error.message || "Failed to upload PA PDF" };
  }
}

export async function savePaRecord(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const category = formData.get("category") as string;
    const indicator_code = formData.get("indicator_code") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const status = formData.get("status") as string || "published";
    
    const document_urls = JSON.parse(formData.get("document_urls") as string || "[]");
    const document_names = JSON.parse(formData.get("document_names") as string || "[]");
    const document_types = JSON.parse(formData.get("document_types") as string || "[]");

    const file = formData.get("file") as File | null;
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");
      const extension = file.name.split(".").pop();
      const filename = `pa-evidence-${Date.now()}.${extension}`;
      const uploadPath = `public/uploads/${filename}`;
      await uploadGithubBase64File(uploadPath, base64Data, `upload: ${filename}`);
      document_urls.push(`/uploads/${filename}`);
      document_names.push(file.name.replace(/\.[^.]+$/, ""));
      document_types.push(file.type || "application/octet-stream");
    }

    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    let data: any = { achievements: [], activities: [], paEvidence: [] };
    let sha = undefined;

    if (currentFile) {
      data = JSON.parse(currentFile.content);
      sha = currentFile.sha;
    }

    if (!data.paEvidence) data.paEvidence = [];

    const recordObj = {
      id: id || String(Date.now()),
      category,
      indicator_code,
      title,
      description,
      document_urls,
      document_names,
      document_types,
      status,
      date: new Date().toISOString()
    };

    if (id) {
      const index = data.paEvidence.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        data.paEvidence[index] = { ...data.paEvidence[index], ...recordObj };
      } else {
        data.paEvidence.unshift(recordObj);
      }
    } else {
      data.paEvidence.unshift(recordObj);
    }

    await updateGithubFile(CONTENT_FILE_PATH, JSON.stringify(data, null, 2), `update: PA record ${title}`, sha);

    revalidatePath("/pa");
    revalidatePath("/pa/report");
    revalidatePath("/admin/pa");
    revalidatePath("/admin/pa/report");

    return { success: true, record: recordObj };
  } catch (error: any) {
    console.error("Failed to save PA record", error);
    return { success: false, error: error.message || "Failed to save PA record" };
  }
}

export async function deletePaRecord(id: string) {
  try {
    const currentFile = await getGithubFileContent(CONTENT_FILE_PATH);
    if (!currentFile) throw new Error("Content file not found");

    const data = JSON.parse(currentFile.content);
    if (data.paEvidence) {
      data.paEvidence = data.paEvidence.filter((item: any) => item.id !== id);
    }

    await updateGithubFile(CONTENT_FILE_PATH, JSON.stringify(data, null, 2), `delete: PA record ${id}`, currentFile.sha);

    revalidatePath("/pa");
    revalidatePath("/pa/report");
    revalidatePath("/admin/pa");
    revalidatePath("/admin/pa/report");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
