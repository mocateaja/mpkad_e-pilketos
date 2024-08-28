import type { Metadata } from "next";
import Favicon from '@/app/favicon.ico'
import "./globals.css";
import { Providers } from "@/app/Providers"
import Shield from "@/components/Shield"

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
