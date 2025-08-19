import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

const LineChart2 = ({ participacion }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Registrar componentes de Chart.js
    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.PointElement,
      Chart.LineElement,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend
    );

    if (chartRef.current) {
      // Destruir gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Detectar si es móvil
      const isMobile = window.innerWidth < 1024;
       
      chartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: {
          labels: participacion.historico.map(item => item.ano),
          datasets: [
            {
              label: 'Histórico',
              data: participacion.historico.map(item => item.porcentaje),
              borderColor: '#8B0000',
              backgroundColor: 'rgba(139, 0, 0, 0.1)',
              borderWidth: isMobile ? 2 : 2,
              pointBackgroundColor: '#8B0000',
              pointBorderColor: '#8B0000',
              pointRadius: isMobile ? 3 : 4,
              pointHoverRadius: isMobile ? 4 : 6,
              tension: 0.1
            },
            {
              label: 'Actual',
              data: participacion.actual.map(item => item.porcentaje),
              borderColor: '#FFA500',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
              borderWidth: isMobile ? 2 : 2,
              pointBackgroundColor: '#FFA500',
              pointBorderColor: '#FFA500',
              pointRadius: isMobile ? 3 : 4,
              pointHoverRadius: isMobile ? 4 : 6,
              tension: 0.1,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: isMobile ? 5 : 10,
              right: isMobile ? 5 : 10,
              top: isMobile ? 5 : 10,
              bottom: isMobile ? 5 : 10
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 40,
              max: 85,
              ticks: {
                font: {
                  size: isMobile ? 8 : 10
                },
                color: '#6B7280',
                callback: function(value) {
                  return value + '%';
                }
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              ticks: {
                font: {
                  size: isMobile ? 8 : 10
                },
                color: '#6B7280'
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: !isMobile, // Ocultar leyenda en móvil
              labels: {
                font: {
                  size: isMobile ? 10 : 12
                },
                color: '#374151'
              }
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
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.y + '%';
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [participacion]);

  // Detectar si es móvil para ajustar dimensiones
  const isMobile = window.innerWidth < 1024;

  return (
    <div style={{ 
      width: isMobile ? '100%' : '60%', 
      height: isMobile ? '150px' : '200px' 
    }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { LineChart2 };