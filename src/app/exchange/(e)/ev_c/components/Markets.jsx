"use client"
import React, { useContext, useEffect, useState } from 'react'
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import MarketComponent from './MarketComponent';
import { CompetitionContext } from 'src/app/context/exchange/CompetitonContext';
import { separateTeams } from 'src/app/exchange/utils/utils';
import { fetchEventInnings, fetchEventIncidents, fetcheEventMarkets, fetcheEventScores, fetchEventFancyMarkets, fetchMKTBK, getFancyMarkets, getScores, getBookmakerMarket } from 'src/app/api/exchange';
import { MarketsContext } from 'src/app/context/exchange/MarketsContext';
import Loading from 'src/app/exchange/components/Loading';
import CricketScores from '@/app/exchange/components/scoreboard/CricketScores';
import FancyMarketComponent from './FancyMarkets';
import BookmakerMarketComponent from './Bookmaker';
import NewTennis from "@/app/exchange/components/scoreboard/NewTennis";
import { NAVContext } from '@/app/context/NavContext';
import { INTERVAL } from '@/app/exchange/constants/mktfetchInterval';
import MarketGrid from './MarketGrid';
import { MyBetsContext } from '@/app/context/MybetsContext';
import SoccerScores2 from '@/app/exchange/components/scoreboard/Soccer2';
import TennisScoreboard from '@/app/exchange/components/scoreboard/TennisScoreboard';
import ScoreboardCricket from '@/app/exchange/components/scoreboard/ScoreboardCricket';

