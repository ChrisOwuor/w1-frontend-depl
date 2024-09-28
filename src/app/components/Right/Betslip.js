"use client";
import { AuthContext } from "src/app/context/AuthContext";
import { BetslipContext } from "src/app/context/BetslipContext";
import React, { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../funcStore/authenticate";
import { Modal } from "@mantine/core";
import axios from "axios";
import { ScrollArea } from "@mantine/core";

const Betslip = () => {
  const { betslipData, updateBetslip } = useContext(BetslipContext);
  const [betslip, setBetslip] = useState([]);
  const [stake, setStake] = useState(0);
  const [totalOdds, setTotalOdds] = useState(0);
  const [totalPayout, setTotalPayout] = useState(0);
  const { setOpenLogin } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [betPlaced, setBetPlaced] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
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
            if (res.data.other.availableBalance) {
              localStorage.setItem(
                "bal",
                JSON.stringify(res.data.other.availableBalance)
              );
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loggedIN = isAuthenticated();
    if (loggedIN) {
      setIsLoggedIn(true);
      fetchUserData();
    }

    const dd = localStorage.getItem("betslip");
    const ddd = JSON.parse(dd);
    ddd && setBetslip(ddd);
  }, []);

  useEffect(() => {
    setBetslip(betslipData);
  }, [betslipData]);

  useEffect(() => {
    // Calculate total odds based on betslip
    const oddsArray = betslip.map((betEvent) => parseFloat(betEvent.odds));
    // const calculatedTotalOdds = oddsArray.reduce((acc, odds) => acc * odds, 1);
    const calculatedTotalOdds = oddsArray.reduce((acc, odds) => {
      if (odds === 0) {
        return acc;
      }
      return acc === 0 ? odds : acc * odds;
    }, 0);

    setTotalOdds(calculatedTotalOdds);

    // Calculate total payout based on stake and total odds
    if (stake) {
      const calculatedTotalPayout = parseFloat(stake) * calculatedTotalOdds;
      setTotalPayout(calculatedTotalPayout);
    }
  }, [betslip, stake]);

  const handleStakeChange = (event) => {
    setStake(event.target.value);
  };

  const handleRemoveAll = () => {
    updateBetslip([]);
  };

  const handleDeleteEvent = (event_id) => {
    // console.log(`delete event with id: ${event_id}`);

    if (betslip.length === 1) {
      localStorage.removeItem(betslip);
    }

    const updatedBetslip = betslip.filter(
      (betEvent) => betEvent.event_id !== event_id
    );
    setBetslip(updatedBetslip);

    updateBetslip(updatedBetslip);
  };

  const placeBet = async () => {
    const toSend = {
      events: betslip,
      stake: parseInt(stake),
      possibleWin: totalPayout,
    };

    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/placebet`,
          toSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res) {
          if (res.status === 200) {
            if (res.data.statusCode === 200) {
              setLoading(false);
              setBetPlaced(true);
              setSuccess(res.data.message);
              updateBetslip([]);
              fetchUserData();
            } else {
              setOpenError(true);
              setError(res.data.message);
              setLoading(false);
            }
          } else {
            console.log(res.status);
          }
        }
      } else {
        alert("Oops missing tks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaceBet = () => {
    setLoading(true);
    if (!isLoggedIn) {
      setLoading(false);
      setOpenLogin(true);
    } else {
      placeBet();
    }
  };

  return (
    <div className="bg-gray-500 rounded p-2">
      <p className="text-sm text-white">BET SLIP</p>
      <div className="bg-[#333333] flex flex-col">
        {/* top betslip */}
        <div className="flex justify-between my-1 mx-1 py-2">
          <p
            className="text-orange-600 cursor-pointer"
            onClick={() => handleRemoveAll()}
          >
            Remove All
          </p>
          <p className="text-gray-400 cursor-pointer mr-2">Bet</p>
        </div>

        {/* event */}
        {betslip ? (
          <ScrollArea>
            {betslip.map((betEvent, i) => (
              <div
                key={i}
                className="relative bg-green-500/[0.1] my-1 mx-1 px-2 pt-5 flex justify-between rounded"
              >
                <div className="absolute top-0 right-0 p-2">
                  <p
                    className="text-red-500 cursor-pointer "
                    onClick={() => handleDeleteEvent(betEvent.event_id)} // Call your delete function here
                  >
                    X
                  </p>
                </div>
                <div className="flex flex-col gap-y-1 md:w-[70%]">
                  <p className="text-[0.8rem] text-gray-200">
                    {betEvent.home} Vs. {betEvent.away}
                  </p>
                  <p className="text-sm text-green-400">{betEvent.selection}</p>
                </div>
                {/* odds and time */}
                <div className="flex md:flex-col md:w-[30%]">
                  <p className="text-sm text-yellow-500">{betEvent.odds}</p>
                  <p className="text-[.7rem] text-gray-200">
                    Starts {betEvent.date}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="bg-orange-500/[0.2]">
            <p className="text-gray-400">Betslip is empty</p>
          </div>
        )}
        {/* end event */}

        {/* end slips */}
        {/* Calculations */}
        <div className="bg-gray-400/[0.1] my-1 mx-1 p-2 flex flex-col gap-y-2 justify-between rounded">
          {/* Balance */}
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-400">Balance</p>
            <p className="text-sm text-gray-100">
              {isLoggedIn && userData && userData.availableBalance
                ? `INR. ${parseInt(userData.availableBalance).toFixed(2)}` ||
                  "Loading"
                : "Login to see balance"}
            </p>
          </div>
          {/* Stake */}
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-400">Stake</p>
            <input
              type="number"
              className="text-sm max-w-[50%] text-gray-50 bg-gray-500 rounded py-1 px-2 focus:text-white text-gray-400"
              value={stake}
              onChange={handleStakeChange}
            />
          </div>
          {/* ODDS */}
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-400">Odds</p>
            <p className="text-sm text-gray-100">{totalOdds.toFixed(2)}</p>
          </div>
          {/* Total payout */}
          <div className="flex justify-between w-full">
            <p className="text-sm text-gray-400">Total Payout</p>
            <p className="text-sm text-gray-100">
              INR. {totalPayout.toFixed(2)}
            </p>
          </div>
          {/* bet action */}
          <button
            type=""
            disabled={loading || totalOdds === 0 || stake == 0 || !stake}
            onClick={() => handlePlaceBet()}
            className={`${
              totalOdds === 0 ? "bg-green-700/[0.2]" : "bg-orange-600"
            } py-1 rounded font-bold text-white my-1`}
          >
            {stake === 0
              ? "ENTER STAKE"
              : loading
              ? "Loading ..."
              : "PLACE BET"}
            {/* {stake === 0 && } */}
          </button>
        </div>
      </div>
      <Modal
        opened={betPlaced}
        onClose={() => {
          setBetPlaced(false);
          location.reload();
        }}
        title="Bet status"
        size={"xl"}
      >
        <p className="text-green-900 font-bold">Bet placed successfully</p>
      </Modal>
      <Modal
        opened={openError}
        onClose={() => setOpenError(false)}
        title="Bet status"
        size={"xl"}
      >
        <p className="text-green-900 font-bold">{error}</p>
      </Modal>
    </div>
  );
};

export default Betslip;
