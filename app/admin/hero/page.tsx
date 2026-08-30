import { AdminModulePlaceholder } from "../components/AdminModulePlaceholder";
import { getAdminModule } from "../admin-modules";

export default function AdminHeroPage() {
  const module = getAdminModule("hero");
  return module ? <AdminModulePlaceholder module={module} /> : null;
}
