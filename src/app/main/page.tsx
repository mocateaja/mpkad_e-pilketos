"use client"

import MenuNavigation from "@/components/MenuNavigation"
import Footer from "@/components/Footer";
import CandidatePage from "@/components/CandidatePage";
import font from '@/utils/Font';
import { useState, useEffect, Suspense } from "react";
import { getCandidatesData } from "@/utils";
import { useDisclosure, useToast } from "@chakra-ui/react";
import ClientLoginModal from "@/components/ClientLoginModal";
import { motion } from "framer-motion"

type ClientData = {
	id: number,
	nis: string,
	name: string,
	class: string,
	vote_status: boolean,
	token_id: number
}

type CandidateData = {
	id: number,
	name: string,
	class: string,
	vission: string,
	mission: string,
	position: string,
	imageurl: string
}

export default function PilketosPage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [loginStatus, setLoginStatus] = useState<boolean>(false); // default false
	const [clientData, setClientData] = useState<ClientData[]>()
	const [nisClient, setNisClient] = useState<string>("")
	const [tokenIdClient, setTokenIdClient] = useState<number>()
	const [nameClient, setNameClient] = useState<string>("")
	const [candidatesData, setCandidatesData] = useState<CandidateData[]>([])
	const toast = useToast();
  
	const handleLoginResult = (result: boolean) => {
		setLoginStatus(result);
	};
	const handleLoginResultdData = (id: number, nis: string, name: string, classx: string, vote_status: boolean, token_id: number) => {
		setClientData([{
			id: id,
			nis: nis,
			name: name,
			class: classx,
			vote_status: vote_status,
			token_id: token_id
		}])
		setNisClient(nis)
		setTokenIdClient(token_id)
		setNameClient(name)
		name = name.replace(
			/(\w)(\w*)/g,
			(_, firstChar, rest) => firstChar + rest.toLowerCase()
		);
		toast({
      position: "top",
      title: "Login berhasil!",
      description: `Anda login sebagai ${name} dengan ID ${nis}`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
	}

	async function reFetch() {
		const candidatesData = await getCandidatesData()
		setCandidatesData(candidatesData)
	}
	
	useEffect(() => {
		let fetchStatus = false;
		loginStatus ? null : onOpen();
		if (!fetchStatus) {
			(async()=>{
				fetchStatus = true
				const candidatesData = await getCandidatesData()
				setCandidatesData(candidatesData)
				if (candidatesData.length < 0) {
					await reFetch()
				}
				/* alert(JSON.stringify(candidatesData)) */
			})()
		}
	},[loginStatus, onOpen])
	
  return (
		<main className="flex flex-col min-h-screen w-screen max-w-screen justify-center overflow-x-hidden">
			<div className="block md:hidden h-auto">
				<Suspense fallback={<div>Loading...</div>}>
					<ClientLoginModal             
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose} 
						onLoginResult={handleLoginResult}
						onLoginResultData={handleLoginResultdData}
					/>
      	</Suspense>
				<MenuNavigation title="Pencoblosan" />
				<CandidatePage nis={nisClient} token_id={tokenIdClient!} candidatesData={candidatesData}/>
			</div>
			<div className={`${font.primary} hidden md:flex p-6 z-40 h-screen text-center justify-center`}>
				<div className={`w-1/2`}>
					<h1 className="text-2xl text-white w-auto">
						Website tidak mengizinkan untuk ukuran layar perangkat anda!
					</h1>
					<p className="text-white w-auto mt-4">
						Note: ubah dpi pada pengaturan perangkat anda agar ukuran layar menjadi sesuai dengan perangkat pada umumnya
					</p>
				</div>
			</div>
			<Footer/>
		</main>
	);
}
