import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Registrar lo necesario de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Tamaños mejorados y más grandes para desktop
const SIZE_MAP = {
  xs: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36',
  sm: 'w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40',
  md: 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44',
  lg: 'w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48',
};

const EmojiDonutChart = ({
  title,
  data,
  size = 'sm',
  cutout = '60%',
  showTitle = true,
  showPercentages = true,
  layout = 'auto' // 'auto' | 'horizontal' | 'vertical'
}) => {
  // Función para detectar dispositivo móvil de manera más robusta
  const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  };

  const [isMobile, setIsMobile] = React.useState(getIsMobile);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(getIsMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        titleFont: { 
          size: isMobile ? 12 : 15, 
          weight: 'bold' 
        },
        bodyFont: { 
          size: isMobile ? 11 : 14 
        },
        padding: isMobile ? 10 : 12,
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
    interaction: {
      intersect: false,
    },
  };

  // Porcentajes para la leyenda
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = data.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  // Determinar layout basado en el prop y el tamaño de pantalla
  const getLayout = () => {
    if (layout !== 'auto') return layout;
    return isMobile ? 'vertical' : 'horizontal';
  };

  const currentLayout = getLayout();
  const isVertical = currentLayout === 'vertical';

  return (
    <div className="w-full h-full flex flex-col">
      {/* Contenedor principal */}
      <div 
        className={`
          flex-1 flex items-center justify-center
          ${isVertical 
            ? 'flex-col gap-3 sm:gap-4' 
            : 'flex-row gap-4 sm:gap-6 lg:gap-8'
          }
        `}
      >
        {/* Donut Chart */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className={`relative ${SIZE_MAP[size]}`}>
            <Doughnut data={chartData} options={options} />
          </div>
        </div>

        {/* Leyenda */}
        <div 
          className={`
            flex-1 min-w-0
            ${isVertical 
              ? 'w-full max-w-xs' 
              : 'min-w-0'
            }
          `}
        >
          <div 
            className={`
              grid gap-2 sm:gap-3
              ${isVertical 
                ? 'grid-cols-1 justify-items-center' 
                : 'grid-cols-1 justify-items-start'
              }
              ${isMobile && !isVertical ? 'grid-cols-1' : ''}
            `}
          >
            {dataWithPercentages.map((item, i) => (
              <div 
                key={i} 
                className={`
                  flex items-center gap-2 sm:gap-3
                  ${isVertical ? 'justify-center' : 'justify-start'}
                  transition-all duration-200 hover:scale-105
                `}
              >
                {/* Emoji */}
                <span
                  className="flex-shrink-0 leading-none text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                  aria-label={item.label}
                  title={item.label}
                >
                  {item.emoji}
                </span>
                
                {/* Porcentaje y label */}
                <div className={`flex flex-col ${isVertical ? 'items-center' : 'items-start'} min-w-0`}>
                  {showPercentages && (
                    <span className="font-bold text-slate-700 leading-tight text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
                      {item.percentage}%
                    </span>
                  )}
                  <span className="text-slate-500 text-sm sm:text-base lg:text-lg xl:text-xl leading-tight truncate">
                    {item.label}
                  </span>
                </div>
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