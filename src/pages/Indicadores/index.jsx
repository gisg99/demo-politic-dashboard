import React, { useState } from 'react'
import { Layout, General, Salud, Seguridad, Educacion, Transporte, Economia, MedioAmbiente } from '../../components'

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

  const renderContent = () => {
    switch (activeTab) {
      case 'general': return <General />
      case 'salud': return <Salud />
      case 'seguridad': return <Seguridad />
      case 'educacion': return <Educacion />
      case 'transporte': return <Transporte />
      case 'economia': return <Economia />
      case 'medioambiente': return <MedioAmbiente />
      default: return null
    }
  }

  return (
    <Layout>
      <div className='flex flex-col w-full min-h-screen items-center py-4 px-6 mb-4'>
        {/* Header */}
        <div className='w-full flex justify-end items-center mb-4'>
          <h2 className='bg-gray-400 px-3 py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary text-xs lg:text-sm'>
            Descargar
          </h2>
        </div>

        {/* Tabs */}
        <div className='w-full flex flex-wrap justify-around items-center gap-2'>
          {tabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`text-sm px-4 py-1 rounded-full font-medium ${
                activeTab === tab.value
                  ? 'bg-tertiary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido del tab activo */}
        <div className='w-full mt-10'>
          {renderContent()}
        </div>
      </div>
    </Layout>
  )
}

export default Indicadores
