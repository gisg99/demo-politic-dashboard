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
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

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
        borderRadius: isMobile ? 4 : 6,
        barPercentage: isMobile ? 0.8 : 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 20000,
        ticks: {
          callback: function (value) {
            return value / 1000 + 'K';
          },
          font: {
            size: isMobile ? 8 : 10
          },
          color: '#6B7280'
        },
        grid: {
          color: '#F3F4F6',
        },
        title: {
          display: !isMobile, // Ocultar título del eje Y en móvil
          text: 'Actividad',
          font: {
            size: isMobile ? 9 : 11
          },
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: isMobile ? 9 : 11
          },
          color: '#374151'
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { size: isMobile ? 10 : 12, weight: 'bold' },
        bodyFont: { size: isMobile ? 9 : 11 },
        padding: isMobile ? 6 : 8,
        callbacks: {
          label: function(context) {
            return `Actividad: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    layout: {
      padding: {
        left: isMobile ? 5 : 10,
        right: isMobile ? 5 : 10,
        top: isMobile ? 5 : 10,
        bottom: isMobile ? 5 : 10
      }
    }
  };

  return (
    <div className="flex w-full h-48 lg:h-[300px] justify-center items-center">
      <Bar data={data} options={options} />
    </div>
  );
};

export {DigitalActivityChart};