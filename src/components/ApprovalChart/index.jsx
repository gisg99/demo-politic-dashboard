// import React, { useState } from 'react';

// const ApprovalChart = () => {
//   const [hoveredSegment, setHoveredSegment] = useState(null);
  
//   // Datos de aprobación
//   const data = [
//     { label: 'Aprueba', value: 61, color: '#228c22' }, // Verde
//     { label: 'Desaprueba', value: 24, color: '#db143c' }, // Rojo
//     { label: 'No sabe', value: 15, color: '#ffa600' } // Naranja
//   ];

//   // Función para crear el path del arco SVG
//   const createArcPath = (centerX, centerY, innerRadius, outerRadius, startAngle, endAngle) => {
//     const start = polarToCartesian(centerX, centerY, outerRadius, endAngle);
//     const end = polarToCartesian(centerX, centerY, outerRadius, startAngle);
//     const innerStart = polarToCartesian(centerX, centerY, innerRadius, endAngle);
//     const innerEnd = polarToCartesian(centerX, centerY, innerRadius, startAngle);

//     const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

//     return [
//       "M", start.x, start.y, 
//       "A", outerRadius, outerRadius, 0, largeArcFlag, 0, end.x, end.y,
//       "L", innerEnd.x, innerEnd.y,
//       "A", innerRadius, innerRadius, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
//       "Z"
//     ].join(" ");
//   };

//   // Función para convertir coordenadas polares a cartesianas
//   const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
//     const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
//     return {
//       x: centerX + (radius * Math.cos(angleInRadians)),
//       y: centerY + (radius * Math.sin(angleInRadians))
//     };
//   };

//   // Configuración del gráfico responsive
//   const size = window.innerWidth < 1024 ? 180 : 250; // Más pequeño en móvil
//   const center = size / 2;
//   const outerRadius = window.innerWidth < 1024 ? 85 : 120; // Más pequeño en móvil
//   const innerRadius = window.innerWidth < 1024 ? 45 : 60; // Más pequeño en móvil

//   // Calcular ángulos
//   let currentAngle = 0;
//   const segments = data.map(item => {
//     const angle = (item.value / 100) * 360;
//     const segment = {
//       ...item,
//       startAngle: currentAngle,
//       endAngle: currentAngle + angle,
//       path: createArcPath(center, center, innerRadius, outerRadius, currentAngle, currentAngle + angle)
//     };
//     currentAngle += angle;
//     return segment;
//   });

//   return (
//     <div className="flex flex-col items-center justify-center relative">
//       <div className="p-1 lg:p-2 max-w-md w-full">
//         {/* Estadísticas en la parte superior */}
//         <div className="flex justify-around mb-2 lg:mb-0">
//           {data.map((item, index) => (
//             <div key={index} className="text-center">
//               <div 
//                 className="text-xl lg:text-3xl font-bold mb-1"
//                 style={{ color: item.color }}
//               >
//                 {item.value}%
//               </div>
//               <div className="text-tertiary text-xs lg:text-sm font-medium">
//                 {item.label}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Gráfico Donut */}
//         <div className="flex justify-center relative">
//           <svg width={size} height={size} className="transform -rotate-90">
//             {segments.map((segment, index) => (
//               <path
//                 key={index}
//                 d={segment.path}
//                 fill={segment.color}
//                 stroke="white"
//                 strokeWidth="2"
//                 className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
//                 onMouseEnter={() => setHoveredSegment(segment)}
//                 onMouseLeave={() => setHoveredSegment(null)}
//               />
//             ))}
//           </svg>
          
//           {/* Tooltip */}
//           {hoveredSegment && (
//             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white px-2 lg:px-3 py-1 lg:py-2 rounded-lg text-xs lg:text-sm font-medium pointer-events-none z-10">
//               {hoveredSegment.label}: {hoveredSegment.value}%
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export { ApprovalChart };