import React from "react";
import LockIcon from '@mui/icons-material/Lock';

// Card data for rendering (just names now, no images)
const cardData = [
  { name: "Even", color: "bg-gradient-to-r from-[#0086C9] to-[#2B3F52]" },
  { name: "Odd", color: "bg-gradient-to-r from-[#0086C9] to-[#2B3F52]" },
  { name: "Red", color: "bg-gradient-to-r from-[#0086C9] to-[#2B3F52]" },
  { name: "Black", color: "bg-gradient-to-r from-[#0086C9] to-[#2B3F52]" }
];

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
    <div className="grid grid-cols-12 bg-white gap-x-4 mt-2 p-3">
      {/* Left Side */}
      <div className="col-span-6">
        <div className="grid grid-cols-2">
          <div className="col-span-1 px-3 py-2 flex justify-center">
            <p className="font-bold text-black text-md md:text-xl">
              {gameData?.t2?.find(item => item.nation === 'Even')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Even')?.rate : "0"}
            </p>
          </div>
          <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
            <p className="font-bold text-black text-md md:text-xl">
              {gameData?.t2?.find(item => item.nation === 'Odd')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Odd')?.rate : "0"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-1 px-2">
          {/* Even Card */}
          <Card
            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Even'), selection: "Even" })}
            cardName="Even"
            cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
            isLocked={isLocked('Even')}
          />
          {/* Odd Card */}
          <Card
            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Odd'), selection: "Odd" })}
            cardName="Odd"
            cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
            isLocked={isLocked('Odd')}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-6">
        <div className="grid grid-cols-2">
          <div className="col-span-1 px-3 py-2 flex justify-center">
            <p className="font-bold text-black text-md md:text-xl">
              {gameData?.t2?.find(item => item.nation === 'Red')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Red')?.rate : "0"}
            </p>
          </div>
          <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
            <p className="font-bold text-black text-md md:text-xl">
              {gameData?.t2?.find(item => item.nation === 'Black')?.gstatus == "1" ? gameData?.t2?.find(item => item.nation === 'Black')?.rate : "0"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-1 px-2">
          {/* Red Card */}
          <Card
            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Red'), selection: "Red" })}
            cardName="Red"
            cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
            isLocked={isLocked('Red')}
          />
          {/* Black Card */}
          <Card
            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === 'Black'), selection: "Black" })}
            cardName="Black"
            cardColor="bg-gradient-to-r from-[#0086C9] to-[#2B3F52]"
            isLocked={isLocked('Black')}
          />
        </div>
      </div>
    </div>
  );
};

export default SecondRow;
