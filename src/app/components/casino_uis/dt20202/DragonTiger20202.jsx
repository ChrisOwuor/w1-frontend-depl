import React, { useContext, useEffect, useState } from 'react';
import { NAVContext } from '@/app/context/NavContext';
import { CasinoContext } from '@/app/context/CasinoContext';
import CardGrid from './components/CardGrid';
import LRCards from './components/LRCards';
import SecondRow from './components/SecondRow';
import FirstRow from './components/FirstRow';
import { fetchGameData } from '@/app/api/casino/casino';

const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''}  border-white p-2 bg-[#2A3B4B] rounded`}>
      {digit}
    </div>
  );
};



const DragonTiger20202 = () => {
  const { activeCasino } = useContext(NAVContext);
  const { openBetForm, setOpenBetForm, setBet } = useContext(CasinoContext);
  const [gameData, setGameData] = useState();
  const [gameResults, setGameResults] = useState([]);
  const [gStatus, setGstatus] = useState(0)


  useEffect(() => {
    const casinoId = "20-20 Dragon Tiger 2"; 
  
    const updateGameData = async () => {
      const data = await fetchGameData(casinoId); 
  
      if (data) {
        setGameData(data.data);
        setGameResults(data.result);
        const gData = data.data;
        setGstatus(gData && gData.t2 && gData.t2.find(item => item.nation === 'Player A')?.gstatus);
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
    
    if (data) {
      setBet(prev => ({
        ...prev,
        selection: selection,
        round_id: data.mid,
        casino_id: "20-20 Dragon Tiger 2",
        rate: data.rate,
      }))
    }
    if (!openBetForm) setOpenBetForm(true)
  }
  return (
    <>
      <div className="flex items-center justify-between bg-[#2C3E50] p-2">
        <div className="flex gap-x-2 items-center">
          <p className="text-md font-medium">{activeCasino && activeCasino.name}</p>
        </div>
        <div className="flex gap-x-2 items-center">
          <p className="text-md font-medium">Round ID: {gameData && gameData.t1 && gameData.t1[0].mid?.toString().replace('.', '')}</p>

        </div>
      </div>
      <div className="grid grid-cols-12 h-full relative bg-black">
        <div className="col-span-2 md:col-span-3 max-md:absolute top-0 left-0 z-999 p-2">
          <div className="flex flex-col ">

            <div className="flex items-center gap-1 mb-1">
              <img src={`https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/${gameData && gameData.t1[0].C1 || "1"}.jpg`} className="w-4.5 sm:w-9" />
              <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C2 || "1"}.jpg`} className="w-4.5 sm:w-9" />
              {/* <img src={`https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/${gameData && gameData.t1[0].C3 || "1"}.jpg`} className="w-4.5 sm:w-9" /> */}
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
      <FirstRow gameData={gameData} handleUserSelection={handleUserSelection} />

      <SecondRow gameData={gameData} handleUserSelection={handleUserSelection} />

      {/* 3 CARDS DIV BY 4  x-axis */}
      {/* <LRCards gameData={gameData} handleUserSelection={handleUserSelection} /> */}
      {/*  */}
      <div className="bg-white gap-x-4 mt-2 px-1">
        <CardGrid gameData={gameData} handleUserSelection={handleUserSelection} />
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
                  <p key={index} className="bg-[#355E3B] text-[#FF4512] px-3 py-2 rounded-full text-sm sm:text-md font-bold">
                    D
                  </p>
                )
              } else if (item.result == 2) {
                return (
                  <p key={index} className="bg-[#355E3B] text-[#FFFF33] px-3 py-2 rounded-full text-sm sm:text-md font-bold">
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

export default DragonTiger20202;
