import React from 'react';

const MetricCard = ({ name, mentions, positive, intention }) => {
  return (
    <div className="bg-gradient-to-br from-[#f2ddc4] to-orange-200 rounded-xl p-3 sm:p-4 md:p-6 w-full h-full flex flex-col justify-center text-center text-tertiary shadow-md">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 md:mb-4 leading-tight">{name}</h2>
      <div className="flex flex-col sm:flex-row justify-between mt-2 sm:mt-3 gap-3 sm:gap-2">
        <div className="flex flex-col items-center flex-1">
          <span className="text-lg sm:text-xl md:text-xl text-[#ff8c00] font-bold">{mentions}</span>
          <span className="text-xs sm:text-sm">Menciones</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-lg sm:text-xl md:text-xl text-[#ff8c00] font-bold">{positive}%</span> 
          <span className="text-xs sm:text-sm">Positivo</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="text-lg sm:text-xl md:text-xl text-[#ff8c00] font-bold">{intention}%</span>
          <span className="text-xs sm:text-sm">Intención</span>
        </div>
      </div>
    </div>
  );
};

export { MetricCard };