import { fetchContent } from "../actions";
import { AdminRecordManager } from "../components/AdminRecordManager";

export const dynamic = "force-dynamic";

export default async function AdminActivitiesPage() {
  const data = await fetchContent();
  const activities = data.activities || [];

  return (
    <div className="space-y-6">
      <AdminRecordManager 
        type="activities"
        title="ภาพกิจกรรม"
        eyebrow="ACTIVITY GALLERY"
        categories={[
          "กิจกรรมการเรียนรู้",
          "กิจกรรมพัฒนาผู้เรียน",
          "กิจกรรมส่งเสริมคุณธรรม",
          "กิจกรรมสัมพันธ์ชุมชน"
        ]}
        items={activities}
      />
    </div>
  );
}
