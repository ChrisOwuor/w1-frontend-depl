import React, { createContext, useEffect, useState } from "react";

export const CasinoContext = createContext();

export const CasinoProvider = ({ children }) => {
    const [openBetForm, setOpenBetForm] = useState(false);
    const [message, setMessage] = useState("");
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

    // Clear the message after 2 seconds
    useEffect(() => {
        console.log(message)
        if (message) {
            const timer = setTimeout(() => {
                setMessage(""); 
            }, 2500);
            
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <CasinoContext.Provider
            value={{ bet, setBet, openBetForm, setOpenBetForm, profit, message, setMessage }}
        >
            {children}
        </CasinoContext.Provider>
    );
};
