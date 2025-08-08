import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend
);

const PoliticalMentionsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = {
      labels: ['MC', '', 'MR', '', 'PN', '', 'VD', '', 'PRI', ''],
      datasets: [{
        data: [115.6, 62, 113.2, 56, 98.4, 48, 87.9, 52, 74, 48],
        backgroundColor: [
          '#FFB340', '#FF8C00', // MC - naranjas
          '#FF6B6B', '#DC3545', // MR - rojos
          '#4ECDC4', '#2E86C1', // PN - turquesa/azul
          '#90EE90', '#28A745', // VD - verdes
          '#FF6B6B', '#DC3545'  // PRI - rojos
        ],
        borderRadius: 2,
        barThickness: 'flex'
      }]
    };

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: false 
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            cornerRadius: 6,
            displayColors: false,
            callbacks: {
              title: function(context) {
                const index = context[0].dataIndex;
                const parties = ['MC', 'MC', 'MR', 'MR', 'PN', 'PN', 'VD', 'VD', 'PRI', 'PRI'];
                const types = ['Principal', 'Secundario', 'Principal', 'Secundario', 'Principal', 'Secundario', 'Principal', 'Secundario', 'Principal', 'Secundario'];
                return `${parties[index]} - ${types[index]}`;
              },
              label: function(context) {
                return `Menciones: ${context.parsed.y}k`;
              }
            }
          }
        },
        scales: {
          y: {
            display: false,
            beginAtZero: true,
            max: 120
          },
          x: {
            grid: { 
              display: false 
            },
            ticks: {
              color: '#9CA3AF',
              font: { 
                size: window.innerWidth < 768 ? 12 : window.innerWidth < 1024 ? 14 : 16, 
                weight: '600' 
              },
              callback: function(value, index) {
                const labels = ['MC', '', 'MR', '', 'PN', '', 'VD', '', 'PRI', ''];
                return labels[index];
              }
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full items-center lg:items-end gap-4 lg:gap-6 xl:gap-8">    
      
      {/* Gráfico de barras con Chart.js - RESPONSIVE */}
      <div className="relative h-48 md:h-56 lg:h-64 w-full lg:flex-1 lg:min-w-0">
        <canvas ref={chartRef}></canvas>
      </div>
      
      {/* Círculos de estadísticas - RESPONSIVE */}
      <div className="flex flex-row lg:flex-col justify-center lg:justify-start flex-wrap lg:flex-nowrap gap-3 md:gap-4 lg:space-y-2 xl:space-y-4 lg:flex-shrink-0 w-full lg:w-auto">
        
        {/* MC */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center">
          <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="#FFE4B5" strokeWidth="6" fill="none" />
              <circle cx="50%" cy="50%" r="40%" stroke="#FFB340" strokeWidth="6" 
                      fill="none" strokeDasharray="176" strokeDashoffset="44" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-gray-700">115,6k</span>
            </div>
          </div>
          <span className="mt-1 lg:mt-0 lg:ml-2 xl:ml-3 text-xs md:text-sm text-gray-600 font-medium">MC</span>
        </div>

        {/* MORENA */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center">
          <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="#FFE4E1" strokeWidth="6" fill="none" />
              <circle cx="50%" cy="50%" r="40%" stroke="#FF6B6B" strokeWidth="6" 
                      fill="none" strokeDasharray="176" strokeDashoffset="52" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-gray-700">113,2k</span>
            </div>
          </div>
          <span className="mt-1 lg:mt-0 lg:ml-2 xl:ml-3 text-xs md:text-sm text-gray-600 font-medium">MORENA</span>
        </div>

        {/* PAN */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center">
          <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="#E3F2FD" strokeWidth="6" fill="none" />
              <circle cx="50%" cy="50%" r="40%" stroke="#2E86C1" strokeWidth="6" 
                      fill="none" strokeDasharray="176" strokeDashoffset="66" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-gray-700">98,4k</span>
            </div>
          </div>
          <span className="mt-1 lg:mt-0 lg:ml-2 xl:ml-3 text-xs md:text-sm text-gray-600 font-medium">PAN</span>
        </div>

        {/* PRI */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center">
          <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="50%" cy="50%" r="40%" stroke="#E8F5E8" strokeWidth="6" fill="none" />
              <circle cx="50%" cy="50%" r="40%" stroke="#28A745" strokeWidth="6" 
                      fill="none" strokeDasharray="176" strokeDashoffset="80" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs md:text-sm font-bold text-gray-700">87,9k</span>
            </div>
          </div>
          <span className="mt-1 lg:mt-0 lg:ml-2 xl:ml-3 text-xs md:text-sm text-gray-600 font-medium">PRI</span>
        </div>
        
      </div>
    </div>
  );
};

export { PoliticalMentionsChart };