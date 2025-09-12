import React, { useEffect, useContext } from "react";
// import { weeklyReportCandidato } from "./weeklyReportCandidatoData";
import { FaChevronLeft, FaChevronRight, FaXTwitter, FaUsers } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube, FaGoogle, FaMapMarkedAlt, FaLongArrowAltUp } from 'react-icons/fa';
import { BiSolidLike } from "react-icons/bi";
import { MdTouchApp } from "react-icons/md";
import { InformacionContext } from "../../utils/InformacionContext";

const Comparator = ({ start }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(start);
    const { weeklyReportCandidato } = useContext(InformacionContext);
    
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
                className="w-4 h-4 lg:w-6 lg:h-6 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: config.bgColor,
                  backgroundColor: config.solidColor || config.bgColor
                }}
              >
                <IconComponent 
                  className="text-white text-xs lg:text-sm xl:text-lg"
                />
              </div>
            </div>
        )
    }
    
    const handleNextIndex = () => {
        setSelectedIndex((prevIndex) => (prevIndex + 1) % weeklyReportCandidato.length);
    }

    const handlePrevIndex = () => {
        setSelectedIndex((prevIndex) => (prevIndex - 1 + weeklyReportCandidato.length) % weeklyReportCandidato.length);
    }

    useEffect(() => {
        if(weeklyReportCandidato === null) return;
        // console.log(weeklyReportCandidato);
    }, [weeklyReportCandidato]);

    return (
        <div className="h-full w-full flex items-center">
            <span onClick={handlePrevIndex} className="p-2 lg:p-3 -mr-3 lg:-mr-5 z-10 text-white bg-gray-300 rounded-full cursor-pointer text-sm lg:text-base"><FaChevronLeft /></span>
            <div className={`flex flex-col gap-2 lg:gap-4 w-full min-h-[50vh] lg:min-h-[70svh] bg-gray-100 p-2 lg:p-4 border-2 border-${weeklyReportCandidato[selectedIndex].color_partido || "gray-300"} rounded-xl lg:rounded-2xl`} style={{ borderColor: weeklyReportCandidato[selectedIndex].color_partido }}>
                <div className="flex gap-2 lg:gap-4 h-full">
                    <div className="flex justify-end items-end h-16 w-16 lg:h-24 lg:w-24 rounded-full border-2 border-gray-300 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${weeklyReportCandidato[selectedIndex].picture})` }}>
                        <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full border-2 border-gray-300 bg-contain bg-center z-10" style={{ backgroundImage: `url(${weeklyReportCandidato[selectedIndex].partido_logo})` }}></div>
                    </div>
                    <div className="flex flex-col h-full justify-between gap-2 lg:gap-4">
                        <h1 className="text-lg lg:text-3xl font-semibold text-orange-500">{weeklyReportCandidato[selectedIndex].nombre_candidato}</h1>
                        <div className="flex gap-1 lg:gap-2 h-full items-end">
                            <span className="text-xs lg:text-sm font-medium">Redes sociales</span>
                            {weeklyReportCandidato[selectedIndex].facebook && <a href={weeklyReportCandidato[selectedIndex].facebook} target="_blank" rel="noopener noreferrer">{socialMediaIcon("facebook")}</a>}
                            {weeklyReportCandidato[selectedIndex].instagram && <a href={weeklyReportCandidato[selectedIndex].instagram} target="_blank" rel="noopener noreferrer">{socialMediaIcon("instagram")}</a>}
                            {weeklyReportCandidato[selectedIndex].twitter && <a href={weeklyReportCandidato[selectedIndex].twitter} target="_blank" rel="noopener noreferrer">{socialMediaIcon("twitter")}</a>}
                            {weeklyReportCandidato[selectedIndex].youtube && <a href={weeklyReportCandidato[selectedIndex].youtube} target="_blank" rel="noopener noreferrer">{socialMediaIcon("youtube")}</a>}
                            {weeklyReportCandidato[selectedIndex].whatsapp && <a href={weeklyReportCandidato[selectedIndex].whatsapp} target="_blank" rel="noopener noreferrer">{socialMediaIcon("whatsapp")}</a>}
                            {weeklyReportCandidato[selectedIndex].tiktok && <a href={weeklyReportCandidato[selectedIndex].tiktok} target="_blank" rel="noopener noreferrer">{socialMediaIcon("tiktok")}</a>}
                            {weeklyReportCandidato[selectedIndex].linkedin && <a href={weeklyReportCandidato[selectedIndex].linkedin} target="_blank" rel="noopener noreferrer"></a>}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 lg:gap-4 h-full">
                    <div className="flex flex-col items-center gap-1 lg:gap-2">
                        <div className="flex gap-1 lg:gap-2 items-center text-gray-600">
                            <FaUsers className="text-xs lg:text-base" />
                            <span className="text-xs lg:text-sm font-medium">Comunidad</span>
                        </div>
                        <div className={`h-20 w-20 lg:h-32 lg:w-32 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-xl`}>{weeklyReportCandidato[selectedIndex].num_seguidores}</div>
                        <div className={`h-8 w-8 lg:h-14 lg:w-14 bg-amber-500 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-md border-2 border-white -mt-6 lg:-mt-10`}><FaLongArrowAltUp className={`text-xs lg:text-base ${weeklyReportCandidato[selectedIndex].aumento_seguidores > 0 ? "" : "rotate-180"}`} />{weeklyReportCandidato[selectedIndex].aumento_seguidores.toFixed(2)}%</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 lg:gap-2">
                        <div className="flex gap-1 lg:gap-2 items-center text-gray-600">
                            <BiSolidLike className="text-xs lg:text-base" />
                            <span className="text-xs lg:text-sm font-medium">Interacciones</span>
                        </div>
                        <div className={`h-20 w-20 lg:h-32 lg:w-32 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-xl`}>{weeklyReportCandidato[selectedIndex].num_interacciones}</div>
                        <div className={`h-8 w-8 lg:h-14 lg:w-14 bg-orange-500 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-md border-2 border-white -mt-6 lg:-mt-10`}><FaLongArrowAltUp className={`text-xs lg:text-base ${weeklyReportCandidato[selectedIndex].aumento_interacciones > 0 ? "" : "rotate-180"}`} />{weeklyReportCandidato[selectedIndex].aumento_interacciones.toFixed(2)}%</div>
                    </div>
                    <div className="flex flex-col items-center gap-1 lg:gap-2">
                        <div className="flex gap-1 lg:gap-2 items-center text-gray-600">
                            <MdTouchApp className="text-xs lg:text-base" />
                            <span className="text-xs lg:text-sm font-medium">Publicaciones</span>
                        </div>
                        <div className={`h-20 w-20 lg:h-32 lg:w-32 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-xl`}>{weeklyReportCandidato[selectedIndex].num_publicaciones}</div>
                        <div className={`h-8 w-8 lg:h-14 lg:w-14 bg-orange-600 rounded-full flex items-center justify-center text-white font-medium text-xs lg:text-md border-2 border-white -mt-6 lg:-mt-10`}><FaLongArrowAltUp className={`text-xs lg:text-base ${weeklyReportCandidato[selectedIndex].aumento_publicaciones > 0 ? "" : "rotate-180"}`} />{weeklyReportCandidato[selectedIndex].aumento_publicaciones.toFixed(2)}%</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 px-2 lg:px-8">
                    <h1 className="text-lg lg:text-2xl font-semibold text-orange-500">Resumen de Redes Sociales del Candidato</h1>
                    <div className="flex gap-2 lg:gap-4">
                        <span className="w-2/5 text-xs lg:text-base">Seguidores nuevos</span>
                        <div className="flex bg-orange-500 w-[35%] h-3 lg:h-4"></div>
                        <span className="font-semibold text-xs lg:text-base">{weeklyReportCandidato[selectedIndex].seguidores_nuevos ? 1 : 0}</span>
                    </div>
                    <div className="flex gap-2 lg:gap-4">
                        <span className="w-2/5 text-xs lg:text-base">Interacciones</span>
                        <div className="flex bg-amber-400 w-[30%] h-3 lg:h-4"></div>
                        <span className="font-semibold text-xs lg:text-base">{weeklyReportCandidato[selectedIndex].interacciones_nuevas ? 1 : 0}</span>
                    </div>
                    <div className="flex gap-2 lg:gap-4">
                        <span className="w-2/5 text-xs lg:text-base">Menciones</span>
                        <div className="flex bg-gray-600 w-[42%] h-3 lg:h-4"></div>
                        <span className="font-semibold text-xs lg:text-base">{weeklyReportCandidato[selectedIndex].menciones_nuevas ? 1 : 0}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:gap-4 px-2 lg:px-8">
                    <h1 className="text-lg lg:text-2xl font-semibold text-orange-500">Demografía</h1>
                    <div className="grid grid-cols-3 gap-2 lg:gap-2">
                        <div className="flex items-center justify-center">
                            <div className={`w-full aspect-square lg:h-32 lg:w-32 bg-amber-500 rounded-full flex flex-col gap-1 lg:gap-2 items-center justify-center text-white font-semibold text-xs lg:text-sm`}>
                                <span>Edad Promedio</span>
                                <b className="text-lg lg:text-3xl font-semibold">{weeklyReportCandidato[selectedIndex].edad_promedio_seguidores}</b>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className={`w-full aspect-square lg:h-32 lg:w-32 bg-orange-500 rounded-full flex flex-col gap-1 lg:gap-2 items-center justify-center text-white font-semibold text-xs lg:text-sm`}>
                                <span>Género</span>
                                <b className="font-semibold text-xs lg:text-sm">H: {weeklyReportCandidato[selectedIndex].porcentaje_genero_hombres}%</b>
                                <b className="font-semibold text-xs lg:text-sm">M: {100 - weeklyReportCandidato[selectedIndex].porcentaje_genero_hombres}%</b>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className={`w-full aspect-square lg:h-32 lg:w-32 bg-orange-600 rounded-full flex flex-col gap-1 lg:gap-2 items-center justify-center text-white font-semibold text-xs lg:text-sm`}>
                                <span className="text-xs">Intención de voto</span>
                                <b className="text-lg lg:text-2xl font-semibold">{weeklyReportCandidato[selectedIndex].porcentaje_intencion_voto}%</b>
                                <div className="flex">
                                    <FaLongArrowAltUp className={`text-lg lg:text-3xl ${weeklyReportCandidato[selectedIndex].aumento_intencion_voto > 0 ? "" : "rotate-180"}`} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-1 lg:gap-2">
                        <h1 className="text-sm lg:text-md font-semibold text-orange-500">Redes Sociales más usadas</h1>
                        {weeklyReportCandidato[selectedIndex].redes_mas_usadas.split(',').map((red, index) => (
                            <span key={index} className="text-sm font-medium text-gray-700">{socialMediaIcon(red.toLowerCase())}</span>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1 lg:gap-2">
                        <h1 className="text-sm lg:text-md font-semibold text-orange-500">Hashtags / Temas de interés</h1>
                        {weeklyReportCandidato[selectedIndex].hashtags_temas_interes.split(',').map(hashtag => (
                            <span key={hashtag} className="text-xs lg:text-sm font-medium text-gray-700">#{hashtag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <span onClick={handleNextIndex} className="p-2 lg:p-3 -ml-3 lg:-ml-5 z-10 text-white bg-gray-300 rounded-full cursor-pointer text-sm lg:text-base"><FaChevronRight /></span>
        </div>
    );
}

export { Comparator };