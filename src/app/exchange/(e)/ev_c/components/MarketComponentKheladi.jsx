import { Box, Collapse, Group } from "@mantine/core";
import React, { useContext, useEffect, useState } from "react";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import { formatNumber, updateProfit } from "src/app/exchange/utils/utils";
import { styling2 } from "@/app/exchange/(e)/custom_styling/styling";
import { isAuthenticated } from "src/app/components/funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";
import { placeBet } from "src/app/api/exchange/bets";
import MarketOddsComponent from "./MarketOddsCompoent";
import PlaceBet from "src/app/exchange/components/betslip/PlaceBet";
import CreditCardOffIcon from "@mui/icons-material/CreditCardOff";
import { MyBetsContext } from "@/app/context/MybetsContext";
import { NAVContext } from "@/app/context/NavContext";
import { BarChart, Info } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import MarketOddsComponentKheladi from "./MarketOddsComponentKheladi";
import MarketOddsComponentTemp from "./MarketOddsComponentTemp";
import PlaceBetKheladi from "@/app/exchange/components/betslip/PlaceBetKheladi";

export const sortBetsLastUpdateTime = (bets) => {
  bets.sort((a, b) => {
    // Convert 'updatedTime' strings to Date objects
    const dateA = new Date(a.updatedTime);
    const dateB = new Date(b.updatedTime);

    // Compare the Date objects
    return dateB - dateA;
  });
};

