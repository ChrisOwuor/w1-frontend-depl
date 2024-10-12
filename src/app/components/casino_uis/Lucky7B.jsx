import React, { useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NAVContext } from '@/app/context/NavContext';
import { CasinoContext } from '@/app/context/CasinoContext';
ChartJS.register(ArcElement, Tooltip, Legend);
const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''}  border-white p-2 bg-[#2A3B4B] rounded`}>
      {digit}
    </div>
  );
};


const Lucky7Interface = () => {
  const { activeCasino } = useContext(NAVContext);
  const { openBetForm, setOpenBetForm, setBet } = useContext(CasinoContext);
  const [gameData, setGameData] = useState();
  const [gameResults, setGameResults] = useState([]);
  const [gStatus, setGstatus] = useState(0)


  // Socket.IO connection
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL + 'api', {
      // transports: ['websocket'],
      //    upgrade: false,
    })

    socket.on('connect', () => {
      // console.log('Socket connected:', socket.id);

      // Emit casino_id after connecting
      const casinoId = "Lucky7 B";
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
      {/*  */}
      <div className="grid grid-cols-12 bg-[#F2F2F2] mt-2">
        {/*  */}
        <div className="col-span-12  px-2">
          <div className='grid grid-cols-7'>
            {/* values */}
            <div className="col-span-3 px-3 py-2 flex flex-col justify-start items-center">
              <div className="flex items-center">
                <p className='font-bold text-xl text-black'>0</p>
              </div>
              <div className="w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                <p className='font-bold text-white text-lg'>Low card</p>
              </div>
            </div>
            <div className="col-span-1 px-3 py-2 flex flex-col justify-start items-center">
              <div className="flex items-center">
                <p className='font-bold text-xl text-black'>0</p>
              </div>

            </div>
            <div className="col-span-3 px-3 py-2 flex flex-col justify-start items-center">
              <div className="flex items-center">
                <p className='font-bold text-xl text-black'>0</p>
              </div>
              <div className="w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                <p className='font-bold text-white text-lg'>High card</p>
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="grid grid-cols-12 bg-white gap-x-4 mt-2 px-1">
        <div className="col-span-6">
          <div className='grid grid-cols-2'>
            {/* values */}
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-1 px-2'>
            <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
              <p className='font-bold text-white text-lg'>Even</p>
            </div>
            <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
              <p className='font-bold text-white text-lg'>Odd</p>
            </div>
          </div>


        </div>
        <div className="col-span-6">
          <div className='grid grid-cols-2'>
            {/* values */}
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-1 px-2'>
            <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
              <p className='font-bold text-white text-lg'>Even</p>
            </div>
            <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
              <p className='font-bold text-white text-lg'>Odd</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3 CARDS DIV BY 4  x-axis */}
      <div className="grid grid-cols-12 bg-white gap-x-4 mt-2 px-1">
        <div className="col-span-6">
          <div className='grid grid-cols-2'>
            {/* values */}
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-4 px-2'>
            <div className="flex justify-center items-center gap-x-1">
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
            </div>
            <div className="flex justify-center items-center gap-x-1">
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <div className='grid grid-cols-2'>
            {/* values */}
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
              <p className='font-bold text-xl text-black'>0</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-x-4 px-2'>
            <div className="flex justify-center items-center gap-x-1">
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
            </div>
            <div className="flex justify-center items-center gap-x-1">
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
              <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white gap-x-4 mt-2 px-1">
        <div className="flex justify-around items-center p-10">
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/6.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/4.png" className="w-9" />
          <img src="https://versionobj.ecoassetsservice.com/v20/static/front/img/cards/A.png" className="w-9" />
        </div>
      </div>


      {/* RESULT */}
      <div className="relative flex flex-col gap-x-2 mt-2">
        <div className="flex items-center justify-between bg-[#2C3E50] p-2">
          <div className="flex gap-x-2 items-center">
            <p className="text-md font-medium">Last Result</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="text-md font-bold">View All</p>
          </div>
        </div>
        <div className="flex items-center justify-end p-2">
          <div className="flex gap-x-2  justify-center items-center">
            <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
            <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">H</p>
            <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
            <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">H</p>
            <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">H</p>
            <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">H</p>
            <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">L</p>
            <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">L</p>
            <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">L</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lucky7Interface;
