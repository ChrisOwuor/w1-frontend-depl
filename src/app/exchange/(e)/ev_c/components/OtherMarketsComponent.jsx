import { Box, Collapse, Group } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formatNumber, updateProfit } from 'src/app/exchange/utils/utils';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { styling2 } from '@/app/exchange/(e)/custom_styling/styling';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { fetchMKTBK } from 'src/app/api/exchange';
import { INTERVAL } from 'src/app/exchange/constants/mktfetchInterval';
import { placeBet } from 'src/app/api/exchange/bets';
import MarketOddsComponent from './MarketOddsCompoent';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
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

const OtherMarketComponent = ({ market, openedd, eventData, eventId, setRefresh, eventTypeId, sportName, eventName }) => {
    const [open, setOpen] = useState(openedd)
    const { myBets, getMyBetsFresh } = useContext(MyBetsContext)
    const { setOpenLogin, userData, getfreshUserData } = useContext(AuthContext)
    const { view } = useContext(NAVContext)

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [betObj, setBetObj] = useState({})
    const [price, setPrice] = useState(1.0);
    const [stake, setStake] = useState(0);
    const [profit, setProfit] = useState(0)
    const [loadin, setLoadin] = useState(false)
    const [mktBk, setMktBk] = useState({})
    const [runnerProfits, setRunnerProfits] = useState({});
    const [runnerProfitsDisplay, setRunnerProfitsDisplay] = useState({});



    useEffect(() => {
        if (myBets != "") {
            if (myBets.length > 0) {
                const matched = myBets.filter(bet => bet.status === "MATCHED" && bet.match_id == eventId && bet.market_name === market.marketName);
                console.log(matched)
                if (matched && matched.length > 0) {
                    // Calculate profit/loss for each runner
                    const runnerProfits = {};
                    market.runners.forEach(runner => {
                        // console.log(runner)
                        runnerProfits[runner.selectionId] = 0;
                    });

                    market.runners.forEach(runner => {

                        matched.forEach(bet => {
                            if (bet.selection_id == runner.selectionId) {
                                const profit = bet.stack * (bet.price - 1);
                                if (bet.type === "back") {
                                    runnerProfits[runner.selectionId] += profit;
                                } else if (bet.type === "lay") {
                                    runnerProfits[runner.selectionId] -= profit;
                                }
                            } else if (bet.type === "lay") {
                                runnerProfits[runner.selectionId] += bet.stack;
                            } else if (bet.type === "back") {
                                runnerProfits[runner.selectionId] -= bet.stack;
                            }
                        });
                    });

                    // console.log("****", runnerProfits);

                    // Update runner profits state
                    setRunnerProfits(runnerProfits);
                    setRunnerProfitsDisplay(runnerProfits)
                }
            }
        } else {
            getMyBetsFresh();
        }

    }, [myBets, eventId, market.marketName]);

    const onClick = () => {
        setOpen(prev => !prev)
    }
    const runner_ = async (mktIds) => {
        try {
            // console.log("Hitting here")
            const mkt_book = await fetchMKTBK(mktIds)
            if (mkt_book && mkt_book.length > 0) {
                setMktBk(mkt_book[0])
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (market) {
            const mktIds = [market.marketId]
            runner_(mktIds); // Initial fetch
            const intervalId = setInterval(() => runner_(mktIds), INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [market]);

    const handleEventPlaceBet = (type, selection, price, stake, eventId, marketName, selectionId, mktId) => {
        const loggedIN = isAuthenticated();
        if (!loggedIN) {
            setOpenLogin(true)
            return
        }
        const betObj_ = {
            betType: type,
            price,
            stake,
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

    // Function to calculate the impact of the new bet on current profits
    const calculateBetImpact = (selection, type, price, stake) => {
        // Calculate profit/loss impact of the new bet on each runner
        const impact = type === "back" ? stake * (price - 1) : -stake * (price - 1);

        // Create a new object to store updated runner profits
        const updatedRunnerProfits = {};

        // If runnerProfits is empty, initialize it with 0 for each runner
        if (Object.keys(runnerProfits).length === 0) {
            market.runners.forEach(runner => {
                updatedRunnerProfits[runner.selectionId] = 0;
            });
        } else {
            // If runnerProfits is not empty, copy its values to updatedRunnerProfits
            Object.assign(updatedRunnerProfits, runnerProfits);
        }

        // Update profit/loss for the selected runner
        updatedRunnerProfits[selection] = (updatedRunnerProfits[selection] || 0) + impact;

        // Update profit/loss for other runners
        Object.keys(updatedRunnerProfits).forEach(runner => {
            if (runner !== selection) {
                updatedRunnerProfits[runner] -= type === "back" ? stake : -stake;
            }
        });

        // Return the updated runner profits
        return updatedRunnerProfits;
    };

    useEffect(() => {
        setProfit(updateProfit(stake, price));

        if (Object.keys(betObj).length !== 0) {
            // Calculate the impact of the new bet on current profits
            const updatedRunnerProfits = calculateBetImpact(betObj.selectionId, betObj.betType, price, stake);

            // Update the state with the new runner profits
            setRunnerProfitsDisplay(updatedRunnerProfits);
        }
    }, [stake, price]);


    const handlePlaceBet = async () => {
        // const userData = await fetchUserData()
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
                    if (bal < stake) {
                        alert("Insufficient funds!!!")
                        return
                    }
                    const expLimit = parseInt(userData.exposureLimit)
                    if (expLimit < stake) {
                        expLimit == 0 ? alert(`Opps! Exposure limit is ${expLimit}`) : alert(`Please try again with a less stake, your Exposure limit is ${expLimit}`)
                        return
                    }
                    const event_raw = localStorage.getItem("2kts")
                    if (event_raw) {
                        const eventObj = JSON.parse(event_raw)
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
                            price: betObj.price,
                            stack: betObj.stake,
                        };
                        // updateBetslip("add", [betObj_])
                        setLoadin(true)
                        const bet_place_status = await placeBet(betObj_)
                        setRunnerProfits(runnerProfitsDisplay);
                        if (bet_place_status == true) {
                            setRefresh(prev => !prev)
                            getMyBetsFresh()
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
            <div className="my-2 w-full">
                <div className={`flex items-center gap-x-1`}>
                    <InfoTwoToneIcon
                        fontSize='smaller'
                        className='text-orange-500 cursor-pointer'
                        onClick={() => alert("Terms and Conditions Apply")}
                    />
                    <p className={` ${styling2.totalMatched}`}>
                        MATCHED:
                    </p>
                    <p className={` ${styling2.totalMatched} text-gray-300`}>
                        {mktBk.totalMatched > 0 ? (mktBk.totalMatched).toFixed(2) : 0}
                    </p>
                </div>
            </div>


            <Box key={market.marketName} mx="auto" className={`bg-gray-700/[0.5] w-full col-span-12 grid grid-cols-12 items-center`}>

                <Group position="start" mb={5} onClick={onClick} className="bg-black p-1 col-span-12">
                    <div className="flex justify-between text-white items-center w-full">
                        <p className="text-[1rem] font-bold text-white p-1">{market.marketName}</p>
                        {open ? <ArrowDropUpIcon fontSize='small' className='' /> : <ArrowDropDownIcon fontSize='small' />}
                    </div>
                </Group>


                <Collapse in={open} className="col-span-12 text-white px-1">
                    <div className="grid grid-cols-12 w-full mb-1 items-center">
                        <div className="col-span-6 md:col-span-6 lg:col-span-7 "></div>

                        <div className="col-span-6 md:col-span-6 lg:col-span-5">
                            <div className="grid max-mk:grid-cols-6 mk:grid-cols-7 gap-x-1">
                                <div className="col-span-1 max-mk:hidden"></div>
                                <div className='col-span-3 pr-4 flex justify-end  border-gray-500 shadow shadow-[#7EBCEE]/[1]'>
                                    <p className='text-[0.9rem] font-bold tracking-wide text-[#7EBCEE]/[0.9]'>Back</p>
                                </div>
                                <div className='col-span-3 pl-4 flex justify-  border-gray-500 shadow shadow-[#F4AFD9]/[1]'>
                                    <p className='text-[0.9rem] font-bold tracking-wide text-[#F4AFD9]/[0.9]'>Lay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        market.runners && market.runners.map((runner, ii) => (
                            <div key={ii} className="col-span-12 grid grid-cols-12 items-center py-1 w-full border-b border-gray-700 hover:bg-gray-700" >
                                <div className={`col-span-6 md:col-span-6 lg:col-span-7 flex items-center gap-x-2`}>
                                    <InfoTwoToneIcon
                                        fontSize='smaller'
                                        className='text-orange-500 cursor-pointer'
                                        onClick={() => alert("Terms and Conditions Apply")}
                                    />
                                    <div className="grid grid-cols-6">
                                        <div className="col-span-4">
                                            <p className={`${styling2.oddsText1} truncate`}>
                                                {`${runner.runnerName} ${runner.handicap !== 0 ? runner.handicap : ""}`}
                                            </p>


                                            {/* For when there is a selected event */}
                                            {selectedEventId !== null && (
                                                <>
                                                    {runnerProfitsDisplay[runner.selectionId] !== undefined && (
                                                        <p className={`text-${parseFloat(runnerProfitsDisplay[runner.selectionId]) >= 0 ? 'green' : 'red'}-400`}>
                                                            {runnerProfitsDisplay[runner.selectionId] >= 0 ? '' : ''}{parseFloat(runnerProfitsDisplay[runner.selectionId]).toFixed(2)}
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {/* For when there is no selected event */}
                                            {selectedEventId === null && (
                                                <>
                                                    {runnerProfits[runner.selectionId] !== undefined && (
                                                        <p className={`text-${runnerProfits[runner.selectionId] >= 0 ? 'green' : 'red'}-400`}>
                                                            {runnerProfits[runner.selectionId] >= 0 ? '' : ''}{parseFloat(runnerProfits[runner.selectionId]).toFixed(2)}
                                                        </p>
                                                    )}
                                                </>
                                            )}

                                            {/* {openBet && selectedEventId === null && userData && openBet.marketName === market.marketName && openBet.selection != runner.runnerName ?
                                                openBet.type === "back" ?
                                                    (
                                                        <p className={`${styling2.oddsText1} text-red-500 truncate`}>
                                                            {"- "}{openBetStack != 0 ? parseFloat(openBetStack).toFixed(2) : "0.00"}
                                                        </p>
                                                    ) : (
                                                        <p className={`${styling2.oddsText1} text-green-500 truncate`}>
                                                            {"+ "}{openBetProfit && openBetProfit.toFixed(2)}
                                                        </p>
                                                    )
                                                : ""
                                            } */}

                                        </div>
                                        <div className="col-span-2 pl-1">
                                            {/* <p className={`${styling2.handicap}`}>
                                                {
                                                    mktBk && mktBk.runners && mktBk.runners.length > 0 && mktBk.runners[ii] && mktBk.runners[ii].handicap ?
                                                        mktBk.runners[ii].handicap : ""
                                                }
                                            </p> */}
                                        </div>

                                    </div>
                                </div>

                                <div className="col-span-6  md:col-span-6 lg:col-span-5">
                                    <MarketOddsComponent
                                        mktBk={mktBk}
                                        styling2={styling2}
                                        ii={ii}
                                        handleEventPlaceBet={handleEventPlaceBet}
                                        formatNumber={formatNumber}
                                        runner={runner}
                                        market={market}
                                        eventData={eventData}

                                    />
                                </div>

                                {/* place bet */}
                                {selectedEventId === runner.runnerName && (
                                    <div className={`col-span-12`}>
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
export default OtherMarketComponent





