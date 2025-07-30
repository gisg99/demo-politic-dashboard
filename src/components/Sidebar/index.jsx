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

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { 
      icon: home, 
      label: 'Home', 
      path: '/',
    },
    { 
      icon: eye, 
      label: 'Indicadores', 
      path: '/indicadores',
    },
    { 
      icon: world, 
      label: 'Geolocalización', 
      path: '/geolocalizacion',
    },
    { 
      icon: social, 
      label: 'Movilidad y conectividad', 
      path: '/movilidad',
    },
    { 
      icon: user, 
      label: 'Redes Sociales', 
      path: '/redes',
    },
    { 
      icon: network, 
      label: 'Información electoral', 
      path: '/informacion',
    },
    { 
      icon: warning, 
      label: 'Alertas estrategicas', 
      path: '/alertas',
    },
    { 
      icon: electoral, 
      label: 'Configuración / usuarios', 
      path: '/configuracion',
    }
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Contenedor del Sidebar */}
      <aside className={`
        px-2 bg-[#d6d6d6] border-r border-gray-300 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Navegación */}
        <nav className="flex flex-col p-2 w-full h-full justify-start ">
          <ul className="flex justify-evenly h-full flex-col gap-1 overflow-y-auto hide-scrollbar" >
            {menuItems.map((item, index) => {
              return (
                <li key={index} className="relative max-w-28 xl:max-w-30 ">
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center justify-center space-x-3 p-2 rounded-[30px] text-xs
                      transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-tertiary text-white shadow-lg' 
                        : 'text-white hover:bg-tertiary hover:text-white'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <div className='flex flex-col justify-center items-center h-full w-full group'>
                        <div className="flex-shrink-0">
                          <img className={`w-7 cl:w-8 group-hover:invert group-hover:brightness-0 ${isActive 
                        ? 'invert brightness-0' 
                        : 'text-gray-400'
                      }`} src={item.icon} alt='icon'/> 
                          {/* <IconComponent size={24} /> */}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-medium text-gray-500 text-center text-[0.7rem] uppercase leading-tight ${isActive 
                        ? 'text-white' 
                        : 'text-gray-400 group-hover:text-white'
                      }`}>{item.label}</div>
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

export {Sidebar};