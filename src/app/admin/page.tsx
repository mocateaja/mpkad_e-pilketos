"use client";

import dynamic from 'next/dynamic'
import SummarySection from "@/components/SummarySection";
import AdminLoginModal from "@/components/AdminLoginModal";
import { useDisclosure, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import font from "@/utils/Font"
import Footer from "@/components/Footer"
import MenuNavigation from "@/components/MenuNavigation";

const DynamicComponentWithNoSSR_WhiteListTable = dynamic(
  () => import('@/components/WhitelistIPTable'),
  { ssr: false }
)
const DynamicComponentWithNoSSR_UsersDataTable = dynamic(
  () => import('@/components/UsersDataTable'),
  { ssr: false }
)

export default function AdminPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loginStatus, setLoginStatus] = useState<boolean>(false); // Ganti menjadi false jika ujicoba sudah selesai!

  useEffect(() => {
    loginStatus ? null : onOpen();
  }, [loginStatus, onOpen]);

  const handleLoginResult = (result: boolean) => {
    setLoginStatus(result);
  };

  return (
    <div className="flex flex-col w-screen items-center">
      <div className={`container mx-auto mt-28 max-w-screen overflow-x-hidden overflow-y-hidden ${font.primary}`}>
        <div className={`${
            loginStatus ? "flex opacity-100" : "hidden opacity-0"
          } duration-[2000ms] w-screen absolute top-0 left-0`}>
          <MenuNavigation title="Halaman Admin" />
        </div>
        <main
          className={`${
            loginStatus ? "block opacity-100" : "hidden opacity-0"
          } duration-[2000ms] p-4`}
        >
          <div className="flex justify-end mb-4">
            <Button
              bgColor={"white"}
              onClick={() => {
                setLoginStatus(false);
                onOpen();
              }}
              className="hover:bg-gray-300"
            >
              Logout
            </Button>
          </div>

          <AdminLoginModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            onLoginResult={handleLoginResult}
          />
          <SummarySection />
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <DynamicComponentWithNoSSR_WhiteListTable />
            <DynamicComponentWithNoSSR_UsersDataTable />
          </div>
        </main>
      </div>
      <div className={`${
          loginStatus ? "block opacity-100" : "hidden opacity-0"
        } duration-[2000ms]`}><Footer /></div>
    </div>
  );
}
