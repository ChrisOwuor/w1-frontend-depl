import React, { useContext, useEffect, useState } from "react";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import Loading from "../Loading";
import CompetionCollapseTwo from "./CollapseCompTwo";
import { fetchMKTBK, getMatches, getRaceEvents } from "src/app/api/exchange";
import { INTERVAL } from "../../constants/mktfetchInterval";
import { sleep } from "../../utils/sleep";
import { NAVContext } from "@/app/context/NavContext";
import RaceEvents from "./RaceEvents";

const MatchesComponent = () => {
  const { currentCompetition } = useContext(CompetitionContext);
  const { view } = useContext(NAVContext);
  const [opened, setOpened] = useState(true);
  const [matches, setMatches] = useState([]);
  const [marketsBook, setMarketsBook] = useState([]);
  const [mktIds, setMktIds] = useState([]);
  const [activeComp, setActiveComp] = useState("All");
  const [loadin, setLoadin] = useState(false);

  useEffect(() => {
    if (view.sportId != "" && view.competitionId != "") {
      (async () => {
        setLoadin(true);
        const events = ["7", "4339"].includes(view.sportId)
          ? await getRaceEvents(view.sportId, view.competitionId)
          : await getMatches(view.sportId, view.competitionId);

        if (events && events.length > 0) {
          setMatches(events);
        } else {
          setMatches([]);
        }
        setLoadin(false);
      })();
    }
  }, [view]);

  useEffect(() => {
    if (matches) {
      let marketIds = [];
      for (const event of matches) {
        marketIds.push(event.market_id);
      }

      const fetchData = async () => {
        try {
          if (marketIds.length > 0) {
            const mktbook = await fetchMKTBK(marketIds);
            setMarketsBook(mktbook);
            // sleep(100);
            setMktIds(marketIds);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [matches]);

  useEffect(() => {
    if (
      mktIds.length > 0 &&
      view.sportName != "" &&
      view.competitionName != ""
    ) {
      const fetchData = async () => {
        try {
          const mktbook = await fetchMKTBK(mktIds);
          if (mktbook.length > 0) {
            setMarketsBook(mktbook);
          }
        } catch (error) {
          console.error(error);
        }
      };
      const intervalId = setInterval(fetchData, INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [mktIds]);

  const onClick = () => {
    setOpened((prev) => !prev);
  };
  useEffect(() => {
    if (activeComp != "") {
      setActiveComp(currentCompetition);
    }
  }, [currentCompetition]);

  return (
    <div className="flex flex-col w-full h-full">
      {matches.length > 0 &&
      view.sportName != "" &&
      view.competitionName != "" ? (
        <div className="">
          {["7", "4339"].includes(view.sportId) ? (
            <RaceEvents
              onClick={onClick}
              opened={opened}
              matches={matches}
              competitionId={view.competitionId}
              sportId={view.sportId}
              sportName={view.sportName}
              marketsBook={marketsBook}
              competitionTitle={view.competitionName}
              competitionRegion={view.competitionRegion}
            />
          ) : (
            <CompetionCollapseTwo
              onClick={onClick}
              opened={opened}
              matches={matches}
              competitionId={view.competitionId}
              sportId={view.sportId}
              sportName={view.sportName}
              marketsBook={marketsBook}
              competitionTitle={view.competitionName}
              competitionRegion={view.competitionRegion}
            />
          )}
        </div>
      ) : (
        <div className=" text-white w-full bg-blue-600/[0.1] p-2 flex items-center">
          <p className="p_2 text-black tracking-wider">
            No matches for{" "}
            <span className="text-green-400 font-bold">
              {view.competitionName}
            </span>{" "}
            at the moment, please come back later.
          </p>
        </div>
      )}
      {loadin && <Loading stylings="min-h-[50vh]" />}
    </div>
  );
};

export default MatchesComponent;
