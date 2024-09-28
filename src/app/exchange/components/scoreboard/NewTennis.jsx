import React, { useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { DisplayTime } from "@/app/api/exchange";

const NewTennis = ({ scores, incidents, teamA, teamB }) => {
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
      <Box mx="auto" className={`flex w-full flex-col bg-green-600/[0.5] `}>
        <div onClick={onClick}>
          <div className="w-full flex  items-center justify-between py-4 ">
            <div className="flex-1 pl-8">
              <div className="w-full grid grid-cols-7 h-12 ">
                <div className="col-span-2 pic name flex items-center flex-row gap-4 ">
                  <div className="pic rounded-full w-10 h-10 bg-cover ">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${scores.event.homeTeam.id}/image`}
                      alt="p1"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className=" text-xs">{teamA}.</p>
                    <p className=" text-xs">{scores.event.homeTeam.nameCode}</p>
                  </div>
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-2 pic name flex items-center flex-row gap-6">
                  {scores.event.homeScore.period1 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "1st set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {" "}
                        {scores.event.homeScore.period1}
                      </p>
                    </div>
                  )}
                  {scores.event.homeScore.period2 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "2nd set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {" "}
                        {scores.event.homeScore.period2}
                      </p>
                    </div>
                  )}
                  {scores.event.homeScore.period3 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "3rd set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {" "}
                        {scores.event.homeScore.period3}
                      </p>
                    </div>
                  )}

                  {scores.event.homeScore.point >= 0 ||
                  scores.event.homeScore.point === "A" ? (
                    <div className="b border-l-2 border-gray-200 flex justify-center items-center pl-2">
                      <p
                        className={`${
                          scores.event.status.type === "inprogress"
                            ? "text-green-300 rounded-lg"
                            : "bg-inherit"
                        } p-2`}
                      >
                        {" "}
                        {scores.event.status.description === "Ended"
                          ? scores.event.homeScore.normaltime
                          : scores.event.homeScore.point}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="w-full grid grid-cols-7 h-12 ">
                <div className="col-span-2 pic name flex items-center flex-row gap-4 ">
                  <div className="pic rounded-full w-10 h-10 bg-cover ">
                    <img
                      src={`https://api.sofascore.app/api/v1/team/${scores.event.awayTeam.id}/image`}
                      alt="p1"
                      className="w-10 h-10"
                    />
                  </div>
                  <div>
                    <p className=" text-xs">{teamB}</p>
                    <p className=" text-xs">{scores.event.awayTeam.nameCode}</p>
                  </div>
                </div>
                <div className="col-span-3"></div>
                <div className="col-span-2 pic name flex items-center flex-row gap-6">
                  {scores.event.awayScore.period1 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "1st set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {scores.event.awayScore.period1}
                      </p>
                    </div>
                  )}
                  {scores.event.awayScore.period2 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "2nd set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {" "}
                        {scores.event.awayScore.period2}
                      </p>
                    </div>
                  )}
                  {scores.event.awayScore.period3 >= 0 && (
                    <div className="flex justify-center items-center">
                      <p
                        className={`${
                          scores.event.status.description === "3rd set"
                            ? "bg-red-500 rounded-lg "
                            : " bg-inherit"
                        } p-2 `}
                      >
                        {" "}
                        {scores.event.awayScore.period3}
                      </p>
                    </div>
                  )}

                  {scores.event.awayScore.point >= 0 ||
                  scores.event.awayScore.point === "A" ? (
                    <div className="b border-l-2 border-gray-200 flex justify-center items-center pl-2">
                      <p
                        className={`${
                          scores.event.status.type === "inprogress"
                            ? "text-green-300 rounded-lg"
                            : "bg-inherit"
                        } p-2`}
                      >
                        {" "}
                        {scores.event.status.description === "Ended"
                          ? scores.event.awayScore.normaltime
                          : scores.event.awayScore.point}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            {scores.event.status.type === "notstarted" && (
              <div className="timer pr-8 ">
                <p> {DisplayTime(scores.event.startTimestamp)}</p>
              </div>
            )}
          </div>
          <div className="stat_nav flex flex-col justify-center items-center w-full h-3  mt-0 onClick={onClick} ">
            {open ? (
              <div>
                <ArrowDropUpIcon />
              </div>
            ) : (
              <div>
                {" "}
                <ArrowDropDownIcon />
              </div>
            )}
          </div>
        </div>

        <Collapse
          in={open}
          className="col-span-12  p-4 bg-gray-900/[0.5] text-xs"
        >
          <div className="collapse_nav flex justify-between gap-5 text-white text- text-xs">
            <div className="details cursor-pointer" onClick={HandleNav}>
              Details
            </div>
            <div className="statistics cursor-pointer" onClick={HandleNav}>
              Statistics
            </div>
            <div className="matches cursor-pointer" onClick={HandleNav}>
              Matches
            </div>
            <div className="knockout cursor-pointer" onClick={HandleNav}>
              Knockout
            </div>
          </div>
          {active === "Details" && (
            <div className="content py-3">
              <div className="header flex justify-between">
                <h1>
                  Fulltime{" "}
                  {scores.event.status.type === "inprogress" ? (
                    <span className="text-red-400">Live</span>
                  ) : (
                    <span>
                      {scores.event.status.type === "notstarted" ? (
                        <span>Not started </span>
                      ) : (
                        <span>Ended </span>
                      )}
                    </span>
                  )}
                </h1>
              </div>

              <div className="fulltime_details bg-gray-200 rounded-lg w-full flex justify-center items-center gap-5 py-8 p-3 ">
                <div className="home w-1/2  bg-gray-400 rounded-lg py-3 flex justify-center ">
                  <p>1.23</p>
                </div>
                <div className="away w-1/2  bg-gray-400 rounded-lg py-3 flex justify-center">
                  <p>1.23</p>
                </div>
              </div>
            </div>
          )}
          {active === "Statistics" && (
            <div className="content py-3">
              <h1>Statistics Details</h1>

              <div className="fulltime_details  rounded-lg w-full flex justify-center items-center gap-5 py-8 p-3 ">
                Statistics details shown here
              </div>
            </div>
          )}
          {active === "Matches" && (
            <div className="content py-3">
              <h1>Matches Details</h1>

              <div className="fulltime_details  rounded-lg w-full flex justify-center items-center gap-5 py-8 p-3 ">
                Match details shown here
              </div>
            </div>
          )}
          {active === "Knockout" && (
            <div className="content py-3">
              <h1>Knockout Details</h1>

              <div className="fulltime_details rounded-lg w-full flex justify-center items-center gap-5 py-8 p-3 ">
                Knockout details shown here
              </div>
            </div>
          )}
        </Collapse>
      </Box>
    </>
  );
};

export default NewTennis;
