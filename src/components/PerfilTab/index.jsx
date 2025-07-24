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
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='👥 Segmentación Demográfica'>
                <DemographicChart/>
            </Card>
            <Card title='💰 Segmentación Socioeconómica (INEGI)'>
              <div className='flex flex-col w-full h-full items-center justify-evenly ml-9'>
                {claseData.map((clase, index) => (
                        <div className='w-full flex flex-col'>
                            <div className='flex group gap-2 w-full items-center justify-between px-20'>
                                <h1>{clase.label}</h1>
                                <div className='w-[50%] h-2 rounded-2xl' style={{ background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${clase.porcentage}%, rgb(250, 235, 215, 1) ${clase.porcentage}%, rgb(250, 235, 215, 1) 100%)`}}>
                                    <div className='text-secondary text-lg font-semibold w-min relative -top-3 -left-13 px-2 rounded-lg group-hover:block'>
                                        {clase.porcentage}%
                                    </div>
                                </div>
                            </div>
                            {index < claseData.length-1 && <hr className='border-t-[1.5px] w-[90%] border-tertiary/10'/>}
                        </div>
                    ))}
              </div>
            </Card>
        </div>
    </div>
  )
}

export { PerfilTab }