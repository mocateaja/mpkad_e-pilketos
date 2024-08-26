import React, { useEffect } from 'react';
import Image from "next/image"
import UserLogo from "@/asset/image/example.png"
import font from '@/utils/Font';
import { useState } from 'react';
import { 
	Button 
} from "@chakra-ui/react"
import { clientVoting } from '@/utils';

type CandidateData = {
	id: number,
	name: string,
	class: string,
	vission: string,
	mission: string,
	position: string,
	imageURL: string
}

interface CandidatePageProps {
	nis: string,
	token_id: number,
	candidatesData: CandidateData[]
}

const CandidatePage: React.FC<CandidatePageProps> = ({ nis, token_id, candidatesData }) => {
	const [voteSection, setVoteSection] = useState<boolean>(false)
	const [candidateData, setCandidateData] = useState<CandidateData[]>([])
	const [mitratama, setMitratama] = useState<number>()
	const [mitramuda, setMitramuda] = useState<number>()

	useEffect(() => {
		setCandidateData(candidatesData)
	})

  return (
    <div className={`${font.primary} flex flex-col min-h-screen min-w-screen h-full items-center justify-start text-white`}>
			{!voteSection ? (
				<div className="w-full h-full flex flex-col justify-center items-start">
					<div className="w-full h-auto flex flex-col justify-center items-end">	
						<div className="w-full h-full p-10">
							<div className="w-full h-full flex flex-col items-center bg-transparent rounded-xl">
								<div className="absolute w-full flex flex-col items-center">
									<h2 className={`${font.tertiary[800].className} text-[5.4rem] sm:text-[8.5rem] -mt-28 z-10`}>
										{/* 
											BAGIAN INI NANTI AKAN MENGGUNAKAN DATA YANG ADA DAN INI HANYALAH SEBAGAI CONOH SAJA
										*/}
										SAKTI
									</h2>
									<p className="w-full text-center -mt-32">
										Mitratama
									</p>
								</div>
								<div className="absolute -mt-28 w-0 h-0 hidden overflow-x-hidden border-solid border-[9.9rem] border-t-transparent scale-125 border-r-transparent border-b-primary border-l-transparent transform rotate-0"></div>
								<Image height={0} width={0} src={UserLogo} alt="" className="w-full z-10 h-full scale-150"/>
							</div>
						</div>
						<div className="absolute z-20 flex justify-center w-full bg-gradient-to-b from-transparent via-secondary to-secondary h-[30rem] mt-72">
						</div>
					</div>
					<div>
						<div className="absolute flex flex-row w-screen h-auto -mt-20 z-30">
							<div className="grow flex justify-center flex-row gap-x-2">
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center select-none">
									<p>1</p>
								</div>
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center mt-4 select-none">
									<p>2</p>
								</div>
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center mt-6 select-none">
									<p>3</p>
								</div>
							</div>
							<div className="grow flex justify-center flex-row gap-x-2">
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center mt-6 select-none">
									<p>1</p>
								</div>
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center mt-4 select-none">
									<p>2</p>
								</div>
								<div className="w-12 h-12 bg-quatenary shadow-md rounded-full flex justify-center items-center select-none">
									<p>3</p>
								</div>
							</div>
						</div>
					</div>
					<div className="p-4 w-full flex justify-center items-center -mt-10">
						<div className="w-full h-auto flex flex-col bg-primary z-20 rounded">
							<div className="bg-secondary w-full h-14 rounded-b-[100%]" />
							<div className="w-full h-auto bg-primary flex flex-col items-center p-6">
								<div>
									<h3 className="py-2 text-lg font-semibold select-auto">
										Visi
									</h3>
									<p className="tetx-justify select-auto">
										{/* 
											BAGIAN INI NANTI AKAN MENGGUNAKAN DATA YANG ADA DAN INI HANYALAH SEBAGAI CONOH SAJA
										*/}
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ratione nesciunt iusto rerum tempore quam animi minus explicabo, amet fugit, iure odit. Incidunt id a sint sapiente nihil reiciendis fugit?Z
									</p>
									<h3 className="py-2 mt-2 text-lg font-semibold select-auto">
										Misi
									</h3>
									<p className="tetx-justify select-auto">
										{/* 
											BAGIAN INI NANTI AKAN MENGGUNAKAN DATA YANG ADA DAN INI HANYALAH SEBAGAI CONOH SAJA
										*/}
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ratione nesciunt iusto rerum tempore quam animi minus explicabo, amet fugit, iure odit. Incidunt id a sint sapiente nihil reiciendis fugit?
									</p>
								</div>		
							</div>
							<div className="bg-secondary w-full h-16" />
							<div className="bg-primary -mt-20 w-full h-16 rounded-b-[100%] flex justify-end items-end">
								<Button bg={"white"} className={`${font.primary}`} onClick={() => setVoteSection(true)}>
										Lanjut
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col justify-center items-start">
					<div className="w-full p-6 bg-red-500 h-96 flex justify-center items-center">
						<div className="grid grid-cols-3 grid-rows-4 gap-2 h-auto">
							<div className="row-start-1 col-span-3 bg-blue-500"></div>
							<div className="row-start-2 w-full bg-green-500"></div>
							<div className="bg-green-500"></div>
							<div className="bg-green-500"></div>
							<div className="row-start-2 col-span-3 bg-blue-500"></div>
							<div className="bg-green-500"></div>
							<div className="bg-green-500"></div>
							<div className="bg-green-500"></div>
						</div>
					</div>
				</div>
			)}
    </div>
  );
};

