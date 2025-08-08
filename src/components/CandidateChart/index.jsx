import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

const CandidateChart = ({ dataCandidatos = [] }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Datos por defecto si no se proporcionan
  const defaultData = [
    { nombre: 'Candidato A', porcentaje: 15, color: '#FF6B6B' },
    { nombre: 'Candidato B', porcentaje: 14, color: '#FFB366' },
    { nombre: 'Candidato C', porcentaje: 10, color: '#FFD93D' },
    { nombre: 'Candidato D', porcentaje: 16, color: '#FF8C42' },
    { nombre: 'Candidato E', porcentaje: 25, color: '#FF7F50' },
    { nombre: 'Candidato F', porcentaje: 20, color: '#FF9F40' }
  ];

  const candidatos = dataCandidatos.length > 0 ? dataCandidatos : defaultData;

  useEffect(() => {
    // Registrar todos los componentes necesarios de Chart.js
    Chart.Chart.register(
      Chart.CategoryScale,
      Chart.LinearScale,
      Chart.BarElement,
      Chart.Title,
      Chart.Tooltip,
      Chart.Legend
    );

    const ctx = chartRef.current.getContext('2d');

    // Destruir gráfica anterior si existe
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Crear nueva gráfica
    chartInstanceRef.current = new Chart.Chart(ctx, {
      type: 'bar',
      data: {
        labels: candidatos.map(c => c.nombre),
        datasets: [{
          data: candidatos.map(c => c.porcentaje),
          backgroundColor: candidatos.map(c => c.color),
          borderRadius: 4,
          borderSkipped: false,
        }]
      },
      options: {
        indexAxis: 'y', // Barras horizontales
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.parsed.x}%`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            max: Math.max(...candidatos.map(c => c.porcentaje)) + 5,
            grid: {
              display: false
            },
            ticks: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 14,
                weight: '500'
              },
              color: '#4A5568',
              padding: 15
            },
            border: {
              display: false
            }
          }
        },
        layout: {
          padding: {
            right: 60 // Espacio para mostrar los porcentajes
          }
        },
        elements: {
          bar: {
            borderRadius: 4
          }
        }
      },
      plugins: [{
        id: 'percentageLabels',
        afterDatasetsDraw: function(chart) {
          const ctx = chart.ctx;
          const dataset = chart.data.datasets[0];
          
          chart.data.labels.forEach((label, index) => {
            const meta = chart.getDatasetMeta(0);
            const bar = meta.data[index];
            const value = dataset.data[index];
            
            // Configurar el estilo del texto
            ctx.fillStyle = '#4A5568';
            ctx.font = 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            
            // Posicionar el texto al final de la barra
            const x = bar.x + 10;
            const y = bar.y;
            
            ctx.fillText(`${value}%`, x, y);
          });
        }
      }]
    });

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [candidatos]);

  return (
    <div className="w-full p-6 rounded-lg">
      <div className="h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export {CandidateChart};