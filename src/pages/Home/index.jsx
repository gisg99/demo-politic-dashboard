import React, { useContext, useMemo } from 'react'
import { Card, Layout, DonutChart, VerticalBar } from '../../components';
import { VscFlame } from "react-icons/vsc";
import { IoLogoWechat } from "react-icons/io5";
import { ImArrowUp, ImArrowDown  } from "react-icons/im";
import { HiBellAlert } from "react-icons/hi2";
import { HomeProvider } from '../../utils/HomeContext';
import { InformacionContext } from '../../utils/InformacionContext';
import { RedesContext } from '../../utils/RedesContext'; // ⬅️ IMPORTANTE

function Home() {
  const { percepcion } = useContext(InformacionContext);

  // ⬇️ Traemos la info de Redes (semana seleccionada, loading, y el general[0])
  const { weeklyReportGeneral, selectedWeek, loading: loadingRedes, error: errorRedes } = useContext(RedesContext);
  const general = weeklyReportGeneral?.[0] ?? null;
  const mencionMasFrecuente = general?.mencion_mas_frecuente ?? 'N/A';

  let percepcionTransporte = '';
  let lipsTransporte = null;
  let percepcionSalud = '';
  let lipsSalud = null;

  // Filtra percepciones de "General" de forma segura
  const generales = useMemo(
    () => (percepcion ?? []).filter(p => (p?.tema ?? '').toLowerCase() === 'general'),
    [percepcion]
  );

  // Helper seguro para extraer promedio * 20 por índice
  const pct = (idx) => {
    const val = parseFloat(generales?.[idx]?.promedio ?? 0);
    return Number.isFinite(val) ? val * 20 : 0;
  };

  const transporte = { label: 'Transporte', count: pct(3) }; // pregunta 4
  const salud = { label: 'Salud', count: pct(0) };           // pregunta 1

  const aceptacion = { semana1: '50', semana2: '70' }
  const alertas = [ 
    { label: 'Actividad inusual de competencia en zona' },
    { label: 'Mención viral detectada: corrupción en zona Z' },
    { label: 'Incremento repentino de menciones sobre falta de seguridad' },
    { label: 'Tendencia creciente de quejas por servicios públicos en zona norte' }
  ];

  function compararSemanas({ semana1, semana2 }) {
    const s1 = Number(semana1) || 0;
    const s2 = Number(semana2) || 0;
    const diferencia = s2 - s1;
    const porcentajeCambio = s1 === 0 ? 0 : (diferencia / s1) * 100;

    let tipoCambio;
    if (diferencia > 0) tipoCambio = 'incremento';
    else if (diferencia < 0) tipoCambio = 'decremento';
    else tipoCambio = 'sin cambio';

    return { tipoCambio, porcentaje: Math.abs(porcentajeCambio).toFixed(2) };
  }
  const resultado = compararSemanas(aceptacion);

  // Caritas
  const SeriaSvg = () => (
    <svg className='text-gray-400 lg:mb-4 w-20 sm:w-24 lg:w-32 xl:w-32 h-10 sm:h-12 lg:h-16 xl:h-20' viewBox="0 5 40 20">
      <path d="M 10 20 L 30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
  const TristeSvg = () => (
    <svg className='text-gray-400 lg:mb-4 w-20 sm:w-24 lg:w-32 xl:w-32 h-10 sm:h-12 lg:h-16 xl:h-20' viewBox="0 5 40 20">
      <path d="M 10 25 Q 20 15 30 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
  const FelizSvg = () => (
    <svg className='text-gray-400 lg:mb-4 w-20 sm:w-24 lg:w-32 xl:w-32 h-10 sm:h-12 lg:h-16 xl:h-20' viewBox="0 5 40 20">
      <path d="M 10 15 Q 20 25 30 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );

  // Evaluar percepción de transporte
  if (transporte.count > 50) { percepcionTransporte = 'Percepción positiva'; lipsTransporte = <FelizSvg />; }
  else if (transporte.count > 30) { percepcionTransporte = 'Percepción media'; lipsTransporte = <SeriaSvg />; }
  else { percepcionTransporte = 'Percepción negativa'; lipsTransporte = <TristeSvg />; }

  // Evaluar percepción de salud
  if (salud.count > 50) { percepcionSalud = 'Percepción positiva'; lipsSalud = <FelizSvg />; }
  else if (salud.count > 30) { percepcionSalud = 'Percepción media'; lipsSalud = <SeriaSvg />; }
  else { percepcionSalud = 'Percepción negativa'; lipsSalud = <TristeSvg />; }

  return (
    <HomeProvider>
      <Layout>
        <div className='flex flex-col w-full h-full items-center py-2 lg:py-4 px-2 lg:px-6 overflow-x-hidden'>
          {/* Header responsive */}
          <div className='w-full flex justify-between items-center mb-2 lg:mb-4'>
            <h1 className='text-gray-400 font-bold uppercase text-xs lg:text-base'>Resumen ejecutivo</h1>
            <h2 className='bg-[#acb8bf] px-2 lg:px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-sm'>
              Descargar
            </h2>
          </div>
          
          <div className='flex flex-col w-full'> 
            <div className='flex flex-col w-full h-full gap-2 lg:gap-3'>
              {/* Primera fila */}
              <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <div className='w-full sm:w-[50%]'>
                  <Card title={transporte.label}>
                    <div className='w-full h-full flex flex-col justify-between'>
                      <div className='w-full h-full flex items-center'>
                        <div className='w-[50%] h-full flex justify-center items-center'>
                          <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-400'>
                            {transporte.count}%
                          </h1>
                        </div>
                        <div className='w-[50%] h-full pb-2 lg:pb-4 flex flex-col justify-center items-center'>
                          <div>{lipsTransporte}</div>
                          <h1 className='text-gray-400 font-bold text-xs lg:text-sm xl:text-base text-center'>
                            {percepcionTransporte}
                          </h1>
                        </div>
                      </div>
                      <div className='w-full h-2 lg:h-3 rounded-2xl' style={{ 
                        background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${transporte.count}%, rgb(250, 235, 215, 1) ${transporte.count}%, rgb(250, 235, 215, 1) 100%)`
                      }}>
                        <span>‎</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className='w-full sm:w-[50%]'>
                  <Card title={salud.label}>
                    <div className='w-full h-full flex flex-col justify-between'>
                      <div className='w-full h-full flex items-center'>
                        <div className='w-[50%] h-full flex justify-center items-center'>
                          <h1 className='font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-gray-400'>
                            {salud.count}%
                          </h1>
                        </div>
                        <div className='w-[50%] h-full pb-2 lg:pb-4 flex flex-col justify-center items-center'>
                          <div>{lipsSalud}</div>
                          <h1 className='text-gray-400 font-bold text-xs lg:text-sm xl:text-base text-center'>
                            {percepcionSalud}
                          </h1>
                        </div>
                      </div>
                      <div className='w-full h-2 lg:h-3 rounded-2xl' style={{ 
                        background: `linear-gradient(90deg,rgb(255, 140, 0) 0%,rgb(255, 140, 0) ${salud.count}%, rgb(250, 235, 215, 1) ${salud.count}%, rgb(250, 235, 215, 1) 100%)`
                      }}>
                        <span>‎</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Segunda fila */}
              <div className='flex flex-col lg:flex-row gap-2 w-full'>
                <div className='w-full lg:w-[70%]'>
                  <Card title='Zonas criticas'>
                    <div className='w-full h-full flex justify-between'>
                      <div className='w-[50%] h-full flex flex-col justify-center items-start p-1 lg:p-2'>
                        <div className='flex justify-center items-end'>                
                          <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[100px] leading-none text-gray-400'>
                            3
                          </h1>
                          <VscFlame className='text-tertiary w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10' />
                        </div>
                        <h1 className='text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold'>
                          Secciones con sentimiento
                        </h1>
                        <h1 className='text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold'>
                          negativo creciente
                        </h1>
                      </div>
                      <div className='w-[50%] h-full  flex justify-center items-center'>
                        <DonutChart percentage={15} timeText="3 hrs" />                    
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className='w-full lg:w-[30%]'>
                  <Card title='Mención más frecuente'>
                    <div className='flex flex-col justify-center items-center w-full h-full py-2 lg:py-0'>
                      <IoLogoWechat className='text-gray-400 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24' />
                      {/* ⬇️ Aquí conectamos con el RedesContext */}
                      {loadingRedes ? (
                        <h1 className='text-gray-400 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl mt-2'>
                          Cargando ...
                        </h1>
                      ) : errorRedes ? (
                        <h1 className='text-red-500 font-semibold text-sm sm:text-base lg:text-lg xl:text-xl mt-2'>
                          Error al cargar
                        </h1>
                      ) : (
                        <h1 className='text-gray-400 font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl mt-2'>
                          {mencionMasFrecuente}
                        </h1>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
              
              {/* Tercera fila */}
              <div className='flex flex-col md:flex-row gap-2 w-full'>
                <div className='w-full md:w-[60%]'>
                  <Card title='Nivel de aceptación PL'>
                    <div className='h-full w-full flex min-h=[100px] lg:min-h-[120px]'>
                      <div className='w-[70%] h-full flex flex-col justify-center p-1 lg:p-2'>
                        <div className='flex items-end'>
                          <h1 className='text-gray-400 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl'>
                            {resultado.porcentaje}%
                          </h1>
                          {resultado.tipoCambio === 'incremento' ? 
                            <ImArrowUp className='text-tertiary w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-7 xl:h-7' /> : 
                            <ImArrowDown className='text-tertiary w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 xl:w-7 xl:h-7' />
                          }
                        </div>
                        <h1 className='text-gray-400 text-xs sm:text-sm lg:text-base xl:text-lg'>
                          Respecto a la semana anterior <br className='hidden lg:block'/> tuvimos un {resultado.tipoCambio}
                        </h1>
                      </div>
                      <div className="w-[30%] flex justify-center items-end gap-2 lg:gap-6">
                        <VerticalBar value={aceptacion.semana1} label="MC" />
                        <VerticalBar value={aceptacion.semana2} label="Morena" />
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className='w-full md:w-[40%]'>
                  <Card title='Alertas Estratégicas'>
                    <div className='flex flex-col gap-1 lg:gap-2'>
                      {alertas.slice(-3).map((alerta, index) => (
                        <div key={index} className='flex items-start w-full gap-1 lg:gap-2'>
                          <HiBellAlert className='text-tertiary mt-0.5 lg:mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7' />
                          <div style={{ background: 'var(--bg-orange-gradient)' }} 
                              className='flex items-start gap-1 lg:gap-2 p-1 lg:p-1.5 xl:p-2 rounded-lg lg:rounded-2xl w-full'>
                            <p className='text-xs lg:text-sm xl:text-base text-white font-bold leading-tight'>
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
    </HomeProvider>
  )
}

export default Home
