import { Nova_Square } from "next/font/google";
import Footer from "@/components/Footer";
import Link from "next/link";
import font from "@/utils/Font"

export default function NotFound() {
  return (
    <main
      className={`flex flex-col max-w-screen overflow-x-hidden ${font.primary}`}
    >
      <div className="min-h-[75vh] flex justify-center items-center">
        <div className="flex flex-col justify-center gap-2">
          <h1 className="text-5xl text-white text-center">404</h1>
          <p className="text-white">Halaman tidak dapat ditemukan!</p>
          <Link className="text-center text-primary" href={"/"}>
            Kembali
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
