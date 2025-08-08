import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

// Plugin: % centrado con tamaño dinámico según el canvas
const centerTextPlugin = {
  id: 'centerText',
  afterDraw(chart, args, opts) {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { width, height } = chartArea;
    const value = opts?.value ?? 0;

    // Escala más refinada del font-size para diferentes tamaños de desktop
    const baseSize = Math.min(width, height) * 0.28;
    const size = Math.max(10, Math.min(40, Math.floor(baseSize)));

    ctx.save();
    ctx.font = `600 ${size}px Inter, system-ui, -apple-system, Segoe UI, Roboto`;
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${value}%`, (chartArea.left + chartArea.right) / 2, (chartArea.top + chartArea.bottom) / 2);
    ctx.restore();
  }
};

/**
 * items: [{ label: string, value: number (0-100), color?: string }]
 * props:
 *  - trackColor: color del fondo del anillo
 *  - cutout: grosor (ej. '72%')
 *  - className: clases extra para el contenedor
 */
function PercentRings({
  items = [],
  trackColor = 'rgba(255, 159, 64, 0.15)',
  cutout = '72%',
  className = ''
}) {
  // Determinar el layout basado en la cantidad de items
  const getGridClasses = () => {
    const itemCount = items.length;
    
    if (itemCount <= 2) {
      return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2';
    } else if (itemCount === 3) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3';
    } else if (itemCount === 4) {
      return 'grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4';
    } else {
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6';
    }
  };

  return (
    <div
      className={[
        // Grid responsiva y centrada con espaciado adaptativo
        'grid place-items-center',
        getGridClasses(),
        // Espaciado responsivo más granular para desktop
        'gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8',
        'mx-auto w-full',
        // Padding interno para mejor distribución
        'p-2 md:p-3 lg:p-4',
        className
      ].join(' ')}
    >
      {items.map((it, idx) => {
        const color = it.color ?? '#FF9F40';
        const safeVal = Math.min(Math.max(it.value, 0), 100);

        const data = {
          labels: ['Progreso', 'Resto'],
          datasets: [{
            data: [safeVal, 100 - safeVal],
            backgroundColor: [color, trackColor],
            borderWidth: 0,
            hoverOffset: 0,
            borderRadius: safeVal > 0 ? 8 : 0
          }]
        };

        const options = {
          cutout,
          rotation: -90,
          circumference: 360,
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            centerText: { value: safeVal }
          }
        };

        return (
          <div key={idx} className="flex flex-col items-center justify-center min-w-0">
            {/* Tamaños optimizados basados en lg:w-20 lg:h-20 como referencia */}
            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-20 lg:h-20 xl:w-20 xl:h-20 2xl:w-20 2xl:h-20">
              <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
            </div>

            {/* Etiqueta con mejor tipografía responsiva */}
            <span className="mt-2 md:mt-3 lg:mt-4 text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg font-medium tracking-wide text-slate-600 uppercase text-center leading-tight max-w-full break-words">
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { PercentRings };