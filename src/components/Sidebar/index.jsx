import React from 'react';
import { NavLink } from 'react-router-dom';
import electoral from '../../assets/iconosDashboardPoliticoWEBP/electoral.webp';
import eye from '../../assets/iconosDashboardPoliticoWEBP/eye.webp';
import home from '../../assets/iconosDashboardPoliticoWEBP/home.webp';
import network from '../../assets/iconosDashboardPoliticoWEBP/network.webp';
import social from '../../assets/iconosDashboardPoliticoWEBP/social.webp';
import user from '../../assets/iconosDashboardPoliticoWEBP/user-settings.webp';
import warning from '../../assets/iconosDashboardPoliticoWEBP/warning.webp';
import world from '../../assets/iconosDashboardPoliticoWEBP/world.webp';
import segmentacion from '../../assets/iconosDashboardPoliticoWEBP/segmentacion.png';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { 
      icon: home, 
      label: 'Home', 
      path: '/',
    },
    { 
      icon: segmentacion, 
      label: 'Segmentación', 
      path: '/segmentacion',
    },
    { 
      icon: eye, 
      label: 'INDICADORES DE PERCEPCION', 
      path: '/indicadores',
    },
    { 
      icon: network, 
      label: 'Movilidad y conectividad', 
      path: '/movilidad',
    },
    { 
      icon: social, 
      label: 'Redes Sociales', 
      path: '/redes',
    },
    { 
      icon: electoral, 
      label: 'Información electoral', 
      path: '/informacion',
    },
    { 
      icon: world, 
      label: 'Geolocalizacion', 
      path: '/geolocalizacion',
    },
    { 
      icon: warning, 
      label: 'Alertas estrategicas', 
      path: '/alertas',
    }
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      onToggle(); // Cerrar sidebar en móvil después de hacer clic
    }
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <aside className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        fixed lg:relative
        left-0 top-0
        h-full lg:h-auto
        w-72 sm:w-80 lg:w-auto
        bg-[#d6d6d6] border-r border-gray-300
        z-50 lg:z-auto
        transition-transform duration-300 ease-in-out
        lg:px-2 px-4 sm:px-6
        pt-20 lg:pt-0
        overflow-y-auto lg:overflow-visible
      `}>
        {/* Navegación */}
        <nav className="flex flex-col p-2 w-full h-full justify-start">
          <ul className="flex lg:justify-evenly h-full flex-col gap-3 sm:gap-4 lg:gap-1 overflow-y-auto hide-scrollbar">
            {menuItems.map((item, index) => {
              return (
                <li key={index} className="relative lg:max-w-28 xl:max-w-30 w-full">
                  <NavLink 
                    to={item.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) => `
                      flex items-center lg:justify-center justify-start space-x-3 sm:space-x-4 lg:space-x-0 
                      p-3 sm:p-4 lg:p-2 rounded-[30px] 
                      text-sm sm:text-base lg:text-xs
                      transition-all duration-200 group relative w-full
                      ${isActive 
                        ? 'bg-tertiary text-white shadow-lg' 
                        : 'text-white hover:bg-tertiary hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <div className='flex lg:flex-col flex-row lg:justify-center lg:items-center justify-start items-center h-full w-full group lg:gap-0 gap-3 sm:gap-4'>
                        <div className="flex-shrink-0">
                          <img 
                            className={`w-7 sm:w-8 lg:w-7 xl:w-8 group-hover:invert group-hover:brightness-0 ${isActive 
                              ? 'invert brightness-0' 
                              : 'text-gray-400'
                            }`} 
                            src={item.icon} 
                            alt='icon'
                          /> 
                        </div>
                        <div className="flex-1 lg:min-w-0 min-w-0">
                          <div className={`font-medium text-left lg:text-center 
                            text-sm sm:text-base lg:text-[0.7rem] 
                            uppercase lg:leading-tight leading-normal 
                            ${isActive 
                              ? 'text-white' 
                              : 'text-gray-400 group-hover:text-white'
                            }`}>
                            {item.label}
                          </div> 
                        </div>
                      </div>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export { Sidebar };