import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RedesProvider = ({ children }) => {
  const [weeklyReportGeneral, setWeeklyReportGeneral] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1); // default semana 1
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState(null);

  // --- NUEVO: estado para partidos promedio ---
  const [partidosPromedio, setPartidosPromedio] = useState([]);

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

  // --- NUEVO: normalizador y fetch para /promedio-partido ---
  // API devuelve:
  // [
  //   { "pan": 29.75, "pri": 15.88, "morena": 54.35 }
  // ]
  const normalizePartidosPromedio = (dataArr) => {
    const item = Array.isArray(dataArr) ? dataArr[0] : dataArr;
    const pan    = Number(item?.pan)    || 0;
    const pri    = Number(item?.pri)    || 0;
    const morena = Number(item?.morena) || 0;

    // Colores típicos por partido (puedes cambiarlos si prefieres tu paleta):
    return [
      { label: 'PAN',    value: pan,    color: '#0055A4' }, // azul PAN
      { label: 'PRI',    value: pri,    color: '#006847' }, // verde PRI
      { label: 'Morena', value: morena, color: '#A50021' }, // guinda Morena
    ];
  };

  const fetchPartidosPromedio = async () => {
    try {
      const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/promedio-partido`;
      const res = await axios.get(url);
      if (res.status === 200 && res.data) {
        setPartidosPromedio(normalizePartidosPromedio(res.data));
      } else {
        setPartidosPromedio([]);
      }
    } catch (err) {
      console.error("Error fetching partidos promedio:", err);
      // No propagamos a error global para no bloquear la pantalla completa
      setPartidosPromedio([]);
    }
  };

  useEffect(() => {
    // Reporte semanal depende de selectedWeek
    fetchWeeklyReportGeneral(selectedWeek);
    // Partidos promedio: si luego quieres por semana, pásale el week.
    fetchPartidosPromedio();
  }, [selectedWeek]);

  return (
    <RedesContext.Provider
      value={{
        weeklyReportGeneral,
        selectedWeek,
        setSelectedWeek,
        refetchWeeklyGeneral: fetchWeeklyReportGeneral,
        // --- NUEVO: exponer partidos promedio y su refetch ---
        partidosPromedio,
        refetchPartidosPromedio: fetchPartidosPromedio,
        loading,
        error,
      }}
    >
      {children}
    </RedesContext.Provider>
  );
};

export const RedesContext = createContext();
