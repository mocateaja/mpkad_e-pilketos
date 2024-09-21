import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/utils";
import { SECRET_TOKEN } from "@/utils";
import { whiteList } from "@/database/router";
import { kv } from '@vercel/kv';

const KV_STORAGE_KEY = 'app_data_storage';

export async function GET(req: NextRequest, res: NextResponse) {
  return NextResponse.json(
    { message: "This method is not allowed!" },
    { status: 405 }
  );
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { data } = await req.json();
    const decrypted = await decrypt(data, SECRET_TOKEN!);

    const result = await whiteList({
      t: decrypted.t,
      ipaddress: decrypted?.ipaddress,
    });

    if (result !== null) {
      const encrypted = await encrypt(result, SECRET_TOKEN!);

      if (decrypted.t === 'get') {
        let existingData: any = [];
        try {
          // Membaca data dari Vercel KV
          existingData = await kv.get(KV_STORAGE_KEY) || [];
        } catch (err) {
          console.error('Gagal membaca data dari Vercel KV:', err);
        }

        existingData.push(result);

        try {
          // Menyimpan data ke Vercel KV
          await kv.set(KV_STORAGE_KEY, existingData);
          console.log('Data berhasil disimpan ke Vercel KV.');
        } catch (err) {
          console.error('Gagal menyimpan ke Vercel KV:', err);
          return NextResponse.json(
            { message: 'Gagal menyimpan data ke Vercel KV!' },
            { status: 500 }
          );
        }
      }

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