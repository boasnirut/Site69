import { fetchContent } from "../actions";
import type { AdminContentData } from "../actions";
import { AdminContentWorkbench } from "../components/AdminContentWorkbench";

export const dynamic = "force-dynamic";

export default async function AdminAchievementsPage() {
  const content = (await fetchContent()) as AdminContentData;

  return <AdminContentWorkbench collection="achievements" initialRecords={content.achievements || []} />;
}
