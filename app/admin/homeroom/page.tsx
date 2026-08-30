import { AdminModulePlaceholder } from "../components/AdminModulePlaceholder";
import { getAdminModule } from "../admin-modules";

export default function AdminHomeroomPage() {
  const module = getAdminModule("homeroom");
  return module ? <AdminModulePlaceholder module={module} /> : null;
}
