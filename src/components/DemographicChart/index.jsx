import React from 'react';
import {
  Radar
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
); 

const DemographicChart = () => {
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

  const data = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Hombres',
        data: [135, 60, 20, 50, 90, 15],
        backgroundColor: 'rgba(231, 235, 216, 0.4)',
        borderColor: '#228c22',
        borderWidth: isMobile ? 2 : 3,
        pointBackgroundColor: '#228c22',
        pointRadius: isMobile ? 3 : 4,
      },
      {
        label: 'Mujeres',
        data: [180, 88, 65, 42, 30, 8],
        backgroundColor: 'rgba(250, 223, 220, 0.4)',
        borderColor: '#db143c',
        borderWidth: isMobile ? 2 : 3,
        pointBackgroundColor: '#db143c',
        pointRadius: isMobile ? 3 : 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: '#e5e7eb',
        },
        grid: {
          color: '#f3f4f6',
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          color: '#555',
          font: {
            size: isMobile ? 8 : 10
          },
          display: !isMobile, // Ocultar números en móvil
        },
        pointLabels: {
          color: '#333',
          font: {
            size: isMobile ? 10 : 14,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '#5B4C42',
          boxWidth: isMobile ? 12 : 16,
          font: {
            size: isMobile ? 10 : 12
          }
        },
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
      }
    },
  };

  return (
    <div className="w-full h-48 lg:h-auto max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
};

export {DemographicChart};