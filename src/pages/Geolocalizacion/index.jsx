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
      <div className='flex flex-col w-full h-full items-center gap-4 py-4 px-6 mb-10'>
        <div className='w-full flex justify-end items-center'>
         <h2 className='relative  bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary'>Descargar</h2>
        </div>
        <div className='flex flex-1 gap-2 w-full'>
          <div className='w-full h-full'>
            <Card title='Mapa de calor'>
                <div className='flex flex-col items-center w-full gap-4 pt-4'>
                  <HeatmapComponent data={heatmapData} />
                  <div className='w-full flex justify-evenly'>
                    <div className='flex gap-2'>
                      <div className='w-8 h-6 bg-[#23c054]'></div>
                      <p>ZONAS A FAVOR DE PL</p>
                    </div>
                    <div className='flex gap-2'>
                      <div className='w-8 h-6 bg-[#c32222]'></div>
                      <p>ZONAS EN CONTRA DE PL</p>
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
