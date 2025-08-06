import React from 'react'
import { Card, LineChart, BarChartRedes } from '../../components';

function OpinionTab() {


    const formatCurrency = (number) =>{
        const formateado = new Intl.NumberFormat('es-MX').format(number);
        return formateado;
    }
 

    const temas = [
        {label: 'Seguridad', count: 90},
        {label: 'Transporte', count: 10},
        {label: 'Economía', count: 40},
        {label: 'Salud', count: 80},
        {label: 'Educación', count: 55},
        {label: 'Medio Ambiente', count: 30},
    ];
    
    const sentimientoData = [
        { month: 'Ene', Positivo: 45, Neutral: 32, Negativo: 23 },
        { month: 'Feb', Positivo: 48, Neutral: 30, Negativo: 22 },
        { month: 'Mar', Positivo: 53, Neutral: 28, Negativo: 19 },
        { month: 'Abr', Positivo: 52, Neutral: 30, Negativo: 18 },
        { month: 'May', Positivo: 55, Neutral: 27, Negativo: 18 },
        { month: 'Jun', Positivo: 59, Neutral: 25, Negativo: 16 },
        { month: 'Jul', Positivo: 62, Neutral: 23, Negativo: 15 }
    ];

    const redesData = [
        {label:'Perfiles Facebook', count: 2100000},
        {label:'Perfiles Instagram', count: 1300000},
        {label:'Perfiles LinkedIn', count: 487000},
        {label:'Emails Verificados', count: 3200000},
    ]


  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='📊 Análisis de Sentimientos Temporal'>
                <LineChart 
                    data={sentimientoData}
                    width={800}
                    height={300}
                />
            </Card>
            <Card title='💭 Temas de Mayor Interés'>
                <div className='flex flex-col w-full h-full items-center justify-evenly ml-9'>
                    {temas.map((tema, index) => (
                        <div className='w-full flex flex-col'>
                            <div className='flex group gap-2 w-full items-center justify-between px-15'>
                                <h1>{tema.label}</h1>
                                <div className='w-[40%] h-2 rounded-2xl' style={{ background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${tema.count}%, rgb(250, 235, 215, 1) ${tema.count}%, rgb(250, 235, 215, 1) 100%)`}}>
                                    <div className='text-secondary text-lg font-semibold w-min relative -top-3 -left-13 px-2 rounded-lg group-hover:block'>
                                        {tema.count}%
                                    </div>
                                </div>
                            </div>
                            {index < temas.length-1 && <hr className='border-t-[1.5px] w-[90%] border-tertiary/10'/>}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='👍 Engagement en Redes Sociales por Partido'>
                <BarChartRedes />
            </Card>
            <Card title='📱 Analytics de Redes Sociales'>
                <div className='grid grid-cols-2 w-full gap-4'>
                    {redesData.map((red)=>(
                        <div className='bg-orange-500 w-full h-full rounded-2xl'>
                            <div className='bg-[#ffe1b5] rounded-2xl ml-1 py-3 flex flex-col justify-center items-center'>
                                <h1 className='text-tertiary text-2xl font-bold'>{formatCurrency(red.count)}</h1>
                                <p className='text-secondary'>{red.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
  )
}

export { OpinionTab }