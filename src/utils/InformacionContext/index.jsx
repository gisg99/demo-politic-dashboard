import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const InformacionContext = createContext();

const InformacionProvider = ({ children }) => {
    const [weeklyReportCandidato,setWeeklyReportCandidato] = useState([]);

    const fetchWeeklyReportCandidato = async (week) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/reporte-semanal-candidato?semana_num=${week}`);
            console.log(response);
            if(response.status === 200) {
                setWeeklyReportCandidato(response.data);
            }
        } catch (error) {
            console.error("Error fetching weekly report:", error);
        }
    }

    useEffect(() => {
        fetchWeeklyReportCandidato(1);
    }, []);

    return (
        <InformacionContext.Provider value={{ weeklyReportCandidato, fetchWeeklyReportCandidato }}>
            {children}
        </InformacionContext.Provider>
    )
}

export { InformacionContext, InformacionProvider }