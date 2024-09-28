import React, { createContext, useEffect, useState } from "react";

export const CompetitionContext = createContext();

export const CompetitionProvider = ({ children }) => {
  const [currentCompetition, setCurrentCompetition] = useState("All");
  const [curCompObj, setCurCompObj] = useState({
    sportName: "",
    compObj: {}
  });
  const [currentMkt, setCurrentMkt] = useState({
    mkt_name: "Popular",
    mkt_id: ""
  })

  useEffect(() => {
    const cached = localStorage.getItem("curCompObj")
    if (cached) {
      const curCompObj_ = JSON.parse(cached)
      setCurCompObj(curCompObj_)
    }
  }, [])


  useEffect(() => {
    if (curCompObj.sportName != "") {
      localStorage.setItem("curCompObj", JSON.stringify(curCompObj))
    }
  }, [curCompObj])

  useEffect(() => {
    // console.log(currentCompetition)
    if (currentCompetition) {
      localStorage.setItem("currentCompetition", currentCompetition);
    }
  }, [currentCompetition]);

  return (
    <CompetitionContext.Provider value={{ currentCompetition, setCurrentCompetition, curCompObj, setCurCompObj, currentMkt, setCurrentMkt }}>
      {children}
    </CompetitionContext.Provider>
  );
};
