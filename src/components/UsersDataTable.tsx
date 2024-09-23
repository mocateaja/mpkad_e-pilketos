import React, { useEffect, useState, useCallback } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  IconButton
} from '@chakra-ui/react';
import { getUsersData } from '@/utils';
import { useRouter } from 'next/navigation';
import { HiKey, HiMiniMagnifyingGlass  } from "react-icons/hi2";
import QrCode from '@/components/QRCode';
import { FiRotateCcw } from "react-icons/fi";

interface User {
  id: number;
  nis: string;
  name: string;
  class: string;
  token: string;
}

const UsersDataTable: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredUsers = useCallback(() => 
    userData.filter(user =>
      Object.values(user).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    ),
    [userData, searchTerm]
  );

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  const fetchData = async() => {
    try {
      const data = await getUsersData("");
      if (data === null || data === "failed") {
        alert("Terjadi kesalahan. Refresh ulang halaman dan cek koneksi!");
        router.push("/admin");
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSearch = async() => {
    try {
      const data = await getUsersData(searchTerm.toLowerCase());
      if (data === null || data === "failed") {
        alert("Terjadi kesalahan. Gagal mencari data!");
      } else {
        setUserData(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="w-full md:w-1/2">
      <div className="flex mb-4">
        <h2 className="text-xl font-bold mb-4 w-full text-white">Users Data</h2>
          <div className="flex w-full gap-x-2">
          <Input
            bg={"white"}
            type="text"
            placeholder="Cari data pengguna..."
            className="w-full p-2 border rounded"
            onChange={handleSearchChange}
          />
          <IconButton onClick={fetchData} icon={<FiRotateCcw className='bg-white w-full h-full p-2 rounded-lg'/>} className="bg-white flex" aria-label={''}/>
          <IconButton onClick={fetchSearch} icon={<HiMiniMagnifyingGlass  className='bg-white w-full h-full p-2 rounded-lg'/>} className="bg-white flex" aria-label={''}/>
        </div>
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
          {filteredUsers().map((user) => (
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
                      <QrCode identity={user.id} nis={user.nis} token={user.token} />
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
