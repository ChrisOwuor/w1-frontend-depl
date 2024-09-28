import { fetchUserData } from "@/app/api/exchange";
// import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const runner = async () => {
        try {
            const userData = await fetchUserData()
            if (userData) {
                setUserData(userData)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        runner()
    }, [])

    const getfreshUserData = runner()

    return (
        <UserContext.Provider value={{ userData, getfreshUserData }}>
            {children}
        </UserContext.Provider>
    );
};
