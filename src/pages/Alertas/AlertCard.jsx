import React from "react";
import { BiSolidBellRing } from "react-icons/bi";

const AlertCard = ({ type, children, double, index }) => {
  
  // Función para determinar las clases de columnas según el viewport y posición
  const getColumnClasses = () => {
    // En móvil: todas las cards ocupan toda la columna
    let classes = "col-span-1";
    
    // En tablet (sm): alternar entre 1 y 2 columnas
    if (double) {
      classes += " sm:col-span-2";
    } else {
      classes += " sm:col-span-1";
    }
    
    // En desktop large (lg): alternar entre 2 y 1 columnas  
    if (double) {
      classes += " lg:col-span-2";
    } else {
      classes += " lg:col-span-1";
    }
    
    // En extra large (xl): layout original con 3 y 2 columnas
    if (double) {
      classes += " xl:col-span-3";
    } else {
      classes += " xl:col-span-2";
    }
    
    return classes;
  };

  return (
    <div className={`flex ${getColumnClasses()}`}>
      <div 
        className="flex flex-col w-full items-center justify-between h-full bg-white p-3 sm:p-4 md:p-5 lg:p-6 relative" 
        style={{ boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.3)" }}
      >
        {/* Lista de alertas responsive */}
        <ul className="list-disc pl-3 sm:pl-4 md:pl-5 text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg font-normal w-full">
          {children}
        </ul>
        
        {/* Icono de campana responsive - posicionado absolutamente */}
        <BiSolidBellRing 
          className={`absolute -top-2 -right-2 sm:-top-2 sm:-right-3 md:-top-2 md:-right-4 lg:-top-2 lg:-right-7 
                      text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl 
                      ${type === "alta" ? "bg-amber-500" : type === "media" ? "bg-yellow-400" : "bg-gray-400"} 
                      p-1 sm:p-1.5 rounded-full shadow-lg z-10`}
        />
      </div>
    </div>
  )
}

export { AlertCard };