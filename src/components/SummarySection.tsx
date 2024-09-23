import { getVotesInformation } from '@/utils';
import React, { useEffect, useState } from 'react';

const SummarySection: React.FC = () => {
  const [votesIn, setVotesIn] = useState(0) // Default 0
  const [votesRemain, setVotesRemain] = useState(0) // Default 0

  const fetchData = async() => {
    try {
      const data = await getVotesInformation();
      if (data === null || data === "failed") {
        alert("Terjadi kesalahan. Refresh ulang halaman dan cek koneksi!");
        
      } else {
        setVotesIn(data?.in)
        setVotesRemain(data?.remain)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="">
      <div className="w-full flex justify-between gap-4">
        <div className="bg-gray-100 p-4 rounded shadow grow">
          <h3 className="text-lg font-semibold">Total Suara Masuk</h3>
          <p className="text-3xl font-bold mt-2"></p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow grow">
          <h3 className="text-lg font-semibold">Total Suara Tersisa</h3>
          <p className="text-3xl font-bold mt-2"></p>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;