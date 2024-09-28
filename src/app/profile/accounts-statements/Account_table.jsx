import React, { useContext, useEffect, useState } from "react";
import Pagenav from "./Pagenav";
import { formatDate } from "@/app/api/exchange";
import { AuthContext } from "@/app/context/AuthContext";

const stylings = {
  header: `text-start p-3`,
  body: `px-3 py-2 text-gray-100 text-start text-[0.8rem] font-bold tracking-wide`
}

function sortTransactionsByDateDescending(transactions) {
  return transactions.sort((a, b) => new Date(b.settledDate) - new Date(a.settledDate));
}

export default function Account_table() {
  const { userData } = useContext(AuthContext)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [acStatementsOg, setAcStatementsOg] = useState([])
  const [acStatements, setAcStatements] = useState([])




  useEffect(() => {
    if (userData && userData.accountStatements && Array.isArray(userData.accountStatements) && userData.accountStatements.length > 0) {
      const accStatements = userData.accountStatements;
      const sorted = sortTransactionsByDateDescending(accStatements);
      setAcStatements(sorted);
      setAcStatementsOg(sorted);
    }
    
  }, [userData])
  const filter = (startDate, endDate) => {
    let filteredAcs = [...acStatements];

    if (startDate === endDate) {
      const parsedStartDate = new Date(startDate);
      const startDateYear = parsedStartDate.getFullYear();
      const startDateMonth = parsedStartDate.getMonth();
      const startDateDate = parsedStartDate.getDate();
      // console.log(startDateYear === startDateMonth, startDateDate)
      // Filter bets by start date
      filteredAcs = acStatementsOg.filter(acc => {
        const acSettleDate = new Date(acc.settledDate);
        const betDateYear = acSettleDate.getFullYear();
        const betDateMonth = acSettleDate.getMonth();
        const betDateDate = acSettleDate.getDate();
        return betDateYear === startDateYear && betDateMonth == startDateMonth && betDateDate == startDateDate;
      });
      setAcStatements(filteredAcs);
      return
    }

    if (startDate) {
      const parsedStartDate = new Date(startDate);
      const startDateYear = parsedStartDate.getFullYear();
      const startDateMonth = parsedStartDate.getMonth();
      const startDateDate = parsedStartDate.getDate();
      // console.log(startDateYear === startDateMonth, startDateDate)
      // Filter bets by start date
      filteredAcs = acStatementsOg.filter(acc => {
        const acSettleDate = new Date(acc.settledDate);
        const betDateYear = acSettleDate.getFullYear();
        const betDateMonth = acSettleDate.getMonth();
        const betDateDate = acSettleDate.getDate();
        return betDateYear === startDateYear && betDateMonth >= startDateMonth && betDateDate >= startDateDate;
      });
    }
    if (endDate) {
      const parsedEndDate = new Date(endDate);
      const endDateYear = parsedEndDate.getFullYear();
      const endDateMonth = parsedEndDate.getMonth();
      const endDateDate = parsedEndDate.getDate();
      // console.log(endDateYear === endDateMonth, endDateDate)
      // Filter bets by start date
      filteredAcs = filteredAcs.filter(acc => {
        const acSettleDate = new Date(acc.settledDate);
        const betDateYear = acSettleDate.getFullYear();
        const betDateMonth = acSettleDate.getMonth();
        const betDateDate = acSettleDate.getDate();
        return betDateYear === endDateYear && betDateMonth <= endDateMonth && betDateDate <= endDateDate;
      });
    }

    setAcStatements(filteredAcs);
  }


  useEffect(() => {
    if (startDate == "" && endDate == "") {
      filter()
    }
    filter(startDate, endDate)
  }, [startDate, endDate]);

  return (
    <div className="relative overflow-x-auto shadow-md">
      {/* time filter */}
      <div className="mb-5 bg-purple-500/[0.4] rounded pt-8 pb-4 px-2 flex items-center gap-x-2">

        <div className='flex flex-col'>
          <label htmlFor="start_date" className='font-bold text-[0.8rem] '>Start Date</label>
          <input type="date" name="" id="start_date" onChange={(e) => setStartDate(e.target.value)} placeholder='Start Date' className='text-gray-700 rounded bg-gray-300 p-1' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="end_date" className='font-bold text-[0.8rem] '>End Date</label>
          <input type="date" name="" id="end_date" onChange={(e) => setEndDate(e.target.value)} placeholder='End Date' className='text-gray-700 rounded bg-gray-300 p-1' />
        </div>
      </div>


      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
          <tr>
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
          {acStatements.length == 0 && (
            <p className="px-3 py-2 text-[0.8rem] font-bold tracking-wide">No data at the moment</p>
          )}
          {userData != {} && acStatements && acStatements.length > 0 && acStatements.reverse().map((item, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-900/[0.5]">
              <td className={`${stylings.body}`}>{item._id.slice(-4)}</td>
              <td className={`${stylings.body}`}>{item.marketId}</td>
              <td className={`${stylings.body}`}>{formatDate(item.settledDate)}</td>
              <td className={`${stylings.body}`}>{item.narration}</td>
              <td className={`${stylings.body} text-red-500`}>{(item.debit).toFixed(2)}</td>
              <td className={`${stylings.body} text-green-400`}>{(item.credit).toFixed(2)}</td>
              <td className={`${stylings.body} text-green-400`}>{(item.runningBalance).toFixed(2)}</td>

            </tr>
          ))}
        </tbody>
      </table>
      {/* {userData != {} && userData.accountStatements && userData.accountStatements.length > 0 && <Pagenav accountStatements={userData.accountStatements} />} */}
    </div>
  );
}
