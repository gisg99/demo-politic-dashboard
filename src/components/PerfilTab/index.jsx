import React from 'react'
import { Card, DemographicChart } from '../../components';

function PerfilTab() {

  const claseData = [
    { label: "A/B", porcentage: 30 },
    { label: "C+", porcentage: 15 },
    { label: "C", porcentage: 10 },
    { label: "C-", porcentage: 15 },
    { label: "D+", porcentage: 15 },
    { label: "D/E", porcentage: 15 },
  ];

  return (
    <div className='flex flex-col w-full items-center justify-center gap-3 sm:gap-4 p-2 sm:p-0'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 w-full'>
            <Card title='👥 Segmentación Demográfica'>
                <DemographicChart/> 
            </Card>
            <Card title='💰 Segmentación Socioeconómica (INEGI)'>
              <div className='flex flex-col w-full h-full items-center justify-evenly px-2 sm:px-4 md:px-6 lg:px-9'>
                {claseData.map((clase, index) => (
                        <div key={index} className='w-full flex flex-col'>
                            <div className='flex group gap-2 w-full items-center justify-between px-2 sm:px-4 md:px-8 lg:px-20'>
                                <h1 className='text-sm sm:text-base font-medium text-gray-700 min-w-0 flex-shrink-0'>{clase.label}</h1>
                                <div className='w-[50%] sm:w-[50%] md:w-[55%] h-2 sm:h-2 md:h-3 rounded-2xl flex-shrink-0' style={{ background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${clase.porcentage}%, rgb(250, 235, 215, 1) ${clase.porcentage}%, rgb(250, 235, 215, 1) 100%)`}}>
                                    <div className='text-secondary text-sm sm:text-base md:text-lg font-semibold w-min relative -top-4 sm:-top-4 md:-top-5 -left-8 sm:-left-10 md:-left-13 px-1 sm:px-2 rounded-lg group-hover:block'>
                                        {clase.porcentage}%
                                    </div>
                                </div>
                            </div>
                            {index < claseData.length-1 && <hr className='border-t-[1.5px] w-[85%] sm:w-[90%] border-tertiary/10 mx-auto my-2 sm:my-1'/>}
                        </div>
                    ))}
              </div>
            </Card>
        </div>
    </div>
  )
}

export { PerfilTab }