import { NextResponse } from "next/server";
import MemberModel from "@/models/Memeber";
import dbConnect from "@/libs/db_connector";
import { MemberRequestInput, sanitizeMemberObject } from "@/libs/validation/member";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, context: Params) {
  await dbConnect();
  try {
    const { params } =  context;
    const member = await MemberModel.findById(params.id).populate("band");
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });
    return NextResponse.json(member, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid member ID" }, { status: 400 });
  }
}

export async function PUT(req: Request, context:Params) {
  await dbConnect();
  try {
    const { params } =  context;
    const body = await req.json();
    const parsed: MemberRequestInput = sanitizeMemberObject.parse(body); // ✅ sanitize + validate
     
    const member = await MemberModel.findByIdAndUpdate(params.id, parsed, { new: true });
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

    return NextResponse.json(member, { status: 200 });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation failed", details: err.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to update member" }, { status: 400 });
  }
}

export async function DELETE(_: Request,  context: Params) {
  await dbConnect();
  try {
        const { params } =  context;
        if(!params.id){
              return NextResponse.json({error:"Please provide id for member"}, { status: 400 });

        }

    const member = await MemberModel.findByIdAndDelete(params.id);
    if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });
   return new NextResponse(null, { status: 204 }); // ✅ No body

  } catch {
    return NextResponse.json({ error: "Failed to delete member" }, { status: 400 });
  }
}
