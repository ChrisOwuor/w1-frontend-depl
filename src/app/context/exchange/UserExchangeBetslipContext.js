import React, { createContext, useEffect, useState } from "react";

export const ExchangeBetslipContext = createContext();

export const UserExchangeBetslipProvider = ({ children }) => {
  const [positionData, setPositionData] = useState([]);

  // Load ex_betslip data from local storage on initial load
  useEffect(() => {
    const savedBetslip = localStorage.getItem("ex_betslip");

    if (savedBetslip) {
      setPositionData(JSON.parse(savedBetslip));
    }
  }, []);


  // Update ex_betslip and store in local storage
  const updateBetslip = (operation, newBetslip) => {
    if(operation === "add"){
      const updatedBetslip = [...positionData, ...newBetslip];
      setPositionData(updatedBetslip);
  
      if (updatedBetslip.length > 0) {
        localStorage.setItem("ex_betslip", JSON.stringify(updatedBetslip));
      } else {
        localStorage.removeItem("ex_betslip");
      }
    }
    if(operation === "del"){
      // const updatedBetslip = [...positionData, ...newBetslip];
      // setPositionData(updatedBetslip);
  
      // if (updatedBetslip.length > 0) {
      //   localStorage.setItem("ex_betslip", JSON.stringify(updatedBetslip));
      // } else {
      //   localStorage.removeItem("ex_betslip");
      // }
    }
    
  };

  return (
    <ExchangeBetslipContext.Provider value={{ positionData, updateBetslip }}>
      {children}
    </ExchangeBetslipContext.Provider>
  );
};
