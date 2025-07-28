import { React, useState } from 'react'
import { Card, AnalisisTab, OpinionTab, ComportamientoTab, PerfilTab } from '../../components';

function oldHome() {
    const [ activeTab, setActiveTab ] = useState('analisis');

    const tabs = [
        { id: "analisis", label: "Análisis Electoral" },
        { id: "opinion", label: "Opinión Pública y Social"},
        { id: "comportamiento", label: "Comportamiento Digital"},
        { id: "perfil", label: "Perfil Demográfico"}
    ];

  return (
    <div className="w-full overflow-x-hidden">
        <div className='flex flex-col w-full max-w-screen overflow-x-hidden items-center justify-start gap-4 p-5'>
            <div className='flex flex-col bg-primary rounded-2xl shadow-md px-4 py-7 w-full justify-center items-center'>
                <h1 className='text-[2.2rem] font-medium text-tertiary'>Electoral Intelligence Dashboard - Jalisco</h1>
                <p className='text-[1rem] text-secondary'>Análisis integral basado en portales cautivos, redes sociales, INEGI y reverse lookup de emails</p>
            </div>
            <div className="flex w-full flex-wrap gap-2">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-md relative ${
                    activeTab === tab.id
                        ? "text-secondary bg-primary"
                        : "text-secondary/50 hover:text-tertiary hover:bg-primary"
                    }`}
                >
                    {tab.label}
                    {/* Barra indicadora */}
                    {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary to-tertiary rounded-sm"></div>
                    )}
                </button>
                ))}
            </div>
            <div className="w-full h-auto">
                {activeTab === "analisis" && <AnalisisTab />}
                {activeTab === "opinion" && <OpinionTab /> }
                {activeTab === "comportamiento" && <ComportamientoTab />}
                {activeTab === "perfil" && <PerfilTab />}

            </div>
        </div>
    </div>
  )
}

export default oldHome;