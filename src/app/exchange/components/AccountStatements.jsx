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
  header: `text-start p-3`,
  body: `px-3 py-2 text-gray-100 text-start text-[0.8rem] font-bold tracking-wide`
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
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex justify-between items-center pb-2">
        <p className='font-bold text-gray-300 text-[0.885rem] tracking-wide mt-2 mx-1'>Account Statements</p>
        <div className="flex justify-end items-center cursor-pointer" onClick={() => setCurrentCenter("home")}>
          <KeyboardDoubleArrowLeftIcon className="text-orange-400" fontSize="small" />
          <p className="text-gray-200 font-bold text-[0.8rem]">Home</p>
        </div>
      </div>
      {/* time filter */}
      <div className="mb-5 bg-blue-600/[0.8] rounded pt-8 pb-4 px-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        <div className='flex flex-col col-span-1'>
          <label htmlFor="start_date" className='font-bold text-[0.8rem]'>Start Date</label>
          <input type="date" id="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} placeholder='Start Date' className='t_c_1 p_1_sm rounded bg-white p-1' />
        </div>
        <div className='flex flex-col col-span-1'>
          <label htmlFor="end_date" className='font-bold text-[0.8rem]'>End Date</label>
          <input type="date" id="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} placeholder='End Date' className='t_c_1 p_1_sm rounded bg-white p-1' />
        </div>
        <div className='flex flex-col col-span-1'>
          <label htmlFor="actions" className='font-bold text-[0.8rem]'>Actions</label>
          <div className="p-1 flex items-center ">
            <Tooltip.Group>
              <Group justify="center">
                <Tooltip openDelay={500} closeDelay={100} position="bottom" offset={2} arrowOffset={15} arrowSize={5} arrowRadius={2} withArrow label="Delete Selected Bet History">
                  <div className="flex items-center bg-gradient-to-r cursor-pointer from-gray-900 to-orange-500 rounded px-2"
                    onClick={() => {
                      delAcStatements()
                    }}>
                    <DeleteTwoToneIcon className='text-orange-100  rounded p-1' fontSize='medium' />
                    <p className="p_2 font-bold">Delete</p>
                  </div>

                </Tooltip>
              </Group>
            </Tooltip.Group>
          </div>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
            <tr className="">
              <th scope="col" className={`${stylings.header}`}>
                Voucher ID
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Market ID
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Settled Date
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Narration
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Debit
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Credit
              </th>
              <th scope="col" className={`${stylings.header}`}>
                Running balance
              </th>
            </tr>
          </thead>
          <tbody className="bg-blue-500/[0.3]">
            {userData != {} && acStatements && acStatements.length > 0 && acStatements.map((item, index) => (
              <tr key={index} className={` whitespace-nowrap overflow-x-auto border-b border-gray-700 hover:bg-gray-900/[0.5]`}>
                <td className={`${stylings.body}`}>#-{item._id.slice(-6)}</td>
                <td className={`${stylings.body}`}>{item.marketId}</td>
                <td className={`${stylings.body}`}>{parseDateTime(item.settledDate)}</td>
                <td className={`${stylings.body} whitespace-nowrap overflow-x-auto`}>{item.narration}</td>
                <td className={`${stylings.body} text-red-500`}>{(item.debit).toFixed(2)}</td>
                <td className={`${stylings.body} text-green-400`}>{(item.credit).toFixed(2)}</td>
                <td className={`${stylings.body} text-green-400`}>{(item.runningBalance).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {acStatements.length === 0 && (
        <p className="px-3 py-2 text-[0.8rem] text-gray-500 font-bold tracking-wide">No data at the moment</p>
      )}
    </div>

  );
}
