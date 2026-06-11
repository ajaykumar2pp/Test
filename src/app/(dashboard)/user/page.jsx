import Dashboard from "@/components/user/Dashboard";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata = {
  title: "User | Dashboard",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  const analyses = await prisma.resumeAnalysis.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalAnalyses = analyses.length;
  

  const totalSuggestions =
  (analyses?.improvementSuggestions?.length || 0) +
  (analyses?.careerCoach?.nextCareerSteps?.length || 0) +
  Object.values(
    analyses?.sectionWiseAnalysis || {}
  ).filter((section) => section?.suggestion).length;

  const dashboardStats = {
    totalAnalyses,
    totalSuggestions,
  };


  return (
    <>
      <Dashboard stats={dashboardStats} analyses={analyses} />
    </>
  );
};

export default page;
