import React, { useContext, useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CircleIcon from '@mui/icons-material/Circle';
import { Pie } from 'react-chartjs-2';
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

const Baccarat2Interface = () => {
  const { activeCasino } = useContext(NAVContext);
  const { openBetForm, setOpenBetForm, setBet } = useContext(CasinoContext);
  const [gameData, setGameData] = useState();
  const [gameResults, setGameResults] = useState([]);
  const data = {
    // labels: ['Player', 'Banker', 'Tie'],
    datasets: [
      {
        label: 'Game Statistics',
        data: [45, 50, 5],
        backgroundColor: ['#3b82f6', '#ef4444', '#22c55e'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    const casinoId = "Baccarat 2";

    const updateGameData = async () => {
      const data = await fetchGameData(casinoId);

      if (data) {
        setGameData(data.data);
        setGameResults(data?.result?.length > 0 && data.result || []);
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
      casino_id: "Baccarat 2",
      rate: data.b1,
    }));

    if (!openBetForm) setOpenBetForm(true);
  };


  return (
    <>
      <div className="relative flex flex-col gap-x-2 bg-black h-[27vh] md:h-[47vh]">
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

      <div className="grid grid-cols-12 bg-white border border-black gap-x-4 mt-2 mx-1">
        <div className="md:col-span-3 col-span-12 max-sm:hidden">
          <div className="flex justify-center items-center w-full">
            <p className="text-lg font-medium text-black">Statistics</p>
          </div>
          <div className="flex justify-end pr-20 items-center">
            <div className="flex flex-col justify-start">
              <div className="flex items-center gap-x-1">
                <CircleIcon className="text-blue-500" fontSize="" />
                <p className="text-xs font-small text-black">Player</p>
              </div>
              <div className="flex items-center gap-x-1">
                <CircleIcon className="text-red-500" fontSize="" />
                <p className="text-xs font-small text-black">Banker</p>
              </div>
              <div className="flex items-center gap-x-1">
                <CircleIcon className="text-green-500" fontSize="" />
                <p className="text-xs font-small text-black">Tie</p>
              </div>
            </div>
          </div>
          {/* Pie chart with 3D slant effect */}
          <div className="flex justify-center items-center -mt-12 -ml-10">
            <div className="md:w-30 w-34 md:h-30 h-34 "
              style={{
                transform: 'rotateX(30deg) rotateY(0deg)',
                perspective: '500px',
              }}>
              <Pie data={data} />
            </div>
          </div>
        </div>
        <div className="md:col-span-9 col-span-12 flex flex-col">
          <div className="grid grid-cols-5 gap-x-2">
            <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Score 1-4"), selection: "Score 1-4" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Score 1-4")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Score 1-4')?.gstatus != 0 ? (gameData.t2.find(item => item.nat === 'Score 1-4')?.b1) : 0}:1
              </p>
            </div>

            <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Score 5-6"), selection: "Score 5-6" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Score 5-6")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 5-6</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Score 5-6')?.gstatus != 0 ? (gameData.t2.find(item => item.nat === 'Score 5-6')?.b1) : 0}:1
              </p>
            </div>

            <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Score 7"), selection: "Score 7" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Score 7")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 7</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Score 7')?.gstatus != 0 ? (gameData.t2.find(item => item.nat === 'Score 7')?.b1) : 0}:1
              </p>
            </div>

            <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Score 8"), selection: "Score 8" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Score 8")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 8</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Score 8')?.gstatus != 0 ? (gameData.t2.find(item => item.nat === 'Score 8')?.b1) : 0}:1
              </p>
            </div>
            <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Score 9"), selection: "Score 9" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Score 9")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 9</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Score 9')?.gstatus != 0 ? (gameData.t2.find(item => item.nat === 'Score 9')?.b1) : 0}:1
              </p>
            </div>
          </div>

          {/*  */}
          <div className="grid md:grid-cols-4 grid-cols-5 my-8 gap-x-2">
            <div className="bg-[#086CB8] px-6 whitespace-nowrap py-2 flex flex-col justify-center items-center w-full col-span-1 relative rounded-l-full"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Player Pair"), selection: "Player Pair" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Player Pair")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99 rounded-l-full">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs sm:text-lg font-medium">Player Pair</p>
              <p className='font-bold text-white text-md md:text-xl '>
                {`${parseInt(gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Player Pair')?.b1)}:1`}
              </p>
            </div>

            <div className="grid grid-cols-3 md:col-span-2 col-span-3">
              <div className="bg-[#086CB8] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Player"), selection: "Player" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Player")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className="text-xs sm:text-lg font-medium">Player</p>
                <p className='font-bold text-white text-md md:text-xl'>
                  {`${parseInt(gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Player')?.b1)}:1`}
                </p>
                <div className="flex flex-col md:gap-x-4 gap-1 items-center z-999">
                  <div className="flex gap-1 space-1">
                    {gameData && gameData.t1[0].C5 != "1" && <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C5 || "1"}.jpg`} className="w-4.5 sm:w-6 max-sm:hidden rotate-90" />}
                    <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C3 || "1"}.jpg`} className="w-4.5 sm:w-6" />
                    <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C1 || "1"}.jpg`} className="w-4.5 sm:w-6" />
                  </div>
                  {gameData && gameData.t1[0].C5 != "1" && <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C5 || "1"}.jpg`} className="w-4.5 sm:w-6 sm:hidden rotate-90" />}
                </div>
              </div>

              <div className="bg-[#279532] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Tie"), selection: "Tie" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Tie")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className="text-xs sm:text-lg font-medium">Tie</p>
                <p className='font-bold text-white text-md md:text-xl'>
                  {`${parseInt(gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Tie')?.b1)}:1`}
                </p>
              </div>

              <div className="bg-[#AE2130] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1 relative"
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Banker"), selection: "Banker" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Banker")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className="text-xs sm:text-lg font-medium">Banker</p>
                <p className='font-bold text-white text-md md:text-xl'>
                  {`${parseInt(gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Banker')?.b1)}:1`}
                </p>
                <div className="flex flex-col md:gap-x-4 gap-1 items-center z-999">
                  <div className="flex gap-1 space-1">
                    {gameData && gameData.t1[0].C6 != "1" && <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C6 || "1"}.jpg`} className="w-4.5 sm:w-6 max-sm:hidden rotate-90" />}
                    <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C2 || "1"}.jpg`} className="w-4.5 sm:w-6" />
                    <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C4 || "1"}.jpg`} className="w-4.5 sm:w-6" />
                  </div>
                  {gameData && gameData.t1[0].C6 != "1" && <img src={`https://versionobj.ecoassetsservice.com/v22/static/front/img/cards/${gameData && gameData.t1[0].C6 || "1"}.jpg`} className="w-4.5 sm:w-6 sm:hidden rotate-90" />}
                </div>

              </div>
            </div>


            <div className="bg-[#AE2130] px-6 whitespace-nowrap py-2 flex flex-col justify-center items-center w-full col-span-1 relative rounded-r-full"
              onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nat === "Banker Pair"), selection: "Banker Pair" })}
            >
              {
                gameData && gameData.t2 && gameData.t2.find(item => item.nat === "Banker Pair")?.gstatus == 0 && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99 rounded-r-full">
                    <LockIcon fontSize='small' className="text-white" />
                  </div>
                )
              }
              <p className="text-xs sm:text-lg font-medium">Banker Pair</p>
              <p className='font-bold text-white text-md md:text-xl'>
                {`${parseInt(gameData && gameData.t2 && gameData.t2.find(item => item.nat === 'Banker Pair')?.b1)}:1`}
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* RESULT */}
      <div className="relative flex flex-col gap-x-2 mt-2">
        <div className="flex items-center justify-between bg-[#2C3E50] p-2">
          <div className="flex gap-x-2 items-center">
            <p className="text-sm sm:text-md font-medium">Last Result</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="text-sm sm:text-md font-bold">View All</p>
          </div>
        </div>
        <div className="flex items-center justify-end p-2">
          <div className="flex gap-x-2  justify-center items-center">

            {gameResults && gameResults.map((item, index) => {
              if (item.result == 1) {
                return (
                  <p className="bg-[#096CB9] text-white px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    P
                  </p>
                )
              } else if (item.result == 2) {
                return (
                  <p className="bg-danger text-white px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    B
                  </p>
                )
              } else if (item.result == 3) {
                return (
                  <p className="bg-[#345F3B] text-white px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    T
                  </p>
                )
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Baccarat2Interface;
