import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const InformacionContext = createContext();

const InformacionProvider = ({ children }) => {
    const [weeklyReportCandidato, setWeeklyReportCandidato] = useState([]);
    const [weeklyReportPartido, setWeeklyReportPartido] = useState([]);
    const [weeksNumbers, setWeeksNumbers] = useState([]);
    const [selectedWeek , setSelectedWeek] = useState(1);

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

    const fetchWeeklyReportPartido = async (week) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/reporte-semanal-partido?semana_num=${week}`);
            console.log(response);
            if(response.status === 200) {
                setWeeklyReportPartido(response.data);
            }
        } catch (error) {
            console.error("Error fetching weekly report:", error);
        }
    }

    const fetchWeeksNumbers = async (week) => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/analytics/semanas`);
            console.log(response);
            if(response.status === 200) { 
                setWeeksNumbers(response.data);
            }
        } catch (error) {
            console.error("Error fetching weekly report:", error);
        }
    }

    useEffect(() => {
        fetchWeeklyReportCandidato(selectedWeek);
        fetchWeeklyReportPartido(selectedWeek);
        fetchWeeksNumbers();
    }, [selectedWeek]);

    return (
        <InformacionContext.Provider value={{ weeklyReportCandidato, weeklyReportPartido, fetchWeeklyReportCandidato, fetchWeeklyReportPartido, weeksNumbers, selectedWeek, setSelectedWeek }}>
            {children}
        </InformacionContext.Provider>
    )
}

export { InformacionContext, InformacionProvider }