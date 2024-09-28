"use client";
import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box, Loader, ScrollArea, Button } from "@mantine/core";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { getIcon, startsWithStr } from "../utils/utils";
import { getEvents, getSeries } from "src/app/api/exchange";
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { NAVContext } from "@/app/context/NavContext";


export default function MobileSideBar({ setSelectedLink, activeLink, toggleSideBar }) {
  const { setCurrentCompetition, setCurCompObj } = useContext(CompetitionContext)
  const { setCurrentCenter, view, setView } = useContext(NAVContext)
  const [competitions, setCompetitions] = useState([])
  const [loadin, setLoadin] = useState(false)
  const [events, setEvents] = useState([])
  const [active, setActive] = useState(view.sportId)
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
        if (active) {
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
        }
      })()
    }
  }, [active])

  useEffect(() => {
    fetcheEvents()
  }, [])

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

  return (
    <ScrollArea.Autosize mih={1} offsetScrollbars type="scroll" scrollbarSize={10}  className="min-w-[100%] w-full">
      <div className="w-full flex flex-col justify-between">
        <div className="grid grid-cols-12">
          <div className="col-span-12 bg-white z-9999">

            <div className="flex w-full justify-center items-center text-center my-4">
              <ArrowCircleLeftRoundedIcon fontSize="large" onClick={() => toggleSideBar()} className="font-bold text-primary" />
            </div>
            <div className="flex flex-col items-center font-semibold text-primary pb-40">
              {
                events.length > 0 ? (
                  events.map((game, index) => {
                    if (game.sport_id == view.sportId) {
                      const icon = getIcon(game.sport_name)
                      return (
                        <Box mx="auto" className={`flex flex-col w-full h-full`} key={index}>
                          <Group position="start" mb={5} className="">
                            <div

                              onClick={() => {
                                setActive("")
                                setCompetitions([])
                                handleLinkClick(game.sport_id)
                                setCurrentCenter("home")
                                setView({
                                  currentView: "",
                                  from: "/",
                                  sportName: "",
                                  sportId: "",
                                  competitionName: "",
                                  competitionId: "",
                                  eventName: "",
                                  eventId: "",
                                  showCompetition: true
                                })
                                setCurCompObj({
                                  sportName: "",
                                  compObj: {}
                                })
                              }}
                              className={`flex justify-between items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "bg-green-600/[0.7] text-white" : ""}`}
                            >
                              <div className=" flex items-center gap-x-2">
                                {
                                  icon && icon != null && (
                                    <img className="h-8 w-8" src={icon.url} alt="cricket-ball--v1" />
                                  )
                                }
                                <p
                                  onClick={() => {
                                    // router.push(`?sp=${game.sport_id}`)
                                    setView(prev => ({
                                      ...prev,
                                      currentView: ""
                                    }))
                                    setCurCompObj({
                                      sportName: game.sport_name,
                                      compObj: {}
                                    })
                                  }}
                                  className={`text-lg font-bold  tracking-wide truncate`}
                                >
                                  {game.sport_name === "Football" ? "Soccer" : game.sport_name}
                                </p>
                              </div>
                              <ArrowDropUpRoundedIcon fontSize="large" className="text-orange-400" />
                            </div>
                          </Group>

                          <Collapse in={true} className="text-white">
                            <ScrollArea.Autosize mih={1} offsetScrollbars type="scroll" scrollbarSize={10} className="h-[70vh] ">
                              {/* <div className="flex flex-col justify-center ml-1 mt-1"> */}
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
                                        className={`text-md font-bold cursor-pointer truncate flex w-full px-2 py-1 tracking-wide font-bold border-b border-primary/[0.1] text-primary hover:bg-gray-400 ${competition_.series_id == view.competitionId && "bg-orange-500/[0.1]"}`}
                                        onClick={() => {
                                          toggleSideBar()
                                          setCurrentCenter("events")
                                          setView(prevView => ({
                                            ...prevView,
                                            competitionId: competition_.series_id,
                                            competitionName: competition_.series_name,
                                            eventName: "",
                                            eventId: "",
                                            currentView: "competition_selection",
                                            competitionRegion: competition_.competitionRegion,
                                          }))
                                          // router.push(`?sp=${game.sport_id}&spName=${game.sport_name}&cp=${competition_.series_id}&cpName=${competition_.series_name}&cpRegion=${competition_.competitionRegion}`)
                                          setCurrentCompetition(competition_.series_id)
                                          setCurCompObj({
                                            sportName: game.sport_name,
                                            compObj: competition_
                                          })
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
                              {/* </div> */}
                            </ScrollArea.Autosize>
                          </Collapse>
                        </Box>
                      )
                    }
                    if (view && (view.currentView === "" || view.currentView === "event_markets")) {
                      const icon_ = getIcon(game.sport_name)
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setView({
                              sportName: game.sport_name === "Football" ? "Soccer" : game.sport_name,
                              sportId: game.sport_id,
                              currentView: "eventType_selection"
                            })
                            setActive(game.sport_id)
                          }}
                          className={`flex justify-between border-b border-primary/[0.1] pb-1 mb-2 items-center w-full p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${activeLink === game.id ? "text-white bg-green-600/[0.7] p-1" : ""
                            }`}
                        >
                          <div className="flex items-center">
                            <div className="mr-1">
                              {
                                icon_ && icon_ != null && (
                                  <img className="h-8 w-8" src={icon_.url} alt="cricket-ball--v1" />
                                )
                              }
                            </div>
                            <p
                              onClick={() => {
                                setCurCompObj({
                                  sportName: game.sport_name,
                                  compObj: {}
                                })

                              }}
                              className={`text-md font-bold tracking-wider ${activeLink === game.sport_id ? "text-gray-400  py-1" : "text-gray-400"
                                }`}
                            >
                              {game.sport_name === "Football" ? "Soccer" : game.sport_name}
                            </p>
                          </div>
                          <ArrowDropDownRoundedIcon fontSize="large" className="text-orange-400" />
                        </div>
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
          </div>

        </div>
      </div>
    </ScrollArea.Autosize>
  );
}





