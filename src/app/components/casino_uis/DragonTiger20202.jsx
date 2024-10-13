import React, { useContext, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { NAVContext } from '@/app/context/NavContext';
ChartJS.register(ArcElement, Tooltip, Legend);
const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''}  border-white p-2 bg-[#2A3B4B] rounded`}>
      {digit}
    </div>
  );
};


const DragonTiger20202 = () => {
  const { activeCasino } = useContext(NAVContext);
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
  const [timeLeft, setTimeLeft] = useState(30);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setFlip(true);
        setTimeout(() => {
          setFlip(false);
          setTimeLeft((prevTime) => prevTime - 1);
        }, 500);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (time) => String(time).padStart(2, '0');
  const firstDigit = formatTime(timeLeft)[0];
  const secondDigit = formatTime(timeLeft)[1];

  return (
    <>
            <div className="relative flex flex-col gap-x-2 bg-black h-[27vh] md:h-[47vh]">

              <div className="flex items-center justify-between bg-[#2C3E50] p-2">
                  <div className="flex gap-x-2 items-center">
                    <p className="text-md font-medium">{activeCasino && activeCasino.name}</p>
                  </div>
                  <div className="flex gap-x-2 items-center">
                    <p className="text-xs font-medium">Round ID: 101010120203302</p>
                  </div>
                </div>
                <div className="grid grid-cols-12 h-full">
                  <div className="col-span-3 max-md:hidden p-2">
                    <div className="flex items-center gap-x-1">
                      <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-9" />
                      <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-9" />
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
                    <div className="absolute bottom-4 right-4 flex gap-x-1 text-white text-3xl font-bold p-2 rounded">
                      {/* First digit (tens) */}
                      <FlipClockDigit digit={firstDigit} flip={flip} />

                      {/* Second digit (units) */}
                      <FlipClockDigit digit={secondDigit} flip={flip} />

                    </div>
                  </div>
                </div>
              </div>
            {/*  */}
            <div className="grid grid-cols-12 bg-[#F2F2F2] mt-2">
              {/*  */}
              <div className="col-span-9  px-2 border-r-4 border-[#2C3E50]">
                <div className='grid grid-cols-5'>
                  {/* values */}
                  <div className="col-span-2 px-3 py-2 flex justify-center">
                    <p className='font-bold text-xl text-black'>0</p>
                  </div>
                  <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                    <p className='font-bold text-xl text-black'>0</p>
                  </div>
                  <div className="col-span-2 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                    <p className='font-bold text-xl text-black'>0</p>
                  </div>
                </div>
                  
                <div className='grid grid-cols-5 gap-x-1'>
                  <div className="col-span-2 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                    <p className='font-bold text-white text-lg'>Dragon</p>
                  </div>
                  <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                    <p className='font-bold text-white text-lg'>Tie</p>
                  </div>
                  <div className="col-span-2 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                    <p className='font-bold text-white text-lg'>Tiger</p>
                  </div>
                </div>
              </div>
              <div className="col-span-3 p-2">
                <div className='grid grid-cols-1'>
                  {/* values */}
                  <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                    <p className='font-bold text-xl text-black'>0</p>
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className="col-span-1 flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg">
                    <p className='font-bold text-white text-lg'>Tiger</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 bg-white gap-x-4 mt-2 px-1">
              <div className="col-span-6">
                <div className="flex items-center justify-center px-2">
                  <p className='font-bold text-2xl text-black'>Dragon</p>
                </div>
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
                <div className="flex items-center justify-center px-2">
                  <p className='font-bold text-2xl text-black'>Tiger</p>
                </div>
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
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">D</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">T</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">D</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">D</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">D</p>
                </div>
              </div>
            </div>
          </>
  );
};

export default DragonTiger20202;
