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
    850,   // 00:00
    520,   // 01:00
    380,   // 02:00
    290,   // 03:00
    220,   // 04:00
    340,   // 05:00
    680,   // 06:00
    1580,  // 07:00
    2180,  // 08:00
    2450,  // 09:00
    2280,  // 10:00
    2120,  // 11:00
    1980,  // 12:00
    2150,  // 13:00
    2320,  // 14:00
    2480,  // 15:00
    2550,  // 16:00
    2420,  // 17:00
    2380,  // 18:00
    2250,  // 19:00
    2100,  // 20:00
    1850,  // 21:00
    1420,  // 22:00
    980    // 23:00
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
  
  // Configuración de datos para Chart.js
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Número de conexiones',
        data: validatedData,
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
            size: 11
          },
          color: '#6B7280'
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 14,
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
          size: 12
        },
        bodyFont: {
          size: 11
        },
        padding: 10,
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
            size: 9
          },
          color: '#6B7280',
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          maxTicksLimit: 24,
          callback: function(value, index) {
            // Mostrar solo horas pares para evitar saturación
            return index % 2 === 0 ? this.getLabelForValue(value) : '';
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
            size: 10
          },
          color: '#6B7280',
          padding: 5,
          callback: function(value) {
            return value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: 'Número de conexiones',
          font: {
            size: 11
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
        left: 10,
        right: 10,
        top: 0,
        bottom: 10
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
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Gráfico de Chart.js */}
      <div style={{ height }} className="w-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export { ConnectionHoursChart };