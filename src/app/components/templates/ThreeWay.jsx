"use client";
import React, { useContext, useEffect, useState } from "react";
import { soccer } from "../constants/soccer";
import { BetslipContext } from "src/app/context/BetslipContext";
import axios from "axios";
import { formatUnixTimestamp } from "../funcStore/editTime";
import { OpenEventContext } from "src/app/context/OpenEventContext";
import { MarketFootball } from "../../e/f1/components/Markets";

export default function ThreeWay() {
  const [loading, setLoading] = useState(true);


  const [games, setGames] = useState([]);
  
  const { betslipData, updateBetslip } = useContext(BetslipContext);
  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});

  const { eventOpen, setEventOpen } = useContext(OpenEventContext);
  const [openEvent, setOpenEvent] = useState(false);
  const [opened, setOpened] = useState(true);
  const [opened1, setOpened1] = useState(true);
  const [opened2, setOpened2] = useState(false);
  const [opened3, setOpened3] = useState(true);
  const [opened4, setOpened4] = useState(true);
  const [opened5, setOpened5] = useState(true);

  const data_raw = localStorage.getItem("eObj");
  const storedData = JSON.parse(data_raw) || {};
  const [eventData, setEventData] = useState(storedData);

  

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

  useEffect(() => {
    const fetchEvents = async () => {
      const code = {
        sport_id: 1,
      };
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/football`
        );
        if (res) {
          console.log("Printing football res");
          console.log(res);
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
    fetchEvents();
  }, []);

  useEffect(() => {
    setBetslip(betslipData);
    console.log(betslipData);
  }, [betslipData]);

  // useEffect(() => {
  //   updateBetslip(betslip);
  // }, [betslip]);

  const getSelectionFromBetslip = (event_id) => {
    const betslipDataRaw = localStorage.getItem("betslip");
    if (betslipDataRaw) {
      const betslipData = JSON.parse(betslipDataRaw);
      const bet = betslipData.find((bet) => bet.event_id === event_id);
      return bet ? bet.selection : "false";
    } else {
      return "false";
    }
  };

  const handleMarkets = (eventObj) => {
    setLoading(true)
    localStorage.removeItem("eObj");
    localStorage.setItem("eObj", JSON.stringify(eventObj));
    window.location.replace(`/e/f1/${eventObj.eventD.id}`)
  };
  return (
    <div className="">
      <div className={`${openEvent && "hidden"}`}>
        <div className="grid grid-col-1">
          {/* top bar */}
          <div className="py-4 col-span-1 flex justify-between items-center">
            <div className="flex flex-col justify-between text-white font-semibold texl-md">
              <p>Teams</p>
            </div>
            <div className="grid grid-cols-3 w-[50%] text-white font-semibold cursor-pointer">
              <div className="text-sm text-center hover:font-bold">
                <p>Home</p>
              </div>
              <div className="text-sm text-center  hover:font-bold">
                <p>Draw</p>
              </div>
              <div className=" text-sm text-center hover:font-bold">
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
                        {formatUnixTimestamp(game.eventD.time)}
                      </p>
                    </div>
                  </div>
                  {/* end time */}
                  <div className="col-span-1 flex justify-between items-center">
                    <div
                      className="flex flex-col justify-between cursor-pointer text-white font-semibold texl-md"
                      onClick={() => {
                        handleMarkets(game);
                      }}
                    >
                      <p className="text-[0.8rem]">{game.eventD.home.name}</p>
                      <p className="text-[0.8rem]">{game.eventD.away.name}</p>
                    </div>
                    {/* odds */}
                    <div className="grid grid-cols-3 w-[50%] text-white font-semibold cursor-pointer">
                      <div
                        className={`${
                          getSelectionFromBetslip(game.eventD.id) === "Home"
                            ? "bg-yellow-500"
                            : "bg-green-500/[0.2]"
                        } p-2 text-center hover:text-black`}
                        onClick={() =>
                          addToBetslip(
                            game.eventD.id,
                            "Home",
                            isNaN(
                              parseFloat(
                                game.event_odds.odds.full_time_result.odds[0]
                                  .odds
                              )
                            )
                              ? "--"
                              : parseFloat(
                                  game.event_odds.odds.full_time_result.odds[0]
                                    .odds
                                ).toFixed(2),
                            game
                          )
                        }
                      >
                        <p>
                          {isNaN(
                            parseFloat(
                              game.event_odds.odds.full_time_result.odds[0].odds
                            )
                          )
                            ? "--"
                            : parseFloat(
                                game.event_odds.odds.full_time_result.odds[0]
                                  .odds
                              ).toFixed(2)}
                        </p>
                      </div>
                      <div
                        className={`${
                          getSelectionFromBetslip(game.eventD.id) === "Draw"
                            ? "bg-yellow-500"
                            : "bg-yellow-500/[0.2]"
                        } p-2 text-center hover:text-black`}
                        onClick={() =>
                          addToBetslip(
                            game.eventD.id,
                            "Draw",
                            isNaN(
                              parseFloat(
                                game.event_odds.odds.full_time_result.odds[1]
                                  .odds
                              )
                            )
                              ? "--"
                              : parseFloat(
                                  game.event_odds.odds.full_time_result.odds[1]
                                    .odds
                                ).toFixed(2),
                            game
                          )
                        }
                      >
                        <p>
                          {isNaN(
                            parseFloat(
                              game.event_odds.odds.full_time_result.odds[1].odds
                            )
                          )
                            ? "--"
                            : parseFloat(
                                game.event_odds.odds.full_time_result.odds[1]
                                  .odds
                              ).toFixed(2)}
                        </p>
                      </div>
                      <div
                        className={`${
                          getSelectionFromBetslip(game.eventD.id) === "Away"
                            ? "bg-yellow-500"
                            : "bg-gray-500/[0.2]"
                        } p-2 text-center hover:text-black`}
                        onClick={() =>
                          addToBetslip(
                            game.eventD.id,
                            "Away",
                            isNaN(
                              parseFloat(
                                game.event_odds.odds.full_time_result.odds[2]
                                  .odds
                              )
                            )
                              ? "--"
                              : parseFloat(
                                  game.event_odds.odds.full_time_result.odds[2]
                                    .odds
                                ).toFixed(2),
                            game
                          )
                        }
                      >
                        <p>
                          {isNaN(
                            parseFloat(
                              game.event_odds.odds.full_time_result.odds[2].odds
                            )
                          )
                            ? "--"
                            : parseFloat(
                                game.event_odds.odds.full_time_result.odds[2]
                                  .odds
                              ).toFixed(2)}
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
      
    </div>
  );
}
