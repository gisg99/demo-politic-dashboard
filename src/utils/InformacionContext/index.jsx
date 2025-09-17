import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const InformacionContext = createContext();

const InformacionProvider = ({ children }) => {
    const [weeklyReportCandidato, setWeeklyReportCandidato] = useState([]);
    const [weeklyReportPartido, setWeeklyReportPartido] = useState([]);
    const [weeklyReportGeneral, setWeeklyReportGeneral] = useState([]); 
    const [weeksNumbers, setWeeksNumbers] = useState([]);
    const [selectedWeek , setSelectedWeek] = useState(1);
    const [percepcion, setPercepcion] = useState([]);



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
            // console.log(response);
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
            // console.log(response);
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
            // console.log(response);
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
            // console.log(response);
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
        fetchWeeklyReportGeneral(selectedWeek);
        fetchPercepcion();
        fetchWeeksNumbers();
    }, [selectedWeek]);

    return (
        <InformacionContext.Provider value={{ percepcion, weeklyReportCandidato, weeklyReportPartido, fetchWeeklyReportCandidato, fetchWeeklyReportPartido, weeksNumbers, selectedWeek, setSelectedWeek, weeklyReportGeneral, setWeeklyReportCandidato, fetchWeeklyReportGeneral }}>
            {children}
        </InformacionContext.Provider>
    )
}

export { InformacionContext, InformacionProvider }