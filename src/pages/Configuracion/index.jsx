import React from 'react'
import { Layout, Card } from '../../components';


function Configuracion() {
  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-4 px-6 mb-10'>
        <div className='w-full flex justify-end items-center'>
         <h2 className='relative  bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary'>Descargar</h2>
        </div>
        <div className='flex gap-2 w-full'>
          <div className='w-[60%]'>
            <Card title='Nivel de aceptación PL'>

            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Configuracion
