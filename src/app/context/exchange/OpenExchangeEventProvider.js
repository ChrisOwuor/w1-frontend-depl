import React, { createContext, useEffect, useState } from "react";

export const ExchangeOpenEventContext = createContext();

export const OpenExchangeEventProvider = ({ children }) => {
  const [eventOpen, setEventOpen] = useState(false);

  useEffect(() => {
    if (eventOpen) {
      localStorage.setItem("eventOpen", true);
    }
  }, [eventOpen]);

  return (
    <ExchangeOpenEventContext.Provider value={{ eventOpen, setEventOpen }}>
      {children}
    </ExchangeOpenEventContext.Provider>
  );
};
