import React from 'react'
import { Card } from '../Card';

function ComportamientoTab() {
  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-1 w-full'>
            <Card title='⏰ Horarios de Mayor Actividad Digital'>
                1
            </Card>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='🟠 Tiempo Promedio de Conexión (minutos)'>
                2
            </Card>
            <Card title='🔥 Mapa de Calor - Actividad por Municipio'>
                2
            </Card>
        </div>
        <div className='grid grid-cols-1 w-full'>
            <Card title='📍 Flujo de Personas (Portales Cautivos)'>
                1
            </Card>
        </div>
    </div>
  )
}

export { ComportamientoTab }