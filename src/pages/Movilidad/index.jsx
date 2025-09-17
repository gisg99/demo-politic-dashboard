import React, { useContext, useEffect } from 'react'
import { Layout, Card, HeatmapComponent, ConnectionHoursChart, DeviceChart, DonutChart2 } from '../../components';
import { MovilidadContext } from '../../utils/MovilidadContext';

function Movilidad() {

  const { visitas, horarios } = useContext(MovilidadContext);
  const [puntos, setPuntos] = React.useState([]);

  useEffect(() => {
    if (visitas && visitas.length > 0) {
      const nuevosPuntos = visitas.map(visita => [
        visita.estacion,
        parseFloat(visita.latitud),
        parseFloat(visita.longitud),
        parseInt(visita.total)
      ]);
      setPuntos(nuevosPuntos);
    }
  }, [visitas]);

  // const heatmapData = [
  //   [20.6748, -103.344, "100"],
  //   [20.6782, -103.340, "85"],
  //   [20.6711, -103.350, "70"],
  //   [20.6699, -103.346, "60"],
  //   [20.6711, -103.350, "70"],
  //   [20.6699, -103.346, "60"],
  //   [20.6760, -103.349, "50"],
  //   [20.6752, -103.341, "45"],
  //   [20.6730, -103.343, "30"]
  //   ];

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
      <div className='flex flex-col w-full h-full items-center gap-3 sm:gap-4 py-2 sm:py-4 px-3 sm:px-6 mb-20 sm:mb-40'>
        {/* Header responsive */}
        <div className='w-full flex justify-end items-center'>
          <button className='bg-[#acb8bf] px-3 sm:px-4 py-1 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-sm sm:text-base'>
            Descargar
          </button>
        </div>
        
        {/* Mapa de calor - Full width responsive */}
        <div className='flex gap-2 w-full'> 
          <div className='w-full'>
            <Card title='Mapa de calor'>
              <div className='flex flex-col w-full gap-2 sm:gap-3'>
                <div className='w-full flex'>
                  <h1 className='text-gray-500 text-sm sm:text-base'>Zonas de Permanencia y Concentración</h1>
                </div>
                <div className='w-full h-64 sm:h-80 md:h-96 lg:h-[400px]'>
                  <HeatmapComponent 
                    data={puntos} 
                    useContainerHeight={true}  // Esto hace que use h-full
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Segunda fila - Charts responsive */}
        <div className='flex flex-col lg:flex-row gap-3 sm:gap-4 w-full'>
          {/* Horarios de conexión */}
          <div className='w-full lg:w-[50%]'>
            <Card title='Horarios de Conexión más Frecuentes'>
              <div className='w-full h-64 sm:h-80 md:h-96 lg:h-[300px]'>
                <ConnectionHoursChart 
                  data={datosConexiones}
                  title="Horarios de Conexión más Frecuentes"
                  backgroundColor="rgba(255, 159, 64, 0.8)"
                  height="100%"
                  showStats={true}
                />
              </div>
            </Card>
          </div>
          
          {/* Tipo de dispositivo */}
          <div className='w-full lg:w-[50%]'>
            <Card title='Tipo de Dispositivo'>
              <div className='flex flex-col sm:flex-row justify-center items-center w-full h-full gap-4 sm:gap-0 py-4'>
                {/* Device Chart responsive */}
                <div className='flex w-full sm:w-[50%] justify-center min-h-[200px] sm:min-h-[250px]'>
                  <DeviceChart 
                    data={defaultData}
                    height={200}
                    maxValue={100}
                  />
                </div>
                
                {/* Donut Chart responsive */}
                <div className='flex w-full sm:w-[50%] justify-center min-h-[200px] sm:min-h-[250px]'>
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