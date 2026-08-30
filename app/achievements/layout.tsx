
import { PageHero } from "@/components/PageHero";
import { getPageVisuals } from "@/lib/site-data";
import { fetchContent } from "@/app/admin/actions";
import { AchievementSubNav } from "@/components/AchievementSubNav";

export default async function AchievementsLayout({ children }: { children: React.ReactNode }) {
  const content = await fetchContent();
  const visuals = getPageVisuals(content);

  return (
    <>
      <PageHero {...visuals.achievements} />
      <AchievementSubNav />
      {children}
    </>
  );
}
