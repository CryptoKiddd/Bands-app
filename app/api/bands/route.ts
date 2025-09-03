import dbConnect from "@/libs/db_connector";
import * as z from 'zod'
import BandModel, { IBand } from "@/models/Band";
import { NextResponse } from "next/server";

const sanitizeBandsObject = z.object({
    name: z.string().min(1),
    genre: z.string().optional(),
    description: z.string().optional(),
    image: z.string().url().optional(),
})



export async function GET() {
  await dbConnect();
  try {
    const bands = await BandModel.find({});
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
        const unsinitizedRequest = await req.json();
        const sanitizedBandsObject = sanitizeBandsObject.parse(unsinitizedRequest);

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
            { error: "Faildet to create Band", details: err.errors },
            { status: 400 }
        );


    }
}