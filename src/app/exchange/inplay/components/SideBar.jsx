"use client";
import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box, Loader } from "@mantine/core";
import axios from "axios";
import { ScrollArea } from '@mantine/core';
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import Link from "next/link";


import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import games from "../../constants";


const fetcheSportCompetitions = async (eventTypeId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competitions/${eventTypeId}`
    );
    if (res && res.data && res.data.length > 0) {
      return res.data
    }
  } catch (error) {
    console.error(error)
  }
}



export const fetchSportCompetitionEvents = async (sportId, competitionId) => {
  try {
    if (sportId && competitionId) {
      const queryParams = new URLSearchParams({
        sportId,
        competitionId
      }).toString();

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competition_events?${queryParams}`;

      console.log("shipping ---------", url); // For debugging

      const res = await axios.get(url);

      if (res && res.data && res.data.length > 0) {
        // console.log("got somethings--------", res.data);
        return res.data;
      }
    }
  } catch (error) {
    console.error(error);
  }
};





export default function Sidebar({ setSelectedLink, activeLink }) {
  const { setCurrentCompetition, setCurCompObj, currentCompetition } = useContext(CompetitionContext)

  const handleLinkClick = (link) => {
    setSelectedLink(link);

  };

  const [opened, setOpened] = useState(true);
  const [competitions, setCompetitions] = useState([])
  const [loadin, setLoadin] = useState(false)
  const [events, setEvents] = useState([])
  const [active, setActive] = useState("")


  useEffect(() => {
    if (active != "") {
      // fetch competitions
      (async () => {
        setLoadin(true)
        const competitions = await fetcheSportCompetitions(active)
        if (competitions && competitions.length > 0) {
          setCompetitions(competitions)
          setLoadin(false)
        } else {
          setCompetitions([])
        }
      })()
    }
  }, [active])



  const onClick = () => {
    setOpened(prev => !prev)
  }

  useEffect(() => {
    fetcheEvents()
    // fetcher()
  }, [])

  const fetcher = async () => {
    try {
      setLoadin(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/cricket/competitions`
      );
      if (res && res.data) {
        const competitions__ = res.data.data.competitions
        if (competitions__.length > 0) {
          setCompetitions(competitions__)
          setLoadin(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetcheEvents = async () => {
    try {
      setLoadin(true)
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sports`
      );
      if (res && res.data && res.data.length > 0) {
        setEvents(res.data)
        setLoadin(false);
      }
    } catch (error) {
      console.log(error)
      setLoadin(false)

    }
  }

  const getIcon = (name, id) => {
    if (name) {
      const saveEventIcon = games.filter(game => {
        if (game.name === name) {
          return {
            status: true,
            icon: game.icon
          }
        }
      })
      if (saveEventIcon.status) {
        return saveEventIcon
      } else {
        return {
          status: false,
          icon: null
        }
      }
    }
  }


  return (
    <div className="absolute  justify-between w-full bg-[#031123] sticky top-1 left-0 bottom-0 rounded shadow-lg">
      <div className="flex w-full justify-center items-center text-center py-2 mt-4">
        <Link href="/" passHref>
          <p className="text-3xl md:text-1xl font-bold">
            <span className="text-white">Aura-</span>
            <span className="text-orange-800 rounded p-1 bg-white">
              Bet
            </span>
          </p>
        </Link>
      </div>
      <div className="mt-5 flex flex-col items-center font-semibold text-white gap-x-4 overflow-x-auto">
        {
          events.length > 0 ? (
            events.map((game, index) => {
              if (game.eventTypeId === active) {
                const icon = getIcon(game.name)
                return (
                  <div key={index} className="flex flex-col w-full">
                    <Box mx="auto" className={`w-full`}>
                      <Group position="start" mb={5} onClick={onClick} className="">
                        <div
                          onClick={() => {
                            setActive("")
                            setCompetitions([])
                            handleLinkClick(game.eventTypeId)
                            setCurCompObj({
                              sportName: "",
                              compObj: {}
                            })
                          }}
                          className={`flex justify-between items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "bg-green-600/[0.7] text-white p-1" : ""
                            }`}
                        >
                          <div className="mr-1 flex items-center gap-x-2">
                            {icon.status && icon.icon}
                            <p
                              className={`text-[1rem] tracking-wide truncate  ${""}`}
                            // activeLink === game.id ? "text-white py-1" : ""
                            >
                              {game.name}
                            </p>
                          </div>
                          <ArrowDropDownTwoToneIcon fontSize="small" color="white" />
                        </div>
                      </Group>

                      <Collapse in={true} className="text-white">
                        <ScrollArea
                          h={
                            competitions.length === 0 ? 800 : 800
                          }
                          type="scroll" className=" rounded"
                        >

                          <div className="flex flex-col justify-center ml-1 mt-1 h-full">
                            {
                              !loadin && (
                                <p
                                  className={`text-[0.8rem] cursor-pointer px-2 py-1 tracking-wide font-bold border-b border-gray-600 text-white hover:bg-gray-400 ${currentCompetition === "All" && "bg-gray-400"}`}
                                  onClick={() => setCurrentCompetition("All")}
                                >
                                  Popular
                                </p>
                              )
                            }
                            {
                              loadin ?

                                <div className="flex min-h-[70vh] justify-center items-center">
                                  < Loader color="white" className="mt-20" />
                                </div>

                                :
                                competitions.length > 0 && competitions.map((competition_, index) => {

                                  return (
                                    <p
                                      key={index}
                                      className={`text-[0.8rem] cursor-pointer truncate flex w-full px-2 py-1 tracking-wide font-bold border-b border-gray-600 text-white hover:bg-gray-400 ${currentCompetition === competition_.competition.id && "bg-gray-400"}`}
                                      onClick={() => {
                                        setCurrentCompetition(competition_.competition.id)
                                        console.log("to seet -------", competition_)
                                        setCurCompObj({
                                          sportName: game.name,
                                          compObj: competition_
                                        })

                                      }
                                      }
                                    >
                                      {competition_.competition.name}
                                    </p>
                                  )
                                })
                            }

                          </div>

                        </ScrollArea>
                      </Collapse>
                    </Box>

                  </div>
                )
              } else if (active === "") {
                return (
                  <div
                    key={index}
                    onClick={() => setActive(game.eventTypeId)}
                    className={`flex justify-between border-b border-gray-600 items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "text-white bg-green-600/[0.7] p-1" : ""
                      }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-1">
                        {getIcon(game.name).icon}
                      </div>
                      <p
                        className={`text-[1rem] tracking-wide ${activeLink === game.eventTypeId ? "text-white  py-1" : "text-gray-300"
                          }`}
                      >
                        {game.name}
                      </p>
                    </div>
                    <ArrowDropDownTwoToneIcon fontSize="small" color="white" />
                  </div>
                )
              }
            })
          ) : (
            <div className="flex min-h-[80vh] justify-center items-center">
              < Loader color="white" className="mt-20" />
            </div>
          )
        }
      </div>



    </div>
  );
}





