import React, { useContext, useEffect, useState } from 'react'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { styling2 } from 'src/app/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { fetchUserData } from 'src/app/api/exchange';
import { placeBet } from 'src/app/api/exchange/bets';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
import { MyBetsContext } from '@/app/context/MybetsContext';


const BookmakerMarketComponent = ({ setRefresh, bookmakerMarkets, matchId }) => {
  const defaultStake = 0
  const { setOpenLogin, userData } = useContext(AuthContext)
  const { getMyBetsFresh, myBets } = useContext(MyBetsContext)

  const [sportName, setSportName] = useState("")
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [betObj, setBetObj] = useState({})
  const [price, setPrice] = useState(1.0);
  const [stack, setStack] = useState(0);
  const [profit, setProfit] = useState(0)
  const [loadin, setLoadin] = useState(false)

  const [runnerProfitsDisplay, setRunnerProfitsDisplay] = useState({});
  const [runnersPL, setRunnersPL] = useState({
    // market_id: market.marketId,
    runnersPL: {}
  })



  const handleEventPlaceBet = ({ type, selection, price, stack, eventId, runner, market }) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true)
      return
    }
    const betObj_ = {
      betType: type,
      type,
      selection_name: selection,
      price,
      stack,
      match_id: market.match_id,
      match_name: market.match_name,
      market_name: market.market_name,
      market_id: market.market_id,
      market_id_0: market.market_id_0,
      selection_id: runner.selectionId,
      sport_id: market.sport_id,
      sport_name: market.sport_name
    }
    setProfit(price)
    setSportName(market.sport_name)
    setPrice(price)
    setBetObj(betObj_)
    setSelectedEventId(eventId)

  };


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
            const betObj_ = {
              ...betObj,
              stack: stack,
              is_bookmaker: true,
            };
            setLoadin(true)
            const bet_place_status = await placeBet(betObj_)
            setRefresh(prev => !prev)
            if (bet_place_status === false || bet_place_status) {
              setLoadin(false)
              getMyBetsFresh(betObj.match_id)

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
    <div className={`flex flex-col ${bookmakerMarkets.length === 0 && "hidden"}`}>

      <div position="start" className="bg-black p-1 col-span-12">
        <div className="flex justify-between text-white items-center w-full">
          <p className="text-[1rem] font-bold text-white p-1">Bookmaker</p>
        </div>
      </div>

      <div className="grid grid-cols-12 w-full mb-1 items-center">
        <div className="col-span-8 max-mk:col-span-9 flex items-center gap-x-2"></div>

        <div className="max-mk:col-span-3 col-span-4">
          <div className="grid max-mk:grid-cols-6 grid-cols-6 gap-x-1">

            <div className='max-mk:col-span-3 col-span-2 flex justify-center  border-gray-500 shadow shadow-[#7EBCEE]/[1]'>
              <p className='text-[0.665rem] font-bold tracking-wide text-[#7EBCEE]/[0.9]'>Back</p>
            </div>
            <div className='max-mk:col-span-3 col-span-2 flex justify-center  border-gray-500 shadow shadow-[#F4AFD9]/[1]'>
              <p className='text-[0.665rem] font-bold tracking-wide text-[#F4AFD9]/[0.9]'>Lay</p>
            </div>
            <div className="col-span-2 max-mk:hidden"></div>
          </div>
        </div>
      </div>


      {/* RUNNERS */}
      <div className="min-mk:pl-1 pt-1 p-1 bg-gray-700/[0.5]">
        {
          bookmakerMarkets && bookmakerMarkets.length > 0 && bookmakerMarkets.map((mkt, i) => {
            const runnerProfits = {};
            const matchBets = myBets.filter(bet => bet.market_type === "bookmaker" && bet.match_id == matchId && bet.processed == false && bet.status === "MATCHED")
           if(matchBets.length>0){
            mkt && mkt.runner.forEach(runner => {
              runnerProfits[runner.selectionId] = 0;
            });
            for (let bet of matchBets) {
              for (const runner of mkt.runner) {
                if (bet.selection_id == runner.selectionId) {
                  const profit = parseFloat(bet.stack) * (parseFloat(bet.price) - 1);
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
           }

            return (
              < div className='w-full mb-2' key={i}>
                {
                  mkt.runner.map((runner, index) => {
                    return (
                      <div key={index} className=" relative max-mk:col-span-12 col-span-6 grid grid-cols-12 max-mk:grid-cols-12 gap-x-1 border-b border-gray-200/[0.1] mb-1">
                        <div className="col-span-8 max-mk:col-span-9 flex items-center gap-x-2">
                          <InfoTwoToneIcon
                            fontSize='smaller'
                            className='text-orange-500 cursor-pointer'
                            onClick={() => alert("Terms and Conditions Apply")}
                          />
                          <p className={`${styling2.oddsText1}`}>{runner.name}
                            {selectedEventId === null &&(
                              <>
                                {runnerProfits[runner.selectionId] !== undefined && (
                                  <p className={`text-${parseFloat(runnerProfits[runner.selectionId]) >= 0 ? 'green' : 'red'}-400`}>
                                    {parseFloat(runnerProfits[runner.selectionId]).toFixed(2)}
                                  </p>
                                )}
                              </>
                            )}
                          </p>
                        </div>
                        <div className=" relative max-mk:col-span-3 col-span-4 grid grid-cols-6 max-mk:grid-cols-4 gap-x-1">
                          {
                            runner.status != "ACTIVE" &&
                            <div className="absolute rounded col-span-6 top-0 bottom-0 left-0 right-0 bg-orange-500/[0.9] flex justify-center items-center px-6">
                              <p className='text-sm font-bold text-gray-100 tracking-wider'>{runner.status}</p>
                            </div>
                          }
                          <div
                            className={`${styling2.oddsStyle} ${styling2.backOdd} col-span-2`}
                            onClick={() => handleEventPlaceBet({
                              type: `back`,
                              selection: `${runner.name}`,
                              price: `${runner.back && runner.back.length > 0 && runner.back[0].price}`,
                              stack: defaultStake,
                              eventId: `bookmaker_${mkt.marketId}`,
                              marketName: `Bookmaker`,
                              market: mkt,
                              runner
                            })}
                          >
                            <p className={` ${styling2.oddsT2}`}>
                              {runner.back && runner.back.length > 0 && runner.back[0].price}
                            </p>
                          </div>
                          <div
                            className={`${styling2.oddsStyle} ${styling2.layOdd} col-span-2`}
                            onClick={() => handleEventPlaceBet({
                              type: `lay`,
                              selection: `${runner.name}`,
                              price: `${runner.lay && runner.lay.length > 0 && runner.lay[0].price}`,
                              stack: defaultStake,
                              eventId: `bookmaker_${mkt.marketId}`,
                              marketName: `Bookmaker`,
                              market: mkt,
                              runner
                            })}
                          >
                            <p className={` ${styling2.oddsT2}`}>
                              {runner.lay && runner.lay.length > 0 && runner.lay[0].price}
                            </p>
                          </div>

                          <div className="max-mk:hidden col-span-2 flex flex-col w-full justify-center text-center">
                            <p className={` ${styling2.maxSettings}`}>Max Bet: {mkt.maxBet}</p>
                            <p className={` ${styling2.maxSettings}`}>Min Bet: {mkt.minBet}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }


                {/* place bet */}
                {
                  selectedEventId === `bookmaker_${mkt.marketId}` && (
                    <div className={`col-span-12`}>
                      <PlaceBet
                        betObj={betObj}
                        setSelectedEventId={setSelectedEventId}
                        handlePlaceBet={handlePlaceBet}
                        loadin={loadin}
                        price={price}
                        stack={stack}
                        setStack={setStack}
                        setPrice={setPrice}
                        profit={stack > 0 && profit}
                        userData={userData}
                        marketType="bookmaker"
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
export default BookmakerMarketComponent