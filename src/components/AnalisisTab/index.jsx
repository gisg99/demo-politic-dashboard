import React from 'react'
import { Card } from '../Card';

function AnalisisTab() {
  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='🗳️ Intención de Voto por Distrito Electoral'>
                3
            </Card>
            <Card title='🏛️ Pablo Lemus (MC) vs (MORENA)'>
                2
            </Card>
            <Card title='📈 Aprobación Gobernador LEMUS'>
                3
            </Card>
            <Card title='🔍 Tendencias de Búsqueda por Candidato'>
                2
            </Card>
        </div>
    </div>
  )
}

export { AnalisisTab };