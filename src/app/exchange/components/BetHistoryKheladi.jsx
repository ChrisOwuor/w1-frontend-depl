import React, { useContext, useEffect, useState } from "react";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";
import { formatTime } from "../utils/competitionCollase";
import { AuthContext } from "@/app/context/AuthContext";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NAVContext } from "@/app/context/NavContext";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Modal, Group, Tooltip } from "@mantine/core";
export default function BetHistoryKheladi() {
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
      let filteredBets = (casinoBets && [...casinoBets]) || [];

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
          (bet) => bet.sport_name === eventType
        );
      }
      
//  if (eventType && eventType !== "All") {
//    filteredBets = filteredBets.filter(
//      (bet) => bet.sport_name === eventTypeAdjusted
//    );
      //  }
     

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
  return (
    <div className="px-[12px] ">
      <div className="loginpage">
        <div className="rw  ">
          <div className="kh:px-[12px] ">
            <div className="header-password -px-[12px] mt-[1rem] flex-flex-wrap">
              <div className="px-[0.5rem] w-full">
                <div className="headerLine">
                  <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                    Unsettled Bets
                  </h6>
                </div>
              </div>
            </div>
            <div className=" my-[15px] mx-0" id="filter">
              <form action="">
                <div className="filter-contents flex flex-wrap w-full ">
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%] shrink-0 grow-1 basis">
                    <select
                      onChange={(e) => {
                        const selectedEvent = e.target.value;
                        if (selectedEvent === "Casino") {
                          setEventType("Casino");
                          setStartDate(getCurrentDate());
                          setEndDate(getCurrentDate());
                        } else {
                          setEventType(
                            selectedEvent === "Football"
                              ? "Soccer"
                              : selectedEvent
                          );
                        }
                      }}
                      name=""
                      id=""
                      class="form-control  w-full block ng-pristine ng-valid ng-touched"
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
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <input
                      _ngcontent-mow-c83=""
                      type="date"
                      id="start_date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      placeholder="Start Date"
                      formcontrolname="start_date"
                      class="form-control w-full  ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <input
                      _ngcontent-mow-c83=""
                      type="date"
                      id="end_date"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      placeholder="End Date"
                      formcontrolname="end_date"
                      class="form-control w-full block  ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <button _ngcontent-mow-c83="" type="submit" class="btn-get">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            {eventType === "Casino" ? (
              <div className="overflow-x-auto casino">
                <table
                  style={{ borderCollapse: "collapse" }}
                  className="w-full bg-white text-sm mb-[1rem] overflow-x-auto text-left rtl:text-right text-black"
                >
                  <thead className="overflow-x-auto">
                    <tr className="whitespace-nowrap overflow-x-auto">
                      <th scope="col" className="">
                        No
                      </th>
                      <th scope="col" className="">
                        Event Name
                      </th>

                      <th scope="col" className="">
                        Nation
                      </th>

                      <th scope="col" className="">
                        Event Type
                      </th>
                      <th scope="col" className="">
                        Market Name
                      </th>
                      <th scope="col" className="">
                        Side
                      </th>
                      <th scope="col" className="">
                        Rate
                      </th>
                      <th scope="col" className="">
                        Amount
                      </th>
                      <th scope="col" className="">
                        Place Date
                      </th>
                      <th scope="col" className="">
                        Match Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {betsGap.length > 0 &&
                      betsGap.map((betObj, i) => {
                        const dateTime = formatTime(betObj.betPlacingTime);
                        const finishTime = formatTime(betObj.betFinishingTime);
                        if (betObj.gap_bet_id) {
                          return (
                            <tr key={i}>
                              <td>{betObj.game_name}</td>
                              <td>{parseFloat(betObj.stack).toFixed(2)}</td>

                              <td>
                                {betObj.bet_status == "BET_PLACED"
                                  ? "PENDING"
                                  : betObj.bet_status}
                              </td>
                              <td>
                                {(betObj.result_amount &&
                                  parseFloat(betObj.result_amount).toFixed(
                                    2
                                  )) ||
                                  "--"}
                              </td>
                              <td>{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                              <td>{`${finishTime.day}/${finishTime.month} ${finishTime.hour}:${finishTime.minute}:${finishTime.second}`}</td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto other-sports">
                <table
                  style={{ borderCollapse: "collapse" }}
                  className="w-full bg-white text-sm mb-[1rem] overflow-x-auto text-left rtl:text-right text-black"
                >
                  {" "}
                  <thead className="overflow-x-auto">
                    <tr className="whitespace-nowrap overflow-x-auto">
                      <th scope="col" className="">
                        No
                      </th>
                      <th scope="col" className="">
                        Event Name
                      </th>

                      <th scope="col" className="">
                        Nation
                      </th>

                      <th scope="col" className="">
                        Event Type
                      </th>
                      <th scope="col" className="">
                        Market Name
                      </th>
                      <th scope="col" className="">
                        Side
                      </th>
                      <th scope="col" className="">
                        Rate
                      </th>
                      <th scope="col" className="">
                        Amount
                      </th>
                      <th scope="col" className="">
                        Place Date
                      </th>
                      <th scope="col" className="">
                        Match Dates
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {bets.length > 0 &&
                      bets.map((betObj, i) => {
                        const dateTime = formatTime(betObj.createdAt);
                        if (betObj.casino_id) {
                          return (
                            <tr
                              key={i}
                            >
                              <td >{betObj.casino_id}</td>
                              <td >N/A</td>
                              <td >N/A</td>
                              <td
                                
                              >{`${betObj.selection} | Round ID${betObj.round_id}`}</td>
                              <td >{betObj.type}</td>
                              <td >
                                {parseFloat(betObj.rate).toFixed(2)}
                              </td>
                              <td >
                                {betObj.type === "back"
                                  ? parseFloat(betObj.stack).toFixed(2)
                                  : (
                                      parseFloat(betObj.stack) *
                                      (parseFloat(betObj.rate) - 1)
                                    ).toFixed(2)}
                              </td>

                              {/* <td className={`${styles_01}`}>{betObj.processed ? betObj.win === "WON" ? <span className='text-green-500'>+{(parseFloat(betObj.price || betObj.rate) * parseFloat(betObj.stack) - parseFloat(betObj.stack)).toFixed(2)}</span> : betObj.win === "LOST" ? <span className='text-red-500'>-{(betObj.stack).toFixed(2)}</span> : "--" : "--"}</td> */}
                              <td
                                
                              >{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr
                              key={i}
                              className={` whitespace-nowrap overflow-x-auto `}
                            >
                              <td >{betObj.sport_name}</td>
                              <td >{betObj.match_name}</td>
                              <td >
                                {betObj.market_name}
                              </td>
                              <td >
                                {betObj.selection_name}
                              </td>
                              <td >{betObj.type}</td>
                              <td >
                                {parseFloat(betObj.price).toFixed(2)}
                              </td>
                              <td >
                                {betObj.type === "back"
                                  ? parseFloat(betObj.stack).toFixed(2)
                                  : (
                                      parseFloat(betObj.stack) *
                                      (parseFloat(betObj.price) - 1)
                                    ).toFixed(2)}
                              </td>

                              {/* <td className={`${styles_01}`}>{betObj.processed ? betObj.win === "WON" ? <span className='text-green-500'>+{(parseFloat(betObj.price) * parseFloat(betObj.stack) - parseFloat(betObj.stack)).toFixed(2)}</span> : betObj.win === "LOST" ? <span className='text-red-500'>-{(betObj.stack).toFixed(2)}</span> : "--" : "--"}</td> */}
                              <td
                                
                              >{`${dateTime.day}/${dateTime.month} ${dateTime.hour}:${dateTime.minute}:${dateTime.second}`}</td>
                            </tr>
                          );
                        }
                      })}
                  </tbody>
                </table>
              </div>
            )}

            {/* <div className="overflow-x-auto w-full ">
              <table
                style={{ borderCollapse: "collapse" }}
                className="w-full bg-white text-sm mb-[1rem]  text-left rtl:text-right text-black"
              >
                <thead className="">
                  <tr className="">
                    <th scope="col">No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Event</th>
                    <th scope="col">Comm In</th>
                    <th scope="col">Comm Out</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Info</th>
                  </tr>
                </thead>
                <tbody className="">
                  {userData != {} &&
                    pl &&
                    pl.length > 0 &&
                    pl.reverse().map((item, index) => (
                      <tr key={index} className={``}>
                        <td>{item.sportName || item.gameName}</td>
                        <td>
                          {item.profitLoss < 0 ? (
                            <span className="text-red-500">
                              {parseFloat(item.profitLoss).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-green-400">
                              {parseFloat(item.profitLoss).toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td>{parseDateTime(item.settledDate)}</td>
                        <td className={` whitespace-nowrap overflow-x-auto`}>
                          {item.narration}
                        </td>
                        <td className={` text-danger`}>
                          {item.debit.toFixed(2)}
                        </td>
                        <td className={` text-success`}>
                          {item.credit.toFixed(2)}
                        </td>
                        <td className={` text-success`}>
                          {item.runningBalance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div> */}

            {/* {pl.length === 0 && (
              <p className=" py-2 text-[13px] text-black tracking-wide">
                No data found
              </p>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
