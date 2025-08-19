import React, { useState, useRef, useEffect } from 'react';

const LineChart = ({
  data = [],
  margin = { top: 20, right: 40, bottom: 30, left: 40 },
  gridColor = '#e5e7eb',
  backgroundColor = '#fef7ed'
}) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef();

  // ResizeObserver para responsividad
  useEffect(() => {
    console.log(data);
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      
      // Detectar si es móvil para ajustar dimensiones
      const isMobile = window.innerWidth < 1024;
      setDimensions({ 
        width, 
        height: isMobile ? Math.min(height, 250) : height 
      });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current); 
    }

    return () => resizeObserver.disconnect();
  }, []);

  const defaultData = [
    { week: 'Semana 1', 'Pablo Lemus': 30, 'Laura Haro': 28 },
    { week: 'Semana 2', 'Pablo Lemus': 38, 'Laura Haro': 32 },
    { week: 'Semana 3', 'Pablo Lemus': 44, 'Laura Haro': 37 },
    { week: 'Semana 4', 'Pablo Lemus': 48, 'Laura Haro': 39 },
    { week: 'Semana 5', 'Pablo Lemus': 52, 'Laura Haro': 44 },
    { week: 'Semana 6', 'Pablo Lemus': 57, 'Laura Haro': 47 }
  ];

  const chartData = data.length > 0 ? data : defaultData;

  // Detectar nombre del campo de período (eje X)
  const xField = Object.keys(chartData[0]).find(
    (key) => !['Pablo Lemus', 'Laura Haro', 'Positivo', 'Neutral', 'Negativo'].includes(key)
  ) || 'week';

  const series = Object.keys(chartData[0] || {}).filter(key => key !== xField);

  const defaultColors = {
    'Pablo Lemus': '#f97316',
    'Laura Haro': '#991b1b',
    'Positivo': '#22c55e',
    'Neutral': '#facc15',
    'Negativo': '#ef4444'
  };

  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

  // Márgenes responsive
  const responsiveMargin = {
    top: isMobile ? 15 : margin.top,
    right: isMobile ? 20 : margin.right,
    bottom: isMobile ? 40 : margin.bottom,
    left: isMobile ? 30 : margin.left
  };

  const chartWidth = dimensions.width - responsiveMargin.left - responsiveMargin.right;
  const chartHeight = dimensions.height - responsiveMargin.top - responsiveMargin.bottom;

  const allValues = chartData.flatMap(d => series.map(s => d[s])).filter(v => v != null);
  const rawMax = Math.max(...allValues);
  const yMax = rawMax <= 100 ? 100 : Math.ceil(rawMax / 10) * 10;

  const yScale = (value) => chartHeight - ((value - 0) / yMax) * chartHeight;
  const xScale = (index) => (index / (chartData.length - 1)) * chartWidth;

  const steps = isMobile ? 4 : 6; // Menos líneas de grid en móvil
  const stepValue = yMax / steps;

  const gridLines = [];
  for (let i = 0; i <= steps; i++) {
    const value = i * stepValue;
    const y = yScale(value);
    gridLines.push({
      y: y,
      value: Number.isInteger(value) ? value : value.toFixed(0)
    });
  }

  const createPath = (seriesName) => {
    return chartData
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[seriesName])}`)
      .join(' ');
  };

  return (
    <div ref={containerRef} className={`max-h-[30vh] lg:max-h-[45vh] w-full flex mt-2 lg:mt-4 mb-2 lg:mb-6 items-start`}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
          {/* Fondo */}
          <rect
            x={responsiveMargin.left}
            y={responsiveMargin.top}
            width={chartWidth}
            height={chartHeight}
            fill={backgroundColor}
          />

          {/* Líneas horizontales */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={responsiveMargin.left}
                y1={responsiveMargin.top + line.y}
                x2={responsiveMargin.left + chartWidth}
                y2={responsiveMargin.top + line.y}
                stroke={gridColor}
                strokeWidth="1"
              />
              <text
                x={responsiveMargin.left - 10}
                y={responsiveMargin.top + line.y + 5}
                textAnchor="end"
                fontSize={isMobile ? "8" : "10"}
                fill="#6b7280"
              >
                {line.value}{data[0] && data[0].week ? "K" : "%" }
              </text>
            </g>
          ))}

          {/* Líneas verticales + etiquetas */}
          {chartData.map((d, i) => {
            // En móvil, mostrar solo algunas etiquetas para evitar saturación
            const showLabel = isMobile ? i % 2 === 0 : true;
            return (
              <g key={i}>
                <line
                  x1={responsiveMargin.left + xScale(i)}
                  y1={responsiveMargin.top}
                  x2={responsiveMargin.left + xScale(i)}
                  y2={responsiveMargin.top + chartHeight}
                  stroke={gridColor}
                  strokeWidth="1"
                />
                {showLabel && (
                  <text
                    x={responsiveMargin.left + xScale(i)}
                    y={dimensions.height - responsiveMargin.bottom + 20}
                    textAnchor="middle"
                    fontSize={isMobile ? "8" : "10"}
                    fill="#6b7280"
                  >
                    {d[xField]}
                  </text>
                )}
              </g>
            );
          })}

          {/* Series y puntos */}
          {series.map((seriesName, seriesIndex) => (
            <g key={seriesName}>
              <path
                d={createPath(seriesName)}
                fill="none"
                stroke={defaultColors[seriesName] || `hsl(${seriesIndex * 60}, 70%, 50%)`}
                strokeWidth={isMobile ? "2" : "3"}
                transform={`translate(${responsiveMargin.left}, ${responsiveMargin.top})`}
              />
              {chartData.map((d, i) => (
                <circle
                  key={`${seriesName}-${i}`}
                  cx={responsiveMargin.left + xScale(i)}
                  cy={responsiveMargin.top + yScale(d[seriesName])}
                  r={isMobile ? "3" : "5"}
                  fill={defaultColors[seriesName] || `hsl(${seriesIndex * 60}, 70%, 50%)`}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      series: seriesName,
                      value: d[seriesName],
                      label: d[xField],
                      x: responsiveMargin.left + xScale(i),
                      y: responsiveMargin.top + yScale(d[seriesName])
                    })
                  }
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              ))}
            </g>
          ))}

          {/* Tooltip */}
          {hoveredPoint && (
            <g>
              <rect
                x={hoveredPoint.x - (isMobile ? 50 : 60)}
                y={hoveredPoint.y - (isMobile ? 30 : 35)}
                width={isMobile ? "100" : "120"}
                height={isMobile ? "20" : "25"}
                fill="black"
                fillOpacity="0.8"
                rx="4"
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - (isMobile ? 15 : 18)}
                textAnchor="middle"
                fontSize={isMobile ? "10" : "12"}
                fill="white"
                fontWeight="bold"
              >
                {hoveredPoint.series}: {hoveredPoint.value}
              </text>
            </g>
          )}
        </svg>

        {/* Leyenda */}
        <div className="flex justify-center flex-wrap gap-2 lg:gap-6">
          {series.map((seriesName, i) => (
            <div key={seriesName} className="flex items-center space-x-1 lg:space-x-2">
              <div
                className="w-4 h-2 lg:w-6 lg:h-3 rounded-full"
                style={{
                  backgroundColor: defaultColors[seriesName] || `hsl(${i * 60}, 70%, 50%)`
                }}
              ></div>
              <span className="text-xs lg:text-sm text-gray-700 font-medium">{seriesName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LineChart };