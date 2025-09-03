import dbConnect from "@/libs/db_connector";
import { MemberRequestInput, sanitizeMemberObject } from "@/libs/validation/member";
import MemberModel from "@/models/Memeber";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect()

    try {
        const members = await MemberModel.find({}).populate('band')
        if(!members){
                    return NextResponse.json({ message:"No members found" }, { status: 200 })

        }
        return NextResponse.json({ members }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });

    }
}

export async function POST(req: Request) {
    await dbConnect;

    try {
        const unsinitizedRequest = await req.json()
        const sanitizedMembersObject: MemberRequestInput = sanitizeMemberObject.parse(unsinitizedRequest)

        const member = await MemberModel.create(sanitizedMembersObject)
        return NextResponse.json(member, { status: 201 });


    } catch (err: any) {
        if (err.name === "ZodError") {
            return NextResponse.json(
                { error: "Validation failed", details: err.errors },
                { status: 400 }
            );
        }
        return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
    }
}

