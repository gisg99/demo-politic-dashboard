import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BsPersonFill } from 'react-icons/bs';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CircleChart = ({ 
  title,
  data,
  showLegend = true,
  legendPosition = 'left', // 'left' o 'right'
  size = 'medium' // 'small', 'medium', 'large'
}) => {
  
  // Ordenar los datos de mayor a menor
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Tamaños predefinidos
  const sizes = {
    small: { width: 120, height: 120 },
    medium: { width: 160, height: 160 },
    large: { width: 200, height: 200 }
  };

  const currentSize = sizes[size] || sizes.medium;

  // Configuración del gráfico
  const chartData = {
    labels: sortedData.map(item => item.label),
    datasets: [{
      data: sortedData.map(item => item.value),
      backgroundColor: sortedData.map(item => item.color),
      borderWidth: 0,
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
            const percentage = ((value / total) * 100).toFixed(0);
            return `${label}: ${percentage}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true
  };

  // Calcular porcentajes
  const total = sortedData.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercentages = sortedData.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100)
  }));

  // Renderizar el contenido de la leyenda
  const renderLegend = () => (
    <div className="flex flex-col justify-center gap-3">
      {dataWithPercentages.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Icono de persona con color */}
          <BsPersonFill 
            className="text-xl"
            style={{ color: item.color }}
          />
          {/* Porcentaje */}
          <span 
            className="font-bold text-lg"
            style={{ color: item.color }}
          >
            {item.percentage}%
          </span>
          {/* Label */}
          <span className="text-gray-600 text-sm font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      {/* Contenedor principal */}
      <div className={`flex items-center gap-6 ${legendPosition === 'right' ? 'flex-row-reverse' : ''}`}>
        {/* Leyenda con iconos */}
        {showLegend && renderLegend()}

        {/* Gráfico Circular */}
        <div 
          style={{ 
            width: `${currentSize.width}px`, 
            height: `${currentSize.height}px` 
          }}
        >
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export { CircleChart };
