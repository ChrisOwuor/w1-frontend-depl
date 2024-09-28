import React, { createContext, useEffect, useState } from "react";

export const MarketBookContext = createContext();

export const MarketBookProvider = ({ children }) => {
    const [marketBook, setMarketBook] = useState({});

    useEffect(() => {
        if (marketBook) {
            localStorage.setItem("mktbk", JSON.stringify(marketBook));
        }
    }, [marketBook]);

    return (
        <MarketBookContext.Provider value={{ marketBook, setMarketBook }}>
            {children}
        </MarketBookContext.Provider>
    );
};
