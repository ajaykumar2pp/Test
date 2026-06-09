// import { prisma } from "../../../../lib/prisma.js";
// import { prisma } from "@/lib/prisma";
import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    // console.log("Received registration data:", body);
    const { name, email, gender, password } = body;

    // Validate inputs
    if (!name || !email || !gender || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const emailNormalized = email.toLowerCase();
    // console.log("prisma :", prisma);
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        fullName: name,
        email,
        password: hashedPassword,
        gender,
        role: "USER",
      },
    });
    // console.log("create user :", user);

    return NextResponse.json(
      { message: "User registered successfully.", userId: user.id },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
