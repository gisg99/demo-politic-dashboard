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
 
    // Escala más refinada del font-size para responsive
    const baseSize = Math.min(width, height) * 0.35; // Incrementado para móvil
    const size = Math.max(8, Math.min(24, Math.floor(baseSize))); // Rango ajustado

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
  // Determinar el layout basado en la cantidad de items - OPTIMIZADO PARA MÓVIL
  const getGridClasses = () => {
    const itemCount = items.length;
    
    if (itemCount <= 2) {
      return 'grid-cols-1 sm:grid-cols-2';
    } else if (itemCount === 3) {
      return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    } else if (itemCount === 4) {
      return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4';
    } else if (itemCount <= 6) {
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6';
    } else {
      return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
    }
  };

  return (
    <div
      className={[
        // Grid responsiva y centrada con espaciado adaptativo
        'grid place-items-center',
        getGridClasses(),
        // Espaciado responsivo optimizado para móvil
        'gap-4 sm:gap-4 md:gap-5 lg:gap-6',
        'mx-auto w-full',
        // Padding interno para mejor distribución
        'p-3 sm:p-4 md:p-4 lg:p-4',
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
            borderRadius: safeVal > 0 ? 6 : 0 // Reducido para móvil
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
          <div key={idx} className="flex flex-col items-center justify-center min-w-0 w-full">
            {/* Tamaños optimizados para móvil primero */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-20 lg:h-20">
              <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
            </div>

            {/* Etiqueta con mejor tipografía responsive para móvil */}
            <span className="mt-2 sm:mt-2 md:mt-3 text-xs sm:text-xs md:text-sm lg:text-base font-medium tracking-wide text-slate-600 uppercase text-center leading-tight max-w-full break-words px-1">
              {it.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export { PercentRings };