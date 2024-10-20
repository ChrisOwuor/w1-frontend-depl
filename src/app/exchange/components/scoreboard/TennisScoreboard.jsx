import React, { useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DisplayTime } from "@/app/api/exchange";

const TennisScoreboard = ({ scores, incidents, teamA, teamB }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Details");

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const HandleNav = (e) => {
    setActive(e.target.textContent);
  };
  return (
    <>
      {scores && (
        <div className="bg-[#303131] grid grid-cols-12 p-2 w-full">
          <div className="col-span-12 grid grid-cols-3">
            <div className="col-span-2 flex items-center justify-start text-white">
              <p className="text-lg font-medium tracking-wider">
                {scores.score &&
                  `${scores.score.home.name}`}

              </p>
              <p
                className={`${scores?.score?.home?.isServing == true ? "bg-success" : "bg-gray-400"} 
    rounded-full w-2 h-2`}
              ></p>

            </div>
            <div className="col-span-1 grid grid-cols-4">
              {/* First Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.home?.gameSequence?.length > 0
                    ? scores?.score?.home?.gameSequence[0]
                    : scores?.score?.home?.games}
                </p>
              </div>

              {/* Second Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.home?.gameSequence?.length > 1
                    ? scores?.score?.home?.gameSequence[1]
                    : (scores?.score?.home?.gameSequence?.length === 1 ? scores?.score?.home?.games : "")}
                </p>
              </div>

              {/* Third Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.home?.gameSequence?.length === 2
                    ? scores?.score?.home?.games
                    : ""}
                </p>
              </div>

              {/* Score Column */}
              <div className="col-span-1">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.home?.score == 0 ? "" : scores?.score?.home?.score}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 grid grid-cols-3">
            <div className="col-span-2 flex items-center justify-start bg-[#303131] text-white">
              <p className="text-lg font-medium tracking-wider">
                {scores.score &&
                  `${scores.score.away.name}`}
              </p>
              <p
                className={`${scores?.score?.away?.isServing == true ? "bg-success" : "bg-gray-400"} 
    rounded-full w-2 h-2`}
              ></p>

            </div>
            <div className="col-span-1 grid grid-cols-4">
              {/* First Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.away?.gameSequence?.length > 0
                    ? scores?.score?.away?.gameSequence[0]
                    : scores?.score?.away?.games}
                </p>
              </div>

              {/* Second Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.away?.gameSequence?.length > 1
                    ? scores?.score?.away?.gameSequence[1]
                    : (scores?.score?.away?.gameSequence?.length === 1 ? scores?.score?.away?.games : "")}
                </p>
              </div>

              {/* Third Column */}
              <div className="col-span-1 bg-black flex justify-center items-center">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.away?.gameSequence?.length === 2
                    ? scores?.score?.away?.games
                    : ""}
                </p>
              </div>

              {/* Score Column */}
              <div className="col-span-1">
                <p className="text-white font-bold mr-2">
                  {scores?.score?.away?.score == 0 ? "" : scores?.score?.away?.score}
                </p>
              </div>
            </div>

          </div>
          <div className="col-span-12 grid grid-cols-3">
            <div className="col-span-2">
              <p className="text-xs">Set {scores?.currentSet}</p>
            </div>
            <div className="col-span-1  grid grid-cols-4">
              <div className="col-span-1 flex justify-center items-center"><p className="text-[0.55rem] font-small">1</p></div>
              <div className="col-span-1 flex justify-center items-center"><p className="text-[0.55rem] font-small">2</p></div>
              <div className="col-span-1 flex justify-center items-center"><p className="text-[0.55rem] font-small">3</p></div>
              <div className="col-span-1 flex justify-center items-center"><p className="text-[0.55rem] font-small text">Points</p></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TennisScoreboard;
