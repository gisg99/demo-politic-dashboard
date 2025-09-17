// src/components/FiltrosComponent/index.jsx
import React, { useRef, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

// Contextos
import { InformacionContext } from '../../utils/InformacionContext';
import { RedesContext } from '../../utils/RedesContext';
import { useFilters } from '../../utils/FiltersContext';

const FiltrosComponent = () => {
  // Semanas disponibles
  const { weeksNumbers } = useContext(InformacionContext);

  // Control de semana para REDES (mantener compatibilidad con código existente)
  const { selectedWeek, setSelectedWeek } = useContext(RedesContext);

  // Filtros centralizados
  const { 
    filters, 
    updateFilter, 
    resetFilters, 
    registerFilterCallback,
    hasActiveFilters 
  } = useFilters();

  // Sincronizar la semana del contexto de Redes con los filtros
  useEffect(() => {
    if (selectedWeek && selectedWeek !== filters.semana) {
      updateFilter('semana', selectedWeek.toString());
    }
  }, [selectedWeek, filters.semana, updateFilter]);

  // Registrar callback para manejar cambios en la semana desde los filtros
  useEffect(() => {
    const handleFilterChange = (newFilters, changedField, newValue) => {
      // Si cambió la semana desde los filtros, actualizar el contexto de Redes
      if (changedField === 'semana' && newValue !== '' && newValue != null) {
        const weekNumber = Number(newValue);
        if (!isNaN(weekNumber) && weekNumber !== selectedWeek) {
          setSelectedWeek(weekNumber);
        }
      }
    };

    // Registrar el callback
    const unregister = registerFilterCallback(handleFilterChange);

    // Limpiar al desmontar
    return unregister;
  }, [registerFilterCallback, setSelectedWeek, selectedWeek]);

  const handleSubmit = () => {
    // Los filtros ya están actualizados en el contexto
    // Otros contextos pueden estar escuchando cambios vía callbacks
    console.log('Filtros aplicados:', filters);
  };

  const handleReset = (resetForm) => {
    resetForm();
    resetFilters();
    // Esto también reseteará la semana en RedesContext vía el callback
  };

  const openDatePicker = (inputRef) => {
    if (inputRef.current) inputRef.current.showPicker();
  };

  return (
    <div className="px-2 lg:px-4 py-1 lg:py-3 w-full max-h-full overflow-y-auto">
      <style>
        {`
          .date-input::-webkit-calendar-picker-indicator { display: none; }
          .date-input::-webkit-inner-spin-button { display: none; }
          .date-input::-webkit-outer-spin-button { display: none; }
        `}
      </style>

      <Formik 
        initialValues={filters} 
        onSubmit={handleSubmit} 
        enableReinitialize
      >
        {({ setFieldValue, resetForm }) => {
          const start_dateRef = useRef(null);
          const endDateRef = useRef(null);

          return (
            <div>
              {/* Grid de filtros */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:flex lg:flex-wrap gap-1.5 sm:gap-1 lg:gap-2 mb-2 sm:mb-1 lg:mb-3">

                {/* === Semana === */}
                <div className="w-full lg:w-24 xl:w-28">
                  <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                    Semana
                  </label>
                  <div className="relative">
                    <select
                      name="semana_num"
                      value={filters.semana_num}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('semana_num', value);
                        updateFilter('semana_num', value);
                      }}
                      className="w-full pl-3 sm:pl-2 lg:pl-3 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                    >
                      <option value="">Seleccionar</option>
                      {Array.isArray(weeksNumbers) && weeksNumbers.map((week) => (
                        <option key={week} value={week}>
                          Semana {week}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Fecha inicio */}
                <div className="w-full lg:w-32 xl:w-40">
                  <label className="block text-xs sm:text-[9px] lg:text-xs text-gray-600 mb-1 sm:mb-0.5 font-medium leading-tight">
                    Fecha inicio
                  </label>
                  <div className="relative">
                    <div
                      className="absolute left-2 sm:left-1.5 top-1/2 transform -translate-y-1/2 p-0.5 rounded-sm cursor-pointer z-10"
                      onClick={() => openDatePicker(start_dateRef)}
                    >
                      <FaCalendarAlt className="text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                    </div>
                    <div className="cursor-pointer" onClick={() => openDatePicker(start_dateRef)}>
                      <input
                        ref={start_dateRef}
                        type="date"
                        name="start_date"
                        value={filters.start_date}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue('start_date', value);
                          updateFilter('start_date', value);
                        }}
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
                      onClick={() => openDatePicker(endDateRef)}
                    >
                      <FaCalendarAlt className="text-tertiary w-3 h-3 sm:w-2 sm:h-2 lg:w-2.5 lg:h-2.5" />
                    </div>
                    <div className="cursor-pointer" onClick={() => openDatePicker(endDateRef)}>
                      <input
                        ref={endDateRef}
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue('endDate', value);
                          updateFilter('endDate', value);
                        }}
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
                      name="start_hour"
                      value={filters.start_hour}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('start_hour', value);
                        updateFilter('start_hour', value);
                      }}
                      className="w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                    >
                      <option value="">Seleccionar</option>
                      {Array.from({ length: 24 }, (_, hour) => {
                        const hourString = hour.toString().padStart(2, '0') + ':00';
                        return <option value={hourString} key={hourString}>{hourString}</option>
                      })}
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
                      name="end_hour"
                      value={filters.end_hour}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('end_hour', value);
                        updateFilter('end_hour', value);
                      }}
                      className="w-full pl-6 sm:pl-4 lg:pl-7 pr-2 sm:pr-1 lg:pr-2 py-1.5 sm:py-0.5 lg:py-1 border border-gray-300 rounded-full bg-white text-xs sm:text-[9px] lg:text-xs focus:outline-none focus:ring-1 focus:ring-orange-400 appearance-none text-tertiary"
                    >
                      <option value="">Seleccionar</option>
                      {Array.from({ length: 24 }, (_, hour) => {
                        const hourString = hour.toString().padStart(2, '0') + ':00';
                        return <option value={hourString} key={hourString}>{hourString}</option>
                      })}
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
                      value={filters.zona}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('zona', value);
                        updateFilter('zona', value);
                      }}
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
                      value={filters.distrito}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('distrito', value);
                        updateFilter('distrito', value);
                      }}
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
                      value={filters.demograficos}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('demograficos', value);
                        updateFilter('demograficos', value);
                      }}
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
                      value={filters.intencionVoto}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue('intencionVoto', value);
                        updateFilter('intencionVoto', value);
                      }}
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

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-1 lg:gap-2 justify-center sm:justify-start mt-2 sm:mt-1 lg:mt-0">
                <button
                  type="button"
                  onClick={handleSubmit}
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

export { FiltrosComponent };