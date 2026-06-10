import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";


export async function GET() {
  const feedbacks = await prisma.feedback.findMany({
    include: {
      user: {
        select: {
          fullName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });

  return NextResponse.json({
    success: true,
    data: feedbacks,
  });
}