import React from 'react'
import { Card, ElectoralMap, MetricCard, ApprovalChart, LineChart } from '../../components';

function AnalisisTab() {

    const candidatoData = [
        { week: 'Semana 1', 'Pablo Lemus': 30, 'Laura Haro': 28 },
        { week: 'Semana 2', 'Pablo Lemus': 38, 'Laura Haro': 32 },
        { week: 'Semana 3', 'Pablo Lemus': 44, 'Laura Haro': 37 },
        { week: 'Semana 4', 'Pablo Lemus': 48, 'Laura Haro': 39 },
        { week: 'Semana 5', 'Pablo Lemus': 52, 'Laura Haro': 44 },
        { week: 'Semana 6', 'Pablo Lemus': 56, 'Laura Haro': 47 }
    ];


  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='🗳️ Intención de Voto por Distrito Electoral'>
                <ElectoralMap />
            </Card>
            <Card title='🏛️ Pablo Lemus (MC) vs (MORENA)'>
                <div className='flex gap-2 h-[80%] w-full'>
                    <MetricCard 
                        name="Pablo Lemus" 
                        mentions="1.3M" 
                        positive={72} 
                        intention={41} 
                    />
                    <MetricCard 
                        name="Morena" 
                        mentions="987K" 
                        positive={64} 
                        intention={38} 
                    />
                </div>
            </Card>
            <Card title='📈 Aprobación Gobernador LEMUS'>
                <ApprovalChart/>
            </Card>
            <Card title='🔍 Tendencias de Búsqueda por Candidato'>
                <div className='w-full h-full'>
                    <LineChart 
                        data={candidatoData}
                        width={800}
                        height={300}
                    />
                </div>
            </Card>
        </div>
    </div>
  )
}

export { AnalisisTab };