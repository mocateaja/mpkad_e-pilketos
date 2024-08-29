import { NextRequest, NextResponse } from "next/server";
import { getCandidatesRecaptulation } from "@/database/router";
import { encrypt } from "@/utils";
import { SECRET_TOKEN } from "@/utils";

export async function POST(req: NextRequest, res: NextResponse) {
    return NextResponse.json({ message: "This method is not allowed!"}, {status:405})
}

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const data = await getCandidatesRecaptulation()
        const encrypted = await encrypt(data, SECRET_TOKEN!)
        return NextResponse.json({ data: encrypted }, {status:200})
    } catch (error) {
        console.error('Terjadi kesalahan:', error); 
        //
        return NextResponse.json({message: "Internal server error!"}, {status:500})
    }
}
