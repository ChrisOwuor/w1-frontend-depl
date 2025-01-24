"use client";
import React, { useContext, useEffect, useState } from "react";
import { Collapse, Box } from "@mantine/core";
import Loading from "../Loading";
import {
  formatGMTDateTime1,
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
import { placeBet } from "src/app/api/exchange/bets";
import PushPinIcon from "@mui/icons-material/PushPin";
import PlaceBet from "../betslip/PlaceBet";
import { NAVContext } from "@/app/context/NavContext";
import { CompetitionContext } from "@/app/context/exchange/CompetitonContext";

const CompetionCollapseKheladi = ({
  matches,
  opened,
  marketsBook,
  sportId,
  sportName,
}) => {
  const [betObj, setBetObj] = useState({});
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(50);
  const [profit, setProfit] = useState(0);
  const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext);
  const { setCurrentMkt } = useContext(CompetitionContext);
  const { setCurrentCenter, setView } = useContext(NAVContext);
  const [hide, setHide] = useState(false);
  const [loadin, setLoadin] = useState(false);
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFlicker((prev) => !prev);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleEventClick = (match) => {
    const toktmatch_s = {
      sportName: sportName,
      competitionName: match.series_name,
      competitionTitle: match.series_name,
      event: match,
      markets: [match.market_id],
      eventTypeId: match.sport_id,
      eventId: match.match_id,
    };
    localStorage.setItem("2kts", JSON.stringify(toktmatch_s));
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

  const handleEventPlaceBet = ({
    betType,
    selectionName,
    price,
    stack,
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
        stack,
        eventTypeId: sportId,
        sportName: sportName,
        eventName: eventName,
        eventId: eventId,
        market: "Match Odds",
        marketId: mktId,
      };

      setPrice(price);
      setBetObj(betObj_);
    }
  };

  useEffect(() => {
    setProfit(updateProfit(stack, price));
  }, [stack, price]);

  const handlePlaceBet = async () => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setCurrentCenter("userconsent");
      return;
    }

    if (userData) {
      if (userData.status === "suspended") {
        return;
      }
      if (!loggedIN) {
        setCurrentCenter("userconsent");
        return;
      } else {
        if (userData.role != "normalUser") {
          alert("Oops, You cannot place a bet!");
          return;
        }

        await getfreshUserData();
        if (
          userData.eventList.length > 0 &&
          userData.eventList.includes(
            sportName === "Soccer" ? "Football" : sportName
          )
        ) {
          const bal = parseFloat(userData.availableBalance);
          if (bal < stack) {
            alert("Insufficient funds!!!");
            return;
          }
          const expLimit = parseFloat(userData.exposureLimit);
          if (expLimit < stack) {
            expLimit == 0
              ? alert(`Opps! Exposure limit is ${expLimit}`)
              : alert(
                  `Please try again with a less stack, your Exposure limit is ${expLimit}`
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
            stack: stack,
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
        }
      }
    }
  };
  const logos = {
    4: "/sports/Cricket.webp", // Cricket
    1: "/sports/football.webp", // Football
    2: "/sports/tennis.webp", // Tennis
    7522: "/sports/basketball.png", // Basketball
    27454571: "/sports/esports.jpg", // Esports
    3503: "/sports/DARTS.png", // Darts
    998917: "/sports/volleyball.png", // Volleyball
    2152880: "/sports/gaelicgames.png", // Gaelic Games
    26420387: "/sports/mixedmartialarts.png", // Mixed Martial Arts
    7: "/sports/horseracing.webp", // Horse Racing
    "str_11": "/sports/horseracing_today.webp", // Horse Racing - Today's Card
    4339: "/sports/greyhoundracing.webp", // Greyhound Racing
    "str_10": "/sports/greyhoundracing.webp", // Greyhounds - Today's Card
    2378961: "/sports/politics.webp", // Politics
    5: "/sports/rugbyunion.png", // Rugby Union
    1477: "/sports/rugbyleague.png", // Rugby League
    6: "/sports/boxing.png", // Boxing
    7511: "/sports/baseball.webp", // Baseball
    3: "/sports/golf.webp", // Golf
    8: "/sports/motorsport.png", // Motor Sport
  };
  const sportname = sportName === "Soccer" ? "Football" : sportName;
  const icon = getIcon(sportname);
  // const [newMatch, setNewMatches] = useState(matches);

  return (
    <div className="w-full">
      {matches && matches.length > 0 && (
        <Box mx="auto" className={` ${hide && "hidden"}`}>
          <Collapse in={true} className="w-full h-full">
            {/* LEAGUES */}
            <div className="flex gap-x-4 w-full">
              <div className="w-full overflow-y-auto max">
                {matches.length > 0 ? (
                  <div className="w-full grid grid-cols-12 gap-x-2"></div>
                ) : (
                  <Loading />
                )}
                {matches &&
                  matches.length > 0 &&
                  matches.map((match, i) => {
                    console.log(match);
                    let eventID = "";
                    let eId = "";
                    if (match && match.match_id) {
                      eventID = match.match_id;
                      eId = match.match_id;
                    }
                    console.log(match);

                    if (eventID != "") {
                      const [team1, team2] = separateTeams(match.match_name);
                      const pass = hasDatePassed(match.openDate);
                      const logo = Array.isArray(logos)
                      ? logos.find((logoItem) => logoItem.id === match.sport_id)
                      : null;

                      let prices = {};
                      const mkt_id = match.market_id;

                      if (marketsBook && marketsBook.length > 0) {
                        const marketPrices = marketsBook.filter(
                          (marketprice) => marketprice.marketId == mkt_id
                        );
                        if (marketPrices.length > 0) {
                          prices = marketPrices[0];
                        }
                      }

                      const date_ = formatGMTDateTime1(match.openDate);

                      if (styling1) {
                        return (
                          
                            <a className=" outline outline-1">
                              {/* div to show game on large screen */}
                              <div
                                className="sport-list p-0 capitalize mx-0 row  "
                                onClick={() => handleEventClick(match)}
                              >
                                <div className="name-sport col-md-7 col-12 d-flex px-0  kh:w-[58.3333%]  ">
                                  {/* icon */}
                                  <div className="icon-btn px-0 col-3 col-2 w-[16.66666667%] kh:w-[8.33333333%] text-center self-center">
                                    <button
                                      className="text-center items-center inline-block border-[1px] rounded-[0.375rem] border-transparent"
                                      style={{ verticalAlign: "middle" }}
                                    >
                                      <span>
                                        <img
                                          src={
                                            logo?.value ||
                                            "https://khiladi.in/assets/img/icons/default.png"
                                          }
                                          alt=""
                                          className="w-auto h-[21px]"
                                          style={{ verticalAlign: "middle" }}
                                        />
                                      </span>
                                    </button>
                                  </div>
                                  {/* time */}
                                  <div className="teams col-md-10 col-10 px-0">
                                    <div className="team-name ">
                                      <span class="tn-icons">
                                        <i class="mdi mdi-timer-outline"></i>
                                      </span>

                                      <p className="names ">
                                        <span className="name marketName ">
                                          {team1} {" v "} {team2}
                                        </span>
                                        <span
                                          _ngcontent-snf-c80=""
                                          className="mr- 1"
                                        ></span>
                                        <span class="sport-event-list-icon ">
                                          <span class="tvicon">
                                            <i class="fa fa-television"></i>
                                          </span>

                                          {match.sport_name === "Cricket" && (
                                            <>
                                              <span>
                                                <span class="fancyBookIcon bg-white">
                                                  BM
                                                </span>
                                              </span>
                                              <span>
                                                <span class="fancyBookIcon bg-white">
                                                  F
                                                </span>
                                              </span>
                                              <span>
                                                <span class="fancyBookIcon bg-white">
                                                  S
                                                </span>
                                              </span>
                                            </>

                                          )}{" "}

                                        </span>
                                        <br />
                                        <span class="name1 text-[#4f0a9b]">
                                          {match.series_name}{" "}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* {
                                prices.status === "CLOSED" ?
                                  prices.inplay === true ? <div className={`bg-[#F5ACD4]/[0.9] flex justify-center
                                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                    <p className='font-medium text-black uppercase'>Betting Paused</p>
                                  </div> : <div className={`
                                      ${prices.status === "CLOSED" ? "bg-[#F5ACD4]/[0.9]" : "bg-[#F5ACD4]"} flex justify-center
                                      col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                    <p className='font-medium text-black uppercase'>{prices.status}</p>
                                  </div> : ""
                              } */}
                                <div className="rates-area mx-0 px-0 text-center w-[100%]  p-[5px] rounded-b-[8px] rounded-t-none kh:w-[41.6667%]">
                                  <button _ngcontent-snf-c80="" class="blue-area">
                                    {prices &&
                                      prices.runners &&
                                      prices.runners[0].ex.availableToBack &&
                                      prices.runners[0].ex.availableToBack.length >
                                      0 ? (
                                      <OddsComponent
                                        styling1={styling1}
                                        eventName={match.match_name}
                                        marketId={match.market_id}
                                        marketName={match.market_name}
                                        team={team1}
                                        selectionId={
                                          prices.runners[0].selectionId
                                        }
                                        price={
                                          prices.runners[0].ex.availableToBack[0]
                                            .price
                                        }
                                        size={formatNumber(
                                          prices.runners[0].ex.availableToBack[0]
                                            .size
                                        )}
                                        handlePlaceBet={handleEventPlaceBet}
                                        dontShowSize={true}
                                        setSelectedOdd={setSelectedEventId}
                                        eventId={eId}
                                        type="back"
                                      />
                                    ) : prices &&
                                      prices.runners &&
                                      prices.runners[0] &&
                                      prices.runners[0].selectionId ? (
                                      <EmptyOddCell
                                        styling1={styling1}
                                        eventName={match.match_name}
                                        marketId={match.market_id}
                                        marketName={match.market_name}
                                        selectionId={
                                          prices.runners[0].selectionId
                                        }
                                        team={team1}
                                        handlePlaceBet={handleEventPlaceBet}
                                        dontShowSize={true}
                                        setSelectedOdd={setSelectedEventId}
                                        eventId={eId}
                                        type="back"
                                      />
                                    ) : (
                                      <NoSelection
                                        dontShowSize={true}
                                        type="back"
                                      />
                                    )}
                                  </button>
                                  <button _ngcontent-snf-c80="" class="red-area">
                                    {prices &&
                                      prices.runners &&
                                      prices.runners[0].ex.availableToBack &&
                                      prices.runners[0].ex.availableToBack.length >
                                      0 ? (
                                      <OddsComponent
                                        styling1={styling1}
                                        eventName={match.match_name}
                                        marketId={match.market_id}
                                        marketName={match.market_name}
                                        team={team1}
                                        selectionId={
                                          prices.runners[0].selectionId
                                        }
                                        price={
                                          prices.runners[0].ex.availableToBack[0]
                                            .price
                                        }
                                        size={formatNumber(
                                          prices.runners[0].ex.availableToBack[0]
                                            .size
                                        )}
                                        handlePlaceBet={handleEventPlaceBet}
                                        dontShowSize={true}
                                        setSelectedOdd={setSelectedEventId}
                                        eventId={eId}
                                        type="back"
                                      />
                                    ) : prices &&
                                      prices.runners &&
                                      prices.runners[0] &&
                                      prices.runners[0].selectionId ? (
                                      <EmptyOddCell
                                        styling1={styling1}
                                        eventName={match.match_name}
                                        marketId={match.market_id}
                                        marketName={match.market_name}
                                        selectionId={
                                          prices.runners[0].selectionId
                                        }
                                        team={team1}
                                        handlePlaceBet={handleEventPlaceBet}
                                        dontShowSize={true}
                                        setSelectedOdd={setSelectedEventId}
                                        eventId={eId}
                                        type="back"
                                      />
                                    ) : (
                                      <NoSelection
                                        dontShowSize={true}
                                        type="back"
                                      />
                                    )}
                                  </button>
                                  <div class="livetime">
                                    <div style={{ padding: " 0px" }}>
                                      <span>
                                        {pass ? (
                                          <span
                                            className={`text-sm sm:text-md  tracking-wide py-[5px] px-[11px] whitespace-nowrap bg-[#d81212] text-[9px] rounded-[3px] font-[700] text-[white]`}
                                          >
                                            Live
                                          </span>
                                        ) : (
                                          <p className="text-[12px] sm:text-md  tracking-wide text-black font-bold">
                                            {" "}
                                            {date_.time}
                                          </p>
                                        )}
                                      </span>
                                    </div>
                                  </div>
                                  {prices &&
                                    prices.runners &&
                                    prices.numberOfRunners === 3 ? (
                                    <>
                                      {" "}
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="blue-area"
                                      >
                                        {prices.runners[1].ex.availableToBack &&
                                          prices.runners[1].ex.availableToBack
                                            .length > 0 ? (
                                          <OddsComponent
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            team={team2}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketId={match.market_id}
                                            marketName={match.market_name}
                                            price={
                                              prices.runners[1].ex
                                                .availableToBack[0].price
                                            }
                                            size={formatNumber(
                                              prices.runners[1].ex
                                                .availableToBack[0].size
                                            )}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="back"
                                          />
                                        ) : prices.runners[1] &&
                                          prices.runners[1].selectionId ? (
                                          <EmptyOddCell
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            marketId={match.market_id}
                                            marketName={match.market_name}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            team={team2}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="back"
                                          />
                                        ) : (
                                          <NoSelection
                                            dontShowSize={true}
                                            type="back"
                                          />
                                        )}
                                      </button>
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="red-area"
                                      >
                                        {prices.runners[1].ex.availableToLay &&
                                          prices.runners[1].ex.availableToLay
                                            .length > 0 ? (
                                          <OddsComponent
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            team={team2}
                                            marketId={match.market_id}
                                            marketName={match.market_name}
                                            price={
                                              prices.runners[1].ex
                                                .availableToLay[0].price
                                            }
                                            size={formatNumber(
                                              prices.runners[1].ex
                                                .availableToLay[0].size
                                            )}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            eventId={eId}
                                            type="lay"
                                          />
                                        ) : (
                                          prices.runners[1] &&
                                          prices.runners[1].selectionId && (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              selectionId={
                                                prices.runners[1].selectionId
                                              }
                                              team={team2}
                                              handlePlaceBet={handleEventPlaceBet}
                                              dontShowSize={true}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="lay"
                                            />
                                          )
                                        )}
                                      </button>
                                    </>
                                  ) : prices &&
                                    prices.runners &&
                                    prices.numberOfRunners === 2 ? (
                                    <>
                                      {" "}
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="blue-area"
                                      >
                                        {prices.runners[1].ex.availableToBack &&
                                          prices.runners[1].ex.availableToBack
                                            .length > 0 ? (
                                          <OddsComponent
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            team={team2}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketId={match.market_id}
                                            marketName={match.market_name}
                                            price={
                                              prices.runners[1].ex
                                                .availableToBack[0].price
                                            }
                                            size={formatNumber(
                                              prices.runners[1].ex
                                                .availableToBack[0].size
                                            )}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="back"
                                          />
                                        ) : prices.runners[1] &&
                                          prices.runners[1].selectionId ? (
                                          <EmptyOddCell
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            marketId={match.market_id}
                                            marketName={match.market_name}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            team={team2}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="back"
                                          />
                                        ) : (
                                          <NoSelection
                                            dontShowSize={true}
                                            type="back"
                                          />
                                        )}
                                      </button>
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="red-area"
                                      >
                                        {prices.runners[1].ex.availableToLay &&
                                          prices.runners[1].ex.availableToLay
                                            .length > 0 ? (
                                          <OddsComponent
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            team={team2}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketName={match.market_name}
                                            price={
                                              prices.runners[1].ex
                                                .availableToLay[0].price
                                            }
                                            size={formatNumber(
                                              prices.runners[1].ex
                                                .availableToLay[0].size
                                            )}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            marketId={match.market_id}
                                            type="lay"
                                          />
                                        ) : prices.runners[1] &&
                                          prices.runners[1].selectionId ? (
                                          <EmptyOddCell
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            marketId={match.market_id}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketName={match.market_name}
                                            team={team2}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="lay"
                                          />
                                        ) : (
                                          <NoSelection
                                            dontShowSize={true}
                                            type="lay"
                                          />
                                        )}
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="blue-area"
                                      >
                                        {prices &&
                                          prices.runners &&
                                          prices.runners.length > 1 &&
                                          prices.runners[1] &&
                                          prices.runners[1].selectionId ? (
                                          <EmptyOddCell
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            marketId={match.market_id}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketName={match.market_name}
                                            team={team2}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="back"
                                          />
                                        ) : (
                                          <NoSelection
                                            dontShowSize={true}
                                            type="back"
                                          />
                                        )}
                                      </button>
                                      <button
                                        _ngcontent-snf-c80=""
                                        class="red-area"
                                      >
                                        {prices &&
                                          prices.runners &&
                                          prices.runners.length > 1 &&
                                          prices.runners[1] &&
                                          prices.runners[1].selectionId ? (
                                          <EmptyOddCell
                                            styling1={styling1}
                                            eventName={match.match_name}
                                            marketId={match.market_id}
                                            selectionId={
                                              prices.runners[1].selectionId
                                            }
                                            marketName={match.market_name}
                                            team={team2}
                                            handlePlaceBet={handleEventPlaceBet}
                                            dontShowSize={true}
                                            setSelectedOdd={setSelectedEventId}
                                            eventId={eId}
                                            type="lay"
                                          />
                                        ) : (
                                          <NoSelection
                                            dontShowSize={true}
                                            type="lay"
                                          />
                                        )}
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                              {/*  */}
                              {/* event odds */}
                            </a>
                        
                                )
                      }
                     
                    }
                  })}
              </div>
            </div>
          </Collapse>
        </Box>
      )}
    </div>
  );
};

export default CompetionCollapseKheladi;
