import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler
);

const ApprovalVsCompetencyChart = ({ 
  title = "Aprobación por Partido",
  width = "100%",
  height = "500px"
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Solo mostrar APROBACIÓN por partido - más limpio y claro
  const chartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'MC',
        data: [42, 44, 47, 49, 51, 54, 56, 55, 53, 52, 50, 48],
        borderColor: '#FF8C00',
        backgroundColor: 'rgba(255, 140, 0, 0.05)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#FF8C00',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false
      },
      {
        label: 'MORENA',
        data: [60, 58, 56, 54, 52, 50, 48, 47, 48, 50, 52, 53],
        borderColor: '#DC2626',
        backgroundColor: 'rgba(220, 38, 38, 0.05)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#DC2626',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false
      },
      {
        label: 'PAN',
        data: [33, 35, 37, 40, 42, 45, 46, 48, 47, 45, 44, 42],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.05)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#2563EB',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false
      },
      {
        label: 'PRI',
        data: [25, 27, 29, 31, 33, 35, 37, 38, 37, 36, 35, 34],
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.05)',
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#059669',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        fill: false
      }
    ]
  };

  useEffect(() => {
    if (!chartRef.current) return;
    
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Detectar si es móvil
    const isMobile = window.innerWidth < 1024;

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              size: isMobile ? 10 : 14,
              weight: '600'
            },
            color: '#374151',
            padding: isMobile ? 10 : 25,
            boxWidth: isMobile ? 8 : 12,
            boxHeight: isMobile ? 8 : 12
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(17, 24, 39, 0.95)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: '#374151',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          titleFont: { size: isMobile ? 12 : 14, weight: 'bold' },
          bodyFont: { size: isMobile ? 11 : 13 },
          padding: isMobile ? 8 : 12,
          callbacks: {
            title: function(context) {
              return context[0].label;
            },
            label: function(context) {
              return `${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 20,
          max: 70,
          grid: {
            color: 'rgba(156, 163, 175, 0.2)',
            drawBorder: false
          },
          ticks: {
            color: '#6B7280',
            font: { size: isMobile ? 10 : 12, weight: '500' },
            callback: function(value) {
              return value + '%';
            },
            stepSize: 10
          },
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6B7280',
            font: { size: isMobile ? 10 : 12, weight: '500' }
          },
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      },
      elements: {
        point: {
          hoverBackgroundColor: 'white',
          hoverBorderWidth: 3,
          radius: isMobile ? 3 : 5,
          hoverRadius: isMobile ? 6 : 8
        },
        line: {
          borderWidth: isMobile ? 2 : 3
        }
      }
    };

    try {
      chartInstance.current = new Chart.Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options
      });
    } catch (error) {
      console.error('Error creando el gráfico:', error);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  // Altura responsive
  const responsiveHeight = window.innerWidth < 1024 ? "300px" : "350px";

  return (
  <div className="p-2 lg:p-6 w-full" style={{ width }}>      
    {/* Contenedor del gráfico */}
    <div className="relative" style={{ height: responsiveHeight }}>
      <canvas ref={chartRef}></canvas>
    </div>
  </div>
);
};

export { ApprovalVsCompetencyChart };