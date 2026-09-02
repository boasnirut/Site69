import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "pa-agreement-2569.pdf");
  const file = await readFile(filePath);

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="pa-agreement-2569.pdf"',
      "Cache-Control": "public, max-age=3600"
    }
  });
}
