import React from 'react'
import { Layout, Card } from '../../components';
import { HeatmapComponent } from '../../components';

function Geolocalizacion() {
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

  return (
    <Layout>
      <div className='flex flex-col w-full mb-3 sm:mb-5 items-center gap-3 sm:gap-4 py-2 sm:py-4 px-3 sm:px-6'>
        {/* Header con botón de descarga responsive */}
        <div className='w-full flex justify-end items-center'>
          <button className='bg-[#acb8bf] px-3 sm:px-4 py-1 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-sm sm:text-base'>
            Descargar
          </button>
        </div>
        
        {/* Mapa de calor responsive */}
        <div className='flex flex-1 gap-2 w-full'>
          <div className='w-full h-full'>
            <Card title='Mapa de calor'>
                <div className='flex flex-col items-center w-full gap-3 sm:gap-4 pt-2 sm:pt-4'>
                  {/* Contenedor del mapa responsive */}
                  <div className='w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[500px]'>
                    <HeatmapComponent 
                      data={heatmapData} 
                      useContainerHeight={true}
                    />
                  </div>
                  
                  {/* Leyenda responsive */}
                  <div className='w-full flex flex-col sm:flex-row justify-center sm:justify-evenly gap-3 sm:gap-4 px-2 sm:px-4'>
                    <div className='flex gap-2 sm:gap-3 items-center justify-center sm:justify-start'>
                      <div className='w-6 sm:w-8 h-4 sm:h-6 bg-[#23c054] rounded flex-shrink-0'></div>
                      <p className='text-xs sm:text-sm md:text-base font-medium text-center sm:text-left'>ZONAS A FAVOR DE PL</p>
                    </div>
                    <div className='flex gap-2 sm:gap-3 items-center justify-center sm:justify-start'>
                      <div className='w-6 sm:w-8 h-4 sm:h-6 bg-[#c32222] rounded flex-shrink-0'></div>
                      <p className='text-xs sm:text-sm md:text-base font-medium text-center sm:text-left'>ZONAS EN CONTRA DE PL</p>
                    </div>
                  </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Geolocalizacion