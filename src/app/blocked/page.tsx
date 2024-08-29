import font from '@/utils/Font';

export default function BlockedPage() {
  return(
    <div className={`${font.primary} flex p-6 min-h-screen h-full w-screen bg-primary top-0 text-center justify-center z-[151]`}>
      <div className="">
        <h1 className="text-2xl text-white w-auto">
          Anda tidak mempunyai hak untuk mengakses website ini!
        </h1>
        <p className="text-white w-auto mt-4">
          Note: silahkan datang ke tempat pencoblosan untuk dapat mengakses website ini
        </p>
      </div>
    </div>
  )
}