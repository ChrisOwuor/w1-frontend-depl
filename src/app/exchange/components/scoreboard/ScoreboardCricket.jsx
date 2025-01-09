import React, { useEffect, useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { INTERVAL } from "@/app/exchange/constants/mktfetchInterval";
import { getScores } from "@/app/api/exchange";

const ScoreboardCricket = ({ matchId }) => {
    const [open, setOpen] = useState(false);
    const [scores, setScores] = useState(null);
    const [isFlashing, setIsFlashing] = useState(false);

    const scoresRunner = async () => {
        try {
            const fetchedScores = await getScores(matchId); 
            if (fetchedScores) {
                setScores(fetchedScores[0]); 
            }
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    };

    useEffect(() => {
        if (matchId) {
            scoresRunner();
            const intervalId = setInterval(() => scoresRunner(), INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [matchId]);

    useEffect(() => {
        const flashInterval = setInterval(() => {
            setIsFlashing(prev => !prev);
        }, 1000);
        return () => clearInterval(flashInterval);
    }, []);

    const toggleCollapse = () => {
        setOpen(!open);
    };

    if (!scores) {
        return <div>Loading...</div>;
    }

    const { home, away } = scores.score || {};
    const stateOfBall = scores.stateOfBall || {};

    return (
        <Box
            mx="auto"
            className="flex w-full flex-col bg-black "
        >
            <div className={`w-full h-0.5 ${isFlashing ? 'bg-green-500' : 'bg-transparent'}`}></div>
            <Group position="start" mb={5} onClick={toggleCollapse} className="">
                <div className="grid grid-cols-12 w-full gap-x-2">
                    {/* Home Team */}
                    <div className="col-span-5 sm:col-span-3 flex flex-col items-center text-center">
                        <p className="font-bold text-md md:text-2xl text-white">{home?.name || "Home Team"}</p>
                        <p className="text-orange-500 text-xs sm:text-sm">
                            {home?.inning1?.runs}/{home?.inning1?.wickets} ({home?.inning1?.overs} ov)
                        </p>
                    </div>
                    {/* Scores Separator */}
                    <div className="col-span-2 sm:col-span-6 flex flex-col items-center text-center">
                        <p className="font-bold text-gray-100">vs</p>
                    </div>
                    {/* Away Team */}
                    <div className="col-span-5 sm:col-span-3 flex flex-col items-center text-center">
                        <p className="font-bold text-md md:text-2xl text-white">{away?.name || "Away Team"}</p>
                        <p className="text-orange-500 text-xs sm:text-sm">
                            {away?.inning1?.runs}/{away?.inning1?.wickets} ({away?.inning1?.overs} ov)
                        </p>
                        {away?.inning2 && (
                            <p className="text-gray-400 sm:text-sm text-xs">
                                2nd Inn: {away.inning2.runs}/{away.inning2.wickets} (
                                {away.inning2.overs} ov)
                            </p>
                        )}
                    </div>
                </div>
            </Group>

            <Collapse in={open} className="text-white bg-gray-800 p-4">
                <div className="flex justify-around text-gray-200">
                    <div className="flex flex-col items-center">
                        <p className="font-bold">Current Bowler</p>
                        <p>{stateOfBall.bowlerName || "N/A"}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold">Appeal</p>
                        <p>{stateOfBall.appealTypeName || "N/A"}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-bold">Over</p>
                        <p>
                            {stateOfBall.overNumber || 0}.{stateOfBall.overBallNumber || 0}
                        </p>
                    </div>
                </div>
            </Collapse>

            <div className="flex justify-center items-center mt-2 cursor-pointer">
                {/* {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} */}
            </div>
        </Box>
    );
};

export default ScoreboardCricket;
