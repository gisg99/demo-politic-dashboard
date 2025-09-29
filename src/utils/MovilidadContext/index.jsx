import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useFilters } from '../FiltersContext';
import axios from 'axios';

const MovilidadContext = createContext();

const MovilidadProvider = ({ children }) => {
  const [visitas, setVisitas] = useState(null);
  const [horarios, setHorarios] = useState(null);
  const [tipos, setTipos] = useState(null);
  const [loadingVisitas, setLoadingVisitas] = useState(false);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [loadingTipos, setLoadingTipos] = useState(false);
  
  const { filters, registerFilterCallback } = useFilters();

  // Mapeo de nombres de filtros del contexto a nombres de la API
  const mapFiltersToAPI = useCallback((filters) => {
    return {
      start_date: filters.start_date || '',
      end_date: filters.end_date || '',
      start_hour: filters.start_hour || '',
      end_hour: filters.end_hour || '',
      zona: filters.zona || '',
      distrito: filters.distrito || '',
      demograficos: filters.demograficos || '',
      intencion_voto: filters.intencion_voto || ''
    };
  }, []);

  // Definir campos relevantes para cada dataset (usando nombres del contexto)
  const RELEVANT_FIELDS = {
    visitas: ['start_date', 'end_date'], 
    horarios: ['start_hour', 'end_hour', 'start_date', 'end_date'],
    types: ['start_hour', 'end_hour', 'start_date', 'end_date'],
  };

  const fetchVisitas = useCallback(async (currentFilters) => {
    try {
      setLoadingVisitas(true);
      const apiFilters = mapFiltersToAPI(currentFilters);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/movilidad/visitas`, { 
        params: apiFilters 
      });
      
      if (response.data && response.data.length > 0) {
        setVisitas(response.data);
      } else {
        setVisitas([]);
      }
    } catch (error) {
      console.error('Error fetching visitas:', error);
      setVisitas([]); // Set empty array on error
    } finally {
      setLoadingVisitas(false);
    }
  }, [mapFiltersToAPI]);

  const fetchHorarios = useCallback(async (currentFilters) => {
    try {
      setLoadingHorarios(true);
      const apiFilters = mapFiltersToAPI(currentFilters);
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/visitas/visitas-filter`, { 
        params: apiFilters 
      });
      
      if (response.status === 200) {
        setHorarios(response.data);
      } else {
        setHorarios([]);
      }
    } catch (error) {
      console.error('Error fetching horarios:', error);
      setHorarios([]); // Set empty array on error
    } finally {
      setLoadingHorarios(false);
    }
  }, [mapFiltersToAPI]);

  const fetchTipos = useCallback(async (currentFilters) => {
    try {
        setLoadingTipos(true);
        const apiFilters = mapFiltersToAPI(currentFilters);
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/porcentaje-os`, {
            params: apiFilters
        });
        if (response.status === 200) {
            setTipos(response.data);
        } else {
            setTipos([]);
        }
    } catch (error) {
        console.error('Error fetching tipos:', error);
        setTipos([]); // Set empty array on error
    } finally {
        setLoadingTipos(false);
    }
  }, [mapFiltersToAPI]);

  const shouldFetchDataset = useCallback((datasetName, changedField, changedFields = []) => {
    const relevantFields = RELEVANT_FIELDS[datasetName];

    // Casos especiales que siempre requieren fetch
    if (changedField === 'reset') {
      return true;
    }

    // Para cambios múltiples, verificar si algún campo es relevante
    if (changedField === 'multiple' && changedFields.length > 0) {
      return changedFields.some(field => relevantFields.includes(field));
    }

    // Para cambios individuales, verificar si el campo es relevante
    return relevantFields.includes(changedField);
  }, []);

  // ✅ SOLUCION PRINCIPAL: useEffect separado solo para registrar el callback
  useEffect(() => {
    const handleFilterChange = (newFilters, changedField, changedValue) => {
      // console.log('Filter change detected:', { changedField, changedValue });
      
      // Para el caso de 'multiple', changedValue contiene los campos que cambiaron
      const changedFields = changedField === 'multiple' ? Object.keys(changedValue || {}) : [];
      
      // Determinar qué datasets necesitan actualizarse
      const needsVisitasUpdate = shouldFetchDataset('visitas', changedField, changedFields);
      const needsHorariosUpdate = shouldFetchDataset('horarios', changedField, changedFields);
        const needsTiposUpdate = shouldFetchDataset('types', changedField, changedFields);
      
      // Hacer fetch solo si es necesario
      if (needsVisitasUpdate) {
        // console.log('Updating visitas for:', changedField, changedFields);
        fetchVisitas(newFilters);
      }
      
      if (needsHorariosUpdate) {
        // console.log('Updating horarios for:', changedField, changedFields);
        fetchHorarios(newFilters);
      }

      if (needsTiposUpdate) {
        // console.log('Updating tipos for:', changedField, changedFields);
        fetchTipos(newFilters);
      }
    };

    // Registrar el callback
    const unregister = registerFilterCallback(handleFilterChange);

    // Cleanup
    return unregister;
  }, [registerFilterCallback, shouldFetchDataset, fetchVisitas, fetchHorarios]);

  // ✅ useEffect separado para fetch inicial
  useEffect(() => {
    // const hasActiveFilters = Object.values(filters).some(value => value !== '' && value != null);
    
    // if (hasActiveFilters) {
      // console.log('Initial fetch with filters:', filters);
      fetchVisitas(filters);
      fetchHorarios(filters);
      fetchTipos(filters);
    // }
  }, []); // ✅ Array vacío - solo ejecuta una vez al montar

  // Funciones de refetch
  const refetchVisitas = useCallback(() => fetchVisitas(filters), [fetchVisitas, filters]);
  const refetchHorarios = useCallback(() => fetchHorarios(filters), [fetchHorarios, filters]);
  const refetchTipos = useCallback(() => fetchTipos(filters), [fetchTipos, filters]);
  const refetchAll = useCallback(() => {
    fetchVisitas(filters);
    fetchHorarios(filters);
    fetchTipos(filters);
  }, [fetchVisitas, fetchHorarios, fetchTipos, filters]);

  const value = { 
    // Data
    visitas,
    horarios,
    tipos,

    // Loading states
    loadingVisitas,
    loadingHorarios,
    loadingTipos,
    loading: loadingVisitas || loadingHorarios || loadingTipos,

    // Refetch functions
    refetchVisitas,
    refetchHorarios,
    refetchTipos,
    refetchAll,

    // Utilities
    hasData: visitas !== null || horarios !== null || tipos !== null,
    isEmpty: visitas === null && horarios === null && tipos === null,
    hasVisitas: Array.isArray(visitas) && visitas.length > 0,
    hasHorarios: Array.isArray(horarios) && horarios.length > 0,
    hasTipos: Array.isArray(tipos) && tipos.length > 0,
  };

  return (
    <MovilidadContext.Provider value={value}>
      {children}
    </MovilidadContext.Provider>
  );
};

export { MovilidadContext, MovilidadProvider };

// Hook personalizado para usar el contexto
export const useMovilidad = () => {
  const context = useContext(MovilidadContext);
  if (!context) {
    throw new Error('useMovilidad must be used within a MovilidadProvider');
  }
  return context;
};