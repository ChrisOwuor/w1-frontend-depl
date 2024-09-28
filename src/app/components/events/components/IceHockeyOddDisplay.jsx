import React from "react";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const IceHockeyOddDisplay = ({
  game,
  getSelectionFromBetslip,
  addToBetslip,
  formatUnixTimestamp,
  handleMarkets,
  setLoading,
}) => {
  return (
    <div className="flex flex-col my-2 bg-white">
      <div className="p-2">
        {/* time */}
        <div className="col-span-1 flex justify-end gap-x-4 items-center">
          <div className="flex flex-col justify-between text-black font-semibold">
            <p className="text-[0.7rem]">Starts</p>
          </div>
          {/* status */}
          <div className="text-black font-semibold cursor-pointer">
            <p className="text-[0.7rem] text-black">
              {formatUnixTimestamp(game.eventD.time)}
            </p>
          </div>
        </div>
        {/* end time */}
        <div className="col-span-1 flex justify-between items-center">
          <div
            className="w-[50%] grid grid-cols-2 text-black font-semibold cursor-pointer"
            onClick={() => {
              handleMarkets("b17", game);
              setLoading(true);
            }}
          >
            <div className="flex justify-center items-center">
              <SportsHockeyIcon color="success" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[0.7rem]">{game.eventD.home.name}</p>
              <p className="text-[0.7rem]">{game.eventD.away.name}</p>
            </div>
          </div>
          {/* odds */}
          <div className="flex flex-col w-[50%] gap-1">
            <div className="grid grid-cols-3 gap-1 text-black font-semibold cursor-pointer">
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) === "Home - Line"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Home - Line",
                    game.event_odds.odds.game_lines.odds[0].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem] text-orange-900 mr-2">
                  {game.event_odds.odds.game_lines.odds[0].handicap || "--"}
                </p>
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[0].odds || "--"}
                </p>
              </div>
              {/* handicap */}
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) === "Home - Total"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Home - Total",
                    game.event_odds.odds.game_lines.odds[1].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem] text-orange-900 mr-2">
                  {game.event_odds.odds.game_lines.odds[1].handicap || "--"}
                </p>
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[1].odds || "--"}
                </p>
              </div>
              {/* total points */}
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) ===
                  "Home - Money Line"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Home - Money Line",
                    game.event_odds.odds.game_lines.odds[2].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[2].odds || "--"}
                </p>
              </div>
            </div>

            {/* away */}
            <div className="grid grid-cols-3 gap-1 text-black font-semibold cursor-pointer">
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) === "Away - Line"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Away - Line",
                    game.event_odds.odds.game_lines.odds[3].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem] text-orange-900 mr-2">
                  {game.event_odds.odds.game_lines.odds[3].handicap || "--"}
                </p>
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[3].odds || "--"}
                </p>
              </div>
              {/* handicap */}
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) === "Away - Total"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Away - Total",
                    game.event_odds.odds.game_lines.odds[4].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem] text-orange-900 mr-2">
                  {game.event_odds.odds.game_lines.odds[4].handicap || "--"}
                </p>
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[4].odds || "--"}
                </p>
              </div>
              {/* total points */}
              <div
                className={`${getSelectionFromBetslip(game.eventD.id) ===
                  "Away - Money Line"
                  ? "bg-yellow-500"
                  : "bg-gray-500/[0.2]"
                  } p-2 text-center rounded hover:text-black flex gap-2 justify-center items-center`}
                onClick={() =>
                  addToBetslip(
                    game.eventD.id,
                    "Away - Money Line",
                    game.event_odds.odds.game_lines.odds[5].odds || "--",
                    game
                  )
                }
              >
                <p className="text-[0.7rem]">
                  {game.event_odds.odds.game_lines.odds[5].odds || "--"}
                </p>
              </div>
            </div>
          </div>
          {/* end odds */}
        </div>
      </div>
    </div>
  );
};

export default IceHockeyOddDisplay;
