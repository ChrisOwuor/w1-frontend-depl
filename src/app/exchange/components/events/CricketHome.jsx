import React, { useContext, useEffect, useState } from "react";
import CompetionCollapse from "./CompetionCollapse";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { fetchMKTBK, getSportHomeMatch } from "src/app/api/exchange";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../Loading";
import { INTERVAL } from "../../constants/mktfetchInterval";
import { getIcon } from "../../utils/utils";
import { NAVContext } from "@/app/context/NavContext";

const CricketHome = () => {
  const { currentCompetition } = useContext(CompetitionContext);
  const { currentCenter } = useContext(NAVContext);
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

  useEffect(() => {
    setActiveComp(currentCompetition || activeComp);
  }, [currentCompetition]);

  const fetchPopularEvents = async () => {
    try {
      const popular = await getSportHomeMatch(currentCenter);
      if (popular.length > 0) {
        setPopular(popular);
        const sports = popular.map((sport) => {
          return {
            sportName: sport.sportName,
            sportId: sport.eventTypeId,
          };
        });
        setActiveSports(sports);
        setActiveSportMatches(popular[0].events);
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
  useEffect(() => {
    fetchPopularEvents();
  }, [currentCenter]);
  

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
    setActiveSportMatches(activePopular[0]?.events);
    console.log(activePopular);
  }, [activeSport]);

  const onClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <div className="mb-4">
      {/* mobile */}
      <div className="flex flex-col w-full sm:hidden ">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-11 flex items-center bg-warning gap-x-4 w-full pt-1 overflow-x-auto scrollbar-hidden">
            {activeSports?.map((t, i) => {
              const icon = getIcon(t.sportName);
              return (
                <div
                  key={i}
                  className={`${
                    activeSport == t.sportId
                      ? "bg-black text-white rounded-t-lg "
                      : "text-black bg-gray-200"
                  } px-4 py-2 cursor-pointer flex items-center justify-center gap-x-2 w-full`}
                  onClick={() => {
                    setActiveSport(t.sportId);
                    setActiveSportName(t.sportName);
                  }}
                >
                  {icon && icon.url ? (
                    <img
                      className="h-4 w-4 object-contain"
                      src={icon.url}
                      alt={`${t.sportName} icon`}
                    />
                  ) : null}
                  <p className="">{t.sportName}</p>
                </div>
              );
            })}
          </div>
          <div className="col-span-1 flex justify-center items-center bg-black">
            <SearchIcon fontSize="medium" className="text-white " />
          </div>
        </div>
        <div className="bg-white px-2 overflow-y-scroll h-full">
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
        {popular.length === 0 && !fetched && <Loading stylings={"w-full"} />}
      </div>

      {/* Desktop view */}
      <div className="flex flex-col w-full max-sm:hidden">
        <div className="flex items-center bg-primary3 p-1">
          <p className="text-white font-medium text-md uppercase">{currentCenter} Highlights</p>
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
        {popular.length === 0 && !fetched && <Loading stylings={"w-full"} />}
      </div>
    </div>
  );
};

export default CricketHome;
