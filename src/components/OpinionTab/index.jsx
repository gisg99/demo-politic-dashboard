import React from 'react'
import { Card } from '../Card';

function OpinionTab() {
  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-3 gap-4 w-full'>
            <Card title='📊 Análisis de Sentimientos Temporal'>
                3
            </Card>
            <Card title='💭 Temas de Mayor Interés'>
                3
            </Card>
            <Card title='📱 Analytics de Redes Sociales'>
                3
            </Card>
        </div>
        <div className='grid grid-cols-1 w-full'>
            <Card title='👍 Engagement en Redes Sociales por Partido'>
                2 o 1
            </Card>
        </div>
    </div>
  )
}

export { OpinionTab }