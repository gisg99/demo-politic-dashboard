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

  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

  const options = {
    plugins: {
      legend: {
        display: false // Ocultamos la leyenda por defecto de Chart.js
      },
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
    <div className="flex flex-col items-center w-full h-full p-1 lg:p-2">
      {/* Contenedor principal */}
      <div className="flex flex-col lg:flex-row items-center justify-start gap-2 lg:gap-3 xl:gap-6 w-full">
        {/* Gráfico Donut - Responsive con Tailwind */}
        <div className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Leyenda y título */}
        <div className="flex flex-col gap-1 lg:gap-2 flex-grow">
          {/* Título */}
          <h3 className="text-tertiary font-normal text-xs lg:text-sm xl:text-base 2xl:text-lg mb-1 lg:mb-2 text-center lg:text-left">
            {title}
          </h3>
          
          {/* Leyenda personalizada */}
          <div className="flex flex-col gap-1 lg:gap-1.5 xl:gap-2">
            {type === 'gender' ? (
              // Leyenda especial para género con iconos y porcentajes
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 justify-center lg:justify-start">
                {dataWithPercentages.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {item.label === 'Masculino' || item.label === 'Hombres' ? (
                        <IoIosMan  
                          className="text-sm lg:text-base xl:text-lg 2xl:text-xl"
                          style={{ color: item.color }}
                        />
                      ) : (
                        <IoIosWoman 
                          className="text-sm lg:text-base xl:text-lg 2xl:text-xl"
                          style={{ color: item.color }}
                        />
                      )}
                      <span className="font-bold text-xs lg:text-sm xl:text-base 2xl:text-lg text-gray-400">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Leyenda normal para otros gráficos - Grid responsive
              <div className={`
                ${dataWithPercentages.length > 4 ? 'grid grid-cols-2 lg:grid-cols-1' : 'grid grid-cols-2 lg:flex lg:flex-col'} 
                gap-x-1 lg:gap-x-2 gap-y-0.5 lg:gap-y-1
              `}>
                {dataWithPercentages.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                    <div 
                      className="w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                      <span className="text-xs lg:text-sm text-gray-600 truncate max-w-[60px] lg:max-w-[100px] xl:max-w-[150px]">
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