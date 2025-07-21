import React from 'react'
import { Card } from '../Card';

function PerfilTab() {
  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='👥 Segmentación Demográfica'>
                2
            </Card>
            <Card title='💰 Segmentación Socioeconómica (INEGI)'>
                2
            </Card>
        </div>
    </div>
  )
}

export { PerfilTab }