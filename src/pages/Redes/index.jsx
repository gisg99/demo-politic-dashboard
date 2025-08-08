import React from 'react'
import { Layout, Card, EmojiDonutChart, PoliticalMentionsChart, ApprovalVsCompetencyChart, CandidateChart, CircleChart, PercentRings, ConnectionHoursChart } from '../../components';
import { FaAngry, FaSmile } from 'react-icons/fa' 
import { VscFlame } from "react-icons/vsc";
import { ImArrowUp, ImArrowDown  } from "react-icons/im";

function Redes() {

  const dataCandidatos = [
    { nombre: 'Candidato A', porcentaje: 30, color: '#FF6B6B' },
    { nombre: 'Candidato B', porcentaje: 20, color: '#FFB366' },
    { nombre: 'Candidato C', porcentaje: 15, color: '#FFD93D' },
    { nombre: 'Candidato D', porcentaje: 15, color: '#FF8C42' },
    { nombre: 'Candidato E', porcentaje: 15, color: '#FF7F50' },
    { nombre: 'Candidato F', porcentaje: 20, color: '#FF9F40' }
  ]

  const partidosData = [
    { label: 'MC', value: 45, color: '#FFB74D' },
    { label: 'MR', value: 30, color: '#BDBDBD' },
    { label: 'PN', value: 15, color: '#9E9E9E' },
    { label: 'PRI', value: 10, color: '#757575' }
  ]
  
  const emojiData = [
    {
      label: 'Enojado',
      value: 20,
      color: '#FF9F40',
      emoji: <FaAngry color='#FF9F40' />
    },
    {
      label: 'Feliz',
      value: 80,
      color: '#FFD93D',
      emoji: <FaSmile color='#FFD93D'/>
    }
  ]

  const sentiment = [
    { label: 'A FAVOR',   value: 58, color: '#FFA869' },
    { label: 'EN CONTRA', value: 28, color: '#FF7D5A' },
    { label: 'NEUTRAL',   value: 14, color: '#FFC978' },
  ];

  
  // Datos de intereses
  const temas = [
    {label: 'Corrupción', count: 90, color: '#FF6B4D'},
    {label: 'Medio amb.', count: 70, color: '#FFB74D'},
    {label: 'Transporte', count: 80, color: '#FFD54F'},
    {label: 'Op. Laboral', count: 60, color: '#FFAB91'},
  ];

  const getColor = (index, count) => {
    const residuo = index % 4;
    switch(residuo){
      case 0: return `linear-gradient(90deg,rgb(255, 109, 77) 0%,rgb(255, 109, 77) ${count}%, rgb(255, 109, 77, .15) ${count}%, rgb(255, 109, 77, .15) 100%)`;
      case 1: return `linear-gradient(90deg,rgb(255, 189, 89) 0%,rgb(255, 189, 89) ${count}%, rgb(255, 189, 89, .15) ${count}%, rgb(255, 189, 89, .15) 100%)`;
      case 2: return `linear-gradient(90deg,rgb(255, 222, 89) 0%,rgb(255, 222, 89) ${count}%, rgb(255, 222, 89, .15) ${count}%, rgb(255, 222, 89, .15) 100%)`;
      default: return `linear-gradient(90deg,rgb(255, 145, 77) 0%,rgb(255, 145, 77) ${count}%, rgb(255, 145, 77, .15) ${count}%, rgb(255, 145, 77, .15) 100%)`;
    }
  }
    const datosConexiones = [
      850, 520, 380, 290, 220, 340, 680, 1580,
      2180, 2450, 2280, 2120, 1980, 2150, 2320, 2480,
      2550, 2420, 2380, 2250, 2100, 1850, 1420, 980
    ];

  return (
    <Layout>
      <div className='flex flex-col w-full items-center py-2 md:py-4 px-3 md:px-6 mb-4'>
        {/* Header con botón de descarga */}
        <div className='w-full flex justify-end items-center mb-4'>
          <h2 className='relative bg-[#acb8bf] px-2 md:px-3 py-0.5 cursor-pointer text-white font-medium text-sm md:text-base rounded-full hover:bg-tertiary transition-colors'>
            Descargar
          </h2>
        </div>

        {/* Contenedor principal */}
        <div className='flex flex-col gap-3 md:gap-4 w-full'>
          
          {/* Primera fila - Layout principal */}
          <div className='flex flex-col xl:flex-row gap-3 md:gap-4'>
            
            {/* Columna izquierda - Gráficos principales */}
            <div className='w-full xl:w-[70%] flex flex-col gap-3 md:gap-4'>
              
              {/* Primera subfila */}
              <div className='flex flex-col lg:flex-row gap-3 md:gap-4'>
                <div className='w-full lg:w-1/2'>
                  <Card title='Menciones por Partido y Candidato'>
                    <PoliticalMentionsChart/>
                  </Card>
                </div>
                <div className='w-full lg:w-1/2'>
                  <Card title='Aprobación VS Competencia'>
                    <ApprovalVsCompetencyChart/>
                  </Card>
                </div>
              </div>
              
              {/* Segunda subfila */}
              <div className='flex flex-col lg:flex-row gap-3 md:gap-4'>
                <div className='w-full lg:w-1/2'>
                  <Card title='Análisis de Sentimiento en Tiempo Real'>
                    <EmojiDonutChart title="Sentimiento" data={emojiData} size="xs" />
                  </Card>
                </div>
                <div className='w-full lg:w-1/2'>
                  <Card title='Porcentaje de Aprobación'>
                    <div className='flex flex-col'>
                      <PercentRings items={sentiment} />
                      <h1 className='text-center text-tertiary font-bold text-xl md:text-2xl xl:text-3xl mt-2'>
                        Temas Frecuentes
                      </h1>
                      <div className='w-full h-full flex flex-col justify-around py-1'>
                        {temas.map((tema, index) => (
                          <div key={index} className='w-full flex flex-col'>
                            <div className='flex group gap-2 w-full items-center justify-between px-3'>
                              <h1 className='text-gray-500 text-lg'>{tema.label}</h1>
                              <div className='w-[50%] h-3 rounded-xs' style={{ background: getColor(index, tema.count)}}>
                                <div className='text-gray-400 text-lg font-semibold w-min relative -top-3 -left-13 px-2 rounded-lg group-hover:block'>
                                  {tema.count}%
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Columna derecha - Ranking y Partidos */}
            <div className='w-full xl:w-[30%]'>
              <Card title='Ranking Digital de Candidatos'>
                <div className='flex justify-start w-full flex-col'>
                  <CandidateChart dataCandidatos={dataCandidatos} />
                  <h1 className='text-center text-tertiary font-bold text-xl md:text-2xl xl:text-3xl my-2 md:my-4'>
                    Partidos
                  </h1>
                  <div className='w-full h-full flex flex-col justify-center py-2'>
                    <CircleChart 
                      title=""
                      data={partidosData}
                      showLegend={true}
                      legendPosition="right"
                      size="medium"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Segunda fila - Gráficos adicionales */}
          <div className='flex flex-col lg:flex-row w-full gap-3 md:gap-4'>
            <div className='w-full lg:w-1/2'>
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
            <div className='w-full lg:w-1/2'>
              <Card title='Alertas por Menciones Negativas o Picos Atípicos'>
                <div className='flex flex-col w-full items-center justify-end pb-8 h-full text-gray-600 gap-4'>
                  <div className='flex'>
                    {/* Iconos - Fuego y Flecha */}
                    <div className='flex items-center gap-3'>
                      {/* Ícono de fuego */}
                      <VscFlame className='text-7xl md:text-7xl text-tertiary' />
                      {/* Flecha hacia arriba */}
                      <ImArrowUp className='text-3xl md:text-4xl text-tertiary' />
                    </div>

                    {/* Porcentaje grande */}
                    <div className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-500'>
                      15%
                    </div>
                  </div>
                  
                  {/* Texto descriptivo */}
                  <div className='text-start'>
                    <p className='text-sm md:text-base lg:text-lg font-semibold text-gray-600 leading-tight'>
                      Menciones negativas<br/>
                      crecientes en redes sociales
                    </p>
                  </div>
                </div>
                <div className='flex flex-col w-full h-full p-4 md:p-6 lg:p-8 text-left gap-1'>
                  {/* Sección Plataforma */}
                  <div className='flex flex-col gap-2'>
                    <h3 className='text-xs md:text-xs lg:text-xl font-bold text-tertiary'>
                      Plataforma
                    </h3>
                    
                    {/* Lista de plataformas */}
                    <div className='flex flex-col gap-3'>
                      {/* X (Twitter) */}
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 md:w-7 md:h-7 bg-black rounded-full flex items-center justify-center'>
                          <span className='text-white font-bold text-lg md:text-xl'>X</span>
                        </div>
                        <span className='text-gray-700 text-base md:text-base font-medium'>X</span>
                      </div>
                      
                      {/* Facebook */}
                      <div className='flex items-center gap-3'>
                        <div className='w-4 h-4 md:w-7 md:h-7 bg-blue-600 rounded-full flex items-center justify-center'>
                          <span className='text-white font-bold text-sm md:text-2xl'>f</span>
                        </div>
                        <span className='text-gray-600 text-base md:text-base font-medium'>Facebook</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sección Menciones */}
                  <div className='flex flex-col gap-1'>
                    <h3 className='text-xs md:text-xs lg:text-xl font-bold text-tertiary'>
                      Menciones
                    </h3>
                    
                    {/* Lista de hashtags */}
                    <div className='flex flex-col gap-1'>
                      <span className='text-gray-600 text-base md:text-lg font-medium'>
                        #Mentiras
                      </span>
                      <span className='text-gray-600 text-base md:text-lg font-medium'>
                        #Corrupcion
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Redes