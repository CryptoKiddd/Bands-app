import dbConnect from "@/libs/db_connector";
import { formatZodError } from "@/libs/helpers/formatZodError";
import { BandRequestInput, sanitizeBandsObject } from "@/libs/validation/band";
import BandModel from "@/models/Band";
import MemberModel from "@/models/Memeber";
import { NextResponse } from "next/server";



export async function GET() {
  await dbConnect();
  try {
    const members = MemberModel.find({})
    const bands = await BandModel.find({}).populate("members");
    if(bands.length <= 0 ){
       return NextResponse.json({message:"No bands"}, { status: 200 });
    }
    return NextResponse.json(bands, { status: 200 });
  } catch (err:any) {
    return NextResponse.json(
      { error: "Failed to fetch bands", details:err.message },
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
      const formattedError = formatZodError(err)
      return NextResponse.json(formattedError, {status:400})

    }
}