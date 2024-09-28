import React, { useContext, useEffect, useState } from 'react';
import CompetionCollapse from './CompetionCollapse';
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import { getEvents, getInplayMatches } from 'src/app/api/exchange';
import Loading from 'src/app/exchange/components/Loading';

const InPlay = () => {
  const { currentCompetition } = useContext(CompetitionContext);
  const [opened, setOpened] = useState(true);
  const [activeComp, setActiveComp] = useState("All");
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [events, setEvents] = useState([]);
  const [allMatches, setAllMatches] = useState({});
  const [loadingMatches, setLoadingMatches] = useState({});
  const [currentSportIndex, setCurrentSportIndex] = useState(0);
  const [flicker, setFlicker] = useState(true);

  // Flicker effect for the UI
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFlicker(prev => !prev);
    }, 1000); 

    return () => clearInterval(intervalId); 
  }, []);

  // Fetch the events (sports) once the component mounts
  const fetchEvents = async () => {
    try {
      const eventTypes = await getEvents();
      if (eventTypes) {
        setEvents(eventTypes);
        setLoadingStatus(false); // Stop loading once events are fetched
      }
    } catch (error) {
      console.log(error);
      setLoadingStatus(false);
    }
  };

  // Fetch matches for the current sport and display them
  const fetchMatchesForCurrentSport = async (index) => {
    try {
      if (index < events.length) {
        const sportName = events[index].sport_name === "Football" ? "Soccer" : events[index].sport_name;
        const sportId = events[index].sport_id;
        setLoadingMatches((prev) => ({ ...prev, [sportName]: true }));

        const matches = await getInplayMatches(sportName, sportId, 1, 200);
        
        setLoadingMatches((prev) => ({ ...prev, [sportName]: false }));
        setAllMatches((prev) => ({ ...prev, [sportName]: matches.matches || [] }));

        // Move to the next sport after fetching the current one
        setCurrentSportIndex((prevIndex) => prevIndex + 1);
      }
    } catch (error) {
      console.log(error);
      setLoadingMatches((prev) => ({ ...prev, [events[index].sport_name]: false }));
    }
  };

  // Fetch matches one by one
  useEffect(() => {
    if (events.length > 0 && currentSportIndex < events.length) {
      fetchMatchesForCurrentSport(currentSportIndex);
    }
  }, [events, currentSportIndex]);

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const onClick = () => {
    setOpened((prev) => !prev);
  };

  // Update active competition when it changes
  useEffect(() => {
    if (activeComp !== "") {
      setActiveComp(currentCompetition);
    }
  }, [currentCompetition]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center my-2">
        <div className=" grid grid-cols-3 sm:min-w-[500px]">
          <p className={`col-span-1 py-1 border text-center px-4 rounded-l text-md font-bold text-white bg-black`}>In-Play</p>
          <p className={`col-span-1 py-1 border text-center px-4 text-md font-bold text-black bg-gray`}>Today</p>
          <p className={`col-span-1 py-1 border text-center px-4 rounded-r text-md font-bold text-black bg-gray`}>Tomorrow</p>
        </div>
      </div>

      {/* Show loading indicator while fetching events */}
      {loadingStatus && (
        <div className="flex justify-center items-center shadow-lg shadow-yellow-100/[0.1]">
          <Loading stylings={"min-h-[60vh]"} />
        </div>
      )}

      {/* Once events are loaded, display sport-wise matches as soon as they are fetched */}
      {!loadingStatus && events.length > 0 && (
        <>
          {events.map((event, index) => {
            const sportName = event.sport_name === "Football" ? "Soccer" : event.sport_name;

            return (
              <div key={sportName}>
                {/* Show loading indicator for the individual sport */}
                {loadingMatches[sportName] ? (
                  <div className="flex justify-center items-center shadow-lg shadow-yellow-100/[0.1]">
                    <Loading stylings={"min-h-[20vh]"} />
                  </div>
                ) : (
                  <CompetionCollapse
                    onClick={onClick}
                    flicker={flicker}
                    matches={allMatches[sportName] || []}
                    competitionTitle={sportName}
                    sportName={sportName}
                    eventTypeId={event.sport_id}
                    opened={opened}
                  />
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Handle the case when no matches are found */}
      {empty && !loadingStatus && (
        <div className="flex items-center py-4 mx-1 shadow-lg shadow-yellow-100/[0.1]">
          <p className="font-medium tracking-wide text-[0.8rem] text-black">
            There are no live matches available.
          </p>
        </div>
      )}
    </div>
  );
};

export default InPlay;
