
import React, { useState } from 'react'
import MarketComponent from './MarketComponent';



const MatchOdds = ({ eventData }) => {
    const [openedd, setOpenedd] = useState(true);



    return (
        <div className="w-full">
            <div className="grid grid-cols-12 w-full  gap-x- items-center">
                <div className="col-span-8 "></div>

                <div className="col-span-4 ">
                    <div className="grid grid-cols-6 gap-x-1">
                        <div className='col-span-3 flex justify-end  border-gray-500'>
                            <p className='text-white text-[0.9rem] font-bold tracking-wide text-[#7EBCEE]/[0.9]'>Back</p>
                        </div>
                        <div className='col-span-3 flex justify-  border-gray-500 '>
                            <p className='text-white text-[0.9rem] font-bold tracking-wide text-[#F4AFD9]/[0.9]'>Lay</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {
                    eventData && eventData.markets.map((market, i) => {
                        if (market.marketName === "Match Odds") {


                            return (
                                <MarketComponent key={i} market={market} openedd={openedd} eventData={eventData} />
                            )
                        }
                        return null;
                    })
                }
            </div>
            <div className="w-full mt-5 mb-2 py-2 px-1 bg-gradient-to-r from-black to-orange-600/[0.2]">
                <h4 className='font-medium tracking-wide'>Other Markets</h4>
            </div>

            <div className="w-full">
                {
                    eventData && eventData.markets.map(async (market, i) => {
                        if (market.marketName != "Match Odds") {
                            console.log(market)

                            return (
                                <MarketComponent key={i} market={market} openedd={false} eventData={eventData} />
                            )
                        }
                        return null;
                    })
                }
            </div>
        </div>
    )
}

export default MatchOdds


