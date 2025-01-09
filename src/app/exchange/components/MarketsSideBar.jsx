"use client";
import React, { useContext, useEffect, useState } from "react";
import { Loader } from "@mantine/core";
import { ScrollArea } from "@mantine/core";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import ArrowDropDownTwoToneIcon from "@mui/icons-material/ArrowDropDownTwoTone";
import { NAVContext } from "@/app/context/NavContext";
import { getActiveMarkets } from "@/app/api/exchange";

export default function MarketsSidebar() {
  const { currentMkt, setCurrentMkt } = useContext(CompetitionContext);
  const [markets, setMarkets] = useState([]);
  const { setCurrentCenter, view, setView } = useContext(NAVContext);
  const [eventData, setEventData] = useState({});

  const [loadin, setLoadin] = useState(false);

  useEffect(() => {
    (async () => {
      const markets = await getActiveMarkets(view.eventId, view.sportId);
      setMarkets(markets);
    })();
  }, []);
  useEffect(() => {
    const savedData = localStorage.getItem("2kts");
    if (savedData) {
      const data_ = JSON.parse(savedData);
      setEventData(data_);
    }
  }, []);

  return (
    <div className="w-full h-[90vh] bg-white z-9999">
      <div className="flex items-center p-2 bg-primary justify-between">
        <p className="text-sm font-semibold text-white"></p>
        <p className="text-sm font-semibold text-white">Sports</p>
      </div>

      {eventData.event != undefined && (
        <div className="flex flex-col pr-1 justify-start">
          <div
            onClick={() => {
              setCurrentCenter("home");
              setView({
                currentView: "home",
                from: "/",
                sportName: "",
                sportId: "",
                competitionName: "",
                competitionId: "",
                eventName: "",
                eventId: "",
              });
            }}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center pl-1">
              <p className="text-md font-semibold text-black">
                {view.sportName}
              </p>
            </div>
            <ArrowDropDownTwoToneIcon
              fontSize="medium"
              className="text-black"
            />
          </div>
          <p className="text-black text-md font-semibold flex items-center justify-between ml-1 pl-1 whitespace-nowrap">
            {view.competitionName}
            <ArrowDropDownTwoToneIcon fontSize="small" className="text-black" />
          </p>
          <p
            className="text-black text-sm whitespace-wrap font-semibold ml-4 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            {view.eventName}
          </p>
        </div>
      )}

      <div className="flex flex-col ml-4 pl-2 items-center font-medium text-black">
        <ScrollArea
          offsetScrollbars
          scrollbarSize={0}
          h={700}
          type="scroll"
          className=" w-full"
        >
          <div className=" flex flex-col">
            {loadin ? (
              <div className="flex h-full justify-center items-center">
                <Loader color="black" />
              </div>
            ) : (
              <div className="flex flex-col">
                <div
                  className={`py-1 text-black hover:bg-gray-400 ${
                    currentMkt.mkt_name === "Popular"
                      ? "bg-yellow-500/[0.5]"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentMkt({
                      mkt_name: "Popular",
                      mkt_id: "",
                    })
                  }
                >
                  <p
                    className={`flex justify-between text-sm cursor-pointer tracking-wide`}
                  >
                    {"Popular"}{" "}
                  </p>
                </div>
                {markets &&
                  markets.length > 0 &&
                  markets.map((market, index) => {
                    return (
                      <div
                        key={index}
                        className={`border-b border-black/[0.3] py-1 text-black hover:bg-gray-400 ${
                          currentMkt.mkt_name === market.market_name
                            ? "bg-yellow-500/[0.5]"
                            : ""
                        }`}
                        onClick={() =>
                          setCurrentMkt({
                            mkt_name: market.market_name,
                            mkt_id: market.market_id,
                          })
                        }
                      >
                        <p
                          className={`flex justify-between text-sm cursor-pointer`}
                        >
                          {["7", "4339"].includes(view.sportId)
                            ? `${market.market_start_time} ${market.market_name}`
                            : market.market_name}
                        </p>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
