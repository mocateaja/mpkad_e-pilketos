"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { getCandidatesRecaptulation } from '@/utils';
import { Button } from '@chakra-ui/react';
import font from '@/utils/Font';

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
    const filteredCandidates = candidates
      .filter(c => c.position === position)
      .sort((a, b) => a.id - b.id);  // Sort by id

    return {
      series: [{
        name: 'Total Votes',
        data: filteredCandidates.map(c => c.total_votes)
      }],
      chart: {
        height: 350,
        width: "250%",
        type: 'bar',
        toolbar: {
          show: false
        },
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
            speed: 800
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
        categories: filteredCandidates.map(c => `${c.position} ${c.id > 3 ? c.id-3 : c.id}`),
        labels: {
          style: {
            colors: colors,
            fontSize: '1.1rem',
            fontWeight: 'bold',
          },
        }
      },
      yaxis: {
        title: {
          offsetX: -10,
          text: 'Total Votes',
          style: {
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#ffffff'
          },
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: '1.1rem'
          },
          formatter: function (val: any) {
            return val.toFixed(0);
          },
        }
      },
      title: {
        text: `${position} Votes`,
        align: 'center',
        style: {
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#ffffff'
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        style: {
          fontSize: '1rem',
          fontFamily: "Helvetica, Arial, sans-serif",
        },
        y: {
          formatter: function (val: any) {
            return val + " votes"
          }
        }
      },
      responsive: [
      {
        breakpoint: 420,
        options: {
            chart: {
              width: "120%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 520,
          options: {
            chart: {
              width: "120%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 640,
          options: {
            chart: {
              width: "140%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 820,
          options: {
            chart: {
              width: "160%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 920,
          options: {
            chart: {
              width: "180%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 1020,
          options: {
            chart: {
              width: "210%",
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
                  speed: 800
                }
              }
            },
          }
        },
        {
          breakpoint: 920,
          options: {
            chart: {
              width: "200%",
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
                  speed: 800
                }
              }
            },
          }
        }
      ]
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

    fetchData();  // Fetch immediately on mount
    const intervalId = setInterval(fetchData, 5000);  // Then every 5 seconds

    return () => clearInterval(intervalId);  // Clean up on unmount
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

  const [recapStatus, setRecapStatus] = useState<boolean>(false) // default false

  const DigitalRecapitulation = () => (
    <div className="hidden lg:flex justify-center h-64 -mt-3 w-full p-10 gap-4">
      {candidates.sort((a, b) => a.id - b.id).map((data) => (
        <div key={data.id} className="flex justify-center w-full max-w-48 h-full">
          <h3 className="bg-white text-black absolute m-2 p-2 text-center rounded-xl text-sm lg:w-28 xl:w-36">{data.name}</h3>
          <h3 className="bg-transparent border-2 border-solid border-white rounded-xl w-full h-full max-w-48 flex items-center justify-center text-5xl mt-6">{data.total_votes}</h3>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <div id="mitratama-chart" className="mb-8" />
      <div id="mitramuda-chart" className="mb-8" />
      <div className="w-full h-auto hidden md:flex justify-center">
        <Button 
          bg={"white"}
          className={`${font.primary}`}
          onClick={()=>setRecapStatus(!recapStatus)}
        >
          {recapStatus ? "Open Recapitulation" : "Close Recapitulation"}
        </Button>
      </div>
      {recapStatus ? (
        <AnimatePresence>
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 100 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className="w-full h-auto flex justify-center"
          >
            <DigitalRecapitulation />
          </motion.div>
        </AnimatePresence>
      ) : (
        null
      )}
    </div>
  );
};

export default RecapitulationCharts;