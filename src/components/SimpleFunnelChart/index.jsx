import React, { useState, useEffect, useRef } from 'react';
import { FunnelChart, Funnel, Tooltip, Cell } from 'recharts';

/**
 * SimpleFunnelChart - Componente ultra responsive de gráfico de embudo
 * 
 * @param {Array} data - Array de objetos [{label: 'A/B', value: 10, color: '#color'}, ...]
 * @param {String} title - Título del gráfico (opcional)
 * @param {Boolean} showPercentage - Mostrar porcentajes (default: true)
 * @param {Boolean} sortData - Ordenar datos de mayor a menor (default: true)
 * @param {Boolean} maintainColorOrder - Mantener orden de colores como embudo visual (default: true)
 */
const SimpleFunnelChart = ({ 
  data = [], 
  title = '',
  showPercentage = true,
  sortData = true,
  maintainColorOrder = true
}) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 120, height: 100 });
  
  // Colores predefinidos para el embudo (de arriba a abajo)
  const funnelColors = [
    '#C4C4C4', // Gris claro (top)
    '#8B8B8B', // Gris medio
    '#FFD4A3', // Naranja muy claro
    '#FDB975', // Naranja claro
    '#FB923C', // Naranja medio
    '#F97316', // Naranja fuerte
    '#EA580C', // Naranja oscuro
  ];
  
  // Detectar tamaño del contenedor y ajustar dimensiones dinámicamente
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const screenWidth = window.innerWidth;
        
        // Calcular dimensiones basadas en el contenedor disponible
        let chartWidth, chartHeight;
        
        if (screenWidth < 640) {
          // Mobile
          chartWidth = Math.min(containerWidth * 0.4, 80);
          chartHeight = Math.min(containerHeight * 0.8, 60);
        } else if (screenWidth < 768) {
          // Small tablets
          chartWidth = Math.min(containerWidth * 0.4, 90);
          chartHeight = Math.min(containerHeight * 0.8, 70);
        } else if (screenWidth < 1024) {
          // Tablets
          chartWidth = Math.min(containerWidth * 0.4, 110);
          chartHeight = Math.min(containerHeight * 0.8, 90);
        } else if (screenWidth < 1280) {
          // Small desktop
          chartWidth = Math.min(containerWidth * 0.4, 130);
          chartHeight = Math.min(containerHeight * 0.8, 110);
        } else if (screenWidth < 1536) {
          // Desktop
          chartWidth = Math.min(containerWidth * 0.4, 150);
          chartHeight = Math.min(containerHeight * 0.8, 120);
        } else if (screenWidth < 1920) {
          // Large desktop
          chartWidth = Math.min(containerWidth * 0.4, 170);
          chartHeight = Math.min(containerHeight * 0.8, 140);
        } else {
          // 4K and above
          chartWidth = Math.min(containerWidth * 0.4, 200);
          chartHeight = Math.min(containerHeight * 0.8, 160);
        }
        
        setDimensions({ 
          width: Math.max(chartWidth, 60), 
          height: Math.max(chartHeight, 50) 
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Observer para detectar cambios en el tamaño del contenedor
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
    };
  }, []);
  
  // Ordenar datos si es necesario
  const processedData = sortData 
    ? [...data].sort((a, b) => b.value - a.value)
    : [...data];
  
  // Calcular total para porcentajes
  const total = processedData.reduce((sum, item) => sum + item.value, 0);
  
  // Preparar datos para Recharts
  const chartData = processedData.map((item, index) => ({
    name: item.label,
    value: item.value,
    fill: maintainColorOrder ? (funnelColors[index] || item.color) : item.color,
    percentage: ((item.value / total) * 100).toFixed(1)
  }));

  // Custom Tooltip responsive
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 text-white px-1.5 py-1 rounded shadow-lg text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs">
          <p className="font-semibold">{data.name}</p>
          <p>Valor: {data.value}</p>
          <p>{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  // Función para calcular el ancho de la barra responsive
  const getBarWidth = (value) => {
    const maxValue = Math.max(...processedData.map(d => d.value));
    const screenWidth = window.innerWidth;
    
    let minWidth = 20;
    let maxWidth = 60;
    
    if (screenWidth < 640) {
      minWidth = 15;
      maxWidth = 40;
    } else if (screenWidth < 768) {
      minWidth = 18;
      maxWidth = 45;
    } else if (screenWidth < 1024) {
      minWidth = 22;
      maxWidth = 55;
    } else if (screenWidth < 1280) {
      minWidth = 25;
      maxWidth = 65;
    } else if (screenWidth < 1536) {
      minWidth = 30;
      maxWidth = 75;
    } else if (screenWidth < 1920) {
      minWidth = 35;
      maxWidth = 85;
    } else {
      minWidth = 40;
      maxWidth = 100;
    }
    
    return minWidth + ((value / maxValue) * (maxWidth - minWidth));
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col p-1">
      {/* Título opcional responsive */}
      {title && (
        <h3 className="text-orange-500 font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg mb-1 lg:mb-2">
          {title}
        </h3>
      )}
      
      {/* Contenedor principal ultra responsive */}
      <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 xl:gap-3 w-full h-full">
        {/* Gráfico de embudo responsive */}
        <div className="w-[35%] sm:w-[38%] md:w-[40%] lg:w-[42%] xl:w-[45%] flex justify-center items-center">
          <FunnelChart 
            width={dimensions.width} 
            height={dimensions.height}
            margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
          >
            <Tooltip content={<CustomTooltip />} />
            <Funnel
              dataKey="value"
              data={chartData}
              isAnimationActive={true}
              animationDuration={600}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Funnel>
          </FunnelChart>
        </div>
        
        {/* Leyenda ultra responsive */}
        <div className="w-[65%] sm:w-[62%] md:w-[60%] lg:w-[58%] xl:w-[55%] flex flex-col justify-center space-y-[2px] sm:space-y-[3px] md:space-y-1 lg:space-y-1.5 xl:space-y-2">
          {chartData.map((item, index) => {
            const barWidth = getBarWidth(item.value);
            
            return (
              <div 
                key={index} 
                className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-2 group cursor-pointer hover:translate-x-0.5 transition-all duration-200"
              >
                {/* Barra de color ultra responsive */}
                <div 
                  className="h-1.5 sm:h-2 md:h-2.5 lg:h-3 xl:h-3.5 2xl:h-4 rounded-sm transition-all duration-200 group-hover:brightness-110 flex-shrink-0"
                  style={{ 
                    backgroundColor: item.fill,
                    width: `${barWidth}px`,
                    minWidth: '15px'
                  }}
                />
                
                {/* Label y porcentaje ultra responsive */}
                <div className="flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 min-w-0">
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium text-gray-700 whitespace-nowrap truncate">
                    {item.name}
                  </span>
                  {showPercentage && (
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-bold text-gray-600 flex-shrink-0">
                      ({item.percentage}%)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Versión alternativa: Solo barras (más minimalista y compacta)
const MinimalFunnelChart = ({ 
  data = [], 
  title = '',
  showPercentage = true,
  sortData = true,
  maintainColorOrder = true
}) => {
  
  const funnelColors = [
    '#C4C4C4', '#8B8B8B', '#FFD4A3', '#FDB975', 
    '#FB923C', '#F97316', '#EA580C'
  ];
  
  const processedData = sortData 
    ? [...data].sort((a, b) => b.value - a.value)
    : [...data];
  
  const total = processedData.reduce((sum, item) => sum + item.value, 0);
  const maxValue = Math.max(...processedData.map(d => d.value));

  return (
    <div className="w-full h-full flex flex-col p-1">
      {title && (
        <h3 className="text-orange-500 font-semibold text-[9px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base mb-1 lg:mb-2">
          {title}
        </h3>
      )}
      
      <div className="flex flex-col space-y-[3px] sm:space-y-1 md:space-y-1.5">
        {processedData.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          const barWidth = (item.value / maxValue) * 100;
          const color = maintainColorOrder ? (funnelColors[index] || item.color) : item.color;
          
          return (
            <div key={index} className="flex items-center gap-1 sm:gap-1.5 md:gap-2 group">
              <div 
                className="h-2 sm:h-2.5 md:h-3 lg:h-3.5 xl:h-4 rounded-sm transition-all duration-300 group-hover:brightness-110"
                style={{ 
                  backgroundColor: color,
                  width: `${Math.max(20, barWidth * 0.8)}%`,
                  maxWidth: '150px'
                }}
              />
              <div className="flex items-center gap-0.5 sm:gap-1">
                <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                {showPercentage && (
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs xl:text-sm font-bold text-gray-600">
                    ({percentage}%)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Colores exportables
const NIVEL_SOCIOECONOMICO_COLORS = {
  'A/B': '#C4C4C4',
  'C+': '#8B8B8B',
  'C': '#FFD4A3',
  'C-': '#FDB975',
  'D': '#FB923C',
  'D+': '#FB923C',
  'D/E': '#F97316',
  'E': '#EA580C'
};

export { SimpleFunnelChart, MinimalFunnelChart, NIVEL_SOCIOECONOMICO_COLORS };