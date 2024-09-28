"use client";
import React from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";

const TwoWayEventWithOddDisplay = ({
  gameIndex,
  game,
  getSelectionFromBetslip,
  addToBetslip,
  formatUnixTimestamp,
  handleMarkets,
}) => {
  return (
    <div key={gameIndex}>
      {game && (
        <div className="flex flex-col mt-2" key={gameIndex}>
          <div className="">
            <div className="col-span-1">
              <div className="grid grid-cols-10">
                {/* Event icons */}
                <div className="col-span-1 text-center">
                  <SportsCricketIcon color="success" />
                </div>
                {/* ODDS */}
                <div className="col-span-8">
                  <div className="grid grid-cols-3 items-center w-full">
                    {/* Teams name */}
                    <div
                      className="col-span-1 flex flex-col justify-between cursor-pointer text-black font-semibold text-md border-r mr-5 pr-2 border-gray-400/[0.4]"
                      onClick={() => {
                        handleMarkets("c3", game);
                      }}
                    >
                      <p className="text-[0.7rem]">{game.eventD.home.name}</p>
                      <p className="text-[0.7rem]">{game.eventD.away.name}</p>
                    </div>

                    {/* odds */}
                    <div className="col-span-2">
                      <div className="grid grid-cols-2 gap-1 items-center text-black font-semibold cursor-pointer">
                        <div
                          className={`${
                            getSelectionFromBetslip(game.eventD.id) ===
                            "Home-To Win The Match"
                              ? "bg-yellow-500"
                              : "bg-gray-500/[0.2]"
                              
                          } p-2 text-center hover:bg-green-500/[0.5] hover:text-black rounded`}
                          onClick={() =>
                            addToBetslip(
                              game.eventD.id,
                              "Home",
                              game.event_odds.odds.main.sp.to_win_the_match
                                .odds[0].odds || "--",
                              game
                            )
                          }
                        >
                          <p className="text-[0.7rem]">
                            {game.event_odds.odds.main.sp.to_win_the_match
                              .odds[0].odds || "--"}
                          </p>
                        </div>
                        <div
                          className={`${
                            getSelectionFromBetslip(game.eventD.id) ===
                            "Away-To Win The Match"
                              ? "bg-yellow-500"
                              : "bg-gray-500/[0.2]"
                          } p-2 text-center hover:bg-green-500/[0.5] hover:text-black rounded`}
                          onClick={() =>
                            addToBetslip(
                              game.eventD.id,
                              "Away",
                              game.event_odds.odds.main.sp.to_win_the_match
                                .odds[1].odds || "--",
                              game
                            )
                          }
                        >
                          <p className="text-[0.7rem]">
                            {game.event_odds.odds.main.sp.to_win_the_match
                              .odds[1].odds || "--"}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* end odds */}
                  </div>
                </div>

                {/* more markets button */}
                <div className="col-span-1 px-1 flex justify-center items-center">
                  <div className="flex flex-col text-black">
                    <p className=" text-[0.7rem]">Starts</p>
                    <p className=" text-[0.7rem]">
                      {formatUnixTimestamp(game.eventD.time) || "--"}
                    </p>
                  </div>
                </div>
                {/* end */}
              </div>
            </div>
          </div>
          <hr className="mt-2" />
        </div>
      )}
    </div>
  );
};

export default TwoWayEventWithOddDisplay;
