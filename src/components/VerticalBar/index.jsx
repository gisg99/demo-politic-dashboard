// VerticalBar.jsx
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
    <div className="flex flex-col items-center w-12">
      <div
        ref={containerRef}
        className="relative h-36 md:h-40 lg:h-44 w-6 bg-gray-200 rounded-md overflow-visible"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        aria-label={`${p}%`}
      >
        {/* Tooltip simple y elegante */}
        <div
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 
                      z-50 transition-all duration-200 ease-out
                      ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          style={{ 
            top: `${pos.top}px`,
            marginTop: '-36px'
          }}
        >
          <div className="relative">
            <div className="bg-gray-800 rounded-lg px-3 py-1.5 shadow-xl">
              <span className="text-white font-semibold text-xs">
                {p}%
              </span>
            </div>
            <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-[1px]">
              <div className="w-0 h-0 
                             border-l-[5px] border-r-[5px] border-t-[5px] 
                             border-l-transparent border-r-transparent border-t-gray-800" />
            </div>
          </div>
        </div>

        {/* Relleno naranja simple */}
        <div
          className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out rounded-b-md"
          style={{ 
            height: `${p}%`, 
            backgroundColor: '#fb923c' // Color naranja similar al de la imagen
          }}
        />
      </div>

      <span className="mt-2 text-xs md:text-sm text-gray-500">{label}</span>
    </div>
  );
}

export { VerticalBar };