"use client";

import { useEffect, useState } from 'react';
import { getCandidatesRecaptulation } from '@/utils';

type CandidateData = {
  id: number;
  name: string;
  position: string;
  total_votes: number;
};

const RecapitulationCharts = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [mitratamaChart, setMitratamaChart] = useState<any>(null);
  const [mitramudaChart, setMitramudaChart] = useState<any>(null);

  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const createChartOptions = (position: string) => {
    const filteredCandidates = candidates.filter(c => c.position === position);
    return {
      series: [{
        name: 'Total Votes',
        data: filteredCandidates.map(c => c.total_votes)
      }],
      chart: {
        height: 350,
        width: 800,
        type: 'bar',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: filteredCandidates.map(c => `${c.position} ${c.id}`),
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          },
        }
      },
      yaxis: {
        title: {
          text: 'Total Votes'
        }
      },
      title: {
        text: `${position} Votes`,
        align: 'center',
        style: {
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          fontSize: '12px',
          fontFamily: "Helvetica, Arial, sans-serif",
        },
        y: {
          formatter: function (val: any) {
            return val + " votes"
          }
        }
      },
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recapData = await getCandidatesRecaptulation();
        setCandidates(recapData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (candidates.length > 0) {
      const loadApexCharts = async () => {
        if (typeof window !== 'undefined') {
          const ApexCharts = (await import('apexcharts')).default;
          
          const mitratamaOptions = createChartOptions('Mitratama');
          const mitramudaOptions = createChartOptions('Mitramuda');

          if (mitratamaChart) {
            mitratamaChart.updateOptions(mitratamaOptions);
          } else {
            const newMitratamaChart = new ApexCharts(document.querySelector("#mitratama-chart"), mitratamaOptions);
            setMitratamaChart(newMitratamaChart);
            newMitratamaChart.render();
          }

          if (mitramudaChart) {
            mitramudaChart.updateOptions(mitramudaOptions);
          } else {
            const newMitramudaChart = new ApexCharts(document.querySelector("#mitramuda-chart"), mitramudaOptions);
            setMitramudaChart(newMitramudaChart);
            newMitramudaChart.render();
          }
        }
      };

      loadApexCharts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates]);

  const DigitalRecapitulation = () => (
    <div className="hidden lg:flex justify-around h-64 -mt-3 w-full p-10 gap-4">
      {candidates.map((data) => (
        <div key={data.id} className="flex justify-center w-full h-full">
          <h3 className="bg-white text-black absolute m-2 p-2 text-center rounded-xl text-sm lg:w-28 xl:w-36">{data.name}</h3>
          <h3 className="bg-transparent border-2 border-solid border-white rounded-xl w-full h-full flex items-center justify-center text-5xl mt-6">{data.total_votes}</h3>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full items-center justify-center md-px-0 px-2">
      <div id="mitratama-chart" className="mb-8" />
      <div id="mitramuda-chart" className="mb-8" />
      <DigitalRecapitulation />
    </div>
  );
};

export default RecapitulationCharts;