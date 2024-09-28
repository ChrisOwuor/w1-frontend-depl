import React, { useContext, useEffect, useState } from 'react'
import { sendHttpRequest } from '@/app/api/ship_yard/sender'
import { formatTime } from '../../utils/competitionCollase'
import { AuthContext } from '@/app/context/AuthContext'



const MyBets = () => {
    const { userData, setUserData, geFreshtUserData } =
        useContext(AuthContext);
    const [eventType, setEventType] = useState('All')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [bets, setBets] = useState([])
    const [allBets, setAllBets] = useState([])
    const [loading, setLoading] = useState(true)
    const [initialFetch, setInitialFetch] = useState(false);
    const [toggleEvents, setToggleEvents] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await sendHttpRequest("/bets/mybets", "get")
            if (res.data && res.data.bets) {
                setAllBets(res.data.bets)
                // console.log(res.data.bets)
            }
            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        filter()
    }, [allBets])

    const filter = (eventType, startDate, endDate) => {
        let filteredBets = [...allBets];


        if (eventType && eventType !== "All") {
            filteredBets = filteredBets.filter(bet => bet.sportName === eventType);
        }
        if (startDate) {
            const parsedStartDate = new Date(startDate);
            const startDateYear = parsedStartDate.getFullYear();
            const startDateMonth = parsedStartDate.getMonth();
            const startDateDate = parsedStartDate.getDate();
            // console.log(startDateYear === startDateMonth, startDateDate)
            // Filter bets by start date
            filteredBets = filteredBets.filter(bet => {
                const betDate = new Date(bet.betPlacingTime);
                const betDateYear = betDate.getFullYear();
                const betDateMonth = betDate.getMonth();
                const betDateDate = betDate.getDate();
                return betDateYear === startDateYear && betDateMonth >= startDateMonth && betDateDate >= startDateDate;
            });
        }
        if (endDate) {
            const parsedEndDate = new Date(endDate);
            const endDateYear = parsedEndDate.getFullYear();
            const endDateMonth = parsedEndDate.getMonth();
            const endDateDate = parsedEndDate.getDate();
            // console.log(endDateYear === endDateMonth, endDateDate)
            // Filter bets by start date
            filteredBets = filteredBets.filter(bet => {
                const betDate = new Date(bet.betPlacingTime);
                const betDateYear = betDate.getFullYear();
                const betDateMonth = betDate.getMonth();
                const betDateDate = betDate.getDate();
                return betDateYear === endDateYear && betDateMonth <= endDateMonth && betDateDate <= endDateDate;
            });
        }
        // console.log(filteredBets, filteredBets.length)
        setBets(filteredBets);
    }


    useEffect(() => {
        if (eventType === "All" && startDate == "" && endDate == "") {
            filter()
        }
        filter(eventType, startDate, endDate)
    }, [eventType, startDate, endDate]);

    const styles_01 = `px-3 py-1 border-r border-gray-800 text-[0.8rem] text-gray-400 font-bold tracking-wide`
    return (
        <div className='text-white '>
            {/* <p>Ooops! My Bets is under scheduled maintainance come back later</p> */}
            <div className="">
                <p className='font-bold text-gray-300 tracking-wide mt-2 mx-1'>My Bets</p>
            </div>
            <div className="mb-5 bg-[#D7B1E9] rounded pt-8 pb-4 px-2 flex items-center gap-x-2">
                <div className='flex items-center justify-center rounded border px-1 py-1 mr-4 h-full'>
                    <p>Filters:</p>
                </div>
                <div className='relative flex flex-col'>
                    <label htmlFor="event_name" className='font-bold text-[0.8rem] '>Sport Name</label>

                    <p onClick={() => setToggleEvents(prev => !prev)} className='text-gray-700 rounded cursor-pointer bg-gray-300 p-1 min-w-[10vw]'>{eventType}</p>
                    <div className={`absolute top-14 w-full ${!toggleEvents && "hidden"} bg-black`}>
                        <p onClick={() => {
                            setEventType("All")
                            setStartDate("")
                            setEndDate("")
                            setToggleEvents(prev => !prev)
                        }}
                            className='border-b border-gray-800/[0.7] hover:bg-orange-300/[0.4] px-2 py-1  text-gray-200 text-[0.85rem] cursor-pointer font-bold'
                        >All</p>
                        {
                            userData && userData.eventList && userData.eventList.length > 0 && userData.eventList.map((event, i) => (
                                <p onClick={() => {
                                    setEventType(event === "Football" ? "Soccer" : event)
                                    setToggleEvents(prev => !prev)
                                }
                                }
                                    key={i}
                                    className='border-b border-gray-800/[0.7] hover:bg-orange-300/[0.4] px-2 py-1  text-gray-200 text-[0.85rem] cursor-pointer font-bold'
                                >{event === "Football" ? "Soccer" : event}</p>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="start_date" className='font-bold text-[0.8rem] '>Start Date</label>
                    <input type="date" name="" id="start_date" onChange={(e) => setStartDate(e.target.value)} placeholder='Start Date' className='text-gray-700 rounded bg-gray-300 p-1' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="end_date" className='font-bold text-[0.8rem] '>End Date</label>
                    <input type="date" name="" id="end_date" onChange={(e) => setEndDate(e.target.value)} placeholder='End Date' className='text-gray-700 rounded bg-gray-300 p-1' />
                </div>
            </div>

            <table className="bg-gray-100 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                        <th scope="col" className="px-3 py-1">
                            Sport Name
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Event Name
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Market Name
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Selection
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Type
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Odds Req.
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Stack
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Profit & Loss
                        </th>
                        <th scope="col" className="px-3 py-1">
                            Bet Placing Time
                        </th>
                        {/* <th scope="col" className="px-3 py-1">
                            Bet Finishing Time
                        </th> */}
                    </tr>
                </thead>
                <tbody className='bg-gray-900'>
                    {bets.length === 0 && initialFetch && (
                        <p className="px-3 py-1 text-[0.8rem] font-bold tracking-wide">No data at the moment</p>
                    )}
                    {bets.length > 0 &&
                        bets.map((betObj, i) => {
                            const dateTime = formatTime(betObj.betPlacingTime)
                            return (
                                <tr key={i} className="border-b border-gray-800 hover:bg-gray-200/[0.1]">
                                    <td className={styles_01}>{betObj.sportName}</td>
                                    <td className={styles_01}>{betObj.eventName}</td>
                                    <td className={styles_01}>{betObj.marketName}</td>
                                    <td className={styles_01}>{betObj.selection}</td>
                                    <td className={styles_01}>{betObj.type}</td>
                                    <td className={styles_01}>{parseFloat(betObj.price).toFixed(2)}</td>
                                    <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>
                                    <td className={`${styles_01}`}>{betObj.processed ? betObj.win === "WON" ? <span className='text-green-500'>+{(betObj.price * betObj.stack - betObj.stack).toFixed(2)}</span> : betObj.win === "LOST" ? <span className='text-red-500'>-{(betObj.stack).toFixed(2)}</span> : "--" : "--"}</td>
                                    <td className={styles_01}>{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                                    {/* <td className={styles_01}>{"--"}</td> */}

                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>


    )
}

export default MyBets