import React, { useEffect, useState } from 'react'
import { Box, Collapse, Group } from '@mantine/core'
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getScores } from '@/app/api/exchange';

const CricketScores = ({ innings, incidents, scores, matchId }) => {
    const [open, setOpen] = useState(false)
    const [currentCollpsed, setCurrentCollaped] = useState("Scorecard")
    // useEffect(() => {
    //     (async () => {
    //         const scores = await getScores(evId)
    //         if(scores){
    //             console.log(scores)
    //         }
    //     })()
    // }, [matchId])

    const onClick = () => {
        setOpen(prev => !prev)
    }
    return (
        <>
            {
                scores && scores.event &&
                <Box mx="auto" className={`flex w-full flex-col bg-green-600/[0.5] mt-2 rounded-lg`}>

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

                                <p className='max-mk:text-[0.65rem] mk:text-[0.8rem] font-bold tracking-wider text-gray-300/[0.9]'>
                                    {scores.event.homeTeam && `${scores.event.homeTeam.shortName}`}
                                </p>
                            </div>
                            <div className='col-span-4 max-mk:col-span-6 grid grid-cols-2 text-center  rounded'>
                                <div className="col-span-1 flex flex-col justify-center items-end px-2 border-r border-yellow-300/[0.7]">
                                    <p className='text-[1.2rem] font-bold tracking-wider text-orange-500'>
                                        {scores.event && scores.event.homeScore && scores.event.homeScore.innings ? `${scores.event.homeScore.current > scores.event.homeScore.display ? scores.event.homeScore.display : scores.event.homeScore.current}-${scores.event.homeScore.innings.inning1.wickets}` : <span className='min-mk:text-[0.8rem] font-bold max-mk:text-[0.8rem]'></span>}
                                    </p>
                                    <p className='text-[0.9rem] font-bold tracking-wider text-orange-500'>
                                        {scores.event.homeScore && scores.event.homeScore.innings && `${scores.event.homeScore.innings.inning1.overs}`}
                                        {scores.event.homeScore && scores.event.homeScore.innings && <span className='text-[0.85rem]'>ov</span>}
                                    </p>
                                </div>
                                <div className="col-span-1 flex flex-col justify-center items-start px-2 border-l border-yellow-300/[0.7]">
                                    <p className='text-[1.2rem] font-bold tracking-wider text-orange-500'>
                                        {scores.event && scores.event.awayScore && scores.event.awayScore.innings ? `${scores.event.awayScore.current > scores.event.awayScore.display ? scores.event.awayScore.display : scores.event.awayScore.current}-${scores.event.awayScore.innings.inning1.wickets}` : <span className='min-mk:text-[0.8rem] font-bold max-mk:text-[0.8rem]'>Yet to bat</span>}
                                    </p>
                                    <p className='text-[0.9rem] font-bold tracking-wider text-orange-500'>
                                        {scores.event.awayScore && scores.event.awayScore.innings && `${scores.event.awayScore.innings.inning1.overs} `}
                                        {scores.event.awayScore && scores.event.awayScore.innings && <span className='text-[0.85rem]'>ov</span>}
                                    </p>
                                </div>
                            </div>
                            <div className='col-span-4 max-mk:col-span-3 flex flex-col justify-center items-center text-center gap-y-2'>
                                {
                                    scores.event.awayTeam && scores.event.awayTeam.country ? (
                                        <div className="relative">
                                            <img src={`https://api.sofascore.app/api/v1/team/${scores.event.awayTeam && scores.event.awayTeam.id}/image`} alt={`kk`} className='h-[40px] w-[40px]' />
                                        </div>
                                    ) : (
                                        <img src="https://l.ivesoccer.sx/teams/default.png" alt="team-flag" className='w-[35px] h-[35px]' />
                                    )
                                }

                                <p className='max-mk:text-[0.65rem] mk:text-[0.8rem] font-bold tracking-wider text-gray-300/[0.9]'>
                                    {scores.event.awayTeam && `${scores.event.awayTeam.shortName}`}
                                </p>
                            </div>
                            <div className="col-span-12 grid grid-cols-12 justify-center items-center">
                                <div className="col-span-12 grid grid-cols-5 w-full gap-x-1 mt-2">
                                    <div className='col-span-2 text-center flex items-center gap-x-2 justify-end'>
                                        <div className="flex items-center gap-x-1">
                                            <p className='text-[0.8rem] font-bold tracking-wider text-gray-300'>

                                                {scores.event.homeScore && scores.event.homeScore.innings && `${scores.event.homeScore.innings.inning1.runRate}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='col-span-1 flex justify-center items-center'>
                                        <p className='text-[0.8rem] font-bold tracking-wider text-gray-200'>Run Rate</p>
                                    </div>
                                    <div className='col-span-2 text-center flex items-center gap-x-2 justify-start'>
                                        <div className="flex items-center gap-x-1">
                                            <p className='text-[0.8rem] font-bold tracking-wider text-gray-300'>
                                                {scores.event.awayScore && scores.event.awayScore.innings && `${scores.event.awayScore.innings.inning1.runRate}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 flex justify-center items-center">
                                    {open ? <ArrowDropUpIcon fontSize='small' className='' /> : <ArrowDropDownIcon fontSize='small' />}
                                </div>
                            </div>
                        </div>
                    </Group>


                    <Collapse in={open} className="col-span-12 text-white bg-gray-900/[0.5]">
                        <div className="flex items-center bg-orange-400/[0.6] px-1 py-2 gap-x-1">
                            <p className={`${currentCollpsed === "Incidents" && "bg-gray-800"} text-[0.8rem] cursor-pointer rounded text-gray-100 bg-gray-600 p-1`} onClick={() => setCurrentCollaped("Incidents")}>Incidents</p>
                            <p className={`${currentCollpsed === "Scorecard" && "bg-gray-800"} text-[0.8rem] cursor-pointer rounded text-gray-100 bg-gray-600 p-1`} onClick={() => setCurrentCollaped("Scorecard")}>Scoreboard</p>
                        </div>

                        {
                            currentCollpsed === "Scorecard" && (
                                <div className="grid grid-cols-12">
                                    {
                                        innings && innings.length > 0 && innings.map((inning, index) => {
                                            const partnership = inning.partnerships
                                            const battingLine = inning.battingLine
                                            const battingTeam = inning.battingTeam
                                            const bowlingLine = inning.bowlingLine
                                            return (
                                                <div className="col-span-12 grid-cols-12 grid gap-2" key={index}>
                                                    {/* batting */}
                                                    <div className="mt-4 md:col-span-6 col-span-12">
                                                        <div className="flex p-1">
                                                            <p className='max-mk:text-[0.84rem] text-[0.9rem]'>{battingTeam && battingTeam.name}</p>
                                                        </div>
                                                        <div className="grid grid-cols-11 w-full bg-black p-1">
                                                            <div className=" px-1 col-span-7 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">Batter</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">R</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">B</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">4s</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">6s</div>
                                                            {/* <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">SR</div> */}
                                                        </div>
                                                        {
                                                            battingLine && battingLine.map((batter, i) => {
                                                                return (
                                                                    <div className={`grid grid-cols-11 w-full py-1 border-b border-green-500/[0.1] py-1 items-center`} key={i}>
                                                                        <div className=" px-1 col-span-7 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider flex items-center gap-x-2">
                                                                            {batter.playerName}
                                                                            {inning.currentBatsman && inning.currentBatsman.name == batter.playerName && (
                                                                                <p className='text-gray-100 text-[0.75rem] rounded bg-green-500 p-1'>{"Batting"}</p>
                                                                            )}

                                                                        </div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{batter.score}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">{batter.balls}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{batter.s4}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{batter.s6}</div>
                                                                        {/* <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider"></div> */}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>


                                                    {/* bowler */}
                                                    <div className="mt-4 md:col-span-6 col-span-12">
                                                        <div className="flex p-1">
                                                            <p className='max-mk:text-[0.84rem] text-[0.9rem]'>{battingTeam && battingTeam.name}</p>
                                                        </div>
                                                        <div className="grid grid-cols-11 w-full bg-black p-1">
                                                            <div className=" px-1 col-span-5 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">Bowler</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">O</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">M</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">R</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">W</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">NB</div>
                                                            <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">WD</div>
                                                            {/* <div className=" px-1 col-span-1 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">E/R</div> */}
                                                        </div>
                                                        {
                                                            bowlingLine && bowlingLine.map((bowler, i) => {
                                                                return (
                                                                    <div className={`grid grid-cols-11 w-full py-1 border-b border-green-500/[0.1] py-1 items-center`} key={i}>
                                                                        <div className=" px-1 col-span-5 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider flex items-center gap-x-2">
                                                                            {bowler.playerName}
                                                                            {inning.currentBowler && inning.currentBowler.name == bowler.playerName && (
                                                                                <p className='text-gray-100 text-[0.75rem] rounded bg-orange-500 p-1'>{"Bowling"}</p>
                                                                            )}
                                                                        </div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{bowler.over}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">{bowler.maiden}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{bowler.run}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{bowler.wicket}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{bowler.noBall}</div>
                                                                        <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{bowler.wide}</div>
                                                                        {/* <div className=" px-1 col-span-1 text-gray-50 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider"></div> */}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>


                                                    {/* partnership */}

                                                    <div className="mt-4 col-span-12">
                                                        <div className="flex p-1">
                                                            <p className='max-mk:text-[0.84rem] text-[0.9rem]'>{battingTeam && battingTeam.name}</p>
                                                        </div>
                                                        <div className="grid grid-cols-11 w-full bg-black p-1">
                                                            <div className=" px-1 col-span-7 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">Partnership</div>
                                                            <div className=" px-1 col-span-2 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">Runs</div>
                                                            <div className=" px-1 col-span-2 text-yellow-300 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">Balls</div>
                                                        </div>
                                                        {
                                                            partnership && partnership.map((part, i) => {
                                                                return (
                                                                    <div className="grid grid-cols-11 w-full py-1 border-b border-green-500/[0.1] py-1" key={i}>
                                                                        <div className=" px-1 col-span-7 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{`${i + 1}. `}{part.player1.shortName}/{part.player2.shortName}</div>
                                                                        <div className=" px-1 col-span-2 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider ">{part.score}</div>
                                                                        <div className=" px-1 col-span-2 max-mk:text-[0.84rem] text-[0.9rem] font-bold tracking-wider">{part.balls}</div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>


                                                </div>
                                            )
                                        }
                                        )
                                    }

                                </div>
                            )
                        }



                    </Collapse>
                </Box>
            }
        </>
    )
}

export default CricketScores