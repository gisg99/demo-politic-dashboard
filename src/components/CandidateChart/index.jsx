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

    // Detectar si es móvil
    const isMobile = window.innerWidth < 1024;

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
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 8,
            titleFont: { size: isMobile ? 12 : 14, weight: 'bold' },
            bodyFont: { size: isMobile ? 11 : 13 },
            padding: isMobile ? 8 : 12,
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
                size: isMobile ? 10 : 14,
                weight: '500'
              },
              color: '#4A5568',
              padding: isMobile ? 8 : 15
            },
            border: {
              display: false
            }
          }
        },
        layout: {
          padding: {
            right: isMobile ? 30 : 60 // Menos espacio en móvil para porcentajes
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
            
            // Configurar el estilo del texto responsive
            ctx.fillStyle = '#4A5568';
            ctx.font = isMobile ? 'bold 10px Arial' : 'bold 14px Arial';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            
            // Posicionar el texto al final de la barra
            const x = bar.x + (isMobile ? 5 : 10);
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
    <div className="w-full p-2 lg:p-6 rounded-lg">
      <div className="h-48 lg:h-80">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export {CandidateChart};