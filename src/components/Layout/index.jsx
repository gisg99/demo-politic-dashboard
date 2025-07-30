import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineBell, AiOutlineSearch, AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';
import {Sidebar} from '../../components';
import logo from '../../assets/logo.png';
import { FiFilter } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
      <>
      
      {/* Contenido principal */}
      <div className="h-svh flex flex-col">
        {/* Header integrado */}
        <header className="bg-[#acb8bf] h-[4rem] xl:h-[6rem] text-white z-30">
          <div className="flex items-center h-full justify-between px-4 py-3">
            {/* Lado izquierdo - Logo y título */}
            <div className="flex h-full items-center space-x-4">
              {/* <button 
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Abrir menú"
                >
                <AiOutlineMenu size={20} />
              </button> */}
              <div className='w-30 xl:w-32 flex justify-center'>
                <img className='w-13 xl:w-17' src={logo} alt='logo'/>
              </div>

              {/* Logo Jalisco */}
              <div className="flex flex-col h-full items-start justify-center space-x-3">
                  <h1 className=" text-base xl:text-lg uppercase font-bold leading-tight">
                    Dashboard de Inteligencia Electoral Jalisco 
                  </h1>
                  <p className="text-xs xl:font-bold text-white leading-tight">
                    Analis integral basado en Portales Cautivos, Redes Sociales, INEGI y Reserve Lookup de E-mails
                  </p>
              </div>
            </div>
            
            {/* Lado derecho - Controles */}
            <div className="flex items-start xl:mt-7 h-full space-x-2">
              {/* Filtros */}
              <div className='flex flex-col justify-center items-center'>
                <button className="flex justify-center items-center px-2 py-2 xl:px-3 xl:py-3 text-xs bg-white rounded-full hover:bg-gray-600 hover:text-white text-gray-600 transition-colors [&>svg]:w-4 [&>svg]:h-4 xl:[&>svg]:w-5 xl:[&>svg]:h-5">
                  <FiFilter size={15} />
                </button>
                <h1 className='text-xs font-medium text-gray-600'>Filtro</h1>
              </div>
              
              {/* Notificaciones */}
              <button className="flex justify-center items-center px-2 py-2 xl:px-3 xl:py-3 text-xs bg-white rounded-full hover:bg-gray-600 hover:text-white text-gray-600 transition-colors [&>svg]:w-4 [&>svg]:h-4 xl:[&>svg]:w-5 xl:[&>svg]:h-5">
                <IoSearchOutline size={15}/>
              </button>
              
              {/* Usuario */}
              <div className="flex justify-center items-center px-2 py-2 xl:px-3 xl:py-3 text-xs bg-tertiary rounded-full hover:bg-gray-600 hover:text-white text-white transition-colors [&>svg]:w-4 [&>svg]:h-4 xl:[&>svg]:w-5 xl:[&>svg]:h-5">
                <AiOutlineUser size={16} />
              </div>
            </div>
          </div>
        </header>
        <div className='max-h-full max-w-full flex flex-1 overflow-y-hidden'>
          {/* Sidebar Component */}
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          {/* Área de contenido */}
          <main className='w-full h-full overflow-auto'>
            {children}
          </main>
        </div>
      </div>
      </>
  );
};

export {Layout};