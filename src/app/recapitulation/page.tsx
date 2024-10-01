"use client"

import MenuNavigation from "@/components/MenuNavigation"
import Footer from "@/components/Footer";
import font from '@/utils/Font';
import RecapitulationCharts from "@/components/RecapitulationCharts";
import { secureTheWeb } from "@/utils";
import { useRouter } from "next/navigation";
import { Button } from '@chakra-ui/react';
import { useState } from "react"

export default function RecapitulationPage() {
	const router = useRouter()
	secureTheWeb(router)
	const [realCountStatus, setRealCountStatus] = useState<boolean>(false) // default false
  return(
		<main className="block overflow-x-hidden">
			<MenuNavigation title="Rekapitulasi dan Real Count" />
			<div className="flex justify-center w-screen md:mt-0 mt-8">
				<div className={`${font.primary} flex flex-col min-h-screen w-full md:max-w-1/2 h-full justify-center items-center text-white`}>
					<Button 
						bg={"white"}
						className={`${font.primary} mt-28`}
						onClick={()=>setRealCountStatus(!realCountStatus)}
					>
						{realCountStatus ? "Close Real Count" : "Open Real Count"}
					</Button>
					<h1 className={`${realCountStatus ? "" : "hidden"} text-5xl font-bold p-12 w-full flex justify-center text-center mt-12`}>Real Count</h1>
					<div className={`${realCountStatus ? "" : "hidden"}`}>
						<RecapitulationCharts />
					</div>
        </div>
			</div>
			<Footer/>
		</main>
  )
}