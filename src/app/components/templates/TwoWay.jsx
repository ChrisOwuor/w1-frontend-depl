"use client";
import React, { useContext, useEffect, useState } from "react";
import { cricketGames } from "../constants/cricket";
import { BetslipContext } from "src/app/context/BetslipContext";
import axios from "axios";
import { formatUnixTimestamp } from "../funcStore/editTime";
import { OpenEventContext } from "src/app/context/OpenEventContext";
import { Markets } from "../../e/c3/[id]/markets/main/MarketsMain";

export default function TwoWay() {
  const [games, setGames] = useState(cricketGames);
  const { betslipData, updateBetslip } = useContext(BetslipContext);

  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});
  const [loading, setLoading] = useState(true);
  const [openEvent, setOpenEvent] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/cricket`
      );
      if (res) {
        console.log("rrrrrrrrrrrrrrrrrr");
        // console.log(res);
        const asian = res.data.eventD.filter(
          (e) => e.league.name === "Asian Cup"
        );

        console.log(asian)
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
      setLoading(false);
    }
  };

  useEffect(() => {
    setBetslip(betslipData);
    // console.log(betslipData);
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
    <div className="">
      <div className={`${openEvent && "hidden"}`}>
        <div className="grid grid-col-1">
          {/* top bar */}
          <div className="py-4 col-span-1 flex justify-between items-center">
            <div className="flex flex-col justify-between text-white font-semibold text-md">
              <p>Teams</p>
            </div>
            <div className="grid grid-cols-2 w-[70%] text-white font-semibold cursor-pointer">
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
            <div className="min-h-[50vh] flex justify-center align-center">
              <p className="text-white">{loading && "Loading.."}</p>
            </div>
          ) : games ? (
            games.map((game, gameIndex) => (
              <div className="flex flex-col my-2" key={gameIndex}>
                <div>
                  {/* time */}
                  <div className="col-span-1 flex justify-end gap-x-4 items-center">
                    <div className="flex flex-col justify-between text-white font-semibold">
                      <p className="text-[0.7rem]">Starts</p>
                    </div>
                    {/* status */}
                    <div className="text-white font-semibold cursor-pointer">
                      <p className="text-[0.7rem] text-gray-400">
                        {formatUnixTimestamp(game.eventD.time) || "--"}
                      </p>
                    </div>
                  </div>
                  {/* end time */}
                  <div className="col-span-1 flex justify-between items-center">
                    <div
                      className="flex flex-col justify-between cursor-pointer text-white font-semibold text-md"
                      onClick={() => {
                        handleMarkets(game);
                      }}
                    >
                      <p className="text-[0.8rem]">{game.eventD.home.name}</p>
                      <p className="text-[0.8rem]">{game.eventD.away.name}</p>
                    </div>
                    {/* odds */}
                    <div className="grid grid-cols-2 w-[70%] text-white font-semibold cursor-pointer">
                      <div
                        className={`${
                          getSelectionFromBetslip(game.eventD.id) ===
                          "Home-To Win The Match"
                            ? "bg-yellow-500"
                            : "bg-green-500/[0.2]"
                        } p-2 text-center hover:text-black`}
                        onClick={() =>
                          addToBetslip(
                            game.eventD.id,
                            "Home",
                            game.event_odds.odds.main.sp.to_win_the_match
                              .odds[0].odds || "--",
                            game
                          )
                        }
                      >
                        <p>
                          {game.event_odds.odds.main.sp.to_win_the_match.odds[0]
                            .odds || "--"}
                        </p>
                      </div>
                      <div
                        className={`${
                          getSelectionFromBetslip(game.eventD.id) ===
                          "Away-To Win The Match"
                            ? "bg-yellow-500"
                            : "bg-yellow-500/[0.2]"
                        } p-2 text-center hover:text-black`}
                        onClick={() =>
                          addToBetslip(
                            game.eventD.id,
                            "Away",
                            game.event_odds.odds.main.sp.to_win_the_match
                              .odds[1].odds || "--",
                            game
                          )
                        }
                      >
                        <p>
                          {game.event_odds.odds.main.sp.to_win_the_match.odds[1]
                            .odds || "--"}
                        </p>
                      </div>
                    </div>
                    {/* end odds */}
                  </div>
                </div>
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
      <div className={`${!openEvent && "hidden"} w-full`}>
        <p className="text-white text-center w-full">Loading ...</p>
      </div>
    </div>
  );
}
