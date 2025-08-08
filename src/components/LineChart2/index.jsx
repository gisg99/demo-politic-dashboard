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
              borderWidth: 2,
              pointBackgroundColor: '#8B0000',
              pointBorderColor: '#8B0000',
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1
            },
            {
              label: 'Actual',
              data: participacion.actual.map(item => item.porcentaje),
              borderColor: '#FFA500',
              backgroundColor: 'rgba(255, 165, 0, 0.1)',
              borderWidth: 2,
              pointBackgroundColor: '#FFA500',
              pointBorderColor: '#FFA500',
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1,
              borderDash: [5, 5]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              min: 40,
              max: 85,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            tooltip: {
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
  }, []);

  return (
    <div style={{ width: '60%', height: '200px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { LineChart2 };