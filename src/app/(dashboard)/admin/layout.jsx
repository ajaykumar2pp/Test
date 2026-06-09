import { requireRole } from "@/lib/requireRole";

export default async function AdminLayout({ children }) {
  await requireRole(["ADMIN"]);
  return children;
}
