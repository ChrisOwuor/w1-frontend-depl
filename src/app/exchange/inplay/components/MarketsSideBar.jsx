"use client";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import axios from "axios";
import { ScrollArea } from '@mantine/core';
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import Link from "next/link";
import { useParams } from "next/navigation";
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

import SportsCricketIcon from "@mui/icons-material/SportsCricket";

export default function MarketsSidebar({ setSelectedLink, activeLink }) {
    const { currentMkt, setCurrentMkt } = useContext(CompetitionContext)
    const [markets, setMarkets] = useState([]);
    const [eventData, setEventData] = useState({})



    const event_id = useParams().id;


    const [loadin, setLoadin] = useState(false)


    const Eventfetcher = async () => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/cricket/events/${event_id}`
            );
            if (res && res.data.event) {
                // console.log(res.data.event[0])
                const mkts = res.data.event[0].markets
                setMarkets(mkts.length > 0 ? mkts : []);
                // setEventData(res.data.event[0])
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        const savedData = localStorage.getItem("2kts")
        if (savedData) {
            const data_ = JSON.parse(savedData)
            // console.log("Parsing------------", data_)
            setEventData(data_)
        }

        // if (event_id) {
        //     Eventfetcher();
        // }

    }, []);


    return (
        <div className="hover:bg-[#0D112F] sticky top-5 rounded shadow-lg">
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
            {
                eventData != {} && (
                    <div className="mt-5 flex flex-col">
                        <Link href="/" passHref className="flex items-center justify-between bg-green-700 py-3">
                            <div className="flex items-center">
                                <SportsCricketIcon />
                                <p className="text-[1.1rem font-bold tracking-wider ">Cricket</p>
                            </div>

                            <ArrowDropDownTwoToneIcon fontSize="smaller" color="white" />
                        </Link>
                        <p className="text-[0.9rem]  flex items-center justify-between pl-2 py-3 font-semibold tracking-wider bg-gray-800">{eventData.competitionTitle}<ArrowDropDownTwoToneIcon fontSize="small" color="white" /></p>
                        <p className="text-[0.9rem]  flex items-center justify-between pl-3 py-2 cursor-pointer font-semibold tracking-wider bg-gray-700" onClick={()=>window.location.reload()}>{eventData.event && eventData.event.event.name}<ArrowDropDownTwoToneIcon fontSize="smaller" color="white" /></p>

                    </div>
                )
            }

            <div className="flex flex-col pl-4 items-center font-medium text-white gap-x-4 overflow-x-auto">
            <ScrollArea  offsetScrollbars scrollbarSize={10}
                    h={500}
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

                                    markets && markets.length > 0 && markets.map((market, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className={`border-b py-1 border-gray-600 text-white hover:bg-gray-400 ${currentMkt.mkt_name === market.marketName ? 'bg-yellow-500/[0.5]' : ""}`}
                                                onClick={() => setCurrentMkt({
                                                    mkt_name: market.marketName,
                                                    mkt_id: market.marketId
                                                })}

                                            >
                                                <p className={`flex justify-between text-[0.8rem] cursor-pointer tracking-wide font-bold`}>{market.marketName} <DoneOutlineTwoToneIcon fontSize="smaller" color="white" className="" /></p>
                                            </div>
                                        )


                                    })
                                )
                        }

                    </div>

                </ScrollArea>
            </div>
        </div>
    );
}




