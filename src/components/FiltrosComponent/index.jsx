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
    <div className="px-4 py-3">
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
            <div className="flex gap-2 mb-3">
              {/* Fecha inicio - más angosto */}
              <div className="w-34">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Fecha inicio
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-100 p-1 rounded-sm cursor-pointer z-10"
                    onClick={() => openDatePicker(fechaInicioRef)}
                  >
                    <FaCalendarAlt className="text-tertiary w-2.5 h-2.5" />
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
                      className="date-input w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Fecha fin - más angosto */}
              <div className="w-34">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Fecha fin
                </label>
                <div className="relative">
                  <div 
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-orange-100 p-1 rounded-sm cursor-pointer z-10"
                    onClick={() => openDatePicker(fechaFinRef)}
                  >
                    <FaCalendarAlt className="text-tertiary w-2.5 h-2.5" />
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
                      className="date-input w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Hora inicio - mediano */}
              <div className="w-28">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Hora inicio
                </label>
                <div className="relative">
                  <FaClock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary w-2.5 h-2.5" />
                  <select
                    name="horaInicio"
                    value={values.horaInicio}
                    onChange={(e) => setFieldValue('horaInicio', e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="00:00">00:00</option>
                    <option value="06:00">06:00</option>
                    <option value="12:00">12:00</option>
                    <option value="18:00">18:00</option>
                  </select>
                </div>
              </div>

              {/* Hora fin - mediano */}
              <div className="w-28">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Hora fin
                </label>
                <div className="relative">
                  <FaClock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-tertiary w-2.5 h-2.5" />
                  <select
                    name="horaFin"
                    value={values.horaFin}
                    onChange={(e) => setFieldValue('horaFin', e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="06:00">06:00</option>
                    <option value="12:00">12:00</option>
                    <option value="18:00">18:00</option>
                    <option value="23:59">23:59</option>
                  </select>
                </div>
              </div>

              {/* Zona - sin icono */}
              <div className="w-40">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Zona
                </label>
                <div className="relative">
                  <select
                    name="zona"
                    value={values.zona}
                    onChange={(e) => setFieldValue('zona', e.target.value)}
                    className="w-full pl-3 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
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

              {/* Distrito - sin icono */}
              <div className="w-40">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Distrito
                </label>
                <div className="relative">
                  <select
                    name="distrito"
                    value={values.distrito}
                    onChange={(e) => setFieldValue('distrito', e.target.value)}
                    className="w-full pl-3 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                  >
                    <option value="">Seleccionar</option>
                    <option value="distrito1">Distrito 1</option>
                    <option value="distrito2">Distrito 2</option>
                    <option value="distrito3">Distrito 3</option>
                    <option value="distrito4">Distrito 4</option>
                  </select>
                </div>
              </div>

              {/* Demográficos - sin icono */}
              <div className="w-25">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Demográficos
                </label>
                <div className="relative">
                  <select
                    name="demograficos"
                    value={values.demograficos}
                    onChange={(e) => setFieldValue('demograficos', e.target.value)}
                    className="w-full pl-3 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
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

              {/* Intención voto - sin icono */}
              <div className="w-48">
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Intención voto
                </label>
                <div className="relative">
                  <select
                    name="intencionVoto"
                    value={values.intencionVoto}
                    onChange={(e) => setFieldValue('intencionVoto', e.target.value)}
                    className="w-full pl-3 pr-3 py-1.5 border border-gray-300 rounded-full bg-white text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
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

            {/* Botones */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleSubmit(values)}
                className="px-4 py-1.5 bg-white border border-tertiary text-tertiary hover:text-white rounded-full hover:bg-tertiary transition-colors duration-200 font-medium text-xs"
              >
                Aplicar Filtros
              </button>
              <button
                type="button"
                onClick={() => handleReset(resetForm)}
                className="px-4 py-1.5 bg-white border border-tertiary text-tertiary hover:text-white rounded-full hover:bg-tertiary transition-colors duration-200 font-medium text-xs"
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

export {FiltrosComponent};