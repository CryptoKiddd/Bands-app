import dbConnect from "@/libs/db_connector";
import { sanitizeRegisterUser } from "@/libs/validation/user";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import { formatZodError } from "@/libs/helpers/formatZodError";

export async function POST(req: Request) {
    await dbConnect();

    try {
        const body = await req.json();
        const sanitized = sanitizeRegisterUser.parse(body);

        const email = sanitized.email.toLowerCase();

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "Cannot register with this email" },
                { status: 403 }
            );
        }

        const hashedPassword = await bcrypt.hash(sanitized.password, 10);

        const user = await UserModel.create({
            username: sanitized.username,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({
            user: { username: user.username, email: user.email },
            message: "User registered successfully",
        });
    } catch (err: any) {
      const formattedError = formatZodError(err)
      return NextResponse.json(formattedError,{status:400})
    }
}
