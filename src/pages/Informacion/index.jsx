import React, { useState, useContext } from 'react'
import { Layout, Card } from '../../components';
import { SummaryTab } from './SummaryTab';
import { DefaultTab } from './DefaultTab';
import { ComparativeTab } from './ComparativeTab';
import { partidosData } from "./partidosData";
import { InformacionContext } from '../../utils/InformacionContext';

function Informacion() {
  const { weeklyReportPartido, weeksNumbers } = useContext(InformacionContext);
  const [ selectedTab, setSelectedTab ] = useState('resumen');
  
  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-2 lg:py-4 px-2 lg:px-6 mb-4 lg:mb-10 gap-2 lg:gap-4'>
        <div className='w-full flex justify-between items-center'>
          <select className='text-sm p-1 text-white bg-gray-400 rounded-full'>
            <option value="semana-1">Selecciona una semana...</option>
            {
              weeksNumbers.map((week) => (
                <option key={week} value={week}>Semana {week}</option>
              ))
            }
          </select>
          <h2 onClick={() => console.log(weeklyReportPartido )} className='relative bg-[#acb8bf] px-2 lg:px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-base'>Descargar</h2>
        </div>
        
        {/* Tabs navegación - Mejorado para móvil */}
        <div className='w-full'>
          {/* Contenedor con scroll horizontal para móvil */}
          <div className='flex overflow-x-auto scrollbar-hide gap-1 lg:gap-0 lg:justify-between pb-1 lg:pb-0'>
            <span 
              onClick={() => setSelectedTab('resumen')} 
              className={`flex-shrink-0 uppercase py-1.5 px-3 lg:py-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer transition-colors duration-200 ${
                selectedTab === 'resumen' 
                  ? 'bg-tertiary hover:bg-tertiary text-white' 
                  : 'bg-white'
              }`}
            >
              resumen
            </span>
            
            {Object.keys(partidosData).map(tab => (
              <span 
                key={tab} 
                onClick={() => setSelectedTab(tab)} 
                className={`flex-shrink-0 uppercase py-1.5 px-3 lg:py-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer transition-colors duration-200 ${
                  selectedTab === tab 
                    ? 'bg-tertiary hover:bg-tertiary text-white' 
                    : 'bg-white'
                }`}
              >
                {tab}
              </span>
            ))}
            
            <span 
              onClick={() => setSelectedTab('comparativa')} 
              className={`flex-shrink-0 uppercase py-1.5 px-3 lg:py-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer transition-colors duration-200 ${
                selectedTab === 'comparativa' 
                  ? 'bg-tertiary hover:bg-tertiary text-white' 
                  : 'bg-white'
              }`}
            >
              comparativa
            </span>
          </div>
          
          {/* Indicador de scroll para móvil (opcional) */}
          <div className='lg:hidden flex justify-center mt-1'>
            <div className='w-8 h-0.5 bg-gray-300 rounded-full opacity-50'></div>
          </div>
        </div>

        {/* Contenido de las tabs */}
        <div className='w-full'>
          {selectedTab === 'resumen' ? (
            <SummaryTab />
          ) : selectedTab === 'comparativa' ? (
            <ComparativeTab />
          ) : (
            <DefaultTab 
              tab={
                weeklyReportPartido.length > 0 
                  ? weeklyReportPartido.find(item => item.iniciales.toLowerCase() === selectedTab) 
                  : null
              } 
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Informacion