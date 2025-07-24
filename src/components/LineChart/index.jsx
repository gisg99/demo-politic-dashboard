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
      setDimensions({ width, height });
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

  const chartWidth = dimensions.width - margin.left - margin.right;
  const chartHeight = dimensions.height - margin.top - margin.bottom;

  const allValues = chartData.flatMap(d => series.map(s => d[s])).filter(v => v != null);
  const rawMax = Math.max(...allValues);
  const yMax = rawMax <= 100 ? 100 : Math.ceil(rawMax / 10) * 10;

  const yScale = (value) => chartHeight - ((value - 0) / yMax) * chartHeight;
  const xScale = (index) => (index / (chartData.length - 1)) * chartWidth;

  const steps = 6;
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
    <div ref={containerRef} className={`max-h-[45vh] w-full flex mt-4 mb-6 items-start`}>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <svg width={dimensions.width} height={dimensions.height} className="overflow-visible">
          {/* Fondo */}
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth}
            height={chartHeight}
            fill={backgroundColor}
          />

          {/* Líneas horizontales */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={margin.left}
                y1={margin.top + line.y}
                x2={margin.left + chartWidth}
                y2={margin.top + line.y}
                stroke={gridColor}
                strokeWidth="1"
              />
              <text
                x={margin.left - 10}
                y={margin.top + line.y + 5}
                textAnchor="end"
                fontSize="10"
                fill="#6b7280"
              >
                {line.value}{data[0].week  ? "K" : "%" }
              </text>
            </g>
          ))}

          {/* Líneas verticales + etiquetas */}
          {chartData.map((d, i) => (
            <g key={i}>
              <line
                x1={margin.left + xScale(i)}
                y1={margin.top}
                x2={margin.left + xScale(i)}
                y2={margin.top + chartHeight}
                stroke={gridColor}
                strokeWidth="1"
              />
              <text
                x={margin.left + xScale(i)}
                y={dimensions.height - margin.bottom + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
              >
                {d[xField]}
              </text>
            </g>
          ))}

          {/* Series y puntos */}
          {series.map((seriesName, seriesIndex) => (
            <g key={seriesName}>
              <path
                d={createPath(seriesName)}
                fill="none"
                stroke={defaultColors[seriesName] || `hsl(${seriesIndex * 60}, 70%, 50%)`}
                strokeWidth="3"
                transform={`translate(${margin.left}, ${margin.top})`}
              />
              {chartData.map((d, i) => (
                <circle
                  key={`${seriesName}-${i}`}
                  cx={margin.left + xScale(i)}
                  cy={margin.top + yScale(d[seriesName])}
                  r="5"
                  fill={defaultColors[seriesName] || `hsl(${seriesIndex * 60}, 70%, 50%)`}
                  stroke="white"
                  strokeWidth="2"
                  className="cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() =>
                    setHoveredPoint({
                      series: seriesName,
                      value: d[seriesName],
                      label: d[xField],
                      x: margin.left + xScale(i),
                      y: margin.top + yScale(d[seriesName])
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
                x={hoveredPoint.x - 60}
                y={hoveredPoint.y - 35}
                width="120"
                height="25"
                fill="black"
                fillOpacity="0.8"
                rx="4"
              />
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 18}
                textAnchor="middle"
                fontSize="12"
                fill="white"
                fontWeight="bold"
              >
                {hoveredPoint.series}: {hoveredPoint.value}
              </text>
            </g>
          )}
        </svg>

        {/* Leyenda */}
        <div className="flex justify-center flex-wrap gap-6">
          {series.map((seriesName, i) => (
            <div key={seriesName} className="flex items-center space-x-2">
              <div
                className="w-6 h-3 rounded-full"
                style={{
                  backgroundColor: defaultColors[seriesName] || `hsl(${i * 60}, 70%, 50%)`
                }}
              ></div>
              <span className="text-sm text-gray-700 font-medium">{seriesName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { LineChart };
