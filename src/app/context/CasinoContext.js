import React, { createContext, useEffect, useState } from "react";

export const CasinoContext = createContext();

export const CasinoProvider = ({ children }) => {
    const [openBetForm, setOpenBetForm] = useState(false);
    const [bet, setBet] = useState({
        selection: "",
        round_id: "",
        casino_id: "",
        rate: 0,
        stack: 0
    });
    const [profit, setProfit] = useState(0);

    // Calculate profit whenever bet.rate or bet.stack changes
    useEffect(() => {
        const calculatedProfit = (parseFloat(bet.rate || 0) * parseFloat(bet.stack || 0)).toFixed(2);
        setProfit(calculatedProfit);
    }, [bet.rate, bet.stack]);

    return (
        <CasinoContext.Provider
            value={{ bet, setBet, openBetForm, setOpenBetForm, profit }}
        >
            {children}
        </CasinoContext.Provider>
    );
};
