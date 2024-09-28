"use client";
import React, { useContext, useEffect, useState } from "react";
import { BetslipContext } from "src/app/context/BetslipContext";
import axios from "axios";
import { formatUnixTimestamp } from "../funcStore/editTime";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Collapse, Group } from "@mantine/core";

export default function Golf() {
  const [opened, setOpened] = useState(true);
  const [games, setGames] = useState([]);
  const { betslipData, updateBetslip } = useContext(BetslipContext);

  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});
  const [loading, setLoading] = useState(true);

  // Create a state to keep track of the open/close state for each game
  const [gameCollapseStates, setGameCollapseStates] = useState({});

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/golf`
      );
      if (res) {
        if (res.data.eventsData) {
          setLoading(false);
          setGames(res.data.eventsData);
          // Initialize the collapsible state for each game
          const initialCollapseStates = {};
          res.data.eventsData.forEach((game) => {
            initialCollapseStates[game.eventD.id] = true; // Default to open
          });
          setGameCollapseStates(initialCollapseStates);
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
        away: null,
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
      <div className="grid grid-col-1">
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
            if (
              game.event_odds.odds.to_win_outright &&
              game.event_odds.odds.to_win_outright.odds.length > 0
            ) {
              return (
                <div className="flex flex-col my-1" key={gameIndex}>
                  <div>
                    {/* main */}
                    <Box mx="auto" className="bg-white text-black">
                      <Group
                        position="start"
                        mb={5}
                        onClick={() => {
                          // Toggle the collapsible state for this game
                          setGameCollapseStates((prevState) => ({
                            ...prevState,
                            [game.eventD.id]: !prevState[game.eventD.id],
                          }));
                        }}
                      >
                        <div className="flex justify-between items-center w-full">
                          <p className="text-sm text-black p-2">
                            {game.eventD.league.name}
                          </p>
                          {gameCollapseStates[game.eventD.id] ? (
                            <ArrowDropUpIcon className="text-black" />
                          ) : (
                            <ArrowDropDownIcon className="text-black" />
                          )}
                        </div>
                      </Group>

                      <Collapse
                        in={gameCollapseStates[game.eventD.id]} // Use the dynamic collapsible state
                        className="bg-white text-black rounded m-1"
                      >
                        <div className="grid grid-cols-2">

                          {game.event_odds.odds.to_win_outright.odds.map(
                            (item, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  
                                  addToBetslip(
                                    game.eventD.id,
                                    `${item.name}-${item.odds}`,
                                    item.odds,
                                    game
                                  );
                                }}
                                className={`${
                                  getSelectionFromBetslip(game.eventD.id) ===
                                  `${item.name}-${item.odds}`
                                    ? "bg-yellow-500"
                                    : "bg-gray-500/[0.2]"
                                } flex p-2 mb-1 col-span-2 text-[0.8rem] justify-between items-center text-black hover:bg-green-500/[0.2] rounded`}
                              >
                                <p className="text-center text-black">
                                  {item.name}
                                </p>

                                <p>{item.odds || "--"}</p>
                              </div>
                            )
                          )}
                        </div>
                      </Collapse>
                    </Box>

                    {/* end odds */}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className="min-h-[80vh] flex justify-center items-center">
            <p className="text-black text-[0.9rem]">
              {games.length === 0 && "No matches at the moment"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
