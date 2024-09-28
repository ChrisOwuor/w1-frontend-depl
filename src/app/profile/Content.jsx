"use client";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsComponent from "../exchange/components/Settings";

function Content() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState({});
  const [userData, setUserData] = useState({});
  const [openBets, setOpenBets] = useState(false);
  const [mybets, setMybets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [betResults, setBetResults] = useState([]);
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

  const fetchBets = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/mybets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          // console.log(res.data);
          if (res.status === 200) {
            setMybets(res.data.bets);
            setBetResults(res.data.betResults);
            setLoading(false);
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const token_d = localStorage.getItem("tk");
    if (token_d) {
      setLoggedIn(true);

      // const decodedToken = jwt_decode(token_d);
      // setUserToken(decodedToken);
      fetchData();
      fetchBets();
    }
  }, []);

  const getTime = (bet_time) => {
    const timestamp = bet_time;
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    };

    const formattedDate = date.toLocaleString("en-US", options);
    // console.log(formattedDate);
    return formattedDate;
  };

  const getScores = (event_id, bet_id) => {
    const scores_ = betResults.find((item) => item.bet_id === bet_id);

    if (scores_ && scores_.eventResults && scores_.eventResults.length > 0) {
      const target = scores_.eventResults.find(
        (item) => item[0] && item[0].event_id === event_id
      );

      if (target && target[0] && target[0].results && target[0].results.ss) {
        return target[0].results.ss;
      } else {
        console.log("Event not found or data structure is incomplete");
      }
    } else {
      console.log("Bet or event results not found");
    }

    return null; // You can change this to a more suitable default value or error handling
  };

  return (
    <div className="mk:mx-auto mk:max-w-[70%] mt-12">
      {userData ? (
        <div className="bg-gray-300 p-3">
          <p className="text-sm text-black font-bold my-3">My Profile</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            <div className="col-span-1 md:col-span-2 ">
              {/* balance */}
              <div className="bg-white text-black rounded px-4 py-2">
                <div className="flex justify-between items-center">
                  <p className="text-black text-sm">Balance</p>
                  <p className="text-black text-sm">
                    INR. {parseInt(userData.availableBalance).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-20 col-span-1">
                <SettingsComponent />
              </div>
            </div>

            {/* username, profilepic, number */}
            <div className="col-span-1 hidden md:block">
              <div className="bg-white text-black rounded px-4 py-2">
                <div className="flex flex-col justify-center items-center">
                  <div className="rounded-full bg-white">
                    <AccountCircleIcon
                      fontSize="large"
                      color=""
                      className="bg-white rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-black text-sm">
                      {userData.firstName} {userData.lastName}
                    </p>
                    <p className="text-black text-sm">
                      +{userData.phoneNumber}
                    </p>
                    <p className="text-black text-sm">{userData.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-black p-5">loading</p>
      )}
    </div>
  );
}

export default Content;
