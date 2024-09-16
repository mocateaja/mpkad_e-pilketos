import React, { useEffect, useState, useRef } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Input,
  IconButton
} from '@chakra-ui/react';
import QrCreator from 'qr-creator';
import { getUsersData } from '@/utils';
import { useRouter } from 'next/navigation';
import { HiKey } from "react-icons/hi2";

interface User {
  id: number;
  nis: string;
  name: string;
  class: string;
  token: string;
  vote_status: boolean;
  vote_one: number;
  vote_two: number;
}

const UsersDataTable: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = userData.filter(user =>
    Object.values(user).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    try {
      (async () => {
        const data = await getUsersData("");
        setUserData(data);
        if (data === null || data === "failed") {
          alert("Terjadi kesalahan. Refresh ulang halaman dan cek koneksi!");
          router.push("/admin");
        }
      })();
    } catch (error) {
      console.error(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const QrCode = ({ text }: { text: string }) => {
    const qrRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (qrRef.current) {
        // Bersihkan QR sebelumnya
        qrRef.current.innerHTML = '';

        QrCreator.render({
          text: text,
          radius: 0.5, // 0.0 to 0.5
          ecLevel: 'H', // L, M, Q, H
          fill: '#536DFE', // foreground color
          background: null, // color or null for transparent
          size: 128 // in pixels
        }, qrRef.current);
      }
    }, [text]);

    return <div className="w-auto h-auto flex" ref={qrRef}></div>;
  };

  return (
    <div className="w-full md:w-1/2">
      <div className="flex mb-4">
        <h2 className="text-xl font-bold mb-4 w-full text-white">Users Data</h2>
        <Input
          bg={"white"}
          type="text"
          placeholder="Cari data pengguna..."
          className="w-full p-2 border rounded"
          onChange={handleSearchChange}
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">NIS</th>
            <th className="border p-2 text-left">Nama</th>
            <th className="border p-2 text-left max-w-[85px] w-[85px]">Kelas</th>
            <th className="border p-2 text-left max-w-[10px] w-[10px]"> </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className='text-white'>
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.nis}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2 relative">{user.class}</td>
              <td className="border p-2 relative">
                <Popover variant="responsive">
                  <PopoverTrigger>
                    <IconButton aria-label="Reveal user token" icon={<HiKey className="scale-100 p-2 rounded-lg bg-white w-full h-full" />} />
                  </PopoverTrigger>
                  <PopoverContent minW={{ base: "100%", lg: "max-content" }}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader className="text-black">Token Information</PopoverHeader>
                    <PopoverBody className="text-black">
                      <QrCode text={user.token}/>
                      Token: {user.token}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersDataTable;
