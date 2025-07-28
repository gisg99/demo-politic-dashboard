import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineBell, AiOutlineSearch, AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';
import {Sidebar} from '../../components';

const Layout = ({ content, title = "DASHBOARD DE INTELIGENCIA ELECTORAL", subtitle = "Análisis Integral basado en Política, Gobierno, Redes Sociales, MEG y Eventos Locales de E-mail" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      {/* Contenido principal */}
      <div className="lg:ml-40 min-h-screen flex flex-col">
        {/* Header integrado */}
        <header className="bg-gray-600 text-white sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Lado izquierdo - Logo y título */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Abrir menú"
              >
                <AiOutlineMenu size={20} />
              </button>
              
              {/* Logo Jalisco */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 font-bold text-lg">JL</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight">
                    {title}
                  </h1>
                  <p className="text-xs text-gray-300 leading-tight">
                    {subtitle}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Lado derecho - Controles */}
            <div className="flex items-center space-x-2">
              {/* Botón de ayuda */}
              <button className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                <AiOutlineQuestionCircle size={18} />
              </button>
              
              {/* Filtros */}
              <button className="px-3 py-2 text-xs bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                Filtros
              </button>
              
              {/* Notificaciones */}
              <button className="relative p-2 rounded-full hover:bg-gray-700 transition-colors">
                <AiOutlineBell size={18} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              
              {/* Usuario */}
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
                <AiOutlineUser size={16} />
                <span className="text-xs font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Subheader con navegación de breadcrumbs */}
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>RESUMEN EJECUTIVO</span>
            </div>
            <div className="flex items-center space-x-3">
              {/* Selector de período */}
              <select className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Último mes</option>
                <option>Última semana</option>
                <option>Últimas 24h</option>
              </select>
              
              {/* Botón de actualización */}
              <button className="text-xs bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 transition-colors">
                Actualizar datos
              </button>
            </div>
          </div>
        </div>
        
        {/* Área de contenido */}
        <main className="flex-1 p-4 bg-gray-50">
          {content}
        </main>
      </div>
    </div>
  );
};

export {Layout};