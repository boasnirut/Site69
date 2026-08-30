import { AdminModulePlaceholder } from "../components/AdminModulePlaceholder";
import { getAdminModule } from "../admin-modules";

export default function AdminSettingsPage() {
  const module = getAdminModule("settings");
  return module ? <AdminModulePlaceholder module={module} /> : null;
}
