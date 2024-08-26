import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "../../../utils";
import { SECRET_TOKEN } from "../../../utils";
import { vote } from "@/database/router";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "This method is not allowed!"}, {status:405})
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json()
    const decrypted = await decrypt(data, SECRET_TOKEN!)
    const loginResult = await vote({ 
        nis: decrypted,
        vote_one: decrypted,
        vote_two: decrypted,
        token_id: decrypted
    })
    return NextResponse.json({ data: loginResult }, {status:200}) 
  } catch (error) {
    console.error('Terjadi kesalahan:', error); 
    //
    return NextResponse.json({message: "Internal server error!"}, {status:500})
  }
}
