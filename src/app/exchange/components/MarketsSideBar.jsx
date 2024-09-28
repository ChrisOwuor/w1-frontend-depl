"use client";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { ScrollArea } from '@mantine/core';
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { NAVContext } from "@/app/context/NavContext";
import { getActiveMarkets } from "@/app/api/exchange";


export default function MarketsSidebar() {
    const { currentMkt, setCurrentMkt } = useContext(CompetitionContext)
    const [markets, setMarkets] = useState([])
    const { setCurrentCenter, view, setView } = useContext(NAVContext)
    const [eventData, setEventData] = useState({})


    const [loadin, setLoadin] = useState(false)

    useEffect(() => {
        (async () => {
            const markets = await getActiveMarkets(view.eventId, view.sportId)
            setMarkets(markets)
        })()
    }, [])
    useEffect(() => {
        const savedData = localStorage.getItem("2kts")
        if (savedData) {
            const data_ = JSON.parse(savedData)
            setEventData(data_)
        }
    }, []);


    return (

        <div className="w-full h-[90vh] bg-white z-9999">
            <div className="flex items-center p-2 rounded-t bg-primary justify-between">
                <p className="text-sm font-semibold text-white"></p>
                <p className="text-sm font-semibold text-white">Sports</p>
            </div>

            {
                eventData.event != undefined && (
                    <div className="flex flex-col pl-2 pr-1">
                        <div
                            onClick={() => {
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
                                })
                            }}
                            className="flex items-center rounded-t justify-between py-1"
                        >
                            <div className="flex items-center pl-1">
                                <p className="text-[1.1rem] font-bold tracking-wider ">
                                    {view.sportName}
                                </p>
                            </div>
                            <ArrowDropDownTwoToneIcon fontSize="medium" color="white" />
                        </div>
                        <p className="text-black text-[0.9rem]  flex items-center justify-between ml-1 pl-1 py-3 font-semibold tracking-wide bg-gray-800 truncate">{view.competitionName}<ArrowDropDownTwoToneIcon fontSize="small" color="white" /></p>
                        <p className="text-black text-[0.8rem]  flex items-center justify-between ml-2 pl-2 py-2 cursor-pointer font-semibold tracking-wide bg-gray-700 truncate" onClick={() => window.location.reload()}>{view.eventName}<ArrowDropDownTwoToneIcon fontSize="smaller" color="white" /></p>

                    </div>
                )
            }

            <div className="flex flex-col ml-3 pl-3 items-center font-medium text-black">
                <ScrollArea offsetScrollbars scrollbarSize={4}
                    h={700}
                    type="scroll"
                    className=" w-full">

                    <div className=" flex flex-col mt-1 ">
                        {
                            loadin ?

                                <div className="flex h-full justify-center items-center">
                                    < Loader color="white" />
                                </div>

                                :
                                (
                                    <div className="flex flex-col">
                                        <div

                                            className={`border-b py-1 border-gray-600 text-black hover:bg-gray-400 ${currentMkt.mkt_name === "Popular" ? 'bg-yellow-500/[0.5]' : ""}`}
                                            onClick={() => setCurrentMkt({
                                                mkt_name: "Popular",
                                                mkt_id: ""
                                            })}

                                        >
                                            <p className={`flex justify-between text-[0.8rem] cursor-pointer tracking-wide font-bold`}>{"Popular"} <DoneOutlineTwoToneIcon fontSize="smaller" color="white" className="" /></p>
                                        </div>
                                        {

                                            markets && markets.length > 0 && markets.map((market, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`border-b py-1 border-gray-600 text-black hover:bg-gray-400 ${currentMkt.mkt_name === market.market_name ? 'bg-yellow-500/[0.5]' : ""}`}
                                                        onClick={() => setCurrentMkt({
                                                            mkt_name: market.market_name,
                                                            mkt_id: market.market_id
                                                        })}

                                                    >
                                                        <p className={`flex justify-between text-[0.8rem] cursor-pointer tracking-wide font-bold`}>{market.market_name} <DoneOutlineTwoToneIcon fontSize="smaller" color="white" className="" /></p>
                                                    </div>
                                                )


                                            })
                                        }
                                    </div>
                                )
                        }

                    </div>

                </ScrollArea>
            </div>
        </div>
    );
}




