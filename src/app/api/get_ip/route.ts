import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  return NextResponse.json({ message: "This method is not allowed!"}, {status:405})
}

export async function GET(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    req.ip;
  return new Response(JSON.stringify({ ip }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
