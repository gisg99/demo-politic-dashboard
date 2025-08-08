import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar lo necesario de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Tamaños responsivos del donut
const SIZE_MAP = {
  xs: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36',
  sm: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40',
  md: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44',
  lg: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 2xl:w-48 2xl:h-48',
};

const EmojiDonutChart = ({
  title,
  data,
  size = 'sm',             // xs | sm | md | lg
  cutout = '55%',           // grosor del anillo
}) => {
  // Datos del chart
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderWidth: 0,
        cutout,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Porcentajes para la leyenda
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-[auto,1fr] items-center md:items-start gap-4 md:gap-6 lg:gap-8 p-2 md:p-3">
        {/* Donut compacto y responsivo */}
        <div className="relative place-self-center md:place-self-start">
          <div className={`relative ${SIZE_MAP[size]}`}>
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        {/* Leyenda + título compactos */}
        <div className="w-full">
          {title && (
            <h3
              className="text-center md:text-left mb-2 text-slate-600"
              style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)' }}
            >
              {title}
            </h3>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-1 gap-2 sm:gap-3 md:gap-4">
            {dataWithPercentages.map((item, i) => (
              <div key={i} className="flex items-center justify-center md:justify-start gap-2 sm:gap-3">
                <span
                  className="flex-shrink-0 leading-none"
                  style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2rem)' }}
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.emoji}
                </span>
                <span
                  className="font-bold text-slate-700 leading-none"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 1.75rem)' }}
                >
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { EmojiDonutChart };
export default EmojiDonutChart;
