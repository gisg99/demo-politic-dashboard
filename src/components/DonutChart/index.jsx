import { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

// Registrar los componentes necesarios de Chart.js
Chart.Chart.register(
  Chart.ArcElement,
  Chart.Tooltip,
  Chart.Legend,
  Chart.DoughnutController
);

function DonutChart({ 
  percentage = 15,  
  timeText = "3 hrs", 
  size = "w-30 h-30",
  color = "#ff8a3d",
  backgroundColor = "#e5e5e5",
  showTime = true,
  className = ""
}) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // Destruir gráfico anterior si existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = canvasRef.current.getContext('2d');
      
      // Detectar si es móvil
      const isMobile = window.innerWidth < 1024;
      
      chartRef.current = new Chart.Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [percentage, 100 - percentage],
            backgroundColor: [color, backgroundColor],
            borderWidth: 0,
            cutout: '70%',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false
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
                  return `${context.parsed}%`;
                }
              }
            }
          },
          elements: {
            arc: {
              borderRadius: 4
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [percentage, color, backgroundColor]);

  // Tamaños responsive
  const responsiveSize = window.innerWidth < 1024 ? "w-20 h-20" : size;

  return (
    <div className={`flex flex-col w-full items-center font-sans ${className}`}>
      {/* Contenedor del gráfico */}
      <div className={`relative ${responsiveSize} lg:${size}`}>
        <canvas 
          ref={canvasRef}
          className="w-full h-full"
        />
        {/* Texto del porcentaje centrado */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-2xl lg:mb-0 mb-10 lg:text-4xl font-bold text-gray-400">
            {percentage}%
          </span>
        </div>
      </div>
      
      {/* Tiempo con ícono (opcional) */}
      {showTime && (
        <div className="flex items-center gap-1 mt-1 lg:mt-2 text-lg lg:text-xl font-semibold text-gray-400">
          <svg 
            className="w-5 h-5 lg:w-7 lg:h-7 opacity-70" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
          </svg>
          <span className="text-sm lg:text-xl">{timeText}</span>
        </div>
      )}
    </div>
  );
}

export { DonutChart };