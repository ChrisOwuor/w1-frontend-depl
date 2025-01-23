
import React, { useContext, useEffect, useState } from 'react';
import CompetionCollapse from "./CompetionCollapse";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { fetchHomeSportsEvents, fetchMKTBK, fetchPopularSportsEvents } from 'src/app/api/exchange';
import SearchIcon from '@mui/icons-material/Search';
import Loading from '../Loading';
import { INTERVAL } from '../../constants/mktfetchInterval';
import { getIcon } from '../../utils/utils';
import CasinoGamesGrid from './CasinoGamesGrid';

const CasinoPopulars = () => {
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
                const popular = await fetchHomeSportsEvents();
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



    const game_categories = [
        { id: 1, name: "Dragon Tiger" },
        { id: 2, name: "Baccarat" },
        { id: 3, name: "Sic Bo" },
        { id: 4, name: "Roulette" },
        { id: 5, name: "Poker" },
        { id: 6, name: "Lucky 7" },
        { id: 7, name: "Andar Bahar" },
        { id: 8, name: "Teen Patti" },
        { id: 9, name: "32 Cards" },
        { id: 10, name: "Others" },
        { id: 11, name: "Lottery" },
        { id: 12, name: "Cricket War" },
        { id: 13, name: "Hi Low" },
        { id: 14, name: "Crash" },
        { id: 15, name: "Aviator" },
        { id: 16, name: "Slots" },
        { id: 17, name: "Mines" },
        { id: 18, name: "HI LO" },
        { id: 19, name: "Color Prediction" },
        { id: 20, name: "Video Slots" },
        { id: 21, name: "Crash Games" },
        { id: 22, name: "Scratch Cards" },
        { id: 23, name: "Video Poker" },
        { id: 24, name: "Double Hand Casino Holdem Poker" },
        { id: 25, name: "Slingshot" },
        { id: 26, name: "Bac Bo" },
        { id: 27, name: "Balloon Race" },
        { id: 28, name: "Blackjack" },
        { id: 29, name: "Caribbean Stud Poker" },
        { id: 30, name: "Cash or Crash" },
        { id: 31, name: "Casino Holdem" },
        { id: 32, name: "Craps" },
        { id: 33, name: "Crazy Coin Flip" },
        { id: 34, name: "Crazy Pachinko" },
        { id: 35, name: "Crazy Time" },
        { id: 36, name: "Dead or Alive: Saloon" },
        { id: 37, name: "Deal or No Deal" },
        { id: 38, name: "Money Wheel" },
        { id: 39, name: "Extra Chilli Epic Spins" },
        { id: 40, name: "Extreme Texas Holdem" },
        { id: 41, name: "Fan Tan" },
        { id: 42, name: "RNG American Roulette" },
        { id: 43, name: "RNG Baccarat" },
        { id: 44, name: "RNG Blackjack" },
        { id: 45, name: "RNG Craps" },
        { id: 46, name: "First Person Deal or No Deal" },
        { id: 47, name: "RNG Money Wheel" },
        { id: 48, name: "First Person HiLo" },
        { id: 49, name: "RNG Lightning Blackjack" },
        { id: 50, name: "RNG Roulette" },
        { id: 51, name: "First Person Bingo" },
        { id: 52, name: "First Person Super Sic Bo" },
        { id: 53, name: "RNG Top Card" },
        { id: 54, name: "First Person Video Poker" },
        { id: 55, name: "Top Card" },
        { id: 56, name: "Top Dice" },
        { id: 57, name: "Funky Time" },
        { id: 58, name: "Gonzo's Treasure Map" },
        { id: 59, name: "Scalable Blackjack" },
        { id: 60, name: "FreeBet Blackjack" },
        { id: 61, name: "Lightning Ball" },
        { id: 62, name: "Lightning Blackjack" },
        { id: 63, name: "Lightning Dice" },
        { id: 64, name: "Lightning Storm" },
        { id: 65, name: "Bingo" },
        { id: 66, name: "Monopoly Big Baller" },
        { id: 67, name: "Monopoly" },
        { id: 68, name: "Power Infinite Blackjack" },
        { id: 69, name: "Stock Market" },
        { id: 70, name: "First Person Stock Market" },
        { id: 71, name: "Super Andar Bahar" },
        { id: 72, name: "Teen Patti" },
        { id: 73, name: "Texas Holdem Bonus Poker" },
        { id: 74, name: "Triple Card Poker" },
        { id: 75, name: "Crazy Games" },
        { id: 76, name: "Live Blackjack" },
        { id: 77, name: "Live Dragon Tiger" },
        { id: 78, name: "Live Baccarat" },
        { id: 79, name: "Live Sic Bo" },
        { id: 80, name: "Game Show" },
        { id: 81, name: "Live Poker" },
        { id: 82, name: "Live Roulette" },
        { id: 83, name: "Live Lobby" },
        { id: 84, name: "Rummy" },
    ];
    const games = [
        { id: 1, name: "MAC88" },
        { id: 2, name: "Fun Games" },
        { id: 3, name: "Turbogames" },
        { id: 4, name: "Mac88 Virtuals" },
        { id: 5, name: "Color Prediction" },
        { id: 6, name: "SMARTSOFT" },
        { id: 7, name: "MAC Excite" },
        { id: 8, name: "Evoplay Entertainment" },
        { id: 9, name: "Evolution Gaming" },
        { id: 10, name: "Ezugi" },
        { id: 11, name: "Spribe" },
        { id: 12, name: "JiLi" },
        { id: 13, name: "KINGMAKER" },
        { id: 14, name: "AE SEXY" },
        { id: 15, name: "BetGames.TV" },
        { id: 16, name: "Vivo" },
        { id: 17, name: "Bombay Live" },
        { id: 18, name: "Virtual Sports" },
        { id: 19, name: "Playtech Live" },
        { id: 20, name: "Gamzix" },
    ];


    return (
        <div className=''>
            {/* mobile */}
            {/* <div className="flex flex-col w-full sm:hidden ">

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

            </div> */}
            {/* new mobile view */}
            <div className="flex flex-col w-full sm:hidden">
                <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-3 relative">
                   Bet on casino games</h5>
                <div className=" overflow-y-hidden overflow-x-hidden w-full ">

                    <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden outline outline-1 border-b-2 border">
                        {games?.map((t, i) => {

                            return (
                                <li
                                    key={i}
                                    className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                                    // onClick={() => {
                                    //     setActiveSport(t.sportId)
                                    //     setActiveSportName(t.sportName)
                                    // }}
                                >
                                    <a className={`${i == t.id ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > {t.name}</a>

                                </li>
                            )
                        })}
                    </ul>

                </div>

                <div className=" overflow-y-hidden overflow-x-hidden">

                    <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden">
                        {game_categories?.map((t, i) => {

                            return (
                                <li
                                    key={i}
                                    className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                                    // onClick={() => {
                                    //     setActiveSport(t.sportId)
                                    //     setActiveSportName(t.sportName)
                                    // }}
                                >
                                    <a className={`${i == t.id ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > {t.name}</a>

                                </li>
                            )
                        })}
                    </ul>

                </div>
                {/* <div className='flex items-center gap-x-4 mb-2'>
                    <h1 className="text-[#4f0a9b] text-[13px] font-bold leading-normal  py-2 relative">Online Sports Betting Exchange </h1>
                    <a className={`${!2 === 2 ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > Live</a>
                    <a className={`${!2 === 2 ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > Virtual</a>

                </div> */}
                <div className="bg-white ">
                    {/* <div className="bg-white pr-2">
                        <CompetionCollapse
                            onClick={onClick}
                            matches={activeSportMatches}
                            sportId={activeSport}
                            sportName={activeSportName}
                            marketsBook={marketsBook}
                            competitionTitle={"competitionTitle"}
                            opened={opened}
                        />
                    </div> */}
                    <CasinoGamesGrid/>
                    {/* {
                    popular.length > 0 && popular.map(renderCompetitions)
                } */}
                </div>
                {
                    popular.length === 0 && !fetched && <Loading stylings={"w-full"} />
                }

            </div>


            {/* Desktop view */}
            <div className="flex flex-col w-full max-sm:hidden">
                <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-[7px_0_5px_0] relative">
                    Bet on casino games</h5>
                <div className=" overflow-y-hidden overflow-x-hidden">

                    <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden">
                        {games?.map((t, i) => {

                            return (
                                <li
                                    key={i}
                                    className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                                    // onClick={() => {
                                    //     setActiveSport(t.sportId)
                                    //     setActiveSportName(t.sportName)
                                    // }}
                                >
                                    <a className={`${i == t.id? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > {t.name}</a>

                                </li>
                            )
                        })}
                    </ul>

                </div>
                <div className=" overflow-y-hidden overflow-x-hidden">

                    <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden">
                        {game_categories?.map((t, i) => {

                            return (
                                <li
                                    key={i}
                                    className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                                    // onClick={() => {
                                    //     setActiveSport(t.sportId)
                                    //     setActiveSportName(t.sportName)
                                    // }}
                                >
                                    <a className={`${i == t.id ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > {t.name}</a>

                                </li>
                            )
                        })}
                    </ul>

                </div>
                {/* <div className='flex items-center gap-x-4 mb-2'>
                    <h1 className="text-[#4f0a9b] text-[13px] font-bold leading-normal  py-2 relative">Online Sports Betting Exchange </h1>
                    <a className={`${!2 === 2 ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > Live</a>
                    <a className={`${!2 === 2 ? "bg-[#0d6efd] text-[#ff0] font-[700] " : "bg-[#f6f9ff] text-[#4f0a9b] "} flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`} > Virtual</a>

                </div> */}
                <div className="bg-white ">
                    {/* <div className="bg-white pr-2">
                        <CompetionCollapse
                            onClick={onClick}
                            matches={activeSportMatches}
                            sportId={activeSport}
                            sportName={activeSportName}
                            marketsBook={marketsBook}
                            competitionTitle={"competitionTitle"}
                            opened={opened}
                        />
                    </div> */}
                    <CasinoGamesGrid/>
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

export default CasinoPopulars;
