import React from 'react'
import { Card, Layout } from '../../components';


function Home() {

  let percepcionTransporte = '';
  let lipsTransporte = null;
  let percepcionSalud = '';
  let lipsSalud = null;
  
  const transporte = { label: 'Transporte', count: 13 }
  const salud = { label: 'Salud', count: 62 }

  // Seria
  const SeriaSvg = () => (
    <svg className='text-gray-400' width="130" height="80" viewBox="0 5 40 20">
      <path
        d="M 10 20 L 30 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  // Feliz
  const TristeSvg = () => (
    <svg className='text-gray-400' width="130" height="80" viewBox="0 5 40 20">
      <path
        d="M 10 25 Q 20 15 30 25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  // Triste
  const FelizSvg = () => (
    <svg className='text-gray-400' width="130" height="80" viewBox="0 0 40 20">
      <path
        d="M 10 15 Q 20 25 30 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );

  
  // Evaluar percepción de transporte
  if (transporte.count > 50) {
    percepcionTransporte = 'Percepción positiva';
    lipsTransporte = <FelizSvg />;
  } else if (transporte.count > 30) {
    percepcionTransporte = 'Percepción media';
    lipsTransporte = <SeriaSvg />;
  } else {
    percepcionTransporte = 'Percepción negativa';
    lipsTransporte = <TristeSvg />;
  }

  // Evaluar percepción de salud
  if (salud.count > 50) {
    percepcionSalud = 'Percepción positiva';
    lipsSalud = <FelizSvg />;
  } else if (salud.count > 30) {
    percepcionSalud = 'Percepción media';
    lipsSalud = <SeriaSvg />;
  } else {
    percepcionSalud = 'Percepción negativa';
    lipsSalud = <TristeSvg />;
  }


  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-4 px-6'>
        <div className='w-full flex justify-center items-center'>
          <h1 className='text-gray-400 font-bold uppercase '>Resumen ejecutivo</h1>
          <h2 className='relative left-100 bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary'>Descargar</h2>
        </div>
        <div className='flex flex-col w-full'> 
          <div className='flex flex-col w-full h-full gap-3 py-5'>
            <div className='flex group gap-2 w-full h-full items-center justify-between'>
              <div className='w-[50%] h-full'>
                <Card title={transporte.label}>
                  <div className='w-full h-full flex flex-col justify-between'>
                    <div className='w-full h-full flex items-center'>
                      <div className='w-[50%] h-full flex justify-center items-center'>
                        <h1 className='font-semibold text-[120px] text-gray-400'>{transporte.count}%</h1>
                      </div>
                      <div className='w-[50%] h-full flex flex-col justify-center items-center'>
                        <h1>{lipsTransporte}</h1>
                        <h1 className='text-gray-400 font-bold'>{percepcionTransporte}</h1>
                      </div>
                    </div>
                    <div className='w-full h-3 rounded-2xl' style={{ background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${transporte.count}%, rgb(250, 235, 215, 1) ${transporte.count}%, rgb(250, 235, 215, 1) 100%)`}}>
                      <span>‎</span>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='w-[50%] h-full'>
                <Card title={salud.label}>
                  <div className='w-full h-full flex flex-col justify-between'>
                    <div className='w-full h-full flex items-center'>
                      <div className='w-[50%] h-full flex justify-center items-center'>
                        <h1 className='font-semibold text-[120px] text-gray-400'>{salud.count}%</h1>
                      </div>
                      <div className='w-[50%] h-full flex flex-col justify-center items-center'>
                        <h1>{lipsSalud}</h1>
                        <h1 className='text-gray-400 font-bold'>{percepcionSalud}</h1>
                      </div>
                    </div>
                    <div className='w-full h-3 rounded-2xl' style={{ background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${salud.count}%, rgb(250, 235, 215, 1) ${salud.count}%, rgb(250, 235, 215, 1) 100%)`}}>
                      <span>‎</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            <div className='flex group gap-2 w-full h-full items-center justify-between'>
              <div className='w-[70%] h-full'>
                <Card title='Zonas criticas'>
                  <div className='w-full h-full flex justify-between'>
                    <div className='w-[50%] h-full flex flex-col justify-center items-start'>
                      <h1 className='font-semibold text-[120px] text-gray-400'>3</h1>
                      <h1 className='text-gray-400 font-bold'>Secciones con sentimiento</h1>
                      <h1 className='text-gray-400 font-bold'>negativo creciente</h1>
                    </div>
                    <div className='w-[50%] h-full flex justify-center items-center'>
                      <h1 className='font-semibold text-[120px] text-gray-400'>o</h1>
                    </div>
                  </div>
                </Card>
              </div>
              <div className='w-[30%] h-full'>
                <Card title='Mención más frecuente'>

                </Card>
              </div>
            </div>
            <div className='flex group gap-2 w-full h-full items-center justify-between'>
              <div className='w-[60%] h-full'>
                <Card title='Nivel de aceptación PL'>

                </Card>
              </div>
              <div className='w-[40%] h-full'>
                <Card title='Alertas Estratégicas'>

                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
