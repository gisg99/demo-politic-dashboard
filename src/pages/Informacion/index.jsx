import React, { useState } from 'react'
import { Layout, Card } from '../../components';
import { SummaryTab } from './SummaryTab';
import { DefaultTab } from './DefaultTab';
import { ComparativeTab } from './ComparativeTab';
import { partidosData } from "./partidosData";
import { InformacionProvider } from '../../utils/InformacionContext';

function Informacion() {
  const [ selectedTab, setSelectedTab ] = useState('resumen');
  return (
    <InformacionProvider>
      <Layout>
        <div className='flex flex-col w-full h-full items-center py-2 lg:py-4 px-2 lg:px-6 mb-4 lg:mb-10 gap-2 lg:gap-4'>
          <div className='w-full flex justify-end items-center'>
          <h2 className='relative bg-[#acb8bf] px-2 lg:px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-base'>Descargar</h2>
          </div>
          <div className='w-full flex justify-between gap-1 lg:gap-0'>
            <span onClick={() => setSelectedTab('resumen')} className={`uppercase py-1 px-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer ${selectedTab === 'resumen' ? 'bg-tertiary hover:bg-tertiary text-white' : ' bg-white'}`}>resumen</span>
            {Object.keys(partidosData).map(tab => (
              <span key={tab} onClick={() => setSelectedTab(tab)} className={`uppercase py-1 px-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer ${selectedTab === tab ? 'bg-tertiary hover:bg-tertiary text-white' : ' bg-white'}`}>{tab}</span>
            ))}
            <span onClick={() => setSelectedTab('comparativa')} className={`uppercase py-1 px-1 lg:px-2 rounded-full text-xs font-medium hover:bg-gray-300 cursor-pointer ${selectedTab === 'comparativa' ? 'bg-tertiary hover:bg-tertiary text-white' : ' bg-white'}`}>comparativa</span>
          </div>
          {
            selectedTab === 'resumen' ? <SummaryTab /> 
            :
            selectedTab === 'comparativa' ? <ComparativeTab /> 
            :
            <DefaultTab tab={partidosData[selectedTab]} />
          }

        </div>
      </Layout>
    </InformacionProvider>
  )
}

export default Informacion