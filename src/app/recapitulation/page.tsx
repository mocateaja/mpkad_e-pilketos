"use client"

import MenuNavigation from "@/components/MenuNavigation"
import Footer from "@/components/Footer";
import font from '@/utils/Font';
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import RecapitulationCharts from "@/components/RecapitulationCharts";

export default function RecapitulationPage() {
  return(
		<main className="flex flex-col min-h-screen w-screen max-w-screen justify-center overflow-x-hidden">
			<div className="block">
				<div className={`${font.primary} flex flex-col min-h-screen min-w-screen h-full items-center justify-start text-white`}>
          <RecapitulationCharts />
        </div>
			</div>
			<Footer/>
		</main>
  )
}