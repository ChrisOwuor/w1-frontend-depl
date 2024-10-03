import React, { createContext, useEffect, useState } from "react";

export const NAVContext = createContext();

export const NAVProvider = ({ children }) => {
    const [currentCenter, setCurrentCenter] = useState("home")
    const [goToLogin, setGoToLogin] = useState(false)
    const [view, setView] = useState({
        currentView: "",
        sideBarShow: true,
        from: "/",
        sportName: "",
        sportId: "",
        competitionName: "",
        competitionId: "",
        eventName: "",
        eventId: "",
        competitionRegion: "",
        showCompetition: false
    })

    return (
        <NAVContext.Provider
            value={{ currentCenter, setCurrentCenter, view, setView, goToLogin, setGoToLogin }}
        >
            {children}
        </NAVContext.Provider>
    );
};
