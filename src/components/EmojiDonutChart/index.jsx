import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar lo necesario de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Tamaños responsivos del donut
const SIZE_MAP = {
  xs: 'w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24',
  sm: 'w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28',
  md: 'w-20 h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32',
  lg: 'w-24 h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36',
};

const EmojiDonutChart = ({
  title,
  data,
  size = 'sm',             // xs | sm | md | lg
  cutout = '55%',           // grosor del anillo
}) => {
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

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
      <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] items-center lg:items-start gap-2 lg:gap-4 xl:gap-6 p-1 lg:p-2 xl:p-3">
        {/* Donut compacto y responsivo */}
        <div className="relative place-self-center lg:place-self-start">
          <div className={`relative ${SIZE_MAP[size]}`}>
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        {/* Leyenda + título compactos */}
        <div className="w-full">
          {title && (
            <h3 className="text-center lg:text-left mb-1 lg:mb-2 text-slate-600 text-xs lg:text-sm xl:text-base">
              {title}
            </h3>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-1 lg:gap-2 xl:gap-3">
            {dataWithPercentages.map((item, i) => (
              <div key={i} className="flex items-center justify-center lg:justify-start gap-1 lg:gap-2 xl:gap-3">
                <span
                  className="flex-shrink-0 leading-none text-lg lg:text-xl xl:text-2xl"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.emoji}
                </span>
                <span className="font-bold text-slate-700 leading-none text-sm lg:text-base xl:text-lg 2xl:text-xl">
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