const Markets = ({ toggleMarketSideBar, refresh, setRefresh, globalSettings }) => {
  const { getMyBetsFresh } = useContext(MyBetsContext)
  const { setMarkets } = useContext(MarketsContext);
  const { currentMkt, setCurrentMkt } = useContext(CompetitionContext)
  const { view, setCurrentCenter} = useContext(NAVContext);
  const [bookmakerMarkets, setBookmakerMarkets] = useState([])
  const [mktBks, setMktBks] = useState({})
  const [marketIds, setMarketIds] = useState([])

  const [cricketEvent, setCricketEvent] = useState({});
  const [teamNames, setTeamNames] = useState([]);
  const [mkts, setMkts] = useState([]);
  const [premiumMkts, setPremiumMkts] = useState([]);
  const [premiumCategories, setPremiumCategories] = useState([]);
  const [fancyMarkets, setFancyMarkets] = useState({})
  const [scores, setScores] = useState({});
  const [inc, setInc] = useState({});
  const [innings, setInnings] = useState({});
  const [loadin, setLoadin] = useState(true);
  const [evId, setEvId] = useState("");
  const [evName, setEvName] = useState("");
  const [spName, setSpName] = useState("");
  const popularMarkets = ["Match Odds", "Tied Match"]

  const [category, setCategory] = useState("all_markets")
  const [premiumCategory, setPremiumCategory] = useState("All Markets")
  const [otherMarkets, setOtherMarkets] = useState("premium")
  const [fancyMktCategories, setFancyMktsCategories] = useState([])

  const CountdownTimer = ({ targetTime }) => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    const calculateTimeLeft = () => {
      const difference = new Date(targetTime) - new Date();

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return { hours: 0, minutes: 0, seconds: 0 };
      }
    };

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, [targetTime]);

    return (
      <div>
        {timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
          <p className="text-warning">Bet started</p>
        ) : (
          <p className="text-warning">
            Countdown: {`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </p>
        )}
      </div>
    );
  };



  useEffect(() => {
    getMyBetsFresh(evId)
  }, [evId])

  useEffect(() => {

    const fetchData = async () => {
      try {
        if (view.eventId) {

          const markets = await fetcheEventMarkets(view.eventId, view.sportId);

          if (markets) {
            setMkts(markets);
            const filtered = markets.filter(mkt => !popularMarkets.includes(mkt.marketName))
            setPremiumMkts(filtered)
            setPremiumCategories(filtered)
            setMarkets(markets);
            const mktIds = markets.map(mkt => mkt.marketId)
            setMarketIds(mktIds)
          }
          setEvId(view.eventId);
          setSpName(view.sportName);
          setEvName(view.eventName);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [view]);

  useEffect(() => {
    if (evName) {
      const teams = separateTeams(evName);
      if (teams.length === 2) {
        setTeamNames(teams);
      }
    }
  }, [evName]);
  const scoresRunner = async () => {
    try {
      const scores = await getScores(evId)
      if (scores) {
        setScores(scores[0])
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (evId) {
      scoresRunner(evId)
      const intervalId = setInterval(() => scoresRunner(evId), INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [evId])

  useEffect(() => {
    let isMounted = true;


    const onClick = () => {
      setOpen(prev => !prev)
    }

    const fetchData = async () => {
      try {
        if (evId && isMounted) {
          const [inc, scores, innings] = await Promise.all([
            fetchEventIncidents(evId),
            fetcheEventScores(evId),
            spName === "Cricket" ? fetchEventInnings(evId) : Promise.resolve(null)
          ]);



          if (scores) {

            if (inc) {
              setInc(inc);
            }
            setLoadin(false);
          }

          if (spName === "Cricket" && innings) {
            setInnings(innings);
          }
          run()
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [evId, spName]);



  const run = async () => {
    if (evId) {
      getBookmaker(evId)
      getFancy(evId)
    }
  }
  const getFancy = async () => {
    const markets = await getFancyMarkets(evId, category)
    if (markets) {
      setFancyMarkets(markets)
    }
  }
  const getBookmaker = async () => {
    const markets = await getBookmakerMarket(evId)
    if (markets) {
      setBookmakerMarkets(markets)
    }
  }


  const runner_ = async (mktIds) => {
    try {
      const mkt_book = await fetchMKTBK(mktIds)
      if (mkt_book && mkt_book.length > 0) {
        setMktBks(mkt_book)
        getFancy()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (marketIds.length > 0) {

      runner_(marketIds);
      const intervalId = setInterval(() => runner_(marketIds), INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [marketIds]);


  useEffect(() => {
    getFancy()
  }, [category]);




  useEffect(() => {
    if (fancyMarkets && fancyMarkets.length > 0) {
      const allMarketCategories = fancyMarkets.map(mkt => mkt.category)
      let categories = [...fancyMktCategories]
      for (const cat of allMarketCategories) {
        if (!categories.includes(cat)) {
          categories.push(cat)
        }
      }
      if (categories.length > 0) {
        setFancyMktsCategories(categories)
      }

    }
  }, [fancyMarkets])




  useEffect(() => {
    if (premiumCategory === "All Markets" && mkts && mkts.length > 0) {
      const filtered = mkts.filter(mkt => !popularMarkets.includes(mkt.marketName))
      setPremiumMkts(filtered)
    }
    if (premiumCategory != "All Markets" && mkts && mkts.length > 0) {
      const filtered = mkts.filter(mkt => mkt.marketName === premiumCategory)
      setPremiumMkts(filtered)
    }
  }, [premiumCategory])

  let targetTime = "2024-09-13T23:00:00.000Z";
  const event_ = localStorage.getItem("2kts")
  const event = JSON.parse(event_)
  targetTime = event?.event?.openDate

  return (
    <div className="">
      {/* top bar navigation */}
      {teamNames.length === 2 ? (
        <>

          {/* scores */}
          <div className="flex flex-col w-full">



            {!loadin && scores != {}  ? (
              <>
                {spName === "Soccer" && (
                  <SoccerScores2 scores={scores} incidents={inc} />
                )}
                {spName === "Cricket" && (
                  <ScoreboardCricket
                    scores={scores}
                    matchId={view.eventId}
                    incidents={inc}
                    innings={innings && innings.innings}
                  />
                )}
                {spName === "Tennis" && (
                  <TennisScoreboard
                    scores={scores}
                    incidents={inc}
                    teamA={teamNames[0]}
                    teamB={teamNames[1]}
                  />
                )}
              </>
            ) : (
              <div className="sm:min-h-[15vh] relative h-[100px] flex flex-col ">
                <div className='z-99 absolute top-0 right-0 bottom-0 left-0 h-full w-full'>
                  <img src="/casino.jpg" alt="casino" className='object-cover h-full w-full' />
                </div>
                <div className="absolute z-999 bg-black/[0.5] top-0 bottom-0 right-0 left-0 h-full flex items-start justify-between p-1">
                  <div className="flex items-center">
                    <p className="text-xs md:text-sm font-bold tracking-wider text-white">
                      OPEN
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-xs md:text-sm font-bold tracking-wider text-white">
                      {teamNames[0]}
                    </p>
                    <p className="text-xs md:text-sm font-bold tracking-wider text-white px-2">
                      vs
                    </p>
                    <p className="text-xs md:text-sm font-bold tracking-wider text-white">
                      {teamNames[1]}
                    </p>
                  </div>
                </div>

                <div className=" flex items-center justify-center text-xs md:text-sm font-bold tracking-wider text-white">

                  <CountdownTimer targetTime={targetTime} />
                </div>
              </div>
            )}
          </div>
          {/* end scores */}


          <div className="md:hidden flex items-center bg-[#E0E6E6] p-2 gap-x-2 w-full overflow-x-auto scrollbar-hidden">
            <div
              className={`p-2 flex items-center justify-center rounded-full text-black ${currentMkt.mkt_name === "All" ? 'bg-warning border border-black text-black' : "bg-black text-gray"}`}
            >
              <p
                onClick={() => {
                  setCurrentMkt({
                    mkt_name: "All",
                    mkt_id: ""
                  })
                  toggleMarketSideBar();
                }}
                className="text-sm font-bold cursor-pointer whitespace-nowrap"
              >
                All
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <div
                className={`p-2 flex items-center justify-center rounded-full text-black ${currentMkt.mkt_name === "Popular" ? 'bg-warning border border-black' : "bg-black text-gray"}`}
                onClick={() => {
                  setCurrentMkt({
                    mkt_name: "Popular",
                    mkt_id: ""
                  })
                  // toggleMarketSideBar()
                }}
              >
                <p className="flex text-sm cursor-pointer tracking-wide font-bold whitespace-nowrap">
                  Popular
                </p>
              </div>
              {
                mkts && mkts.length > 0 && mkts.map((market, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 hover:bg-gray-400 rounded-full ${currentMkt.mkt_name === market.marketName ? 'bg-warning border border-black text-primary' : "bg-black text-gray"}`}
                    onClick={() => {
                      setCurrentMkt({
                        mkt_name: market.marketName,
                        mkt_id: market.marketId
                      })
                      // toggleMarketSideBar()
                    }}
                  >
                    <p className="flex justify-center text-sm cursor-pointer tracking-wide font-bold whitespace-nowrap">
                      {market.marketName}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex flex-col  items-center gap-1">
            {
              mkts != undefined &&
              mkts.map((market, i) => {
                if (currentMkt.mkt_name === "Popular") {
                  if (market.marketName === "Match Odds") {
                    return (
                      <MarketComponent
                        marketBookOdds={mktBks}
                        globalSettings={globalSettings}
                        key={i}
                        eventId={evId}
                        setRefresh={setRefresh}
                        market={market}
                        openedd={true}
                        eventData={cricketEvent}
                        eventTypeId={view.sportId}
                        sportName={spName}
                        eventName={evName}
                      />
                    );
                  }
                }

                return null;
              })
            }
          </div>

          <div className="flex flex-col  items-center gap-1">
            {
              mkts != undefined &&
              mkts.map((market, i) => {
                if (currentMkt.mkt_name === "Popular") {
                  if (market.marketName === "Tied Match") {
                    return (
                      <MarketComponent
                        marketBookOdds={mktBks}
                        globalSettings={globalSettings}
                        key={i}
                        eventId={evId}
                        setRefresh={setRefresh}
                        market={market}
                        openedd={true}
                        eventData={cricketEvent}
                        eventTypeId={view.sportId}
                        sportName={spName}
                        eventName={evName}
                      />
                    );
                  }
                }

                return null;
              })
            }
          </div>
          <div className="flex flex-col  items-center gap-1">
            {
              mkts != undefined &&
              mkts.map((market, i) => {
                if (market.marketName === currentMkt.mkt_name) {
                  return (
                    <MarketComponent
                      marketBookOdds={mktBks}
                      key={i}
                      eventId={evId}
                      setRefresh={setRefresh}
                      market={market}
                      refresh={refresh}
                      openedd={true}
                      eventData={cricketEvent}
                      eventTypeId={view.sportId}
                      sportName={spName}
                      eventName={evName}
                    />
                  );
                }

                if (currentMkt.mkt_name === "Popular") {
                  if (
                    market.marketName === "Moneyline" ||
                    market.marketName === "Draw no Bet" ||
                    market.marketName === "Overtime Played" ||
                    market.marketName === "Half Time" ||
                    market.marketName === "Head To Head" ||
                    market.marketName === "Both teams to Score?"
                  ) {
                    return (
                      <MarketComponent
                        marketBookOdds={mktBks}
                        globalSettings={globalSettings}
                        key={i}
                        eventId={evId}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        market={market}
                        openedd={true}
                        eventData={cricketEvent}
                        eventTypeId={view.sportId}
                        sportName={spName}
                        eventName={evName}
                      />
                    );
                  }
                }
                return null;
              })
            }
          </div>

          {
            currentMkt.mkt_name === "Popular" && (
              <div className="flex flex-col w-full  items-center gap-1 p-1 mt-4">

                {
                  evId != "" &&
                  <div className="w-full">
                    <BookmakerMarketComponent setRefresh={setRefresh} matchId={evId} openedd={false} bookmakerMarkets={bookmakerMarkets} />
                  </div>
                }
              </div>
            )
          }

          <div className="flex flex-col">
            <div className={`${otherMarkets === "premium" ? "bg-[#087887]" : "bg-[#DB4E08]"} w-full`}>
              <div className="flex text-white items-center gap-x-2 w-full border-b border-gray-900/[0.5] ">
                <p
                  className={`mk:text-[1rem] text-[0.833rem] ${otherMarkets === "premium" ? "bg-[#087887]" : "bg-[#087887]"} text-white font-bold px-4 py-1.5 cursor-pointer relative`}
                  onClick={() => setOtherMarkets("premium")}
                  style={{
                    clipPath: "polygon(0 100%, 100% 100%, 85% 0, 0 0)",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                >
                  Premium Markets
                </p>

                <p
                  className={`mk:text-[1rem] text-[0.833rem] ${otherMarkets === "fancy" ? "bg-[#DB4E08]" : "bg-[#DB4E08]"} text-black font-bold px-4 py-1.5 cursor-pointer relative`}
                  onClick={() => setOtherMarkets("fancy")}
                  style={{
                    clipPath: "polygon(0 100%, 100% 100%, 85% 0, 0 0)",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px"
                  }}
                >
                  Fancy Markets
                </p>
              </div>


              {otherMarkets === "fancy" && (
                <div className="flex flex-nowrap overflow-x-auto mt-1 gap-x-2 bg-[#087887]/[0.5]" style={{ msOverflowStyle: "none", scrollbarWidth: "none", overflow: "auto", maxWidth: "100%" }}>
                  {fancyMktCategories.length > 0 && (
                    <p className={`${"all_markets" === category ? "bg-gradient-to-r from-blue-700 to-green-900" : "bg-gray-500"} w-full flex justify-center items-center px-3 py-1 cursor-pointer rounded text-[0.85rem] font-medium`} style={{ whiteSpace: 'nowrap' }} onClick={() => setCategory("all_markets")}>
                      All Markets
                    </p>
                  )}
                  {fancyMktCategories.length > 0 && fancyMktCategories.map((category_, i) => (
                    <p key={i} className={`${category_ === category ? "bg-gradient-to-r from-blue-700 to-green-900" : "bg-gray-500"} w-full flex justify-center items-center px-2 py-1 cursor-pointer rounded text-[0.85rem] font-medium`} style={{ whiteSpace: 'nowrap' }} onClick={() => setCategory(category_)}>
                      {category_}
                    </p>
                  ))}
                </div>
              )}

              {otherMarkets === "premium" && (
                <div className="flex flex-nowrap overflow-x-auto mt-1 gap-x-2" style={{ msOverflowStyle: "none", scrollbarWidth: "none", overflow: "auto", maxWidth: "100%" }}>
                  {premiumCategories.length > 0 && (
                    <p className={`${"all_markets" === premiumCategory ? "bg-gradient-to-r from-blue-700 to-green-900" : "bg-gray-500"} w-full flex justify-center items-center px-3 py-1 cursor-pointer rounded text-[0.85rem] font-medium`} style={{ whiteSpace: 'nowrap' }} onClick={() => setPremiumCategory("All Markets")}>
                      All Markets
                    </p>
                  )}
                  {premiumCategories.length > 0 && premiumCategories.map((mkt, i) => (
                    <p key={i} className={`${mkt.marketName === premiumCategory ? "bg-gradient-to-r from-blue-700 to-green-900" : "bg-gray-500"} w-full flex justify-center items-center px-2 py-1 cursor-pointer rounded text-[0.85rem] font-medium`} style={{ whiteSpace: 'nowrap' }} onClick={() => setPremiumCategory(mkt.marketName)}>
                      {mkt.marketName}
                    </p>
                  ))}
                </div>
              )}
            </div>


            {
              evId != "" && otherMarkets === "fancy" &&
              <div className="w-full">
                <FancyMarketComponent setRefresh={setRefresh} matchId={evId} sportName={spName} fancyMkts={fancyMarkets} openedd={false} />
              </div>
            }


            {otherMarkets === "premium" &&
              <MarketGrid
                otherMarkets={otherMarkets}
                mkts={premiumMkts}
                currentMkt={currentMkt}
                mktBks={mktBks}
                evId={evId}
                setRefresh={setRefresh}
                cricketEvent={cricketEvent}
                view={view}
                spName={spName}
                evName={evName}
              />
            }

          </div>



        </>
      ) : (
        <Loading stylings={"min-h-[70vh]"} />
      )}
    </div>
  );
};

export default Markets;
