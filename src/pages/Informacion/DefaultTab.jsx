import React from "react";
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
                className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                    background: config.bgColor,
                    backgroundColor: config.solidColor || config.bgColor
                }}
                >
                <IconComponent 
                    className="text-white text-lg lg:text-xl"
                />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className='flex gap-2 w-full'>
                <div className='w-[60%]'>
                    <Card title='Publicación más popular de esta semana'>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="w-full h-[350px] bg-gray-200 rounded-xl"></div>
                            <div className="flex justify-around gap-4 w-full">
                                <div className="flex flex-col gap-2 items-center">
                                    {socialMediaIcon(tab.best_post_social_media)}
                                    <span>Red Social</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <h2 className="text-gray-700 text-3xl font-bold">{tab.best_post_vistas}</h2>
                                    <span>Visualizaciones</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <h2 className="text-gray-700 text-3xl font-bold">{tab.best_post_alcance}</h2>
                                    <span>Alcance</span>
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <h2 className="text-gray-700 text-3xl font-bold">{tab.best_post_interacciones}</h2>
                                    <span>Interacciones</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className='flex flex-col gap-2 w-[60%]'>
                    <Card title='Candidato destacado semanal'>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex gap-2 items-center">
                                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                                <span>{tab.candidate_name}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span>Redes sociales</span>
                                {tab.facebook && <a href={tab.facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("facebook")}</a>}
                                {tab.instagram && <a href={tab.instagram} target="_blank" rel="noopener noreferrer">{socialMediaIcon("instagram")}</a>}
                                {tab.twitter && <a href={tab.twitter} target="_blank" rel="noopener noreferrer">{socialMediaIcon("twitter")}</a>}
                                {tab.youtube && <a href={tab.youtube} target="_blank" rel="noopener noreferrer">{socialMediaIcon("youtube")}</a>}
                                {tab.whatsapp && <a href={tab.whatsapp} target="_blank" rel="noopener noreferrer">{socialMediaIcon("whatsapp")}</a>}
                                {tab.tiktok && <a href={tab.tiktok} target="_blank" rel="noopener noreferrer">{socialMediaIcon("tiktok")}</a>}
                                {tab.linkedin && <a href={tab.linkedin} target="_blank" rel="noopener noreferrer"></a>}
                            </div>
                            <div className="flex gap-4">
                                <span className="w-2/5">Seguidores nuevos</span>
                                <div className="flex bg-orange-500 w-[35%]"></div>
                                <span className="font-semibold">{tab.seguidores_nuevos}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-2/5">Interacciones</span>
                                <div className="flex bg-amber-400 w-[30%]"></div>
                                <span className="font-semibold">{tab.interacciones_nuevas}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-2/5">Menciones</span>
                                <div className="flex bg-gray-600 w-[42%]"></div>
                                <span className="font-semibold">{tab.menciones_nuevas}</span>
                            </div>
                        </div>
                    </Card>
                    <Card title='Porcentaje de aprobación'>
                        <div className='flex flex-col gap-2 w-full p-4'>
                            <div className="grid grid-cols-3 gap-8">
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-2'>
                                        <span className='text-3xl text-gray-700 font-bold'>58%</span>
                                        <span className='text-sm text-gray-500'>A FAVOR</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-2'>
                                        <span className='text-3xl text-gray-700 font-bold'>28%</span>
                                        <span className='text-sm text-gray-500'>EN CONTRA</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center bg-orange-500 w-3/4 aspect-square rounded-full p-2'>
                                    <div className='flex flex-col items-center justify-center bg-white w-full aspect-square rounded-full p-2'>
                                        <span className='text-3xl text-gray-700 font-bold'>14%</span>
                                        <span className='text-sm text-gray-500'>NEUTRAL</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h1 className="text-3xl font-semibold text-orange-500">Temas frecuentes</h1>
                                <div className="flex items-center gap-2">
                                    <span>Corrupción</span>
                                    <div className="flex flex-1 bg-orange-600 w-full h-4"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Medio ambiente</span>
                                    <div className="flex flex-1 bg-orange-500 w-full h-4"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Transporte</span>
                                    <div className="flex flex-1 bg-amber-400 w-full h-4"></div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span>Op. Laboral</span>
                                    <div className="flex flex-1 bg-amber-400 w-full h-4"></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-[25%_25%_50%] gap-2 w-full pb-6">
                <Card title='Menciones positivas'>
                    <div className="flex flex-col w-full h-full gap-2">
                        <div className="flex items-center justify-center">
                            <FaLongArrowAltUp className={`text-[3rem] text-orange-500 ${tab.positive_mentions > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-[3rem] text-gray-700 font-bold">{tab.positive_mentions}%</span>
                        </div>
                        {tab.positive_hashtags.map((hashtag, index) => (
                            <span key={index} className="text-xl text-gray-500">{hashtag}</span>
                        ))}
                    </div>
                </Card>
                <Card title='Menciones negativas'>
                    <div className="flex flex-col w-full h-full gap-2">
                        <div className="flex items-center justify-center">
                            <FaLongArrowAltUp className={`text-[3rem] text-orange-500 ${tab.negative_mentions > 0 ? '' : 'rotate-180'}`} />
                            <span className="text-[3rem] text-gray-700 font-bold">{tab.negative_mentions}%</span>
                        </div>
                        {tab.negative_hashtags.map((hashtag, index) => (
                            <span key={index} className="text-xl text-gray-500">{hashtag}</span>
                        ))}
                    </div>
                </Card>
                <Card title='Aceptación Histórico vs Actual'>
                    <LineChart2 participacion={tab.participacion}/>
                </Card>
            </div>
        </div>
    )
}

export { DefaultTab };