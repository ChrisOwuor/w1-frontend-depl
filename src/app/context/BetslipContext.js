import React, { createContext, useEffect, useState } from "react";

export const BetslipContext = createContext();

export const UserBetslipProvider = ({ children }) => {
  const [betslipData, setBetslipData] = useState([]);

  // Load betslip data from local storage on initial load
  useEffect(() => {
    const savedBetslip = localStorage.getItem("betslip");
    if (savedBetslip) {
      setBetslipData(JSON.parse(savedBetslip));
    }
  }, []);

  // Update betslip and store in local storage
  const updateBetslip = (newBetslip) => {
    setBetslipData(newBetslip);
    console.log(newBetslip)
    if(newBetslip.length > 0){
      localStorage.setItem("betslip", JSON.stringify(newBetslip));
    }else{
      localStorage.removeItem("betslip")
    }
  };

  return (
    <BetslipContext.Provider value={{ betslipData, updateBetslip }}>
      {children}
    </BetslipContext.Provider>
  );
};
