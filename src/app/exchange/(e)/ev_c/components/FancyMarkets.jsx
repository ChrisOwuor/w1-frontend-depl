import React, { useContext, useEffect, useState } from 'react'
import { updateProfit } from 'src/app/exchange/utils/utils';
import { styling2 } from 'src/app/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { fetchUserData } from 'src/app/api/exchange';
import { placeBet } from 'src/app/api/exchange/bets';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
import { MyBetsContext } from '@/app/context/MybetsContext';


const FancyMarketComponent = ({ setRefresh, fancyMkts, matchId }) => {
  const sportName = "Cricket"



  const { setOpenLogin, userData } = useContext(AuthContext)
  const { myBets, getMyBetsFresh } = useContext(MyBetsContext)
  const [selectedEventId, setSelectedEventId] = useState(null);

  const [betObj, setBetObj] = useState({})
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(0);
  const [profit, setProfit] = useState(0)
  const [loadin, setLoadin] = useState(false)


  /** */
  const handleEventPlaceBet = (bet) => {
    // alert("This section is under scheduled maintainance, please come back later!")
    const { type, selection, price, stack, eventId, marketName, marketId } = bet
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true)
      return
    }
    const betObj_ = {
      betType: type,
      selection,
      price,
      stack,
      eventId,
      marketName: marketName,
      marketId: marketId

    }
    setPrice(price)
    setBetObj(betObj_)
    setSelectedEventId(marketName)

  };


  useEffect(() => {
    setProfit(updateProfit(stack, price, true))
  }, [stack, price])

  const handlePlaceBet = async () => {
    const userData = await fetchUserData()
    if (userData) {
      const loggedIN = isAuthenticated();
      if (!loggedIN) {
        alert("Please Login to continue")
        setOpenLogin(true)
        return
      } else {
        if (userData.role != 'normalUser') {
          alert("Oops, You cannot place a bet!")
          return
        }
        if (userData.eventList.length > 0 && userData.eventList.includes(sportName === "Soccer" ? "Football" : sportName)) {
          const bal = parseInt(userData.availableBalance)
          if (bal < stack) {
            alert("Insufficient funds!!!")
            return
          }
          const expLimit = parseInt(userData.exposureLimit)
          if (expLimit < stack) {
            expLimit == 0 ? alert(`Opps! Exposure limit is ${expLimit}`) : alert(`Please try again with a less stack, your Exposure limit is ${expLimit}`)
            return
          }
          const event_raw = localStorage.getItem("2kts")
          if (event_raw) {
            const eventObj = JSON.parse(event_raw)
            const betObj_ = {
              type: betObj.betType,
              selection_name: betObj.selection,
              selection_id: betObj.selection,
              market_name: betObj.marketName,
              market_id: betObj.marketId,
              sport_name: eventObj.event.sport_name,
              match_name: eventObj.event.match_name,
              match_id: eventObj.event.match_id,
              sport_id: eventObj.event.sport_id,
              price: betObj.price,
              stack: stack,
              isFancyMarket: true
            };

            setLoadin(true)
            const bet_place_status = await placeBet(betObj_)
            setRefresh(prev => !prev)
            if (bet_place_status === false || bet_place_status) {
              setLoadin(false)
              getMyBetsFresh()
            }
          }

        } else {
          alert(`You do not have access to ${sportName}`)
          return
        }
      }
    }
  };




  return (
    <div className={`flex flex-col mt-4`}>

      {/* RUNNERS */}
      <div className="min-mk:pl-1 pt-1 p-1">
        {
          fancyMkts && fancyMkts.length > 0 && fancyMkts.map((mkt, i) => {
            const runnerProfits = {};
          
            const matchBets = myBets.filter(bet => bet.market_type === "fancy" && bet.match_id == matchId && bet.processed == false && bet.status === "MATCHED")
            if (matchBets.length > 0) {
              runnerProfits[mkt.selectionId] = 0
              for (let bet of matchBets) {
                runnerProfits[mkt.selectionId] += parseFloat(bet.stack);
              }
            }
            return (

              <div className="relative col-span-3 border-b border-gray-800 grid grid-cols-12 gap-x-1 hover:bg-gray-800 py-1" key={i}>
                <div className="col-span-6 max-mk:col-span-9 flex justify-between items-center">
                  <p className={`text-[0.78rem] md:text-[0.8rem] font-bold text-gray-200`}>{mkt.marketName}</p>
                  <div className="flex flex-col ">
                    {selectedEventId === null && (
                      <>
                        {runnerProfits[mkt.selectionId] !== undefined && (
                          <p className={`text-green-400 text-[0.69rem] font-bold`}>
                            +{parseFloat(runnerProfits[mkt.selectionId]).toFixed(2)}
                          </p>
                        )}
                      </>
                    )}
                    {selectedEventId === null && (
                      <>
                        {runnerProfits[mkt.selectionId] !== undefined && (
                          <p className={`text-red-400 text-[0.69rem] font-bold`}>
                            -{parseFloat(runnerProfits[mkt.selectionId]).toFixed(2)}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="col-span-6 max-mk:col-span-3 grid grid-cols-12  items-center">
                  <div className="col-span-6 max-mk:hidden grid grid-cols-7 gap-x-1"></div>
                  <div className="relative max-mk:col-span-12 col-span-6 grid grid-cols-8 max-mk:grid-cols-4 gap-x-1">
                    {
                      mkt.statusName != "ACTIVE" &&
                      <div className="absolute rounded col-span-8 top-0 bottom-0 left-0 right-0 bg-orange-500/[0.9] flex justify-center items-center px-6">
                        <p className='text-sm font-bold text-gray-100 tracking-wider'>{mkt.statusName}</p>
                      </div>
                    }
                    <div
                      className={`${styling2.oddsStyle} ${styling2.backOdd} col-span-2`}
                      onClick={
                        () =>
                          handleEventPlaceBet(
                            {
                              type: `back`,
                              selection: `${mkt.marketName}`,
                              price: mkt.runsYes,
                              stack: stack,
                              marketName: mkt.marketName,
                              marketId: mkt._id
                            }
                          )
                      }
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.runsYes}
                      </p>
                      <p className={` ${styling2.oddsP2}`}>
                        {mkt.oddsYes}
                      </p>
                    </div>
                    <div
                      className={`${styling2.oddsStyle} ${styling2.layOdd} col-span-2`}
                      onClick={() => handleEventPlaceBet(
                        {
                          type: `lay`,
                          selection: `${mkt.marketName}`,
                          price: mkt.runsNo,
                          stack: stack,
                          marketName: mkt.marketName,
                          marketId: mkt._id
                        }

                      )}
                    >
                      <p className={` ${styling2.oddsT2}`}>
                        {mkt.runsNo}
                      </p>
                      <p className={` ${styling2.oddsP2}`}>
                        {mkt.oddsNo}
                      </p>
                    </div>
                    <div className="max-mk:hidden col-span-4 flex flex-col w-full justify-center">
                      <p className={` ${styling2.maxSettings}`}>Max Bet: {mkt.maxSetting}</p>
                      <p className={` ${styling2.maxSettings}`}>Max Market: {mkt.ratingExposure}</p>
                    </div>
                  </div>
                </div>

                {/* place bet */}
                {
                  selectedEventId === mkt.marketName && (
                    <div className={`col-span-12`}>
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
                        marketType="fancy"
                      />
                    </div>
                  )
                }


              </div>
            )
          })
        }
      </div>

    </div>
  );
};
export default FancyMarketComponent