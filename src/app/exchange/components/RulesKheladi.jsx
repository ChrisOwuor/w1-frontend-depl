"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
import AccordionKheladi from "./AccordionKheladi";
export default function RulesKheladi () {
  const [errorM, setErrorM] = useState("");
  const [successM, setSuccessM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const [userData, setUserData] = useState({});
  const { setCurrentCenter } = useContext(NAVContext);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            setUserData(res.data.other);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token_d = localStorage.getItem("tk");
    if (token_d) {
      // setLoggedIn(true);
      fetchData();
    }
  }, []);

  let rules = [
    {
      heading: "Football Fancy",
      data: [
        "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at same time (Punching) and others. Note : only winning bets will be voided...",
        "Tournament Total Goals, Team Total Goals goals.scored in 90 minutes or in extra-time will count.Goals scored in penalty shootouts do not count.",
        "Tournament Penalties Missed/Converted - Penalties taken in 90 minutes, extra-time and penalty shootouts all count. If a penalty has to be re-taken the previous disallowed penalty(ies) do not count.",
        ,
      ],
    },
{
      heading: "Big Bash League",
      data: [
        "Total match 1st over run:- Average 6 runs will be given if total 20 overs is not played, only 1st innings will be considered as valid",
        "Total 1st 6 over run:- Average 46 runs will be given if total 20 overs is not played, This event is valid only for the 1st innings",
        "Total Wides - Average 8 wides will be given in case match abandoned or over reduced",
        "Total Extras - Average 14 extras will be given in case match abandoned or over reduced",
        "Total Fifties - Average 2 fifties will be given in case match abandoned or over reduced",
        "Total Caught out - Average 8 catch out will be given in case match abandoned or over reduced"
      ],
    },
    {
      heading: "Election",
      data: [
        "1. The final result declared by election commission of India for Loksabha election 2019 will be valid in our exchange.",
        "2. Accidental issues during Loksabha election 2019 will not be counted in our exchange."
      ],
    },
    {
      heading: "World Cup",
      data: [
        "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at same time (Punching) and others. Note : only winning bets will be voided...",
        "In case of any circumstances, management decision will be final for all the fancies under world cup.",
        "Match 1st over run:- This fancy is valid only for first innings of the match, Average 4 runs will be given in case of match abandoned or the entire 50 over is not played.",
        "Total Fours:- Average 48 Fours will be given if the match is abandoned or over reduced"
      ],
    },
    {
      heading: "Match",
      data: [
        "Company reserves the right to suspend/void any id/bets if the same is found to be illegitimate. For example incase of vpn/robot-use/multiple entry from same IP/ multiple bets at same time (Punching) and others. Note : only winning bets will be voided, For example: If we find such entries (above mentioned) from any id and their bets are (200000 lay in a 6 over session for the rate 40 and 200000 back for the rate of 48) and the actual score is 38, bets of 40 lay will be voided and the bets for 48 back will be considered valid.",
        "TENNIS Match Odds :- If 1st set has been not completed at the time of the retirement or disqualification, then all bets relating to that individual match will be void.",
        "FOOTBALL Match Odds :- All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included. For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided. For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.",
        "FOOTBALL Under_Over Goals :- In the event of a match starting but not being completed, all bets will be void, unless the specific market outcome is already determined,"
      ],
    },
    {
      heading: "Khado",
      data: [
        "Only First inning valid for T20 and one day matches.",
        "Same will be work like Lambi. If match abandoned or over reduced, all bets will be deleted.",
        "You can choose your own value in this event."
      ],
    },
    {
      heading: "Virtual Tennis",
      data: [
        "1. If streaming stops or some technical issue occurs, the match will be abandoned.",
        "2. Accidental issues during Loksabha election 2019 will not be counted in our exchange.",
        "3. *There will be 3 sets in the match. There are 3 games in 1 set.",
            "4. *In the match, within any set, there are 3-3 games between the two players (level game) till a tie break of 5 points is played, according to which the one who gets 2 points more than the difference of points will win the set."
],
    },
  ];

  return (
    <div className="relative mt-[5px]  px-[12px]">
        <div className=" stake-settings py-[15px] ">
          <div className="header-password mt-[1rem] flex-flex-wrap">
            <div className="px-[0.5rem]">
              <div className="headerLine">
                <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                  Rules
                </h6>
              </div>
            </div>
          </div>
          <div className="text-center w-full">
            <div className="btn-top">
              {rules &&
                rules.map((rule, index) => (
                  <div key={index} className="text-center rw flex-flex-wrap my-[1.3rem]">
                    <div className="mb-[1rem] w-full max-w-full">
                      <AccordionKheladi heading={rule.heading} text={rule.data} color={"#5700a3"} textColor={"white"} bg={"#fff"} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
    </div>
  );
}
