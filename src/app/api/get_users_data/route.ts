import { NextRequest, NextResponse } from "next/server";
import { getUsersData } from "@/database/router";
import { encrypt, decrypt } from "@/utils";
import { SECRET_TOKEN } from "@/utils";

export async function GET(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "This method is not allowed!"}, {status:405})
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { data } = await req.json()
        const decrypted = await decrypt(data, SECRET_TOKEN!)
        const result = await getUsersData({ key: decrypted.key })
        const encrypted = await encrypt(result, SECRET_TOKEN!)
        return NextResponse.json({ data: encrypted }, {status:200})
    } catch (error) {
        console.error('Terjadi kesalahan:', error); 
        //
        return NextResponse.json({message: "Internal server error!"}, {status:500})
    }
}
