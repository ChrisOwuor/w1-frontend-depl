import React, { useState, useEffect, useRef } from 'react';

import WestRoundedIcon from '@mui/icons-material/WestRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { eventTypesList } from '../constants/events';
import { getEvents, fetcheSportCompetitions } from '@/app/api/exchange';
import { getIcon } from '../utils/utils';



const MobileSportsNavSlide = ({ setCurrentSport, setCurrentEventTypeId, setLoadingStatus, currentSport }) => {
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
        setCurrentSport(sportName);
        setCurrentEventTypeId(eventType.eventTypeId)
        setLoadingStatus(true)
    };


    const searchParams = useSearchParams()
    const spName_ = searchParams.get("spName")
    const spName = spName_ == "Soccer" ? "Football" : spName_
    return (
        <div className="flex flex-col mt-5 px-1 w-full">
            <div className="flex items-start gap-x-1">
                <h4 className='uppercase tracking-wide text-gray-200 text-[0.9rem] font-bold'>Sports</h4>
            </div>
            <div className="flex flex-col w-full bg-gradient-to-r from-green-700 to-orange-500 rounded">
                <div className="flex justify-between items-center w-full px-2 py-1">
                    <div className="flex justify-end items-center p-0" onClick={scrollToLeft}>
                        <WestRoundedIcon fontSize='smaller' color='white' className={`${guideToLeft && "animate-bounce"} cursor-pointer`} />
                    </div>
                    <div className="flex justify-end items-center p-0" onClick={() => {
                        setGuideToLeft(true)
                        scrollToRight()
                    }}>
                        <EastRoundedIcon fontSize='smaller' color='white' className='animate-bounce cursor-pointer' />
                    </div>
                </div>
                <div
                    className="flex gap-2 text-white text-sm overflow-x-auto my-1"
                    ref={containerRef}
                    style={{
                        "msOverflowStyle": "none",
                        "scrollbarWidth": "none",
                        "overflow": "auto"
                    }}
                >
                    <Link href={`?spName=Popular`} >
                        <div
                            onClick={() => {
                                setCurrentSport("Popular")
                                setSport("Popular")
                                setCurrentEventTypeId("")
                                setLoadingStatus(true)
                            }}

                            className={`${currentSport === "Popular" ? "bg-gradient-to-r from-black to-orange-600" : "bg-gray-900/[0.8]"} flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer px-4 py-2`}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            <div
                                className={`flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer`}
                            >
                                {/* <img className="h-[1.4rem] w-[1.4rem]" src="https://img.icons8.com/external-becris-lineal-color-becris/64/external-soccer-football-becris-lineal-color-becris.png" alt="cricket-ball--v1" /> */}
                                <p className="font-bold w-full">Popular</p>
                            </div>
                        </div>
                    </Link>
                    {
                        events.length > 0 && events.map((modes, index) => {
                            let iconName = modes.name === "Soccer" ? "Football" : modes.name
                            const icon = getIcon(iconName)
                            return (
                                (
                                    <Link href={`?spName=${modes.name == "Football" ? "Soccer" : modes.name}`} key={index}>

                                        <div
                                            onClick={() => handledOnclick(modes.name, modes)}

                                            className={`${spName === modes.name
                                                ? "bg-gradient-to-r from-black to-orange-600"
                                                : "bg-gray-900/[0.8]"
                                                } flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer px-4 py-1`}
                                            style={{ whiteSpace: 'nowrap' }}
                                        >
                                            <div
                                                className={`flex items-center justify-center gap-1 rounded-r hover:text-white cursor-pointer`}
                                            >
                                                {
                                                    icon && icon != null ? (
                                                        <img className="h-[1.4rem] w-[1.4rem]" src={icon.url} alt="cricket-ball--v1" />
                                                    ) :
                                                        modes.icon
                                                }
                                                <p className="font-bold w-full py-1">{modes.name === "Football" ? "Soccer" : modes.name}</p>
                                            </div>
                                        </div>
                                    </Link>

                                )
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )

}

export default MobileSportsNavSlide