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
import { FaSearch } from "react-icons/fa";
import { hasDatePassed } from "../../utils/competitionCollase";

const Inplay = () => {
  const { currentCompetition } = useContext(CompetitionContext);
  const [opened, setOpened] = useState(true);
  const [marketsBook, setMarketsBook] = useState([]);
  const [activeSports, setActiveSports] = useState([]);
  const [activeSportMatches, setActiveSportMatches] = useState([]);
  const [matchesToShow, setMatchesToShow] = useState([]);
  const [isLive, setisLive] = useState(false);
  const [activeComp, setActiveComp] = useState("All");
  const [activeSport, setActiveSport] = useState("4");
  const [activeTime, setActiveTime] = useState("LIVE BETTING");
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
    4: "https://khiladi.in/assets/img/icons/4.png", // Cricket
    1: "https://khiladi.in/assets/img/icons/1.png", // Football
    2: "https://khiladi.in/assets/img/icons/2.png", // Tennis
    7522: "https://khiladi.in/assets/img/icons/7522.png", // Basketball
    27454571: "https://khiladi.in/assets/img/icons/20.png", // Esports
    3503: "https://khiladi.in/assets/img/icons/3503.png", // Darts
    998917: "https://khiladi.in/assets/img/icons/998917.png", // Volleyball
    2152880: "https://khiladi.in/assets/img/icons/99994.png", // Gaelic Games
    26420387: "https://khiladi.in/assets/img/icons/26420387.png", // Mixed Martial Arts
    7: "https://khiladi.in/assets/img/icons/7.png", // Horse Racing
  };
  const activeSportsWithLogo =
    activeSports &&
    activeSports.map((sport) => ({
      ...sport,
      logo:
        logos[String(sport.sportId)] ||
        "https://khiladi.in/assets/img/icons/7.png",
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
    <div className="mx-[10px]">
      {/* mobile */}

      {/* kheladi mobile view */}
      <div className="flex flex-col w-full sm:hidden">
        <div className="flex items-center gap-x-2 justify-between mb-0.5">
          <h1 className="text-[#4f0a9b] text-sm whitespace-nowrap">
            Online Sports Betting Exchange{" "}
          </h1>
          <div className="flex gap-x-2">
            <a
              onClick={() => {
                setisLive((prev) => !prev);
              }}
              className={`${
                isLive
                  ? "bg-[#2ea353] text-white border-0 font-[700] "
                  : "bg-[#f6f9ff] text-[#4f0a9b] border-[#4f0a9b] "
              } flex justify-center items-center text-xs px-2 py-1  border  rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
            >
              {isLive ? (
                <FaCheck fontSize="small" />
              ) : (
                <FaPlus fontSize="small" />
              )}{" "}
              Live
            </a>
            <a
              className={`${
                !2 === 2
                  ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                  : "bg-[#f6f9ff] text-[#4f0a9b] "
              } flex justify-center items-center text-xs px-1.5 py-0.5 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
            >
              <Add fontSize="small" /> Virtual
            </a>
          </div>
        </div>

        <div className="flex rounded border border-[#5700A3] rounded">
          <input
            type="text"
            name="search_inplay"
            id="search_inplay"
            className="w-full h-full px-2 py-2 border-none rounded-l text-black"
            placeholder="Search Games"
          />
          <div className="flex justify-center items-center bg-[#5700A3] px-3">
            <FaSearch fontSize="large" className="text-white" />
          </div>
        </div>

        <div className="overflow-y-hidden overflow-x-hidden mt-0.5">
          <ul className="block whitespace-nowrap overflow-x-auto scrollbar-hidden">
            {activeSportsWithLogo?.map((t, i) => {
              return (
                <li
                  key={i}
                  className={`mb-1  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
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
                    } flex justify-center items-center text-xs px-3 py-1 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
                  >
                    {<img src={t.logo} className="h-[21px] w-auto mr-[2px]" />}
                    {t.sportName}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="overflow-y-hidden overflow-x-hidden">
          <ul className="block whitespace-nowrap overflow-x-auto scrollbar-hidden">
            {["LIVE BETTING", "TODAY", "TOMORROW"]?.map((t, i) => {
              return (
                <li
                  key={i}
                  className={`mb-4  inline-block min-w-max mx-0.5 relative align-middle overflow-x-auto overflow-y-hidden whitespace-nowrap`}
                  onClick={() => {
                    setActiveTime(t);
                    // setActiveSportName(t);
                  }}
                >
                  <a
                    className={`${
                      activeTime == t
                        ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                        : "bg-[#f6f9ff] text-[#4f0a9b] "
                    } flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
                  >
                    {t}
                  </a>
                </li>
              );
            })}
          </ul>
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
                ? "bg-[#2ea353] text-white border-0 font-[700] "
                : "bg-[#f6f9ff] text-[#4f0a9b] border-[#4f0a9b] "
            } flex justify-center items-center text-xs px-3 py-2 border  rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
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
                ? "bg-[#0d6efd] text-[#ff0] font-[700] "
                : "bg-[#f6f9ff] text-[#4f0a9b] "
            } flex justify-center items-center text-xs px-3 py-2 border border-[#4f0a9b] rounded-full text-[#4f0a9b] uppercase cursor-pointer`}
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

export default Inplay;
