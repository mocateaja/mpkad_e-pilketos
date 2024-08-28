# Apex Chart Javascript Code
```js


// Event listener untuk tombol update
document.getElementById("updateButton").addEventListener("click", updateData);

// Event listener untuk tombol zoom
document.getElementById("zoom").addEventListener("click", () => {
  const startTime = dataset.timestamp[dataset.timestamp.length - 6]
  const endTime = dataset.timestamp[dataset.timestamp.length - 1]
  chart.zoomX(startTime, endTime);
});

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

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  
  chart.updateOptions({
    series: [{
      name: 'Kukuh Is Fajar',
      data: dataset.data[0].map((value, index) => [dataset.timestamp[index], value])
    }, {
      name: 'Maulana Davis',
      data: dataset.data[1].map((value, index) => [dataset.timestamp[index], value])
    }]
  });
}

// Inisialisasi chart
var options = {
  title: {
    text: 'Penghitungan suara',
    align: 'left'
  },
  subtitle: {
    text: 'Hitung suara berdasarkan data yang sudah dikumpulkan secara sah',
    align: 'left'
  },
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      enabled: true
    },
    toolbar: {
      show: true
    },
    dataLabels: {
      enabled: false
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
        speed: 350
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  dataLabels: {
    enabled: true
  },
  series: [
    {
      name: 'Kukuh Is Fajar',
      data: dataset.data[0].map((value, index) => [dataset.timestamp[index], value])
    },
    {
      name: 'Maulana Davis',
      data: dataset.data[1].map((value, index) => [dataset.timestamp[index], value])
    }
  ],
  colors: ['#0000FF', '#FF8225'],
  xaxis: {
    type: 'datetime',
    labels: {
      formatter: function(value, timestamp) {
        return new Date(timestamp).toLocaleTimeString();
      }
    }
  },
  markers: {
    size: 0
  },
  stroke: {
    curve: 'smooth'
  }
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
```

I want you to changes this code. The previous code is that show the data as area chart and i want to change it into pie chart.

```js
var options = {
  series: [44, 55, 13, 43, 22],
  chart: {
  width: 380,
  type: 'pie',
},
labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
```

Code above is an example from the documentation