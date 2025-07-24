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
  const data = {
    labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
    datasets: [
      {
        label: 'Hombres',
        data: [135, 60, 20, 50, 90, 15],
        backgroundColor: 'rgba(231, 235, 216, 0.4)',
        borderColor: '#228c22',
        borderWidth: 3,
        pointBackgroundColor: '#228c22',
      },
      {
        label: 'Mujeres',
        data: [180, 88, 65, 42, 30, 8],
        backgroundColor: 'rgba(250, 223, 220, 0.4)',
        borderColor: '#db143c',
        borderWidth: 3,
        pointBackgroundColor: '#db143c',
      },
    ],
  };

  const options = {
    responsive: true,
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
        },
        pointLabels: {
          color: '#333',
          font: {
            size: 14,
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
          boxWidth: 16,
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <Radar data={data} options={options} />
    </div>
  );
};

export {DemographicChart};
