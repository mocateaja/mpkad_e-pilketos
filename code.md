# Komponen Navigasi
`filename src/components/MenuNavigation.tsx`
```tsx
import { Nova_Square } from "next/font/google";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  IconButton,
  VStack,
  Box,
  StackDivider
} from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import React from "react"

const nova_Square = Nova_Square({
  subsets: ["latin"],
  weight: ["400"],
});

const MenuNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={`${nova_Square.className}`}>
      <div className="absolute top-0 flex h-16 justify-end items-end z-30 bg-transparent w-screen">
        <div className="mr-5">
          <IconButton icon={<HiBars3 className="scale-100 p-2 rounded-lg bg-white w-full h-full"/>} onClick={onOpen} aria-label="Open menu navigation"/>
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className="mt-2 mr-2" />
          <DrawerHeader borderBottomWidth="1px">
            Menu Utama
          </DrawerHeader>

          <DrawerBody>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={2}
            align='stretch'
          >
            <Box className="py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white">
              <Link href={"/main"}>
                Pencoblosan
              </Link>
            </Box>
            <Box className="py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white">
              <Link href={"/admin"}>
                Admin
              </Link>
            </Box>
            <Box className="py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white">
              <Link href={"/recapitulation"}>
                Hasil Suara
              </Link>
            </Box>
            <Box className="py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white">
              <Link href={"/contact"}>
                Kontak IT
              </Link>
            </Box>
          </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Tutup
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MenuNavigation
```
# Layout Utama
`filename src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import Favicon from '@/app/favicon.ico'
import "./globals.css";
import { Providers } from "@/app/Providers"

export const metadata: Metadata = {
  title: "SMANJI E-PILKETOS",
  description: "Website official milik MPK Adhyasta Barakuga sebagai wadah pemilihan Ketua OSIS",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="w-full h-full max-w-screen overflow-x-hidden flex justify-center items-center bg-secondary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```
# Halaman Utama
`filename src/app/page.tsx`
```tsx
"use client"

import Image from "next/image";
import Asset_One from "@/asset/svg/mpk_people_shadow.svg"
import Asset_Two from "@/asset/svg/mpk_people_sillhouette.svg"
import Footer from "@/components/Footer"
import { Timer } from "@/utils";
import { useState } from "react"
import { useRouter } from "next/navigation";
import MenuNavigation from "@/components/MenuNavigation"

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

import { ADLaM_Display, Nova_Square } from 'next/font/google'
 
const aDLaM_Display = ADLaM_Display({
  subsets: ['latin'],
  weight: ['400']
})
const nova_Square = Nova_Square({
  subsets: ['latin'],
  weight: ['400']
})

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
      <MenuNavigation />
      <div className="flex min-h-screen w-screen max-w-screen overflow-x-hidden bg-secondary flex-col items-center justify-center p-24">
        <div className={`${nova_Square.className} w-auto bg-green-500 h-full flex flex-col justify-center items-center -mt-20 md:-mt-0`}>
          <div className="flex flex-col justify-center items-center">
            <Image height={0} width={0} src={Asset_One} alt="" className="absolute md:scale-110 -ml-2"/>
            <div className="absolute h-72">
              <h3 className="text-center text-lg flex justify-center h-auto md:-mt-[26%] text-white">MPK ADHYASTA BARAKUGA</h3>
              <h1 className={`${aDLaM_Display.className} hidden md:flex text-center text-5xl h-auto text-white`}>SMANJI E-PILEKTOS</h1>
              <h1 className={`${aDLaM_Display.className} flex md:hidden text-center text-3xl w-auto h-auto text-white`}>SMANJI E-PILEKTOS</h1>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <Image height={0} width={0} src={Asset_Two} alt="" className="absolute md:scale-110 -ml-2"/>
          </div>
          <div className="absolute w-screen h-screen flex items-end justify-center">
            <div className="flex justify-center w-full bg-gradient-to-b from-transparent via-secondary to-secondary h-4/6">
              <div className="flex items-center justify-center mt-10">
                <button onClick={openedStatus ? redirect : onOpen} className="bg-white h-auto py-1 px-20 text-lg flex items-center justify-center rounded-xl outline outline-2 outline-white outline-offset-4">
                  VOTE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className={`${nova_Square.className}`}>Notifikasi</ModalHeader>
          <ModalCloseButton />
          <ModalBody className={`${nova_Square.className}`}>
            <p>Pencoblosan baru akan dibuka dalam:</p>
            <p className="w-full font-bold text-center flex justify-center text-xl">{timeLeft}</p>
            <p>Silahkan lakukan pencoblosan di tempat yang sudah kami sediakan ya..</p>
          </ModalBody>
          <ModalFooter>
            <Button className={`${nova_Square.className}`} colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Footer />
    </main>
  );
}
```
# Halaman Main
`filename src/app/main/page.tsx`
```tsx
import MenuNavigation from "@/components/MenuNavigation"

export default function PilketosPage() {
  return (
		<main>
			<MenuNavigation />
			HALAMAN PILKETOS
		</main>
	);
}
```
## Error
```
⨯ src\components\MenuNavigation.tsx (27:52) @ useDisclosure
 ⨯ TypeError: (0 , _chakra_ui_react__WEBPACK_IMPORTED_MODULE_3__.useDisclosure) is not a function
    at MenuNavigation (./src/components/MenuNavigation.tsx:24:104)
    at stringify (<anonymous>)
    at stringify (<anonymous>)
digest: "1967131567"
  25 |
  26 | const MenuNavigation = () => {
> 27 |   const { isOpen, onOpen, onClose } = useDisclosure();
     |                                                    ^
  28 |
  29 |   return (
  30 |     <div className={`${nova_Square.className}`}>
```