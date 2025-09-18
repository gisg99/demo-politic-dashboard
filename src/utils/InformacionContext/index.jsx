import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const InformacionContext = createContext();

const InformacionProvider = ({ children }) => {
  const [resultsByMunicipality, setResultsByMunicipality] = useState([]);
  const [resultsByColonia, setResultsByColonia] = useState([]);
  const [weeklyReportCandidato, setWeeklyReportCandidato] = useState([]);
  const [weeklyReportPartido, setWeeklyReportPartido] = useState([]);
  const [weeklyReportGeneral, setWeeklyReportGeneral] = useState([]); 
  const [weeksNumbers, setWeeksNumbers] = useState([]);
  const [selectedWeek , setSelectedWeek] = useState(1);
  const [percepcion, setPercepcion] = useState([]);

  // ===== NUEVO: estado para el detalle por partido (endpoint demo) =====
  const [selectedPartidoId, setSelectedPartidoId] = useState(1);   // cámbialo desde la UI
  const [weeklyReportPartidoDemo, setWeeklyReportPartidoDemo] = useState(null);

  const fetchResultsByColonia = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/colonias-votos`);
        if (response.status === 200) {
          setResultsByColonia(response.data);
        }
    } catch (error) {
      console.error("Error fetching results by colonia:", error);
    }
  };

  const fetchResultsByMunicipality = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/total-votos-municipio`);
        if (response.status === 200) {
          setResultsByMunicipality(response.data);
        }
    } catch (error) {
      console.error("Error fetching results by municipality:", error);
    }
  };

  // -------- existentes ----------
  const fetchPercepcion = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-percepciones`);
      if( response.status === 200){
        setPercepcion(response.data);
      }
    }
    catch (error){
      console.error("error al traer las percepciones: ",error );
    }
  }

  const fetchWeeklyReportGeneral = async (week) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/reporte-semanal-general?semana_num=${week}`);
      if(response.status === 200) {
        setWeeklyReportGeneral(response.data);
      }
    } catch (error) {
      console.error("Error fetching weekly report:", error);
    }
  }

  const fetchWeeklyReportCandidato = async (week) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/reporte-semanal-candidato?semana_num=${week}`);
      if(response.status === 200) {
        setWeeklyReportCandidato(response.data);
      }
    } catch (error) {
      console.error("Error fetching weekly report:", error);
    }
  }

  const fetchNumMencionesByParties = async (week, partidoIds = []) => {
    // Devuelve: [{ id_partido, semana, num_menciones_actual }]
    if (!Array.isArray(partidoIds) || partidoIds.length === 0) return [];
    try {
        const base = `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-reporte-semanal-partido`;
        const reqs = partidoIds.map((id_partido) =>
        axios.get(base, { params: { semana_num: week, id_partido } })
            .then(r => ({ ok: true, data: r.data, id_partido }))
            .catch(() => ({ ok: false, data: null, id_partido }))
        );
        const results = await Promise.all(reqs);
        return results
        .filter(r => r.ok && r.data)
        .map(r => ({
            id_partido: Number(r.id_partido),
            semana: Number(r.data.semana) || week,
            num_menciones_actual: Number(r.data?.num_menciones?.actual) || 0
        }));
    } catch (e) {
        console.error("Error batch num_menciones:", e);
        return [];
    }
    };

  const fetchWeeklyReportPartido = async (week) => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/reporte-semanal-partido?semana_num=${week}`);
      if(response.status === 200) {
        setWeeklyReportPartido(response.data);
      }
    } catch (error) {
      console.error("Error fetching weekly report:", error);
    }
  }

  const fetchWeeksNumbers = async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/semanas`);
      if(response.status === 200) { 
        setWeeksNumbers(response.data);
      }
    } catch (error) {
      console.error("Error fetching weekly report:", error);
    }
  }

  // ===== NUEVO: normalizador + fetch del endpoint demo por partido =====
  // GET /api/v2/demo/prueba/demo-reporte-semanal-partido?semana_num=2&id_partido=2
  const normalizeWeeklyReportPartidoDemo = (api) => {
    if (!api || typeof api !== 'object') return null;

    const n = (x) => (typeof x === 'number' ? x : Number(x) || 0);

    return {
      semana: n(api.semana),
      id_partido: n(api.id_partido),

      porcentaje_aprobacion: {
        actual: n(api?.porcentaje_aprobacion?.actual),
        anterior: n(api?.porcentaje_aprobacion?.anterior),
        variacion: Number(api?.porcentaje_aprobacion?.variacion) || 0,
      },

      candidato_destacado: api?.candidato_destacado ?? null,

      aprobacion_a_favor: {
        actual: n(api?.aprobacion_a_favor?.actual),
        anterior: n(api?.aprobacion_a_favor?.anterior),
        variacion: Number(api?.aprobacion_a_favor?.variacion) || 0,
      },
      aprobacion_en_contra: {
        actual: n(api?.aprobacion_en_contra?.actual),
        anterior: n(api?.aprobacion_en_contra?.anterior),
        variacion: Number(api?.aprobacion_en_contra?.variacion) || 0,
      },
      aprobacion_neutral: {
        actual: n(api?.aprobacion_neutral?.actual),
        anterior: n(api?.aprobacion_neutral?.anterior),
        variacion: Number(api?.aprobacion_neutral?.variacion) || 0,
      },

      visualizaciones: {
        actual: n(api?.visualizaciones?.actual),
        anterior: n(api?.visualizaciones?.anterior),
        variacion: Number(api?.visualizaciones?.variacion) || 0,
      },
      alcance: {
        actual: n(api?.alcance?.actual),
        anterior: n(api?.alcance?.anterior),
        variacion: Number(api?.alcance?.variacion) || 0,
      },
      interacciones: {
        actual: n(api?.interacciones?.actual),
        anterior: n(api?.interacciones?.anterior),
        variacion: Number(api?.interacciones?.variacion) || 0,
      },

      num_menciones: {
        actual: n(api?.num_menciones?.actual),
        anterior: n(api?.num_menciones?.anterior),
      },

      menciones_positivas: {
        actual: n(api?.menciones_positivas?.actual),
        anterior: n(api?.menciones_positivas?.anterior),
        variacion: Number(api?.menciones_positivas?.variacion) || 0,
      },
      menciones_negativas: {
        actual: n(api?.menciones_negativas?.actual),
        anterior: n(api?.menciones_negativas?.anterior),
        variacion: Number(api?.menciones_negativas?.variacion) || 0,
      },

      temas_frecuentes: Array.isArray(api?.temas_frecuentes)
        ? api.temas_frecuentes.map(t => ({
            tema: t?.tema ?? '',
            menciones: n(t?.menciones)
          }))
        : [],
    };
  };

  const fetchWeeklyReportPartidoDemo = async (week, partidoId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v2/demo/prueba/demo-reporte-semanal-partido`,
        { params: { semana_num: week, id_partido: partidoId } }
      );
      if (res.status === 200 && res.data) {
        setWeeklyReportPartidoDemo(normalizeWeeklyReportPartidoDemo(res.data));
      } else {
        setWeeklyReportPartidoDemo(null);
      }
    } catch (error) {
      console.error("Error fetching demo weekly report partido:", error);
      setWeeklyReportPartidoDemo(null);
    }
  };

  // -------- efectos ----------
  useEffect(() => {
    fetchWeeklyReportCandidato(selectedWeek);
    fetchWeeklyReportPartido(selectedWeek);
    fetchWeeklyReportGeneral(selectedWeek);
    fetchPercepcion();
    fetchWeeksNumbers();
    fetchResultsByMunicipality();
    fetchResultsByColonia();
  }, [selectedWeek]);

  // NUEVO: dispara el fetch del demo cuando cambie semana o partido elegido
  useEffect(() => {
    fetchWeeklyReportPartidoDemo(selectedWeek, selectedPartidoId);
  }, [selectedWeek, selectedPartidoId]);
 
  return (
    <InformacionContext.Provider
      value={{
        // existentes
        percepcion, 
        weeklyReportCandidato,
        weeklyReportPartido,
        fetchWeeklyReportCandidato,
        fetchWeeklyReportPartido, 
        weeksNumbers,
        selectedWeek,
        setSelectedWeek,
        weeklyReportGeneral,
        setWeeklyReportCandidato,
        fetchWeeklyReportGeneral,
        fetchNumMencionesByParties,
        resultsByMunicipality,
        resultsByColonia,
        // NUEVO: expuestos para consumir en la UI
        selectedPartidoId,
        setSelectedPartidoId,
        weeklyReportPartidoDemo,
        fetchWeeklyReportPartidoDemo,
      }}
    >
      {children}
    </InformacionContext.Provider>
  )
}

export { InformacionContext, InformacionProvider }

export const useInformacion = () => {
  const context = React.useContext(InformacionContext);
  if (!context) {
    throw new Error("useInformacion must be used within an InformacionProvider");
  }
  return context;
};
