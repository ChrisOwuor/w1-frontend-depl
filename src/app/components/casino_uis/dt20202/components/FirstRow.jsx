import React from "react";
import LockIcon from '@mui/icons-material/Lock';

// FirstRow component to render both sides of cards
const FirstRow = ({ gameData, handleUserSelection }) => {
  // Helper function to determine if the card is locked
  const isLocked = (cardName) => {
    return gameData?.t2?.find(item => item.nat === cardName)?.gstatus === "0";
  };


  return (
    <div className="grid grid-cols-12 bg-[#F2F2F2] mt-2">
      <div className="col-span-12 px-2">
        <div className="grid grid-cols-12 bg-[#F2F2F2] mt-2">
          {/*  */}
          <div className="col-span-9  px-2 border-r-6 border-[#2C3E50]">
            <div className='grid grid-cols-5'>
              {/* values */}
              <div className="col-span-2 px-3 py-2 flex justify-center">
                <p className='font-bold text-xl text-black'>
                  {gameData?.t2?.find(item => item.nat === 'Dragon')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nat === 'Dragon')?.rate) : "0"}
                </p>
              </div>
              <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                <p className='font-bold text-xl text-black'>
                  {gameData?.t2?.find(item => item.nat === 'Tie')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nat === 'Tie')?.rate) : "0"}
                </p>
              </div>
              <div className="col-span-2 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                <p className='font-bold text-xl text-black'>
                  {gameData?.t2?.find(item => item.nat === 'Tiger')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nat === 'Tiger')?.rate) : "0"}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-5 gap-x-1'>
              <div className="col-span-2 relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
                onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nat === 'Dragon'), selection: "Dragon" })}
              >
                <p className='font-bold text-white text-lg'>Dragon</p>
                {isLocked('Dragon') && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
              </div>

              <div className="col-span-1 relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
                onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nat === 'Tie'), selection: "Tie" })}
              >
                <p className='font-bold text-white text-lg'>Tie</p>
                {isLocked('Tie') && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
              </div>
              <div className="col-span-2 relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
                onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nat === 'Tiger'), selection: "Tiger" })}
              >
                <p className='font-bold text-white text-lg'>Tiger</p>
                {isLocked('Tiger') && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-3 px-2">
            <div className='grid grid-cols-1'>
              {/* values */}
              <div className="col-span-1 px-3 py-2 border-l border-white/[0.2]  flex justify-center">
                <p className='font-bold text-xl text-black'>
                  {gameData?.t2?.find(item => item.nat === 'Pair')?.gstatus === "1" ? parseInt(gameData?.t2?.find(item => item.nat === 'Pair')?.rate) : "0"}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div className="col-span-1 relative w-full flex justify-center bg-gradient-to-r from-[#0086C9] to-[#2B3F52] border border-gray py-2 rounded-lg"
                onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nat === 'Pair'), selection: "Pair" })}
              >
                <p className='font-bold text-white text-lg'>Pair</p>
                {isLocked('Pair') && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10 rounded-lg">
                    <LockIcon fontSize="small" className="text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FirstRow;
