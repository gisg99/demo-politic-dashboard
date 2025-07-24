import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const BarChartRedes = () => {
  const data = {
    labels: ['MC', 'MORENA', 'PAN', 'PRI', 'PVEM', 'PT', 'PRD'],
    datasets: [
      {
        label: 'Likes Facebook',
        data: [850000, 700000, 500000, 250000, 180000, 100000, 80000],
        backgroundColor: '#3B82F6', // Azul
      },
      {
        label: 'Likes Instagram',
        data: [600000, 550000, 350000, 150000, 120000, 70000, 60000],
        backgroundColor: '#EF4444', // Rojo
      },
      {
        label: 'Seguidores Twitter',
        data: [230000, 330000, 240000, 110000, 90000, 50000, 30000],
        backgroundColor: '#06B6D4', // Celeste
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => value >= 1000 ? `${value / 1000}K` : value,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export {BarChartRedes}
