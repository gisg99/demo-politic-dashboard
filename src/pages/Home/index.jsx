import React from 'react'
import { Card, Layout, DonutChart, VerticalBars } from '../../components';
import { VscFlame } from "react-icons/vsc";
import { IoLogoWechat } from "react-icons/io5";
import { ImArrowUp, ImArrowDown  } from "react-icons/im";
import { HiBellAlert } from "react-icons/hi2";

function Home() {

  let percepcionTransporte = '';
  let lipsTransporte = null;
  let percepcionSalud = '';
  let lipsSalud = null;
  
  const transporte = { label: 'Transporte', count: 63 }
  const salud = { label: 'Salud', count: 52 }
  const aceptacion = { semana1: '50', semana2: '100' }
  const alertas = [ 
  { label: 'Actividad inusual de competencia en zona' },
  { label: 'Mención viral detectada: corrupción en zona Z' },
  { label: 'Incremento repentino de menciones sobre falta de seguridad' },
  { label: 'Tendencia creciente de quejas por servicios públicos en zona norte' }
];

  function compararSemanas({ semana1, semana2 }) {
    const diferencia = semana2 - semana1;
    const porcentajeCambio = (diferencia / semana1) * 100;

    let tipoCambio;
    if (diferencia > 0) {
      tipoCambio = 'incremento';
    } else if (diferencia < 0) {
      tipoCambio = 'decremento';
    } else {
      tipoCambio = 'sin cambio';
    }

    return {
      tipoCambio,
      porcentaje: Math.abs(porcentajeCambio).toFixed(2) // en positivo
    };
  }
  const resultado = compararSemanas(aceptacion);

  // Seria
  const SeriaSvg = () => (
    <svg className='text-gray-400 mb-4 w-32 lg:w-32 xl:w-32 h-16 lg:h-20' viewBox="0 5 40 20">
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
    <svg className='text-gray-400 mb-4 w-32 lg:w-32 xl:w-32 h-16 lg:h-20' viewBox="0 5 40 20">
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
    <svg className='text-gray-400 mb-4 w-32 lg:w-32 xl:w-32 h-16 lg:h-20' viewBox="0 0 40 20">
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
      <div className='flex flex-col w-full h-full items-center py-4 px-6 overflow-x-hidden'>
        {/* Header arreglado */}
        <div className='w-full flex justify-between items-center mb-4'>
          <h1 className='text-gray-400 font-bold uppercase text-sm lg:text-base'>Resumen ejecutivo</h1>
          <h2 className='bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-sm'>
            Descargar
          </h2>
        </div>
        
        <div className='flex flex-col w-full'> 
          <div className='flex flex-col w-full h-full gap-3'>
            {/* Primera fila */}
            <div className='flex gap-2 w-full'>
              <div className='w-[50%]'>
                <Card title={transporte.label}>
                  <div className='w-full h-full flex flex-col justify-between'>
                    <div className='w-full h-full flex items-center'>
                      <div className='w-[50%] h-full flex justify-center items-center'>
                        <h1 className='font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-gray-400'>
                          {transporte.count}%
                        </h1>
                      </div>
                      <div className='w-[50%] h-full pb-4 flex flex-col justify-center items-center'>
                        <div>{lipsTransporte}</div>
                        <h1 className='text-gray-400 font-bold text-xs lg:text-sm xl:text-base'>
                          {percepcionTransporte}
                        </h1>
                      </div>
                    </div>
                    <div className='w-full h-3 rounded-2xl' style={{ 
                      background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${transporte.count}%, rgb(250, 235, 215, 1) ${transporte.count}%, rgb(250, 235, 215, 1) 100%)`
                    }}>
                      <span>‎</span>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className='w-[50%]'>
                <Card title={salud.label}>
                  <div className='w-full h-full flex flex-col justify-between'>
                    <div className='w-full h-full flex items-center'>
                      <div className='w-[50%] h-full flex justify-center items-center'>
                        <h1 className='font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-gray-400'>
                          {salud.count}%
                        </h1>
                      </div>
                      <div className='w-[50%] h-full pb-4 flex flex-col justify-center items-center'>
                        <div>{lipsSalud}</div>
                        <h1 className='text-gray-400 font-bold text-xs lg:text-sm xl:text-base'>
                          {percepcionSalud}
                        </h1>
                      </div>
                    </div>
                    <div className='w-full h-3 rounded-2xl' style={{ 
                      background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${salud.count}%, rgb(250, 235, 215, 1) ${salud.count}%, rgb(250, 235, 215, 1) 100%)`
                    }}>
                      <span>‎</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Segunda fila */}
            <div className='flex gap-2 w-full'>
              <div className='w-[70%]'>
                <Card title='Zonas criticas'>
                  <div className='w-full h-full flex justify-between'>
                    <div className='w-[50%] h-full flex flex-col justify-center items-start p-2'>
                      <div className='flex justify-center items-end'>                
                        <h1 className='font-semibold text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[100px] leading-none text-gray-400'>
                          3
                        </h1>
                        <VscFlame className='text-tertiary w-8 h-8 lg:w-10 lg:h-10' />
                      </div>
                      <h1 className='text-gray-400 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold'>
                        Secciones con sentimiento
                      </h1>
                      <h1 className='text-gray-400 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold'>
                        negativo creciente
                      </h1>
                    </div>
                    <div className='w-[50%] h-full flex justify-center items-center'>
                      <DonutChart percentage={15} timeText="3 hrs" />                    
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className='w-[30%]'>
                <Card title='Mención más frecuente'>
                  <div className='flex flex-col justify-center items-center w-full h-full'>
                    <IoLogoWechat className='text-gray-400 w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24' />
                    <h1 className='text-gray-400 font-semibold text-lg lg:text-xl xl:text-2xl 2xl:text-3xl'>
                      Corrupción
                    </h1>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Tercera fila */}
            <div className='flex gap-2 w-full'>
              <div className='w-[60%]'>
                <Card title='Nivel de aceptación PL'>
                  <div className='h-full w-full flex min-h-[120px]'>
                    <div className='w-[50%] h-full flex flex-col justify-center p-2'>
                      <div className='flex items-end'>
                        <h1 className='text-gray-400 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px]'>
                          {resultado.porcentaje}%
                        </h1>
                        {resultado.tipoCambio === 'incremento' ? 
                          <ImArrowUp className='text-tertiary w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7' /> : 
                          <ImArrowDown className='text-tertiary w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7' />
                        }
                      </div>
                      <h1 className='text-gray-400 text-xs lg:text-sm xl:text-base'>
                        Respecto a la semana anterior <br/> tuvimos un {resultado.tipoCambio}
                      </h1>
                    </div>
                    <div className='w-[50%] h-full min-h-[120px] flex gap-5 justify-center'>
                      <VerticalBars porcentage={aceptacion.semana1} />
                      <VerticalBars porcentage={aceptacion.semana2} />
                    </div>
                  </div>
                </Card>
              </div>
              
              <div className='w-[40%]'>
                <Card title='Alertas Estratégicas'>
                  <div className='flex flex-col gap-2'>
                    {alertas.slice(-3).map((alerta, index) => (
                      <div key={index} className='flex items-start w-full gap-2'>
                        <HiBellAlert className='text-tertiary mt-1 flex-shrink-0 w-6 h-6 lg:w-7 lg:h-7' />
                        <div style={{ background: 'var(--bg-orange-gradient)' }} 
                             className='flex items-start gap-2 p-1.5 lg:p-2 rounded-lg lg:rounded-2xl w-full'>
                          <p className='text-xs lg:text-sm xl:text-base text-white font-bold'>
                            {alerta.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
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