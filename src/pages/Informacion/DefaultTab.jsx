import React, { useEffect, useState } from "react";
import { Card } from "../../components";
import { HeatmapComponent } from "../../components";
import { LineChart2 } from "../../components/LineChart2";
import { FaChevronLeft, FaChevronRight, FaXTwitter, FaUsers } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaGoogle, FaMapMarkedAlt, FaLongArrowAltUp } from 'react-icons/fa';

const DefaultTab = ({ tab }) => {
    const [selectedWeek, setSelectedWeek] = useState(0);
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
    }, [tab]);

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
        <div className="flex flex-col gap-3 lg:gap-2 w-full">
            {/* Primera fila - Publicación más popular y Candidato destacado */}
            <div className='flex flex-col lg:flex-row gap-3 lg:gap-2 w-full'>
                {/* Publicación más popular */}
                <div className='w-full lg:w-[60%]'>
                    <Card title='Publicación más popular de esta semana'>
                        <div className="flex flex-col gap-3 lg:gap-4 w-full">
                            {/* Contenido HTML de la publicación */}
                            <div 
                                className="text-sm lg:text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: tab.publicacion_destacada }} 
                            />
                            
                            {/* Métricas de la publicación - Mejorado para móvil */}
                            <div className="grid grid-cols-2 lg:flex lg:justify-around gap-3 lg:gap-4 w-full">
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    {socialMediaIcon('instagram')}
                                    <span className="text-xs lg:text-base text-center">Red Social</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-base lg:text-3xl font-bold text-center">{tab.visualizaciones_publicacion}</h2>
                                    <span className="text-xs lg:text-base text-center">Visualizaciones</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-base lg:text-3xl font-bold text-center">{tab.alcance_publicacion}</h2>
                                    <span className="text-xs lg:text-base text-center">Alcance</span>
                                </div>
                                <div className="flex flex-col gap-1 lg:gap-2 items-center">
                                    <h2 className="text-gray-700 text-base lg:text-3xl font-bold text-center">{tab.interacciones_publicacion}</h2>
                                    <span className="text-xs lg:text-base text-center">Interacciones</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Candidato destacado y Porcentaje de aprobación */}
                <div className='flex flex-col gap-3 lg:gap-2 w-full lg:w-[40%]'>
                    <Card title='Candidato destacado semanal'>
                        <div className="flex flex-col gap-2 lg:gap-2 w-full">
                            {/* Info del candidato */}
                            <div className="flex gap-2 items-center">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-center bg-no-repeat bg-contain rounded-full flex-shrink-0" style={{ backgroundImage: `url(${tab.candidato_destacado_picture})` }}></div>
                                <span className="text-sm lg:text-base font-medium">{tab.candidato_destacado_nombre}</span>
                            </div>
                            
                            {/* Redes sociales - Mejorado para móvil */}
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs lg:text-base text-gray-600 w-full sm:w-auto">Redes sociales:</span>
                                <div className="flex gap-2 flex-wrap">
                                    {tab.candidato_destacado_facebook && <a href={tab.candidato_destacado_facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("facebook")}</a>}
                                    {tab.candidato_destacado_instagram && <a href={tab.candidato_destacado_instagram} target="_blank" rel="noopener noreferrer">{socialMediaIcon("instagram")}</a>}
                                    {tab.candidato_destacado_twitter && <a href={tab.candidato_destacado_twitter} target="_blank" rel="noopener noreferrer">{socialMediaIcon("twitter")}</a>}
                                    {tab.candidato_destacado_youtube && <a href={tab.candidato_destacado_youtube} target="_blank" rel="noopener noreferrer">{socialMediaIcon("youtube")}</a>}
                                    {tab.candidato_destacado_whatsapp && <a href={tab.candidato_destacado_whatsapp} target="_blank" rel="noopener noreferrer">{socialMediaIcon("whatsapp")}</a>}
                                    {tab.candidato_destacado_tiktok && <a href={tab.candidato_destacado_tiktok} target="_blank" rel="noopener noreferrer">{socialMediaIcon("tiktok")}</a>}
                                </div>
                            </div>
                            
                            {/* Barras de progreso - Mejorado para móvil */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 lg:gap-4">
                                    <span className="w-24 sm:w-28 lg:w-2/5 text-xs lg:text-base text-gray-600 flex-shrink-0">Seguidores nuevos</span>
                                    <div className="flex bg-orange-500 h-2 lg:h-4 flex-1 max-w-20 lg:max-w-none rounded"></div>
                                    <span className="font-semibold text-xs lg:text-base w-8 text-right">{tab.seguidores_nuevos || 0}</span>
                                </div>
                                <div className="flex items-center gap-2 lg:gap-4">
                                    <span className="w-24 sm:w-28 lg:w-2/5 text-xs lg:text-base text-gray-600 flex-shrink-0">Interacciones</span>
                                    <div className="flex bg-amber-400 h-2 lg:h-4 flex-1 max-w-16 lg:max-w-none rounded"></div>
                                    <span className="font-semibold text-xs lg:text-base w-8 text-right">{tab.interacciones_nuevas || 0}</span>
                                </div>
                                <div className="flex items-center gap-2 lg:gap-4">
                                    <span className="w-24 sm:w-28 lg:w-2/5 text-xs lg:text-base text-gray-600 flex-shrink-0">Menciones</span>
                                    <div className="flex bg-gray-600 h-2 lg:h-4 flex-1 max-w-24 lg:max-w-none rounded"></div>
                                    <span className="font-semibold text-xs lg:text-base w-8 text-right">{tab.menciones_nuevas || 0}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    <Card title='Porcentaje de aprobación'>
                        <div className='flex flex-col gap-3 lg:gap-2 w-full p-2 lg:p-4'>
                            {/* Círculos de aprobación - Responsivo */}
                            <div className="grid grid-cols-3 gap-2 lg:gap-8 justify-items-center">
                                <div className='flex items-center justify-center bg-orange-500 w-16 h-16 sm:w-20 sm:h-20 lg:w-3/4 lg:aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full h-full lg:aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-sm sm:text-base lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_a_favor).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500 text-center'>A FAVOR</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-16 h-16 sm:w-20 sm:h-20 lg:w-3/4 lg:aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full h-full lg:aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-sm sm:text-base lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_en_contra).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500 text-center'>EN CONTRA</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-16 h-16 sm:w-20 sm:h-20 lg:w-3/4 lg:aspect-square rounded-full p-1 lg:p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full h-full lg:aspect-square rounded-full p-1 lg:p-2'>
                                        <span className='text-sm sm:text-base lg:text-3xl text-gray-700 font-bold'>{parseInt(tab.aprobacion_neutral).toFixed(0) || 0}%</span>
                                        <span className='text-xs lg:text-sm text-gray-500 text-center'>NEUTRAL</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Temas frecuentes */}
                            <div className="flex flex-col gap-2 lg:gap-2">
                                <h1 className="text-base lg:text-3xl font-semibold text-orange-500">Temas frecuentes</h1>
                                <div className="space-y-2">
                                    {tab.temas_frecuentes.map((tema, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <span className="text-xs lg:text-base text-gray-700 flex-shrink-0 min-w-0">{tema.tema}</span>
                                            <div 
                                                className="bg-orange-600 h-2 lg:h-4 rounded flex-1 max-w-20 lg:max-w-none" 
                                                style={{ width: `${Math.min(tema.menciones, 100)}%` }}
                                            ></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            
            {/* Segunda fila - Menciones y Gráfico histórico */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[25%_25%_50%] gap-3 lg:gap-2 w-full pb-4 lg:pb-6">
                <Card title='Menciones positivas'>
                    <div className="flex flex-col w-full h-full gap-2 lg:gap-2 items-center text-center">
                        <div className="flex items-center justify-center gap-1">
                            <FaLongArrowAltUp className={`text-xl lg:text-[3rem] text-orange-500 ${tab.num_menciones_positivas > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-xl lg:text-[3rem] text-gray-700 font-bold">{tab.num_menciones_positivas}%</span>
                        </div>
                        <div className="space-y-1">
                            {tab.menciones_positivas_mas_usadas.split(',').map((hashtag, index) => (
                                <span key={index} className="block text-xs lg:text-xl text-gray-500">{hashtag.trim()}</span>
                            ))}
                        </div>
                    </div>
                </Card>
                
                <Card title='Menciones negativas'>
                    <div className="flex flex-col w-full h-full gap-2 lg:gap-2 items-center text-center">
                        <div className="flex items-center justify-center gap-1">
                            <FaLongArrowAltUp className={`text-xl lg:text-[3rem] text-orange-500 ${tab.num_menciones_negativas > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-xl lg:text-[3rem] text-gray-700 font-bold">{tab.num_menciones_negativas}%</span>
                        </div>
                        <div className="space-y-1">
                            {tab.menciones_negativas_mas_usadas.split(',').map((hashtag, index) => (
                                <span key={index} className="block text-xs lg:text-xl text-gray-500">{hashtag.trim()}</span>
                            ))}
                        </div>
                    </div>
                </Card>
                
                <Card title='Aceptación Histórico vs Actual'>
                    <div className="w-full h-48 sm:h-56 lg:h-auto">
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
                    </div>
                </Card>
            </div>
        </div>
    ) 
    :
    (<div className="flex items-center justify-center h-48 text-gray-500">
        <span>No hay datos disponibles</span>
    </div>)
}

export { DefaultTab };