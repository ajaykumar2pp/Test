import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    // console.log("Deleting user with id:", id);
    await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    // console.error(err);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 },
    );
  }
}
