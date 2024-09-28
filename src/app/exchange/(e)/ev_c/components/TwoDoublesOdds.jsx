import React, { useContext, useEffect, useState } from 'react'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Collapse, Group } from '@mantine/core'
import styling1 from 'src/app/custom_styling/styling'
import { ExchangeBetslipContext } from 'src/app/context/exchange/UserExchangeBetslipContext';


const TwoDoublesOdds = ({ market_title, team1, team2 }) => {

    const [openedd, setOpenedd] = useState(true)

    const onClick = () => {
        setOpenedd(prev => !prev)
    }

    const { positionData, updateBetslip } = useContext(ExchangeBetslipContext);
    const [backBets, setBackBets] = useState([]);


    const updateBetPosition = (selection, market, odds, stake, profit, type) => {
        const bet_id = `${type}${selection}${market}${odds}${stake}${profit}`;

        const newBet = {
            user_selection: selection,
            market: market,
            user_odds: odds,
            user_stake: stake,
            betProfit: profit,
            type: type,
            bet_id: bet_id
        };

        // Use positionData directly instead of prev
        setBackBets(prev => {
            const existingBetIndex = positionData.findIndex(bet => bet.user_selection === selection);

            if (existingBetIndex !== -1) {
                // If the bet with the same user_selection exists in positionData, update it
                return positionData.map((bet, index) =>
                    index === existingBetIndex ? newBet : bet
                );
            } else {
                // If no matching bet is found, append the new bet to positionData
                return [...positionData, newBet];
            }
        });
    };


    const backBetPosition = (selection, market, odds, stake, profit) => {
        updateBetPosition(selection, market, odds, stake, profit, "back");
    };

    const layBetPosition = (selection, market, odds, stake, profit) => {
        updateBetPosition(selection, market, odds, stake, profit, "lay");
    };

    useEffect(() => {
        if (backBets.length > 0) {
            updateBetslip(backBets);
        }
    }, [backBets]);


    return (
        <Box mx="auto" className={`bg-gray-700/[1] w-full`}>
            <Group position="start" mb={5} onClick={onClick} className="bg-gray-900/[0.5] p-2 rounded">
                <div className="flex justify-between text-white items-center w-full">
                    <p className="text-[1rem] font-bold text-white p-1">{market_title}</p>
                    {openedd ? <ArrowDropUpIcon fontSize='small' className='' /> : <ArrowDropDownIcon fontSize='small' />}
                </div>
            </Group>

            <Collapse in={openedd} className="text-white w-full p-1">


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


                <div className="grid grid-cols-12  items-center">


                    {/* event odds */}

                    <div className="col-span-12 grid grid-cols-12 items-center py-1 border-b border-gray-600 ">

                        <p className={`col-span-8 ${styling1.oddsText1}`}>{team1}</p>

                        <div className='col-span-4'>

                            {/* home */}
                            <div className="grid grid-cols-4 gap-x-1 w-full">
                                {/* back */}
                                <div
                                    className={`col-span-2 cursor-pointer`}
                                    onClick={() => backBetPosition(`Back-India, ${market_title}`, market_title, 5, 100, 500)}
                                >

                                    <p className=' bg-green-500/[0.5] text-[0.7rem] text-white text-center py-1'>Make Offer</p>
                                </div>

                                <div
                                    className={`col-span-2 cursor-pointer`}
                                    onClick={() => layBetPosition(`Lay-India, ${market_title}`, market_title, 5, 100, 500)}
                                >
                                    <p className=' bg-green-500/[0.5] text-[0.7rem] text-white text-center py-1'>Make Offer</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className="col-span-12 grid grid-cols-12 items-center py-1 border-b border-gray-600 ">

                        <p className={`col-span-8 ${styling1.oddsText1}`}>{team2}</p>

                        <div className='col-span-4'>
                            {/* home */}
                            {/* home */}
                            <div className="grid grid-cols-4 gap-x-1 w-full">
                                {/* back */}
                                <div
                                    className={`col-span-2 cursor-pointer`}
                                    onClick={() => backBetPosition(`Back-India, ${market_title}`, market_title, 5, 100, 500)}
                                >

                                    <p className=' bg-green-500/[0.5] text-[0.7rem] text-white text-center py-1'>Make Offer</p>
                                </div>

                                <div
                                    className={`col-span-2 cursor-pointer`}
                                    onClick={() => layBetPosition(`Lay-India, ${market_title}`, market_title, 5, 100, 500)}
                                >
                                    <p className=' bg-green-500/[0.5] text-[0.7rem] text-white text-center py-1'>Make Offer</p>
                                </div>

                            </div>

                        </div>
                    </div>



                </div>

            </Collapse>

        </Box>
    )
}

export default TwoDoublesOdds