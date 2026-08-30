import { Images } from "lucide-react";
import { ActivityGallery } from "@/components/ActivityGallery";
import { PageHero } from "@/components/PageHero";
import { getPageVisuals, getActivityGallery } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  const contentData = await fetchContent();
  const galleryData = getActivityGallery(contentData.activities || []);  const visuals = getPageVisuals(contentData);

  return (
    <>
      <PageHero {...visuals.activities} />

      <ActivityGallery initialActivities={galleryData} />

    </>

  );
}
