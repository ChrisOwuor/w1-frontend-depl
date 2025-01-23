"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Collapse, Box } from "@mantine/core";
import Loading from '../Loading';
import { formatGMTDateTime1, hasDatePassed } from '../../utils/competitionCollase';
import { EmptyOddCell, NoSelection, OddsComponent } from './OddsComponent';
import { formatNumber, getIcon, separateTeams, updateProfit } from '../../utils/utils';
import { styling1 } from '@/app/exchange/(e)/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { placeBet } from 'src/app/api/exchange/bets';
import PushPinIcon from '@mui/icons-material/PushPin';
import PlaceBet from '../betslip/PlaceBet';
import { NAVContext } from '@/app/context/NavContext';
import { CompetitionContext } from '@/app/context/exchange/CompetitonContext';


const CompetionCollapse = ({ matches, opened, marketsBook, sportId, sportName }) => {
  const [betObj, setBetObj] = useState({})
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(50);
  const [profit, setProfit] = useState(0)
  const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext)
  const { setCurrentMkt } = useContext(CompetitionContext)
  const { setCurrentCenter, setView } = useContext(NAVContext)
  const [hide, setHide] = useState(false)
  const [loadin, setLoadin] = useState(false)
  const [flicker, setFlicker] = useState(false)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFlicker(prev => !prev);
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



  const handleEventPlaceBet = ({ betType, selectionName, price, stack, eventId, eventName, mktId, selectionId, marketName }) => {
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
        eventTypeId: sportId,
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

  const handlePlaceBet = async () => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {

      setCurrentCenter("userconsent")
      return
    }

    if (userData) {
      if (userData.status === "suspended") {
        return
      }
      if (!loggedIN) {

        setCurrentCenter("userconsent")
        return
      } else {
        if (userData.role != 'normalUser') {
          alert("Oops, You cannot place a bet!")
          return
        }

        await getfreshUserData()
        if (userData.eventList.length > 0 && userData.eventList.includes(sportName === "Soccer" ? "Football" : sportName)) {
          const bal = parseFloat(userData.availableBalance)
          if (bal < stack) {
            alert("Insufficient funds!!!")
            return
          }
          const expLimit = parseFloat(userData.exposureLimit)
          if (expLimit < stack) {
            expLimit == 0 ? alert(`Opps! Exposure limit is ${expLimit}`) : alert(`Please try again with a less stack, your Exposure limit is ${expLimit}`)
            return
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

          setLoadin(true)
          const bet_place_status = await placeBet(betObj_)
          if (bet_place_status === false || bet_place_status) {
            getfreshUserData()
            setLoadin(false)
          }
        } else {
          alert(`You do not have access to ${sportName}`)
        }
      }
    }
  };
  const sportname = sportName === "Soccer" ? "Football" : sportName
  const icon = getIcon(sportname)




  return (
    <div className='w-full'>
      {
        matches && matches.length > 0 && (
          <Box mx="auto" className={` ${hide && "hidden"}`}>
            <Collapse in={true} className="w-full h-full">
              {/* LEAGUES */}
              <div className='flex gap-x-4 w-full'>
                <div className="w-full overflow-y-auto max">
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

                          const marketPrices = marketsBook.filter(marketprice => marketprice.marketId == mkt_id)
                          if (marketPrices.length > 0) {
                            prices = marketPrices[0]
                          }
                        }

                        const date_ = formatGMTDateTime1(match.openDate)

                        if (styling1) {
                          return (
                            <div key={i}>
                              <div className="outline outline-1 rounded-sm  grid grid-cols-12 items-center md:grid-cols-12 border-b border-black/[0.2] gap-x-2 cursor-pointer">

                                <div className=" col-span-12 mk:grid-cols-12 grid  flex-col">
                                  {/* event name */}
                                  <div className="max-sm: hidden outline outline-1 col-span-4 mk:col-span-8 md:col-span text-[#4f0a9b] hover:bg-gray-900 cursor-pointer  items-center rounded py-1" onClick={() => handleEventClick(match)} >
                                    <div className='flex items-center p-1 justify-between '>
                                      <div className="flex items-center gap-1">
                                        <p className={`${styling1.teamNames}`}>{team1}</p>
                                        <p className={`text-black font-small mx-1`}>v</p>
                                        <p className={`${styling1.teamNames} `}>{team2}</p>
                                      </div>
                                      {/* time */}
                                      <div className={` max-mk:hidden ${pass ? "bg-green-600 flex justify-center items-center" : "bg-gray"} hover:bg-gray-900 h-full rounded p-1`} >
                                        {pass ?
                                          <div className="flex justify-center items-center w-full h-full">
                                            <p className={`text-sm sm:text-md  tracking-wide font-bold ${flicker ? "text-danger" : "text-success"}`}>In Play</p>
                                          </div> :
                                          <div className="flex  justify-center gap-x-1 items-center w-full h-full ">
                                            <p className='text-md  tracking-wide text-black font-bold'>{date_.date}</p>
                                            <p className='text-md  tracking-wide text-black font-bold'>{date_.time}</p>
                                          </div>}
                                      </div>
                                    </div>
                                  </div>

                                  <div className=" col-span-12 mk:col-span-8 md:col-span-7 text-black hover:bg-gray-900 cursor-pointer   items-center rounded py-1" onClick={() => handleEventClick(match)} >

                                    <div className="flex items-center justify-between">
                                      <div className='flex items-center px-1'>

                                        {/* time */}
                                        <div className={`whitespace-normal ${pass ? "text-success flex items-center" : ""} hover:bg-gray rounded px-1`} >
                                          <span className={`${styling1.teamNames} mr-2`}>{team1} {" v "} {team2}</span>
                                          {
                                            pass ?
                                              <span className={`text-sm sm:text-md  tracking-wide font-bold whitespace-nowrap ${flicker ? "text-danger" : "text-success"}`}>In Play</span> :
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

                                          </div>

                                        )
                                      }
                                    </div>
                                  </div>
                                  {/*  */}
                                  {/* event odds */}
                                  <div className="max-sm:hidden rounded col-span-8 mk:col-span-4 md:col-span-5 grid grid-cols-6 mk:grid-cols-4 md:grid-cols-4 max-mk:grid-cols-7 ">

                                    <div className={`col-span-1 mk:hidden flex justify-center items-center ${pass && "bg-green-600"} hover:bg-gray-900 h-full rounded-r  shadow-lg max-mk:mr-1`}>
                                      {
                                        pass ?
                                          <div className="flex justify-center gap-x-1  items-center w-full h-full">
                                            <p className='text-[0.695rem] md:text-[0.785rem]   tracking-wide text-white font-bold '>In Play</p>
                                          </div> :
                                          <div className="flex flex-col justify-center items-center">
                                            <p className='text-[0.65rem] text-center md:text-[0.8rem]  tracking-wide text-primary3 font-bold'>{date_.date}</p>
                                            <p className='text-[0.65rem] text-center md:text-[0.8rem]  tracking-wide text-primary3 font-bold'>{date_.time}</p>
                                          </div>
                                      }

                                    </div>
                                    <div className="relative col-span-5  max-mk:col-span-6 md:col-span-4 grid grid-cols-7 gap-x-2">
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
                                        <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full'>
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
                                                dontShowSize={true}
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
                                                dontShowSize={true}
                                                setSelectedOdd={setSelectedEventId}
                                                eventId={eId}
                                                type="back"

                                              />
                                            ) : <NoSelection dontShowSize={true}
                                              type="back"
                                            />}
                                          </div>
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
                                                dontShowSize={true}
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
                                                dontShowSize={true}
                                                setSelectedOdd={setSelectedEventId}
                                                eventId={eId}
                                                type="back"

                                              />
                                            ) : <NoSelection dontShowSize={true}
                                              type="back"
                                            />}
                                          </div>
                                        </div>
                                      </div>


                                      {/*  tie */}
                                      <div className='col-span-2 '>
                                        <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full'>
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
                                                dontShowSize={true}
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
                                                dontShowSize={true}
                                                setSelectedOdd={setSelectedEventId}
                                                eventId={eId}
                                                type="back"
                                              />
                                            ) : <NoSelection dontShowSize={true}
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
                                                dontShowSize={true}
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
                                                dontShowSize={true}
                                                setSelectedOdd={setSelectedEventId}
                                                eventId={eId}
                                                type="lay"

                                              />
                                            ) : <NoSelection dontShowSize={true}

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
                                              <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full'>
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
                                                      dontShowSize={true}
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
                                                      dontShowSize={true}
                                                      setSelectedOdd={setSelectedEventId}
                                                      eventId={eId}
                                                      type="back"

                                                    />
                                                  ) :
                                                    <NoSelection dontShowSize={true}
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
                                                      dontShowSize={true}
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
                                                      dontShowSize={true}
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
                                                <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full'>
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
                                                        dontShowSize={true}
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
                                                        dontShowSize={true}
                                                        setSelectedOdd={setSelectedEventId}
                                                        eventId={eId}
                                                        type="back"

                                                      />
                                                    ) : (
                                                      <NoSelection dontShowSize={true}
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
                                                        dontShowSize={true}
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
                                                        dontShowSize={true}
                                                        setSelectedOdd={setSelectedEventId}
                                                        eventId={eId}
                                                        type="lay"

                                                      />
                                                    ) : (
                                                      <NoSelection dontShowSize={true}
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
                                                <div className='gap-x-1 grid grid-cols-2 h-full items-center w-full'>
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
                                                      dontShowSize={true}
                                                      setSelectedOdd={setSelectedEventId}
                                                      eventId={eId}
                                                      type="back"

                                                    />
                                                  ) : (
                                                    <NoSelection dontShowSize={true}
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
                                                      dontShowSize={true}
                                                      setSelectedOdd={setSelectedEventId}
                                                      eventId={eId}
                                                      type="lay"

                                                    />
                                                  ) : (
                                                    <NoSelection dontShowSize={true}
                                                      type="lay"
                                                    />
                                                  )}

                                                </div>
                                              </div>
                                            )
                                      }
                                      {/* <div className="col-span-1 flex items-center justify-center">
                                        <div className="ms:hidden flex items-center justify-center">
                                          <PushPinIcon fontSize='medium' className='border rounded-full text-black/[0.5]' />
                                        </div>
                                      </div> */}
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

export default CompetionCollapse








