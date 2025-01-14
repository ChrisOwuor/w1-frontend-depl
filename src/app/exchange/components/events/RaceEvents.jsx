"use client";
import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from "@mui/icons-material/Lock";
import Loading from "../Loading";
import {
  formatGMTDateTime,
  hasDatePassed,
} from "../../utils/competitionCollase";
import { EmptyOddCell, NoSelection, OddsComponent } from "./OddsComponent";
import {
  formatNumber,
  getIcon,
  separateTeams,
  updateProfit,
} from "../../utils/utils";
import { styling1 } from "@/app/exchange/(e)/custom_styling/styling";
import { isAuthenticated } from "src/app/components/funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { placeBet } from "src/app/api/exchange/bets";
import { fetchUserData } from "src/app/api/exchange";
import { NAVContext } from "@/app/context/NavContext";

const RaceEvents = ({
  competitionTitle,
  matches,
  opened,
  marketsBook,
  sportId,
  sportName,
  competitionRegion,
}) => {
  const [openedd, setOpenedd] = useState(opened);
  const [hide, setHide] = useState(false);
  const { userData } = useContext(AuthContext);
  const { setCurrentCenter, setView } = useContext(NAVContext);
  const { setCurrentMkt } = useContext(CompetitionContext);
  const [loadin, setLoadin] = useState(false);

  const handleEventClick = (match) => {
    const event_id = match.match_id;
    const tokts = {
      sportName: sportName,
      competitionName: match.series_name,
      competitionTitle,
      event: match,
      markets: [match.marketId],
      eventId: event_id,
      eventTypeId: sportId,
    };
    localStorage.setItem("2kts", JSON.stringify(tokts));
    setCurrentCenter("event_markets");
    setView({
      currentView: "event_markets",
      sportName: sportName,
      sportId: match.sport_id,
      competitionName: match.series_name,
      eventId: match.match_id,
      eventName: match.match_name,
      from: "home_popular",
    });
    setCurrentMkt({
      mkt_name: "Popular",
      mkt_id: "",
    });
  };

  const onClick = () => {
    setOpenedd((prev) => !prev);
  };

  const [openOdds, setOpenOdds] = useState([]);

  // Initialize the open/closed state based on the number of matches
  useEffect(() => {
    if (matches && matches.length > 0) {
      setOpenOdds(new Array(matches.length).fill(false));
    }
  }, [matches]);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [betObj, setBetObj] = useState({});
  const [price, setPrice] = useState(1.0);
  const [stake, setStake] = useState(50);
  const [profit, setProfit] = useState(0);
  const { setOpenLogin, getfreshUserData } = useContext(AuthContext);

  /**
   *
   * @param {String} betType
   * @param {String} selection
   * @param {*} price
   * @param {*} stake
   * @param {*} eventId
   * @param {String} eventName
   * @returns
   */

  const handleEventPlaceBet = ({
    betType,
    selectionName,
    price,
    stake,
    eventId,
    eventName,
    mktId,
    selectionId,
    marketName,
  }) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true);
      return;
    } else {
      if (userData.status === "suspended") {
        return;
      }

      const betObj_ = {
        betType,
        selectionName,
        selectionId,
        price,
        stake,
        eventTypeId: sportId,
        sportName: sportName,
        eventName: eventName,
        eventId: eventId,
        market: marketName,
        marketId: mktId,
      };
      console.log(betObj_);
      setPrice(price);
      setBetObj(betObj_);
    }
  };
  

  useEffect(() => {
    setProfit(updateProfit(stake, price));
  }, [stake, price]);

  const handlePlaceBet = async () => {
    const userDataFresh = await fetchUserData();
    if (userDataFresh) {
      const loggedIN = isAuthenticated();
      if (!loggedIN) {
        alert("Please Login to continue");
        setOpenLogin(true);
        return;
      } else {
        if (userDataFresh.role != "normalUser") {
          alert("Oops, You cannot place a bet!");
          return;
        }
        getfreshUserData();
        if (
          userDataFresh.eventList.length > 0 &&
          userDataFresh.eventList.includes(
            sportName === "Soccer" ? "Football" : sportName
          )
        ) {
          const bal = parseInt(userDataFresh.availableBalance);
          if (bal < stake) {
            alert("Insufficient funds!!!");
            return;
          }
          const expLimit = parseInt(userDataFresh.exposureLimit);
          if (expLimit < stake) {
            expLimit == 0
              ? alert(`Opps! Exposure limit is ${expLimit}`)
              : alert(
                  `Please try again with a less stake, your Exposure limit is ${expLimit}`
                );
            return;
          }

          const betObj_ = {
            type: betObj.betType,
            selection_name: betObj.selectionName,
            selection_id: betObj.selectionId,
            market_name: betObj.market,
            market_id: betObj.marketId,
            price: price,
            stack: stake,
            sport_id: sportId,
            sport_name: sportName,
            match_name: betObj.eventName,
            match_id: betObj.eventId,
          };
          setLoadin(true);
          const bet_place_status = await placeBet(betObj_);
          if (bet_place_status === false || bet_place_status) {
            getfreshUserData();
            setLoadin(false);
          }
        } else {
          alert(`You do not have access to ${sportName}`);
          return;
        }
      }
    }
  };

  return (
    <div className="w-full">
      {matches && matches.length === 0 && (
        <p className="text-gray-400 font-medium text-[0.8rem]">{`Oops! No ${competitionTitle} matches found at the moment`}</p>
      )}
      {matches && matches.length > 0 && (
        <Box
          mx="auto"
          className={`bg-gray-800/[0.5] border-b border-gray-900   ${
            hide && "hidden"
          }`}
        >
          <Group
            position="start"
            onClick={onClick}
            className="bg-gradient-to-r from-black to-black px-2 cursor-pointer hover:bg-gray-900/[0.5]"
          >
            <div className="flex text-white justify-between items-center w-full">
              <div className="flex items-center">
                <img
                  src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${
                    competitionRegion || "GB"
                  }.svg`}
                  alt={`${competitionRegion}`}
                  className="h-[2.5rem]"
                />
                <p className="text-[0.9rem] font-bold text-white p-1">
                  {competitionTitle}
                </p>
              </div>
              {openedd ? (
                <ArrowDropUpIcon fontSize="small" className="text-white" />
              ) : matches.length === 0 ? (
                <LockIcon fontSize="small" />
              ) : (
                <ArrowDropDownIcon fontSize="small" />
              )}
            </div>
          </Group>

          <Collapse in={openedd} className="text-white py-1 w-full">
            <div className="flex flex-wrap">
              {matches
                .sort(
                  (a, b) =>
                    new Date(a.marketStartTime) - new Date(b.marketStartTime)
                ) 
                .map((match, index) => {
                  const marketTime = new Date(match.marketStartTime);
                  const formattedTime = marketTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });
                  return (
                    <div
                      key={index}
                      className="bg-gray-800 rounded px-2 py-1 m-1 text-center"
                      onClick={()=>{handleEventClick(match)}}
                    >
                      <p className="text-secondary rounded px-4 bg-primary cursor-pointer">
                      {match.marketName}{" "}{formattedTime}
                      </p>
                    </div>
                  );
                })}
            </div>
          </Collapse>
        </Box>
      )}
    </div>
  );
};

export default RaceEvents;
