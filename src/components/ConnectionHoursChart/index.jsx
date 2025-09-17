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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
  // Datos por defecto (OBJETOS)
  const defaultData = [
    { hora: 0, total: 850 },  { hora: 1, total: 520 },  { hora: 2, total: 380 },  { hora: 3, total: 290 },
    { hora: 4, total: 220 },  { hora: 5, total: 340 },  { hora: 6, total: 680 },  { hora: 7, total: 1580 },
    { hora: 8, total: 2180 }, { hora: 9, total: 2450 }, { hora:10, total: 2280 }, { hora:11, total: 2120 },
    { hora:12, total: 1980 }, { hora:13, total: 2150 }, { hora:14, total: 2320 }, { hora:15, total: 2480 },
    { hora:16, total: 2550 }, { hora:17, total: 2420 }, { hora:18, total: 2380 }, { hora:19, total: 2250 },
    { hora:20, total: 2100 }, { hora:21, total: 1850 }, { hora:22, total: 1420 }, { hora:23, total: 980 }
  ];

  // --- Normalización: admite [número] o [{hora,total}] ---
  const normalizeToNumbers24 = (raw) => {
    // si no viene data, usa default
    const src = Array.isArray(raw) ? raw : defaultData;

    // si son objetos con {total}, mapea a números; si son números, usa tal cual
    let nums = src.map((item, idx) => {
      if (item && typeof item === 'object') {
        // tolerante con claves distintas; cae a 0 si no hay dato
        const v = item.total ?? item.value ?? 0;
        return Number(v) || 0;
      }
      return Number(item) || 0; // ya eran números
    });

    // forzar 24 valores: recorta o rellena con 0
    if (nums.length < 24) nums = [...nums, ...Array(24 - nums.length).fill(0)];
    if (nums.length > 24) nums = nums.slice(0, 24);
    return nums;
  };

  const values = normalizeToNumbers24(data);
  const labels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false;

  const chartData = {
    labels,
    datasets: [{
      label: 'Número de conexiones',
      data: values,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      borderRadius: 4,
      barPercentage: 0.8,
      categoryPercentage: 0.9,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: 'top',
        labels: { font: { size: isMobile ? 9 : 11 }, color: '#6B7280' }
      },
      title: {
        display: !!title && !isMobile,
        text: title,
        font: { size: isMobile ? 12 : 14, weight: '600' },
        color: '#374151',
        padding: { top: 10, bottom: 20 }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: isMobile ? 10 : 12 },
        bodyFont: { size: isMobile ? 9 : 11 },
        padding: isMobile ? 8 : 10,
        displayColors: false,
        callbacks: {
          title: (ctx) => `Hora: ${ctx[0]?.label ?? ''}`,
          label: (ctx) => `Conexiones: ${(Number(ctx.parsed.y) || 0).toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: showGrid, color: 'rgba(0,0,0,0.05)', drawBorder: false },
        ticks: {
          font: { size: isMobile ? 8 : 9 },
          color: '#6B7280',
          maxRotation: isMobile ? 90 : 45,
          minRotation: isMobile ? 90 : 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 12 : 24,
          callback: function(value, index) {
            return index % 2 === 0 ? this.getLabelForValue(value) : '';
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: { display: showGrid, color: 'rgba(0,0,0,0.05)', drawBorder: false },
        ticks: {
          font: { size: isMobile ? 8 : 10 },
          color: '#6B7280',
          padding: 5,
          callback: function(v) {
            const n = Number(v) || 0;
            return isMobile ? (n >= 1000 ? `${(n/1000).toFixed(0)}K` : n) : n.toLocaleString();
          }
        },
        title: {
          display: !isMobile,
          text: 'Número de conexiones',
          font: { size: isMobile ? 9 : 11 },
          color: '#6B7280'
        }
      }
    },
    interaction: { mode: 'index', intersect: false },
    layout: { padding: { left: isMobile ? 5 : 10, right: isMobile ? 5 : 10, top: 0, bottom: isMobile ? 5 : 10 } }
  };

  // Stats (opcionales)
  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);
  const peakHour = labels[values.indexOf(maxVal)] ?? '--:--';
  const lowHour  = labels[values.indexOf(minVal)] ?? '--:--';

  const responsiveHeight = isMobile ? '200px' : height;

  return (
    <div className="w-full h-full flex flex-col">
      <div style={{ height: responsiveHeight }} className="w-full">
        <Bar data={chartData} options={options} />
      </div>

      {showStats && (
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm text-gray-600">
          <div><span className="font-semibold">Total: </span>{total.toLocaleString()}</div>
          <div><span className="font-semibold">Promedio: </span>{avg.toLocaleString()}</div>
          <div><span className="font-semibold">Pico: </span>{peakHour}</div>
          <div><span className="font-semibold">Mínima: </span>{lowHour}</div>
        </div>
      )}
    </div>
  );
};

export { ConnectionHoursChart };
