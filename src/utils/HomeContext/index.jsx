import React, { createContext , useState} from "react"
import axios from "axios";
import { useFilters } from "../FiltersContext";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const { filters, registerFilterCallback } = useFilters();
    return (
        <HomeContext.Provider value={{}}>
            {children}
        </HomeContext.Provider>
    )
}

export { HomeContext, HomeProvider }