const MarketComponentKheladi = ({
  marketBookOdds,
  market,
  openedd,
  eventData,
  eventId,
  setRefresh,
  eventTypeId,
  sportName,
  eventName,
  otherMarkets,
  globalSettings,
}) => {
  const marketNamePattern = /^\w+ Innings \d+ Overs Line$/;
  const isLineMarket = marketNamePattern.test(market.marketName);

  const mkt =
    marketBookOdds &&
    marketBookOdds.length > 0 &&
    marketBookOdds.find((mkt) => mkt.marketId === market.marketId);
  const [open, setOpen] = useState(openedd);
  const { myBets, getMyBetsFresh } = useContext(MyBetsContext);
  const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext);
  const { view, setCurrentCenter } = useContext(NAVContext);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [betObj, setBetObj] = useState({});
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(0);
  const [profit, setProfit] = useState(0);
  const [loadin, setLoadin] = useState(false);

  const [runnerProfits, setRunnerProfits] = useState({});
  const [runnerProfitsDisplay, setRunnerProfitsDisplay] = useState({});
  const [runnerProfitsDisplayPremium, setRunnerProfitsDisplayPremium] =
    useState({});
  const [runnersPL, setRunnersPL] = useState({
    market_id: market.marketId,
    runnersPL: {},
  });

  useEffect(() => {
    if (myBets) {
      if (myBets.length > 0) {
        const matched = myBets.filter(
          (bet) =>
            bet.status === "MATCHED" &&
            bet.processed === false &&
            bet.match_id === eventId &&
            bet.market_id === market.marketId
        );
        if (matched.length > 0) {
          // Initialize runnerProfits
          const runnerProfits = {};
          market.runners.forEach((runner) => {
            runnerProfits[runner.selectionId] = 0;
          });

          // Calculate runner profits for existing bets
          for (const bet of matched) {
            for (const runner of market.runners) {
              if (bet.selection_id == runner.selectionId) {
                const profit =
                  parseFloat(bet.stack) * (parseFloat(bet.price) - 1);
                if (bet.type === "back") {
                  runnerProfits[runner.selectionId] += profit;
                } else if (bet.type === "lay") {
                  runnerProfits[runner.selectionId] -= profit;
                }
              } else if (bet.type === "lay") {
                runnerProfits[runner.selectionId] += parseFloat(bet.stack);
              } else if (bet.type === "back") {
                runnerProfits[runner.selectionId] -= parseFloat(bet.stack);
              }
            }
          }

          setRunnerProfits(runnerProfits);
          setRunnerProfitsDisplay(runnerProfits);
        }
      }
    } else {
      // getMyBetsFresh();
    }
  }, [myBets, eventId, market.marketName]);

  useEffect(() => {
    if (myBets) {
      if (myBets.length > 0) {
        const matched = myBets.filter(
          (bet) =>
            bet.status === "MATCHED" &&
            bet.processed === false &&
            bet.match_id === eventId &&
            bet.market_id === market.marketId
        );
        if (matched.length > 0) {
          // Initialize runnerProfits
          const runnerProfits = {};
          market.runners.forEach((runner) => {
            runnerProfits[runner.selectionId] = 0;
          });

          // Calculate runner profits for existing bets
          for (const bet of matched) {
            for (const runner of market.runners) {
              if (bet.selection_id == runner.selectionId) {
                const profit = parseFloat(bet.stack);
                if (bet.type === "back") {
                  runnerProfits[runner.selectionId] += profit;
                } else if (bet.type === "lay") {
                  runnerProfits[runner.selectionId] -= profit;
                }
              } else if (bet.type === "lay") {
                runnerProfits[runner.selectionId] += parseFloat(bet.stack);
              } else if (bet.type === "back") {
                runnerProfits[runner.selectionId] -= parseFloat(bet.stack);
              }
            }
          }

          setRunnerProfitsDisplayPremium(runnerProfits);
        }
      }
    } else {
      // getMyBetsFresh();
    }
  }, [myBets, eventId, market.marketName]);

  useEffect(() => {
    if (myBets) {
      if (myBets.length > 0) {
        const matched = myBets.filter(
          (bet) =>
            bet.status === "MATCHED" &&
            bet.processed === false &&
            bet.match_id === eventId &&
            bet.market_id === market.marketId
        );
        if (matched.length > 0) {
          // Initialize runnerProfits
          const runnerProfits = {};
          market.runners.forEach((runner) => {
            runnerProfits[runner.selectionId] = 0;
          });

          // Calculate runner profits for existing bets
          for (const bet of matched) {
            for (const runner of market.runners) {
              if (bet.selection_id == runner.selectionId) {
                const profit = parseFloat(bet.stack);
                if (bet.type === "back") {
                  runnerProfits[runner.selectionId] += profit;
                } else if (bet.type === "lay") {
                  runnerProfits[runner.selectionId] -= profit;
                }
              } else if (bet.type === "lay") {
                runnerProfits[runner.selectionId] += parseFloat(bet.stack);
              } else if (bet.type === "back") {
                runnerProfits[runner.selectionId] -= parseFloat(bet.stack);
              }
            }
          }

          setRunnerProfitsDisplayPremium(runnerProfits);
        }
      }
    } else {
      // getMyBetsFresh();
    }
  }, [myBets, eventId]);

  const calculateBetImpact = (selection, type, price, stack) => {
    const impact =
      type === "back" ? stack * (price - 1) : -(stack * (price - 1));

    const updatedRunnerProfits = { ...runnerProfits };

    if (Object.keys(updatedRunnerProfits).length === 0) {
      market.runners.forEach((runner) => {
        updatedRunnerProfits[runner.selectionId] = 0;
      });
    }

    updatedRunnerProfits[selection] =
      (updatedRunnerProfits[selection] || 0) + impact;

    market.runners.forEach((runner) => {
      if (runner.selectionId !== selection) {
        updatedRunnerProfits[runner.selectionId] -=
          type === "back" ? stack : -stack;
      }
    });

    return updatedRunnerProfits;
  };

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const handleEventPlaceBet = (
    type,
    selection,
    price,
    stack,
    eventId,
    marketName,
    selectionId,
    mktId
  ) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true);
      setCurrentCenter("userconsent");
      return;
    }
    const betObj_ = {
      betType: type,
      price,
      stack,
      eventId,
      marketName: marketName,
      marketId: mktId,
      selectionId,
      selectionName: selection,
      eventTypeId,
      sportName: sportName,
      eventName: eventName,
    };

    setPrice(price);
    setBetObj(betObj_);
    setSelectedEventId(eventId);
  };

  useEffect(() => {
    // console.log(isLineMarket)
    setProfit(updateProfit(stack, price, isLineMarket));

    if (Object.keys(betObj).length !== 0) {
      // Calculate the impact of the new bet on current profits
      const updatedRunnerProfits = calculateBetImpact(
        betObj.selectionId,
        betObj.betType,
        price,
        stack
      );

      // Update the state with the new runner profits
      setRunnersPL({
        market_id: market.marketId,
        runnersPL: {
          ...updatedRunnerProfits,
        },
      });
      setRunnerProfitsDisplay(updatedRunnerProfits);
    }
  }, [stack, price]);

  const handlePlaceBet = async () => {
    if (userData) {
      const loggedIN = isAuthenticated();
      if (!loggedIN) {
        alert("Please Login to continue");
        setOpenLogin(true);
        return;
      } else {
        if (userData.role != "normalUser") {
          alert("Oops, You cannot place a bet!");
          return;
        }
        if (
          userData.eventList.length > 0 &&
          userData.eventList.includes(
            view.sportName === "Soccer" ? "Football" : view.sportName
          )
        ) {
          const bal = parseInt(userData.availableBalance);
          if (bal < stack) {
            alert("Insufficient funds!");
            return;
          }
          const expLimit = parseInt(userData.exposureLimit);
          if (expLimit < stack) {
            expLimit == 0
              ? alert(`Opps! Exposure limit is ${expLimit}`)
              : alert(
                  `Please try again with a less stack, your Exposure limit is ${expLimit}`
                );
            return;
          }
          const event_raw = localStorage.getItem("2kts");
          if (event_raw) {
            const betObj_ = {
              type: betObj.betType,
              selection_name: betObj.selectionName,
              selection_id: betObj.selectionId,
              market_name: betObj.marketName,
              market_id: betObj.marketId,
              sport_name: sportName,
              match_name: eventName,
              match_id: eventId,
              sport_id: eventTypeId,
              price,
              stack: stack,
              runnersPL,
              isLineMarket,
            };
            // updateBetslip("add", [betObj_])
            setLoadin(true);
            // console.log()
            const bet_place_status = await placeBet(betObj_);
            setRunnerProfits(runnerProfitsDisplay);
            if (bet_place_status == true) {
              setRefresh((prev) => !prev);
              getMyBetsFresh(eventId);
              getfreshUserData("from market cp after bet success");
            }
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
    <div className="market-section mt-[15px]" key={market.marketName}>
      <div className="market-title-row d-flex align-items-center justify-content-between text-uppercase text-dark market-title-row">
        <div className="clip-1 col-11 col-md-7 flex items-baseline">
          <p _ngcontent-xck-c91="" class="market-title">
            <i _ngcontent-xck-c91="" class="fa-solid fa-chart-column me-1">
              <BarChartIcon fontSize="small" />
            </i>
            {market.marketName}
          </p>
          <div
            _ngcontent-xck-c91=""
            class="cashout-container"
            bis_skin_checked="1"
          >
            <a _ngcontent-xck-c91="" class="cashout1 btn btn-sm text-[#212529]">
              {" "}
              Cash Out{" "}
            </a>
          </div>
        </div>
        <div
          _ngcontent-xck-c91=""
          class="col-md-5 col-1 px-lg-0 text-end pe-3 px-lg-0"
          bis_skin_checked="1"
        >
          <i
            _ngcontent-xck-c91=""
            class="fa-solid fa-circle-info float-right rules12 me-3"
          >
            <Info fontSize="small" className="text-black" />
          </i>
        </div>
      </div>
      {/* <Box
        key={market.marketName}
        mx="auto"
        className={`bg-gray-700/[0.5] w-full col-span-12 grid grid-cols-12 items-center`}
      > */}

      <div className="market-rates">
        <div className="row row-top flex flex-wrap flex-row mt-0">
          <div
            className="mn-cont col-md-5 col-7 pr-[12px] max-w-full w-[58.33333333%;] kh:w-[41.66666667%]"
            bis_skin_checked="1"
          >
            <p _ngcontent-xck-c91="" class="min-max mb-0">
              <span _ngcontent-xck-c91="">
                min: <b _ngcontent-xck-c91="">100</b>
              </span>
              <span _ngcontent-xck-c91="" class="max-value">
                max: <b _ngcontent-xck-c91="">10k</b>
              </span>
            </p>
          </div>
          <div class="col-md-7 col-5 kh:w-[58.33333333%] w-[41.66666667%] px-lg-0 pl-[12 text-center px-lg-0 justify-content-end d-flex">
            <p _ngcontent-xck-c91="" class="market-back mb-0">
              <span _ngcontent-xck-c91="" class="back2">
                back
              </span>
              <span _ngcontent-xck-c91="" class="lay2">
                lay
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="app-market-detail">
        <div>
          <>
            {market.runners &&
              market.runners.map((runner, ii) => (
                <div
                  key={ii}
                  className="flex flex-col"
                >
                  <div className="flex align-items-center bg-theme market-data-row odd-row row  text-capitalize text-dark">
                    <div
                      _ngcontent-xck-c85=""
                      class="col-md-5 col-8 w-[58.33333333%;] kh:w-[41.66666667%] "
                      bis_skin_checked="1"
                    >
                      <p _ngcontent-xck-c85="" class="market-name">
                        <i
                          _ngcontent-xck-c85=""
                          class="fa-solid fa-chart-column me-1"
                        >
                          <BarChartIcon fontSize="small" />
                        </i>
                        {`${runner.runnerName} ${
                          runner.handicap !== 0 ? runner.handicap : ""
                        }`}{" "}
                        <em _ngcontent-xck-c85=""></em>
                      </p>
                    </div>
                    
                    <MarketOddsComponentTemp
                      mktBk={mkt}
                      styling2={styling2}
                      ii={ii}
                      handleEventPlaceBet={handleEventPlaceBet}
                      formatNumber={formatNumber}
                      runner={runner}
                      market={market}
                      eventData={eventData}
                      otherMarkets={otherMarkets}
                      showLastTradedPrice={
                        isLineMarket && isLineMarket === true ? false : true
                      }
                    />
                  </div>

                  {/* place bet */}
                  {selectedEventId === runner.runnerName && (
                    <div className={``}>
                      {/* <PlaceBet
                        isLineMarket={isLineMarket}
                        betObj={betObj}
                        setSelectedEventId={setSelectedEventId}
                        otherMarkets={otherMarkets}
                        handlePlaceBet={handlePlaceBet}
                        loadin={loadin}
                        price={price}
                        stack={stack}
                        setPrice={setPrice}
                        setStack={setStack}
                        profit={profit}
                        userData={userData}
                        runnerProfits={runnerProfits}
                      /> */}
                      <PlaceBetKheladi
                        isLineMarket={isLineMarket}
                        betObj={betObj}
                        setSelectedEventId={setSelectedEventId}
                        otherMarkets={otherMarkets}
                        handlePlaceBet={handlePlaceBet}
                        loadin={loadin}
                        price={price}
                        stack={stack}
                        setPrice={setPrice}
                        setStack={setStack}
                        profit={profit}
                        userData={userData}
                        runnerProfits={runnerProfits}
                      />
                    </div>
                  )}
                  <></>
                </div>
              ))}
          </>
        </div>
      </div>

      {/* </Box> */}
    </div>
  );
};
export default MarketComponentKheladi;
