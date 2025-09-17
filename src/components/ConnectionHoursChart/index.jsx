import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * ConnectionHoursChart - Componente de gráfico de barras para Horarios de Conexión
 * Usa Chart.js a través de react-chartjs-2
 * 
 * @param {Array} data - Array de 24 elementos con el número de conexiones por hora
 * @param {String} title - Título del gráfico (default: 'Horarios de Conexión más Frecuentes')
 * @param {String} backgroundColor - Color de las barras (default: naranja)
 * @param {String} borderColor - Color del borde de las barras
 * @param {Boolean} showGrid - Mostrar grid (default: true)
 * @param {Boolean} showLegend - Mostrar leyenda (default: false)
 * @param {String} height - Altura del gráfico (default: '300px')
 * @param {Boolean} showStats - Mostrar estadísticas debajo del gráfico (default: true)
 */
const ConnectionHoursChart = ({
  data = null,
  title = 'Horarios de Conexión más Frecuentes',
  backgroundColor = 'rgba(255, 159, 64, 0.8)',
  borderColor = 'rgba(255, 159, 64, 1)',
  showGrid = true,
  showLegend = false,
  height = '300px',
  showStats = true
}) => {
  
  // Datos por defecto - distribución típica de conexiones durante el día
  const defaultData = [
    {"hora": 0, "total": 850},
    {"hora": 1, "total": 520},
    {"hora": 2, "total": 380},
    {"hora": 3, "total": 290},
    {"hora": 4, "total": 220},
    {"hora": 5, "total": 340},
    {"hora": 6, "total": 680},
    {"hora": 7, "total": 1580},
    {"hora": 8, "total": 2180},
    {"hora": 9, "total": 2450},
    {"hora": 10, "total": 2280},
    {"hora": 11, "total": 2120},
    {"hora": 12, "total": 1980},
    {"hora": 13, "total": 2150},
    {"hora": 14, "total": 2320},
    {"hora": 15, "total": 2480},
    {"hora": 16, "total": 2550},
    {"hora": 17, "total": 2420},
    {"hora": 18, "total": 2380},
    {"hora": 19, "total": 2250},
    {"hora": 20, "total": 2100},
    {"hora": 21, "total": 1850},
    {"hora": 22, "total": 1420},
    {"hora": 23, "total": 980}
  ];
  
  const hoursData = data || defaultData;
  
  // Validar que tengamos 24 valores
  const validatedData = hoursData.length === 24 
    ? hoursData 
    : [...hoursData, ...Array(24 - hoursData.length).fill(0)].slice(0, 24);
  
  // Generar etiquetas de horas
  const labels = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });
  
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;
  
  // Configuración de datos para Chart.js
  const chartData = {
    labels: data ? data.map(item => item.hora.toString().padStart(2, '0') + ':00') : defaultData.map(item => item.hora.toString().padStart(2, '0') + ':00'),
    datasets: [
      {
        label: 'Número de conexiones',
        data: data ? data.map(item => item.total) : defaultData.map(item => item.total),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.9,
      }
    ]
  };
  
  // Opciones de configuración para Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: {
          font: {
            size: isMobile ? 9 : 11
          },
          color: '#6B7280'
        }
      },
      title: {
        display: !!title && !isMobile, // Ocultar título en móvil
        text: title,
        font: {
          size: isMobile ? 12 : 14,
          weight: '600'
        },
        color: '#374151',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: {
          size: isMobile ? 10 : 12
        },
        bodyFont: {
          size: isMobile ? 9 : 11
        },
        padding: isMobile ? 8 : 10,
        displayColors: false,
        callbacks: {
          title: function(context) {
            return `Hora: ${context[0].label}`;
          },
          label: function(context) {
            return `Conexiones: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 9
          },
          color: '#6B7280',
          maxRotation: isMobile ? 90 : 45,
          minRotation: isMobile ? 90 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 12 : 24,
          callback: function(value, index) {
            // En móvil mostrar cada 2 horas, en desktop cada hora par
            return isMobile 
              ? index % 2 === 0 ? this.getLabelForValue(value) : ''
              : index % 2 === 0 ? this.getLabelForValue(value) : '';
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          display: showGrid,
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: isMobile ? 8 : 10
          },
          color: '#6B7280',
          padding: 5,
          callback: function(value) {
            return isMobile 
              ? value >= 1000 ? (value / 1000).toFixed(0) + 'K' : value
              : value.toLocaleString();
          }
        },
        title: {
          display: !isMobile, // Ocultar título del eje Y en móvil
          text: 'Número de conexiones',
          font: {
            size: isMobile ? 9 : 11
          },
          color: '#6B7280'
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    layout: {
      padding: {
        left: isMobile ? 5 : 10,
        right: isMobile ? 5 : 10,
        top: 0,
        bottom: isMobile ? 5 : 10
      }
    }
  };
  
  // Función para obtener estadísticas
  const getStats = () => {
    const max = Math.max(...validatedData);
    const min = Math.min(...validatedData);
    const avg = Math.round(validatedData.reduce((a, b) => a + b, 0) / validatedData.length);
    const peakHour = validatedData.indexOf(max);
    const lowHour = validatedData.indexOf(min);
    const total = validatedData.reduce((a, b) => a + b, 0);
    
    return { max, min, avg, peakHour, lowHour, total };
  };
  
  const stats = getStats();
  
  // Altura responsive
  const responsiveHeight = isMobile ? '200px' : height;
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Gráfico de Chart.js */}
      <div style={{ height: responsiveHeight }} className="w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export { ConnectionHoursChart };