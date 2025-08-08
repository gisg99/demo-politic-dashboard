import React from 'react'
import { Layout, Card, HeatmapComponent, ConnectionHoursChart, DeviceChart, DonutChart2 } from '../../components';


function Movilidad() {

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

    const datosConexiones = [
      850, 520, 380, 290, 220, 340, 680, 1580,
      2180, 2450, 2280, 2120, 1980, 2150, 2320, 2480,
      2550, 2420, 2380, 2250, 2100, 1850, 1420, 980
    ];
    // Datos por defecto (como en tu imagen)
    const defaultData = [
      { label: 'Mobile', value: 97, color: '#f59e0b' },
      { label: 'Desktop', value: 5, color: '#fbbf24' }
    ];

  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center gap-4 py-4 px-6 mb-40'>
        <div className='w-full flex justify-end items-center'>
         <h2 className='relative  bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary'>Descargar</h2>
        </div>
        <div className='flex gap-2 w-full'>
          <div className='w-[100%]'>
            <Card title='Mapa de calor'>
              <div className='flex flex-col w-full'>
                <div className='w-full flex'>
                  <h1 className='text-gray-500'>Zonas de Permanencia y Concentración</h1>
                </div>
                <HeatmapComponent data={heatmapData} />
              </div>
            </Card>
          </div>
        </div>
        <div className='flex gap-4 w-full'>
          <div className='w-[50%]'>
            <Card title=' Horarios de Conexión más Frecuentes'>
              <ConnectionHoursChart 
                data={datosConexiones}
                title="Horarios de Conexión más Frecuentes"
                backgroundColor="rgba(255, 159, 64, 0.8)"
                height="300px"
                showStats={true}
              />
            </Card>
          </div>
          <div className='w-[50%]'>
            <Card title='Tipo de Dispositivo'>
              <div className='flex justify-center items-center w-full h-full'>
                <div className='flex w-[50%]'>
                  <DeviceChart 
                    data={defaultData}
                    height={250}
                    maxValue={100}
                  />
                </div>
                <div className='flex w-[50%]'>
                  <DonutChart2 
                    data={[
                      { label: 'iPhone', value: 15, color: '#fbbf24' },     // amarillo/naranja claro
                      { label: 'Android', value: 70, color: '#fb923c' },    // naranja
                      { label: 'Otro', value: 15, color: '#d1d5db' }        // gris
                    ]}
                    type="default"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Movilidad
