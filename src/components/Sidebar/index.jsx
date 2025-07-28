import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  AiOutlineHome,
  AiOutlineBarChart, 
  AiOutlineTeam,
  AiOutlineFileText,
  AiOutlineAlert,
  AiOutlineSetting,
  AiOutlinePieChart,
  AiOutlineMessage,
  AiOutlineClose 
} from 'react-icons/ai';

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    { 
      icon: AiOutlineHome, 
      label: 'Home', 
      path: '/resumen',
    },
    { 
      icon: AiOutlineBarChart, 
      label: 'Indicadores', 
      path: '/indicadores',
    },
    { 
      icon: AiOutlineTeam, 
      label: 'Geolocalización', 
      path: '/demarcacion',
    },
    { 
      icon: AiOutlineAlert, 
      label: 'Movilidad y conectividad', 
      path: '/monitoreo',
    },
    { 
      icon: AiOutlineMessage, 
      label: 'Redes Sociales', 
      path: '/redes-sociales',
    },
    { 
      icon: AiOutlineFileText, 
      label: 'Información electoral', 
      path: '/informacion',
    },
    { 
      icon: AiOutlinePieChart, 
      label: 'Alertas estrategicas', 
      path: '/alertas',
    },
    { 
      icon: AiOutlinePieChart, 
      label: 'Configuración / usuarios', 
      path: '/comunicacion',
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
        fixed top-0 left-0 h-full w-40 bg-gray-100 border-r border-gray-200 z-50 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del sidebar */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JL</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800">JALISCO</h2>
              <p className="text-xs text-gray-500">Dashboard</p>
            </div>
          </div>
          <button 
            onClick={onToggle}
            className="lg:hidden p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <AiOutlineClose size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col p-2 w-full h-full justify-start">
          <ul className="flex h-full justify-center flex-col gap-1 -mt-8">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <li key={index} className="relative">
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center justify-center space-x-3 p-2 rounded-lg text-xs
                      transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-[#ff914d] text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                      }
                    `}
                  >
                    {({ isActive }) => (
                      <div className='flex flex-col justify-center items-center h-full w-full'>
                        <div className="flex-shrink-0">
                          <IconComponent size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-center text-[0.9svw] uppercase leading-tight">{item.label}</div>
                        </div>
                        {/* Indicador activo - SIN NavLink anidado */}
                        {isActive && (
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"></div>
                        )}
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