import React, {useContext} from "react";
import { Card, HeatmapComponent } from "../../components";
import { GeoJSONMap } from "../../components/GeoJSONMap";
import { LineChart2 } from "../../components/LineChart2";
import { InformacionContext } from "../../utils/InformacionContext";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const SummaryTab = () => {
    const { weeklyReportGeneral, setWeeklyReportGeneral } = useContext(InformacionContext);
    console.log("Weekly Report General:", weeklyReportGeneral);

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
        <div className="flex flex-col gap-3 lg:gap-2 w-full">
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-2 w-full'>
                <div className='w-full lg:w-[60%]'>
                    <Card title='Mapa de Calor por sección con resultados históricos'>
                        <HeatmapComponent data={heatmapData} />
                    </Card>
                </div>
                <div className='flex flex-col gap-3 lg:gap-2 w-full lg:w-[40%]'>
                    <Card title='Estructura territorial de rivales'>
                        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 w-full items-center">
                            <div className="flex flex-row lg:flex-col gap-4 lg:gap-4 justify-center lg:justify-start">
                                <div className='flex gap-2'>
                                    <div className='w-6 h-4 lg:w-8 lg:h-6 bg-[#23c054]'></div>
                                    <p className="text-xs lg:text-sm">Morena</p>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='w-6 h-4 lg:w-8 lg:h-6 bg-[#c32222]'></div>
                                    <p className="text-xs lg:text-sm">MC</p>
                                </div>
                            </div>
                            <GeoJSONMap />
                        </div>
                    </Card>
                    <Card title='Participación histórica vs actual'>
                        <LineChart2 participacion={participacion} />
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[25%_25%_50%] gap-3 lg:gap-2 w-full pb-4 lg:pb-6">
                <Card title='Intención de voto actual'>
                    <div className="flex w-full h-full justify-between gap-2 lg:gap-4 p-2 lg:p-0 min-h-[140px]">
                        {intention.map(bar => (
                            <div key={bar.partido} className="flex flex-col h-full w-full gap-1 lg:gap-2 justify-end group relative">
                                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-black/75 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 duration-200 whitespace-nowrap z-10">
                                    <b>{bar.partido}:</b> {bar.porcentaje}%
                                </span>
                                <div className={`${bar.color} rounded-t-sm w-full`} style={{ height: `${Math.max(bar.porcentaje * 1.8, 20)}%`, minHeight: '20px' }}></div>
                                <span className="text-xs lg:text-sm text-center font-medium mt-1">
                                    {bar.partido}
                                </span>
                                <span className="text-xs text-center text-gray-500">
                                    {bar.porcentaje}%
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card title='Detección de apatía electoral'>
                    <div className='w-full h-full flex flex-col justify-center items-center lg:items-start p-4 lg:p-2'>
                        <div className='flex items-end justify-center lg:justify-start'>
                            <ImArrowUp className={`text-tertiary w-6 h-6 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 ${apatia.tipoCambio === 'incremento' ? 'rotate-180' : ''}`} />
                            <h1 className='text-gray-400 font-bold text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-[70px]'>
                                {apatia.porcentaje}%
                            </h1>
                        </div>
                    </div>
                </Card>
                <Card title='Aceptación MC vs Morena'>
                    <div className="flex flex-row lg:flex-row gap-4 lg:gap-8 h-full w-full">
                        <div className='flex flex-col gap-2 lg:gap-2 h-full w-full text-gray-800'>
                            {mcVsMorena.map(partido => (
                                <div key={partido.nombre} className='flex items-center gap-2 lg:gap-4 w-full'>
                                    <div className={`w-6 h-8 lg:w-12 lg:h-full rounded-xs ${partido.color} flex-shrink-0`}></div>
                                    <div className="flex gap-3 lg:gap-6 flex-1">
                                        <div className="flex flex-col items-center gap-1 lg:gap-2">
                                            <b className="text-sm lg:text-3xl font-medium">{partido.favor}%</b>
                                            <span className="text-xs lg:text-[10px]">A FAVOR</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 lg:gap-2">
                                            <b className="text-sm lg:text-3xl font-medium">{partido.contra}%</b>
                                            <span className="text-xs lg:text-[10px]">EN CONTRA</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-1 lg:gap-2">
                                            <b className="text-sm lg:text-3xl font-medium">{partido.neutral}%</b>
                                            <span className="text-xs lg:text-[10px]">NEUTRAL</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2 lg:gap-4 items-end justify-center lg:justify-start h-16 lg:h-auto">
                            {mcVsMorena.map(partido => (
                                <div key={partido.nombre} className='flex flex-col items-center gap-1'>
                                    <div className={`w-6 lg:w-12 rounded-xs ${partido.color}`} style={{ height: `${Math.max(partido.favor * 0.8, 10)}px` }}></div>
                                    <span className="text-xs">{partido.nombre}</span>
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