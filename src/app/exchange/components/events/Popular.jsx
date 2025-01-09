import React, { useContext, useEffect, useState } from 'react';
import CompetionCollapse from "./CompetionCollapse";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { fetchMKTBK, fetchPopularSportsEvents } from 'src/app/api/exchange';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../Loading';
import { INTERVAL } from '../../constants/mktfetchInterval';
import { getIcon } from '../../utils/utils';

const Populars = () => {
    const { currentCompetition } = useContext(CompetitionContext);
    const [opened, setOpened] = useState(true);
    const [marketsBook, setMarketsBook] = useState([]);
    const [activeSports, setActiveSports] = useState([]);
    const [activeSportMatches, setActiveSportMatches] = useState([]);
    const [activeComp, setActiveComp] = useState("All");
    const [activeSport, setActiveSport] = useState("4");
    const [activeSportName, setActiveSportName] = useState("Cricket");
    const [popular, setPopular] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [mktIds, setMktIds] = useState([]);
    const [isRequesting, setIsRequesting] = useState(false);

    useEffect(() => {
        setActiveComp(currentCompetition || activeComp);
    }, [currentCompetition]);

    useEffect(() => {
        const fetchPopularEvents = async () => {
            try {
                const popular = await fetchPopularSportsEvents();
                if (popular.length > 0) {
                    setPopular(popular);
                    const sports = popular.map(sport => {
                        return {
                            sportName: sport.sportName,
                            sportId: sport.eventTypeId
                        }
                    })
                    setActiveSports(sports)
                    const activePopular = popular.filter(p => {
                        if (p.eventTypeId == activeSport) {
                            return p
                        }
                    })
                    setActiveSportMatches(activePopular[0].events)
                    const mktIds = popular.flatMap(sport => sport.events.map(event => event.market_id).filter(id => id));
                    setMktIds(mktIds);
                }
            } catch (error) {
                console.error(error);
            }
            setFetched(true);
        };

        fetchPopularEvents();
    }, []);

    useEffect(() => {
        const fetchMKTBKData = async () => {
            try {
                const validMktIDS = mktIds.filter(id => id && typeof id === 'string' && id.trim() !== '');
                if (validMktIDS.length > 0) {
                    const mktbook = await fetchMKTBK(validMktIDS);

                    if (mktbook.length > 0) {
                        setMarketsBook(mktbook);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsRequesting(false);
            }
        };

        fetchMKTBKData();
        const intervalId = setInterval(fetchMKTBKData, INTERVAL);
        return () => clearInterval(intervalId);
    }, [mktIds]);

    useEffect(() => {
        const activePopular = popular.filter(p => {
            if (p.eventTypeId == activeSport) {
                return p
            }
        })
        setActiveSportMatches(activePopular[0]?.events)
        console.log(activePopular)
    }, [activeSport])

    const onClick = () => {
        setOpened(prev => !prev);
    };





    return (
        <div className=''>
            {/* mobile */}
            <div className="flex flex-col w-full sm:hidden ">

                <div className="grid grid-cols-12 w-full">

                    <div className="col-span-11 flex items-center bg-warning gap-x-2 w-full pt-1 overflow-x-auto scrollbar-hidden">
                        {activeSports?.map((t, i) => {
                            const icon = getIcon(t.sportName)
                            return (
                                <div
                                    key={i}
                                    className={`${activeSport == t.sportId ? "justify-center bg-black text-white rounded-t-lg" : " text-black"} text-md font-semibold px-2 py-2 cursor-pointer flex items-center`}
                                    onClick={() => {
                                        setActiveSport(t.sportId)
                                        setActiveSportName(t.sportName)
                                    }}
                                >
                                    {
                                        icon && icon != null ? (
                                            <img className="h-6 object-contain" src={icon.url} alt="cricket-ball--v1" />
                                        ) : ""
                                        // modes.icon"
                                    }
                                    <p>{t.sportName}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className='col-span-1 flex justify-center items-center bg-black'>
                        <SearchIcon fontSize='medium' className='text-white ' />
                    </div>

                </div>
                <div className="bg-white px-2 overflow-y-scroll h-[40vh]">
                    <CompetionCollapse
                        onClick={onClick}
                        matches={activeSportMatches}
                        sportId={activeSport}
                        sportName={activeSportName}
                        marketsBook={marketsBook}
                        competitionTitle={"competitionTitle"}
                        opened={opened}
                    />
                </div>
                {
                    popular.length === 0 && !fetched && <Loading stylings={"w-full"} />
                }

            </div>


            {/* Desktop view */}
            <div className="flex flex-col w-full max-sm:hidden">
                <div className="flex items-center bg-primary3 p-1">
                    <p className='text-white font-medium text-md'>Highlights</p>
                </div>
                <div className="flex items-center w-full">

                    <div className="flex items-center bg-accent1 gap-x-1 w-full">
                        {activeSports?.map((t, i) => {

                            return (
                                <p
                                    key={i}
                                    className={`${activeSport == t.sportId ? "bg-gray text-black rounded-tr-2xl" : "bg-black text-white rounded-2xl"} text-sm  px-4  font-bold  p-1 cursor-pointer`}
                                    onClick={() => {
                                        setActiveSport(t.sportId)
                                        setActiveSportName(t.sportName)
                                    }}
                                >
                                    {t.sportName}
                                </p>
                            )
                        })}
                    </div>

                </div>
                <div className="bg-gray pt-4">
                    <div className="bg-white px-2">
                        <CompetionCollapse
                            onClick={onClick}
                            matches={activeSportMatches}
                            sportId={activeSport}
                            sportName={activeSportName}
                            marketsBook={marketsBook}
                            competitionTitle={"competitionTitle"}
                            opened={opened}
                        />
                    </div>
                    {/* {
                    popular.length > 0 && popular.map(renderCompetitions)
                } */}
                </div>
                {
                    popular.length === 0 && !fetched && <Loading stylings={"w-full"} />
                }

            </div>
        </div>
    );
};

export default Populars;
