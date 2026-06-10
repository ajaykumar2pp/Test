import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const userId = session.user.id;

    const body = await request.json();

    const { rating, message } = body;

    if (!rating || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    console.log("Existing User", existingUser);

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found in database",
        },
        { status: 404 },
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        rating,
        message,
        userId: userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully.",
        data: feedback,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Feedback Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
