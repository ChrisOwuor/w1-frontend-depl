"use client";
import React, { useContext, useEffect, useState } from "react";
import { BetslipContext } from "src/app/context/BetslipContext";
import { formatUnixTimestamp } from "src/app/components/funcStore/editTime";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import TwoWayEventWithOddDisplay from "src/app/components/events/components/TwoWayEventWithOddDisplay";

export default function Crickets() {
  const [games, setGames] = useState([]);
  const { betslipData, updateBetslip } = useContext(BetslipContext);

  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});
  const [loading, setLoading] = useState(true);
  const [openEvent, setOpenEvent] = useState(false);

  useEffect(() => {
    setLoading(true);
    const gamesData = localStorage.getItem("lge");
    if (gamesData) {
      const leagueGames = JSON.parse(gamesData);
      console.log(leagueGames);
      setLoading(false);
      setGames(leagueGames);
    }
  }, []);

  useEffect(() => {
    setBetslip(betslipData);
  }, [betslipData]);

  const addToBetslip = (event_id, selection, odds, game) => {
    const updatedBetslip = [...betslip];

    const existingBetIndex = updatedBetslip.findIndex(
      (bet) => bet.event_id === event_id
    );

    if (existingBetIndex !== -1) {
      // If the selection is the same as the one in the betslip, remove it
      if (
        updatedBetslip[existingBetIndex].selection ===
        `${selection}-To Win The Match`
      ) {
        updatedBetslip.splice(existingBetIndex, 1);
        setSelectedOdds((prevSelectedOdds) => ({
          ...prevSelectedOdds,
          [event_id]: "no-highlight", // Remove the highlight
        }));
      } else {
        // Update the existing bet with new selection and odds
        updatedBetslip[
          existingBetIndex
        ].selection = `${selection}-To Win The Match`;
        updatedBetslip[existingBetIndex].odds = odds;
        setSelectedOdds((prevSelectedOdds) => ({
          ...prevSelectedOdds,
          [event_id]: `${selection}-To Win The Match`, // Highlight the event
        }));
      }
    } else {
      if (game) {
        // Add a new bet to the betslip
        updatedBetslip.push({
          event_id: game.eventD.id,
          home: game.eventD.home.name,
          away: game.eventD.away.name,
          date: formatUnixTimestamp(game.eventD.time),
          selection: `${selection}-To Win The Match`,
          odds,
        });
        setSelectedOdds((prevSelectedOdds) => ({
          ...prevSelectedOdds,
          [event_id]: selection, // Highlight the event
        }));
      }
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

  const handleMarkets = (eventObj) => {
    setLoading(true);
    localStorage.removeItem("eObj");
    localStorage.setItem("eObj", JSON.stringify(eventObj));
    window.location.replace(`/e/c3/${eventObj.eventD.id}`);
  };

  return (
    <div className="bg-white">
      <div className="bg-green-600 py-3 px-2 col-span-1 flex  items-center">
        {games && games.length > 0 && (
          <p className="text-white text-gray-300 text-sm">
            {games[0].eventD.league.name}
          </p>
        )}
      </div>
      <div className="">
        <div className="grid grid-col-1">
          {/* top bar */}
          <div className="p-2 col-span-1 text-black flex justify-between items-center">
            <div className="flex flex-col justify-between text-black font-semibold text-md">
              <p>Teams</p>
            </div>
            <div className="grid grid-cols-2 w-[70%] text-black font-semibold cursor-pointer">
              <div className="text-sm text-center hover:text-black">
                <p>Home</p>
              </div>
              <div className="text-sm text-center  hover:text-black">
                <p>Away</p>
              </div>
            </div>
          </div>
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
          ) : games ? (
            games.map((game, gameIndex) => (
              <div key={gameIndex}>
                <TwoWayEventWithOddDisplay
                  game={game}
                  getSelectionFromBetslip={getSelectionFromBetslip}
                  addToBetslip={addToBetslip}
                  formatUnixTimestamp={formatUnixTimestamp}
                  handleMarkets={handleMarkets}
                />
              </div>
            ))
          ) : (
            <div className="min-h-[50vh] flex justify-center align-center">
              <p className="text-white">
                {games.length === 0 && "No matches at the moment"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
