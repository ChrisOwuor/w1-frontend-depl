import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NAVContext } from '@/app/context/NavContext';
import LockIcon from '@mui/icons-material/Lock';
import { io } from 'socket.io-client';
import { CasinoContext } from '@/app/context/CasinoContext';
import axios from 'axios';
import { fetchGameData } from '@/app/api/casino/casino';

ChartJS.register(ArcElement, Tooltip, Legend);

const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''} border-white px-1.5 py-0.5 sm:p-2 bg-[#2A3B4B] rounded-lg text-md sm:text-lg font-medium`}>
      {digit}
    </div>
  );
};

const TeenpattiOpen = () => {
  const { activeCasino } = useContext(NAVContext);
  const { openBetForm, setOpenBetForm, setBet } = useContext(CasinoContext);
  const [gameData, setGameData] = useState();
  const [gameResults, setGameResults] = useState([]);
  const [gStatus, setGstatus] = useState(0);

  useEffect(() => {
    const casinoId = "Teenpatti open";

    const updateGameData = async () => {
      const data = await fetchGameData(casinoId);

      if (data) {
        setGameData(data.data);
        setGameResults(data.result);
        const gData = data.data;
      }
    };

    updateGameData(); // Fetch data initially
    const intervalId = setInterval(updateGameData, 1000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);


  const handleUserSelection = ({ data, selection }) => {

    if(data.gstatus == "0"){
      return
    }
    setBet(prev => ({
      ...prev,
      selection: selection,
      round_id: data.mid,
      casino_id: "Teenpatti open",
      rate: data.rate,
    }));

    if (!openBetForm) setOpenBetForm(true);
  };


  return (
    <>
      {
        gameData && gameData.t1 && (
          <div className="relative flex flex-col gap-x-2 bg-black h-[27vh] sm:h-[50vh]">
            <div className="flex items-center justify-between bg-[#2C3E50] p-2">
              <div className="flex gap-x-2 items-center">
                <p className="text-md font-medium">{activeCasino && activeCasino.name}</p>
              </div>
              <div className="flex gap-x-2 items-center">
                <p className="text-md font-medium">Round ID: {gameData && gameData.t1 && gameData.t1[0].mid?.toString().replace('.', '')}</p>

              </div>
            </div>
            <div className="grid grid-cols-12 h-full relative">
              <div className="col-span-2 md:col-span-3 max-md:absolute top-0 left-0 z-999 p-2">
                <div className="flex flex-col ">
                  <p className='sm:text-md text-sm font-bold'>TIGER</p>
                  <div className="flex items-center gap-1 mb-1">
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C1 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C2 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C3 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                  </div>
                </div>


              </div>
              <div className="md:col-span-9 col-span-12 h-full relative">
                <div className="flex justify-center items-center h-full">
                  <iframe
                    src={activeCasino && activeCasino.videoUrl}
                    title="Casino Game Video"
                    width="100%"
                    height="100%"
                    className="rounded"
                    allowFullScreen
                  />
                </div>
                {/* Countdown Timer */}

                <div className="absolute sm:bottom-4 bottom-2 sm:right-4 right-2 justify-end flex gap-x-1 text-white text-3xl font-bold p-2 rounded">
                  {
                    gameData && gameData.t1[0].autotime
                      ? String(gameData.t1[0].autotime).padStart(2, '0').split('').map((digit, index) => (
                        <FlipClockDigit
                          key={index}
                          digit={digit}
                          flip={false}
                        />
                      ))
                      : (
                        <>
                          <FlipClockDigit digit="0" flip={false} />
                          <FlipClockDigit digit="0" flip={false} />
                        </>
                      )
                  }
                </div>

              </div>
            </div>
          </div>
        )
      }

      <div className="grid grid-cols-9 bg-white mx-1 border border-black/[0.3]">
        {/* Header */}
        <div className={`col-span-3 px-3 py-2 flex justify-center border-l border-r border-black/[0.3]`}>
          {/*  */}
        </div>
        <div className={`col-span-2  px-3 py-2 bg-back flex justify-center border-l border-r border-black/[0.3]`}>
          <p className="text-black text-md font-bold whitespace-nowrap">Odds</p>
        </div>
        <div className={`col-span-2  px-3 py-2 bg-back flex justify-center border-l border-r border-black/[0.3]`}>
          <p className="text-black text-md font-bold whitespace-nowrap">Pair Plus</p>
        </div>
        <div className={`col-span-2  px-3 py-2 bg-back flex justify-center border-l border-r border-black/[0.3]`}>
          <p className="text-black text-md font-bold whitespace-nowrap">Total</p>
        </div>
      </div>
      {
        Array.from({ length: 8 }, (_, i) => `Player ${i + 1}`).map((runner, i) => {
          return (
            <div className="grid grid-cols-9 bg-white mx-1 border border-black/[0.3]" key={i}>
              {/* First Column */}
              <div className="col-span-3 px-3 py-2 flex items-center justify-start border-r border-black/[0.3]">
                <p className="text-black text-md font-bold">{runner}</p>
              </div>

              {/* Odds Column */}
              <div
                className={`col-span-2 px-3 py-2 bg-back flex justify-center border-l border-r border-black/[0.3] ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" ? "relative" : ""}`}
                onClick={() => handleUserSelection({
                  data: { ...gameData.t2.find(item => item.nation === runner) },
                  selection: `Odds ${i + 1}`,
                })}
              >
                {gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
                <p className="font-bold text-black text-md md:text-xl">
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.rate}
                </p>
              </div>

              {/* Pair Plus Column */}
              <div
                className={`col-span-2 px-3 py-2 bg-back flex justify-center border-l border-r border-black/[0.3] ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" ? "relative" : ""}`}
                onClick={() => handleUserSelection({
                  data: { ...gameData.t2.find(item => item.nation === runner) },
                  selection: `Pair plus ${i + 1} `,
                })}
              >
                {gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
                <p className="font-bold text-black text-sm  sm:text-xl whitespace-nowrap">
                  {`Pair plus ${i + 1}`}
                </p>
              </div>

              {/* Dragon Column */}
              <div
                className={`col-span-2 px-3 py-2 bg-back flex justify-center border-l border-black/[0.3] ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" ? "relative" : ""}`}
                onClick={() => handleUserSelection({
                  data: { ...gameData.t2.find(item => item.nation === runner) },
                  selection: `Total ${i + 1}`,
                })}
              >
                {gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.gstatus === "0" && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
                <p className="font-bold text-black text-md md:text-xl">
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === runner)?.rate}
                </p>
              </div>
            </div>
          );
        })
      }




      {/* RESULT */}
      <div className="relative flex flex-col mt-2">
        <div className="flex items-center justify-between bg-[#2C3E50] p-2">
          <div className="flex gap-x-2 items-center">
            <p className="text-sm sm:text-md font-medium">Last Result</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="text-sm sm:text-md font-bold">View All</p>
          </div>
        </div>
        <div className="flex sm:gap-x-2 gap-x-1  overflow-x-scroll  justify-center items-center px-6 py-3">

          {gameResults && gameResults.map((item, index) => {
            if (item.result == 11) {
              return (
                <p className="bg-[#355E3B] text-[#FF4512] px-3.5 sm:py-1.5 py-2 rounded-full text-sm sm:text-lg font-bold">
                  T
                </p>
              )
            } else if (item.result == 31) {
              return (
                <p className="bg-[#355E3B] text-[#33C7FE] px-3.5 sm:py-1.5 py-2 rounded-full text-sm sm:text-lg font-bold">
                  D
                </p>
              )
            } else if (item.result == 21) {
              return (
                <p className="bg-[#355E3B] text-[#FFFF33] px-3.5 sm:py-1.5 py-2 rounded-full text-sm sm:text-lg font-bold">
                  L
                </p>
              )
            }
          })}
        </div>
      </div>
    </>
  );
};

export default TeenpattiOpen;
