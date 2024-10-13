import React from "react";
import LockIcon from '@mui/icons-material/Lock';



// Card component to display individual cards with optional lock overlay
const Card = ({ cardName, cardColor, isLocked, onClick }) => {
  return (
    <div
      className={`relative flex justify-center items-center py-2 px-4 rounded-lg border border-gray ${cardColor} cursor-pointer`}
      onClick={onClick} // Call the passed onClick function
    >
      <p className="font-bold text-white text-lg">{cardName}</p>
      {isLocked && (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-10">
          <LockIcon fontSize="small" className="text-white" />
        </div>
      )}
    </div>
  );
};


const SecondRow = ({ gameData, handleUserSelection }) => {

  const isLocked = (cardName) => {
    return gameData?.t2?.find(item => item.nation === cardName)?.gstatus === "0";
  };

  return (
    <div className="grid grid-cols-2">
      <div className="grid grid-cols-6 bg-white gap-x-4 mt-2 p-3">
        {/* Left Side */}
        <div className="col-span-6">
          <div className="grid grid-cols-2">
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Dragon Even')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Dragon Even')?.rate : "0"}
              </p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Dragon Odd')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Dragon Odd')?.rate : "0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-1 px-2">
            {/* Even Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Dragon Even'), selection: "Dragon Even" })}
              cardName="Dragon Even"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Dragon Even')}
            />
            {/* Odd Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Dragon Odd'), selection: "Dragon Odd" })}
              cardName="Dragon Odd"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Dragon Odd')}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-6">
          <div className="grid grid-cols-2">
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Dragon Red')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Dragon Red')?.rate : "0"}
              </p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Dragon Black')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Dragon Black')?.rate : "0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-1 px-2">
            {/* Dragon Red Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Dragon Red'), selection: "Dragon Red" })}
              cardName="Dragon Red"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Dragon Red')}
            />
            {/* Dragon Black Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Dragon Black'), selection: "Dragon Black" })}
              cardName="Dragon Black"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Dragon Black')}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 bg-white gap-x-4 mt-2 p-3">
        {/* Left Side */}
        <div className="col-span-6">
          <div className="grid grid-cols-2">
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Tiger Even')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Tiger Even')?.rate : "0"}
              </p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Tiger Odd')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Tiger Odd')?.rate : "0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-1 px-2">
            {/* Tiger Even Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Tiger Even'), selection: "Tiger Even" })}
              cardName="Tiger Even"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Tiger Even')}
            />
            {/* Tiger Odd Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Tiger Odd'), selection: "Tiger Odd" })}
              cardName="Tiger Odd"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Tiger Odd')}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="col-span-6">
          <div className="grid grid-cols-2">
            <div className="col-span-1 px-3 py-2 flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Tiger Red')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Tiger Red')?.rate : "0"}
              </p>
            </div>
            <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
              <p className="font-bold text-black text-md md:text-xl">
                {gameData?.t2?.find(item => item.nation === 'Tiger Black')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Tiger Black')?.rate : "0"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-1 px-2">
            {/* Tiger Red Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Tiger Red'), selection: "Tiger Red" })}
              cardName="Tiger Red"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Tiger Red')}
            />
            {/* Tiger Black Card */}
            <Card
              onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Tiger Black'), selection: "Tiger Black" })}
              cardName="Tiger Black"
              cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
              isLocked={isLocked('Tiger Black')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondRow;
