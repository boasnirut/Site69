import { fetchContent } from "@/app/admin/actions";
import { getPageVisuals } from "@/lib/site-data";
import { HeroSettingsForm } from "./HeroSettingsForm";

export default async function HeroSettingsPage() {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">ข้อความและรูปหน้าปก (Hero)</h1>
        <p className="text-white/60 text-sm">จัดการรูปภาพและข้อความที่แสดงเป็นหัวข้อในแต่ละหน้า</p>
      </div>
      <HeroSettingsForm initialVisuals={visuals} />
    </div>
  );
}
