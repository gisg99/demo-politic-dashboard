import React from 'react';
import { Card, DigitalActivityChart, AvgConnectionTimeChart } from '../../components';

function ComportamientoTab() {

    const municipiosData = [
        { label: "GDL", percentage: 87 },    // Guadalajara
        { label: "ZAP", percentage: 90 },    // Zapopan
        { label: "TLA", percentage: 75 },    // Tlaquepaque
        { label: "TON", percentage: 82 },    // Tonalá
        { label: "ELG", percentage: 38 },    // El Grullo
        { label: "PVR", percentage: 27 },    // Puerto Vallarta
        { label: "LAG", percentage: 70 },    // Lagos de Moreno
        { label: "AME", percentage: 66 },    // Ameca
        { label: "TET", percentage: 58 },    // Tepatitlán de Morelos
        { label: "ATQ", percentage: 80 },    // Atotonilco el Alto
    ];

    const municipiosBgColor = (percentage) => {
        if (percentage < 40) return "bg-[#ffdaba]";
        else if (percentage < 60) return "bg-[#ffa600]";
        else if (percentage < 80) return "bg-[#ff8c00]";
        else return "bg-[#ff6347]";
    };
    const municipiosTextColor = (percentage) =>{
        if (percentage <= 40) return "text-[#8b6914]";
        else return "text-white";
    }

  return (
    <div className='flex flex-col w-full items-center justify-center gap-4'>
        <div className='grid grid-cols-1 w-full'>
            <Card title='⏰ Horarios de Mayor Actividad Digital'>
                <DigitalActivityChart />
            </Card>
        </div>
        <div className='grid grid-cols-2 gap-4 w-full'>
            <Card title='🟠 Tiempo Promedio de Conexión (minutos)'>
                <AvgConnectionTimeChart/>
            </Card>
            <Card title='🔥 Mapa de Calor - Actividad por Municipio'>
                <div className='grid grid-cols-5 w-full h-full gap-2 py-8'>
                    {municipiosData.sort((a, b) => b.percentage - a.percentage).map((mun) =>(
                        <div key={mun.label} className={`flex flex-col justify-center items-center ${municipiosBgColor(mun.percentage)} font-semibold rounded-md ${municipiosTextColor(mun.percentage)} w-full h-full`}>
                            <h1>{mun.label}</h1>
                            <h1>{mun.percentage}%</h1>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
        <div className='grid grid-cols-1 w-full'>
            <Card title='📍 Flujo de Personas (Portales Cautivos)'>
                1
            </Card>
        </div>
    </div>
  )
}

export { ComportamientoTab }