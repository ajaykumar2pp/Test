import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { role } = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // Prevent removing last admin
    if (
      user.role === "ADMIN" &&
      role === "USER"
    ) {
      const adminCount =
        await prisma.user.count({
          where: {
            role: "ADMIN",
          },
        });

      if (adminCount === 1) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Cannot remove the last admin.",
          },
          { status: 400 }
        );
      }
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Role updated successfully.",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update role.",
      },
      { status: 500 }
    );
  }
}