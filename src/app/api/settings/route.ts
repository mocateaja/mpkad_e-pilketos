import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "@/utils";
import { SECRET_TOKEN } from "@/utils";
import { whiteList } from "@/database/router";
import fs from "fs/promises";
import path from "path";

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
        const filePath = path.join(process.cwd(), 'src/data.json'); 

        let existingData = [];
        try {
          const fileContent = await fs.readFile(filePath, 'utf8');
          existingData = JSON.parse(fileContent);
        } catch (err) {
          console.error('File tidak ditemukan, membuat file baru:', err);
        }

        existingData.push(result);

        try {
          await fs.writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf8');
          console.log('Data berhasil ditulis ke file JSON.');
        } catch (err) {
          console.error('Gagal menulis ke file JSON:', err);
          return NextResponse.json(
            { message: 'Gagal menyimpan data ke file JSON!' },
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
