import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/utils";
import { SECRET_TOKEN } from "@/utils";
import { getVotesInformation } from "@/database/router";

export async function GET(req: NextRequest, res: NextResponse) {
  await getVotesInformation()
  return NextResponse.json(
    { message: "This method is not allowed!" },
    { status: 405 }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const result = await getVotesInformation()

    if (result !== null) {
      const encrypted = await encrypt(result, SECRET_TOKEN!);
      return NextResponse.json({ data: encrypted }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Request failed!" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    return NextResponse.json(
      { message: "Internal server error!" },
      { status: 500 }
    );
  }
}
