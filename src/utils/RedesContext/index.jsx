import React, { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useFilters } from "../FiltersContext";

export const RedesContext = createContext();

export const RedesProvider = ({ children }) => {
  const [weeklyReportGeneral, setWeeklyReportGeneral] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1); // default semana 1
  const [error, setError] = useState(null);

  // Loading por dataset + combinado
  const [loadingGeneral, setLoadingGeneral] = useState(false);
  const [loadingPromedio, setLoadingPromedio] = useState(false);

  // --- Partidos promedio (para el CircleChart de la columna derecha) ---
  const [partidosPromedio, setPartidosPromedio] = useState([]);

  // ==== Filtros compartidos ====
  const { filters, registerFilterCallback } = useFilters();

  // Mapea filtros del contexto a la API (mismo que en Movilidad)
  const mapFiltersToAPI = useCallback((f) => {
    return {
      start_date: f?.start_date || "",
      end_date: f?.end_date || "",
      start_hour: f?.start_hour || "",
      end_hour: f?.end_hour || "",
      zona: f?.zona || "",
      distrito: f?.distrito || "",
      demograficos: f?.demograficos || "",
      intencion_voto: f?.intencion_voto || "",
    };
  }, []);

  // Campos relevantes por dataset (usa nombres del contexto)
  const RELEVANT_FIELDS = {
    // Para el reporte general semanal, típicamente fecha/hora afectan los datos
    general: ["start_date", "end_date", "start_hour", "end_hour", "zona", "distrito", "demograficos", "intencion_voto"],
    // Para el promedio de partidos: si tu backend NO filtra, déjalo vacío.
    promedio: [], // si más adelante filtra por fechas, añade los campos aquí
  };

  const shouldFetchDataset = useCallback((datasetName, changedField, changedFields = []) => {
    const relevantFields = RELEVANT_FIELDS[datasetName] || [];

    if (changedField === "reset") return true;

    if (changedField === "multiple" && changedFields.length > 0) {
      return changedFields.some((field) => relevantFields.includes(field));
    }

    return relevantFields.includes(changedField);
  }, []);

  // =================== Fetchers ===================

  // Normaliza la respuesta del back al shape que ya usa tu UI
  const normalizeGeneral = (api) => ({
    semana: Number(api?.semana) || 1,
    mencion_mas_frecuente: api?.mencion_mas_frecuente ?? null,
    plataformas_mas_usadas: api?.plataformas_mas_usadas ?? "",
    temas_frecuentes: Array.isArray(api?.temas_frecuentes) ? api.temas_frecuentes : [],

    porcentaje_felicidad: Number(api?.sentimiento?.felicidad) || 0,

    aprobacion_a_favor: Number(api?.aprobacion_a_favor?.actual) || 0,
    aprobacion_en_contra: Number(api?.aprobacion_en_contra?.actual) || 0,
    aprobacion_neutral: Number(api?.aprobacion_neutral?.actual) || 0,

    hashtags_mas_usados: api?.hashtags_positivos ?? "",
    hashtags_negativos: api?.hashtags_negavtivos ?? "",
  });

  const fetchWeeklyReportGeneral = useCallback(
    async (currentFilters) => {
      const week = Number(selectedWeek) || 1;
      setLoadingGeneral(true);
      setError(null);
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-reporte-semanal-general`;

        // Pasamos semana + filtros (si el back los ignora, no afecta)
        const params = { semana_num: week, ...mapFiltersToAPI(currentFilters || {}) };
        const res = await axios.get(url, { params });

        if (res.status === 200 && res.data) {
          const normalized = normalizeGeneral(res.data);
          setWeeklyReportGeneral([normalized]); // tu UI toma el [0]
        } else {
          setWeeklyReportGeneral([]);
        }
      } catch (err) {
        console.error("Error fetching weekly general report:", err);
        setError("No se pudo cargar el reporte semanal.");
        setWeeklyReportGeneral([]);
      } finally {
        setLoadingGeneral(false);
      }
    },
    [selectedWeek, mapFiltersToAPI]
  );

  // --- Normalizador y fetch para /promedio-partido ---
  const normalizePartidosPromedio = (dataArr) => {
    const item = Array.isArray(dataArr) ? dataArr[0] : dataArr;
    const pan = Number(item?.pan) || 0;
    const pri = Number(item?.pri) || 0;
    const morena = Number(item?.morena) || 0;

    return [
      { label: "PAN", value: pan, color: "#0055A4" },
      { label: "PRI", value: pri, color: "#006847" },
      { label: "Morena", value: morena, color: "#A50021" },
    ];
  };

  const fetchPartidosPromedio = useCallback(
    async (currentFilters) => {
      setLoadingPromedio(true);
      try {
        const url = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/promedio-partido`;
        // Si el endpoint luego acepta filtros, los pasamos ya listos:
        const params = { ...mapFiltersToAPI(currentFilters || {}) };
        const res = await axios.get(url, { params });

        if (res.status === 200 && res.data) {
          setPartidosPromedio(normalizePartidosPromedio(res.data));
        } else {
          setPartidosPromedio([]);
        }
      } catch (err) {
        console.error("Error fetching partidos promedio:", err);
        setPartidosPromedio([]);
      } finally {
        setLoadingPromedio(false);
      }
    },
    [mapFiltersToAPI]
  );

  // =================== Registro de filtros ===================

  // Registra el callback que reacciona a cambios de filtros
  useEffect(() => {
    const handleFilterChange = (newFilters, changedField, changedValue) => {
      const changedFields = changedField === "multiple" ? Object.keys(changedValue || {}) : [];

      const needsGeneral = shouldFetchDataset("general", changedField, changedFields);
      const needsProm = shouldFetchDataset("promedio", changedField, changedFields);

      if (needsGeneral) fetchWeeklyReportGeneral(newFilters);
      if (needsProm) fetchPartidosPromedio(newFilters);
    };

    const unregister = registerFilterCallback(handleFilterChange);
    return unregister;
  }, [registerFilterCallback, shouldFetchDataset, fetchWeeklyReportGeneral, fetchPartidosPromedio]);

  // Fetch inicial (una vez montado)
  useEffect(() => {
    fetchWeeklyReportGeneral(filters);
    fetchPartidosPromedio(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intencionalmente vacío: solo una vez

  // Cuando cambie la semana seleccionada, vuelve a pedir el general con filtros actuales
  useEffect(() => {
    fetchWeeklyReportGeneral(filters);
  }, [selectedWeek]); // eslint-disable-line react-hooks/exhaustive-deps

  // Helpers de refetch manual
  const refetchWeeklyGeneral = useCallback(() => fetchWeeklyReportGeneral(filters), [fetchWeeklyReportGeneral, filters]);
  const refetchPartidosPromedio = useCallback(() => fetchPartidosPromedio(filters), [fetchPartidosPromedio, filters]);

  const value = {
    // Data
    weeklyReportGeneral,
    partidosPromedio,

    // Semana
    selectedWeek,
    setSelectedWeek,

    // Loading
    loadingGeneral,
    loadingPromedio,
    loading: loadingGeneral || loadingPromedio,

    // Error
    error,

    // Refetchers
    refetchWeeklyGeneral,
    refetchPartidosPromedio,
  };

  return <RedesContext.Provider value={value}>{children}</RedesContext.Provider>;
};
