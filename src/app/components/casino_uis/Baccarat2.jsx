import React, { useContext, useEffect, useState } from 'react';
import CircleIcon from '@mui/icons-material/Circle'; 
import { Pie } from 'react-chartjs-2';
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


const Baccarat2Interface = () => {
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
              <div className="grid grid-cols-12 h-full">
                <div className="col-span-4 max-md:hidden"></div>
                <div className="md:col-span-8 col-span-12 h-full relative">
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
            <div className="grid grid-cols-12 bg-white border border-black gap-x-4 mt-2 mx-1">
              <div className="md:col-span-3 col-span-12">
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
                  <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1">
                    <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
                    <p className="text-xs md:text-md text-white">7.5:1</p>
                  </div>

                  <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1">
                    <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
                    <p className="text-xs md:text-md text-white">7.5:1</p>
                  </div>

                  <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1">
                    <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
                    <p className="text-xs md:text-md text-white">0.1</p>
                  </div>

                  <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1">
                    <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
                    <p className="text-xs md:text-md text-white">0.1</p>
                  </div>

                  <div className="bg-[#2C3E50] px-6 whitespace-nowrap py-2 flex flex-col items-center w-full col-span-1">
                    <p className="text-xs md:text-md font-bold md:font-bold text-white">Score 1-4</p>
                    <p className="text-xs md:text-md text-white">7.5:1</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 grid-cols-5 my-8 gap-x-2">
                  <div className="bg-[#086CB8] px-4 py-1 flex flex-col justify-center items-center w-full col-span-1 rounded-l-full " >
                    <p className="text-xs md:text-md font-bold md:font-bold">Player Pair</p>
                    <p className="text-xs md:text-md font-bold md:font-bold">5:1</p>
                  </div>

                  <div className="grid grid-cols-3 md:col-span-2 col-span-3">
                    <div className="bg-[#086CB8] px-4 py-1 flex flex-col items-start w-full col-span-1">
                      <p className="text-xs md:text-md font-bold md:font-bold">Player</p>
                      <p className="text-xs md:text-md font-bold md:font-bold">5:1</p>
                      <div className="flex md:gap-x-4 gap-x-2 items-center">
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                      </div>
                    </div>

                    <div className="bg-[#279532] whitespace-nowrap px-4 py-1 flex flex-col justify-center items-center w-full col-span-1">
                      <p className="text-xs md:text-md font-bold md:font-bold">Tie</p>
                      <p className="text-xs md:text-md font-bold md:font-bold">0.1</p>
                    </div>

                    <div className="bg-[#AE2130] whitespace-nowrap px-4 py-1 flex flex-col justify-center items-start w-full col-span-1">
                      <p className="text-xs md:text-md font-bold md:font-bold">Banker</p>
                      <p className="text-xs md:text-md font-bold md:font-bold">0.1</p>
                      <div className="flex md:gap-x-4 gap-x-2 items-center">
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                        <img src="https://versionobj.ecoassetsservice.com/v19/static/front/img/cards/1.jpg" className="w-[22%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#AE2130] px-4 py-1 flex flex-col justify-center items-center w-full col-span-1 rounded-r-full">
                    <p className="text-xs md:text-md font-bold md:font-bold">Banker Pair</p>
                    <p className="text-xs md:text-md font-bold md:font-bold">5:1</p>
                  </div>
                </div>
              </div>
            </div>
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
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">P</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">P</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">P</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">P</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">B</p>
                  <p className="bg-blue-500 px-3 py-1 rounded-full text-md font-medium">P</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">B</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">B</p>
                  <p className="bg-red-500 px-3 py-1 rounded-full text-md font-medium">B</p>
                </div>
              </div>
            </div>
          </>
  );
};

export default Baccarat2Interface;
