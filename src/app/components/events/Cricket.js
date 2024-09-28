"use client";
import React, { useContext, useEffect, useState } from "react";
import { cricketGames } from "../constants/cricket";
import { BetslipContext } from "src/app/context/BetslipContext";
import axios from "axios";
import { formatUnixTimestamp } from "../funcStore/editTime";
import { OpenEventContext } from "src/app/context/OpenEventContext";
import { Markets } from "../../e/c3/[id]/markets/main/MarketsMain";
import { CollapseCricketGroups } from "./components/CollapseCricketGroups";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import TwoWayEventWithOddDisplay from "./components/TwoWayEventWithOddDisplay";
import { handleMarkets } from "./miniFuncStore/sendToMarkets";

export default function Cricket() {
  const [games, setGames] = useState([]);
  const [gameLeagues, setGameLeagues] = useState([]);
  const { betslipData, updateBetslip } = useContext(BetslipContext);

  const [betslip, setBetslip] = useState([]);
  const [selectedOdds, setSelectedOdds] = useState({});
  const [loading, setLoading] = useState(true);
  const [openEvent, setOpenEvent] = useState(false);

  const [opened, setOpened] = useState(true);

  const fetchLeagues = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/eventleagues`
      );
      if (res) {
        // console.log("response llllllllllllllll");
        // console.log(res.data);
        setGameLeagues(res.data.eventLeagues);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/cricket`
      );
      if (res) {
        console.log("response heree");
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
  }, [betslipData]);

  useEffect(() => {
    fetchEvents();
    fetchLeagues();
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

  const filterByLeague = (league) => {
    const events = games.filter((i) => {
      console.log(i.eventD.league.name);
      return i.eventD.league.name === league;
    });
    localStorage.setItem("lge", JSON.stringify(events));
    window.location.replace(`/lg/c3/${league}`);
    return events;
  };

  return (
    <div className="">
      <div className={`${openEvent && "hidden"} `}>
        <div className="grid grid-col-1 bg-white gap-1 rounded">
          {/* top bar */}
          {games.length > 0 && (
            <div className="my-1">
              <div className="col-span-1 text-black grid grid-cols-10 items-center">
                <div className="col-span-1"></div>

                <div className="col-span-8 grid grid-cols-3 text-black font-semibold w-full">
                  <div className="col-span-1">
                    <p className=" text-[0.7rem] text-black font-semibold">
                      Teams
                    </p>
                  </div>
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-1">
                      <div className="text-[0.7rem]">
                        <p>Home</p>
                      </div>
                      <div className="text-[0.7rem] ">
                        <p>Away</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* more markets button */}
                <div className="col-span-1 px-1 flex justify-center items-center">
                  <div className="flex flex-col text-black">
                    <p className=" text-[0.7rem] text-black font-semibold">
                      Starts
                    </p>
                  </div>
                </div>
              </div>
              <hr className="mt-1" />
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
            <div className="min-h-[80vh] flex justify-center items-center">
              <p className="text-black text-[0.9rem]">
                {games.length === 0 && "No matches at the moment"}
              </p>
            </div>
          )}
        </div>
        {/* groups */}
        <div className="grid grid-col-1 my-3">
          <div className="">
            {!loading && games && (
              <CollapseCricketGroups
                groupTitle="Matches"
                onClick={() => setOpened((prev) => !prev)}
                opened={opened}
                games={gameLeagues}
                filterByLeague={filterByLeague}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`${
          !openEvent && "hidden"
        } flex justify-center items-center w-full`}
      >
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
      </div>
    </div>
  );
}
