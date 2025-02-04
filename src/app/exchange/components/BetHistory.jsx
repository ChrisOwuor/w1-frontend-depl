import React, { useContext, useEffect, useState } from "react";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import { formatTime } from "../utils/competitionCollase";
import { AuthContext } from "@/app/context/AuthContext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NAVContext } from "@/app/context/NavContext";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Modal, Group, Tooltip } from "@mantine/core";

const BetHistory = () => {
  const { userData } = useContext(AuthContext);
  const { setCurrentCenter } = useContext(NAVContext);
  const [eventType, setEventType] = useState("Casino");
  const [startDate, setStartDate] = useState(Date.now());
  const [endDate, setEndDate] = useState(Date.now());
  const [bets, setBets] = useState([]);
  const [betsGap, setBetsGap] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [allBets, setAllBets] = useState([]);
  const [casinoBets, setCasinoBets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialFetch, setInitialFetch] = useState(false);

  // Function to get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    // Set startDate and endDate to the current date
    setStartDate(getCurrentDate());
    setEndDate(getCurrentDate());
  }, []);

  const getBets = async () => {
    try {
      setLoading(true);
      const res = await sendHttpRequest("/bets/mybets", "get");
      if (res.data && res.data.bets) {
        setAllBets(res.data.bets);
        setCasinoBets(res.data.gap_bets);
      } else {
        setAllBets([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBets();
  }, []);

  const filterBets = (eventType, startDate, endDate) => {
    if (eventType == "Casino") {
      let filteredBets = casinoBets && [...casinoBets] || []

      const parseDate = (dateStr) => new Date(dateStr).setHours(0, 0, 0, 0);
      const startDateParsed = startDate ? parseDate(startDate) : null;
      const endDateParsed = endDate ? parseDate(endDate) : null;

      if (
        startDateParsed &&
        endDateParsed &&
        startDateParsed === endDateParsed
      ) {
        filteredBets = filteredBets.filter((bet) => {
          const betDate = parseDate(bet.createdAt);
          return betDate === startDateParsed;
        });
      } else {
        if (startDateParsed) {
          filteredBets = filteredBets.filter(
            (bet) => parseDate(bet.createdAt) >= startDateParsed
          );
        }
        if (endDateParsed) {
          filteredBets = filteredBets.filter(
            (bet) => parseDate(bet.createdAt) <= endDateParsed
          );
        }
      }

      setBetsGap(filteredBets);
      setFilteredIds(filteredBets.map((bet) => bet.gap_bet_id));
    } else {
      let filteredBets = [...allBets];
      const eventTypeAdjusted = eventType === "Football" ? "Soccer" : eventType;

      if (eventType && eventType !== "All") {
        filteredBets = filteredBets.filter(
          (bet) => bet.sport_name === eventTypeAdjusted
        );
      }

      const parseDate = (dateStr) => new Date(dateStr).setHours(0, 0, 0, 0);
      const startDateParsed = startDate ? parseDate(startDate) : null;
      const endDateParsed = endDate ? parseDate(endDate) : null;

      if (
        startDateParsed &&
        endDateParsed &&
        startDateParsed === endDateParsed
      ) {
        filteredBets = filteredBets.filter((bet) => {
          const betDate = parseDate(bet.createdAt);
          return betDate === startDateParsed;
        });
      } else {
        if (startDateParsed) {
          filteredBets = filteredBets.filter(
            (bet) => parseDate(bet.createdAt) >= startDateParsed
          );
        }
        if (endDateParsed) {
          filteredBets = filteredBets.filter(
            (bet) => parseDate(bet.createdAt) <= endDateParsed
          );
        }
      }

      setBets(filteredBets);
      setFilteredIds(filteredBets.map((bet) => bet._id));
    }
  };

  useEffect(() => {
    if (initialFetch) {
      filterBets(eventType, startDate, endDate);
    } else {
      setInitialFetch(true);
    }
  }, [eventType, startDate, endDate, allBets]);

  const delBets = async () => {
    try {
      if (startDate === "" || endDate === "") {
        alert("Both Sport Name, Start Date, and End Date are required!");
        return;
      }
      if (eventType == "Casino") {
        const res = await sendHttpRequest("/bets/delBetsGap", "post", {
          bets: [...filteredIds],
        });
        if (res) {
          alert(`${res.data.message}`);
        }
      } else {
        const res = await sendHttpRequest("/bets/delBets", "post", {
          bets: [...filteredIds],
        });
        if (res) {
          alert(`${res.data.message}`);
        }
      }
      getBets();
    } catch (error) {
      console.log("Something went wrong please contact support");
    }
  };

  const styles_01 = `px-3 py-1 border-b border-gray text-md text-black font-bold tracking-wide`;
  return (
    <div className="relative overflow-x-auto shadow-md min-h-[80vh] p-4">
      <div className="flex justify-between items-center pb-2">
        <p className="font-bold text-black text-[0.885rem] tracking-wide mt-2 mx-1">
          My Bets
        </p>
        <div
          className="flex justify-end items-center cursor-pointer"
          onClick={() => setCurrentCenter("home")}
        >
          <KeyboardDoubleArrowLeftIcon
            className="text-orange-400"
            fontSize="small"
          />
          <p className="text-black font-bold text-base">Home</p>
        </div>
      </div>
      <div className="mb-5 bg-blue-600/[0.8] rounded pt-8 pb-4 px-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="event_name"
            className="font-bold text-base text-white"
          >
            Type
          </label>
          <select
            onChange={(e) => {
              const selectedEvent = e.target.value;
              if (selectedEvent === "Casino") {
                setEventType("Casino");
                setStartDate(getCurrentDate());
                setEndDate(getCurrentDate());
              } else {
                setEventType(
                  selectedEvent === "Football" ? "Soccer" : selectedEvent
                );
              }
            }}
            className="t_c_1 p_1_sm rounded bg-white p-1"
          >
            <option value="Casino">Casino</option>
            {userData &&
              userData.eventList &&
              userData.eventList.length > 0 &&
              userData.eventList.map((event, i) => (
                <option key={i} value={event}>
                  {event === "Football" ? "Soccer" : event}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="start_date" className="font-bold text-base">
            Start Date
          </label>
          <input
            type="date"
            id="start_date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            placeholder="Start Date"
            className="t_c_1 p_1_sm rounded bg-white p-1"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="end_date" className="font-bold text-base">
            End Date
          </label>
          <input
            type="date"
            id="end_date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            placeholder="End Date"
            className="t_c_1 p_1_sm rounded bg-white p-1"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="actions" className="font-bold text-base">
            Actions
          </label>
          <div className="p-1 flex items-center ">
            <Tooltip.Group>
              <Group justify="center">
                <Tooltip
                  openDelay={500}
                  closeDelay={100}
                  position="bottom"
                  offset={2}
                  arrowOffset={15}
                  arrowSize={5}
                  arrowRadius={2}
                  withArrow
                  label="Delete Selected Bet History"
                >
                  <div
                    className="flex items-center bg-gradient-to-r cursor-pointer from-gray-900 to-orange-500 rounded px-2"
                    onClick={() => {
                      delBets();
                    }}
                  >
                    <DeleteTwoToneIcon
                      className="text-orange-100  rounded p-1"
                      fontSize="medium"
                    />
                    <p medium="p_2 font-bold">Delete</p>
                  </div>
                </Tooltip>
              </Group>
            </Tooltip.Group>
          </div>
        </div>
      </div>

      {eventType === "Casino" ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-md font-bold text-black bg-[#E0E7E7]">
              <tr className=" whitespace-nowrap overflow-x-auto">
                <th scope="col" className="px-3 py-2">
                  Game Name
                </th>
                <th scope="col" className="px-3 py-2">
                  Stack
                </th>

                <th scope="col" className="px-3 py-2">
                  Bet Result
                </th>

                <th scope="col" className="px-3 py-2">
                  Amount
                </th>
                <th scope="col" className="px-3 py-2">
                  Bet Placing Time
                </th>
                <th scope="col" className="px-3 py-2">
                  Bet Finishing Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-500/[0.3]">
              {betsGap.length > 0 &&
                betsGap.map((betObj, i) => {
                  const dateTime = formatTime(betObj.betPlacingTime);
                  const finishTime = formatTime(betObj.betFinishingTime);
                  if (betObj.gap_bet_id) {
                    return (
                      <tr
                        key={i}
                        className={` whitespace-nowrap overflow-x-auto border-b border-gray-700 hover:bg-gray-900/[0.5]`}
                      >
                        <td className={styles_01}>{betObj.game_name}</td>
                        <td className={styles_01}>
                          {parseFloat(betObj.stack).toFixed(2)}
                        </td>

                        <td className={styles_01}>
                          {betObj.bet_status == "BET_PLACED"
                            ? "PENDING"
                            : betObj.bet_status}
                        </td>
                        <td className={styles_01}>
                          {(betObj.result_amount &&
                            parseFloat(betObj.result_amount).toFixed(2)) ||
                            "--"}
                        </td>
                        <td
                          className={styles_01}
                        >{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                        <td
                          className={styles_01}
                        >{`${finishTime.day}/${finishTime.month} ${finishTime.hour}:${finishTime.minute}:${finishTime.second}`}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-md font-bold text-black bg-[#E0E7E7]">
              <tr className=" whitespace-nowrap overflow-x-auto">
                <th scope="col" className="px-3 py-2">
                  Sport Name
                </th>
                <th scope="col" className="px-3 py-2">
                  Event Name
                </th>
                <th scope="col" className="px-3 py-2">
                  Market Name
                </th>
                <th scope="col" className="px-3 py-2">
                  Selection
                </th>
                <th scope="col" className="px-3 py-2">
                  Type
                </th>
                <th scope="col" className="px-3 py-2">
                  Odds Req.
                </th>
                <th scope="col" className="px-3 py-2">
                  Stack
                </th>

                <th scope="col" className="px-3 py-2">
                  Bet Placing Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-blue-500/[0.3]">
              {bets.length > 0 &&
                bets.map((betObj, i) => {
                  const dateTime = formatTime(betObj.createdAt);
                  if (betObj.casino_id) {
                    return (
                      <tr
                        key={i}
                        className={` whitespace-nowrap overflow-x-auto border-b border-gray-700 hover:bg-gray-900/[0.5]`}
                      >
                        <td className={styles_01}>{betObj.casino_id}</td>
                        <td className={styles_01}>N/A</td>
                        <td className={styles_01}>N/A</td>
                        <td
                          className={styles_01}
                        >{`${betObj.selection} | Round ID${betObj.round_id}`}</td>
                        <td className={styles_01}>{betObj.type}</td>
                        <td className={styles_01}>
                          {parseFloat(betObj.rate).toFixed(2)}
                        </td>
                        <td className={styles_01}>
                          {betObj.type === "back"
                            ? parseFloat(betObj.stack).toFixed(2)
                            : (
                                parseFloat(betObj.stack) *
                                (parseFloat(betObj.rate) - 1)
                              ).toFixed(2)}
                        </td>

                        {/* <td className={`${styles_01}`}>{betObj.processed ? betObj.win === "WON" ? <span className='text-green-500'>+{(parseFloat(betObj.price || betObj.rate) * parseFloat(betObj.stack) - parseFloat(betObj.stack)).toFixed(2)}</span> : betObj.win === "LOST" ? <span className='text-red-500'>-{(betObj.stack).toFixed(2)}</span> : "--" : "--"}</td> */}
                        <td
                          className={styles_01}
                        >{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr
                        key={i}
                        className={` whitespace-nowrap overflow-x-auto border-b border-gray-700 hover:bg-gray-900/[0.5]`}
                      >
                        <td className={styles_01}>{betObj.sport_name}</td>
                        <td className={styles_01}>{betObj.match_name}</td>
                        <td className={styles_01}>{betObj.market_name}</td>
                        <td className={styles_01}>{betObj.selection_name}</td>
                        <td className={styles_01}>{betObj.type}</td>
                        <td className={styles_01}>
                          {parseFloat(betObj.price).toFixed(2)}
                        </td>
                        <td className={styles_01}>
                          {betObj.type === "back"
                            ? parseFloat(betObj.stack).toFixed(2)
                            : (
                                parseFloat(betObj.stack) *
                                (parseFloat(betObj.price) - 1)
                              ).toFixed(2)}
                        </td>

                        {/* <td className={`${styles_01}`}>{betObj.processed ? betObj.win === "WON" ? <span className='text-green-500'>+{(parseFloat(betObj.price) * parseFloat(betObj.stack) - parseFloat(betObj.stack)).toFixed(2)}</span> : betObj.win === "LOST" ? <span className='text-red-500'>-{(betObj.stack).toFixed(2)}</span> : "--" : "--"}</td> */}
                        <td
                          className={styles_01}
                        >{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* {bets.length === 0 && initialFetch && (
        <p className="px-3 py-1 text-md text-black font-bold tracking-wide">
          No data at the moment
        </p>
      )} */}
    </div>
  );
};

export default BetHistory;
