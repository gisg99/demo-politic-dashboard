import React, { useState, Formik } from 'react';
import { AiOutlineMenu, AiOutlineBell, AiOutlineSearch, AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';
import { Sidebar, FiltrosComponent } from '../../components';
import logo from '../../assets/logo.png';
import { FiFilter } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
      <>
      
      {/* Contenido principal */}
      <div className="h-svh flex flex-col">
        {/* Header integrado */}
        <header className={`flex flex-col justify-start bg-[#acb8bf] ${filterActive ? "max-h-96" : "xl:max-h-28 lg:max-h-24 max-h-20 overflow-y-hidden"} duration-300 text-white z-30`} >
          <div className="flex items-center justify-between px-2 lg:px-4 py-3 lg:py-3">
            {/* Lado izquierdo - Logo y título */}
            <div className="flex items-center space-x-1 lg:space-x-4">
              {/* Botón hamburguesa para móvil */}
              <button 
                onClick={toggleSidebar}
                className="lg:hidden p-1.5 rounded-md hover:bg-gray-700 transition-colors flex-shrink-0"
                aria-label="Abrir menú"
                >
                <AiOutlineMenu size={24} />
              </button>
              
              <div className='w-10 lg:w-30 xl:w-32 flex justify-center flex-shrink-0'>
                <img className='w-8 lg:w-13 xl:w-17' src={logo} alt='logo'/>
              </div>

              {/* Logo Jalisco */}
              <div className="flex flex-col items-start justify-center min-w-0">
                  <h1 className="text-xs lg:text-base xl:text-lg uppercase font-bold leading-tight">
                    Dashboard de Inteligencia Electoral Jalisco 
                  </h1>
                  <p className="text-[10px] lg:text-xs xl:font-bold text-white leading-tight hidden sm:block">
                    Análisis integral basado en Portales Cautivos, Redes Sociales, INEGI y Reserve Lookup de E-mails
                  </p>
              </div>
            </div>
            
            {/* Lado derecho - Controles */}
            <div className="flex items-start xl:mt-7 lg:mt-5 mt-1 h-full space-x-1">
              {/* Filtros */}
              <div onClick={() => setFilterActive(prev => !prev)} className='flex flex-col justify-center items-center'>
                <button className="flex justify-center items-center px-1 py-1 lg:px-2 lg:py-2 xl:px-3 xl:py-3 text-xs bg-white rounded-full hover:bg-gray-600 hover:text-white text-gray-600 transition-colors">
                  <FiFilter size={23} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                </button>
                <h1 className='text-[10px] lg:text-xs font-medium text-gray-600 hidden sm:block mt-0.5'>Filtro</h1>
              </div>
              
              {/* Búsqueda */}
              {/* <div className='flex flex-col justify-center items-center'>
                <button className="flex justify-center items-center px-1 py-1 lg:px-2 lg:py-2 xl:px-3 xl:py-3 text-xs bg-white rounded-full hover:bg-gray-600 hover:text-white text-gray-600 transition-colors">
                  <IoSearchOutline size={12} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5"/>
                </button>
                <h1 className='text-[10px] lg:text-xs font-medium text-gray-600 hidden sm:block mt-0.5'>Buscar</h1>
              </div> */}
              
              {/* Usuario */}
              <div className='flex flex-col justify-center items-center'>
                <div className="flex justify-center items-center px-1 py-1 lg:px-2 lg:py-2 xl:px-3 xl:py-3 text-xs bg-tertiary rounded-full hover:bg-gray-600 hover:text-white text-white transition-colors">
                  <AiOutlineUser size={23} className="lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                </div>
                <h1 className='text-[10px] lg:text-xs font-medium text-gray-600 hidden sm:block mt-0.5'>Usuario</h1>
              </div>
            </div>
          </div>
          <div className={`${filterActive ? 'h-76 sm:h-36 lg:h-32' : 'h-0'} overflow-hidden transition-all duration-300`}>
            <FiltrosComponent/>
          </div>
        </header>
        <div className='max-h-full max-w-full flex flex-1 overflow-y-hidden'>
          {/* Sidebar Component */}
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          {/* Área de contenido */}
          <main className='w-full overflow-auto'>
            {children}
          </main>
        </div>
      </div>
      </>
  );
};

export {Layout};