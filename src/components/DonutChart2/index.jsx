import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IoIosWoman, IoIosMan } from "react-icons/io";

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart2 = ({ 
  title, 
  data, 
  type = 'default' // 'default' o 'gender'
}) => {
  
  // Configuración base del gráfico
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [{
      data: data.map(item => item.value),
      backgroundColor: data.map(item => item.color),
      borderWidth: 0,
      cutout: '50%', // Tamaño del agujero central
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: false // Ocultamos la leyenda por defecto de Chart.js
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}%`;
          }
        }
      }
    },
    maintainAspectRatio: true,
    responsive: true
  };

  // Calcular porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  return (
    <div className="flex flex-col items-center w-full h-full p-1 md:p-2">
      {/* Contenedor principal */}
      <div className="flex items-center justify-start gap-2 md:gap-3 lg:gap-4 xl:gap-6 w-full">
        {/* Gráfico Donut - Responsive con Tailwind */}
        <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 2xl:w-44 2xl:h-44">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Leyenda y título */}
        <div className="flex flex-col gap-1 md:gap-2 flex-grow">
          {/* Título */}
          <h3 className="text-tertiary font-normal text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg mb-1 md:mb-2">
            {title}
          </h3>
          
          {/* Leyenda personalizada */}
          <div className="flex flex-col gap-1 md:gap-1.5 lg:gap-2">
            {type === 'gender' ? (
              // Leyenda especial para género con iconos y porcentajes
              dataWithPercentages.map((item, index) => (
                <div key={index} className="flex items-center gap-1 md:gap-2">
                  <div className="flex items-center gap-1">
                    {item.label === 'Masculino' || item.label === 'Hombres' ? (
                      <IoIosMan  
                        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                        style={{ color: item.color }}
                      />
                    ) : (
                      <IoIosWoman 
                        className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
                        style={{ color: item.color }}
                      />
                    )}
                    <span className="font-bold text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400">
                      {item.percentage}%
                    </span>
                  </div>
                </div>
              ))
            ) : (
              // Leyenda normal para otros gráficos - Grid responsive
              <div className={`
                ${dataWithPercentages.length > 4 ? 'grid grid-cols-1' : 'flex flex-col'} 
                gap-x-2 gap-y-0.5 md:gap-y-1
              `}>
                {dataWithPercentages.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 md:gap-1.5 lg:gap-2">
                    <div 
                      className="w-2 h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-600 truncate max-w-[100px] lg:max-w-[150px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DonutChart2 };