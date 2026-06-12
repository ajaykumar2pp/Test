import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/admin/Dashboard";

export const metadata = {
  title: "Admin | Dashboard",
};

export default async function AdminPage() {

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

  take: 5,
});

  console.log("Admin User Data List :", users);

  const totalUsers = await prisma.user.count({
    where: {
      role: "USER",
    },
  });

  const totalAdmins = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  const totalResumes = await prisma.resumeAnalysis.count();

  const totalFeedbacks = await prisma.feedback.count();

  const stats = {
    totalUsers,
    totalAdmins,
    totalResumes,
    totalFeedbacks,
    users
  };

  return <Dashboard stats={stats} />;
}
