import React, { useContext, useEffect, useState } from "react";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { fetchHomeSportsEvents, fetchMKTBK } from "src/app/api/exchange";
import Loading from "../Loading";
import { INTERVAL } from "../../constants/mktfetchInterval";
import { getIcon } from "../../utils/utils";
import CompetionCollapseKheladi from "./CompetionCollapseKheladi";
import { Add } from "@mui/icons-material";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { hasDatePassed } from "../../utils/competitionCollase";

const Populars2 = () => {
  const { currentCompetition } = useContext(CompetitionContext);
  const [opened, setOpened] = useState(true);
  const [marketsBook, setMarketsBook] = useState([]);
  const [activeSports, setActiveSports] = useState([]);
  const [activeSportMatches, setActiveSportMatches] = useState([]);
  const [matchesToShow, setMatchesToShow] = useState([]);
  const [isLive, setisLive] = useState(false);
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
          const sports = popular.map((sport) => {
            return {
              sportName: sport.sportName,
              sportId: sport.eventTypeId,
            };
          });
          setActiveSports(sports);
          const activePopular = popular.filter((p) => {
            if (p.eventTypeId == activeSport) {
              return p;
            }
          });
          const filtered = appllyIsLiveFilter(activePopular[0].events);
          setActiveSportMatches(filtered);

          setMatchesToShow(activePopular[0].events);

          const mktIds = popular.flatMap((sport) =>
            sport.events.map((event) => event.market_id).filter((id) => id)
          );
          setMktIds(mktIds);
        }
      } catch (error) {
        console.error(error);
      }
      setFetched(true);
    };

    fetchPopularEvents();
  }, []);
  const logos = {
    4: "/sports/Cricket.webp", // Cricket
    1: "/sports/football.webp", // Football
    2: "/sports/tennis.webp", // Tennis
    7522: "/sports/basketball.png", // Basketball
    27454571: "/sports/esports.jpg", // Esports
    3503: "/sports/DARTS.png", // Darts
    998917: "/sports/volleyball.png", // Volleyball
    2152880: "/sports/gaelicgames.png", // Gaelic Games
    26420387: "/sports/mixedmartialarts.png", // Mixed Martial Arts
    7: "/sports/horseracing.webp", // Horse Racing
    "str_11": "/sports/horseracing_today.webp", // Horse Racing - Today's Card
    4339: "/sports/greyhoundracing.webp", // Greyhound Racing
    "str_10": "/sports/greyhoundracing.webp", // Greyhounds - Today's Card
    2378961: "/sports/politics.webp", // Politics
    5: "/sports/rugbyunion.png", // Rugby Union
    1477: "/sports/rugbyleague.png", // Rugby League
    6: "/sports/boxing.png", // Boxing
    7511: "/sports/baseball.webp", // Baseball
    3: "/sports/golf.webp", // Golf
    8: "/sports/motorsport.png", // Motor Sport
  };
  
  const activeSportsWithLogo =
    activeSports &&
    activeSports.map((sport) => ({
      ...sport,
      logo:
        logos[String(sport.sportId)] ||
        "/sports/horseracing.webp",
    }));

  useEffect(() => {
    const fetchMKTBKData = async () => {
      try {
        const validMktIDS = mktIds.filter(
          (id) => id && typeof id === "string" && id.trim() !== ""
        );
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
    const activePopular = popular.filter((p) => {
      if (p.eventTypeId == activeSport) {
        return p;
      }
    });
    const filterd_matches = appllyIsLiveFilter(activePopular[0]?.events);
    setActiveSportMatches(filterd_matches);
  }, [activeSport, isLive]);

  const onClick = () => {
    setOpened((prev) => !prev);
  };

  const appllyIsLiveFilter = (list) => {
    if (isLive) {
      const filtered = list.filter((i) => hasDatePassed(i.openDate));
      return filtered;
    } else {
      return list;
    }
  };
  return (
    <div className="mx-[1%]">
      {/* mobile */}

      {/* kheladi mobile view */}
      <div className="flex flex-col w-full sm:hidden">
        <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-[7px_0_5px_0] relative">
          Highlights
        </h5>
        <div className=" overflow-y-hidden overflow-x-hidden">
          <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden">
            {activeSportsWithLogo?.map((t, i) => {
              return (
                <li
                  key={i}
                  className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                  onClick={() => {
                    setActiveSport(t.sportId);
                    setActiveSportName(t.sportName);
                  }}
                >
                  <a
                    className={`${
                      activeSport == t.sportId
                        ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                        : "bg-[#f6f9ff] text-[#4f0a9b] "
                    } flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
                  >
                    {<img src={t.logo} className="h-[21px] w-auto mr-[2px]" />}
                    {t.sportName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-x-4 mb-2">
          <h1 className="text-[#4f0a9b] text-[13px] font-bold leading-normal  py-2 relative">
            Online Sports Betting Exchange{" "}
          </h1>
          <a
            onClick={() => {
              setisLive((prev) => !prev);
            }}
            className={`${
              isLive
                ? "bg-[#2ea353] text-white border-0 font-[700] "
                : "bg-[#f6f9ff] text-[#4f0a9b] border-[#4f0a9b] "
            } flex justify-center items-center text-xs px-3 py-2 border  rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
          >
            <Add fontSize="small" /> Live
          </a>
          <a
            className={`${
              !2 === 2
                ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                : "bg-[#f6f9ff] text-[#4f0a9b] "
            } flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
          >
            <Add fontSize="small" /> Virtual
          </a>
        </div>
        <div className="bg-gray ">
          <div className="bg-gray ">
            {/* <CompetionCollapse
                            onClick={onClick}
                            matches={activeSportMatches}
                            sportId={activeSport}
                            sportName={activeSportName}
                            marketsBook={marketsBook}
                            competitionTitle={"competitionTitle"}
                            opened={opened}
                        /> */}
            <CompetionCollapseKheladi
              isLive={isLive}
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
        {popular.length === 0 && !fetched && <Loading stylings={"w-full"} />}
      </div>

      {/* Desktop view */}
      <div className="flex flex-col w-full max-sm:hidden">
        <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-[7px_0_5px_0] relative">
          Highlights
        </h5>
        <div className=" overflow-y-hidden overflow-x-hidden">
          <ul className=" block whitespace-nowrap overflow-x-auto scrollbar-hidden">
            {activeSportsWithLogo?.map((t, i) => {
              return (
                <li
                  key={i}
                  className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                  onClick={() => {
                    setActiveSport(t.sportId);
                    setActiveSportName(t.sportName);
                  }}
                >
                  <a
                    className={`${
                      activeSport == t.sportId
                        ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                        : "bg-[#f6f9ff] text-[#4f0a9b] "
                    } flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
                  >
                    {" "}
                    {<img src={t.logo} className="h-[21px] w-auto mr-[2px]" />}
                    {t.sportName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-x-4 mb-2">
          <h1 className="text-[#4f0a9b] text-[13px] font-bold leading-normal  py-2 relative">
            Online Sports Betting Exchange{" "}
          </h1>
          <a
            onClick={() => {
              setisLive((prev) => !prev);
            }}
            className={`${
              isLive
                ? "bg-[#2ea353] text-white border-[#2ea353]  "
                : "bg-[#f6f9ff] text-[#4f0a9b] border-[#4f0a9b]  "
            } flex justify-center gap-x-1 items-center px-3 py-1 border  rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
          >
            {isLive ? (
              <FaCheck fontSize="small" />
            ) : (
              <FaPlus fontSize="small" />
            )}
            Live
          </a>
          <a
            className={`${
              !2 === 2
                ? "bg-[#0d6efd] text-[#ff0]  "
                : "bg-[#f6f9ff] text-[#4f0a9b] "
            }  flex justify-center gap-x-1 items-center px-3 py-1 border  rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
          >
            <FaPlus fontSize="small" /> Virtual
          </a>
        </div>
        <div className="bg-gray">
          <div className="bg-gray ">
            {/* <CompetionCollapse
                            onClick={onClick}
                            matches={activeSportMatches}
                            sportId={activeSport}
                            sportName={activeSportName}
                            marketsBook={marketsBook}
                            competitionTitle={"competitionTitle"}
                            opened={opened}
                        /> */}
            <CompetionCollapseKheladi
              isLive={isLive}
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
        {popular.length === 0 && !fetched && <Loading stylings={"w-full"} />}
      </div>
    </div>
  );
};

export default Populars2;
