import React, { useContext } from "react";
import { NAVContext } from "@/app/context/NavContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Baccarat2Interface from "@/app/components/casino_uis/Baccarat2";
import Teenpatti2020 from "@/app/components/casino_uis/Teenpatti2020";
import DragonTiger2020 from "@/app/components/casino_uis/dt2020/DragonTiger2020";
import DragonTiger20202 from "@/app/components/casino_uis/dt20202/DragonTiger20202";
import BaccaratInterface from "@/app/components/casino_uis/Baccarat";
import Lucky7Interface from "@/app/components/casino_uis/lucky7b/Lucky7B";
import Race20Interface from "@/app/components/casino_uis/Race20";
import Card3Interface from "@/app/components/casino_uis/3card";

ChartJS.register(ArcElement, Tooltip, Legend);

const FlipClockDigit = ({ digit, flip }) => {
  return (
    <div className={`flip-digit ${flip ? 'flip-digit-flip' : ''} border-white p-2 bg-[#2A3B4B] rounded`}>
      {digit}
    </div>
  );
};

const CasinoWindow = () => {
  const { activeCasino } = useContext(NAVContext);

  const renderCasinoInterface = () => {
    switch (activeCasino.name) {

      case "20-20 Teenpatti":
        return <Teenpatti2020 />;
      case "20-20 Dragon Tiger":
        return <DragonTiger2020 />;
      case "20-20 Dragon Tiger 2":
        return <DragonTiger20202 />;
      case "Lucky7 B":
        return <Lucky7Interface />;
      case "Baccarat 2":
        return <Baccarat2Interface />;
      case "Race 20":
        return <Race20Interface />;
      case "3 Card":
        return <Card3Interface />
      case "Baccarat":
        return <BaccaratInterface />;

      default:
        return (
          <div className="relative flex flex-col gap-x-2 bg-black h-[27vh] md:h-[47vh]">
            <div className="grid grid-cols-12 h-full">
              <div className="col-span-4 max-md:hidden"></div>
              <div className="md:col-span-8 col-span-12 h-full relative">
                <div className="flex justify-center items-center h-full">
                  <iframe
                    src={activeCasino && `http://82.112.226.123:8000/casino/?id=3056`}
                    title="Casino Game Video"
                    width="100%"
                    height="100%"
                    className="rounded"
                    allowFullScreen
                  />
                </div>
                {/* Countdown Timer */}
                <div className="absolute bottom-4 right-4 flex gap-x-1 text-white text-3xl font-bold p-2 rounded">
                  {/* Uncomment these if you need the FlipClock */}
                  {/* <FlipClockDigit digit={firstDigit} flip={flip} /> */}
                  {/* <FlipClockDigit digit={secondDigit} flip={flip} /> */}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {renderCasinoInterface()}
    </div>
  );
};

export default CasinoWindow;
