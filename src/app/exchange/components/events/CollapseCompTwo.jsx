



"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Group, Collapse, Box } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LockIcon from '@mui/icons-material/Lock';
import Loading from '../Loading';
import { formatGMTDateTime, hasDatePassed } from '../../utils/competitionCollase';
import { EmptyOddCell, NoSelection, OddsComponent } from './OddsComponent';
import { formatNumber, getIcon, separateTeams, updateProfit } from '../../utils/utils';
import { styling1 } from 'src/app/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { CompetitionContext } from 'src/app/context/exchange/CompetitonContext';
import { placeBet } from 'src/app/api/exchange/bets';
import { fetchUserData } from 'src/app/api/exchange';
import PlaceBet from '../betslip/PlaceBet';
import { NAVContext } from '@/app/context/NavContext';

const CompetionCollapseTwo = ({ competitionTitle, matches, opened, marketsBook, sportId, sportName, competitionRegion }) => {
  const [openedd, setOpenedd] = useState(opened)
  const [hide, setHide] = useState(false)
  const { userData } = useContext(AuthContext)
  const { setCurrentCenter, setView } = useContext(NAVContext)
  const { setCurrentMkt } = useContext(CompetitionContext)
  const [loadin, setLoadin] = useState(false)


  const handleEventClick = (match) => {
    const event_id = match.match_id
    const tokts = {
      sportName: sportName,
      competitionName: match.series_name,
      competitionTitle,
      event: match,
      markets: [match.market_id],
      eventId: event_id,
      eventTypeId: sportId


    }
    localStorage.setItem("2kts", JSON.stringify(tokts))
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

  const [openOdds, setOpenOdds] = useState([]);

  // Initialize the open/closed state based on the number of matches
  useEffect(() => {
    if (matches && matches.length > 0) {
      setOpenOdds(new Array(matches.length).fill(false));
    }
  }, [matches]);


  const [selectedEventId, setSelectedEventId] = useState(null);
  const [betObj, setBetObj] = useState({})
  const [price, setPrice] = useState(1.0);
  const [stake, setStake] = useState(50);
  const [profit, setProfit] = useState(0)
  const { setOpenLogin, getfreshUserData } = useContext(AuthContext)


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

  const handleEventPlaceBet = ({ betType, selectionName, price, stake, eventId, eventName, mktId, selectionId, marketName }) => {
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
        stake,
        eventTypeId: sportId,
        sportName: sportName,
        eventName: eventName,
        eventId: eventId,
        market: marketName,
        marketId: mktId
      }
      console.log(betObj_)
      setPrice(price)
      setBetObj(betObj_)
    }

  };


  useEffect(() => {
    setProfit(updateProfit(stake, price))
  }, [stake, price])


  const handlePlaceBet = async () => {
    const userDataFresh = await fetchUserData()
    if (userDataFresh) {
      const loggedIN = isAuthenticated();
      if (!loggedIN) {
        alert("Please Login to continue")
        setOpenLogin(true)
        return
      } else {
        if (userDataFresh.role != 'normalUser') {
          alert("Oops, You cannot place a bet!")
          return
        }
        getfreshUserData()
        if (userDataFresh.eventList.length > 0 && userDataFresh.eventList.includes(sportName === "Soccer" ? "Football" : sportName)) {
          const bal = parseInt(userDataFresh.availableBalance)
          if (bal < stake) {
            alert("Insufficient funds!!!")
            return
          }
          const expLimit = parseInt(userDataFresh.exposureLimit)
          if (expLimit < stake) {
            expLimit == 0 ? alert(`Opps! Exposure limit is ${expLimit}`) : alert(`Please try again with a less stake, your Exposure limit is ${expLimit}`)
            return
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
          setLoadin(true)
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

  const sportname = sportName === "Soccer" ? "Football" : sportName
  const icon = getIcon(sportname)

  return (
    <div className='w-full'>
      {
        matches && matches.length === 0 && (
          <p className='text-gray-400 font-medium text-[0.8rem]'>{`Oops! No ${competitionTitle} matches found at the moment`}</p>
        )
      }
      {
        matches && matches.length > 0 && (
          <Box mx="auto" className={`bg-gray-800/[0.5] border-b border-gray-900   ${hide && "hidden"}`}>
            <Group position="start" onClick={onClick} className="bg-gradient-to-r from-black to-black px-2 cursor-pointer hover:bg-gray-900/[0.5]">
              <div className="flex text-white justify-between items-center w-full">
                <div className="flex items-center">
                  <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${competitionRegion || "GB"}.svg`} alt={`${competitionRegion}`} className="h-[2.5rem]" />
                  <p className="text-[0.9rem] font-bold text-white p-1">{competitionTitle}</p>
                </div>
                {openedd ? <ArrowDropUpIcon fontSize='small' className="text-white" /> : matches.length === 0 ? <LockIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
              </div>
            </Group>

            <Collapse in={openedd} className="text-white py-1 w-full">
              {/* LEAGUES */}
              <div className='flex gap-x-4 w-full'>
                <div className="w-full">
                  {matches.length > 0 ?
                    <div className="w-full grid grid-cols-12 gap-x-2">
                    </div> : <Loading />
                  }
                  {matches && matches.length > 0 &&
                    matches.map((match, i) => {

                      let eventID = ""
                      let eId = ""
                      if (match && match.match_id) {
                        eventID = match.match_id
                        eId = match.match_id
                      }
                      if (eventID != "") {
                        const [team1, team2] = separateTeams(match.match_name);
                        const pass = hasDatePassed(match.openDate)

                        let prices = {}
                        const mkt_id = match.market_id

                        if (marketsBook && marketsBook.length > 0) {
                          // console.log(marketsBook)
                          const marketPrices = marketsBook.filter(marketprice => marketprice.marketId == mkt_id)
                          if (marketPrices.length > 0) {
                            prices = marketPrices[0]
                          }
                        }
                        const date_ = formatGMTDateTime(match.openDate)

                        if (styling1) {
                          return (
                            <div key={i}>
                              <div className="grid grid-cols-12 md:grid-cols-12 bg-gray-900 border-b border-t border-gray-600 gap-x-2 hover:bg-gray-700/[0.5] cursor-pointer py-1">
                                {/* time */}

                                <div className={`mk:col-span-1 col-span-2 mk:block hidden ${pass && "bg-green-600 flex justify-center items-center"} hover:bg-gray-900 h-full rounded-r`}>
                                  {pass ?
                                    <div className="flex justify-center items-center w-full h-full">
                                      <p className='text-xs  tracking-wide text-white font-small'>In Play</p>
                                    </div> :
                                    <div className="flex flex-col justify-center items-center">
                                      <p className='text-xs  tracking-wide text-primary font-small'>{date_.date}</p>
                                      <p className='text-xs  tracking-wide text-primary font-small'>{date_.time}</p>
                                    </div>}
                                </div>
                                <div className="mk:col-span-11 col-span-12 mk:grid-cols-12 grid flex flex-col">
                                  {/* event name */}
                                  <div className="col-span-6 mk:col-span-8 md:col-span-8 hover:bg-gray cursor-pointer  grid grid-cols-1  items-center rounded py-1 text-black" onClick={() => handleEventClick(match)} >


                                    <div className='flex  p-1 bg-gray-900/[0.5]'>
                                      <p className={`${styling1.teamNames} `}>{team1}</p>
                                      <p className={`${styling1.teamNames} px-2 `}>vs</p>
                                      <p className={`${styling1.teamNames}`}>{team2}</p>
                                    </div>
                                  </div>



                                  {/*  */}
                                  {/* event odds */}
                                  <div className="col-span-6 mk:col-span-4 md:col-span-4 grid grid-cols-6 mk:grid-cols-4 md:grid-cols-4 max-mk:grid-cols-7 ">

                                    <div className={`col-span-1 mk:hidden ${pass && "bg-green-600 flex justify-center items-center"} hover:bg-gray-900 h-full rounded-r  shadow-lg max-mk:mr-1`}>
                                      {
                                        pass ?
                                          <div className="flex justify-center gap-x-1  items-center w-full h-full">

                                            <p className='text-[0.695rem] md:text-[0.785rem]   tracking-wide text-white font-bold'>In Play</p>
                                          </div> :
                                          <div className="flex flex-col justify-center items-center">
                                            <p className='text-[0.65rem] md:text-[0.8rem]  tracking-wide text-primary font-bold'>{date_.date}</p>
                                            <p className='text-[0.65rem] md:text-[0.8rem]  tracking-wide text-primary font-bold'>{date_.time}</p>
                                          </div>
                                      }

                                    </div>
                                    <div className="relative col-span-5  max-mk:col-span-6 md:col-span-4 grid grid-cols-6 gap-x-2">
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
                                            ) : <NoSelection
                                              type="back"
                                            />}
                                          </div>
                                          <div>
                                            {prices && prices.runners && prices.runners[0].ex.availableToLay && prices.runners[0].ex.availableToLay.length > 0 ? (
                                              <OddsComponent
                                                styling1={styling1}
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
                                            ) : <NoSelection
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
                                            ) : <NoSelection
                                              type="back"
                                            />}
                                          </div>
                                          {/* lay */}
                                          <div>
                                            {prices && prices.runners && prices.numberOfRunners === 3 && prices.runners[2].ex.availableToLay && prices.runners[2].ex.availableToLay.length > 0 ? (
                                              <OddsComponent
                                                styling1={styling1}
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
                                            ) : <NoSelection

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
                                                  ) :
                                                    <NoSelection
                                                      type="back"
                                                    />
                                                  }
                                                </div>
                                                {/* lay */}
                                                <div>
                                                  {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                    <OddsComponent
                                                      styling1={styling1}
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
                                                        type="back"
                                                      />
                                                    )}
                                                  </div>
                                                  <div>
                                                    {prices.runners[1].ex.availableToLay && prices.runners[1].ex.availableToLay.length > 0 ? (
                                                      <OddsComponent
                                                        styling1={styling1}
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
                                                      type="back"
                                                    />
                                                  )}

                                                  {prices && prices.runners && prices.runners.length > 1 && prices.runners[1] && prices.runners[1].selectionId ? (
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
                                  stake={stake}
                                  setPrice={setPrice}
                                  setStake={setStake}
                                  profit={profit}
                                  userData={userData}
                                  event={match}

                                />
                              )}
                            </div>
                          )
                        }
                      }

                    })
                  }
                </div>
              </div>


            </Collapse>
          </Box>
        )
      }
    </div>
  )
}

export default CompetionCollapseTwo

