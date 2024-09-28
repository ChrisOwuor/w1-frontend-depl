"use client";
import React, { useContext, useEffect, useState } from "react";
import { BetslipContext } from "src/app/context/BetslipContext";
import axios from "axios";
import { formatUnixTimestamp } from "../funcStore/editTime";
import { handleMarkets } from "./miniFuncStore/sendToMarkets";
import VolleyballOddDisplay from "./components/VolleyballOddDisplay";

export default function Volleyball() {
  const [games, setGames] = useState([]);
  const { betslipData, updateBetslip } = useContext(BetslipContext);

  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/volleyball`
      );
      if (res) {
        console.log("rrrrrrrrrrrrrrrrrr");
        console.log(res.data.eventsData);
        if (res.data.eventsData) {
          setLoading(false);
          setGames(res.data.eventsData);
        } else {
          setLoading(false);
          setGames([]);
        }
      }
    } catch (error) {
      console.log(error);
      setGames([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    setBetslip(betslipData);
    console.log(betslipData);
  }, [betslipData]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const addToBetslip = (event_id, selection, odds, game) => {
    const updatedBetslip = [...betslip];

    const existingBetIndex = updatedBetslip.findIndex(
      (bet) => bet.event_id === event_id
    );

    if (existingBetIndex !== -1) {
      // If the selection is the same as the one in the betslip, remove it
      if (updatedBetslip[existingBetIndex].selection === selection) {
        updatedBetslip.splice(existingBetIndex, 1);
        setSelectedOdds((prevSelectedOdds) => ({
          ...prevSelectedOdds,
          [event_id]: "no-highlight", // Remove the highlight
        }));
      } else {
        // Update the existing bet with new selection and odds
        updatedBetslip[existingBetIndex].selection = selection;
        updatedBetslip[existingBetIndex].odds = odds;
        setSelectedOdds((prevSelectedOdds) => ({
          ...prevSelectedOdds,
          [event_id]: selection, // Highlight the event
        }));
      }
    } else {
      // Add a new bet to the betslip
      updatedBetslip.push({
        event_id: game.eventD.id,
        home: game.eventD.home.name,
        away: game.eventD.away.name,
        date: formatUnixTimestamp(game.eventD.time),
        selection,
        odds,
      });
      setSelectedOdds((prevSelectedOdds) => ({
        ...prevSelectedOdds,
        [event_id]: selection, // Highlight the event
      }));
    }

    setBetslip(updatedBetslip);
    updateBetslip(updatedBetslip);
  };

  const getSelectionFromBetslip = (event_id) => {
    const dd = localStorage.getItem("betslip");
    if (dd) {
      const ddd = JSON.parse(dd);
      const bet = ddd.find((bet) => bet.event_id === event_id);
      return bet ? bet.selection : "false";
    } else {
      return "false";
    }
  };

  return (
    <div className="">
      <div className="grid grid-col-1 rounded">
        {/* top bar */}
        {games.length > 0 && (
          <div className="py-4 px-2 col-span-1 flex justify-between items-center">
            <div className="flex justify-center text-black font-semibold texl-md">
              <p className="text-[0.7rem] text-center text-black">Teams</p>
            </div>
            <div className="grid grid-cols-3 w-[50%] text-black font-semibold cursor-pointer">
              <div className="text-[0.7rem] text-center text-black">
                <p>To Win</p>
              </div>

              <div className=" text-[0.7rem] text-center text-black">
                <p>Handicap - sets</p>
              </div>

              <div className=" text-[0.7rem] text-center text-black">
                <p>Total Points</p>
              </div>
            </div>
          </div>
        )}
        {/* end top bar */}

        {loading ? (
          <div className="min-h-[80vh] flex justify-center items-center">
            <div className="flex justify-center items-center">
              <svg
                className="mr-3 h-5 w-5 animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-black">Loading</p>
            </div>
          </div>
        ) : games.length > 0 ? (
          games.map((game, gameIndex) => {
            if (game.event_odds.odds.game_lines.odds.length === 6) {
              return (
                <div key={gameIndex}>
                  <VolleyballOddDisplay
                    game={game}
                    getSelectionFromBetslip={getSelectionFromBetslip}
                    addToBetslip={addToBetslip}
                    formatUnixTimestamp={formatUnixTimestamp}
                    handleMarkets={handleMarkets}
                    setLoading={setLoading}
                  />
                </div>
              );
            }
          })
        ) : (
          <div className="min-h-[80vh] flex justify-center items-center">
            <p className="text-black text-[0.7rem]">
              {games.length === 0 && "No matches at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
