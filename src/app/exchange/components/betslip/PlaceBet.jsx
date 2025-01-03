import React from 'react'

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const PlaceBet = ({ betObj, setSelectedEventId, handlePlaceBet, event, loadin, setPrice, setStack, stack, price, profit, userData, marketType,  otherMarkets }) => {
    const boxValues = [100, 200, 500, 5000, 10000, 25000, 50000, 100000];
    return (
        <>
            {
                marketType === "bookmaker" && (
                    <div
                        className={`${betObj != {} && betObj.betType != "" && betObj.betType === `back` ? `bg-[#629DDC]/[0.8]` : `bg-[#F4AED8]/[0.8]`} flex flex-col h-full  gap-y-2 p-1 md:p-3 mt-1`}
                    >
                        <div className="flex justify-between items-center max-mk:col-span-3 px-1">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <p className='text-gray-200 text-[0.8rem] mk:text-[1rem]  tracking-wide font-bold'>{betObj != {} && betObj.betType != "" && betObj.betType === `back` ? `Back:` : betObj.betType === `lay` ? "Lay:" : ""}</p>
                                </div>
                                <div className={`flex text-white`}>
                                    {
                                        betObj != {} && betObj.betType != "" && (
                                            <div className="flex gap-x-4 items-center ml-1">

                                                <div className="flex gap-x-1">
                                                    <p className='text-gray-200 text-[0.8rem] mk:text-[1rem] tracking-wide font-bold'>
                                                        {betObj.selection_name}
                                                    </p>
                                                </div>

                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <p className='text-gray-100 text-sm tracking-wide font-bold'>{betObj.betType === `back` ? `Profit:` : betObj.betType === `lay` ? "Liability" : ""}</p>
                                <p className={`${betObj.betType === "back" ? "bg-green-600" : "bg-yellow-600"} py-1 px-2 rounded text-gray-200  text-[0.8rem] tracking-wide font-bold`}>{profit > 0 ? profit : 0}</p>
                            </div>
                        </div>
                        <div className="col-span-3 grid grid-cols-6 items-end">
                            <div className={`flex col-span-1 max-mk:hidden ${otherMarkets == true && hidden}`}>
                                <button
                                    type='button'
                                    className='bg-orange-700 w-full rounded py-2 text-[0.8rem] px-2 mx-1'
                                    onClick={() => setSelectedEventId(null)}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="col-span-4 max-mk:col-span-6">
                                <div className="grid grid-cols-2">
                                    <p className='col-span-1 text-center rounded text-[0.8rem] font-bold py-1 w-full text-gray-700'>Odds</p>
                                    <p className='col-span-1 text-center rounded text-[0.8rem] font-bold py-1 w-full text-gray-700'>Stake</p>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2">
                                    {/* price / odds */}
                                    <div className="flex items-center">

                                        <input type="number" name="odds" id="odds" min="1.0" disabled={marketType === "bookmaker"} onChange={(e) => setPrice(e.target.value)} placeholder={betObj.price && betObj.price} value={price} className='col-span-1 text-center  text-[0.8rem] font-bold py-1 w-full text-gray-700' />
                                    </div>
                                    {/* stack */}
                                    <div className="flex items-center">
                                        <button className='flex items-center justify-center bg-black rounded-l px-5 py-1 w-[20px]' onClick={() => {
                                            setStack((prevStake) => {
                                                const newStake = parseFloat(prevStake) - 1.00;
                                                return newStake >= 0 ? newStake.toFixed(2) : '0.00';
                                            });
                                        }}
                                        >-</button>
                                        <input type="number" name="stack" id="stack" min="50" onChange={(e) => setStack(e.target.value)} placeholder="0" value={stack} className='col-span-1 text-center text-[0.8rem] font-bold py-1 w-full text-gray-700' />
                                        <button className='flex items-center justify-center bg-black rounded-r px-5 py-1 w-[20px]' onClick={() => {
                                            setStack((prevStake) => (prevStake === '' ? '1' : (parseFloat(prevStake) + 1.00).toFixed(2)))
                                        }}
                                        >+</button>
                                    </div>

                                </div>
                            </div>

                            <div className="flex col-span-1  max-mk:hidden">
                                <button
                                    type='button'
                                    disabled={loadin || userData.status === "suspended" || stack == 0}
                                    className={`${userData.status === "suspended" && "bg-yellow-300 text-gray-400"} bg-yellow-500 w-full rounded py-2 text-[0.8rem] px-2 mx-1`}
                                    onClick={() => handlePlaceBet(event)}
                                >
                                    {
                                        loadin ?
                                            "Loading.." :
                                            "Place Bet"
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 grid grid-cols-4 items-end">
                            <div className="flex col-span-2 mk:hidden">
                                <button
                                    type='button'
                                    className='bg-orange-700 w-full rounded py-2 text-[0.8rem] px-2 mx-1'
                                    onClick={() => setSelectedEventId(null)}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="flex col-span-2  mk:hidden">
                                <button
                                    type='button'
                                    disabled={loadin || userData.status === "suspended" || stack == 0}
                                    className={`${userData.status === "suspended" && "bg-yellow-300 text-gray-400"} bg-yellow-500 w-full rounded py-2 text-[0.8rem] px-2 mx-1`}
                                    onClick={() => handlePlaceBet(event)}
                                >
                                    {
                                        loadin ?
                                            "Loading.." :
                                            "Place Bet"
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="w-full grid mk:grid-cols-8 grid-cols-4 gap-1">
                            {boxValues.map((value, index) => (
                                <div key={index} onClick={() => setStack(parseFloat(value))} className='flex justify-center col-span-1   text-center bg-gray-800 hover:bg-gray-600  cursor-pointer border py-1 px-6 border-gray-400 rounded'>
                                    <p className='font-bold text-[0.8rem]'>{value}</p>
                                </div>
                            ))}
                        </div>


                    </div >
                )
            }
            {
                marketType != "bookmaker" && (
                    <div
                        className={`${betObj != {} && betObj.betType != "" && betObj.betType === `back` ? `bg-[#629DDC]/[0.8]` : `bg-[#F4AED8]/[0.8]`} flex flex-col h-full  gap-y-2 p-1 md:p-3 mt-1`}
                    >
                        <div className="flex justify-between items-center max-mk:col-span-3 px-1">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <p className='text-gray-200 text-[0.8rem] mk:text-[1rem]  tracking-wide font-bold'>{betObj != {} && betObj.betType != "" && betObj.betType === `back` ? `Back:` : betObj.betType === `lay` ? "Lay:" : ""}</p>
                                </div>
                                <div className={`flex text-white`}>
                                    {
                                        betObj != {} && betObj.betType != "" && (
                                            <div className="flex gap-x-4 items-center ml-1">

                                                <div className="flex gap-x-1">
                                                    <p className='text-gray-200 text-[0.8rem] mk:text-[1rem] tracking-wide font-bold'>
                                                        {betObj.selection_name}
                                                    </p>
                                                </div>

                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex items-center gap-x-4">
                                <p className='text-gray-100 text-sm tracking-wide font-bold'>{betObj.betType === `back` ? `Profit:` : betObj.betType === `lay` ? "Liability" : ""}</p>
                                <p className={`${betObj.betType === "back" ? "bg-green-600" : "bg-yellow-600"} py-1 px-2 rounded text-gray-200  text-[0.8rem] tracking-wide font-bold`}>{profit > 0 ? profit : 0}</p>
                            </div>
                        </div>
                        <div className="col-span-3 grid grid-cols-6 items-end">
                            <div className="flex col-span-1 max-mk:hidden">
                                <button
                                    type='button'
                                    className='bg-orange-700 w-full rounded py-2 text-sm px-2 mx-1'
                                    onClick={() => setSelectedEventId(null)}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="col-span-4 max-mk:col-span-6">
                                <div className="grid grid-cols-2">
                                    <p className='col-span-1 text-center rounded text-sm font-bold py-1 w-full text-gray-700'>Odds</p>
                                    <p className='col-span-1 text-center rounded text-sm font-bold py-1 w-full text-gray-700'>Stake</p>
                                </div>
                                <div className="grid grid-cols-2 gap-x-2">
                                    {/* price / odds */}
                                    <div className="flex items-center">
                                        {marketType != "fancy" && (
                                            <button className='flex items-center justify-center bg-black rounded-l px-5 py-1 w-[20px]' onClick={() => {
                                                setPrice((prevPrice) => {
                                                    const newPrice = parseFloat(prevPrice) - 0.01;
                                                    return newPrice >= 0 ? newPrice.toFixed(2) : '0.00';
                                                });
                                            }}
                                            >-</button>
                                        )}

                                        <input type="number" name="odds" id="odds" min="1.0" disabled={marketType === "fancy"} onChange={(e) => setPrice(e.target.value)} placeholder={betObj.price && betObj.price} value={price} className='col-span-1 text-center  text-sm font-bold py-1 w-full text-black' />
                                        {marketType != "fancy" && (
                                            <button className='flex items-center justify-center bg-black rounded-r px-5 py-1 w-[20px]' onClick={() => {
                                                setPrice((prevPrice) => (prevPrice === '' ? '0.01' : (parseFloat(prevPrice) + 0.01).toFixed(2)))
                                            }}
                                            >+</button>
                                        )}

                                    </div>
                                    {/* stack */}
                                    <div className="flex items-center">
                                        <button className='flex items-center justify-center bg-black rounded-l px-5 py-1 w-[20px]' onClick={() => {
                                            setStack((prevStake) => {
                                                const newStake = parseFloat(prevStake) - 1.00;
                                                return newStake >= 0 ? newStake.toFixed(2) : '0.00';
                                            });
                                        }}
                                        >-</button>
                                        <input type="number" name="stack" id="stack" min="50" onChange={(e) => setStack(e.target.value)} placeholder="0" value={stack} className='col-span-1 text-center  text-sm font-bold py-1 w-full text-black' />
                                        <button className='flex items-center justify-center bg-black rounded-r px-5 py-1 w-[20px]' onClick={() => {
                                            setStack((prevStake) => (prevStake === '' ? '1' : (parseFloat(prevStake) + 1.00).toFixed(2)))
                                        }}
                                        >+</button>
                                    </div>

                                </div>
                            </div>

                            <div className="flex col-span-1  max-mk:hidden">
                                <button
                                    type='button'
                                    disabled={loadin || userData.status === "suspended" || stack == 0}
                                    className={`${userData.status === "suspended" && "bg-yellow-300 text-gray-400"} bg-yellow-500 w-full rounded py-2 text-[0.8rem] px-2 mx-1`}
                                    onClick={() => handlePlaceBet(event)}
                                >
                                    {
                                        loadin ?
                                            "Loading.." :
                                            "Place Bet"
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="col-span-3 grid grid-cols-4 items-end">
                            <div className="flex col-span-2 mk:hidden">
                                <button
                                    type='button'
                                    className='bg-orange-700 w-full rounded py-2 text-[0.8rem] px-2 mx-1'
                                    onClick={() => setSelectedEventId(null)}
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="flex col-span-2  mk:hidden">
                                <button
                                    type='button'
                                    disabled={loadin || userData.status === "suspended" || stack == 0}
                                    className={`${userData.status === "suspended" && "bg-yellow-300 text-gray-400"} bg-yellow-500 w-full rounded py-2 text-[0.8rem] px-2 mx-1`}
                                    onClick={() => handlePlaceBet(event)}
                                >
                                    {
                                        loadin ?
                                            "Loading.." :
                                            "Place Bet"
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="w-full grid mk:grid-cols-8 grid-cols-4 gap-1">
                            {boxValues.map((value, index) => (
                                <div key={index} onClick={() => setStack(value)} className='flex justify-center col-span-1   text-center bg-gray-800 hover:bg-gray-600  cursor-pointer border py-1 px-6 border-gray-400 rounded'>
                                    <p className='font-bold text-[0.8rem]'>{value}</p>
                                </div>
                            ))}
                        </div>


                    </div >
                )
            }
        </>
    )
}

export default PlaceBet