import { requireRole } from "@/lib/requireRole";

export default async function UserLayout({ children }) {
  await requireRole(["USER"]);
    return children;
}