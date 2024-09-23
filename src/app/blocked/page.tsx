import font from '@/utils/Font';
import Link from 'next/link';

export default function BlockedPage() {
  return(
    <div className={`${font.primary} flex p-6 min-h-screen h-full w-screen bg-primary top-0 text-center justify-center z-[151]`}>
      <div className="">
        <h1 className="text-2xl text-white w-auto">
          Anda tidak mempunyai hak untuk mengakses halaman yang anda tuju!
        </h1>
        <p className="text-white w-auto mt-4 mb-6">
          Note: silahkan datang ke tempat pencoblosan atau ikuti aturan yang ada untuk dapat mengakses
        </p>
        <Link className="text-center text-white mt-8" href={"/"}>
          Kembali
        </Link>
      </div>
    </div>
  )
}