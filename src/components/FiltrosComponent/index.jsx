import React, { useRef } from 'react';
import { Formik } from 'formik';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

const FiltrosComponent = () => {
  const initialValues = {
    fechaInicio: '',
    fechaFin: '',
    horaInicio: '',
    horaFin: '',
    zona: '',
    distrito: '',
    demograficos: '',
    intencionVoto: ''
  };

  const handleSubmit = (values) => {
    console.log('Filtros aplicados:', values);
  };

  const handleReset = (resetForm) => {
    resetForm();
    console.log('Filtros limpiados');
  };

  const openDatePicker = (inputRef) => {
    if (inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className="px-2 lg:px-4 py-1 lg:py-3 w-full max-h-full overflow-y-auto">
      <style>
        {`
          .date-input::-webkit-calendar-picker-indicator {
            display: none;
          }
          .date-input::-webkit-inner-spin-button {
            display: none;
          }
          .date-input::-webkit-outer-spin-button {
            display: none;
          }
        `}
      </style>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, resetForm }) => {
          const fechaInicioRef = useRef(null);
          const fechaFinRef = useRef(null);
          
          return (
          <div>
            {/* Grid responsivo ultra compacto para móvil */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:flex lg:flex-wrap gap-1.5 sm:gap-1 lg:gap-2 mb-2 sm:mb-1 lg:mb-3">
              
              {/* Fecha inicio */}
              <div className="w-full lg:w-32 xl:w-40">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Fecha inicio
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-2 sm:left-1.5 top-1/2 transform -translate-y-1/2 p-0.5 rounded-sm cursor-pointer z-10"
                    onClick={() => openDatePicker(fechaInicioRef)}
                  >
                    <FaCalendarAlt className="text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                  </div>
                  <div 
                    className="cursor-pointer"
                    onClick={() => openDatePicker(fechaInicioRef)}
                  >
                    <input
                      ref={fechaInicioRef}
                      type="date"
                      name="fechaInicio"
                      value={values.fechaInicio}
                      onChange={(e) => setFieldValue('fechaInicio', e.target.value)}
                      className="date-input w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Fecha fin */}
              <div className="w-full lg:w-32 xl:w-40">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Fecha fin
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-2 sm:left-1.5 top-1/2 transform -translate-y-1/2 p-0.5 rounded-sm cursor-pointer z-10"
                    onClick={() => openDatePicker(fechaFinRef)}
                  >
                    <FaCalendarAlt className="text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                  </div>
                  <div 
                    className="cursor-pointer"
                    onClick={() => openDatePicker(fechaFinRef)}
                  >
                    <input
                      ref={fechaFinRef}
                      type="date"
                      name="fechaFin"
                      value={values.fechaFin}
                      onChange={(e) => setFieldValue('fechaFin', e.target.value)}
                      className="date-input w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Hora inicio */}
              <div className="w-full lg:w-24 xl:w-32">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Hora inicio
                </label>
                <div className="relative">
                  <FaClock className="absolute left-2 sm:left-1.5 top-1/2 transform -translate-y-1/2 text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                  <select
                    name="horaInicio"
                    value={values.horaInicio}
                    onChange={(e) => setFieldValue('horaInicio', e.target.value)}
                    className="w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="00:00">00:00</option>
                    <option value="06:00">06:00</option>
                    <option value="12:00">12:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              {/* Hora fin */}
              <div className="w-full lg:w-24 xl:w-32">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Hora fin
                </label>
                <div className="relative">
                  <FaClock className="absolute left-2 sm:left-1.5 top-1/2 transform -translate-y-1/2 text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                  <select
                    name="horaFin"
                    value={values.horaFin}
                    onChange={(e) => setFieldValue('horaFin', e.target.value)}
                    className="w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="06:00">06:00</option>
                    <option value="12:00">12:00</option>
                    <option value="18:00">18:00</option>
                    <option value="23:59">23:59</option>
                  </select>
                </div>
              </div>

              {/* Zona */}
              <div className="w-full lg:w-28 xl:w-36">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Zona
                </label>
                <div className="relative">
                  <select
                    name="zona"
                    value={values.zona}
                    onChange={(e) => setFieldValue('zona', e.target.value)}
                    className="w-full pl-3 sm:pl-2 lg:pl-3 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="norte">Norte</option>
                    <option value="sur">Sur</option>
                    <option value="este">Este</option>
                    <option value="oeste">Oeste</option>
                    <option value="centro">Centro</option>
                  </select>
                </div>
              </div>

              {/* Distrito */}
              <div className="w-full lg:w-28 xl:w-36">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Distrito
                </label>
                <div className="relative">
                  <select
                    name="distrito"
                    value={values.distrito}
                    onChange={(e) => setFieldValue('distrito', e.target.value)}
                    className="w-full pl-3 sm:pl-2 lg:pl-3 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="distrito1">Distrito 1</option>
                    <option value="distrito2">Distrito 2</option>
                    <option value="distrito3">Distrito 3</option>
                    <option value="distrito4">Distrito 4</option>
                  </select>
                </div>
              </div>

              {/* Demográficos */}
              <div className="w-full lg:w-32 xl:w-40">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Demográficos
                </label>
                <div className="relative">
                  <select
                    name="demograficos"
                    value={values.demograficos}
                    onChange={(e) => setFieldValue('demograficos', e.target.value)}
                    className="w-full pl-3 sm:pl-2 lg:pl-3 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="18-25">18-25 años</option>
                    <option value="26-35">26-35 años</option>
                    <option value="36-45">36-45 años</option>
                    <option value="46-60">46-60 años</option>
                    <option value="60+">60+ años</option>
                  </select>
                </div>
              </div>

              {/* Intención voto */}
              <div className="w-full lg:w-36 xl:w-44">
                <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                  Intención voto
                </label>
                <div className="relative">
                  <select
                    name="intencionVoto"
                    value={values.intencionVoto}
                    onChange={(e) => setFieldValue('intencionVoto', e.target.value)}
                    className="w-full pl-3 sm:pl-2 lg:pl-3 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="candidato1">Candidato 1</option>
                    <option value="candidato2">Candidato 2</option>
                    <option value="candidato3">Candidato 3</option>
                    <option value="indeciso">Indeciso</option>
                    <option value="nulo">Voto nulo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botones más compactos para móvil */} 
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 lg:gap-2 justify-center sm:justify-start mt-2 sm:mt-1 lg:mt-0">
              <button
                type="button"
                onClick={() => handleSubmit(values)}
                className="w-full sm:w-auto px-4 sm:px-3 lg:px-4 py-1.5 sm:py-0.5 lg:py-1.5 bg-white border border-tertiary text-tertiary hover:text-white rounded-full hover:bg-tertiary transition-colors duration-200 font-medium text-xs sm:text-[9px] lg:text-xs"
              >
                Aplicar Filtros
              </button>
              <button
                type="button"
                onClick={() => handleReset(resetForm)}
                className="w-full sm:w-auto px-4 sm:px-3 lg:px-4 py-1.5 sm:py-0.5 lg:py-1.5 bg-white border border-tertiary text-tertiary hover:text-white rounded-full hover:bg-tertiary transition-colors duration-200 font-medium text-xs sm:text-[9px] lg:text-xs"
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
        );
        }}
      </Formik>
    </div>
  );
};

export {FiltrosComponent}