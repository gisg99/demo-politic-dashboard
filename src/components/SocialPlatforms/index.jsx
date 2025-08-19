import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTiktok, 
  FaWhatsapp, 
  FaYoutube,
  FaGoogle,
  FaMapMarkedAlt
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const SocialPlatforms = ({ platforms = [] }) => {
  // Mapeo de plataformas con sus iconos y colores
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

  // Función para obtener la configuración de la plataforma
  const getPlatformConfig = (platformName) => {
    const normalizedName = platformName.toLowerCase().trim();
    return platformsConfig[normalizedName] || null;
  };

  return (
    <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:p-0">
      <h1 className='text-lg sm:text-xl md:text-2xl lg:text-[1.3rem] xl:text-[1.8rem] text-tertiary font-bold mt-2 sm:mt-3'>
        Plataformas más usadas
      </h1>
      <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4 items-center justify-start sm:justify-start">
        {platforms.slice(0, 3).map((platform, index) => {
          const config = getPlatformConfig(platform);
          
          if (!config) return null; 
          
          const IconComponent = config.icon;
          
          return (
            <div
              key={index}
              className="group cursor-pointer transition-transform hover:scale-110"
              title={config.name}
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-14 lg:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: config.bgColor,
                  backgroundColor: config.solidColor || config.bgColor
                }}
              >
                <IconComponent 
                  className="text-white text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export  {SocialPlatforms};