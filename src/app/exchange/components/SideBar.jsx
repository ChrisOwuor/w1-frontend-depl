"use client";
import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box, Loader, ScrollArea } from "@mantine/core";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { getIcon, startsWithStr } from "../utils/utils";
import { useSearchParams } from 'next/navigation'
import { getEvents, getSeries } from "src/app/api/exchange";
import { NAVContext } from "@/app/context/NavContext";



export default function Sidebar({ setSelectedLink, activeLink }) {
  const { setCurrentCompetition, setCurCompObj } = useContext(CompetitionContext)
  const { setCurrentCenter, view, setView } = useContext(NAVContext)
  const searchParams = useSearchParams()

  const sp = searchParams.get("sp")
  const [competitions, setCompetitions] = useState([])
  const [loadin, setLoadin] = useState(false)
  const [events, setEvents] = useState([])
  const [active, setActive] = useState(sp)
  const [fetched, setFetched] = useState(false)
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  useEffect(() => {
    if (active != null) {
      if (startsWithStr(active)) {
        setCompetitions([])
        setFetched(true)
        setLoadin(false)
        return
      }
      (async () => {
        setLoadin(true)
        const competitions = await getSeries(active)
        if (competitions && competitions.length > 0) {
          setCompetitions(competitions)
          setFetched(true)
          setLoadin(false)
        } else {
          setCompetitions([])
          setFetched(true)
          setLoadin(false)
        }
      })()
    }
  }, [active])



  const fetcheEvents = async () => {
    try {
      setLoadin(true)
      const eventTypes = await getEvents()
      if (eventTypes) {
        setEvents(eventTypes)
        setLoadin(false);
      }
    } catch (error) {
      console.log(error)
      setLoadin(false)

    }
  }

  useEffect(() => {
    fetcheEvents()
  }, [])
  useEffect(() => {
    if (competitions.length > 0) {
      setCurrentCompetition(competitions[0].series_id)
    }
  }, [competitions])

  return (
    <div className="w-full text-black rounded z-999">
      <div className="flex items-center p-2 rounded-t bg-primary justify-between">
        <p className="text-sm font-semibold text-white"></p>
        <p className="text-sm font-semibold text-white">Sports</p>
      </div>
      <div className="flex flex-col items-center font-semibold text-black gap-x-4 ">
        {
          events.length > 0 ? (
            events.map((game, index) => {
              if (game.sport_id === view.sportId) {
                const icon = getIcon(game.sport_name)
                return (
                  <Box mx="auto" className={`flex flex-col w-full pb-10 `} key={index}>
                    <Group position="start" mb={5} className="">
                      <div
                        // href={`?mechi=all`}
                        onClick={() => {
                          setActive("")
                          setCompetitions([])
                          handleLinkClick(game.sport_id)
                          setCurrentCenter("home")
                          setView({
                            currentView: "home",
                            from: "/",
                            sportName: "",
                            sportId: "",
                            competitionName: "",
                            competitionId: "",
                            eventName: "",
                            eventId: "",
                            showCompetition: false,
                          })
                          setCurCompObj({
                            sportName: "",
                            compObj: {}
                          })
                        }}
                        className={`flex justify-between items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "bg-green-600/[0.7] text-white" : ""}`}
                      >
                        <div className="mr-1 flex items-center gap-x-2">
                          {
                            icon && icon != null && (
                              <img className="h-[1.4rem] w-[1.4rem]" src={icon.url} alt="cricket-ball--v1" />
                            )
                          }
                          <p
                            onClick={() => {
                              // router.push(`?sp=${game.sport_id}`)
                              setCurCompObj({
                                sportName: game.sport_name,
                                compObj: {}
                              })
                            }}
                            className={`text-[1rem] tracking-wide truncate`}
                          >
                            {game.sport_name === "Football" ? "Soccer" : game.sport_name}
                          </p>
                        </div>
                        <ArrowDropUpRoundedIcon fontSize="medium" className="text-orange-400" />
                      </div>
                    </Group>

                    <Collapse in={true} className="text-white ">
                      <ScrollArea.Autosize offsetScrollbars scrollbarSize={10} className="h-[90vh]">
                        <div className="flex flex-col justify-center">
                          {
                            loadin ?
                              <div className="flex min-h-[70vh] justify-center items-center">
                                < Loader className="text-orange-400 mt-20" />
                              </div>
                              :
                              competitions.length > 0 ? competitions.map((competition_, index) => {
                                return (
                                  <p
                                    key={index}
                                    className={`text-sm cursor-pointer truncate flex w-full px-2 py-1 tracking-wide font-medium border-b border-secondary/[0.2] text-black hover:bg-orange-400/[0.1] ${competition_.series_id == view.competitionId && "bg-orange-400/[0.2]"}`}
                                    onClick={() => {
                                      setCurrentCenter("events")
                                      setView(prevView => ({
                                        ...prevView,
                                        competitionId: competition_.series_id,
                                        competitionName: competition_.series_name,
                                        eventName: "",
                                        eventId: "",
                                        currentView: "competition_selection"
                                      }))

                                      setCurrentCompetition(competition_.series_id)

                                    }}
                                  >
                                    {competition_.series_name}
                                  </p>
                                )
                              }) : (
                                !loadin && fetched && competitions.length == 0 && (
                                  <p className={`${loadin && "hidden"} text-[0.8rem] text-white`}>
                                    No competitions for now
                                  </p>
                                )
                              )
                          }
                        </div>
                      </ScrollArea.Autosize>
                    </Collapse>
                  </Box>
                )
              }
            })
          ) : (
            <div className="flex min-h-[80vh] justify-center items-center">
              < Loader className="text-orange-400 mt-20" />
            </div>
          )
        }
      </div>


      {/* HOME */}
      {
        view && !view.showCompetition && (
          <ScrollArea.Autosize offsetScrollbars scrollbarSize={10} className="h-[90vh]">
            <div className="flex flex-col items-center font-semibold text-white gap-x-4 overflow-x-auto">
              {
                events.length > 0 ? (
                  events.map((game, index) => {
                    // if (active === null || mechi == "all" || inp == "on") {

                    // }
                    const icon_ = getIcon(game.sport_name)
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setView({
                            sportName: game.sport_name === "Football" ? "Soccer" : game.sport_name,
                            sportId: game.sport_id,
                            currentView: "eventType_selection",
                            showCompetition: true
                          })
                          setActive(game.sport_id)
                        }}
                        className={`flex justify-between border-b border-secondary/[0.2] items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "text-white bg-green-600/[0.7]" : ""
                          }`}
                      >
                        <div className="flex items-center">
                          {/* <div className="mr-1">
                            {
                              icon_ && icon_ != null && (
                                <img className="h-[1.4rem] w-[1.4rem]" src={icon_.url} alt="cricket-ball--v1" />
                              )
                            }
                          </div> */}
                          <p
                            onClick={() => {
                              setCurCompObj({
                                sportName: game.sport_name,
                                compObj: {}
                              })
                            }}
                            className={`text-sm tracking-wide ${activeLink === game.sport_id ? "text-black  py-1" : "text-black"
                              }`}
                          >
                            {game.sport_name === "Football" ? "Soccer" : game.sport_name}
                          </p>
                        </div>
                        <ArrowDropDownRoundedIcon fontSize="medium" className="text-secondary" />
                      </div>
                    )
                  })
                ) : (
                  <div className="flex min-h-[80vh] justify-center items-center">
                    < Loader className="text-orange-400 mt-20" />
                  </div>
                )

              }
            </div>
          </ScrollArea.Autosize>
        )
      }

    </div>
  );
}