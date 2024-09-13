"use client"

import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  useDisclosure,
  DrawerContent,
  Button,
  IconButton,
  VStack,
  Box,
  StackDivider
} from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import font from "@/utils/Font"

const MenuNavigation = ({ title } : { title: string }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className={`${font.primary}`}>
      <div className="absolute top-0 flex h-16 max-w-screen justify-center items-end z-30 bg-transparent w-screen">
        <div className="flex items-center justify-between w-full px-5 md:px-8 lg:px-20">
          <h1 className="text-lg font-bold text-white">{title}</h1>
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
          <DrawerHeader borderBottomWidth="1px" className={`${font.primary}`}>
            Menu Utama
          </DrawerHeader>

          <DrawerBody>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={2}
            align='stretch'
          >
            <Link href={"/"}>
              <Box className={`py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white ${font.primary}`}>
                Halaman Utama
              </Box>
            </Link>
            <Link href={"/main"}>
              <Box className={`py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white ${font.primary}`}>
                Pencoblosan
              </Box>
            </Link>
            <Link href={"/admin"}>
              <Box className={`py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white ${font.primary}`}>
                Admin
              </Box>
            </Link>
            <Link href={"/recapitulation"}>
              <Box className={`py-2 pl-4 cursor-pointer rounded-lg duration-200 hover:bg-secondary hover:text-white ${font.primary}`}>
                Hasil Suara
              </Box>
            </Link>
          </VStack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose} className={`${font.primary}`}>
              Tutup
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MenuNavigation