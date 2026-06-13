import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ResumeResult from "@/components/user/ResumeResult";

export const metadata = {
  title: "Resume Result | Users",
};

export default async function UsersPage({ params }) {
  const { id } = await params;
  // console.log("Received ID:", id);

  const resumeAnalysis = await prisma.resumeAnalysis.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!resumeAnalysis) {
    notFound();
  }

  // console.log(resumeAnalysis);

  return <ResumeResult resumeAnalysis={resumeAnalysis} />;
}
