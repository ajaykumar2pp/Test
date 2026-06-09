import { prisma } from "@/lib/prisma";
import UsersTable from "@/components/admin/UsersTable";

export const metadata = {
  title: "Admin | Users",
};

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },

    include: {
      resumeAnalyses: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  // console.log("Fetched users:", users);

  return <UsersTable users={users} />;
}
