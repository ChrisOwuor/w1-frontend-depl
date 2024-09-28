import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getEvents } from '@/app/api/exchange';



const MobileMarketsNavSlide = ({ setCurrentMarket, setCurrentEventTypeId, markets, setLoadingStatus, currentSport }) => {
    const [sport, setSport] = useState("Cricket")
    const [guideToLeft, setGuideToLeft] = useState(false)
    const containerRef = useRef(null);
    const [events, setEvents] = useState([])
    const [loadin, setLoadin] = useState(false)

    const fetcheEvents = async () => {
        try {
            setLoadin(true)
            const eventTypes = await getEvents()
            if (eventTypes) {
                setEvents(eventTypes)
                setLoadin(false);
            }
        } catch (error) {
            console.log(error)
            setLoadin(false)

        }
    }

    useEffect(() => {
        fetcheEvents()
    }, [])

    const scrollToRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: 100,
                behavior: 'smooth',
            });
        }
    };

    const scrollToLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({
                left: - 100,
                behavior: 'smooth',
            });
        }
    };


    const handledOnclick = (sportName, eventType) => {
        setSport(sportName);
        setCurrentMarket(sportName);
        setCurrentEventTypeId(eventType.eventTypeId)
        setLoadingStatus(true)
    };


    const searchParams = useSearchParams()
    const spName_ = searchParams.get("mName")
    const mName = spName_ == "Soccer" ? "Football" : spName_
    return (
        <div className="flex flex-col mt-5 px-1 w-full">
            {/* <div className="flex items-start gap-x-1">
                <h4 className='uppercase tracking-wide text-gray-200 text-[0.9rem] font-bold'>Sports</h4>
            </div> */}
            <div className="flex flex-col w-full bg-black rounded">
                {/* <div className="flex justify-between items-center w-full px-2 py-1">
                    <div className="flex justify-end items-center p-0" onClick={scrollToLeft}>
                        <WestRoundedIcon fontSize='smaller' color='white' className={`${guideToLeft && "animate-bounce"} cursor-pointer`} />
                    </div>
                    <div className="flex justify-end items-center p-0" onClick={() => {
                        setGuideToLeft(true)
                        scrollToRight()
                    }}>
                        <EastRoundedIcon fontSize='smaller' color='white' className='animate-bounce cursor-pointer' />
                    </div>
                </div> */}
                <div
                    className="flex gap-x-2 text-white text-sm overflow-x-auto my-1"
                    ref={containerRef}
                    style={{
                        "msOverflowStyle": "none",
                        "scrollbarWidth": "none",
                        "overflow": "auto",
                        "whiteSpace": "nowrap" // Add this line
                    }}
                >
                    <p
                        // href={`?mName=Popular`}
                        onClick={() => {
                            setCurrentMarket("Popular")
                        }}
                        className="flex w-full py-1 px-6" style={{ "whiteSpace": "nowrap" }}>
                        Popular
                    </p>
                    {
                        markets.length > 0 && markets.map((market, index) => {
                            return (
                                (
                                    <p
                                        // href={`?mName=${market.marketName}`}
                                        onClick={() => {
                                            setCurrentMarket(market.marketName)
                                        }}
                                        key={index} className="flex w-full py-1 px-6" style={{ "whiteSpace": "nowrap" }}>
                                        {market.marketName}
                                    </p>
                                )
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )

}

export default MobileMarketsNavSlide