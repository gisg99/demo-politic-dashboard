import React from 'react'
import { Card, Layout, DonutChart2, CircleChart,SocialPlatforms } from '../../components';
import { FaClock } from 'react-icons/fa';

function Segmentacion() {
  // Datos para el gráfico de Edad - colores en tonos grises y amarillos/naranjas
  const edadData = [
    { label: '18-25', value: 12, color: '#E0E0E0' },      // Gris muy claro
    { label: '26-34', value: 18, color: '#BDBDBD' },      // Gris claro
    { label: '34-44', value: 25, color: '#FFC107' },      // Amarillo
    { label: '45-54', value: 20, color: '#FFB74D' },      // Naranja claro
    { label: '55-64', value: 15, color: '#FF9800' },      // Naranja
    { label: '65+', value: 10, color: '#FF6B35' }         // Naranja oscuro
  ];

  // Datos para el gráfico de Género - colores naranjas
  const generoData = [
    { label: 'Masculino', value: 64.6, color: '#FFB74D' },   // Naranja claro
    { label: 'Femenino', value: 35.4, color: '#FF8A65' }     // Naranja medio
  ];
 
  // Datos para Nivel Socioeconómico - CircleChart (como en tu imagen)
  const nivelSocioeconomicoData = [
    { label: 'C', value: 25, color: '#38b6ff' },     // Turquesa
    { label: 'C+', value: 48, color: '#ffbd59' },    // Naranja
    { label: 'D+', value: 27, color: '#1800ad' }     // Índigo
  ];
  
  const intereses = [
    {label: 'Educación', count: 90},
    {label: 'Deportes', count: 70},
    {label: 'M. Ambiente', count: 80},
    {label: 'Cultura', count: 60},
  ];
  
  const Hashtags = [
    "#seguridadciudadana",
    "#saludpublica",
    "#climagdl",
    "#noticiasgdl",
    "#movimientociudadano",
    "#educacion"
  ];

  // AQUÍ ESTÁN LAS 3 PLATAFORMAS MÁS USADAS
  // Puedes cambiar estos valores según lo que recibas del backend
  const plataformasMasUsadas = ['facebook', 'instagram', 'x'];
  // Ejemplos de otras combinaciones:
//   const plataformasMasUsadas = ['youtube', 'whatsapp', 'tiktok'];
//   const plataformasMasUsadas = ['google', 'google maps', 'facebook'];
  
  // Datos adicionales para la segunda columna
  const dispositivosData = [
    { label: '1', value: 20, color: '#acb8c0' },
    { label: '1', value: 35, color: '#ffcd94' },
    { label: '1', value: 25, color: '#ffbd59' },
    { label: '1', value: 20, color: '#ff8200' }, 
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

  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-4 px-6'>
        {/* Header */}
        <div className='w-full flex justify-end items-center mb-4'>
          <h2 className='bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-sm'>
            Descargar
          </h2>
        </div>
        
        <div className='flex flex-col w-full gap-3'> 
          {/* Primera fila */}
          <div className='flex gap-2 w-full mb-7'>
            <div className='w-[50%]'>
              <Card title="Demográficos">
                <div className='w-full h-full justify-start items-start flex flex-col gap-4 py-2'>
                  <DonutChart2 
                    title="Edad"
                    data={edadData}
                    type="default"
                  />
                  <DonutChart2 
                    title="Género"
                    data={generoData}
                    type="gender"
                  />
                </div>
              </Card>
            </div>
            <div className='w-[50%] flex flex-col gap-3'>
              <Card title="Nivel Socioeconomico">
                <div className='w-full h-full flex flex-col gap-4 py-2'>
                  <CircleChart 
                    title=""
                    data={nivelSocioeconomicoData}
                    showLegend={true}
                    legendPosition="left"
                    size="medium"
                  />
                </div>
              </Card>
              <Card title="Intereses">
                <div className='w-full h-full flex flex-col justify-around py-1'>
                  {intereses.map((tema, index) => (
                    <div key={index} className='w-full flex flex-col'>
                      <div className='flex group gap-2 w-full items-center justify-between px-3'>
                        <h1 className='text-gray-500 text-lg'>{tema.label}</h1>
                        <div className='w-[60%] h-2 rounded-2xl' style={{ background: getColor(index, tema.count)}}>
                          <div className='text-gray-400 text-lg font-semibold w-min relative -top-3 -left-13 px-2 rounded-lg group-hover:block'>
                            {tema.count}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h1 className='text-[1.3rem] xl:text-[1.8rem] text-tertiary font-bold mt-3'>
                    Hashtags Frecuentes
                  </h1>
                  <div className="flex flex-wrap gap-1">
                    {Hashtags.map((tag, index) => (
                      <span key={index} className="text-sm text-gray-700">{tag},</span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Segunda fila */}
          <div className='flex gap-2 w-full mb-7'>
            <div className='w-[50%]'>
              <Card title="Horarios de mayor actividad">
                <div className='w-full h-full flex flex-col justify-around py-4'>
                  <div className='flex items-center gap-3'>
                    <h1 className='text-gray-500 font-semibold text-4xl lg:text-5xl xl:text-6xl'>
                      5:00 a 8:00pm
                    </h1>
                  </div>
                  
                  {/* Componente de Plataformas más usadas */}
                  <div className='mt-6'>
                    <SocialPlatforms platforms={plataformasMasUsadas} />
                  </div>
                </div>
              </Card>
            </div>
            {/* <div className='w-[50%]'>
              <Card title="Comportamiento de navegación">
                <div className='w-full h-full flex flex-col justify-center'>
                  <CircleChart 
                    title=""
                    data={dispositivosData}
                    showLegend={true}
                    legendPosition="right"
                    size="large"
                  />
                </div>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Segmentacion