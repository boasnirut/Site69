import { fetchContent } from "../actions";
import { AdminRecordManager } from "../components/AdminRecordManager";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const data = await fetchContent();
  const achievements = data.achievements || [];

  return (
    <div className="space-y-6">
      <AdminRecordManager 
        type="achievements"
        title="ผลงานและรางวัล"
        eyebrow="ACHIEVEMENTS & AWARDS"
        categories={[
          "รางวัลและผลงานตนเอง",
          "รางวัลและผลงานผู้เรียน",
          "รางวัลผลงานสถานศึกษา",
          "Best Practice / นวัตกรรม",
          "งานวิจัยในชั้นเรียน",
          "การอบรมและสัมมนา",
          "การเสริมสร้างทักษะ"
        ]}
        items={achievements}
      />
    </div>
  );
}
