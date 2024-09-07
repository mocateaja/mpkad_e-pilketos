"use client"

import ApexCharts from "apexcharts"
import { useEffect, useState } from "react";
import { getCandidatesRecaptulation } from "@/utils"

type CandidateData = {
  id: number,
  name: string,
  position: string,
  total_votes: number
}

const RecapitulationCharts = () => {
  const [candidates, setCandidates] = useState<CandidateData[]>([])
  const [chart, setChart] = useState<ApexCharts | null>(null)

  const options: ApexCharts.ApexOptions | any = {
    series: candidates.map(c => c.total_votes),
    chart: {
      width: 800,
      type: 'pie',
      foreColor: '#ffffff',
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
    legend: {
      show: true,
      fontSize: "20rem",
      offsetX: -30,
      markers: {
        shape: undefined,
        strokeWidth: 1,
        fillColors: undefined,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -10,
        offsetY: 0,
        size: 10,
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: true,
      theme: "false",
      style: {
        fontSize: '1rem',
        fontFamily: "Helvetica, Arial, sans-serif",
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "2rem",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold"
      }
    },
    labels: candidates.map(c => c.name),
    responsive: [{
      breakpoint: 560,
      options: {
        chart: {
          width: 600,
          type: 'pie',
          foreColor: '#ffffff',
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
        legend: {
          position: "bottom",
          horizontalAlign: 'left', 
          enable: true,
          width: 400,
          fontSize: "16rem",
          offsetX: 70,
          offsetY: 0,
          markers: {
            size: 6,
            shape: undefined,
            strokeWidth: 1,
            fillColors: undefined,
            customHTML: undefined,
            onClick: undefined,
            offsetX: -10,
            offsetY: 0,
          },
          itemMargin: {
            horizontal: 50,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "2rem",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: "bold"
          }
        },
      }
    },
    {
      breakpoint: 380,
        options: {
          chart: {
            width: 540,
            type: 'pie',
            foreColor: '#ffffff',
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
          legend: {
            position: "bottom",
            horizontalAlign: 'left', 
            enable: true,
            width: 400,
            fontSize: "16rem",
            offsetX: 50,
            offsetY: 0,
            markers: {
              size: 6,
              shape: undefined,
              strokeWidth: 1,
              fillColors: undefined,
              customHTML: undefined,
              onClick: undefined,
              offsetX: -10,
              offsetY: 0,
            },
            itemMargin: {
              horizontal: 50,
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              fontSize: "2rem",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold"
            }
          },
        }
      }
    ]
  };

  const renderChart = () => {
    if (chart) {
      chart.updateOptions(options);
    } else {
      const newChart = new ApexCharts(document.querySelector("#chart"), options);
      setChart(newChart);
      newChart.render();
    }
  }

  const fetchData = async () => {
    try {
      const recapData = await getCandidatesRecaptulation()
      setCandidates(recapData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData();
/*     const intervalId = setInterval(fetchData, 10000); // Update every 10 seconds
    return () => clearInterval(intervalId); */
  }, [])

  useEffect(() => {
    if (candidates.length > 0) {
      renderChart();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidates])

  const DigitalRecapitulation = () => (
    <div className="hidden lg:flex justify-around h-64 -mt-3 w-full p-10 gap-4">
      {candidates.map((data) => (
        <div key={data.id} className="flex justify-center w-full h-full">
          <h3 className="bg-white text-black absolute m-2 p-2 text-center rounded-xl text-sm lg:w-28 xl:w-36">{data.name}</h3>
          <h3 className="bg-transparent border-2 border-solid border-white rounded-xl w-full h-full flex items-center justify-center text-5xl mt-6">{data.total_votes}</h3>
        </div>
      ))}
    </div>
  )

  return(
    <div className="flex flex-col w-full h-full items-center">
      <div id="chart"/>
      <DigitalRecapitulation />
    </div>
  )
}

export default RecapitulationCharts