import React from 'react';

const MetricCard = ({ name, mentions, positive, intention }) => {
  return (
    <div className="bg-gradient-to-br from-[#f2ddc4] to-orange-200 rounded-xl p-6 w-full h-full flex flex-col justify-center text-center text-tertiary shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <div className="flex justify-between mt-3">
        <div className="flex flex-col items-center">
          <span className="text-xl text-[#ff8c00] font-bold">{mentions}</span>
          <span className="text-sm">Menciones</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl text-[#ff8c00] font-bold">{positive}%</span>
          <span className="text-sm">Positivo</span>
        </div>
        <div className="flex flex-col  items-center">
          <span className="text-xl text-[#ff8c00] font-bold">{intention}%</span>
          <span className="text-sm">Intención</span>
        </div>
      </div>
    </div>
  );
};

export { MetricCard };
