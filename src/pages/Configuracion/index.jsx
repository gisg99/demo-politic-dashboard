import React from 'react'
import { Layout, Card } from '../../components';

function Configuracion() {
  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-2 sm:py-4 px-3 sm:px-6 mb-6 sm:mb-10'>
        {/* Header con botón de descarga responsive */}
        <div className='w-full flex justify-end items-center mb-3 sm:mb-4'>
          <button className='bg-[#acb8bf] px-3 sm:px-4 py-1 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-sm sm:text-base'>
            Descargar
          </button>
        </div>
        
        {/* Contenido principal responsive */}
        <div className='flex flex-col lg:flex-row gap-3 sm:gap-4 w-full'>
          <div className='w-full lg:w-[60%]'>
            <Card title='Nivel de aceptación PL'>
              {/* Contenido placeholder responsive */}
              <div className='flex items-center justify-center h-48 sm:h-64 lg:h-80 text-gray-500'>
                <div className='text-center'>
                  <div className='text-4xl sm:text-6xl mb-2 sm:mb-4'>⚙️</div>
                  <p className='text-sm sm:text-base'>Configuración del sistema</p>
                  <p className='text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2'>Próximamente</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Espacio para contenido adicional */}
          <div className='w-full lg:w-[40%]'>
            <Card title='Configuraciones adicionales'>
              <div className='flex flex-col gap-3 sm:gap-4 p-2 sm:p-4'>
                <div className='space-y-2 sm:space-y-3'>
                  <h3 className='font-semibold text-sm sm:text-base text-gray-700'>Ajustes generales</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded'>
                      <span className='text-xs sm:text-sm'>Notificaciones</span>
                      <div className='w-8 sm:w-10 h-4 sm:h-5 bg-gray-300 rounded-full'></div>
                    </div>
                    <div className='flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded'>
                      <span className='text-xs sm:text-sm'>Modo oscuro</span>
                      <div className='w-8 sm:w-10 h-4 sm:h-5 bg-gray-300 rounded-full'></div>
                    </div>
                    <div className='flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded'>
                      <span className='text-xs sm:text-sm'>Auto-actualización</span>
                      <div className='w-8 sm:w-10 h-4 sm:h-5 bg-tertiary rounded-full'></div>
                    </div>
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

export default Configuracion