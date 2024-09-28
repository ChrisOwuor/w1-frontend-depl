import React from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const ThreeWayEventWithOddDisplay = ({
  game,
  getSelectionFromBetslip,
  addToBetslip,
  formatUnixTimestamp,
  handleMarkets,
}) => {
  return (
    <div className="flex flex-col mt-2">
      <div className="grid grid-cols-10 items-center">
        {/* Event icons */}
        <div className="col-span-1 text-center">
          <SportsSoccerIcon color="success" />
        </div>
        {/* ODDS */}
        <div className="col-span-8">
          <div className="grid grid-cols-3 items-center w-full">
            {/* Teams name */}
            <div
              className="col-span-1 flex flex-col justify-between cursor-pointer text-black font-semibold text-md border-r  mr-5 pr-2 border-gray-400/[0.4]"
              onClick={() => {
                handleMarkets("f1", game);
              }}
            >
              <p className="text-[0.7rem]">{game.eventD.home.name}</p>
              <p className="text-[0.7rem]">{game.eventD.away.name}</p>
            </div>
            {/* end name */}
            {/* odds */}
            <div className="col-span-2 grid grid-cols-3 items-center  gap-x-1 text-black text-[0.7rem] font-semibold cursor-pointer">
              <div
                className={`${
                  getSelectionFromBetslip(game.eventD.id) === "Home"
                    ? "bg-yellow-500"
                    : "bg-gray-500/[0.2]"
                } p-2 text-center hover:bg-green-500/[0.5] hover:text-black rounded`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Home",
                    isNaN(
                      parseFloat(
                        game.event_odds.odds.full_time_result.odds[0].odds
                      )
                    )
                      ? "--"
                      : parseFloat(
                          game.event_odds.odds.full_time_result.odds[0].odds
                        ).toFixed(2),
                    game
                  )
                }
              >
                <p className="text-[0.7rem]">
                  {isNaN(
                    parseFloat(
                      game.event_odds.odds.full_time_result.odds[0].odds
                    )
                  )
                    ? "--"
                    : parseFloat(
                        game.event_odds.odds.full_time_result.odds[0].odds
                      ).toFixed(2)}
                </p>
              </div>
              <div
                className={`${
                  getSelectionFromBetslip(game.eventD.id) === "Draw"
                    ? "bg-yellow-500"
                    : "bg-gray-500/[0.2]"
                } p-2 text-center hover:bg-green-500/[0.5] hover:text-black rounded`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Draw",
                    isNaN(
                      parseFloat(
                        game.event_odds.odds.full_time_result.odds[1].odds
                      )
                    )
                      ? "--"
                      : parseFloat(
                          game.event_odds.odds.full_time_result.odds[1].odds
                        ).toFixed(2),
                    game
                  )
                }
              >
                <p className="text-[0.7rem]">
                  {isNaN(
                    parseFloat(
                      game.event_odds.odds.full_time_result.odds[1].odds
                    )
                  )
                    ? "--"
                    : parseFloat(
                        game.event_odds.odds.full_time_result.odds[1].odds
                      ).toFixed(2)}
                </p>
              </div>
              <div
                className={`${
                  getSelectionFromBetslip(game.eventD.id) === "Away"
                    ? "bg-yellow-500"
                    : "bg-gray-500/[0.2]"
                } p-2 text-center hover:bg-green-500/[0.5] hover:text-black rounded`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Away",
                    isNaN(
                      parseFloat(
                        game.event_odds.odds.full_time_result.odds[2].odds
                      )
                    )
                      ? "--"
                      : parseFloat(
                          game.event_odds.odds.full_time_result.odds[2].odds
                        ).toFixed(2),
                    game
                  )
                }
              >
                <p className="text-[0.7rem]">
                  {isNaN(
                    parseFloat(
                      game.event_odds.odds.full_time_result.odds[2].odds
                    )
                  )
                    ? "--"
                    : parseFloat(
                        game.event_odds.odds.full_time_result.odds[2].odds
                      ).toFixed(2)}
                </p>
              </div>
            </div>
            {/* end odds */}
          </div>
        </div>
        {/* more markets button */}
        <div className="col-span-1 flex justify-center items-center">
          <div className="flex flex-col text-black">
            <p className=" text-[0.7rem]">Starts</p>
            <p className=" text-[0.7rem]">
              {formatUnixTimestamp(game.eventD.time) || "--"}
            </p>
          </div>
        </div>
      </div>
      <hr className="mt-2" />
      {/* end */}
    </div>
  );
};

export default ThreeWayEventWithOddDisplay;
