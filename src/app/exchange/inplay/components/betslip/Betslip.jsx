"use client";
// import { AuthContext } from "@/app/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { ExchangeBetslipContext } from "src/app/context/exchange/UserExchangeBetslipContext";
import { updateProfit } from "@/app/exchange/(e)/ev_c/components/MarketComponent";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


const Betslip = () => {
  const { positionData, updateBetslip } = useContext(ExchangeBetslipContext);
  const [backbets, setBackbets] = useState([])
  const [laybets, setLaybets] = useState([])




  const filterBets = (bet_type, data) => {
    if (data) {
      const filtered_data = data.filter(bet_obj => bet_obj.type === bet_type)
      if (filtered_data) {

        return filtered_data
      }
    } else {
      const filtered_data = positionData.filter(bet_obj => bet_obj.type === bet_type)
      if (filtered_data) {
        return filtered_data
      }
    }

  }

  const filterPrep = () => {
    setLaybets(filterBets("lay"))
    setBackbets(filterBets("back"))
  }

  useEffect(() => {
    filterPrep()
  }, [positionData])

  const deleteBetSelection = (bet_id) => {
    const updatedBetslip = positionData.filter(bet => bet.bet_id != bet_id)
    if (updateBetslip.length > 0) {
      updateBetslip(updatedBetslip)
      filterPrep()

    }

  }

  const handleRemoveAll = () => {
    updateBetslip([])
  }
  return (
    <div className="rounded">
      <div className="flex justify-between items-center py-1">
        <p className="text-sm text-white">My Bets</p>
        <div className="flex items-center hover:bg-gray-500/[0.5] cursor-pointer rounded"
        onClick={()=>window.location.replace("/exchange/ds/bets")}
        >
          <p className="text-[0.8rem] font-small">See More</p>
          <KeyboardDoubleArrowRightIcon fontSize="smaller" className="animate-bounce" color="warning" />
        </div>
      </div>
      <div className="bg-[#333333] flex flex-col min-h-[10vh]">
        {/* top betslip */}
        {/* <div className="flex justify-between my-1 mx-1 py-2">
          <p
            className="text-orange-600 cursor-pointer"
            onClick={() => handleRemoveAll()}
          >
            Remove All
          </p>
          <p className="text-gray-400 cursor-pointer mr-2">Bet</p>
        </div> */}

        <div className="flex flex-col">

          {
            backbets && backbets.length > 0 && (
              <div>
                <div className="grid grid-cols-12 gap-x-2 p-1 bg-[#7EBCEE]">
                  <div className="col-span-6 flex">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Back {"(Bet For)"}</h4>
                  </div>
                  <div className="col-span-2 flex">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Odds</h4>
                  </div>
                  <div className="col-span-2 flex ">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Stake</h4>
                  </div>
                  <div className="flex col-span-2">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Profit</h4>
                  </div>
                </div>

                {
                  backbets.map((backBet, i) => {
                    return (
                      <div className="grid grid-cols-12 gap-x-2 m-1 items-center bg-[#7EBCEE]/[0.2]" key={i}>
                        <div className="col-span-6 flex">
                          <div className="flex gap-x-2">
                            {/* <p className="text-sm"
                              onClick={() => deleteBetSelection(backBet.eventId)}
                            >x</p> */}
                            <p className="text-[0.8rem] text-white">{backBet.selection}</p>
                          </div>
                        </div>
                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {backBet.price}
                          </p>
                        </div>
                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {backBet.stake}
                          </p>
                        </div>

                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {updateProfit(backBet.stake, backBet.price)}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          }


          {
            laybets && laybets.length > 0 && (
              <div>
                <div className="grid grid-cols-12 gap-x-2 p-1 bg-[#F4AFD9]">
                  <div className="col-span-6 flex">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Lay {"(Against)"}</h4>
                  </div>
                  <div className="col-span-2 flex">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Odds</h4>
                  </div>
                  <div className="col-span-2 flex ">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Stake</h4>
                  </div>
                  <div className="flex col-span-2">
                    <h4 className="text-[0.9rem] font-medium text-gray-800 tracking-wide">Liability</h4>
                  </div>
                </div>
                {
                  laybets.map((layBet, i) => {
                    return (
                      <div className="grid grid-cols-12 gap-x-2 m-1 items-center bg-[#F4AFD9]/[0.2]" key={i}>
                        <div className="col-span-6 flex">
                          <div className="flex gap-x-2">
                            {/* <p className="text-sm" onClick={() => deleteBetSelection(layBet.eventId)}>x</p> */}
                            <p className="text-[0.8rem] text-white">{layBet.selection}</p>
                          </div>
                        </div>
                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {layBet.price}
                          </p>
                        </div>
                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {layBet.stake}
                          </p>
                        </div>
                        <div className="col-span-2 flex">
                          <p className="w-full text-black text-[0.8rem] bg-gray-300 tracking-wide pl-1" >
                            {updateProfit(layBet.stake, layBet.price)}
                          </p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          }


        </div>

      </div>

    </div>
  );
};

export default Betslip;
