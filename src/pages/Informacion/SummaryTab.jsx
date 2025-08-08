import React from "react";
import { Card, HeatmapComponent } from "../../components";
import { GeoJSONMap } from "../../components/GeoJSONMap";
import { LineChart2 } from "../../components/LineChart2";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const SummaryTab = () => {
    const heatmapData = [
        [20.6748, -103.344, "100"],
        [20.6782, -103.340, "85"],
        [20.6711, -103.350, "70"],
        [20.6699, -103.346, "60"],
        [20.6711, -103.350, "70"],
        [20.6699, -103.346, "60"],
        [20.6760, -103.349, "50"],
        [20.6752, -103.341, "45"],
        [20.6730, -103.343, "30"]
    ];

    const intention = [
        {partido: 'MC', color: 'bg-orange-500', porcentaje: 49},
        {partido: 'PRI', color: 'bg-green-500', porcentaje: 32},
        {partido: 'Morena', color: 'bg-red-500', porcentaje: 24},
        {partido: 'PAN', color: 'bg-blue-500', porcentaje: 28},
    ]

    const mcVsMorena = [
        { nombre: 'MC', favor: 58, contra: 28, neutral: 14, color: 'bg-orange-500' },
        { nombre: 'Morena', favor: 42, contra: 48, neutral: 10, color: 'bg-red-500' }
    ]

    const participacion = {
        historico: [
        {ano: 2006, porcentaje: 45},
        {ano: 2007, porcentaje: 58},
        {ano: 2008, porcentaje: 67},
        {ano: 2009, porcentaje: 64},
        {ano: 2010, porcentaje: 81},
        ],
        actual: [
        {ano: 2006, porcentaje: 48},
        {ano: 2007, porcentaje: 55},
        {ano: 2008, porcentaje: 71},
        {ano: 2009, porcentaje: 66},
        {ano: 2010, porcentaje: 59},
        ]
    };

    const apatia = {tipoCambio: 'incremento', porcentaje: 15}

    return (
        <div className="flex flex-col gap-2">
            <div className='flex gap-2 w-full'>
            <div className='w-[60%]'>
                <Card title='Mapa de Calor por sección con resultados históricos'>
                    <HeatmapComponent data={heatmapData} />
                </Card>
            </div>
            <div className='flex flex-col gap-2 w-[60%]'>
                <Card title='Estructura territorial de rivales'>
                    <div className="flex gap-4 w-full items-center">
                        <div className="flex flex-col gap-4">
                            <div className='flex gap-2'>
                                <div className='w-8 h-6 bg-[#23c054]'></div>
                                <p className="text-sm">Morena</p>
                            </div>
                            <div className='flex gap-2'>
                                <div className='w-8 h-6 bg-[#c32222]'></div>
                                <p className="text-sm">MC</p>
                            </div>
                        </div>
                        <GeoJSONMap />
                    </div>
                </Card>
                <Card title='Estructura territorial de rivales'>
                    <LineChart2 participacion={participacion} />
                </Card>
            </div>
            </div>
            <div className="grid grid-cols-[25%_25%_50%] gap-2 w-full pb-6">
            <Card title='Intención de voto actual'>
                <div className="flex w-full h-full justify-between gap-4">
                    {intention.map(bar => (
                        <div key={bar.partido} className="flex flex-col h-full w-full gap-2 justify-end group">
                            <span className="absolute text-xs bg-black/75 text-white px-2 py-1 opacity-0 group-hover:opacity-100 duration-100"><b>{bar.partido}:</b> {bar.porcentaje}%</span>
                            <div className={`${bar.color} p-2 rounded-sm w-full`} style={{ height: `${bar.porcentaje * 2}%` }}>
                                {/* <p className="text-sm">{bar.partido}: {bar.porcentaje}%</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <Card title='Detección de apatía electoral'>
                <div className='w-[50%] h-full flex flex-col justify-center p-2'>
                    <div className='flex items-end'>
                        <ImArrowUp className={`text-tertiary w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 ${apatia.tipoCambio === 'incremento' ? 'rotate-180' : ''}`} />
                        <h1 className='text-gray-400 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[70px]'>
                            {apatia.porcentaje}%
                        </h1>
                    </div>
                </div>
            </Card>
            <Card title='Aceptación MC vs Morena'>
                <div className="flex gap-8 h-full w-full">
                    <div className='flex flex-col gap-2 h-full w-full text-gray-800'>
                        {mcVsMorena.map(partido => (
                            <div key={partido.nombre} className='flex gap-4 w-full h-full'>
                            <div className={`w-12 rounded-xs h-full ${partido.color}`}></div>
                            <div className="flex flex-col items-center gap-2">
                                <b className="text-3xl font-medium">{partido.favor}%</b>
                                <span className="text-[10px]">A FAVOR</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <b className="text-3xl font-medium">{partido.contra}%</b>
                                <span className="text-[10px]">EN CONTRA</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <b className="text-3xl font-medium">{partido.neutral}%</b>
                                <span className="text-[10px]">NEUTRAL</span>
                            </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 items-end justify-center">
                        {mcVsMorena.map(partido => (
                            <div key={partido.nombre} className='flex gap-4 w-full h-full items-end'>
                                <div className={`w-12 rounded-xs ${partido.color}`} style={{ height: `${partido.favor * 1.7}%` }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            </div>
        </div>
    )
}

export { SummaryTab };