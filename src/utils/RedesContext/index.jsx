import React, { createContext, useEffect, useState } from "react";
import axios from "axios";



export const RedesProvider = ({ children }) => {
  const [weeklyReportGeneral, setWeeklyReportGeneral] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1); // default semana 1
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  // Normaliza la respuesta del back al shape que ya usa tu UI
  const normalizeGeneral = (api) => ({
    semana: Number(api?.semana) || 1,
    mencion_mas_frecuente: api?.mencion_mas_frecuente ?? null,
    plataformas_mas_usadas: api?.plataformas_mas_usadas ?? "",
    temas_frecuentes: Array.isArray(api?.temas_frecuentes) ? api.temas_frecuentes : [],

    // UI actual espera porcentaje_felicidad y calcula enojo con 100 - felicidad
    porcentaje_felicidad: Number(api?.sentimiento?.felicidad) || 0,

    // UI actual espera números planos para aprobaciones
    aprobacion_a_favor: Number(api?.aprobacion_a_favor?.actual) || 0,
    aprobacion_en_contra: Number(api?.aprobacion_en_contra?.actual) || 0,
    aprobacion_neutral: Number(api?.aprobacion_neutral?.actual) || 0,

    // Tu UI usa "hashtags_mas_usados", mapeamos los positivos ahí
    hashtags_mas_usados: api?.hashtags_positivos ?? "",
    // Si luego quieres negativos, ya están aquí (el back lo manda con typo)
    hashtags_negativos: api?.hashtags_negavtivos ?? "",
  });

  const fetchWeeklyReportGeneral = async (week = 1) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-reporte-semanal-general`;
      const res = await axios.get(url, { params: { semana_num: week } });

      if (res.status === 200 && res.data) {
        const normalized = normalizeGeneral(res.data);
        // Tu componente espera un array y toma el [0]
        setWeeklyReportGeneral([normalized]);
      } else {
        setWeeklyReportGeneral([]);
      }
    } catch (err) {
      console.error("Error fetching weekly general report:", err);
      setError("No se pudo cargar el reporte semanal.");
      setWeeklyReportGeneral([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyReportGeneral(selectedWeek);
    }, [selectedWeek]);

  return (
    <RedesContext.Provider
      value={{
        weeklyReportGeneral,
        selectedWeek,
        setSelectedWeek,
        refetchWeeklyGeneral: fetchWeeklyReportGeneral,
        loading,
        error,
      }}
    >
      {children}
    </RedesContext.Provider>
  );
};

export const RedesContext = createContext();