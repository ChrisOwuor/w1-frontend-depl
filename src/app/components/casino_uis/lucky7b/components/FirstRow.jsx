import React from "react";
import LockIcon from '@mui/icons-material/Lock';

// FirstRow component to render both sides of cards
const FirstRow = ({ gameData, handleUserSelection }) => {
  // Helper function to determine if the card is locked
  const isLocked = (cardName) => {
    return gameData?.t2?.find(item => item.nation === cardName)?.gstatus === "0";
  };


  return (
    <div className="grid grid-cols-12 bg-[#F2F2F2] mt-2">
      <div className="col-span-12 px-2">
        <div className='grid grid-cols-7'>

          {/* Low Card Section */}
          <div className="col-span-3 px-3 py-2 flex flex-col justify-start items-center">
            <div className="flex items-center">
              <p className='font-bold text-black text-md md:text-xl'>
                {gameData?.t2?.find(item => item.nation === 'LOW Card')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nation === 'LOW Card')?.rate) : "0"}
              </p>
            </div>
            <div className="relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
              onClick={() => handleUserSelection({ data:gameData?.t2?.find(item => item.nation === 'LOW Card'), selection: "Low Card" })}
            >
              <p className='font-bold text-white text-lg'>Low card</p>
              {isLocked('LOW Card') && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                  <LockIcon fontSize="small" className="text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Center Card 7 */}
          <div className="col-span-1 px-3 py-2 flex flex-col justify-start items-center">
            <img src="https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/7.png" className="w-10" />
          </div>

          {/* High Card Section */}
          <div className="col-span-3 px-3 py-2 flex flex-col justify-start items-center">
            <div className="flex items-center">
              <p className='font-bold text-black text-md md:text-xl'>
                {gameData?.t2?.find(item => item.nation === 'HIGH Card')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nation === 'HIGH Card')?.rate) : "0"}
              </p>
            </div>
            <div className="relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'HIGH Card'), selection: "High Card" })}
            >
              <p className='font-bold text-white text-lg'>High card</p>
              {isLocked('HIGH Card') && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                  <LockIcon fontSize="small" className="text-white" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FirstRow;
