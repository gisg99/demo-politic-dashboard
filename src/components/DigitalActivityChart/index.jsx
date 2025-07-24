import React from 'react';
import {
  Bar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const DigitalActivityChart = () => {
  const data = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Actividad Digital',
        data: [3000, 2000, 9000, 15000, 12000, 18000],
        backgroundColor: [
          '#FECBA1',
          '#FDD7A0',
          '#FDA828',
          '#FD6930',
          '#FD912A',
          '#FD5E36',
        ],
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 20000,
        ticks: {
          callback: function (value) {
            return value / 1000 + 'K';
          },
        },
        grid: {
          color: '#F3F4F6',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex w-full h-[300px] justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export {DigitalActivityChart};
