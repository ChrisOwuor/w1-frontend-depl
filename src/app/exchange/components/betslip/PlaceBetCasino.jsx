import { CasinoContext } from '@/app/context/CasinoContext';
import React, { useContext } from 'react';
import { placeCasinoBet } from '../casino/casino';

const PlaceBetCasino = () => {
  const { bet, setBet, setOpenBetForm, openBetForm, profit } = useContext(CasinoContext)

  const handleStackChange = (value) => {
    setBet({ ...bet, stack: value });
  };

  const handlePlaceBet = async()=>{
    try {
      const res = await placeCasinoBet(bet)
      setOpenBetForm(false)
    } catch (error) {
      console.error(error)
    }
  }
  if (openBetForm) return (
    <>
      {/* Mobile View */}
      <div className="flex flex-col min-h-[20vh] bg-back w-full sm:hidden">
        <div className="flex items-center justify-between p-2 bg-warning w-full">
          <p className='text-lg text-white font-bold'>Place bet</p>
          <p className='text-lg font-bold uppercase text-white' onClick={() => { setOpenBetForm(false) }}>x</p>
        </div>


        <div className=" items-cente p-2 bg-gray w-full hidden">
          <div className="sm:col-span-4 col-span-3">
            <p className='text-md font-medium text-black'>(Bet for)</p>
          </div>
          <div className="col-span-1">
            <p className='text-md font-medium text-black'>Odds</p>
          </div>
          <div className="sm:col-span-2 col-span-3 flex items-center">
            <p className='text-md font-medium text-black'>Stake</p>
          </div>
          <div className="col-span-1">
            <div className="flex justify-end items-center">
              <p className='text-md font-medium text-black'>Profit</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-4 items-cente p-2 bordre-b border-gray w-full">
          <div className="sm:col-span-4 col-span-3">
            <p className='text-md font-medium text-black'><span className='text-danger text-md font-bold mr-1'>X</span> {bet && bet.selection}</p>
          </div>
          <div className="col-span-1">
            <p className='text-sm font-medium text-black bg-white py-1 px-3'>{bet.rate}</p>
          </div>
          <div className="sm:col-span-2 col-span-3 flex items-center">
            <input
              type="number"
              name="stack"
              id="stack"
              value={bet.stack}
              onChange={(e) => {
                setBet(prev => ({
                  ...prev,
                  stack: e.target.value
                }))
              }}
              className='text-sm font-medium text-black bg-white sm:max-w-[4vw] max-w-20 p-1' />
          </div>
          <div className="col-span-1 hidden">
            <div className="flex justify-end items-center">
              <p className='text-md font-medium text-black'>{profit}</p>
            </div>
          </div>

        </div>
        <div className="flex items-center justify-end p-2">
          <p className='py-1 px-4 cursor-pointer rounded bg-secondary text-white' onClick={()=>handlePlaceBet(bet)}>Submit</p>
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-1 mt-2 p-2">
          {[{ btnValue: 25 }, { btnValue: 50 }, { btnValue: 100 }, { btnValue: 200 }, { btnValue: 500 }, { btnValue: 1000 },].map((item, index) => {
            return (
              <div
                className="col-span-1 bg-black flex justify-center items-center rounded text-white p-1 font-bold text-md cursor-pointer"
                key={index}
                onClick={() => handleStackChange(item.btnValue)}>
                {item.btnValue}
              </div>
            )
          })}
        </div>

        <div className="items-center justify-between flex p-2">
          <p className='text-md font-medium text-black'>Range:100 to 5L </p>
          <div className="flex items-center gap-x-2">
            <p className='py-2 px-4 cursor-pointer rounded text-white text-md font-bold bg-[#097C93]'>Edit</p>


          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="flex flex-col min-h-[20vh] bg-back w-full max-sm:hidden mb-10">
        <div className="flex items-center justify-between p-2 bg-[#2C3E50] w-full">
          <p className='text-md font-medium text-white'>Place Bet</p>
          <p className='text-md font-medium text-white'>Range:100 to 5L </p>
        </div>

        <div className="grid grid-cols-8 items-cente p-2 bg-gray w-full">
          <div className="sm:col-span-4 col-span-3">
            <p className='text-md font-medium text-black'>(Bet for)</p>
          </div>
          <div className="col-span-1">
            <p className='text-md font-medium text-black'>Odds</p>
          </div>
          <div className="sm:col-span-2 col-span-3 flex items-center">
            <p className='text-md font-medium text-black'>Stake</p>
          </div>
          <div className="col-span-1">
            <div className="flex justify-end items-center">
              <p className='text-md font-medium text-black'>Profit</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 gap-x-2 items-cente p-2 bordre-b border-gray w-full">
          <div className="sm:col-span-4 col-span-3">
            <p className='text-md font-medium text-black'><span className='text-danger text-md font-bold mr-1'>X</span> {bet && bet.selection}</p>
          </div>
          <div className="col-span-1">
            <p className='text-sm font-medium text-black bg-white p-1'>{bet.rate}</p>
          </div>
          <div className="sm:col-span-2 col-span-3 flex items-center">
            <input type="number" name="stack" id="stack"
              value={bet.stack}
              onChange={(e) => {
                setBet(prev => ({
                  ...prev,
                  stack: e.target.value
                }))
              }} className='text-sm font-medium text-black bg-white sm:max-w-[4vw] max-w-20 p-1' />
          </div>
          <div className="col-span-1">
            <div className="flex justify-end items-center">
              <p className='text-md font-medium text-black'>{(parseFloat(bet.rate || 0) * parseFloat(bet.stack || 0)).toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-2 gap-y-1 mt-2 p-2">
          {[{ btnValue: 25 }, { btnValue: 50 }, { btnValue: 100 }, { btnValue: 200 }, { btnValue: 500 }, { btnValue: 1000 },].map((item, index) => {
            return (
              <div
                className="col-span-1 bg-[#CCCCCC] flex justify-center items-center rounded text-black p-1 font-bold text-md cursor-pointer"
                onClick={() => handleStackChange(item.btnValue)}
                key={index}>
                {item.btnValue}
              </div>
            )
          })}
        </div>

        <div className="items-center justify-between flex p-2">
          <p className='py-2 px-4 cursor-pointer rounded bg-[#097C93]'>Edit</p>
          <div className="flex items-center gap-x-2">
            <p className='py-2 px-4 cursor-pointer rounded bg-danger'>Reset</p>
            <p className='py-2 px-4 cursor-pointer rounded bg-success' onClick={()=>handlePlaceBet(bet)}>Submit</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceBetCasino;
