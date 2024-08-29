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
  const [recapData, setRecapData] = useState<CandidateData[]>([])
  const [chart, setChart] = useState<any>()
  const [fetchStatus, setFetchStatus] = useState<boolean>(false)

  var dataset = {
    data: [[30, 40, 45, 50, 49, 60, 70, 91, 125], [50, 15, 3, 33, 21, 87, 100, 65, 28]]
  };

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  function updateData() {
    let newData_1 = dataset.data[0][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[0].push(newData_1);
    let newData_2 = dataset.data[1][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[1].push(newData_2);

    // Perbarui pie chart dengan data terbaru
    chart.updateSeries([dataset.data[0][dataset.data[0].length - 1], dataset.data[1][dataset.data[1].length - 1]]);
  }

  // Inisialisasi pie chart
  var options = {
    series: [dataset.data[0][0], dataset.data[1][0]], // Data awal
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Kukuh Is Fajar', 'Maulana Davis'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  function renderAllCharts() {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    setChart(chart)
    chart.render();
  }

  const reFetch = async() => {
    const recapData = await getCandidatesRecaptulation()
    setRecapData(recapData)
  }
  
  useEffect(() => {
    if (!fetchStatus) {
      (async()=>{
        const recapData = await getCandidatesRecaptulation()
        setRecapData(recapData)
        alert(JSON.stringify(recapData))
        setFetchStatus(true)
      })()
    } else {
      if (recapData.length <= 0) {
        (async()=>{
          await reFetch()
        })
      } else {
        renderAllCharts()
      }
    }
  }, [fetchStatus])

  return(
    <div>
      <button onClick={updateData}>Update</button>
      <div id="chart"/>
    </div>
  )
}

export default RecapitulationCharts