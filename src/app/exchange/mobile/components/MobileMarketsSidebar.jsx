"use client";
import React, { useContext, useState } from "react";
import { Loader } from "@mantine/core";
import { ScrollArea } from '@mantine/core';
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { MarketsContext } from "src/app/context/exchange/MarketsContext";


export default function MobileMarketsSideBar({  toggleMarketSideBar }) {
  const { currentMkt, setCurrentMkt } = useContext(CompetitionContext)
  const { markets } = useContext(MarketsContext)

  const [loadin, setLoadin] = useState(false)



  return (
    <ScrollArea.Autosize mih={1} offsetScrollbars type="scroll" scrollbarSize={10} className=" h-[100vh] w-full">
      <div className=" w-full shadow-lg flex flex-col justify-between">

        <div className="grid grid-cols-12 h-full">
          <div className="col-span-12 bg-white">
            <div className="flex w-full justify-center items-center text-center my-4">
              <ArrowCircleLeftRoundedIcon fontSize="medium" onClick={() => toggleMarketSideBar()} className="font-bold text-primary" />
            </div>

            <div className="flex flex-col items-center font-semibold text-white pb-20 mx-1">
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

                            className={`border-b py-1 border-primary/[0.1] text-primary hover:bg-gray-400 ${currentMkt.mkt_name === "Popular" ? 'bg-yellow-500/[0.5]' : ""}`}
                            onClick={() => {
                              setCurrentMkt({
                                mkt_name: "Popular",
                                mkt_id: ""
                              })
                              toggleMarketSideBar()
                            }}

                          >
                            <p className={`flex justify-between text-[0.8rem] cursor-pointer tracking-wide font-bold`}>{"Popular"} <DoneOutlineTwoToneIcon fontSize="smaller" color="white" className="" /></p>
                          </div>
                          {

                            markets && markets.length > 0 && markets.map((market, index) => {
                              return (
                                <div
                                  key={index}
                                  className={`border-b py-1 border-primary/[0.1] text-primary hover:bg-gray-400 ${currentMkt.mkt_name === market.marketName ? 'bg-yellow-500/[0.5]' : ""}`}
                                  onClick={() => {
                                    setCurrentMkt({
                                      mkt_name: market.marketName,
                                      mkt_id: market.marketId
                                    })
                                    toggleMarketSideBar()
                                  }}

                                >
                                  <p className={`flex justify-between text-[0.8rem] cursor-pointer tracking-wide font-bold`}>{market.marketName} <DoneOutlineTwoToneIcon fontSize="smaller" color="white" className="" /></p>
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

          <div className="col-span-2">

          </div>
        </div>

      </div>
    </ScrollArea.Autosize>
  );
}






