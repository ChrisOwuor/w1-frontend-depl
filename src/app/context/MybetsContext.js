import React, { createContext, useEffect, useState } from "react";
import { sendHttpRequest } from "../api/ship_yard/sender";

export const MyBetsContext = createContext();


export const MyBetsProvider = ({ children }) => {
  const [myBets, setMyBets] = useState("")

  const getMyBetsFresh = async (evId) => {
    try {
      const res = await sendHttpRequest("/bets/getUserBets", "post", { match_id: evId })
      if (res && res.status === 200) {
        if (res.data.bets.length > 0) {
          setMyBets(res.data.bets)
        } else {
          setMyBets([])
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <MyBetsContext.Provider
      value={{ myBets, getMyBetsFresh }}
    >
      {children}
    </MyBetsContext.Provider>
  );
};
