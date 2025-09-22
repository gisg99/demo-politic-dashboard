// src/utils/SegmentacionContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import axios from "axios";

const SegmentacionContext = createContext();

export const SegmentacionProvider = ({ children }) => {
  // =========================
  // Filtros locales mínimos
  // =========================
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [idCandidato, setIdCandidato] = useState(2);

  // =========================
  // States por dataset
  // =========================
  const [ages, setAges] = useState(null);
  const [generos, setGeneros] = useState(null);
  const [municipiosVotos, setMunicipiosVotos] = useState(null);
  const [coloniasVotos, setColoniasVotos] = useState(null);
  const [nse, setNse] = useState(null);
  const [preferences, setPreferences] = useState(null); // <-- NUEVO (intereses)

  // Loaders por dataset
  const [loadingAges, setLoadingAges] = useState(false);
  const [loadingGeneros, setLoadingGeneros] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [loadingColonias, setLoadingColonias] = useState(false);
  const [loadingNse, setLoadingNse] = useState(false);
  const [loadingPrefs, setLoadingPrefs] = useState(false); // <-- NUEVO

  // Errores
  const [error, setError] = useState(null);
  const [errorAges, setErrorAges] = useState(null);
  const [errorGeneros, setErrorGeneros] = useState(null);
  const [errorMunicipios, setErrorMunicipios] = useState(null);
  const [errorColonias, setErrorColonias] = useState(null);
  const [errorNse, setErrorNse] = useState(null);
  const [errorPrefs, setErrorPrefs] = useState(null); // <-- NUEVO

  // =========================
  // Fetchers (axios)
  // =========================
  const fetchAges = useCallback(async () => {
    try {
      setLoadingAges(true); setErrorAges(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/usuarios/ages`);
      setAges(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching ages:", e);
      setErrorAges("No se pudieron cargar las edades.");
      setAges([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingAges(false); }
  }, []);

  const fetchGeneros = useCallback(async (semana, candidato) => {
    try {
      setLoadingGeneros(true); setErrorGeneros(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/demo/prueba/demo-generos`, {
        params: { semana_num: semana, id_candidato: candidato },
      });
      setGeneros(data || null);
    } catch (e) {
      console.error("Error fetching generos:", e);
      setErrorGeneros("No se pudo cargar la distribución por género.");
      setGeneros(null); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingGeneros(false); }
  }, []);

  const fetchMunicipiosVotos = useCallback(async () => {
    try {
      setLoadingMunicipios(true); setErrorMunicipios(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/demo/prueba/total-votos-municipio`);
      setMunicipiosVotos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching municipios votos:", e);
      setErrorMunicipios("No se pudieron cargar los votos por municipio.");
      setMunicipiosVotos([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingMunicipios(false); }
  }, []);

  const fetchColoniasVotos = useCallback(async () => {
    try {
      setLoadingColonias(true); setErrorColonias(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/demo/prueba/colonias-votos`);
      setColoniasVotos(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching colonias votos:", e);
      setErrorColonias("No se pudieron cargar los votos por colonia.");
      setColoniasVotos([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingColonias(false); }
  }, []);

  const fetchNse = useCallback(async () => {
    try {
      setLoadingNse(true); setErrorNse(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/demo/prueba/nivel-marginacion`);
      setNse(data || null);
    } catch (e) {
      console.error("Error fetching NSE:", e);
      setErrorNse("No se pudo cargar el nivel socioeconómico.");
      setNse(null); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingNse(false); }
  }, []);

  // <-- NUEVO: Intereses / Preferences
  const fetchPreferences = useCallback(async () => {
    try {
      setLoadingPrefs(true); setErrorPrefs(null);
      const { data } = await axios.get(`http://localhost:4000/api/v2/usuarios/preferences`);
      // data esperado: [{ opcion: "Cultura", porcentaje: "47.83" }, ...]
      setPreferences(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error fetching preferences:", e);
      setErrorPrefs("No se pudieron cargar los intereses.");
      setPreferences([]); setError("Ocurrió un problema al actualizar Segmentación.");
    } finally { setLoadingPrefs(false); }
  }, []);

  // =========================
  // Paletas (para NSE/Género/Edad ya vistas)
  // =========================
  const AGE_ORDER = ['18-25','26-34','35-44','45-54','55-64','65+'];
  const PALETTE_AGE = ['#E0E0E0','#BDBDBD','#FFC107','#FFB74D','#FF9800','#FF6B35'];

  const PALETTE_GENDER = ['#FFB74D','#FF8A65'];

  const NSE_ORDER = ['A/B','C+','C','C-','D/E'];
  const PALETTE_NSE = ['#2E86DE','#54A0FF','#38B6FF','#00CEC9','#10AC84'];

  // =========================
  // Derivados para gráficos (con color)
  // =========================
  const edadData = useMemo(() => {
    if (!Array.isArray(ages)) return [];
    const byLabel = Object.fromEntries(
      ages.map(it => {
        const pct = typeof it.porcentaje === 'string'
          ? parseFloat(it.porcentaje.replace('%','')) || 0
          : Number(it.porcentaje) || 0;
        return [it.rango, pct];
      })
    );
    return AGE_ORDER
      .filter(label => byLabel[label] != null)
      .map((label, idx) => ({
        label,
        value: byLabel[label],
        color: PALETTE_AGE[idx % PALETTE_AGE.length]
      }));
  }, [ages]);

  const generoData = useMemo(() => {
    if (!generos) return [];
    const hombres = Number(generos.hombres) || 0;
    const mujeres = Number(generos.mujeres) || 0;
    return [
      { label: 'Masculino', value: hombres, color: PALETTE_GENDER[0] },
      { label: 'Femenino',  value: mujeres, color: PALETTE_GENDER[1] },
    ];
  }, [generos]);

  const nivelSocioeconomicoData = useMemo(() => {
    if (!nse || !nse.porcentajeNiveles) return [];
    return NSE_ORDER
      .filter(label => nse.porcentajeNiveles[label] != null)
      .map((label, i) => ({
        label,
        value: Number(nse.porcentajeNiveles[label]) || 0,
        color: PALETTE_NSE[i % PALETTE_NSE.length]
      }));
  }, [nse]);

  // <-- NUEVO: Derivado de intereses para el UI de barras
  // formateo: [{label, count, color}]
  const PALETTE_INTERESES = ['#FF6B4D','#FFB74D','#FFD54F','#FFAB91','#FFE082','#FF7043','#9E9E9E'];
  const interesesData = useMemo(() => {
    if (!Array.isArray(preferences)) return [];
    // Normalizar/ordenar desc por porcentaje
    const parsed = preferences.map((p) => ({
      label: p.opcion,
      count: Math.round(Number(p.porcentaje) || 0), // entero para tu barra "count%"
    }));
    parsed.sort((a,b) => b.count - a.count);
    // colorear (opcional, aunque tu barra usa getColor)
    return parsed.map((item, i) => ({
      ...item,
      color: PALETTE_INTERESES[i % PALETTE_INTERESES.length],
    }));
  }, [preferences]);

  // =========================
  // Fetch inicial y re-fetch por cambios
  // =========================
  useEffect(() => {
    fetchAges();
    fetchMunicipiosVotos();
    fetchColoniasVotos();
    fetchNse();
    fetchPreferences(); // <-- NUEVO
  }, [fetchAges, fetchMunicipiosVotos, fetchColoniasVotos, fetchNse, fetchPreferences]);

  useEffect(() => {
    fetchGeneros(selectedWeek, idCandidato);
  }, [selectedWeek, idCandidato, fetchGeneros]);

  // =========================
  // Helpers de refetch y flags
  // =========================
  const refetchAll = useCallback(() => {
    fetchAges();
    fetchGeneros(selectedWeek, idCandidato);
    fetchMunicipiosVotos();
    fetchColoniasVotos();
    fetchNse();
    fetchPreferences();
  }, [fetchAges, fetchGeneros, fetchMunicipiosVotos, fetchColoniasVotos, fetchNse, fetchPreferences, selectedWeek, idCandidato]);

  const loading =
    loadingAges ||
    loadingGeneros ||
    loadingMunicipios ||
    loadingColonias ||
    loadingNse ||
    loadingPrefs; // <-- NUEVO

  const value = {
    // Filtros
    selectedWeek, setSelectedWeek,
    idCandidato, setIdCandidato,

    // Raw data
    ages, generos, municipiosVotos, coloniasVotos, nse, preferences,

    // Derivados
    edadData, generoData, nivelSocioeconomicoData, interesesData, // <-- NUEVO

    // Loaders & errores
    loading,
    loadingAges, loadingGeneros, loadingMunicipios, loadingColonias, loadingNse, loadingPrefs,
    error, errorAges, errorGeneros, errorMunicipios, errorColonias, errorNse, errorPrefs,

    // Refetch
    refetchAll,
    refetchAges: fetchAges,
    refetchGeneros: () => fetchGeneros(selectedWeek, idCandidato),
    refetchMunicipios: fetchMunicipiosVotos,
    refetchColonias: fetchColoniasVotos,
    refetchNse: fetchNse,
    refetchPreferences: fetchPreferences, // <-- NUEVO
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
