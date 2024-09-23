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
    } else if (localStorageVerificationId === verificationId) {
      setVerificationStatus(true)
    }
  }, [verificationId])
  return(
    <>
      {verificationStatus ? (
        <>
          HELLO
        </>
      ) : router.push("/blocked")}
    </>
  )
}