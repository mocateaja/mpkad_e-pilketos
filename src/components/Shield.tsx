"use client"

import { useEffect, useState } from "react"
import { getIPAddress, localStorage, whiteList } from "@/utils"

interface IPAddress {
  id: number;
  ipaddress: string;
}

const Shield = () => {
  const [secureStatus, setSecureStatus] = useState<boolean>(false)
  const [ipAddress, setIpAddress] = useState<string | null>(localStorage.get("ip"))
  const [whiteListIP, setWhiteListIP] = useState<IPAddress[]>([])

  function arrayIncludes(array: IPAddress[], ipToFind: string): boolean {
    for (let i = 0; i < array.length; i++) {
        if (array[i].ipaddress === ipToFind) {
            return true;
        }
    }
    return false;
  }

  function secure(ip: string) {
    const checkResult = arrayIncludes(whiteListIP, ip)
    setSecureStatus(checkResult)
  }

  useEffect(() => {
    (async()=>{
      if (!ipAddress || ipAddress === null || ipAddress === "") {
        const ip = await getIPAddress()
        localStorage.set("ip", ip)
        setIpAddress(ip)
      } else {
        const whiteListIP = await whiteList.get();
        setWhiteListIP(whiteListIP)
        secure(ipAddress)
      }
    })()
  }, [ipAddress])
  return(
    secureStatus === false ? (
      <div className="absolute w-screen max-w-screen h-full top-0">
        ILEGAL
      </div>
    ) : (
      <div className="absolute w-screen max-w-screen h-full top-0">
        LEGAL
      </div>
    )
  )
}

export default Shield