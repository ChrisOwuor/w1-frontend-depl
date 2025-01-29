"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
import AccordionKheladi from "./AccordionKheladi";
export default function RulesKheladi() {
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

      heading: "Big Bash League",
      data: [
        "Total match 1st over run:- Average 6 runs will be given if total 20 overs is not played, only 1st innings will be considered as valid",
           "Total 1st 6 over run:- Average 46 runs will be given if total 20 overs is not played, This event is valid only for the 1st innings",
        ,
      ],
    },
  ];

  return (
    <div className="relative mt-[5px]  px-[12px]">
      {userData ? (
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
          <div className="text-center kh:w-[91.66666667%]">
            <div className="btn-top">
              {rules &&
                rules.map((rule, index) => (
                  <div className="text-center rw flex-flex-wrap my-[1.3rem]">
                    <div className="mb-[1rem] w-full max-w-full">
home                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 p-5">loading</p>
      )}
    </div>
  );
}
