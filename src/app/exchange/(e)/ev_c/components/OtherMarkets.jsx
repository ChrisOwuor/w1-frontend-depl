import { Box, Collapse, Group } from '@mantine/core'
import React, { useContext, useEffect, useState } from 'react'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";;
import { formatNumber, updateProfit } from 'src/app/exchange/utils/utils';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import { styling2 } from '@/app/exchange/(e)/custom_styling/styling';
import { ExchangeBetslipContext } from 'src/app/context/exchange/UserExchangeBetslipContext';
import { isAuthenticated } from 'src/app/components/funcStore/authenticate';
import { AuthContext } from 'src/app/context/AuthContext';
import { fetchMKTBK, fetchUserData } from 'src/app/api/exchange';
import { INTERVAL } from 'src/app/exchange/constants/mktfetchInterval';
import { placeBet } from 'src/app/api/exchange/bets';
import MarketOddsComponent from './MarketOddsCompoent';
import PlaceBet from 'src/app/exchange/components/betslip/PlaceBet';
import { useSearchParams } from 'next/navigation';
import { MKTBKContext } from '@/app/context/exchange/MKTBKContext';


const OtherMarketsComponent = ({ market, openedd, eventData, setRefresh }) => {
    const [open, setOpen] = useState(false)
    // const { addToMktIds, mktBk } = useContext(MKTBKContext)
    const [mktBk, setMktBk] = useState({})
    const { setOpenLogin } = useContext(AuthContext)
    const searchParams = useSearchParams()
    const sportName = searchParams.get("spName")

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [betObj, setBetObj] = useState({})
    const [price, setPrice] = useState(1.0);
    const [stake, setStake] = useState(0);
    const [profit, setProfit] = useState(0)
    const [loadin, setLoadin] = useState(false)
    const [userD, setUserD] = useState({})

    const onClick = () => {
        setOpen(prev => !prev)
    }
    const runner = async (mktIds) => {
        try {
            console.log("Hitting here")
            const mkt_book = await fetchMKTBK(mktIds)
            if (mkt_book.length > 0) {
                setMktBk(mkt_book[0])
            }
        } catch (error) {
            console.error(error)
        }
    }
 

    useEffect(() => {
        if (market) {
            const mktIds = [market.marketId]
            runner(mktIds)
            const intervalId = setInterval(runner, INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [])




    const handleEventPlaceBet = (type, selection, price, stake, eventId, marketName) => {
        const loggedIN = isAuthenticated();
        if (!loggedIN) {
            setOpenLogin(true)
            return
        }
        const betObj_ = {
            betType: type,
            selection,
            price,
            stake,
            eventId,
            marketName: marketName,

        }
        setPrice(price)
        setBetObj(betObj_)
        setSelectedEventId(eventId)

    };

    useEffect(() => {
        (async () => {
            const user = await fetchUserData()
            if (user) {
                setUserD(user)
            }
        })()
    }, [])


    useEffect(() => {
        setProfit(updateProfit(stake, price))
    }, [stake, price])

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
                            selection: betObj.selection,
                            marketName: betObj.marketName,
                            price: price,
                            stake: stake,
                            sportName: eventObj.sportName,
                            eventName: eventObj.event.name,
                            eventTypeId: eventObj.eventTypeId,
                            eventId: eventObj.eventId
                        };
                        // updateBetslip("add", [betObj_])
                        setLoadin(true)
                        const bet_place_status = await placeBet(betObj_)
                        setRefresh(prev => !prev)
                        if (bet_place_status === false || bet_place_status) {
                            setLoadin(false)
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
        <div className="">
            <div className="my-2">
                <div className={`flex items-center gap-x-1`}>
                    <InfoTwoToneIcon
                        fontSize='smaller'
                        color='warning'
                        className='cursor-pointer'
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
                                        color='warning'
                                        className='cursor-pointer'
                                        onClick={() => alert("Terms and Conditions Apply")}
                                    />
                                    <div className="grid grid-cols-6">
                                        <div className="col-span-4">
                                            <p className={`${styling2.oddsText1} truncate`}>
                                                {runner.runnerName}
                                            </p>

                                            {selectedEventId && betObj && betObj.marketName === market.marketName ?
                                                selectedEventId === runner.runnerName &&
                                                (
                                                    <p className={`${styling2.oddsText1} text-green-500 truncate`}>
                                                        {"+ "}{profit && parseFloat(profit).toFixed(2) || "0.00"}
                                                    </p>
                                                )
                                                : ""
                                            }

                                            {selectedEventId && betObj && betObj.marketName === market.marketName ?
                                                selectedEventId != runner.runnerName &&
                                                (
                                                    <p className={`${styling2.oddsText1} text-red-500 truncate`}>
                                                        {"- "}{stake != 0 ? parseFloat(stake).toFixed(2) : "0.00"}
                                                    </p>
                                                )
                                                : ""
                                            }

                                        </div>
                                        <div className="col-span-2">
                                            <p className={`${styling2.oddsText1}`}>
                                                {
                                                    mktBk && mktBk.runners && mktBk.runners.length > 0 && mktBk.runners[ii] && mktBk.runners[ii].handicap ?
                                                        mktBk.runners[ii].handicap : ""
                                                }
                                            </p>
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
                                            userData={userD}
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
export default OtherMarketsComponent