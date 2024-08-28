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
    const voteResult = await vote({ 
        nis: decrypted.nis,
        vote_one: decrypted.vote_one,
        vote_two: decrypted.vote_two,
        token_id: decrypted.token_id
    })
    return NextResponse.json({ data: voteResult }, {status:200}) 
  } catch (error) {
    console.error('Terjadi kesalahan:', error); 
    //
    return NextResponse.json({message: "Internal server error!"}, {status:500})
  }
}
