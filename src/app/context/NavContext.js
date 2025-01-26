import React, { createContext, useEffect, useState } from "react";

export const NAVContext = createContext();

export const NAVProvider = ({ children }) => {
    const [currentCenter, setCurrentCenter] = useState("home")
    const [newMobileNavOpen, setNewMobileNavOpen] = useState(false)
    const [accountViewOpen, setAccountViewOpen] = useState(false)

    const [activeCasino, setActiveCasino] = useState({})
    const [goToLogin, setGoToLogin] = useState(false)
    const [currentGame, setCurrentGame] = useState({url: "", source: ""})   
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
            value={{ accountViewOpen, setAccountViewOpen, newMobileNavOpen, setNewMobileNavOpen, currentCenter, setCurrentCenter, view, setView, goToLogin, setGoToLogin, activeCasino, setActiveCasino, currentGame, setCurrentGame }}
        >
            {children}
        </NAVContext.Provider>
    );
};
