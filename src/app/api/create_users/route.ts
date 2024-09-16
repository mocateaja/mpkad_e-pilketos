import { NextRequest, NextResponse } from "next/server";
import { encrypt, decrypt } from "../../../utils";
import { SECRET_TOKEN } from "../../../utils";
import { bulkCreateUsers } from "@/database/router";

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "This method is not allowed!"}, {status:405})
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json()
    const decrypted = await decrypt(data, SECRET_TOKEN!)
    console.log(decrypted)
    const createUsers = "dasdasdada"
    const encryptedData = await encrypt(createUsers, SECRET_TOKEN!)
    return NextResponse.json({ data: encryptedData }, {status:200}) 
  } catch (error) {
    console.error('Terjadi kesalahan:', error); 
    //
    return NextResponse.json({message: "Internal server error!"}, {status:500})
  }
}
