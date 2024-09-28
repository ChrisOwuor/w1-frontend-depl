
import React, { useContext, useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { AuthContext } from "@/app/context/AuthContext";
import { NAVContext } from "@/app/context/NavContext";
import { fetchPL } from "@/app/api/exchange";

const stylings = {
  header: `text-start p-3`,
  body: `px-3 py-2 text-gray-100 text-start text-[0.8rem] font-bold tracking-wide`,
  bodyTT: `px-3 py-1 text-gray-100 text-start text-[0.8rem] font-bold tracking-wide`
}


function calculateTotalProfitLoss(arrayOfObjects) {
  const totalProfitLoss = arrayOfObjects.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.profitLoss;
  }, 0);
  return totalProfitLoss;
}



const ProfitLoss = () => {
  const { userData } = useContext(AuthContext)
  const { setCurrentCenter } = useContext(NAVContext)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [totalPL, setTotalPL] = useState("")
  const [pl, setPl] = useState([])

  useEffect(() => {
    (async () => {
      const pl_arr = await fetchPL()
      if (pl_arr.length > 0) {
        setPl(pl_arr);
        const total_pl = calculateTotalProfitLoss(pl_arr)
        setTotalPL(total_pl)
      }
    })()
  }, [])
  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex justify-between items-center pb-2">
        <p className='font-bold text-gray-300 text-[0.885rem] tracking-wide mt-2 mx-1'>Profit & Loss</p>
        <div className="flex justify-end items-center cursor-pointer" onClick={() => setCurrentCenter("home")}>
          <KeyboardDoubleArrowLeftIcon className="text-orange-400" fontSize="small" />
          <p className="text-gray-200 font-bold text-[0.8rem]">Home</p>
        </div>
      </div>
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
              Event Name
            </th>
            <th scope="col" className={`${stylings.header}`}>
              Profit/Loss
            </th>
          </tr>
        </thead>
        <tbody className="bg-blue-500/[0.3]">


          {userData != {} && pl && pl.length > 0 && pl.reverse().map((item, index) => (
            <tr key={index} className="border-b border-gray-700 hover:bg-gray-900/[0.5]">
              <td className={`${stylings.body}`}>{item.sportName}</td>
              <td className={`${stylings.body}`}>{item.profitLoss < 0 ? <span className="text-red-500">{parseFloat(item.profitLoss).toFixed(2)}</span> : <span className="text-green-400">{parseFloat(item.profitLoss).toFixed(2)}</span>}</td>
            </tr>
          ))}
          <tr className="bg-green-500/[0.2] hover:bg-gray-900/[0.5]">
            <td className={`${stylings.bodyTT}`}>Total</td>
            <td className={`${stylings.bodyTT}`}>{totalPL && parseFloat(totalPL).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {pl.length == 0 && (
        <p className="px-3 py-2 text-[0.8rem] font-bold tracking-wide">No data at the moment</p>
      )}
      {/* {userData != {} && userData.accountStatements && userData.accountStatements.length > 0 && <Pagenav accountStatements={userData.accountStatements} />} */}
    </div>
  );
}


export default ProfitLoss