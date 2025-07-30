import React from 'react'
import { Card, Layout, DonutChart, VerticalBars } from '../../components';
import { VscFlame } from "react-icons/vsc";
import { IoLogoWechat } from "react-icons/io5";
import { ImArrowUp, ImArrowDown  } from "react-icons/im";

function Home() {

  let percepcionTransporte = '';
  let lipsTransporte = null;
  let percepcionSalud = '';
  let lipsSalud = null;
  
  const transporte = { label: 'Transporte', count: 63 }
  const salud = { label: 'Salud', count: 52 }
  const aceptacion = { semana1: '50', semana2: '100' }

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
                      <div className='flex justify-center items-end h-full'>                
                        <h1 className='font-semibold text-[120px] leading-26 text-gray-400'>3</h1>
                        <VscFlame className='text-tertiary' size={40} />
                      </div>
                      <h1 className='text-gray-400 text-2xl font-bold'>Secciones con sentimiento</h1>
                      <h1 className='text-gray-400 text-2xl font-bold'>negativo creciente</h1>
                    </div>
                    <div className='w-[50%] h-full flex justify-center items-center'>
                      <DonutChart percentage={15} timeText="3 hrs" />                    
                    </div>
                  </div>
                </Card>
              </div>
              <div className='w-[30%] h-full'>
                <Card title='Mención más frecuente'>
                  <div className='flex flex-col justify-center items-center w-full h-full'>
                    <IoLogoWechat className='text-gray-400' size={100} />
                    <h1 className='text-gray-400 font-semibold text-3xl'>Corrupción</h1>
                  </div>
                </Card>
              </div>
            </div>
            <div className='flex group gap-2 w-full h-full items-center justify-between'>
              <div className='w-[60%] h-full'>
                <Card title='Nivel de aceptación PL'>
                   <div className='h-full w-full flex min-h-[120px]'>
                    <div className='w-[50%] h-full'>
                      <div className='flex items-end'>
                        <h1 className='text-gray-400 font-bold text-[70px] '>{resultado.porcentaje}%</h1>
                        {resultado.tipoCambio === 'incremento' ? <ImArrowUp className='text-tertiary' size={30} /> : <ImArrowDown className='text-tertiary' size={30} />}
                        
                      </div>
                      <h1 className='text-gray-400 '>Respecto a la semana anterior <br/> tuvimos un {resultado.tipoCambio}</h1>
                    </div>
                    <div className='w-[50%] h-full min-h-[120px] flex gap-5 justify-center'>
                      <VerticalBars porcentage={aceptacion.semana1} />
                      <VerticalBars porcentage={aceptacion.semana2} />
                    </div>
                  </div>
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
