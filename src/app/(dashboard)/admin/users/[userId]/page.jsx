import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import UserDetailsPage from "@/components/user/UserDetailsPage";


export const metadata = {
  title: "Admin | User Details Page",
};

export default async function UsersPage({ params }) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
      role: "USER",
    },

    include: {
      resumeAnalyses: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  // const resumeAnalysis = await prisma.resumeAnalysis.findUnique({
  //   where: {
  //     id: userId,
  //   },
  // });

  // console.log("Fetched user resume analysis:", user.resumeAnalyses);


  return <UserDetailsPage user={user} />;
}
