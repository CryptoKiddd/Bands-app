import dbConnect from "@/libs/db_connector";
import { BandRequestInput, sanitizeBandsObject } from "@/libs/validation/band";
import BandModel, { IBand } from "@/models/Band";
import { NextResponse } from "next/server";




export async function GET() {
  await dbConnect();
  try {
    const bands = await BandModel.find({}).populate("members");;
    return NextResponse.json(bands, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch bands" },
      { status: 500 }
    );
  }
}



export async function POST(req: Request) {
    await dbConnect()

    try {
        const unsinitizedRequest:Request = await req.json();
        const sanitizedBandsObject:BandRequestInput = sanitizeBandsObject.parse(unsinitizedRequest);

        const band = await BandModel.create(sanitizedBandsObject)

        return NextResponse.json(band, { status: 201 });


    } catch (err: any) {
        if (err.name === "ZodError") {
            return NextResponse.json(
                { error: "Validation failed", details: err.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: "Faildet to create Band", details: err.message },
            { status: 400 }
        );


    }
}