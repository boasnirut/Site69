import { AdminModulePlaceholder } from "../components/AdminModulePlaceholder";
import { getAdminModule } from "../admin-modules";

export default function AdminPaPage() {
  const module = getAdminModule("pa");
  return module ? <AdminModulePlaceholder module={module} /> : null;
}
