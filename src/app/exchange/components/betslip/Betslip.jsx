"use client";
import React, { useContext, useEffect, useState } from "react";
import Bets from "./Bets";
import { MyBetsContext } from "@/app/context/MybetsContext";
import Loading from "../Loading";
import PlaceBetCasino from "./PlaceBetCasino";
import { CasinoContext } from "@/app/context/CasinoContext";
import CasinoBets from "./CasinoBets";

const ExBetslip = () => {
  const { myBets } = useContext(MyBetsContext)
  const { openBetForm, setOpenBetForm } = useContext(CasinoContext);
  const [matchedBets, setMatchedBets] = useState([])
  const [notMatchedBets, setNotMatchedBets] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {

    if (myBets.length > 0) {
      const notMatched = myBets.filter(bet => bet.status === "NOT_MATCHED" && bet.open === true)
      if (notMatched && notMatched.length > 0) {
        setNotMatchedBets(notMatched);
      }
      const matched = myBets.filter(bet => bet.status === "MATCHED" && bet.open === true)
      if (matched && matched.length > 0) {
        setMatchedBets(matched)
      }
      setLoading(false)
    } else {
      setMatchedBets([])
      setNotMatchedBets([])
      setLoading(false)
    }

  }, [myBets])


  return (
    <div className="bg-white rounded sticky top-35">

      {
        !loading && (
          <div>

            <div className="flex items-center p-2 bg-primary justify-between">
              <p className="text-sm font-semibold text-white"></p>
              <p className="text-sm font-semibold text-white">Open Bets</p>
            </div>
            <p className="text-[0.9rem] font-bold text-black p-1 bg-red-500/[0.5]">Unmatched Bets</p>
            <Bets bets={notMatchedBets} type="unmatched" />

            <p className="text-[0.9rem] font-bold text-black p-1 bg-green-500/[0.5]">Matched Bets</p>
            <Bets bets={matchedBets} type="matched" />

          </div>
        )
      }

      {loading && <Loading />}
    </div>
  );
};

export default ExBetslip;
