import React from 'react';

function VerticalBar({ value = 0, label = '' }) {
  const p = Math.max(0, Math.min(100, Number(value) || 0));
  const containerRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [pos, setPos] = React.useState({ top: 0 });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const h = el.clientHeight;
    const fillTop = h * (1 - p / 100);
    setPos({ top: fillTop });
  }, [p]);

  return (
    <div className="flex flex-col items-center w-8 sm:w-10 md:w-12 lg:w-12 xl:w-14">
      <div
        ref={containerRef}
        className="relative h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 2xl:h-44 
                   w-4 sm:w-5 md:w-6 lg:w-6 xl:w-7 
                   bg-gray-200 rounded-md overflow-visible 
                   cursor-pointer transition-transform hover:scale-105"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onTouchStart={() => setShow(true)}
        onTouchEnd={() => setTimeout(() => setShow(false), 2000)} // Mantener visible en móvil
        aria-label={`${p}%`}
      >
        {/* Tooltip responsive y touch-friendly */}
        <div
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 
                      z-50 transition-all duration-200 ease-out
                      ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ 
            top: `${pos.top}px`,
            marginTop: '-32px' // Reducido para móvil
          }}
        >
          <div className="relative">
            <div className="bg-gray-800 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 shadow-xl">
              <span className="text-white font-semibold text-[10px] sm:text-xs md:text-sm">
                {p}%
              </span>
            </div>
            {/* Flecha del tooltip responsive */}
            <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-[1px]">
              <div className="w-0 h-0 
                             border-l-[4px] border-r-[4px] border-t-[4px] 
                             sm:border-l-[5px] sm:border-r-[5px] sm:border-t-[5px]
                             border-l-transparent border-r-transparent border-t-gray-800" />
            </div>
          </div>
        </div>

        {/* Relleno naranja responsive */}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out rounded-b-md
                     hover:brightness-110" // Efecto hover sutil
          style={{ 
            height: `${p}%`, 
            backgroundColor: '#fb923c' // Color naranja similar al de la imagen
          }}
        />

        {/* Indicador visual del valor en la parte superior (opcional para móvil) */}
        {p > 0 && (
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 
                       bg-white rounded-full opacity-80 transition-all duration-500"
            style={{ 
              top: `${pos.top}px`,
              marginTop: '-3px'
            }}
          />
        )}
      </div>

      {/* Label responsive con truncado inteligente */}
      <span className="mt-1 sm:mt-2 text-[10px] font-bold sm:text-xs md:text-sm lg:text-[10px] 
                       text-gray-500 text-center leading-tight max-w-full 
                       break-words px-1">
        {label}
      </span>
    </div>
  );
}

export { VerticalBar };