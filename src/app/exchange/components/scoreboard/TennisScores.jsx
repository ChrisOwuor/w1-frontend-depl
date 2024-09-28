import React, { useState } from 'react'
import { Box, Collapse, Group } from '@mantine/core'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const TennisScores = ({ scores, teamA, teamB }) => {
    console.log(scores)
    const [open, setOpen] = useState(false)

    const onClick = () => {
        setOpen(prev => !prev)
    }
    return (
        <>
            {
                scores && scores.event &&
                <Box mx="auto" className={`flex w-full flex-col bg-orange-400/[0.5] my-2 px-2`}>

                    <Group position="start" mb={5} onClick={onClick} className="p-1">

                        <div className=" grid grid-cols-12 w-full gap-x-1 mt-2">
                            <div className='col-span-4 max-mk:col-span-3 flex flex-col justify-center items-center text-center gap-y-2'>
                                {
                                    scores.event.homeTeam && scores.event.homeTeam.country ? (
                                        <div className="relative">
                                            <img src={`https://api.sofascore.app/api/v1/team/${scores.event.homeTeam && scores.event.homeTeam.id}/image`} alt={`kk`} className='h-[40px] w-[40px]' />
                                        </div>
                                    ) : (
                                        <img src="https://l.ivesoccer.sx/teams/default.png" alt="team-flag" className='w-[35px] h-[35px]' />
                                    )
                                }

                                <p className='max-mk:text-[0.65rem] mk:text-[1rem] font-bold tracking-wider text-gray-50'>
                                    {scores.event.homeTeam && `${scores.event.homeTeam.shortName}`}
                                </p>
                            </div>
                            <div className='col-span-4 max-mk:col-span-6 grid grid-cols-2 text-center  rounded'>
                                <div className="col-span-1 flex flex-col justify-center items-center border-r border-yellow-500/[0.7]">
                                    <p className='text-[1rem] font-bold tracking-wider text-gray-200'>
                                        {scores.event.homeScore && `${scores.event.homeScore.current}`}
                                    </p>

                                </div>
                                <div className="col-span-1 flex flex-col justify-center items-center border-l border-yellow-500/[0.7]">
                                    <p className='text-[1rem] font-bold tracking-wider text-gray-200'>
                                        {scores.event.awayScore && `${scores.event.awayScore.current}`}
                                    </p>

                                </div>
                            </div>
                            <div className='col-span-4 max-mk:col-span-3 flex flex-col justify-center items-center text-center gap-y-2'>

                                {
                                    scores.event.homeTeam && scores.event.homeTeam.country ? (
                                        <div className="relative">
                                            <img src={`https://api.sofascore.app/api/v1/team/${scores.event.awayTeam && scores.event.awayTeam.id}/image`} alt={`kk`} className='h-[40px] w-[40px]' />
                                            {/* <img src={`https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/${scores.event.awayTeam.country.alpha2 || "US"}.svg`} alt={`${scores.event.awayTeam.country.alpha2}`} className='h-[40px] w-[40px]' /> */}
                                        </div>
                                    ) : (
                                        <img src="https://l.ivesoccer.sx/teams/default.png" alt="team-flag" className='w-[35px] h-[35px]' />
                                    )
                                }
                                <p className='max-mk:text-[0.65rem] mk:text-[1rem] font-bold tracking-wider text-gray-50'>
                                    {scores.event.awayTeam && `${scores.event.awayTeam.shortName}`}
                                </p>
                            </div>
                            <div className="col-span-12 grid grid-cols-12 justify-center items-center">
                                {/* <div className="col-span-12 flex justify-center items-center m-1">
                                    <p className='text-[0.8rem] font-bold tracking-wider text-gray-400'>{scores.event.time && scores.event.startTimestamp && (parseInt(scores.event.time.currentPeriodStartTimestamp) - parseInt(scores.event.startTimestamp))}{` "`}</p>
                                </div> */}
                                <div className="col-span-12 flex justify-center items-center m-1">
                                    <p className='text-[0.8rem] font-bold tracking-wider text-gray-300'>{scores.event.status && scores.event.status.description}</p>
                                </div>
                                <div className="col-span-12 flex justify-center items-center mt-4">
                                    {open ? <ArrowDropUpIcon fontSize='small' className='' /> : <ArrowDropDownIcon fontSize='small' />}
                                </div>
                            </div>
                        </div>
                    </Group>


                    <Collapse in={open} className="col-span-12 text-white px-1">

                        <div className="grid grid-cols-5 w-full gap-x-1 mt-2">
                            <div className='col-span-2 text-center flex items-center gap-x-2 justify-end'>
                                <div className="flex items-center gap-x-1">
                                    <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'>
                                        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' />
                                        {/* {scores.score.home.numberOfYellowCards} */}
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' /> {scores.score.home.numberOfRedCards}</p> */}
                                </div>
                                <div className="flex items-center gap-x-1">
                                    {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-400'>T{scores.score.home.numberOfCards}</p> */}
                                </div>

                            </div>
                            <div className='col-span-1 flex justify-center items-center'>
                                <p className='text-[0.8rem] font-bold tracking-wider text-gray-400'>Cards</p>
                            </div>
                            <div className='col-span-2 text-center flex items-center gap-x-2 justify-start'>
                                <div className="flex items-center gap-x-1">
                                    <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'>
                                        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-yellow-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="card" className='h-[20px] w-[20px]' />
                                        {/* {scores.score.away.numberOfYellowCards} */}
                                    </p>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    {/* <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-red-card-football-soccer-flaticons-lineal-color-flat-icons.png" alt="cards" className='h-[20px] w-[20px]' /> {scores.score.away.numberOfRedCards}</p> */}
                                </div>
                                <div className="flex items-center gap-x-1">

                                </div>
                            </div>
                        </div>
                    </Collapse>
                </Box>
            }
        </>
    )
}

export default TennisScores