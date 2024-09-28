import React, { createContext, useEffect, useState } from "react";

export const OpenEventContext = createContext();

export const OpenEventProvider = ({ children }) => {
  const [eventOpen, setEventOpen] = useState(false);

  useEffect(() => {
    if (eventOpen) {
      localStorage.setItem("eventOpen", true);
    }
  }, [eventOpen]);

  return (
    <OpenEventContext.Provider value={{ eventOpen, setEventOpen }}>
      {children}
    </OpenEventContext.Provider>
  );
};
