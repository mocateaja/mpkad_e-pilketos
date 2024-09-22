"use client"

import MenuNavigation from "@/components/MenuNavigation"
import Footer from "@/components/Footer";
import font from '@/utils/Font';
import RecapitulationCharts from "@/components/RecapitulationCharts";
import { secureTheWeb } from "@/utils";
import { useRouter } from "next/navigation";

export default function RecapitulationPage() {
	const router = useRouter()
	secureTheWeb(router)
  return(
		<main className="block overflow-x-hidden">
			<MenuNavigation title="Rekapitulasi dan Real Count" />
			<div className="flex justify-center w-screen md:mt-0 mt-8">
				<div className={`${font.primary} flex flex-col min-h-screen w-full md:max-w-1/2 h-full justify-center items-center text-white`}>
					<h1 className="text-5xl font-bold p-12 w-full flex justify-center text-center">Real Count</h1>
					<RecapitulationCharts />
        </div>
			</div>
			<Footer/>
		</main>
  )
}