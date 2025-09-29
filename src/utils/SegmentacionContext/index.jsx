// src/utils/SegmentacionContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import axios from "axios";
import { useFilters } from "../FiltersContext";

const SegmentacionContext = createContext();

export const SegmentacionProvider = ({ children }) => {
  // =========================
  // Filtros locales mínimos (si no vienen de FiltersContext)
  // =========================
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [idCandidato, setIdCandidato] = useState(2);

  // =========================
  // Estados por dataset (raw)
  // =========================
  const [ages, setAges] = useState(null);
  const [generos, setGeneros] = useState(null);
  const [municipiosVotos, setMunicipiosVotos] = useState(null);
  const [coloniasVotos, setColoniasVotos] = useState(null);
  const [nse, setNse] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [visitasHora, setVisitasHora] = useState(null);

  // Loaders por dataset
  const [loadingAges, setLoadingAges] = useState(false);
  const [loadingGeneros, setLoadingGeneros] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [loadingColonias, setLoadingColonias] = useState(false);
  const [loadingNse, setLoadingNse] = useState(false);
  const [loadingPrefs, setLoadingPrefs] = useState(false);
  const [loadingVisitasHora, setLoadingVisitasHora] = useState(false);

  // Errores
  const [error, setError] = useState(null);
  const [errorAges, setErrorAges] = useState(null);
  const [errorGeneros, setErrorGeneros] = useState(null);
  const [errorMunicipios, setErrorMunicipios] = useState(null);
  const [errorColonias, setErrorColonias] = useState(null);
  const [errorNse, setErrorNse] = useState(null);
  const [errorPrefs, setErrorPrefs] = useState(null);
  const [errorVisitasHora, setErrorVisitasHora] = useState(null);

  // =========================
  // Filtros globales
  // =========================
  const { filters, registerFilterCallback } = useFilters();

  // Mapeo de nombres de filtros del contexto a nombres de la API
  const mapFiltersToAPI = useCallback((currentFilters) => {
    const f = currentFilters || {};
    // Fallback a locales si no vienen en FiltersContext
    const semana = f.semana ?? selectedWeek ?? 1;
    const candidato = f.id_candidato ?? idCandidato ?? 2;

    return {
      // Fechas/horas generales (por si backend las usa en algunos endpoints)
      start_date: f.start_date || "",
      end_date: f.end_date || "",
      start_hour: f.start_hour || "",
      end_hour: f.end_hour || "",
      zona: f.zona || "",
      distrito: f.distrito || "",
      demograficos: f.demograficos || "",
      intencion_voto: f.intencion_voto || "",

      // Específicos de este contexto
      semana_num: semana,
      id_candidato: candidato,
    };
  }, [selectedWeek, idCandidato]);

  // Definir campos relevantes para cada dataset (usando nombres del contexto de filtros)
  const RELEVANT_FIELDS = {
    ages: ["start_date", "end_date"],                // si tu API filtra edades por fecha
    generos: ["semana", "id_candidato"],             // mapea a semana_num & id_candidato en API
    municipios: ["start_date", "end_date"],          // ajusta según soporte real de tu endpoint
    colonias: ["start_date", "end_date"],
    nse: ["start_date", "end_date"],
    preferences: ["start_date", "end_date"],
    visitasHora: ["start_date", "end_date", "start_hour", "end_hour"],
  };

  const shouldFetchDataset = useCallback((datasetName, changedField, changedFields = []) => {
    const relevantFields = RELEVANT_FIELDS[datasetName] || [];

    // Casos especiales que siempre requieren fetch
    if (changedField === "reset") return true;

    // Para cambios múltiples, verificar si algún campo es relevante
    if (changedField === "multiple" && changedFields.length > 0) {
      return changedFields.some((field) => relevantFields.includes(field));
    }

    // Para cambios individuales
    return relevantFields.includes(changedField);
  }, []);

  // =========================
  // Fetchers (axios) — todos reciben filtros
  // =========================
  const fetchAges = useCallback(async (currentFilters) => {
    try {
      setLoadingAges(true); setErrorAges(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/usuarios/ages`,
        { params }
      );
      setAges(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching ages:", e);
      setErrorAges("No se pudieron cargar las edades.");
      setAges([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingAges(false); }
  }, [mapFiltersToAPI]);

  const fetchGeneros = useCallback(async (currentFilters) => {
    try {
      setLoadingGeneros(true); setErrorGeneros(null);
      const apiFilters = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-generos`,
        { params: { semana_num: apiFilters.semana_num, id_candidato: apiFilters.id_candidato } }
      );
      setGeneros(data || null);
    } catch (e) {
      console.error("Error fetching generos:", e);
      setErrorGeneros("No se pudo cargar la distribución por género.");
      setGeneros(null); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingGeneros(false); }
  }, [mapFiltersToAPI]);

  const fetchMunicipiosVotos = useCallback(async (currentFilters) => {
    try {
      setLoadingMunicipios(true); setErrorMunicipios(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/total-votos-municipio`,
        { params }
      );
      setMunicipiosVotos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching municipios votos:", e);
      setErrorMunicipios("No se pudieron cargar los votos por municipio.");
      setMunicipiosVotos([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingMunicipios(false); }
  }, [mapFiltersToAPI]);

  const fetchColoniasVotos = useCallback(async (currentFilters) => {
    try {
      setLoadingColonias(true); setErrorColonias(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/colonias-votos`,
        { params }
      );
      setColoniasVotos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching colonias votos:", e);
      setErrorColonias("No se pudieron cargar los votos por colonia.");
      setColoniasVotos([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingColonias(false); }
  }, [mapFiltersToAPI]);

  const fetchNse = useCallback(async (currentFilters) => {
    try {
      setLoadingNse(true); setErrorNse(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/nivel-marginacion`,
        { params }
      );
      setNse(data || null);
    } catch (e) {
      console.error("Error fetching NSE:", e);
      setErrorNse("No se pudo cargar el nivel socioeconómico.");
      setNse(null); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingNse(false); }
  }, [mapFiltersToAPI]);

  const fetchVisitasHora = useCallback(async (currentFilters) => {
    try {
      setLoadingVisitasHora(true); setErrorVisitasHora(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/visitas/visitas-filter`,
        { params }
      );
      setVisitasHora(data || null);
    } catch (e) {
      console.error("Error fetching visitas hora:", e);
      setErrorVisitasHora("No se pudo cargar el filtro de visitas.");
      setVisitasHora(null); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingVisitasHora(false); }
  }, [mapFiltersToAPI]);

  const fetchPreferences = useCallback(async (currentFilters) => {
    try {
      setLoadingPrefs(true); setErrorPrefs(null);
      const params = mapFiltersToAPI(currentFilters);
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/usuarios/preferences`,
        { params }
      );
      setPreferences(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching preferences:", e);
      setErrorPrefs("No se pudieron cargar los intereses.");
      setPreferences([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingPrefs(false); }
  }, [mapFiltersToAPI]);

  // =========================
  // useEffect 1: registrar callback de filtros (no fetch inicial aquí)
  // =========================
  useEffect(() => {
    const handleFilterChange = (newFilters, changedField, changedValue) => {
      const changedFields =
        changedField === "multiple" ? Object.keys(changedValue || {}) : [];

      const needsAges = shouldFetchDataset("ages", changedField, changedFields);
      const needsGeneros = shouldFetchDataset("generos", changedField, changedFields);
      const needsMunicipios = shouldFetchDataset("municipios", changedField, changedFields);
      const needsColonias = shouldFetchDataset("colonias", changedField, changedFields);
      const needsNse = shouldFetchDataset("nse", changedField, changedFields);
      const needsPrefs = shouldFetchDataset("preferences", changedField, changedFields);
      const needsVisitas = shouldFetchDataset("visitasHora", changedField, changedFields);

      if (needsAges) fetchAges(newFilters);
      if (needsGeneros) fetchGeneros(newFilters);
      if (needsMunicipios) fetchMunicipiosVotos(newFilters);
      if (needsColonias) fetchColoniasVotos(newFilters);
      if (needsNse) fetchNse(newFilters);
      if (needsPrefs) fetchPreferences(newFilters);
      if (needsVisitas) fetchVisitasHora(newFilters);
    };

    const unregister = registerFilterCallback(handleFilterChange);
    return unregister;
  }, [
    registerFilterCallback,
    shouldFetchDataset,
    fetchAges,
    fetchGeneros,
    fetchMunicipiosVotos,
    fetchColoniasVotos,
    fetchNse,
    fetchPreferences,
    fetchVisitasHora,
  ]);

  // =========================
  // useEffect 2: fetch inicial (una sola vez al montar)
  // =========================
  useEffect(() => {
    const f = { ...filters, semana: filters?.semana ?? selectedWeek, id_candidato: filters?.id_candidato ?? idCandidato };
    fetchAges(f);
    fetchMunicipiosVotos(f);
    fetchColoniasVotos(f);
    fetchNse(f);
    fetchPreferences(f);
    fetchVisitasHora(f);
    fetchGeneros(f); // incluye semana_num & id_candidato
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // solo una vez

  // =========================
  // Paletas y data derivada (igual que antes)
  // =========================
  const AGE_ORDER = ["18-25", "26-34", "35-44", "45-54", "55-64", "65+"];
  const PALETTE_AGE = ["#E0E0E0", "#BDBDBD", "#FFC107", "#FFB74D", "#FF9800", "#FF6B35"];

  const PALETTE_GENDER = ["#FFB74D", "#FF8A65"];

  const NSE_ORDER = ["A/B", "C+", "C", "C-", "D/E"];
  const PALETTE_NSE = ["#2E86DE", "#54A0FF", "#38B6FF", "#00CEC9", "#10AC84"];

  const PALETTE_INTERESES = ["#FF6B4D", "#FFB74D", "#FFD54F", "#FFAB91", "#FFE082", "#FF7043", "#9E9E9E"];

  const edadData = useMemo(() => {
    if (!Array.isArray(ages)) return [];
    const byLabel = Object.fromEntries(
      ages.map((it) => {
        const pct =
          typeof it.porcentaje === "string"
            ? parseFloat(it.porcentaje.replace("%", "")) || 0
            : Number(it.porcentaje) || 0;
        return [it.rango, pct];
      })
    );
    return AGE_ORDER.filter((label) => byLabel[label] != null).map((label, idx) => ({
      label,
      value: byLabel[label],
      color: PALETTE_AGE[idx % PALETTE_AGE.length],
    }));
  }, [ages]);

  const generoData = useMemo(() => {
    if (!generos) return [];
    const hombres = Number(generos.hombres) || 0;
    const mujeres = Number(generos.mujeres) || 0;
    return [
      { label: "Masculino", value: hombres, color: PALETTE_GENDER[0] },
      { label: "Femenino", value: mujeres, color: PALETTE_GENDER[1] },
    ];
  }, [generos]);

  const nivelSocioeconomicoData = useMemo(() => {
    if (!nse || !nse.porcentajeNiveles) return [];
    return NSE_ORDER.filter((label) => nse.porcentajeNiveles[label] != null).map((label, i) => ({
      label,
      value: Number(nse.porcentajeNiveles[label]) || 0,
      color: PALETTE_NSE[i % PALETTE_NSE.length],
    }));
  }, [nse]);

  const interesesData = useMemo(() => {
    if (!Array.isArray(preferences)) return [];
    const parsed = preferences.map((p) => ({
      label: p.opcion,
      count: Math.round(Number(p.porcentaje) || 0),
    }));
    parsed.sort((a, b) => b.count - a.count);
    return parsed.map((item, i) => ({
      ...item,
      color: PALETTE_INTERESES[i % PALETTE_INTERESES.length],
    }));
  }, [preferences]);

  // =========================
  // Refetchers al estilo patrón
  // =========================
  const refetchAges = useCallback(() => fetchAges(filters), [fetchAges, filters]);
  const refetchGeneros = useCallback(() => fetchGeneros(filters), [fetchGeneros, filters]);
  const refetchMunicipios = useCallback(() => fetchMunicipiosVotos(filters), [fetchMunicipiosVotos, filters]);
  const refetchColonias = useCallback(() => fetchColoniasVotos(filters), [fetchColoniasVotos, filters]);
  const refetchNse = useCallback(() => fetchNse(filters), [fetchNse, filters]);
  const refetchPreferences = useCallback(() => fetchPreferences(filters), [fetchPreferences, filters]);
  const refetchVisitasHora = useCallback(() => fetchVisitasHora(filters), [fetchVisitasHora, filters]);

  const refetchAll = useCallback(() => {
    const f = { ...filters, semana: filters?.semana ?? selectedWeek, id_candidato: filters?.id_candidato ?? idCandidato };
    fetchAges(f);
    fetchGeneros(f);
    fetchMunicipiosVotos(f);
    fetchColoniasVotos(f);
    fetchNse(f);
    fetchPreferences(f);
    fetchVisitasHora(f);
  }, [
    fetchAges,
    fetchGeneros,
    fetchMunicipiosVotos,
    fetchColoniasVotos,
    fetchNse,
    fetchPreferences,
    fetchVisitasHora,
    filters,
    selectedWeek,
    idCandidato,
  ]);

  // =========================
  // Flags y utilidades
  // =========================
  const loading =
    loadingAges ||
    loadingGeneros ||
    loadingMunicipios ||
    loadingColonias ||
    loadingNse ||
    loadingPrefs ||
    loadingVisitasHora;

  const value = {
    // Filtros locales + setters (útiles para UI; el fetch real respeta FiltersContext)
    selectedWeek, setSelectedWeek,
    idCandidato, setIdCandidato,

    // Datos crudos
    ages, generos, municipiosVotos, coloniasVotos, nse, preferences,
    visitasHora, setVisitasHora,

    // Derivados
    edadData, generoData, nivelSocioeconomicoData, interesesData,

    // Loaders & errores
    loading,
    loadingAges, loadingGeneros, loadingMunicipios, loadingColonias, loadingNse, loadingPrefs, loadingVisitasHora,
    error, errorAges, errorGeneros, errorMunicipios, errorColonias, errorNse, errorPrefs, errorVisitasHora,

    // Refetchers
    refetchAll,
    refetchAges,
    refetchGeneros,
    refetchMunicipios,
    refetchColonias,
    refetchNse,
    refetchPreferences,
    refetchVisitasHora,

    // Helpers
    hasData:
      ages !== null || generos !== null || municipiosVotos !== null ||
      coloniasVotos !== null || nse !== null || preferences !== null || visitasHora !== null,
    isEmpty:
      ages === null && generos === null && municipiosVotos === null &&
      coloniasVotos === null && nse === null && preferences === null && visitasHora === null,
    hasAges: Array.isArray(ages) && ages.length > 0,
    hasMunicipios: Array.isArray(municipiosVotos) && municipiosVotos.length > 0,
    hasColonias: Array.isArray(coloniasVotos) && coloniasVotos.length > 0,
    hasPreferences: Array.isArray(preferences) && preferences.length > 0,
  };

  return (
    <SegmentacionContext.Provider value={value}>
      {children}
    </SegmentacionContext.Provider>
  );
};

export const useSegmentacion = () => {
  const ctx = useContext(SegmentacionContext);
  if (!ctx) throw new Error("useSegmentacion must be used within a SegmentacionProvider");
  return ctx;
};
