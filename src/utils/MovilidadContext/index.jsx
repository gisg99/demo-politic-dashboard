import React, { createContext, useCallback, useEffect, useState } from "react"
import axios from "axios";
import { useFilters } from "../FiltersContext";

const MovilidadContext = createContext();

const MovilidadProvider = ({ children }) => {
    const [visitas, setVisitas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [loadingVisitas, setLoadingVisitas] = useState(false);
    const [loadingHorarios, setLoadingHorarios] = useState(false);

    const { filters, registerFilterCallback } = useFilters();

    const RELEVANT_FIELDS = {
        visitas: ['start_date', 'end_date'],
        horarios: ['start_hour', 'end_hour', 'start_date', 'end_date']
    }

    const fetchVisitas = useCallback(async (currentFilters) => {
        try{
            setLoadingVisitas(true);
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/movilidad/visitas`, { params: currentFilters });
            if( response.status === 200){
                setVisitas(response.data);
            }
        }
        catch (error){
            console.error("error al traer las visitas: ",error );
        }
        finally {
            setLoadingVisitas(false);
        }
    }, []);

    const fetchHorarios = useCallback(async (currentFilters) => {
        try{
            setLoadingHorarios(true);
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/visitas/visitas-filter`, { params: currentFilters });
            if( response.status === 200){
                setHorarios(response.data);
                console.log("horarios", response.data);
            }
        }
        catch (error){
            console.error("error al traer los horarios: ",error );
        }
        finally {
            setLoadingHorarios(false);
        }
    }, []);

    const shouldFetchData = useCallback((datasetName, changedField, changedFields = []) => {
        const relevantFields = RELEVANT_FIELDS[datasetName];
        if (changedField === 'reset' || changedField === 'multiple') {
            return true;
        }
        if(changedField === 'multiple' && changedFields.length > 0){
            return changedFields.some(field => relevantFields.includes(field));
        }

        return relevantFields.includes(changedField);
    }, []);

    useEffect(() => {
        const handleFilterChange = (newFilters, changedField, changedValue) => {
            const changedFields = changedField === 'multiple' ? Object.keys(changedValue || {}) : [];

            const needVisitasUpdate = shouldFetchData('visitas', changedField, changedFields);
            const needHorariosUpdate = shouldFetchData('horarios', changedField, changedFields);

            if(needVisitasUpdate){
                fetchVisitas(newFilters);
            }
            if(needHorariosUpdate){
                fetchHorarios(newFilters);
            }
            
            const unregister = registerFilterCallback(handleFilterChange);

            const hasActiveFilters = Object.values(newFilters).some(value => value !== '' && value !== null);
            if(!hasActiveFilters){
                setVisitas([]);
                setHorarios([]);
            }

            return unregister;
        }, [fetchVisitas, fetchHorarios, shouldFetchData, registerFilterCallback]);

        const unregister = registerFilterCallback(handleFilterChange);

        if(Object.values(filters).some(value => value !== '')){
            fetchVisitas(filters);
            fetchHorarios(filters);
        }

        return unregister;
    }, [registerFilterCallback, fetchVisitas, fetchHorarios, filters, shouldFetchDataset]);

    const refetchVisitas = useCallback(() => fetchVisitas(filters), [fetchVisitas, filters]);
    const refetchHorarios = useCallback(() => fetchHorarios(filters), [fetchHorarios, filters]);
    const refetchAll = useCallback(() => {
        refetchVisitas();
        refetchHorarios();
    }, [fetchVisitas, fetchHorarios, filters]);

    const value = {
        visitas,
        horarios,
        loadingVisitas,
        loadingHorarios,
        loading: loadingVisitas || loadingHorarios,

        refetchVisitas,
        refetchHorarios,
        refetchAll,

        hasData: visitas !== null || horarios !== null,
        isEmpty: (visitas && visitas.length === 0) && (horarios && horarios.length === 0)
    };

    return (
        <MovilidadContext.Provider value={{ visitas, horarios }}>
            {children}
        </MovilidadContext.Provider>
    )
}

export { MovilidadContext, MovilidadProvider }