export default CandidatePage;


/* 
	const candidates: CandidateData[] = [
  {
    name: "Kandidat 1",
    class: "Kelas XII IPA 1",
    vission: "Menjadikan OSIS sebagai wadah pengembangan potensi siswa yang inovatif dan berdaya saing.",
    mission: "Mengadakan pelatihan kepemimpinan, mendorong partisipasi dalam kompetisi akademik dan non-akademik, serta memfasilitasi kegiatan sosial kemasyarakatan.",
    videoUrl: "https://example.com/video1.mp4"
  },
  {
    name: "Kandidat 2",
    class: "Kelas XI IPS 2",
    vission: "Menciptakan lingkungan sekolah yang inklusif, kreatif, dan berwawasan lingkungan.",
    mission: "Menyelenggarakan program peduli lingkungan, mendukung kegiatan seni dan budaya, serta mengembangkan sistem komunikasi antar siswa yang efektif.",
    videoUrl: "https://example.com/video2.mp4"
  },
  {
    name: "Kandidat 3",
    class: "Kelas XII IPA 3",
    vission: "Membangun karakter siswa yang berintegritas, berprestasi, dan berjiwa sosial tinggi.",
    mission: "Mengadakan seminar motivasi, membentuk kelompok belajar lintas angkatan, dan menginisiasi program bakti sosial rutin.",
    videoUrl: "https://example.com/video3.mp4"
  },
  {
    name: "Kandidat 4",
    class: "Kelas XI IPA 2",
    vission: "Mewujudkan OSIS sebagai pelopor inovasi dan teknologi dalam kegiatan kesiswaan.",
    mission: "Mengembangkan platform digital untuk kegiatan OSIS, menyelenggarakan workshop teknologi, dan mendorong penggunaan teknologi dalam pembelajaran.",
    videoUrl: "https://example.com/video4.mp4"
  },
  {
    name: "Kandidat 5",
    class: "Kelas XII IPS 1",
    vission: "Membangun jiwa kewirausahaan dan kepemimpinan di kalangan siswa.",
    mission: "Mengadakan bazar kewirausahaan siswa, menyelenggarakan pelatihan public speaking, dan membentuk klub debat sekolah.",
    videoUrl: "https://example.com/video5.mp4"
  },
  {
    name: "Kandidat 6",
    class: "Kelas XI IPA 1",
    vission: "Menjadikan OSIS sebagai jembatan antara siswa, guru, dan masyarakat untuk kemajuan bersama.",
    mission: "Mengadakan forum diskusi rutin antara siswa dan guru, menginisiasi program magang siswa di masyarakat, dan mengorganisir kegiatan bakti sosial lintas sekolah.",
    videoUrl: "https://example.com/video6.mp4"
  }
];
*/