import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Componente reutilizable de gráfica de barras
const DeviceChart = ({ 
  data,
  title = '',
  height = 300,
  showLegend = false,
  showGrid = true,
  maxValue = data.reduce((max, item) => Math.max(max, parseInt(item.total)), 0) + 20,
  unit = '',
  className = ''
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const createChart = () => {
      if (chartRef.current && containerRef.current) {
        const ctx = chartRef.current.getContext('2d');
        const containerWidth = containerRef.current.offsetWidth;
        
        // Destruir gráfica anterior si existe
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        // Detectar si es móvil
        const isMobile = window.innerWidth < 1024;

        // Calcular tamaños responsive basados en el ancho del contenedor
        const getResponsiveSizes = (width) => {
          // Calcular barThickness basado en el ancho disponible y número de barras
          const availableWidth = width - (isMobile ? 40 : 80); // Menos padding en móvil
          const numBars = data.length;
          const maxBarWidth = availableWidth / (numBars * 2); // División para dejar espacio entre barras
          
          if (width < 400) {
            return {
              barThickness: Math.min(30, maxBarWidth),
              maxBarThickness: Math.min(40, maxBarWidth),
              titleSize: 12,
              tickSize: 8,
              labelSize: 9
            };
          } else if (width < 600) {
            return {
              barThickness: Math.min(40, maxBarWidth),
              maxBarThickness: Math.min(50, maxBarWidth),
              titleSize: 13,
              tickSize: 9,
              labelSize: 10
            };
          } else {
            return {
              barThickness: Math.min(60, maxBarWidth),
              maxBarThickness: Math.min(80, maxBarWidth),
              titleSize: 16,
              tickSize: 12,
              labelSize: 14
            };
          }
        };

        const sizes = getResponsiveSizes(containerWidth);

        // Crear nueva gráfica
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(item => item.type),
            datasets: [{
              data: data.map(item => parseInt(item.total)),
              backgroundColor: data.map(item => item.color || '#f59e0b'),
              borderWidth: 0,
              barThickness: sizes.barThickness,
              maxBarThickness: sizes.maxBarThickness,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: isMobile ? 5 : 10,
                right: isMobile ? 5 : 10,
                top: isMobile ? 5 : 10,
                bottom: isMobile ? 5 : 10
              }
            },
            plugins: {
              legend: {
                display: showLegend,
                labels: {
                  font: {
                    size: sizes.labelSize
                  }
                }
              },
              title: {
                display: !!title && !isMobile, // Ocultar título en móvil
                text: title,
                font: {
                  size: sizes.titleSize,
                  weight: 'bold'
                }
              },
              tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.95)',
                titleColor: 'white',
                bodyColor: 'white',
                borderColor: '#374151',
                borderWidth: 1,
                cornerRadius: 8,
                titleFont: { size: isMobile ? 10 : 12, weight: 'bold' },
                bodyFont: { size: isMobile ? 9 : 11 },
                padding: isMobile ? 6 : 8,
                callbacks: {
                  label: function(context) {
                    return context.parsed.y + unit;
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  display: showGrid,
                  color: '#e5e7eb',
                  drawBorder: false
                },
                ticks: {
                  stepSize: isMobile ? 25 : 20,
                  callback: function(value) {
                    return value + unit;
                  },
                  font: {
                    size: sizes.tickSize
                  },
                  color: '#6b7280'
                },
                title: {
                  display: !isMobile, // Ocultar título del eje Y en móvil
                  text: 'Valores',
                  font: {
                    size: sizes.tickSize
                  },
                  color: '#6b7280'
                }
              },
              x: {
                grid: {
                  display: false
                },
                ticks: {
                  font: {
                    size: sizes.labelSize
                  },
                  color: '#374151'
                }
              }
            }
          }
        });
      }
    };

    // Pequeño delay para asegurar que el contenedor tiene dimensiones
    setTimeout(createChart, 0);

    // Manejar resize con debounce
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(createChart, 250);
    };

    window.addEventListener('resize', handleResize);

    // Observer para detectar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current); 
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, showLegend, showGrid, maxValue, unit]);

  // Altura responsive
  const responsiveHeight = window.innerWidth < 1024 ? Math.min(height, 200) : height;

  return (
    <div ref={containerRef} className={`bg-white p-2 lg:p-4 rounded-lg w-full ${className}`}>
      <div style={{ position: 'relative', height: `${responsiveHeight}px`, width: '100%' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export {DeviceChart}