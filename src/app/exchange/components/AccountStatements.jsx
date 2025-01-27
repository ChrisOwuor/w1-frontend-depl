import React, { useContext, useEffect, useState } from "react";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Modal, Group, Tooltip } from '@mantine/core';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { fetchUserAcStatements, formatDate, getAccountStatements } from "@/app/api/exchange";
import { AuthContext } from "@/app/context/AuthContext";
import { parseDateTime } from "../utils/displayTime";
import { NAVContext } from "@/app/context/NavContext";
import { sendHttpRequest } from "@/app/api/ship_yard/sender";

const stylings = {
  header: `text-start p-3 border-r border-black/[0.3] whitespace-nowrap`,
  body: `border-r border-black/[0.3] whitespace-nowrap px-3 py-2 text-black text-start text-sm font-bold tracking-wide`
}
function sortTransactionsByDateDescending(transactions) {
  return transactions.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Sort in descending order based on createdAt date
    if (dateA < dateB) return 1;
    if (dateA > dateB) return -1;

    // If createdAt dates are equal, sort by inde
    return 0;
  });
}

export default function AccountStatements() {
  const { userData } = useContext(AuthContext)
  const { setCurrentCenter } = useContext(NAVContext)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [acStatementsOg, setAcStatementsOg] = useState([])
  const [acStatements, setAcStatements] = useState([])
  const [statementIds, setStatementIds] = useState([])


  const getAcStatements = async () => {
    try {
      const account_statements = await getAccountStatements({
        username: "",
        start_date: startDate,
        end_date: endDate,
        filter: ""
      });
      if (account_statements) {
        const filterIds = account_statements.map(acStatement => acStatement._id)
        setStatementIds(filterIds)
        const sorted = sortTransactionsByDateDescending(account_statements);
        setAcStatements(sorted);
      }
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    getAcStatements()
  }, [startDate, endDate]);

  useEffect(() => {
    getAcStatements()
  }, [])

   let eventOptions = [
      { value: "ALL", label: "All Sports" },
      { value: "4", label: "Cricket" },
      { value: "1", label: "Football" },
      { value: "2", label: "Tennis" },
      { value: "99998", label: "Int Casino" },
      { value: "99991", label: "Sports book" },
      { value: "7", label: "Horse Racing" },
      { value: "4339", label: "Greyhound Racing" },
      { value: "99990", label: "Binary" },
      { value: "99994", label: "Kabaddi" },
      { value: "2378961", label: "Politics" },
      { value: "7522", label: "Basketball" },
      { value: "7511", label: "Baseball" },
      { value: "20", label: "Table Tennis" },
      { value: "998917", label: "Volleyball" },
      { value: "7524", label: "Ice Hockey" },
      { value: "5", label: "Rugby" },
      { value: "26420387", label: "Mixed Martial Arts" },
      { value: "3503", label: "Darts" },
      { value: "29", label: "Futsal" },
    ];


  const delAcStatements = async () => {
    try {

      if (startDate === "" || endDate === "") {
        alert("Both Start Date, and End Date are required!")
        return
      }
      const res = await sendHttpRequest("/users/dl_ac_sts", "post", {
        acStatementsIds: [...statementIds]
      })
      if (res) {
        alert(`${res.data.message}`)
        getAcStatements()
      }
    } catch (error) {
      console.log("Something went wrong please contact support")
    }
  }
  return (
    <div className="px-[12px] ">
      <div className="loginpage">
        <div className="rw  ">
          <div className="kh:px-[12px]">
            <div className="header-password -px-[12px] mt-[1rem] flex-flex-wrap">
              <div className="px-[0.5rem] w-full">
                <div className="headerLine">
                  <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                    Account Statements
                  </h6>
                </div>
              </div>
            </div>
            <div className=" my-[15px] mx-0" id="filter">
              <form action="">
                <div className="filter-contents flex flex-wrap w-full ">
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%] shrink-0 grow-1 basis">
                    <select
                      name=""
                      id=""
                      class="form-control  w-full block ng-pristine ng-valid ng-touched"
                    >
                      {eventOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
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
            {/* <div className="mb-5 bg-blue-600/[0.8] rounded pt-8 pb-4 px-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
              <div className="flex flex-col col-span-1">
                <label htmlFor="start_date" className="font-bold text-sm">
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
                <label htmlFor="end_date" className="font-bold text-sm">
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
                <label htmlFor="actions" className="font-bold text-sm">
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
                          className="flex items-center bg-danger cursor-pointer rounded px-2 py-1"
                          onClick={() => {
                            delAcStatements();
                          }}
                        >
                          <DeleteTwoToneIcon
                            className="text-orange-100  p-1"
                            fontSize="medium"
                          />
                          <p className="p_2 font-bold ">Delete</p>
                        </div>
                      </Tooltip>
                    </Group>
                  </Tooltip.Group>
                </div>
              </div>
            </div> */}

            <div className="overflow-x-auto w-full ">
              <table style={{borderCollapse:"collapse"}} className="w-full bg-white text-sm mb-[1rem]  text-left rtl:text-right text-black">
                <thead className="">
                  <tr className="">
                    <th scope="col" >
                     No
                    </th>
                    <th scope="col" >
                      Date
                    </th>
                    <th scope="col" >
                      Total
                    </th>
                    <th scope="col" >
                     Balance
                    </th>
                    <th scope="col" >
                      D/C
                    </th>
                    <th scope="col" >
                      Description
                    </th>
                    <th scope="col" >
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody className="">
                  {userData != {} &&
                    acStatements &&
                    acStatements.length > 0 &&
                    acStatements.map((item, index) => (
                      <tr
                        key={index}
                        className={``}
                      >
                        <td >
                          #-{item._id.slice(-6)}
                        </td>
                        <td >{item.marketId}</td>
                        <td >
                          {parseDateTime(item.settledDate)}
                        </td>
                        <td
                          className={` whitespace-nowrap overflow-x-auto`}
                        >
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
            </div>

            {acStatements.length === 0 && (
              <p className="px-3 py-2 text-sm text-gray-500 font-bold tracking-wide">
                No data at the moment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
