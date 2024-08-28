import ApexCharts from 'apexcharts'
import { useEffect, useState } from 'react';

const RecapitulationCharts = () => {
  const [chart, setChart] = useState<any>()

  var dataset = {
    data: [[30, 40, 45, 50, 49, 60, 70, 91, 125], [50, 15, 3, 33, 21, 87, 100, 65, 28]],
    timestamp: [
      new Date('2024-01-01 09:00:00').getTime(),
      new Date('2024-01-01 09:30:00').getTime(),
      new Date('2024-01-01 10:00:00').getTime(),
      new Date('2024-01-01 10:30:00').getTime(),
      new Date('2024-01-01 11:00:00').getTime(),
      new Date('2024-01-01 11:30:00').getTime(),
      new Date('2024-01-01 12:30:00').getTime(),
      new Date('2024-01-01 13:00:00').getTime(),
      new Date('2024-01-01 13:30:00').getTime(),
    ]
  };

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  function updateData() {
    let newData_1 = dataset.data[0][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[0].push(newData_1);
    let newData_2 = dataset.data[1][dataset.data.length - 1] + getRandomNumber(0, 150);
    dataset.data[1].push(newData_2);
    
    // Menambahkan timestamp baru (contoh: menambah 30 menit)
    let lastTime = new Date(dataset.timestamp[dataset.timestamp.length - 1]);
    lastTime.setMinutes(lastTime.getMinutes() + 30);
    dataset.timestamp.push(lastTime.getTime());

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
  
  useEffect(() => {
    renderAllCharts()
  }, [])

  return(
    <div>
      <button onClick={updateData}>Update</button>
      <div id="chart"/>
    </div>
  )
}

export default RecapitulationCharts