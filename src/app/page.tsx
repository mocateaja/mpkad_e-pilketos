"use client"

import Image from "next/image";
import asset_one from "@/asset/image/mpk_people_shadow.webp"
import asset_two from "@/asset/image/mpk_people_sillhouette.webp"
import Footer from "@/components/Footer"
import { Timer } from "@/utils";
import { useState } from "react"
import { useRouter } from "next/navigation";
import MenuNavigation from "@/components/MenuNavigation"
import { motion } from "framer-motion"

import { 
  Button,
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  useDisclosure,  
} from "@chakra-ui/react";
import font from "@/utils/Font";

export default function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()
  const endDateTime = "2024-09-10T09:00:00";
  const timer = new Timer(endDateTime);

  const [timeLeft, setTimeLeft] = useState("")
  const [openedStatus, setOpenedStatus] = useState<boolean>(false)

  timer.start((timeLeft) => {
    setTimeLeft(timeLeft);
    if (timeLeft === "Sudah dibuka!") {
      setOpenedStatus(true)
    }
  });

  const redirect = () => {
    router.push("/pencoblosan")
  }

  return (
    <main className="flex flex-col max-w-screen overflow-x-hidden">  
      <div className="flex md:hidden">
        <MenuNavigation title="Halaman Utama" />
      </div>
      <div className={`${font.primary} hidden md:flex p-6 h-screen text-center justify-center`}>
				<div className="w-1/2">
					<h1 className="text-2xl text-white w-auto">
						Website tidak mengizinkan untuk ukuran layar perangkat anda!
					</h1>
					<p className="text-white w-auto mt-4">
						Note: ubah dpi pada pengaturan perangkat anda agar ukuran layar menjadi sesuai dengan perangkat pada umumnya atau gunakan perangkat seperti smartphone dan sebagainya
					</p>
				</div>
			</div>
      <div className="md:hidden flex min-h-screen w-screen max-w-screen overflow-x-hidden bg-secondary flex-col items-center justify-center p-24">
        <div className={`${font.primary} w-auto bg-green-500 h-full flex flex-col justify-center items-center -mt-20 md:-mt-0`}>
          <div className="flex flex-col justify-center items-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 100 }} 
              transition={{ duration: 0.8 }}
              className="absolute"
            >  
              <Image height={0} width={0} src={asset_one} alt="" className="md:scale-110 -ml-2"/>
            </motion.div>
            <div className="absolute h-72">
              <motion.h3
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 100 }} 
                transition={{ duration: 0.8 }}
                className="text-center text-lg flex justify-center h-auto md:-mt-[26%] text-white">MPK ADHYASTA BARAKUGA</motion.h3>
              <motion.h1
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 100 }} 
                transition={{ duration: 0.8 }}
                className={`${font.secondary} hidden md:flex text-center text-5xl h-auto text-white`}>SMANJI E-PILEKTOS</motion.h1>
              <motion.h1
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 100 }} 
                transition={{ duration: 0.8 }}
                className={`${font.secondary} flex md:hidden text-center text-[2rem] w-auto h-auto text-white`}>SMANJI E-PILEKTOS</motion.h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <motion.div
              initial={{ y: 50, opacity: 0 }} 
              animate={{ y: 0, opacity: 100 }} 
              transition={{ duration: 0.8 }}
              className="absolute"
            >  
              <Image height={0} width={0} src={asset_two} alt="" className="md:scale-110 -ml-2"/>
            </motion.div>
          </div>
          <div className="absolute w-screen h-screen flex items-end justify-center">
            <div className="flex justify-center w-full bg-gradient-to-b from-transparent via-secondary to-secondary h-4/6">
              <div className="flex items-center justify-center mt-10">
                <motion.div
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 100 }} 
                  transition={{ duration: 0.8 }}
                >
                  <button onClick={openedStatus ? redirect : onOpen} className="bg-white h-auto py-1 px-24 text-lg flex items-center justify-center rounded-xl outline outline-2 outline-white outline-offset-4">
                    VOTE NOW
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={`${font.primary}`}>Notifikasi</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={`${font.primary}`}>
            <p>Pencoblosan baru akan dibuka dalam:</p>
            <p className="w-full font-bold text-center flex justify-center text-xl">{timeLeft}</p>
            <p>Silahkan lakukan pencoblosan di tempat yang sudah kami sediakan ya..</p>
          </ModalBody>
          <ModalFooter>
            <Button className={`${font.primary}`} colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </main>
  );
}
