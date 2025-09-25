// utils/IndicadoresContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useFilters } from '../FiltersContext';

export const IndicadoresContext = createContext(null);

const EDAD_ORDER = ['18-25', '26-34', '35-44', '45-54', '55-64', '65+'];

function parsePercent(p) {
  if (typeof p === 'number') return p;
  if (typeof p === 'string') {
    const n = Number(p.replace('%', '').trim());
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function normalizeAges(apiRows) {
  const byRange = new Map();
  (Array.isArray(apiRows) ? apiRows : []).forEach(r => {
    const key = r?.rango;
    const pct = parsePercent(r?.porcentaje);
    if (key && EDAD_ORDER.includes(key)) {
      byRange.set(key, (byRange.get(key) || 0) + pct);
    }
  });
  return EDAD_ORDER.map(range => ({
    range,
    value: byRange.get(range) || 0,
  }));
}

export const IndicadoresProvider = ({ children }) => {
  const [edades, setEdades] = useState(null);
  const [loadingEdades, setLoadingEdades] = useState(false);

  const { filters, registerFilterCallback } = useFilters?.() ?? { filters: {}, registerFilterCallback: (fn)=>()=>{} };

  const fetchEdades = useCallback(async (currentFilters) => {
    try {
      setLoadingEdades(true);
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/usuarios/ages`;
      const { data } = await axios.get(url, { params: currentFilters, timeout: 15000 });
      setEdades(normalizeAges(data));
    } catch (e) {
      console.error('Error fetching edades:', e);
      setEdades([]);
    } finally {
      setLoadingEdades(false);
    }
  }, []);

  useEffect(() => {
    const unregister = registerFilterCallback?.((newFilters, changedField) => {
      if (changedField === 'reset') fetchEdades(newFilters);
      // (si más adelante edades dependen de filtros, aquí decides cuándo refetchear)
    });
    return unregister;
  }, [registerFilterCallback, fetchEdades]);

  useEffect(() => {
    fetchEdades(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({
    edades,
    loadingEdades,
    refetchEdades: () => fetchEdades(filters),
    hasEdades: Array.isArray(edades) && edades.length > 0,
    loading: loadingEdades,
    hasData: Array.isArray(edades) && edades.length > 0,
    isEmpty: !Array.isArray(edades) || edades.length === 0,
  }), [edades, loadingEdades, fetchEdades, filters]);

  return (
    <IndicadoresContext.Provider value={value}>
      {children}
    </IndicadoresContext.Provider>
  );
};

export default IndicadoresProvider;

export const useIndicadores = () => {
  const ctx = useContext(IndicadoresContext);
  if (!ctx) throw new Error('useIndicadores must be used within an IndicadoresProvider');
  return ctx;
};
