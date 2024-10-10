import React, { useContext, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NAVContext } from '@/app/context/NavContext';
import LockIcon from '@mui/icons-material/Lock';
import { io } from 'socket.io-client';
import { CasinoContext } from '@/app/context/CasinoContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''} border-white px-1.5 py-0.5 sm:p-2 bg-[#2A3B4B] rounded-lg text-md sm:text-lg font-medium`}>
      {digit}
    </div>
  );
};

const Teenpatti2020 = () => {
  const { activeCasino } = useContext(NAVContext);
  const { openBetForm, setOpenBetForm, setBet } = useContext(CasinoContext);
  const [gameData, setGameData] = useState();
  const [gameResults, setGameResults] = useState([]);
  const [gStatus, setGstatus] = useState(0)


  // Socket.IO connection
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);

      // Emit casino_id after connecting
      const casinoId = "20-20 Teenpatti";
      socket.emit('casino_request', casinoId);
    });

    // Listen for casino response event
    socket.on('casino_response', (data) => {
      setGameData(data.data.data);

      setGameResults(data.data.result)
      const gData = data.data.data
      setGstatus(gData && gData.t2 && gData.t2.find(item => item.nation === 'Player A')?.gstatus)
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);


  const handleUserSelection = ({ data, selection }) => {
    
    setBet(prev => ({
      ...prev,
      selection: selection,
      round_id: data.mid,
      casino_id: "20-20 Teenpatti",
      rate: data.rate,
    }))
    if (!openBetForm) setOpenBetForm(true)
  }
  return (
    <>
      {
        gameData && gameData.t1 && (
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
                <div className="flex flex-col ">
                  <p className='sm:text-md text-sm font-bold'>PLAYER A</p>
                  <div className="flex items-center gap-1 mb-1">
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C1 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C2 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C3 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className='sm:text-md text-sm font-bold'>PLAYER B</p>
                  <div className="flex items-center gap-x-1">
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C4 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C5 || "1"}.jpg`} className="w-4.5 sm:w-9" />
                    <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C6 || "1"}.jpg`} className="w-4.5 sm:w-9" />
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
                          flip={false} // you can update this based on your flip logic
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
      <div className="grid sm:grid-cols-12 bg-white border border-black/[0.3] gap-x-4 mt-2 mx-1">
        {/* Player A */}
        <div className="col-span-6 text-black">
          <div className="flex items-center border border-gray px-2">
            <p className='font-bold text-black text-sm sm:text-lg'>Player A</p>
          </div>
          <div className='grid grid-cols-4'>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Player A</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>3 Baccarat A</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Total A</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Pair Plus A</p>
            </div>
            <div className={`col-span-4 grid grid-cols-4 bg-back`}>
              {/* Player A */}
              <div
                className={`col-span-1 px-3 py-2   flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player A")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "Player A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player A")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player A')?.rate}
                </p>
              </div>
              {/* 3 Baccarat A */}
              <div
                className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player A")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "3 Baccarat A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player A")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player A')?.rate}
                </p>
              </div>
              {/* Total A */}
              <div
                className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gStatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "Total A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player A")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && parseInt(gameData.t2.find(item => item.nation === "Pair plus A")?.rate)}
                </p>
              </div>
              {/* Pair Plus A */}
              <div
                className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus A")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "Pair plus A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus A")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  A
                </p>
              </div>
            </div>
            {/* values 2 */}
            <div className={`col-span-4 grid grid-cols-2 gap-x-2 mt-3 text-black `}>
              <div
                className={`col-span-1 grid grid-cols-2 bg-back ${gStatus == 0 && "relative"}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "Black A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <div className="flex items-center gap-x-1">
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/spade.png" className="w-9" />
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/club.png" className="w-9" />
                </div>
                <div className="col-span-1 px-3 py-2 flex justify-center">
                  <p className='font-bold text-black text-md md:text-xl'>
                    {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player A')?.rate}
                  </p>
                </div>
              </div>
              <div
                className={`col-span-1 grid grid-cols-2 bg-back ${gStatus == 0 && "relative"}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player A"), selection: "Red A" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <div className="flex items-center gap-x-1">
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/heart.png" className="w-9" />
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/diamond.png" className="w-9" />
                </div>
                <div className="col-span-1 px-3 py-2 flex justify-center">
                  <p className='font-bold text-black text-md md:text-xl'>
                    {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player B')?.rate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Player B */}
        <div className="col-span-6 text-black">
          <div className="flex items-center border border-gray px-2">
            <p className='font-bold text-black text-sm sm:text-lg'>Player B</p>
          </div>
          <div className='grid grid-cols-4'>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Player B</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>3 Baccarat B</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Total B</p>
            </div>
            <div className="col-span-1 flex justify-center border border-gray py-2">
              <p className='font-bold text-black text-sm sm:text-lg'>Pair Plus B</p>
            </div>
            <div className={`col-span-4 grid grid-cols-4 bg-back`}>
              {/* Player B */}
              <div
                className={`col-span-1 px-3 py-2   flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player B")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player B"), selection: "Player B" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player B')?.rate}
                </p>
              </div>
              {/* 3 Baccarat B */}
              <div className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player B")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player B"), selection: "3 Baccarrat B" })}>
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player B')?.rate}
                </p>
              </div>
              {/* Total B */}
              <div
                className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gStatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Pair plus B"), selection: "Total B" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Player B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  {gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.rate}
                </p>
              </div>
              {/* Pair Plus B */}
              <div
                className={`col-span-1 px-3 py-2  border-l border-white/[0.2] flex justify-center ${gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 ? "relative" : ""}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Pair plus B"), selection: "Pair plus B" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <p className='font-bold text-black text-md md:text-xl'>
                  B
                </p>
              </div>
            </div>
            {/* values 2 */}
            <div className={`col-span-4 grid grid-cols-2 gap-x-2 mt-3 text-black `}>
              <div
                className={`col-span-1 grid grid-cols-2 bg-back ${gStatus == 0 && "relative"}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player B"), selection: "Black B" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <div className="flex items-center gap-x-1">
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/spade.png" className="w-9" />
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/club.png" className="w-9" />
                </div>
                <div className="col-span-1 px-3 py-2 flex justify-center">
                  <p className='font-bold text-black text-md md:text-xl'>
                    {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player B')?.rate}
                  </p>
                </div>
              </div>
              <div
                className={`col-span-1 grid grid-cols-2 bg-back ${gStatus == 0 && "relative"}`}
                onClick={() => handleUserSelection({ data: gameData.t2.find(item => item.nation === "Player B"), selection: "Red B" })}
              >
                {
                  gameData && gameData.t2 && gameData.t2.find(item => item.nation === "Pair plus B")?.gstatus == 0 && (
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                      <LockIcon fontSize='small' className="text-white" />
                    </div>
                  )
                }
                <div className="flex items-center gap-x-1">
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/heart.png" className="w-9" />
                  <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/icons/diamond.png" className="w-9" />
                </div>
                <div className="col-span-1 px-3 py-2 flex justify-center">
                  <p className='font-bold text-black text-md md:text-xl'>
                    {gameData && gameData.t2 && gameData.t2.find(item => item.nation === 'Player B')?.rate}
                  </p>
                </div>
              </div>

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
                  <p className="bg-[#355E3B] text-[#FF4512] px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    A
                  </p>
                )
              } else if (item.result == 3) {
                return (
                  <p className="bg-[#355E3B] text-[#FFFF33] px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    B
                  </p>
                )
              } else {
                return (
                  <p className="bg-[#355E3B] px-3 py-1 rounded-full text-sm sm:text-md font-medium">
                    {
                      item && item.result
                    }
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

export default Teenpatti2020;
