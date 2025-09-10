import React, { createContext , useState} from "react"
import axios from "axios";

const HomeContext = createContext();

const HomeProvider = ({ children }) => {

    return (
        <HomeContext.Provider value={{}}>
            {children}
        </HomeContext.Provider>
    )
}

export { HomeContext, HomeProvider }