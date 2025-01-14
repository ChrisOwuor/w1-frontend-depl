import { Box, Collapse, Group } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { formatNumber, updateProfit } from 'src/app/exchange/utils/utils';
import { styling2 } from '@/app/exchange/(e)/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { placeBet } from 'src/app/api/exchange/bets';
import MarketOddsComponent from './MarketOddsComponent';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import { MyBetsContext } from '@/app/context/MybetsContext';
import { NAVContext } from '@/app/context/NavContext';


export const sortBetsLastUpdateTime = (bets) => {
    bets.sort((a, b) => {
        // Convert 'updatedTime' strings to Date objects
        const dateA = new Date(a.updatedTime);
        const dateB = new Date(b.updatedTime);

        // Compare the Date objects
        return dateB - dateA;
    });
}

const MarketComponent = ({ marketBookOdds, market, openedd, eventData, eventId, setRefresh, eventTypeId, sportName, eventName, otherMarkets, globalSettings }) => {
    const marketNamePattern = /^\w+ Innings \d+ Overs Line$/;
    const isLineMarket = marketNamePattern.test(market.marketName);


    const mkt = marketBookOdds && marketBookOdds.length > 0 && marketBookOdds.find(mkt => mkt.marketId === market.marketId)
    const [open, setOpen] = useState(openedd)
    const { myBets, getMyBetsFresh } = useContext(MyBetsContext)
    const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext)
    const { view, setCurrentCenter } = useContext(NAVContext)

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [betObj, setBetObj] = useState({})
    const [price, setPrice] = useState(1.0);
    const [stack, setStack] = useState(0);
    const [profit, setProfit] = useState(0)
    const [loadin, setLoadin] = useState(false)


    const [runnerProfits, setRunnerProfits] = useState({});
    const [runnerProfitsDisplay, setRunnerProfitsDisplay] = useState({});
    const [runnerProfitsDisplayPremium, setRunnerProfitsDisplayPremium] = useState({});
    const [runnersPL, setRunnersPL] = useState({
        market_id: market.marketId,
        runnersPL: {}
    })

    useEffect(() => {
        if (myBets) {
            if (myBets.length > 0) {
                const matched = myBets.filter(bet => bet.status === "MATCHED" && bet.processed === false && bet.match_id === eventId && bet.market_id === market.marketId);
                if (matched.length > 0) {
                    // Initialize runnerProfits
                    const runnerProfits = {};
                    market.runners.forEach(runner => {
                        runnerProfits[runner.selectionId] = 0;
                    });

                    // Calculate runner profits for existing bets
                    for (const bet of matched) {
                        for (const runner of market.runners) {
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
                const matched = myBets.filter(bet => bet.status === "MATCHED" && bet.processed === false && bet.match_id === eventId && bet.market_id === market.marketId);
                if (matched.length > 0) {
                    // Initialize runnerProfits
                    const runnerProfits = {};
                    market.runners.forEach(runner => {
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
                const matched = myBets.filter(bet => bet.status === "MATCHED" && bet.processed === false && bet.match_id === eventId && bet.market_id === market.marketId);
                if (matched.length > 0) {
                    // Initialize runnerProfits
                    const runnerProfits = {};
                    market.runners.forEach(runner => {
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
        const impact = type === "back" ? stack * (price - 1) : -(stack * (price - 1));

        const updatedRunnerProfits = { ...runnerProfits };

        if (Object.keys(updatedRunnerProfits).length === 0) {
            market.runners.forEach(runner => {
                updatedRunnerProfits[runner.selectionId] = 0;
            });
        }

        updatedRunnerProfits[selection] = (updatedRunnerProfits[selection] || 0) + impact;

        market.runners.forEach(runner => {
            if (runner.selectionId !== selection) {
                updatedRunnerProfits[runner.selectionId] -= type === "back" ? stack : -stack;
            }
        });

        return updatedRunnerProfits;
    };


    const onClick = () => {
        setOpen(prev => !prev)
    }


    const handleEventPlaceBet = (type, selection, price, stack, eventId, marketName, selectionId, mktId) => {
        const loggedIN = isAuthenticated();
        if (!loggedIN) {
            setOpenLogin(true)
            setCurrentCenter("userconsent")
            return
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

        }

        setPrice(price)
        setBetObj(betObj_)
        setSelectedEventId(eventId)

    };



    useEffect(() => {
        // console.log(isLineMarket)
        setProfit(updateProfit(stack, price, isLineMarket));

        if (Object.keys(betObj).length !== 0) {
            // Calculate the impact of the new bet on current profits
            const updatedRunnerProfits = calculateBetImpact(betObj.selectionId, betObj.betType, price, stack);

            // Update the state with the new runner profits
            setRunnersPL({
                market_id: market.marketId,
                runnersPL: {
                    ...updatedRunnerProfits
                }
            })
            setRunnerProfitsDisplay(updatedRunnerProfits);
        }
    }, [stack, price]);


    const handlePlaceBet = async () => {


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
                if (userData.eventList.length > 0 && userData.eventList.includes(view.sportName === "Soccer" ? "Football" : view.sportName)) {
                    const bal = parseInt(userData.availableBalance)
                    if (bal < stack) {
                        alert("Insufficient funds!")
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
                            isLineMarket
                        };
                        // updateBetslip("add", [betObj_])
                        setLoadin(true)
                        // console.log()
                        const bet_place_status = await placeBet(betObj_)
                        setRunnerProfits(runnerProfitsDisplay);
                        if (bet_place_status == true) {
                            setRefresh(prev => !prev)
                            getMyBetsFresh(eventId)
                            getfreshUserData("from market cp after bet success")
                        }
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
        <div className="w-full">


            <Box key={market.marketName} mx="auto" className={`bg-gray-700/[0.5] w-full col-span-12 grid grid-cols-12 items-center`}>

                <Group position="start" onClick={onClick} className="col-span-12 bg-white border-b border-black/[0.2]">
                    <div className="flex flex-col w-full">
                        {/* Market name */}
                        <div className="flex items-center gap-x-2 w-full">
                            <p className="text-sm font-bold text-white px-1 py-2 bg-[#1F3340] rounded-tr-2xl ">
                                {market.marketName}
                                {open ? <InfoTwoToneIcon fontSize="small" className="text-white" /> : <InfoTwoToneIcon fontSize="small" className="text-white" />}
                            </p>
                        </div>

                        {/* Cash Out and Matched section in flex with justify-between */}
                        <div className="flex justify-between items-center gap-x-1 w-full p-1">
                            <p className="text-sm font-bold tracking-wider text-black">
                                <CreditCardOffIcon className="bg-warning text-black rounded mr-1 p-1" fontSize="small" />
                                <span >Cash Out</span>
                            </p>

                            <div className="flex items-center gap-x-1">
                                <p className={`${styling2.totalMatched}`}>
                                    Matched:
                                </p>
                                <p className={`${styling2.totalMatched}`}>
                                    {mkt.totalMatched > 0 ? (mkt.totalMatched).toFixed(2) : 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </Group>



                <Collapse in={open} className="col-span-12 text-white px-1">
                    <div className="grid grid-cols-11 md:grid-cols-12 w-full border-b border-black/[0.2] items-center">
                        <div className="col-span-6 md:col-span-6">
                            <p className='text-black/[0.8] font-semibold text-xs'>Min/Max</p>
                        </div>

                        <div className="col-span-5 md:col-span-6 ">
                            <div className="grid grid-cols-6">
                                <div className='bg-[#7EBCEE] p-1 col-span-3 flex justify-center items-center border-black/[0.2]'>
                                    <p className='text-sm font-bold tracking-wide text-black'>Back</p>
                                </div>
                                <div className='bg-[#F4AFD9] p-1 col-span-3 flex justify-center items-center border-black/[0.2]'>
                                    <p className='text-sm font-bold tracking-wide text-black'>Lay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        market.runners && market.runners.map((runner, ii) => (
                            <div key={ii} className="col-span-12 grid grid-cols-11 md:grid-cols-12 items-center w-full border-b border-black/[0.2] hover:bg-gray-700" >
                                <div className="col-span-6 md:col-span-6 flex items-center justify-between ">
                                    <div className='flex items-center gap-x-1'>
                                        <InfoTwoToneIcon
                                            fontSize='smaller'
                                            className='text-orange-500 cursor-pointer'
                                            onClick={() => alert("Terms and Conditions Apply")}
                                        />
                                        <p className={`${styling2.oddsText1} truncate`}>
                                            {`${runner.runnerName} ${runner.handicap !== 0 ? runner.handicap : ""}`}
                                        </p>

                                    </div>



                                    <div className="flex flex-col pr-1">
                                        {
                                            isLineMarket ? (
                                                <>
                                                    {selectedEventId === null && isLineMarket && (
                                                        <>
                                                            {runnerProfitsDisplayPremium[runner.selectionId] !== undefined && (
                                                                <p className={`text-green-400 max-mk:text-[0.65rem] text-[0.75rem] font-bold`}>
                                                                    +{parseFloat(runnerProfitsDisplayPremium[runner.selectionId]).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                    {selectedEventId === null && isLineMarket && (
                                                        <>
                                                            {runnerProfitsDisplayPremium[runner.selectionId] !== undefined && (
                                                                <p className={`text-red-400 max-mk:text-[0.65rem] text-[0.75rem] font-bold`}>
                                                                    -{parseFloat(runnerProfitsDisplayPremium[runner.selectionId]).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {/* For when there is a selected event */}
                                                    {selectedEventId !== null && (
                                                        <>
                                                            {runnerProfitsDisplay[runner.selectionId] !== undefined && (
                                                                <p className={`max-mk:text-[0.65rem] text-[0.75rem] font-bold text-${parseFloat(runnerProfitsDisplay[runner.selectionId]) >= 0 ? 'green' : 'red'}-400`}>
                                                                    {parseFloat(runnerProfitsDisplay[runner.selectionId]).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}

                                                    {selectedEventId === null && (
                                                        <>
                                                            {runnerProfits[runner.selectionId] !== undefined && (
                                                                <p className={`max-mk:text-[0.65rem] text-[0.75rem] font-bold text-${parseFloat(runnerProfits[runner.selectionId]) >= 0 ? 'green' : 'red'}-400`}>
                                                                    {parseFloat(runnerProfits[runner.selectionId]).toFixed(2)}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )
                                        }

                                    </div>
                                </div>

                                <div className="col-span-5  md:col-span-6">
                                    <MarketOddsComponent
                                        mktBk={mkt}
                                        styling2={styling2}
                                        ii={ii}
                                        handleEventPlaceBet={handleEventPlaceBet}
                                        formatNumber={formatNumber}
                                        runner={runner}
                                        market={market}
                                        eventData={eventData}
                                        otherMarkets={otherMarkets}
                                        showLastTradedPrice={isLineMarket && isLineMarket === true ? false : true}
                                    />
                                </div>

                                {/* place bet */}
                                {selectedEventId === runner.runnerName && (
                                    <div className={`col-span-12`}>
                                        <PlaceBet
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
                            </div>
                        ))
                    }
                </Collapse>
            </Box>
        </div >
    );
};
export default MarketComponent





