import React, { useContext, useEffect, useState } from 'react';
import CompetionCollapse from "./CompetionCollapse";
import axios from "axios";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { fetchMKTBK, fetchPopularSportsEvents } from 'src/app/api/exchange';
import Loading from '../Loading';
import { INTERVAL } from '../../constants/mktfetchInterval';
import { sleep } from '../../utils/sleep';
import { sendHttpRequest } from '@/app/api/ship_yard/sender';


const MobilePopulars = ({ currentSport, currentEventTypeId }) => {
    const { currentCompetition } = useContext(CompetitionContext);
    const [opened, setOpened] = useState(true);
    const [marketsBook, setMarketsBook] = useState([])
    const [mktIds, setMktIds] = useState([])
    const [activeComp, setActiveComp] = useState("All")
    const [popular, setPopular] = useState([])
    const [fetched, setFetched] = useState(false)
    const [eventTypes, setEventTypes] = useState([])
    const [events, setEvents] = useState([])


    useEffect(() => {
        (async () => {
            const toSend = { sportName: currentSport }
            const res = await sendHttpRequest(`/exchange/sport_events?sportId=${currentEventTypeId}`, "get", {})
            if (res) {
                // console.log("------------")
                // console.log(res.data, "lllllllllllllllll")
                setEvents(res.data)
            }


        })()
    }, [currentSport])

    const runner2 = async () => {
        // res.data
        let mktIDS = [];
        for (const event of events) {
            if (event.marketId != "") {
                mktIDS.push(event.marketId)
            }
        }

        if (mktIDS.length > 0) {
            const validMktIDS = mktIDS.filter(id => id && typeof id === 'string' && id.trim() !== '');

            if (validMktIDS.length > 0) {
                const mktbook = await fetchMKTBK(validMktIDS);
                setMarketsBook(mktbook);
                await sleep(2000); // Assuming sleep is an async function
                setMktIds(validMktIDS);
            }
        }

    }
    useEffect(() => {
        runner2()
    }, [events])

    useEffect(() => {
        if (mktIds.length > 0) {
            const validMktIDS = mktIds.filter(id => id && typeof id === 'string' && id.trim() !== '');
            if (validMktIDS.length > 0) {
                const fetchData = async () => {
                    try {
                        const mktbook = await fetchMKTBK(validMktIDS)
                        if (mktbook.length > 0) {
                            setMarketsBook(mktbook)
                        }
                    } catch (error) {
                        console.error(error);
                    }
                };
                const intervalId = setInterval(fetchData, INTERVAL);
                return () => clearInterval(intervalId);
            }

        }
    }, [mktIds])

    const onClick = () => {
        setOpened((prev) => !prev);
    };
    useEffect(() => {
        if (activeComp != "") {
            setActiveComp(currentCompetition)
        }
    }, [currentCompetition])
    useEffect(() => {
        fetchEvents()
    }, [])

    const fetchEvents = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sports`
            );
            if (res && res.data && res.data.length > 0) {
                setEventTypes(res.data)

            }
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        const runner2 = async () => {
            const popular = await fetchPopularSportsEvents()
            if (popular.length > 0) {
                setPopular(popular)
                let mktIDS = [];
                popular.map(sport => {
                    for (const event of sport.events) {
                        if (event.marketId != "") {
                            mktIDS.push(event.marketId)
                        }
                    }
                });
                if (mktIDS.length > 0) {
                    const validMktIDS = mktIDS.filter(id => id && typeof id === 'string' && id.trim() !== '');

                    if (validMktIDS.length > 0) {
                        const mktbook = await fetchMKTBK(validMktIDS);
                        setMarketsBook(mktbook);
                        await sleep(2000); // Assuming sleep is an async function
                        setMktIds(validMktIDS);
                    }
                }

            }
        }
        setFetched(true)
        runner2()
    }, [])

    return (
        <div className="flex flex-col w-full">
            {
                popular.length > 0 ? "" : fetched ? "" : <Loading stylings={"w-full"} />
            }

            {/* {
                popular.length > 0 && (
                    popular.map((sport, i) => {
                        let competitionTitle = "Soccer";
                        let sportName = currentSport === "Soccer" ? 'Football' : currentSport
                        if (sport.sportName === sportName) {
                            return (
                                <div className="" key={i}>
                                    <CompetionCollapse
                                        onClick={onClick}
                                        events={sport.events}
                                        sportId={sport.eventTypeId}
                                        sportName={sportName}
                                        marketsBook={marketsBook}
                                        competitionTitle={sportName === "Football" ? "Soccer" : sportName}
                                        opened={opened}
                                    />
                                </div>
                            );
                        }
                    })
                )
            } */}

            {
                currentEventTypeId != "" && (
                    <div className="" >
                        <CompetionCollapse
                            onClick={onClick}
                            events={events}
                            sportId={currentEventTypeId}
                            sportName={currentSport}
                            marketsBook={marketsBook}
                            competitionTitle={currentSport}
                            opened={opened}
                        />
                    </div>
                )
            }


        </div>
    );
};

export default MobilePopulars;

