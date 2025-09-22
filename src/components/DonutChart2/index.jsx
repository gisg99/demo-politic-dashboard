// src/components/DonutChart2.jsx
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { IoIosWoman, IoIosMan } from "react-icons/io";

ChartJS.register(ArcElement, Tooltip, Legend);

// Órdenes/paletas conocidas
const AGE_ORDER     = ['18-25','26-34','35-44','45-54','55-64','65+'];
const GENDER_ORDER  = ['Masculino','Femenino'];
const NSE_ORDER     = ['A/B','C+','C','C-','D/E'];

const PALETTE_AGE    = ['#E0E0E0','#BDBDBD','#FFC107','#FFB74D','#FF9800','#FF6B35'];
const PALETTE_GENDER = ['#FFB74D','#FF8A65'];
const PALETTE_NSE    = ['#2E86DE','#54A0FF','#38B6FF','#00CEC9','#10AC84'];
const PALETTE_FALLBACK = ['#FF6B35','#FFB74D','#FFC107','#FFD54F','#38B6FF','#54A0FF','#2E86DE','#00CEC9','#10AC84','#9E9E9E'];

const normalize = (n) => {
  const v = Number(n);
  return Number.isFinite(v) ? v : 0;
};
const padColors = (arr, n) => Array.from({length: n}, (_, i) => arr[i % arr.length]);

function resolveColors(labels, items, colors, type) {
  // 1) colors por prop
  if (Array.isArray(colors) && colors.length) return padColors(colors, labels.length);

  // 2) item.color
  const itemColors = items.map(it => it.color).filter(Boolean);
  if (itemColors.length === labels.length) return itemColors;

  // 3) paletas por tipo / labels
  const lower = labels.map(l => String(l).toLowerCase());
  const isAge    = type !== 'gender' && AGE_ORDER.some(l => lower.includes(l.toLowerCase()));
  const isGender = type === 'gender' || GENDER_ORDER.some(l => lower.includes(l.toLowerCase()));
  const isNSE    = NSE_ORDER.some(l => lower.includes(l.toLowerCase()));

  if (isAge) {
    // alineamos a AGE_ORDER para colores consistentes
    const idxByLabel = Object.fromEntries(labels.map((l,i)=>[l,i]));
    const ordered = AGE_ORDER.filter(l => labels.includes(l));
    const out = new Array(labels.length);
    ordered.forEach((label, i) => { out[idxByLabel[label]] = PALETTE_AGE[i % PALETTE_AGE.length]; });
    return out.map((c,i)=> c || PALETTE_AGE[i % PALETTE_AGE.length]);
  }
  if (isGender) {
    const map = { Masculino: PALETTE_GENDER[0], Femenino: PALETTE_GENDER[1] };
    return labels.map((l, i) => map[l] || PALETTE_GENDER[i % PALETTE_GENDER.length]);
  }
  if (isNSE) {
    const map = { 'A/B': PALETTE_NSE[0], 'C+': PALETTE_NSE[1], 'C': PALETTE_NSE[2], 'C-': PALETTE_NSE[3], 'D/E': PALETTE_NSE[4] };
    return labels.map((l, i) => map[l] || PALETTE_NSE[i % PALETTE_NSE.length]);
  }

  // 4) fallback
  return padColors(PALETTE_FALLBACK, labels.length);
}

const DonutChart2 = ({
  title,
  data,                 // [{label, value, color?}]
  type = 'default',     // 'default' | 'gender'
  colors,               // opcional: fuerza colores desde el screen
  sortDesc = false      // por defecto respeta el orden entrante
}) => {
  const isBrowser = typeof window !== 'undefined';
  const isMobile = isBrowser ? window.innerWidth < 1024 : false;

  // sanitiza
  const base = Array.isArray(data) ? data.map(d => ({
    label: String(d?.label ?? ''),
    value: normalize(d?.value),
    color: d?.color
  })) : [];

  const items = sortDesc ? [...base].sort((a,b)=>b.value - a.value) : base;
  const labels = items.map(it => it.label);
  const values = items.map(it => it.value);

  const bgColors = resolveColors(labels, items, colors, type);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: bgColors,
      borderWidth: 0,
      cutout: '50%',
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
        titleFont: { size: isMobile ? 10 : 12, weight: 'bold' },
        bodyFont:  { size: isMobile ? 9  : 11 },
        padding:   isMobile ? 6 : 8,
        callbacks: {
          label: function(ctx) {
            const label = ctx.label || '';
            const value = normalize(ctx.parsed);
            const total = (ctx.dataset.data || []).reduce((a,b)=>normalize(a)+normalize(b),0);
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return `${label}: ${pct}%`;
          }
        }
      }
    },
    maintainAspectRatio: true,
    responsive: true,
    animation: { duration: 300 }
  };

  const total = values.reduce((a,b)=>a+b,0);
  const dataWithPercentages = items.map((it, i) => ({
    ...it,
    percentage: total > 0 ? ((it.value / total) * 100).toFixed(1) : '0.0',
    legendColor: bgColors[i]
  }));

  return (
    <div className="flex flex-col items-center w-full h-full p-1 lg:p-2">
      <div className="flex flex-col lg:flex-row items-center justify-start gap-2 lg:gap-3 xl:gap-6 w-full">
        {/* Donut */}
        <div className="relative flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40">
          <Doughnut data={chartData} options={options} />
        </div>

        {/* Título + leyenda */}
        <div className="flex flex-col gap-1 lg:gap-2 flex-grow">
          <h3 className="text-tertiary font-normal text-xs lg:text-sm xl:text-base 2xl:text-lg mb-1 lg:mb-2 text-center lg:text-left">
            {title}
          </h3>

          <div className="flex flex-col gap-1 lg:gap-1.5 xl:gap-2">
            {type === 'gender' ? (
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 justify-center lg:justify-start">
                {dataWithPercentages.map((item, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {item.label === 'Masculino' || item.label === 'Hombres' ? (
                      <IoIosMan  className="text-sm lg:text-base xl:text-lg 2xl:text-xl" style={{ color: item.legendColor }} />
                    ) : (
                      <IoIosWoman className="text-sm lg:text-base xl:text-lg 2xl:text-xl" style={{ color: item.legendColor }} />
                    )}
                    <span className="font-bold text-xs lg:text-sm xl:text-base 2xl:text-lg" style={{ color: item.legendColor }}>
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${dataWithPercentages.length > 4 ? 'grid grid-cols-2 lg:grid-cols-1' : 'grid grid-cols-2 lg:flex lg:flex-col'} gap-x-1 lg:gap-x-2 gap-y-0.5 lg:gap-y-1`}>
                {dataWithPercentages.map((item, index) => (
                  <div key={index} className="flex items-center gap-1 lg:gap-1.5 xl:gap-2">
                    <div className="w-2 h-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: item.legendColor }} />
                    <span className="text-xs lg:text-sm text-gray-600 truncate max-w-[60px] lg:max-w-[100px] xl:max-w-[150px]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export { DonutChart2 };
