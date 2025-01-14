"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Group, Collapse, Box } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from '@mui/icons-material/Lock';
import Loading from '../inplay/components/Loading';
import { styling1 } from '@/app/exchange/(e)/custom_styling/styling';
import { formatGMTDateTime, hasDatePassed } from 'src/app/exchange/utils/competitionCollase';
import { formatNumber, getIcon, separateTeams, updateProfit } from 'src/app/exchange/utils/utils';
import { EmptyOddCell, NoSelection, OddsComponent } from 'src/app/exchange/components/events/OddsComponent';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { fetchMKTBK, fetchUserData } from 'src/app/api/exchange';
import { INTERVAL } from 'src/app/exchange/constants/mktfetchInterval';
import { placeBet } from 'src/app/api/exchange/bets';
import { sleep } from 'src/app/exchange/utils/sleep';
import { AuthContext } from 'src/app/context/AuthContext';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
import { NAVContext } from '@/app/context/NavContext';
import { CompetitionContext } from '@/app/context/exchange/CompetitonContext';
import PushPinIcon from '@mui/icons-material/PushPin';


const CompetionCollapse = ({ competitionTitle, flicker, matches, sportName, eventTypeId, canBet }) => {
  const { setCurrentCenter, setView } = useContext(NAVContext)
  const { setCurrentMkt } = useContext(CompetitionContext)
  const sportNameMasked = sportName === "Football" ? "Soccer" : sportName
  const [loadin, setLoadin] = useState(false)
  const [openedd, setOpenedd] = useState(true)
  const [hide, setHide] = useState(false)
  const [marketsBook, setMarketsBook] = useState([])
  const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext)
  const [mktIds, setMktIds] = useState([])
  const [isRequesting, setIsRequesting] = useState(false);




  const handleEventClick = (match) => {
    const toktmatch_s = {
      sportName: sportName,
      competitionName: match.series_name,
      competitionTitle: match.series_name,
      event: match,
      markets: [match.market_id],
      eventTypeId: match.sport_id,
      eventId: match.match_id
    }
    localStorage.setItem("2kts", JSON.stringify(toktmatch_s))
    setCurrentCenter("event_markets")

    setView({
      currentView: "event_markets",
      sportName: sportName,
      sportId: match.sport_id,
      competitionName: match.series_name,
      eventId: match.match_id,
      eventName: match.match_name,
      from: "home_popular"
    })

    setCurrentMkt({
      mkt_name: "Popular",
      mkt_id: ""
    })
  }

  const onClick = () => {
    setOpenedd(prev => !prev)
  }
  const getMktIds = async () => {
    try {
      if (matches) {
        let marketIds = []
        for (const event of matches) {
          marketIds.push(event.market_id)
        }
        if (marketIds.length > 0) {
          const mktbook = await fetchMKTBK(marketIds)
          setMarketsBook(mktbook)
          sleep(2000)
          setMktIds(marketIds)
        }
      }
    } catch (error) {
      console.log(2)
    }
  }

  useEffect(() => {
    if (matches && matches.length > 0) {
      getMktIds()
    }
  }, [matches]);

  useEffect(() => {
    if (mktIds.length > 0) {
      const fetchData = async () => {
        try {
          setIsRequesting(true);
          const validMktIDS = mktIds.filter(id => id && typeof id === 'string' && id.trim() !== '');
          if (validMktIDS.length > 0) {
            const mktbook = await fetchMKTBK(validMktIDS);
            if (mktbook.length > 0) {
              setMarketsBook(mktbook);
            }
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsRequesting(false);
        }
      };

      const intervalId = setInterval(() => {
        if (!isRequesting) {
          fetchData();
        }
      }, INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [mktIds, isRequesting]);

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [betObj, setBetObj] = useState({})
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(50);
  const [profit, setProfit] = useState(0)
  const [userD, setUserD] = useState({})



  const handleEventPlaceBet = ({ betType, selectionName, price, stack, eventId, eventName, mktId, selectionId }) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true)
      return
    } else {
      if (userData.status === "suspended") {
        return
      }

      const betObj_ = {
        betType,
        selectionName,
        selectionId,
        price,
        stack,
        eventTypeId,
        sportName: sportName,
        eventName: eventName,
        eventId: eventId,
        market: "Match Odds",
        marketId: mktId
      }
      setPrice(price)
      setBetObj(betObj_)
    }

  };

  useEffect(() => {
    setProfit(updateProfit(stack, price))
  }, [stack, price])

  useEffect(() => {
    (async () => {
      const user = await fetchUserData()
      if (user) {
        setUserD(user)
      }
    })()
  }, [])

  const handlePlaceBet = async (match) => {
    const userData = await fetchUserData()
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setCurrentCenter("userconsent")
      return
    } 
    if (userData) {
      if (!loggedIN) {
        setOpenLogin(true)
        return
      } else {
        if (userData.role != 'normalUser') {
          alert("Oops, You cannot place a bet!")
          return
        }
        if (userData.status === 'suspended') {
          return
        }
        getfreshUserData()
        if (userData.eventList.length > 0 && userData.eventList.includes(sportName === "Soccer" ? "Football" : sportName)) {
          const bal = parseInt(userData.availableBalance)
          if (bal < stack) {
            alert("Insufficient funds!!!")
            return
          }
          const expLimit = parseInt(userData.exposureLimit)
          if (expLimit < stack) {
            alert(`Please try again with a less stack, your Exposure limit is ${expLimit}`)
            return
          }

          const betObj_ = {
            type: betObj.betType,
            selection_name: betObj.selectionName,
            selection_id: betObj.selectionId,
            market_name: betObj.market,
            market_id: betObj.marketId,
            sport_name: sportNameMasked,
            match_name: betObj.eventName,
            match_id: betObj.eventId,
            sport_id: eventTypeId,
            price: price,
            stack: stack,
          };

          setLoadin(true)
          console.log(betObj_)
          const bet_place_status = await placeBet(betObj_)
          if (bet_place_status === false || bet_place_status) {
            getfreshUserData()
            setLoadin(false)
          }
        } else {
          alert(`You do not have access to ${sportName}`)
          return
        }
      }
    }
  };

  return (
    <div className=''>
      {
        matches && matches.length > 0 && (
          <Box mx="auto" className={`bg-gray-800/[0.5] border-b border-gray-900   ${hide && "hidden"}`}>
            <Group position="start" onClick={onClick} className="bg-gradient-to-r from-black to-black px-2 cursor-pointer hover:bg-gray-900/[0.5]">
              <div className="flex text-white justify-between items-center w-full">
                <div className="sm:hidden"></div>
                <div className="flex items-center">
                  <p className="text-lg sm:text-lg text-center font-bold text-gray-300 p-1">{competitionTitle === "Football" ? "Soccer" : competitionTitle}</p>
                </div>
                {openedd ? <ArrowDropUpIcon fontSize='small' className='' /> : matches.length === 0 ? <LockIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
              </div>
            </Group>

            <Collapse in={openedd} className="text-white p-1 w-full">
              {/* LEAGUES */}
              <div className='flex gap-x-4 w-full'>
                <div className="w-full">
                  {matches.length > 0 ?
                    <div className="w-full grid grid-cols-12 gap-x-2">
                    </div> : <Loading />
                  }
                  {matches && matches.length > 0 &&
                    matches.map((match, i) => {

                      const [team1, team2] = separateTeams(match.match_name);
                      const pass = hasDatePassed(match.openDate)

                      let prices = {}
                      if (marketsBook && marketsBook.length > 0) {
                        const marketPrices = marketsBook.filter(marketprice => marketprice.marketId == match.market_id)
                        if (marketPrices.length > 0) {
                          prices = marketPrices[0]
                        }
                      }
                      const eId = match.match_id
                      const date_ = formatGMTDateTime(match.openDate)

                      if (styling1) {
                        return (
                          <div key={i}>
                            <div className="grid grid-cols-12 md:grid-cols-12 bg-gray-900 border-b border-black/[0.2] gap-x-2 hover:bg-gray-700/[0.5] cursor-pointer">
                              {/* time */}

                              <div className="mk:col-span-12 col-span-12 mk:grid-cols-12 grid flex flex-col">
                                {/* event name */}
                                <div className=" col-span-12 mk:col-span-8 md:col-span-8 text-black hover:bg-gray-900 cursor-pointer   items-center rounded py-1" onClick={() => handleEventClick(match)} >
                                  <div className="flex items-center justify-between">
                                    <div className='flex items-center px-1'>

                                      {/* time */}
                                      <div className={`whitespace-normal ${pass ? "text-success flex items-center" : ""} hover:bg-gray rounded px-1`} >
                                        <span className={`${styling1.teamNames} mr-2`}>{team1} {" v "} {team2}</span>
                                        {
                                          pass ?
                                            <span className={`text-sm sm:text-md  tracking-wide font-bold ${flicker ? "text-danger" : "text-success"}`}>In Play</span> :
                                            <p className='text-sm sm:text-md  tracking-wide text-black font-bold'>{date_.date}{" "} {date_.time}</p>
                                        }
                                      </div>
                                    </div>

                                    {
                                      sportName == "Cricket" && (
                                        <div className="flex items-center gap-x-2 px-1">
                                          <p className='bg-[#1D3059] text-white px-1 text-md italic font-bold rounded'>BM</p>
                                          <p className='bg-[#098393] text-white px-1 text-md italic font-bold rounded'>F</p>
                                          <p className='bg-[#E96115] text-white px-1 text-md italic font-bold rounded'>S</p>
                                          {/* E96115 */}
                                          <div className="ms:hidden flex items-center  ">
                                            <PushPinIcon fontSize='large' className='border rounded-full text-black/[0.8]' />
                                          </div>
                                        </div>

                                      )
                                    }
                                  </div>
                                </div>



                                {/*  */}
                                {/* event odds */}
                                <div className="col-span-3 mk:col-span-4 md:col-span-4 grid grid-cols-6 mk:grid-cols-4 md:grid-cols-4 max-mk:grid-cols-7 ">

                                  <div className="max-sm:hidden relative col-span-5  max-mk:col-span-6 md:col-span-4 grid grid-cols-6 gap-x-2">
                                    {
                                      prices.status === "CLOSED" ?
                                        prices.inplay === true ? <div className={`bg-[#F5ACD4]/[0.9] flex justify-center
                                 col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                          <p className='font-medium text-black uppercase'>Betting Paused</p>
                                        </div> : <div className={`
                                  ${prices.status === "CLOSED" ? "bg-[#F5ACD4]/[0.9]" : "bg-[#F5ACD4]"} flex justify-center
                                  col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center z-30`}>
                                          <p className='font-medium text-black uppercase'>{prices.status}</p>
                                        </div> : ""
                                    }

                                    {/* HOME */}
                                    <div className='col-span-2 '>
                                      <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                        <div>
                                          {prices && prices.runners && prices.runners[0].ex.availableToBack && prices.runners[0].ex.availableToBack.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              team={team1}
                                              selectionId={prices.runners[0].selectionId}
                                              price={prices.runners[0].ex.availableToBack[0].price}
                                              size={formatNumber(prices.runners[0].ex.availableToBack[0].size)}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="back"

                                            />

                                          ) : prices && prices.runners && prices.runners[0] && prices.runners[0].selectionId ? (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              selectionId={prices.runners[0].selectionId}
                                              team={team1}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="back"

                                            />
                                          ) :
                                            <NoSelection
                                              dontShowSize={true}
                                              type="back"
                                            />}
                                        </div>
                                        <div>
                                          {prices && prices.runners && prices.runners[0].ex.availableToLay && prices.runners[0].ex.availableToLay.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              team={team1}
                                              selectionId={prices.runners[0].selectionId}
                                              price={prices.runners[0].ex.availableToLay[0].price}
                                              size={formatNumber(prices.runners[0].ex.availableToLay[0].size)}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="lay"

                                            />
                                          ) : prices && prices.runners && prices.runners[0] && prices.runners[0].selectionId ? (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              selectionId={prices.runners[0].selectionId}
                                              team={team1}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="lay"

                                            />
                                          ) :
                                            <NoSelection
                                              dontShowSize={true}
                                              type="lay"
                                            />}
                                        </div>
                                      </div>
                                    </div>


                                    {/*  tie */}
                                    <div className='col-span-2 '>
                                      <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                        <div>

                                          {prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2].ex.availableToBack && prices.runners[2].ex.availableToBack.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              team={"The Draw"}
                                              selectionId={prices.runners[2].selectionId}
                                              price={prices.runners[2].ex.availableToBack[0].price}
                                              size={formatNumber(prices.runners[2].ex.availableToBack[0].size)}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="back"

                                            />
                                          ) : prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2] && prices.runners[2].selectionId ? (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              selectionId={prices.runners[2].selectionId}
                                              team={"The Draw"}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="back"
                                            />
                                          ) :
                                            <NoSelection
                                              dontShowSize={true}
                                              type="back"
                                            />}
                                        </div>
                                        {/* lay */}
                                        <div>
                                          {prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2].ex.availableToLay && prices.runners[2].ex.availableToLay.length > 0 ? (
                                            <OddsComponent
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              team={"The Draw"}
                                              selectionId={prices.runners[2].selectionId}
                                              price={prices.runners[2].ex.availableToLay[0].price}
                                              size={formatNumber(prices.runners[2].ex.availableToLay[0].size)}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="lay"

                                            />
                                          ) : prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2] && prices.runners[2].selectionId ? (
                                            <EmptyOddCell
                                              styling1={styling1}
                                              dontShowSize={true}
                                              eventName={match.match_name}
                                              marketId={match.market_id}
                                              marketName={match.market_name}
                                              selectionId={prices.runners[2].selectionId}
                                              team={"The Draw"}
                                              handlePlaceBet={handleEventPlaceBet}
                                              setSelectedOdd={setSelectedEventId}
                                              eventId={eId}
                                              type="lay"

                                            />
                                          ) :
                                            <NoSelection
                                              dontShowSize={true}

                                              type="lay"
                                            />}
                                        </div>
                                      </div>
                                    </div>


                                    {/* away */}
                                    {
                                      prices && prices.runners && prices.numberOfRunners === 3 ?
                                        (
                                          <div className='col-span-2 '>
                                            <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                              {/* back */}
                                              <div>
                                                {prices.runners[1].ex.availableToBack && prices.runners[1].ex.availableToBack.length > 0 ? (
                                                  <OddsComponent
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    team={team2}
                                                    selectionId={prices.runners[1].selectionId}
                                                    marketId={match.market_id}
                                                    marketName={match.market_name}
                                                    price={prices.runners[1].ex.availableToBack[0].price}
                                                    size={formatNumber(prices.runners[1].ex.availableToBack[0].size)}
                                                    handlePlaceBet={handleEventPlaceBet}
                                                    setSelectedOdd={setSelectedEventId}
                                                    eventId={eId}
                                                    type="back"

                                                  />
                                                ) : prices.runners[1] && prices.runners[1].selectionId ? (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    marketId={match.market_id}
                                                    marketName={match.market_name}
                                                    selectionId={prices.runners[1].selectionId}
                                                    team={team2}
                                                    handlePlaceBet={handleEventPlaceBet}
                                                    setSelectedOdd={setSelectedEventId}
                                                    eventId={eId}
                                                    type="back"

                                                  />
                                                ) :

                                                  <NoSelection
                                                    dontShowSize={true}
                                                    type="back"
                                                  />
                                                }
                                              </div>
                                              {/* lay */}
                                              <div>
                                                {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                  <OddsComponent
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    team={team2}
                                                    marketId={match.market_id}
                                                    marketName={match.market_name}
                                                    price={prices.runners[1].ex.availableToLay[0].price}
                                                    size={formatNumber(prices.runners[1].ex.availableToLay[0].size)}
                                                    handlePlaceBet={handleEventPlaceBet}
                                                    setSelectedOdd={setSelectedEventId}
                                                    selectionId={prices.runners[1].selectionId}
                                                    eventId={eId}
                                                    type="lay"

                                                  />
                                                ) : prices.runners[1] && prices.runners[1].selectionId && (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    marketId={match.market_id}
                                                    marketName={match.market_name}
                                                    selectionId={prices.runners[1].selectionId}
                                                    team={team2}
                                                    handlePlaceBet={handleEventPlaceBet}
                                                    setSelectedOdd={setSelectedEventId}
                                                    eventId={eId}
                                                    type="lay"

                                                  />
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ) :
                                        prices && prices.runners && prices.numberOfRunners === 2 ?
                                          (
                                            <div className='col-span-2 '>
                                              <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                                <div>
                                                  {prices.runners[1].ex.availableToBack && prices.runners[1].ex.availableToBack.length > 0 ? (
                                                    <OddsComponent
                                                      styling1={styling1}
                                                      dontShowSize={true}
                                                      eventName={match.match_name}
                                                      team={team2}
                                                      selectionId={prices.runners[1].selectionId}
                                                      marketId={match.market_id}
                                                      marketName={match.market_name}
                                                      price={prices.runners[1].ex.availableToBack[0].price}
                                                      size={formatNumber(prices.runners[1].ex.availableToBack[0].size)}
                                                      handlePlaceBet={handleEventPlaceBet}
                                                      setSelectedOdd={setSelectedEventId}
                                                      eventId={eId}
                                                      type="back"

                                                    />

                                                  ) : prices.runners[1] && prices.runners[1].selectionId ? (
                                                    <EmptyOddCell
                                                      styling1={styling1}
                                                      eventName={match.match_name}
                                                      marketId={match.market_id}
                                                      marketName={match.market_name}
                                                      selectionId={prices.runners[1].selectionId}
                                                      team={team2}
                                                      handlePlaceBet={handleEventPlaceBet}
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
                                                </div>
                                                <div>
                                                  {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                    <OddsComponent
                                                      styling1={styling1}
                                                      dontShowSize={true}
                                                      eventName={match.match_name}
                                                      team={team2}
                                                      selectionId={prices.runners[1].selectionId}
                                                      marketName={match.market_name}
                                                      price={prices.runners[1].ex.availableToLay[0].price}
                                                      size={formatNumber(prices.runners[1].ex.availableToLay[0].size)}
                                                      handlePlaceBet={handleEventPlaceBet}
                                                      setSelectedOdd={setSelectedEventId}
                                                      eventId={eId}
                                                      marketId={match.market_id}
                                                      type="lay"

                                                    />
                                                  ) : prices.runners[1] && prices.runners[1].selectionId ? (
                                                    <EmptyOddCell
                                                      styling1={styling1}
                                                      eventName={match.match_name}
                                                      marketId={match.market_id}
                                                      selectionId={prices.runners[1].selectionId}
                                                      marketName={match.market_name}
                                                      team={team2}
                                                      handlePlaceBet={handleEventPlaceBet}
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
                                                </div>
                                              </div>
                                            </div>
                                          )
                                          :
                                          (
                                            <div className='col-span-2 '>
                                              <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full p-0'>
                                                {/* <div> */}

                                                {prices && prices.runners && prices.runners.length > 1 && prices.runners[1] && prices.runners[1].selectionId ? (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    marketId={match.market_id}
                                                    selectionId={prices.runners[1].selectionId}
                                                    marketName={match.market_name}
                                                    team={team2}
                                                    handlePlaceBet={handleEventPlaceBet}
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

                                                {prices && prices.runners && prices.runners.length > 1 && prices.runners[1] && prices.runners[1].selectionId ? (
                                                  <EmptyOddCell
                                                    styling1={styling1}
                                                    dontShowSize={true}
                                                    eventName={match.match_name}
                                                    marketId={match.market_id}
                                                    selectionId={prices.runners[1].selectionId}
                                                    marketName={match.market_name}
                                                    team={team2}
                                                    handlePlaceBet={handleEventPlaceBet}
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

                                              </div>
                                            </div>
                                          )
                                    }

                                  </div>
                                </div>

                              </div>
                            </div>

                            <div className="mk:hidden"></div>
                            {/* Place bet */}
                            {match && selectedEventId === match.match_id && (
                              <PlaceBet
                                betObj={betObj}
                                setSelectedEventId={setSelectedEventId}
                                handlePlaceBet={handlePlaceBet}
                                loadin={loadin}
                                price={price}
                                stack={stack}
                                setPrice={setPrice}
                                setStack={setStack}
                                profit={profit}
                                userData={userData}
                                event={match}

                              />
                            )}
                          </div>
                        )
                      }

                    })
                  }
                </div>
              </div>


            </Collapse>
          </Box>
        )
      }
    </div >
  )
}

export default CompetionCollapse





