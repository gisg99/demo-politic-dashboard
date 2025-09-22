// src/components/CircleChart.jsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { BsPersonFill } from 'react-icons/bs';

ChartJS.register(ArcElement, Tooltip, Legend);

const AGE_ORDER = ['18-25','26-34','35-44','45-54','55-64','65+'];
const GENDER_ORDER = ['Masculino','Femenino'];
const NSE_ORDER = ['A/B','C+','C','C-','D/E'];

// Paletas “de siempre”
const PALETTE_AGE    = ['#E0E0E0','#BDBDBD','#FFC107','#FFB74D','#FF9800','#FF6B35'];
const PALETTE_GENDER = ['#FFB74D','#FF8A65'];
const PALETTE_NSE    = ['#2E86DE','#54A0FF','#38B6FF','#00CEC9','#10AC84'];

// Paleta genérica de respaldo
const PALETTE_FALLBACK = [
  '#FF6B35','#FFB74D','#FFC107','#FFD54F','#38B6FF','#54A0FF','#2E86DE','#00CEC9','#10AC84','#9E9E9E'
];

function normalizeNumber(n) {
  const x = Number(n);
  return Number.isFinite(x) ? x : 0;
}

function padColors(colors, needed) {
  const out = [];
  for (let i = 0; i < needed; i++) {
    out.push(colors[i % colors.length]);
  }
  return out;
}

/**
 * Devuelve un array de colores alineado a `labels`
 * Prioridad:
 * 1) colors prop
 * 2) item.color
 * 3) paletas por label (edad/género/NSE)
 * 4) fallback
 */
function resolveColors(labels, items, propColors) {
  // 1) colors desde props
  if (Array.isArray(propColors) && propColors.length > 0) {
    return padColors(propColors, labels.length);
  }

  // 2) item.color en los datos
  const itemColors = items.map(it => it.color).filter(Boolean);
  if (itemColors.length === labels.length) {
    return itemColors;
  }

  // 3) detectar tipo por labels y asignar paleta conocida
  const lower = labels.map(l => String(l).toLowerCase());
  const isAge = AGE_ORDER.every(l => lower.includes(l.toLowerCase())) || lower.some(l => AGE_ORDER.map(s=>s.toLowerCase()).includes(l));
  const isGender = GENDER_ORDER.every(l => lower.includes(l.toLowerCase())) || lower.some(l => GENDER_ORDER.map(s=>s.toLowerCase()).includes(l));
  const isNSE = NSE_ORDER.some(l => lower.includes(l.toLowerCase()));

  if (isAge) {
    // Ordenar a AGE_ORDER y asignar colores en ese orden
    const idxByLabel = Object.fromEntries(labels.map((l,i)=>[l,i]));
    const ordered = AGE_ORDER.filter(l => labels.includes(l));
    const colors = new Array(labels.length);
    ordered.forEach((label, i) => { colors[idxByLabel[label]] = PALETTE_AGE[i % PALETTE_AGE.length]; });
    // Para labels “extra”, rellena con fallback
    return colors.map((c, i) => c || PALETTE_AGE[i % PALETTE_AGE.length]);
  }

  if (isGender) {
    const map = { Masculino: PALETTE_GENDER[0], Femenino: PALETTE_GENDER[1] };
    return labels.map((l, i) => map[l] || PALETTE_GENDER[i % PALETTE_GENDER.length]);
  }

  if (isNSE) {
    const map = { 'A/B': PALETTE_NSE[0], 'C+': PALETTE_NSE[1], 'C': PALETTE_NSE[2], 'C-': PALETTE_NSE[3], 'D/E': PALETTE_NSE[4] };
    return labels.map((l, i) => map[l] || PALETTE_NSE[i % PALETTE_NSE.length]);
  }

  // 4) fallback genérico
  return padColors(PALETTE_FALLBACK, labels.length);
}

const CircleChart = ({
  title,
  data,                       // [{label, value, color?}]
  showLegend = true,
  legendPosition = 'left',    // 'left' | 'right'
  size = 'medium',            // 'small' | 'medium' | 'large'
  colors,                     // opcional: colores desde el screen
  sortDesc = true             // por defecto ordena de mayor a menor
}) => {
  const isBrowser = typeof window !== 'undefined';
  const isMobile = isBrowser ? window.innerWidth < 1024 : false;

  // Sanitiza datos
  const base = Array.isArray(data) ? data.map(d => ({
    label: String(d?.label ?? ''),
    value: normalizeNumber(d?.value),
    color: d?.color
  })) : [];

  const sorted = sortDesc ? [...base].sort((a, b) => b.value - a.value) : base;

  const sizes = {
    small:  { width: isMobile ? 70  : 120, height: isMobile ? 70  : 120 },
    medium: { width: isMobile ? 90  : 160, height: isMobile ? 90  : 160 },
    large:  { width: isMobile ? 110 : 200, height: isMobile ? 110 : 200 }
  };
  const currentSize = sizes[size] || sizes.medium;

  const labels = sorted.map(it => it.label);
  const values = sorted.map(it => it.value);

  // 🎨 Resuelve colores (props → item.color → paletas por label → fallback)
  const bgColors = resolveColors(labels, sorted, colors);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: bgColors,
      borderWidth: 0
    }]
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        titleFont: { size: isMobile ? 10 : 14, weight: 'bold' },
        bodyFont:  { size: isMobile ? 9  : 13 },
        padding:   isMobile ? 6 : 12,
        callbacks: {
          label: function(ctx) {
            const label = ctx.label || '';
            const value = normalizeNumber(ctx.parsed);
            const total = (ctx.dataset.data || []).reduce((a, b) => normalizeNumber(a) + normalizeNumber(b), 0);
            const pct = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${pct}%`;
          }
        }
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: { duration: 300 }
  };

  // porcentajes para leyenda
  const total = values.reduce((a,b)=>a+b,0);
  const dataWithPercentages = sorted.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0
  }));

  const renderLegend = () => (
    <div className="flex flex-col justify-center gap-1 sm:gap-1 lg:gap-3">
      {dataWithPercentages.map((item, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-1 lg:gap-2">
          <BsPersonFill
            className="text-xs sm:text-sm lg:text-xl flex-shrink-0"
            style={{ color: bgColors[index] }}
          />
          <span
            className="font-bold text-xs sm:text-sm lg:text-lg flex-shrink-0"
            style={{ color: bgColors[index] }}
          >
            {item.percentage}%
          </span>
          <span className="text-gray-600 text-xs sm:text-xs lg:text-sm font-medium uppercase">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center w-full h-full p-2 lg:p-4">
      <div className={`flex items-center gap-3 sm:gap-2 lg:gap-6 ${legendPosition === 'right' ? 'flex-row-reverse' : ''}`}>
        {showLegend && <div className="flex-1">{renderLegend()}</div>}

        <div
          className="flex-shrink-0"
          style={{ width: `${currentSize.width}px`, height: `${currentSize.height}px` }}
        >
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export { CircleChart };
