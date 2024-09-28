import React, { createContext, useEffect, useState } from "react";

export const MarketsContext = createContext();

export const MarketsProvider = ({ children }) => {
    const [markets, setMarkets] = useState({});

    useEffect(() => {
        if (markets) {
            localStorage.setItem("mkts", JSON.stringify(markets));
        }
    }, [markets]);

    return (
        <MarketsContext.Provider value={{ markets, setMarkets }}>
            {children}
        </MarketsContext.Provider>
    );
};
