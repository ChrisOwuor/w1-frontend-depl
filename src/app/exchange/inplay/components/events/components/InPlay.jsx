import React, { useEffect, useState } from 'react';
import CompetionCollapse from "../../../../components/CompetionCollapse";
import axios from "axios";
import { fetchCompetitions, fetchMKTBK } from 'src/app/api/exchange';
import { INTERVAL } from 'src/app/exchange/constants/mktfetchInterval';
import { allowedMarketNames } from 'src/app/exchange/constants/fallbackMarkets';

const InPlay = () => {
  const [opened, setOpened] = useState(true);
  const [cricketEvents, setCricketEvents] = useState([]);
  const [competitions, setCompetitions] = useState([]);
  const [marketsBook, setMarketsBook] = useState([])
  const [mktIds, setMktIds] = useState([])

  const fetchMarketBook = async (marketIds) => {
    try {
      const data = await fetchMKTBK(marketIds)
      if (data && data.length > 0) {
        setMarketsBook(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  const fetcher = async () => {
    try {
     const competitions_ =  await fetchCompetitions()
      if (competitions_ && competitions_.length>0) {
        setCompetitions(competitions_);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (cricketEvents) {
      let marketIds = []
      for (const event of cricketEvents) {
        event.markets.map(item => {
          if (allowedMarketNames.includes(item.marketName)) {
            marketIds.push(item.marketId)
            return
          }
        })
      }
      if (marketIds.length > 0) {
        setMktIds(marketIds)
      }
    }
  }, [cricketEvents])

  useEffect(() => {
    if (mktIds.length > 0) {
      const intervalId = setInterval(fetchMarketBook(mktIds), INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [mktIds])

  const Eventsfetcher = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/all_events`
      );
      if (res && res.data) {
        setCricketEvents(res.data.length > 0 ? res.data : []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filterById = (id) => {
    return cricketEvents.filter((event_) => {
      if (event_.competition_id === id) {
        return event_
      }
    }) || [];
  };

  useEffect(() => {
    fetcher()

    const fetchData = async () => {
      try {
        await Eventsfetcher();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, []);



  const onClick = () => {
    setOpened((prev) => !prev);
  };


  return (
    <div className="flex flex-col mb-40">
      {competitions.map((competition, i) => {
        const events = filterById(`${competition.competition.id}`);


        if (i === 0) {
          return (
            <div key={i}>
              {events.length > 0 && (
                <div className="">
                  <CompetionCollapse
                    onClick={onClick}
                    events={events}
                    marketsBook={marketsBook}
                    competitionTitle={competition.competition.name}
                    opened={opened}
                  />
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

export default InPlay;
