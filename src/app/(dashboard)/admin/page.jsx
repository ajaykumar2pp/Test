import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/admin/Dashboard";

export const metadata = {
  title: "Admin | Dashboard",
};

export default async function AdminPage() {


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
    totalFeedbacks
    
  };

  return <Dashboard stats={stats} />;
}
