import React, { useEffect } from "react";
import { Card } from "../../components";
import { HeatmapComponent } from "../../components";
import { LineChart2 } from "../../components/LineChart2";
import { FaChevronLeft, FaChevronRight, FaXTwitter, FaUsers } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaGoogle, FaMapMarkedAlt, FaLongArrowAltUp } from 'react-icons/fa';

const DefaultTab = ({ tab }) => {
    const platformsConfig = {
        facebook: {
            icon: FaFacebookF,
            bgColor: '#1877F2',
            name: 'Facebook'
        },
        instagram: {
            icon: FaInstagram,
            bgColor: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)',
            solidColor: '#E4405F',
            name: 'Instagram'
        },
        x: {
            icon: FaXTwitter,
            bgColor: '#000000',
            name: 'X (Twitter)'
        },
        twitter: { // Por si mandan "twitter" en lugar de "x"
            icon: FaXTwitter,
            bgColor: '#000000',
            name: 'X (Twitter)'
        },
        tiktok: {
            icon: FaTiktok,
            bgColor: '#000000',
            name: 'TikTok'
        },
        whatsapp: {
            icon: FaWhatsapp,
            bgColor: '#25D366',
            name: 'WhatsApp'
        },
        google: {
            icon: FaGoogle,
            bgColor: '#4285F4',
            name: 'Google'
        },
        'google maps': {
            icon: FaMapMarkedAlt,
            bgColor: '#EA4335',
            name: 'Google Maps'
        },
        googlemaps: { // Por si viene sin espacio
            icon: FaMapMarkedAlt,
            bgColor: '#EA4335',
            name: 'Google Maps'
        },
        youtube: {
            icon: FaYoutube,
            bgColor: '#FF0000',
            name: 'YouTube'
        }
    };

    useEffect(() => {
        console.log(tab);
    }, [tab])

    const socialMediaIcon = (platform) => {
        const config = platformsConfig[platform];
        if (!config) return null;

        const IconComponent = config.icon;

        return (
            <div
                className="group cursor-pointer transition-transform hover:scale-110"
                title={config.name}
            >
                <div
                className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                    background: config.bgColor,
                    backgroundColor: config.solidColor || config.bgColor
                }}
                >
                <IconComponent 
                    className="text-white text-sm lg:text-lg xl:text-xl"
                />
                </div>
            </div>
        )
    }

    return tab ? (
        <div className="flex flex-col gap-2 w-full">
            <div className='flex flex-col lg:flex-row gap-2 w-full'>
                <div className='w-full lg:w-[60%]'>
                    <Card title='Publicación más popular de esta semana'>
                        <div className="flex flex-col gap-2 lg:gap-4 w-full">
                            {/* <div className="w-full h-48 lg:h-[350px] bg-gray-200 rounded-xl"></div>
                             */}
                            <div dangerouslySetInnerHTML={{ __html: tab.publicacion_destacada }} />
                            <div className="grid grid-cols-2 lg:flex lg:justify-around gap-2 lg:gap-4 w-full">
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    {socialMediaIcon('instagram')}
                                    <span className="text-xs lg:text-base">Red Social</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-lg lg:text-3xl font-bold">{tab.visualizaciones_publicacion}</h2>
                                    <span className="text-xs lg:text-base">Visualizaciones</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-lg lg:text-3xl font-bold">{tab.alcance_publicacion}</h2>
                                    <span className="text-xs lg:text-base">Alcance</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-lg lg:text-3xl font-bold">{tab.interacciones_publicacion}</h2>
                                    <span className="text-xs lg:text-base">Interacciones</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='flex flex-col gap-2 w-full lg:w-[60%]'>
                    <Card title='Candidato destacado semanal'>
                        <div className="flex flex-col gap-1 lg:gap-2 w-full">
                            <div className="flex gap-2 items-center">
                                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 rounded-full"></div>
                                <span className="text-sm lg:text-base">{tab.candidato_destacado_nombre}</span>
                            </div>
                            <div className="flex gap-1 lg:gap-2 items-center">
                                <span className="text-xs lg:text-base">Redes sociales</span>
                                {tab.candidato_destacado_facebook && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("facebook")}</a>}
                                {tab.candidato_destacado_instagram && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("instagram")}</a>}
                                {tab.candidato_destacado_twitter && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("twitter")}</a>}
                                {tab.candidato_destacado_youtube && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("youtube")}</a>}
                                {tab.candidato_destacado_whatsapp && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("whatsapp")}</a>}
                                {tab.candidato_destacado_tiktok && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("tiktok")}</a>}
                                {tab.candidato_destacado_linkedin && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer"></a>}
                            </div>
                            <div className="flex gap-2 lg:gap-4">
                                <span className="w-2/5 text-xs lg:text-base">Seguidores nuevos</span>
                                <div className="flex bg-orange-500 w-[35%] h-3 lg:h-4"></div>
                                <span className="font-semibold text-xs lg:text-base">{tab.seguidores_nuevos ? 0 : 1}</span>
                            </div>
                            <div className="flex gap-2 lg:gap-4">
                                <span className="w-2/5 text-xs lg:text-base">Interacciones</span>
                                <div className="flex bg-amber-400 w-[30%] h-3 lg:h-4"></div>
                                <span className="font-semibold text-xs lg:text-base">{tab.interacciones_nuevas ? 0 : 1}</span>
                            </div>
                            <div className="flex gap-2 lg:gap-4">
                                <span className="w-2/5 text-xs lg:text-base">Menciones</span>
                                <div className="flex bg-gray-600 w-[42%] h-3 lg:h-4"></div>
                                <span className="font-semibold text-xs lg:text-base">{tab.menciones_nuevas ? 0 : 1}</span>
                            </div>
                        </div>
                    </Card>
                    <Card title='Porcentaje de aprobación'>
                        <div className='flex flex-col gap-1 lg:gap-2 w-full p-2 lg:p-4'>
                            <div className="grid grid-cols-3 gap-2 lg:gap-8">
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-lg lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_a_favor).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500'>A FAVOR</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-lg lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_en_contra).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500'>EN CONTRA</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-lg lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_neutral).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500'>NEUTRAL</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 lg:gap-2">
                                <h1 className="text-lg lg:text-3xl font-semibold text-orange-500">Temas frecuentes</h1>
                                {tab.temas_frecuentes.map((tema, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span className="text-xs lg:text-base">{tema.tema}</span>
                                        <div className="flex flex-1 bg-orange-600 w-full h-2 lg:h-4" style={{ width: `${tema.menciones}%` }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[25%_25%_50%] gap-2 w-full pb-2 lg:pb-6">
                <Card title='Menciones positivas'>
                    <div className="flex flex-col w-full h-full gap-1 lg:gap-2">
                        <div className="flex items-center justify-center">
                            <FaLongArrowAltUp className={`text-2xl lg:text-[3rem] text-orange-500 ${tab.num_menciones_positivas > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-2xl lg:text-[3rem] text-gray-700 font-bold">{tab.num_menciones_positivas}%</span>
                        </div>
                        {tab.menciones_positivas_mas_usadas.split(',').map((hashtag, index) => (
                            <span key={index} className="text-sm lg:text-xl text-gray-500">{hashtag}</span>
                        ))}
                    </div>
                </Card>
                <Card title='Menciones negativas'>
                    <div className="flex flex-col w-full h-full gap-1 lg:gap-2">
                        <div className="flex items-center justify-center">
                            <FaLongArrowAltUp className={`text-2xl lg:text-[3rem] text-orange-500 ${tab.num_menciones_negativas > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-2xl lg:text-[3rem] text-gray-700 font-bold">{tab.num_menciones_negativas}%</span>
                        </div>
                        {tab.menciones_negativas_mas_usadas.split(',').map((hashtag, index) => (
                            <span key={index} className="text-sm lg:text-xl text-gray-500">{hashtag}</span>
                        ))}
                    </div>
                </Card>
                <Card title='Aceptación Histórico vs Actual'>
                    <LineChart2 participacion={{
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
                    }}/>
                </Card>
            </div>
        </div>
    ) 
    :
    (<div>

    </div>)
}

export { DefaultTab };