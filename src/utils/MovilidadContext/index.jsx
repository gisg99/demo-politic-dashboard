import React, { createContext, useEffect, useState } from "react"
import axios from "axios";

const MovilidadContext = createContext();

const MovilidadProvider = ({ children }) => {
    const [visitas, setVisitas] = useState([]);

    const fetchVisitas = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v2/prueba/movilidad/usuarios-movilidad`);
            if( response.status === 200){
                setVisitas(response.data);
            }
        }
        catch (error){
            console.error("error al traer las visitas: ",error );
        }
    }
 
    useEffect(() => {
        fetchVisitas();
    }, []);

    return (
        <MovilidadContext.Provider value={{ visitas }}>{children}
        </MovilidadContext.Provider>
    )
}

export { MovilidadContext, MovilidadProvider }