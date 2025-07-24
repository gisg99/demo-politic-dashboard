import React from 'react';
import {
  Line
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AvgConnectionTimeChart = () => {
  const data = {
    labels: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        // label eliminado
        data: [12, 18, 25, 45, 38, 42, 55, 48, 22],
        fill: true,
        backgroundColor: 'rgba(255, 153, 0, 0.1)',
        borderColor: '#FF9900',
        tension: 0.4,
        pointBackgroundColor: '#FF9900',
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value} min`,
        },
        grid: {
          color: '#E3E4E8',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Hora del Día',
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // legend desactivada
      },
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center mt-5">
      <Line data={data} options={options} />
    </div>
  );
};

export { AvgConnectionTimeChart };
