import React from 'react';

interface SummaryItem {
  title: string;
  value: number;
}

const SummarySection: React.FC = () => {
  const summaryData: SummaryItem[] = [
    { title: 'Kloter Tersisa', value: 3 },
    { title: 'Total Suara Masuk', value: 200 },
    { title: 'Total Suara Tersisa', value: 785 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummarySection;