import { prisma}  from "@/lib/prisma";
import Dashboard from "@/components/admin/Dashboard";


export const metadata = {
  title: "Admin | Dashboard",
};


export default async function AdminPage() {
const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      gender: true,
      createdAt: true,
    },
  });

  return (
    <Dashboard users={users} />
  );
}