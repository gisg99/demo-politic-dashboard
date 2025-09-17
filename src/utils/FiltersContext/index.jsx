import React, { createContext, useContext, useState, useCallback } from 'react';

const FiltersContext = createContext();

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
};

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    semana_num: '',
    start_date: '',
    end_date: '',
    start_hour: '',
    end_hour: '',
    zona: '',
    distrito: '',
    demograficos: '',
    intencion_voto: ''
  });

  // Array de callbacks que se ejecutarán cuando cambien los filtros
  const [filterCallbacks, setFilterCallbacks] = useState([]);

  // Función para actualizar un filtro específico
  const updateFilter = useCallback((filterName, value) => {
    setFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [filterName]: value
      };

      // Ejecutar todos los callbacks registrados con los nuevos filtros
      filterCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(newFilters, filterName, value);
        }
      });

      return newFilters;
    });
  }, [filterCallbacks]);

  // Función para actualizar múltiples filtros a la vez
  const updateFilters = useCallback((newFilters) => {
    setFilters(prevFilters => {
      const updatedFilters = {
        ...prevFilters,
        ...newFilters
      };

      // Ejecutar todos los callbacks registrados con los nuevos filtros
      filterCallbacks.forEach(callback => {
        if (typeof callback === 'function') {
          callback(updatedFilters, 'multiple', newFilters);
        }
      });

      return updatedFilters;
    });
  }, [filterCallbacks]);

  // Función para resetear todos los filtros
  const resetFilters = useCallback(() => {
    const initialFilters = {
      semana_num: '',
      start_date: '',
      end_date: '',
      start_hour: '',
      end_hour: '',
      zona: '',
      distrito: '',
      demograficos: '',
      intencion_voto: ''
    };

    setFilters(initialFilters);

    // Ejecutar todos los callbacks registrados con los filtros reseteados
    filterCallbacks.forEach(callback => {
      if (typeof callback === 'function') {
        callback(initialFilters, 'reset', null);
      }
    });
  }, [filterCallbacks]);

  // Función para registrar un callback que se ejecutará cuando cambien los filtros
  const registerFilterCallback = useCallback((callback) => {
    if (typeof callback !== 'function') {
      console.warn('registerFilterCallback expects a function');
      return;
    }

    setFilterCallbacks(prevCallbacks => {
      // Evitar duplicados
      if (!prevCallbacks.includes(callback)) {
        return [...prevCallbacks, callback];
      }
      return prevCallbacks;
    });

    // Retorna una función para desregistrar el callback
    return () => {
      setFilterCallbacks(prevCallbacks =>
        prevCallbacks.filter(cb => cb !== callback)
      );
    };
  }, []);

  // Función para desregistrar un callback
  const unregisterFilterCallback = useCallback((callback) => {
    setFilterCallbacks(prevCallbacks =>
      prevCallbacks.filter(cb => cb !== callback)
    );
  }, []);

  // Función para obtener filtros activos (no vacíos)
  const getActiveFilters = useCallback(() => {
    return Object.entries(filters).reduce((active, [key, value]) => {
      if (value !== '' && value != null) {
        active[key] = value;
      }
      return active;
    }, {});
  }, [filters]);

  // Función para verificar si hay filtros activos
  const hasActiveFilters = useCallback(() => {
    return Object.values(filters).some(value => value !== '' && value != null);
  }, [filters]);

  const value = {
    // Estado
    filters,
    
    // Funciones de actualización
    updateFilter,
    updateFilters,
    resetFilters,
    
    // Gestión de callbacks
    registerFilterCallback,
    unregisterFilterCallback,
    
    // Utilidades
    getActiveFilters,
    hasActiveFilters
  };

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
};