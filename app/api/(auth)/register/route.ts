import dbConnect from "@/libs/db_connector";
import { sanitizeRegisterUser } from "@/libs/validation/user";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const body = await req.json();
    const sanitized = sanitizeRegisterUser.parse(body);

    const existingUser = await UserModel.findOne({ email: sanitized.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "This email is already registered" },
        { status: 403 }
      );
    }

    const user = await UserModel.create(sanitized);

    return NextResponse.json({
      user,
      message: "User registered successfully",
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to register user", details: err.message },
      { status: 500 }
    );
  }
}
