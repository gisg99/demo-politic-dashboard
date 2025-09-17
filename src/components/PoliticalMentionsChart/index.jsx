import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Chart from 'chart.js';
import axios from 'axios';
import { InformacionContext } from '../../utils/InformacionContext';

Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.BarElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend
);

const PoliticalMentionsChart = () => {
  const { selectedWeek } = useContext(InformacionContext);
  const week = Number(selectedWeek) || 1;

  const paletteByName = {
    MC:      { main: '#FFB340', sec: '#FF8C00',  ringBg: '#FFE4B5' },
    MORENA:  { main: '#FF6B6B', sec: '#DC3545',  ringBg: '#FFE4E1' },
    PAN:     { main: '#4ECDC4', sec: '#2E86C1',  ringBg: '#E3F2FD' },
    VD:      { main: '#90EE90', sec: '#28A745',  ringBg: '#E8F5E8' },
    PRI:     { main: '#FF6B6B', sec: '#DC3545',  ringBg: '#E8F5E8' },
  };

  const normalizePartyName = (nombre) => {
    const s = String(nombre || '').toLowerCase();
    if (s.includes('morena')) return 'MORENA';
    if (s.includes('pan'))    return 'PAN';
    if (s.includes('pri'))    return 'PRI';
    if (s.includes('verde') || s.includes('pvem')) return 'VD';
    if (s.includes('movimiento') || s.includes('ciudadano') || s === 'mc') return 'MC';
    return (nombre || '').toString().toUpperCase();
  };

  const [rows, setRows] = useState([]); // [{ id, label, actual, anterior }]
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const toNum = (v) => (typeof v === 'number' ? v : Number(v)) || 0;
  const formatK = (n) => n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M`
                        : n >= 1_000     ? `${(n/1_000).toFixed(1)}k`
                        : `${n}`;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const CIRC = 2 * Math.PI * 40;

  // === Un solo fetch por semana (resultados[]) ===
  const fetchWeekData = async (targetWeek) => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-reporte-semanal-partido`;
    const { data } = await axios.get(url, { params: { semana_num: targetWeek } });
    const resultados = Array.isArray(data?.resultados) ? data.resultados : [];
    return resultados.map(item => ({
      id: toNum(item.id_partido),
      label: normalizePartyName(item.nombre_partido),
      actual: toNum(item?.num_menciones?.actual),
      anterior: toNum(item?.num_menciones?.anterior), // puede venir null
    }));
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const primary = await fetchWeekData(week);
        const hasData = primary.some(r => r.actual > 0 || r.anterior > 0);
        if (!mounted) return;
        if (hasData) {
          setRows(primary);
        } else if (week !== 2) {
          // fallback demo opcional
          const fallback = await fetchWeekData(2);
          setRows(fallback);
        } else {
          setRows(primary);
        }
      } catch (e) {
        console.error('PoliticalMentionsChart fetch error:', e);
        if (mounted) setRows([]);
      }
    })();
    return () => { mounted = false; };
  }, [week]);

  // Orden y filtros (ocultar partidos totalmente en 0)
  const desiredOrder = ['MC', 'MORENA', 'PAN', 'VD', 'PRI'];
  const ordered = [...rows].sort(
    (a, b) => desiredOrder.indexOf(a.label) - desiredOrder.indexOf(b.label)
  );
  const visible = ordered.filter(r => toNum(r.actual) > 0 || toNum(r.anterior) > 0);
  const visibleForRings = ordered.filter(r => toNum(r.actual) > 0);
  const showEmpty = visible.length === 0 && visibleForRings.length === 0;

  // === Chart.js con 2 datasets (sin “espacios” extra) ===
  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
      chartInstance.current = null;
    }
    if (visible.length === 0) return;

    const labels = visible.map(r => r.label);

    const actualData = visible.map(r => Number((toNum(r.actual) / 1000).toFixed(1)));
    const anteriorData = visible.map(r => {
      const val = toNum(r.anterior);
      return val > 0 ? Number((val / 1000).toFixed(1)) : NaN; // <-- NaN => no dibuja
    });

    const actualColors = visible.map(r => (paletteByName[r.label] || paletteByName.MC).main);
    const anteriorColors = visible.map(r => (paletteByName[r.label] || paletteByName.MC).sec);

    const allVals = [...actualData, ...anteriorData.filter(v => !Number.isNaN(v))];
    const suggested = Math.ceil(Math.max(1, ...allVals) * 1.2);

    chartInstance.current = new Chart.Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Actual',
            data: actualData,
            backgroundColor: actualColors,
            borderRadius: 2,
            barThickness: 'flex',
          },
          {
            label: 'Anterior',
            data: anteriorData,
            backgroundColor: anteriorColors,
            borderRadius: 2,
            barThickness: 'flex',
          }
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            cornerRadius: 6,
            displayColors: false,
            // oculta tooltips de NaN
            filter: (item) => !Number.isNaN(item.parsed.y),
            callbacks: {
              title: (ctx) => {
                const party = ctx[0].label;
                const datasetLabel = ctx[0].dataset.label || '';
                return `${party} - ${datasetLabel}`;
              },
              label: (ctx) => `Menciones: ${ctx.parsed.y}k`,
            },
          },
        },
        scales: {
          y: { display: false, beginAtZero: true, suggestedMax: suggested },
          x: {
            grid: { display: false },
            ticks: {
              color: '#9CA3AF',
              font: {
                size:
                  window.innerWidth < 640 ? 10 :
                  window.innerWidth < 768 ? 12 :
                  window.innerWidth < 1024 ? 14 : 16,
                weight: '600',
              },
            },
          },
        },
        interaction: { intersect: false, mode: 'index' },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [visible]);

  // === Aros: sólo actuales > 0 ===
  const maxActual = Math.max(1, ...visibleForRings.map(r => toNum(r.actual)));
  const rings = visibleForRings.map(r => {
    const pal = paletteByName[r.label] || paletteByName.MC;
    const actual = toNum(r.actual);
    const pct = Math.max(0, Math.min(1, actual / maxActual));
    const offset = CIRC * (1 - pct);
    return { key: r.label, color: pal.sec, bg: pal.ringBg, valueText: formatK(actual), offset };
  });

  return (
    <div className="flex flex-col w-full items-center gap-4 sm:gap-6 p-2 sm:p-0">
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 w-full">
        {showEmpty ? (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            Sin datos para esta semana.
          </div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>

      {rings.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-row gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto lg:justify-center">
          {rings.map(r => (
            <div key={r.key} className="flex flex-col items-center justify-center">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="50%" cy="50%" r="40%" stroke={r.bg} strokeWidth="4" fill="none" />
                  <circle
                    cx="50%" cy="50%" r="40%"
                    stroke={r.color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={r.offset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs sm:text-xs md:text-sm font-bold text-gray-700">
                    {r.valueText}
                  </span>
                </div>
              </div>
              <span className="mt-1 text-xs sm:text-sm text-gray-600 font-medium text-center uppercase">
                {r.key}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { PoliticalMentionsChart };
