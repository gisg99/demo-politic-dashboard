import React from 'react'

function VerticalBars({porcentage}) {
  return (
    <div className="h-full w-6"> 
      <div className="flex items-end h-full w-6">
        {/* Barra 2 */}
        <div className="w-6 h-full bg-gray-200 rounded-t-sm flex-shrink-0 flex flex-col justify-end"> 
          <div 
            className="w-full rounded-t-sm transition-all duration-500 ease-out"
            style={{ 
              height: `${porcentage}%`,
              backgroundColor: "#ff8a3d" 
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { VerticalBars };