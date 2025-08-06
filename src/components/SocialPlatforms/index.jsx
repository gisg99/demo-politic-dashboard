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
    <div className="flex flex-col gap-3">
      <h2 className="text-xl lg:text-2xl text-[#FF8C00] font-bold">
        Plataformas más usadas
      </h2>
      <div className="flex gap-4 items-center">
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
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: config.bgColor,
                  backgroundColor: config.solidColor || config.bgColor
                }}
              >
                <IconComponent 
                  className="text-white text-2xl lg:text-3xl"
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