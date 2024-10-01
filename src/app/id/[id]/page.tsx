"use client"

import { localStorage } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// This page is only a temporary page and is used to flatter users for participating

export default function Page({ params }: { params: { id: string } }) {
  const verificationId: string | null = params.id;
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<boolean>(true) // Default false

  useEffect(() => {
    const localStorageVerificationId = localStorage.get("verification_id")
    if (localStorageVerificationId === null || localStorageVerificationId === "" || !localStorageVerificationId) {
      setVerificationStatus(false)
      router.push("/blocked")
    } else if (localStorageVerificationId === verificationId) {
      setVerificationStatus(true)
    }
  }, [router, verificationId])
  return(
    <div>
      {verificationStatus ? (
        <div className="w-screen min-w-screen flex justify-center items-center mt-12">
          <div>
            <p className="w-auto flex justify-center items-center text-white text-md">Kode Pencoblosan Anda</p>
            <div className="w-auto flex justify-center items-center">
              <h1 className="text-5xl p-5 text-white font-bold">{verificationId}</h1>
            </div>
            <div className="flex w-full justify-center">
              <p className="w-auto max-w-[95%] flex justify-center items-center text-white text-md text-center">
              Terima Kasih atas Partisipasi Anda!
              Suara Anda telah berhasil tercatat dalam PILKETOS 2024.
              Kontribusi Anda sangat berarti bagi kemajuan sekolah kita.
              Tetap semangat dan mari kita nantikan hasil pemilihan bersama-sama!
              #SuaraSiswaSuaraPerubahan #PILKETOS2024
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}