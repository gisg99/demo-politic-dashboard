import {React, useState }from 'react'
import { Card, DonutChart2, ElectoralMap, SimpleFunnelChart, HeatmapComponent } from '../../components'

function Educacion({data}) {

    const heatmapData = [
    [20.6748, -103.344, "100"],
    [20.6782, -103.340, "85"],
    [20.6711, -103.350, "70"],
    [20.6699, -103.346, "60"],
    [20.6711, -103.350, "70"],
    [20.6699, -103.346, "60"],
    [20.6760, -103.349, "50"],
    [20.6752, -103.341, "45"],
    [20.6730, -103.343, "30"]
    ];

    const intereses = [
        { label: 'Acceso a la Educación', count: parseFloat(data[0].promedio)*20 },
        { label: 'Calidad Educativa',  count: parseFloat(data[1].promedio)*20  },
        { label: 'Formación Docente',  count: parseFloat(data[2].promedio)*20  },
        { label: 'Acceso a Tecnología',  count: parseFloat(data[3].promedio)*20  },
        { label: 'Apoyo a Alumnos',  count: parseFloat(data[4].promedio)*20  },
        { label: 'Educación Inclusiva',  count: parseFloat(data[5].promedio)*20  }
    ];

    const nivelSocioeconomicoData = [
        { label: 'A/B', value: 10, color: '#9CA3AF' },
        { label: 'C+', value: 25, color: '#FED7AA' },
        { label: 'C', value: 30, color: '#FDBA74' },
        { label: 'C-', value: 20, color: '#FB923C' },
        { label: 'D/E', value: 15, color: '#F97316' }
    ];
    // Datos para el gráfico de Género
    const generoData = [
    { label: 'Masculino', value: 54.9, color: '#FFB74D' },
    { label: 'Femenino', value: 45.1, color: '#FF8A65' }
    ];


    const edadDataRaw = [
    { label: '18-25', value: 12, color: '#E0E0E0' },
    { label: '26-34', value: 15, color: '#BDBDBD' },
    { label: '34-44', value: 20, color: '#FFC107' },
    { label: '45-54', value: 22, color: '#FFB74D' },
    { label: '55-64', value: 18, color: '#FF9800' },
    { label: '65+', value: 13, color: '#FF6B35' }
    ];

    // Calcular el total y agregar porcentajes a las etiquetas
    const totalEdad = edadDataRaw.reduce((sum, item) => sum + item.value, 0);
    const edadData = edadDataRaw.map(item => ({
        ...item,
        label: `${item.label} (${Math.round((item.value / totalEdad) * 100)}%)`
    }));

  return (
    <div className='flex flex-col w-full gap-2 lg:gap-4'> 
        {/* Primera fila - Percepción */}
        <div className='flex gap-2 lg:gap-3 w-full'>  
        <div className='w-full'>
            <Card title="Percepción Ciudadana en Educación">
                <div className='flex flex-col w-full items-end'>
                    <div className='w-[79%] pr-2 lg:pr-4 flex justify-between'>
                        <h1 className='border-0 p-0.5 shadow-gray-500 hidden sm:block  shadow-sm text-xs lg:text-base'>Positivo</h1>
                        <h1 className='border-0 p-0.5 shadow-gray-500 hidden sm:block  shadow-sm text-xs lg:text-base'>Negativo</h1>
                    </div>
                    {intereses.map((tema, index) => (   
                    <div key={index} className='w-full flex flex-col mb-3'>
                        {/* Versión móvil - label y porcentaje arriba, barra abajo */}
                        <div className='block lg:hidden'>
                        <div className='flex justify-between items-center mb-1 px-2'>
                            <h1 className='text-gray-500 text-sm'>{tema.label}</h1>
                            <span className='text-gray-400 text-xs font-semibold'>{tema.count}%</span>
                        </div>
                        <div className='w-full h-3 rounded-xs px-2'>
                            <div className='w-full h-full rounded-xs' style={{ background: `linear-gradient(90deg,rgb(255, 145, 77) 0%,rgb(255, 196, 160) ${tema.count}%, rgb(215, 215, 215, 0.8) ${tema.count}%, rgb(215, 215, 215, 0.8) 100%)`}}>
                            </div>
                        </div>
                        </div>
                        
                        {/* Versión desktop - como originalmente */}
                        <div className='hidden lg:block'>
                        <div className='flex group gap-2 w-full items-center justify-end px-3'>
                            <h1 className='text-gray-500 mr-12 text-lg'>{tema.label}</h1>
                            <div className='w-[75%] h-4 rounded-xs' style={{ background: `linear-gradient(90deg,rgb(255, 145, 77) 0%,rgb(255, 196, 160) ${tema.count}%, rgb(215, 215, 215, 0.8) ${tema.count}%, rgb(215, 215, 215, 0.8) 100%)`}}>
                            <div className='text-gray-400 text-sm font-semibold w-min relative -top-0.5 -left-13 px-2 rounded-lg group-hover:block'>
                                {tema.count}%
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </Card>
        </div>   
        </div>
        
        {/* Segunda fila - Demográficos y Mapa */}
        <div className='flex flex-col lg:flex-row gap-2 lg:gap-3 w-full'>  
        <div className='w-full lg:w-[60%] flex flex-col gap-2 lg:gap-3'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3'>
                <Card title="Edad">
                    <DonutChart2 
                    title="Edad"
                    data={edadData}
                    type="default"
                    />
                </Card>
                <Card title="Género">
                    <DonutChart2 
                    title="Género"
                    data={generoData}
                    type="gender"
                    />
                </Card>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3'>
                <Card title="Sección electoral">
                    <ElectoralMap/>
                </Card>
                <Card title="Nivel Socioeconómico">
                    <SimpleFunnelChart 
                    data={nivelSocioeconomicoData}
                    showPercentage={true}
                    sortData={true}
                    maintainColorOrder={true}  // Usar colores predefinidos
                    />
                </Card>
            </div>
        </div>  
        <div className='w-full lg:w-[40%]'>
            <Card title="Mapa de calor">
                <HeatmapComponent data={heatmapData} />
            </Card>
        </div>    
        </div>
    </div>
  )
}

export {Educacion}