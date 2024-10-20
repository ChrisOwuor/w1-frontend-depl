import React, { useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DisplayTime, formatTime } from "@/app/api/exchange";

const SoccerScores = ({ incidents, scores }) => {
  const [currentCollpsed, setCurrentCollaped] = useState("Incidents");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      {scores && (
        <Box
          mx="auto"
          className={`flex w-full flex-col bg-green-600/[0.5] my-2 `}
        >
          <Group position="start" mb={5} onClick={onClick} className="p-1">
            <div className=" grid grid-cols-12 w-full gap-x-1 mt-2">
              {/* <div className="col-span-5 max-mk:col-span-3 flex flex-col justify-center items-center text-center gap-y-2">
                {scores.home.homeTeam && scores.event.homeTeam.country ? (
                  <div className="relative">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${
                        scores.event.homeTeam && scores.event.homeTeam.id
                      }/image`}
                      alt={`kk`}
                      className="h-[40px] w-[40px]"
                    />
                  </div>
                ) : (
                  <img
                    src="https://l.ivesoccer.sx/teams/default.png"
                    alt="team-flag"
                    className="w-[35px] h-[35px]"
                  />
                )}

                <p className="max-mk:text-[0.745rem] mk:text-[1rem] font-bold tracking-wider text-gray-50">
                  {scores.event.homeTeam &&
                    `${scores.event.homeTeam.shortName}`}
                </p>
              </div> */}
              <div className="col-span-2 max-mk:col-span-6 grid grid-cols-2 text-center  rounded">
                <div className="col-span-2 flex justify-center items-center">
                  <p className="text-[1.5rem] font-bold tracking-wider text-orange-500">
                    {scores.score &&
                      `${scores.score.home.score}`}
                  </p>
                  <p className="text-[1rem] mx-2 font-bold tracking-wider text-orange-500">
                    -
                  </p>
                  <p className="text-[1.5rem] font-bold tracking-wider text-orange-500">
                    {scores.score &&
                      `${scores.score.away.score}`}
                  </p>
                </div>
              </div>
              <div className="col-span-5 max-mk:col-span-3 flex flex-col justify-center items-center text-center gap-y-2">
                {scores.event.awayTeam && scores.event.awayTeam.country ? (
                  <div className="relative">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${
                        scores.event.awayTeam && scores.event.awayTeam.id
                      }/image`}
                      alt={`kk`}
                      className="h-[40px] w-[40px]"
                    />
                    {/* <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${scores.event.awayTeam.country.alpha2 || "US"}.svg`} alt={`${scores.event.awayTeam.country.alpha2}`} className='h-[40px] w-[40px]' /> */}
                  </div>
                ) : (
                  <img
                    src="https://l.ivesoccer.sx/teams/default.png"
                    alt="team-flag"
                    className="w-[35px] h-[35px]"
                  />
                )}
                <p className="max-mk:text-[0.745rem] mk:text-[1rem] font-bold tracking-wider text-gray-50">
                  {scores.event.awayTeam &&
                    `${scores.event.awayTeam.shortName}`}
                </p>
              </div>
              <div className="col-span-12 grid grid-cols-12 justify-center items-center">
                <div className="col-span-12 flex justify-center items-center m-1">
                  <p className="text-[0.8rem] font-bold tracking-wider text-gray-400">
                    {scores.event.time &&
                      scores.event.startTimestamp &&
                      formatTime(scores.event.startTimestamp)}
                  </p>
                </div>
                <div className="col-span-12 flex justify-center items-center">
                  <p className="text-[0.8rem] font-bold tracking-wider text-gray-300">
                    {scores.event.status && scores.event.status.description}
                  </p>
                </div>
                <div className="col-span-12 flex justify-center items-center">
                  {open ? (
                    <ArrowDropUpIcon fontSize="small" className="" />
                  ) : (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                </div>
              </div>
            </div>
          </Group>

          <Collapse
            in={open}
            className="col-span-12 text-white p-1 bg-gray-900/[0.5]"
          >
            <div className="flex items-center bg-orange-400/[0.6] px-1 py-2">
              <p
                className={`${
                  currentCollpsed === "Incidents" && "bg-gray-800"
                } text-[0.75rem] text-gray-100 bg-gray-600 p-1`}
                onClick={() => setCurrentCollaped("Incidents")}
              >
                Incidents
              </p>
              <p
                className={`${
                  currentCollpsed === "Statistics" && "bg-gray-800"
                } text-[0.75rem] text-gray-100 bg-gray-600 p-1`}
                onClick={() => setCurrentCollaped("Statistics")}
              >
                Statistics
              </p>
            </div>

            {incidents &&
              incidents.incidents &&
              currentCollpsed === "Incidents" && (
                <div className="grid grid-cols-12 w-full gap-x-1">
                  {incidents.incidents.map((incident, i) => {
                    const inc = incident;
                    if (inc.incidentClass == "regular") {
                      if (inc.incidentType == "substitution") {
                        return (
                          <div className="col-span-12">
                            {inc.isHome ? (
                              <div
                                className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-2 flex bg-green-500 gap-x-2 items-center px-1">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    SUB
                                  </p>
                                </div>
                                <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      <span className="text-green-500">
                                        In:{" "}
                                      </span>
                                      {inc.playerIn.name}
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      <span className="text-orange-500">
                                        Out:{" "}
                                      </span>
                                      {inc.playerOut.name}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-10  px-1 flex gap-x-4 items-start gap-x-2">
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      <span className="text-green-500">
                                        In:{" "}
                                      </span>
                                      {inc.playerIn.name}
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      <span className="text-orange-500">
                                        Out:{" "}
                                      </span>
                                      {inc.playerOut.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    SUB
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      } else if (inc.incidentType == "goal") {
                        return (
                          <div className="col-span-12">
                            {inc.isHome ? (
                              <div
                                className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-2 flex bg-green-500 gap-x-2 items-center px-1">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    Goal
                                  </p>
                                </div>
                                <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                  <p className="text-gray-100 text-[0.85rem] font-bold ">
                                    {inc.player && inc.player.name}
                                  </p>
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.homeScore && inc.homeScore}
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1">
                                      -
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.awayScore && inc.awayScore}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-10  px-1 flex gap-x-4 items-center justify-end gap-x-2">
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.homeScore && inc.homeScore}
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1">
                                      -
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.awayScore && inc.awayScore}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 border-l bg-green-500 border-gray-400/[0.5] flex px-1 gap-x-2 items-start gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    Goal
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                    } else if (inc.incidentClass == "yellow") {
                      if (inc.incidentType == "card") {
                        return (
                          <div className="col-span-12">
                            {inc.isHome ? (
                              <div
                                className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-2 flex bg-green-500 gap-x-2 px-1 items-center">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    <img
                                      src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png"
                                      alt="cards"
                                      className="h-[15px] w-[15px]"
                                    />
                                  </p>
                                </div>
                                <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                    {inc.player && inc.player.name}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-10  px-1 flex gap-x-4 items-center justify-end gap-x-2">
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.player && inc.player.name}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 border-l bg-green-500 border-gray-400/[0.5] flex px-1 gap-x-2 items-start gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    Goal
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                    } else if (inc.incidentClass == "penalty") {
                      if (inc.incidentType == "goal") {
                        return (
                          <div className="col-span-12">
                            {inc.isHome ? (
                              <div
                                className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-2 flex bg-green-500 gap-x-2 px-1 items-center">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    P
                                  </p>
                                </div>
                                <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-center gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                    {inc.player && inc.player.name}
                                  </p>
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.homeScore && inc.homeScore}
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1">
                                      -
                                    </p>
                                    <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.awayScore && inc.awayScore}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1"
                                key={i}
                              >
                                <div className="col-span-10 px-1 flex gap-x-4 justify-end items-center gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                    {inc.player && inc.player.name}
                                  </p>
                                  <div className="flex justify-center items-start gap-x-2">
                                    <p className="text-orange-500 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.homeScore && inc.homeScore}
                                    </p>
                                    <p className="text-orange-500 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1">
                                      -
                                    </p>
                                    <p className="text-orange-500 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold ">
                                      {inc.awayScore && inc.awayScore}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-span-2 border-l bg-green-500 border-gray-400/[0.5] flex px-1 gap-x-2 items-start gap-x-2">
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    {inc.time}"
                                  </p>
                                  <p className="text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold">
                                    P
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                    } else if (inc.incidentClass == "injury") {
                      if (inc.incidentType == "substitution") {
                        return (
                          <div
                            className="col-span-12 grid grid-cols-12 border-b border-gray-400/[0.5] py-"
                            key={i}
                          >
                            <div className="col-span-2 flex items-center px-1">
                              <p className="text-gray-100 text-[0.85rem] font-bold">
                                {inc.time}"
                              </p>
                              <p className="text-gray-100 text-[0.85rem] font-bold">
                                <img
                                  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png"
                                  alt="cards"
                                  className="h-[20px] w-[20px]"
                                />
                              </p>
                            </div>
                            <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                              <p className="text-gray-100 text-[0.85rem] font-bold ">
                                <span className="text-green-500">In: </span>
                                {inc.playerIn && inc.playerIn.name}
                              </p>
                              <p className="text-gray-100 text-[0.85rem] font-bold ">
                                <span className="text-green-500">Out: </span>
                                {inc.playerOut && inc.playerOut.name}
                              </p>
                            </div>
                          </div>
                        );
                      }
                    }
                  })}
                </div>
              )}

            {/* {
                            incidents && incidents.incidents && currentCollpsed === "Statistics" && (
                                <div className="grid grid-cols-12 w-full gap-x-1">
                                    {
                                        incidents.incidents.map((incident, i) => {
                                            const inc = incident
                                            if (inc.incidentClass == "regular") {
                                                if (inc.incidentType == "substitution") {
                                                    return (
                                                        <div className="col-span-12">
                                                            {
                                                                inc.isHome ? (
                                                                    <div className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1" key={i}>
                                                                        <div className="col-span-2 flex bg-green-500 gap-x-2 items-center px-1">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>SUB</p>
                                                                        </div>
                                                                        <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                                                            <div className="flex justify-center items-start gap-x-2">
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '><span className='text-green-500'>In: </span>{inc.playerIn.name}</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '><span className='text-orange-500'>Out: </span>{inc.playerOut.name}</p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    <div className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1" key={i}>

                                                                        <div className="col-span-10  px-1 flex gap-x-4 items-start gap-x-2">
                                                                            <div className="flex justify-center items-start gap-x-2">
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '><span className='text-green-500'>In: </span>{inc.playerIn.name}</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '><span className='text-orange-500'>Out: </span>{inc.playerOut.name}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-2 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>SUB</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>

                                                    )
                                                } else if (inc.incidentType == "goal") {
                                                    return (
                                                        <div className="col-span-12">
                                                            {
                                                                inc.isHome ? (
                                                                    <div className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1" key={i}>
                                                                        <div className="col-span-2 flex bg-green-500 gap-x-2 items-center px-1">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>SUB</p>
                                                                        </div>
                                                                        <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                                                            <p className='text-gray-100 text-[0.85rem] font-bold '>
                                                                                {inc.player && inc.player.name}
                                                                            </p>
                                                                            <div className="flex justify-center items-start gap-x-2">
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.homeScore && inc.homeScore}</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1'>-</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.awayScore && inc.awayScore}</p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    <div className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1" key={i}>
                                                                        <div className="col-span-10  px-1 flex gap-x-4 items-center justify-end gap-x-2">
                                                                            <div className="flex justify-center items-start gap-x-2">
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.homeScore && inc.homeScore}</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold mx-1'>-</p>
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.awayScore && inc.awayScore}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-2 border-l bg-green-500 border-gray-400/[0.5] flex px-1 gap-x-2 items-start gap-x-2">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold'>Goal</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            } else if (inc.incidentClass == "yellow") {
                                                if (inc.incidentType == "card") {
                                                    return (
                                                        <div className="col-span-12">
                                                            {
                                                                inc.isHome ? (
                                                                    <div className="grid grid-cols-12 border-b  border-gray-400/[0.5] py-1" key={i}>
                                                                        <div className="col-span-2 flex bg-green-500 gap-x-2 px-1 items-center">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold'>
                                                                                <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="cards" className='h-[15px] w-[15px]' />
                                                                            </p>
                                                                        </div>
                                                                        <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.player && inc.player.name}</p>
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    <div className="grid grid-cols-12 border-b border-gray-400/[0.5] py-1" key={i}>
                                                                        <div className="col-span-10  px-1 flex gap-x-4 items-center justify-end gap-x-2">
                                                                            <div className="flex justify-center items-start gap-x-2">
                                                                                <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem] font-bold '>{inc.player && inc.player.name}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-2 border-l bg-green-500 border-gray-400/[0.5] flex px-1 gap-x-2 items-start gap-x-2">
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold'>{inc.time}"</p>
                                                                            <p className='text-gray-100 max-mk:text-[0.74rem] min-mk:text-[0.75rem]  font-bold'>Goal</p>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                            }
                                            else if (inc.incidentClass == "injury") {
                                                if (inc.incidentType == "substitution") {
                                                    return (
                                                        <div className="col-span-12 grid grid-cols-12 border-b border-gray-400/[0.5] py-" key={i}>
                                                            <div className="col-span-2 flex items-center px-1">
                                                                <p className='text-gray-100 text-[0.85rem] font-bold'>{inc.time}"</p>
                                                                <p className='text-gray-100 text-[0.85rem] font-bold'>
                                                                    <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="cards" className='h-[20px] w-[20px]' />
                                                                </p>
                                                            </div>
                                                            <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start gap-x-2">
                                                                <p className='text-gray-100 text-[0.85rem] font-bold '><span className='text-green-500'>In: </span>{inc.playerIn && inc.playerIn.name}</p>
                                                                <p className='text-gray-100 text-[0.85rem] font-bold '><span className='text-green-500'>Out: </span>{inc.playerOut && inc.playerOut.name}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                        })
                                    }
                                </div>
                            )
                        } */}
          </Collapse>
        </Box>
      )}
    </>
  );
};

export default SoccerScores;

// <div className='col-span-2 text-center flex items-center gap-x-2 justify-end'>
// <div className="flex items-center gap-x-1">
//     <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'>
//         <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' />
//         {/* {scores.score.home.numberOfYellowCards} */}
//     </p>
// </div>
// <div className="flex items-center gap-x-1">
//     {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' /> {scores.score.home.numberOfRedCards}</p> */}
// </div>
// <div className="flex items-center gap-x-1">
//     {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-400'>T{scores.score.home.numberOfCards}</p> */}
// </div>

// </div>
// <div className='col-span-1 flex justify-center items-center'>
// <p className='text-[0.8rem] font-bold tracking-wider text-gray-400'>Cards</p>
// </div>
// <div className='col-span-2 text-center flex items-center gap-x-2 justify-start'>
// <div className="flex items-center gap-x-1">
//     <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'>
//         <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' />
//         {/* {scores.score.away.numberOfYellowCards} */}
//     </p>
// </div>
// <div className="flex items-center gap-x-1">
//     {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="cards" className='h-[20px] w-[20px]' /> {scores.score.away.numberOfRedCards}</p> */}
// </div>
// <div className="flex items-center gap-x-1">

// </div>
// </div>
