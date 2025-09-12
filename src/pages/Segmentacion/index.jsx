// src/pages/Segmentacion/index.jsx
import React, { useContext, useMemo } from 'react'
import { Card, Layout, DonutChart2, CircleChart, SocialPlatforms } from '../../components';
import { RedesContext } from '../../utils/RedesContext';

function Segmentacion() {
  const { weeklyReportGeneral, loading, error, selectedWeek } = useContext(RedesContext);
  const general = weeklyReportGeneral?.[0] ?? null;

  // ===== Hashtags frecuentes desde el back =====
  const hashtags = useMemo(() => {
    const raw = (general?.hashtags_mas_usados ?? general?.hashtags_positivos ?? '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    // formatea con "#"
    return raw.map(tag => tag.startsWith('#') ? tag : `#${tag}`);
  }, [general]);

  // ===== Plataformas más usadas desde el back =====
  const plataformasMasUsadas = useMemo(() => {
    const list = (general?.plataformas_mas_usadas ?? '')
      .split(',')
      .map(p => p.trim().toLowerCase())
      .filter(Boolean);
    // normaliza "twitter" a "x" si tu SocialPlatforms lo espera así
    return list.map(p => (p === 'twitter' ? 'x' : p));
  }, [general]);

  // --- (lo demás de tu componente se queda igual) ---

  // Datos para el gráfico de Edad con porcentajes
  const edadDataRaw = [
    { label: '18-25', value: 12, color: '#E0E0E0' },
    { label: '26-34', value: 18, color: '#BDBDBD' },
    { label: '34-44', value: 25, color: '#FFC107' },
    { label: '45-54', value: 20, color: '#FFB74D' },
    { label: '55-64', value: 15, color: '#FF9800' },
    { label: '65+', value: 10, color: '#FF6B35' }
  ];
  const totalEdad = edadDataRaw.reduce((sum, item) => sum + item.value, 0);
  const edadData = edadDataRaw.map(item => ({
    ...item,
    label: `${item.label} (${Math.round((item.value / totalEdad) * 100)}%)`
  }));

  const generoData = [
    { label: 'Masculino', value: 64.6, color: '#FFB74D' },
    { label: 'Femenino', value: 35.4, color: '#FF8A65' }
  ];

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

  const intereses = [
    {label: 'Educación', count: 90, color: '#FF6B4D'},
    {label: 'Deportes', count: 70, color: '#FFB74D'},
    {label: 'M. Ambiente', count: 80, color: '#FFD54F'},
    {label: 'Cultura', count: 60, color: '#FFAB91'},
  ];

  const nivelSocioeconomicoData = [
    { label: 'C', value: 25, color: '#38b6ff' },
    { label: 'C+', value: 48, color: '#ffbd59' },
    { label: 'D+', value: 27, color: '#1800ad' }
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

  if (loading) {
    return (
      <Layout>
        <div className="p-4 text-gray-600">Cargando datos de semana {selectedWeek}…</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="p-4 text-red-500">No se pudieron cargar los datos: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='flex flex-col w-full min-h-screen items-center py-2 sm:py-4 px-3 sm:px-6 mb-2 sm:mb-4'>
        {/* Header */}
        <div className='w-full flex justify-end items-center mb-3 sm:mb-4'>
          <button className='bg-gray-400 px-3 sm:px-4 py-1 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-xs sm:text-sm lg:text-sm'>
            Descargar
          </button>
        </div>
        
        <div className='flex flex-col w-full gap-3 sm:gap-4 lg:gap-6'> 
          {/* Primera fila - Demográficos y Ocupación */}
          <div className='flex flex-col lg:flex-row gap-3 lg:gap-6 w-full'>
            <div className='w-full lg:w-1/2 lg:flex-shrink-0'>
              <Card title="Demográficos generales">
                <div className='w-full flex flex-col gap-3 sm:gap-4 py-2 min-h-[390px] sm:min-h-[500px] lg:min-h-[480px]'>
                  <div className='flex-1 min-h-[180px] lg:min-h-[200px]'>
                    <DonutChart2 title="Edad" data={edadData} type="default" />
                  </div>
                  <div className='flex-1 min-h-[180px] lg:min-h-[200px]'>
                    <DonutChart2 title="Género" data={generoData} type="gender" />
                  </div>
                </div>
              </Card>
            </div>
            
            <div className='w-full lg:w-1/2 lg:flex-shrink-0'>
              <Card title="Ocupación">
                <div className='w-full flex flex-col justify-center py-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[480px]'>
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
          <div className='flex flex-col lg:flex-row gap-3 lg:gap-6 w-full'>
            <div className='w-full lg:w-1/2 lg:flex-shrink-0'>
              <Card title="Intereses">
                <div className='w-full flex flex-col justify-start py-1 sm:py-3 min-h-[300px] lg:min-h-[400px]'>
                  <div className='flex flex-col gap-2 lg:gap-3 mb-4'>
                    {intereses.map((tema, index) => (
                      <div key={index} className='w-full flex flex-col'>
                        <div className='flex group gap-1 sm:gap-2 w-full items-center justify-between px-1 sm:px-3'>
                          <h1 className='text-gray-500 text-sm sm:text-base lg:text-lg flex-shrink-0'>{tema.label}</h1>
                          <div className='w-[60%] sm:w-[60%] h-2 sm:h-3 rounded-xs' style={{ background: getColor(index, tema.count)}}>
                            <div className='text-gray-400 text-sm sm:text-base lg:text-lg font-semibold w-min relative -top-2 sm:-top-3 -left-8 sm:-left-13 px-1 sm:px-2 rounded-lg group-hover:block'>
                              {tema.count}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Hashtags desde RedesContext */}
                  <div className='mt-auto'>
                    <h1 className='text-sm sm:text-lg lg:text-[1.3rem] xl:text-[1.8rem] text-tertiary font-bold mb-2 sm:mb-3'>
                      Hashtags Frecuentes
                    </h1>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {hashtags.length > 0 ? (
                        hashtags.map((tag, index) => (
                          <span key={index} className="text-xs sm:text-sm lg:text-base xl:text-[1.3rem] text-gray-700">
                            {tag}{index < hashtags.length - 1 ? ',' : ''}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">Sin datos</span>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className='w-full lg:w-1/2 lg:flex-shrink-0'>
              <Card title="Nivel socioeconómico">
                <div className='w-full flex flex-col justify-center py-2 min-h=[300px] lg:min-h-[400px]'>
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
 
          {/* Tercera fila - Horarios/Plataformas */}
          <div className='flex flex-col lg:flex-row gap-3 lg:gap-6 w-full'>
            <div className='w-full lg:w-1/2 lg:flex-shrink-0'>
              <Card title="Horarios de mayor actividad">
                <div className='w-full flex flex-col justify-start items-start py-3 sm:py-4 min-h-[200px] lg:min-h-[250px]'>
                  <h1 className='text-gray-500 font-semibold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-3 sm:mb-4'>
                    5:00 a 8:00 pm
                  </h1>
                  
                  {/* Plataformas más usadas desde RedesContext */}
                  <div className='w-full mt-auto'>
                    {plataformasMasUsadas.length > 0 ? (
                      <SocialPlatforms platforms={plataformasMasUsadas} />
                    ) : (
                      <div className="text-gray-400 text-sm">Sin datos</div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            
            <div className='hidden lg:block w-full lg:w-1/2 lg:flex-shrink-0'>{/* reservado */}</div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Segmentacion
