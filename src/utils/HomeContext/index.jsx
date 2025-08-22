import React, { createContext } from "react"

const HomeContext = createContext();

const HomeProvider = ({ children }) => {
    return (
        <HomeContext.Provider value={{}}>
            {children}
        </HomeContext.Provider>
    )
}

export { HomeContext, HomeProvider }