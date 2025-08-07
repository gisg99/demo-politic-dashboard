import {React, useState }from 'react'
import { Card, DonutChart2, ElectoralMap, SimpleFunnelChart, HeatmapComponent } from '../../components'

function Transporte() {

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
        { label: 'Sostenibilidad', count: 70 },
        { label: 'Movilidad Compartida', count: 80 },
        { label: 'Innovación Tecno.', count: 65 },
        { label: 'Infraestructura', count: 90 },
        { label: 'Seguridad', count: 85 },
        { label: 'Conectividad', count: 70 }
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
    { label: 'Masculino', value: 58.2, color: '#FFB74D' },
    { label: 'Femenino', value: 41.8, color: '#FF8A65' }
    ];


    const edadDataRaw = [
    { label: '18-25', value: 8, color: '#E0E0E0' },
    { label: '26-34', value: 22, color: '#BDBDBD' },
    { label: '34-44', value: 27, color: '#FFC107' },
    { label: '45-54', value: 18, color: '#FFB74D' },
    { label: '55-64', value: 15, color: '#FF9800' },
    { label: '65+', value: 10, color: '#FF6B35' }
    ];

    // Calcular el total y agregar porcentajes a las etiquetas
    const totalEdad = edadDataRaw.reduce((sum, item) => sum + item.value, 0);
    const edadData = edadDataRaw.map(item => ({
        ...item,
        label: `${item.label} (${Math.round((item.value / totalEdad) * 100)}%)`
    }));

  return (
    <div className='flex flex-col w-full gap-4'> 
        {/* Primera fila - Demográficos y Ocupación */}
        <div className='flex gap-3 w-full'>  
        <div className='w-[100%]'>
            <Card title="Percepción Ciudadana en Transporte">
                <div className='flex flex-col w-full items-end'>
                    <div className='w-[79%] pr-4 flex justify-between'>
                        <h1 className='border-0 p-0.5 shadow-gray-500 shadow-sm'>Positivo</h1>
                        <h1 className='border-0 p-0.5 shadow-gray-500 shadow-sm'>Negativo</h1>
                    </div>
                    {intereses.map((tema, index) => (   
                        <div key={index} className='w-full flex flex-col'>
                        <div className='flex group gap-2 w-full items-center justify-end px-3'>
                            <h1 className='text-gray-500 mr-12 text-lg'>{tema.label}</h1>
                            <div className='w-[75%] h-4 rounded-xs' style={{ background: `linear-gradient(90deg,rgb(255, 145, 77) 0%,rgb(255, 196, 160) ${tema.count}%, rgb(215, 215, 215, 0.8) ${tema.count}%, rgb(215, 215, 215, 0.8) 100%)`}}>
                                <div className='text-gray-400 text-sm font-semibold w-min relative -top-0.5 -left-13 px-2 rounded-lg group-hover:block'>
                                    {tema.count}%
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>   
        </div>
        <div className='flex gap-3 w-full'>  
        <div className='w-[60%] flex flex-col gap-3'>
            <div className='flex gap-3'>
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
            <div className='flex gap-3'>
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
        <div className='w-[40%]'>
            <Card title="Mapa de calor">
                <HeatmapComponent data={heatmapData} />
            </Card>
        </div>    
        </div>
    </div>
  )
}

export {Transporte}
