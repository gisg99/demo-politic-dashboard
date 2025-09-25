import React, { useContext, useState } from 'react'
import { Layout, General, Salud, Seguridad, Educacion, Transporte, Economia, MedioAmbiente } from '../../components'
import { InformacionContext } from '../../utils/InformacionContext'
import { IndicadoresContext } from '../../utils/IndicadoresContext'

const tabs = [
  { label: 'GENERAL', value: 'general' },
  { label: 'SALUD', value: 'salud' },
  { label: 'SEGURIDAD', value: 'seguridad' },
  { label: 'EDUCACIÓN', value: 'educacion' },
  { label: 'TRANSPORTE', value: 'transporte' },
  { label: 'ECONOMÍA', value: 'economia' },
  { label: 'MEDIO AMBIENTE', value: 'medioambiente' },
]

function Indicadores() {
  const [activeTab, setActiveTab] = useState('general')
  const { percepcion } = useContext(InformacionContext) || {}
  const { edades, loadingEdades, errorEdades } = useContext(IndicadoresContext) || {}

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <General
            data={percepcion?.filter(p => p.tema === 'General') || []}
            edades={edades}
            loadingEdades={loadingEdades}
            errorEdades={errorEdades}
          />
        )
      case 'salud':         return <Salud        data={percepcion?.filter(p => p.tema === 'Salud') || []} />
      case 'seguridad':     return <Seguridad    data={percepcion?.filter(p => p.tema === 'Seguridad') || []} />
      case 'educacion':     return <Educacion    data={percepcion?.filter(p => p.tema === 'Educacion') || []} />
      case 'transporte':    return <Transporte   data={percepcion?.filter(p => p.tema === 'Transporte') || []} />
      case 'economia':      return <Economia     data={percepcion?.filter(p => p.tema === 'Economia') || []} />
      case 'medioambiente': return <MedioAmbiente data={percepcion?.filter(p => p.tema === 'Medio Ambiente') || []} />
      default: return null
    }
  }

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen items-center py-2 sm:py-4 px-3 sm:px-6 mb-2 sm:mb-4">
        {/* Header */}
        <div className="w-full flex justify-end items-center mb-3 sm:mb-4">
          <button className="bg-gray-400 px-3 sm:px-4 py-1 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-xs sm:text-sm lg:text-sm">
            Descargar
          </button>
        </div>

        {/* Tabs */}
        <div className="w-full mb-6 sm:mb-8 md:mb-10">
          {/* Móvil */}
          <div className="block sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium text-sm"
            >
              {tabs.map(tab => (
                <option key={tab.value} value={tab.value}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tablet/Desktop */}
          <div className="hidden sm:block">
            <div className="w-full overflow-x-auto custom-scrollbar">
              <div className="flex justify-center sm:justify-start lg:justify-center items-center gap-1 sm:gap-2 md:gap-3 min-w-max px-2">
                {tabs.map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      activeTab === tab.value
                        ? 'bg-tertiary text-white shadow-md scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="w-full flex-1">
          <div className="animate-fadeIn">
            {renderContent()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Indicadores
