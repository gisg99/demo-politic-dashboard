import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IoIosWoman, IoIosMan   } from "react-icons/io";

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
    maintainAspectRatio: false,
    responsive: true
  };

  // Calcular porcentajes
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  return (
    <div className="flex flex-col items-center w-full h-full p-2">
      {/* Contenedor principal */}
      <div className="flex items-center justify-start px-15 gap-6 w-full">
        {/* Gráfico Donut */}
        <div className="relative w-32 h-32 lg:w-40 lg:h-40">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Leyenda personalizada */}
        <div className="flex flex-col gap-2">
            {/* Título */}
      <h3 className="text-tertiary font-normal text-sm lg:text-base mb-4">
        {title}
      </h3>
          {type === 'gender' ? (
            // Leyenda especial para género con iconos y porcentajes
            dataWithPercentages.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                
                <div className="flex items-center gap-1">
                  {item.label === 'Masculino' || item.label === 'Hombres' ? (
                    <IoIosMan  size={30}
                      style={{ color: item.color }}
                    />
                  ) : (
                    <IoIosWoman 
                      size={30}
                      style={{ color: item.color }}
                    />
                  )}
                  <span 
                    className="font-bold text-lg lg:text-xl text-gray-400"
                  >
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))
          ) : (
            // Leyenda normal para otros gráficos
            dataWithPercentages.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs lg:text-sm text-gray-600 whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export {DonutChart2};