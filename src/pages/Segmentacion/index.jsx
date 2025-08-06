import React from 'react'
import { Card, Layout, DonutChart2, CircleChart, SocialPlatforms } from '../../components';

function Segmentacion() {
  // Datos para el gráfico de Edad
  const edadData = [
    { label: '18-25', value: 12, color: '#E0E0E0' },      // Gris muy claro
    { label: '26-34', value: 18, color: '#BDBDBD' },      // Gris claro
    { label: '34-44', value: 25, color: '#FFC107' },      // Amarillo
    { label: '45-54', value: 20, color: '#FFB74D' },      // Naranja claro
    { label: '55-64', value: 15, color: '#FF9800' },      // Naranja
    { label: '65+', value: 10, color: '#FF6B35' }         // Naranja oscuro
  ];

  // Datos para el gráfico de Género
  const generoData = [
    { label: 'Masculino', value: 64.6, color: '#FFB74D' },   // Naranja claro
    { label: 'Femenino', value: 35.4, color: '#FF8A65' }     // Naranja medio
  ];

  // Datos para Ocupación
  const ocupacionData = [
    { label: 'Agropecuario', value: 5, color: '#9E9E9E' },
    { label: 'Artesano', value: 8, color: '#757575' },
    { label: 'Comercio', value: 15, color: '#616161' },
    { label: 'Construcción', value: 10, color: '#424242' },
    { label: 'Electricista', value: 7, color: '#FFC107' },
    { label: 'Tecnología de la inf', value: 12, color: '#FFD54F' },
    { label: 'Energía Eléctrica', value: 6, color: '#FFE082' },
    { label: 'Industria', value: 10, color: '#FFAB91' },
    { label: 'Minería', value: 3, color: '#FF8A65' },
    { label: 'Servicios', value: 18, color: '#FF7043' },
    { label: 'Protección Ciudadana', value: 6, color: '#FF5722' }
  ];
  
  // Datos de intereses
  const intereses = [
    {label: 'Educación', count: 90, color: '#FF6B4D'},
    {label: 'Deportes', count: 70, color: '#FFB74D'},
    {label: 'M. Ambiente', count: 80, color: '#FFD54F'},
    {label: 'Cultura', count: 60, color: '#FFAB91'},
  ];
  
  // Hashtags frecuentes
  const Hashtags = [
    "#seguridadciudadana",
    "#saludpublica", 
    "#climagdl",
    "#noticiasgdl",
    "#movimientociudadano",
    "#educacion"
  ];

  // Datos para Nivel Socioeconómico
  const nivelSocioeconomicoData = [
    { label: 'C', value: 25, color: '#38b6ff' },     // Azul
    { label: 'C+', value: 48, color: '#ffbd59' },    // Naranja
    { label: 'D+', value: 27, color: '#1800ad' }     // Azul oscuro
  ];

  // Plataformas más usadas
  const plataformasMasUsadas = ['facebook', 'instagram', 'x'];

  // Datos de comportamiento de navegación
  const comportamientoData = [
    { label: 'Sitios web más visitados', value: 45, color: '#FFB74D' },
    { label: 'Búsquedas frecuentes', value: 30, color: '#BDBDBD' },
    { label: 'Compras online', value: 15, color: '#9E9E9E' },
    { label: 'Otros', value: 10, color: '#757575' }
  ];

  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-4 px-6'>
        {/* Header */}
        <div className='w-full flex justify-between items-center mb-4'>
          <h1 className='text-gray-400 font-bold uppercase text-sm lg:text-base'>
            Segmentación de Audiencia
          </h1>
          <h2 className='bg-[#acb8bf] px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-sm'>
            Descargar
          </h2>
        </div>
        
        <div className='flex flex-col w-full gap-4'> 
          {/* Primera fila - Demográficos y Ocupación */}
          <div className='flex gap-3 w-full'>
            <div className='w-[50%]'>
              <Card title="Demográficos generales">
                <div className='w-full h-full flex flex-col gap-4 py-2'>
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
            
            <div className='w-[50%]'>
              <Card title="Ocupación">
                <div className='w-full h-full flex flex-col justify-center py-2'>
                  <CircleChart 
                    title="Sector productivo"
                    data={ocupacionData}
                    showLegend={true}
                    legendPosition="right"
                    size="large"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Segunda fila - Intereses y Nivel Socioeconómico */}
          <div className='flex gap-3 w-full'>
            <div className='w-[50%]'>
              <Card title="Intereses">
                <div className='w-full h-full flex flex-col py-2'>
                  {/* Barras de intereses */}
                  <div className='flex flex-col gap-3 mb-4'>
                    {intereses.map((tema, index) => (
                      <div key={index} className='w-full'>
                        <div className='flex items-center justify-between mb-1'>
                          <span className='text-gray-600 text-sm lg:text-base font-medium'>
                            {tema.label}
                          </span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <div className='w-[80%] h-3 rounded-full overflow-hidden bg-gray-200'>
                            <div 
                              className='h-full rounded-full transition-all duration-300'
                              style={{ 
                                width: `${tema.count}%`,
                                backgroundColor: tema.color
                              }}
                            />
                          </div>
                          <span className='text-gray-500 text-sm font-semibold'>
                            {tema.count}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hashtags frecuentes */}
                  <div className='mt-auto pt-4 border-t border-gray-200'>
                    <h3 className='text-base lg:text-lg text-tertiary font-bold mb-2'>
                      Hashtags Frecuentes
                    </h3>
                    <div className="flex flex-wrap gap-x-2 gap-y-1">
                      {Hashtags.map((tag, index) => (
                        <span key={index} className="text-xs lg:text-sm text-gray-600">
                          {tag}{index < Hashtags.length - 1 && ','}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className='w-[50%]'>
              <Card title="Nivel socioeconómico">
                <div className='w-full h-full flex flex-col justify-center py-2'>
                  <CircleChart 
                    title=""
                    data={nivelSocioeconomicoData}
                    showLegend={true}
                    legendPosition="left"
                    size="large"
                  />
                </div>
              </Card>
            </div>
          </div>

          {/* Tercera fila - Horarios/Plataformas y Comportamiento */}
          <div className='flex gap-3 w-full'>
            <div className='w-[50%]'>
              <Card title="Horarios de mayor actividad">
                <div className='w-full h-full flex flex-col justify-center items-center py-4'>
                  <h1 className='text-gray-500 font-bold text-3xl lg:text-4xl xl:text-5xl mb-2'>
                    5:00 a 8:00 pm
                  </h1>
                  
                  {/* Plataformas más usadas */}
                  <div className='mt-6'>
                    <SocialPlatforms platforms={plataformasMasUsadas} />
                  </div>
                </div>
              </Card>
            </div>
            
            <div className='w-[50%]'>
              <Card title="Comportamiento de navegación">
                <div className='w-full h-full flex flex-col justify-center py-2'>
                  <p className='text-sm text-gray-600 mb-4'>
                    (Sitios web más visitados)
                  </p>
                  <CircleChart 
                    title=""
                    data={comportamientoData}
                    showLegend={true}
                    legendPosition="right"
                    size="medium"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Segmentacion