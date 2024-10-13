import React from "react";
import LockIcon from '@mui/icons-material/Lock';

// Card data for rendering
const cardData = [
    { name: "Card 1", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/A.png" },
    { name: "Card 2", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/2.png" },
    { name: "Card 3", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/3.png" },
    { name: "Card 4", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/4.png" },
    { name: "Card 5", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/5.png" },
    { name: "Card 6", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/6.png" },
    { name: "Card 7", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/7.png" },
    { name: "Card 8", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/8.png" },
    { name: "Card 9", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/9.png" },
    { name: "Card 10", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/10.png" },
    { name: "Card J", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/J.png" },
    { name: "Card Q", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/Q.png" },
    { name: "Card K", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/K.png" },
];

// Card component to display individual cards with optional lock overlay
const Card = ({ imageSrc, cardName, gameData }) => {
    const isLocked = gameData?.t2?.find(item => item.nation == cardName)?.gstatus == 0;

    return (
        <div className="relative">
            <img src={imageSrc} className="w-9" alt={cardName} />
            {isLocked && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize="small" className="text-white" />
                </div>
            )}
        </div>
    );
};

// LRCards component to render both sides of cards
const LRCards = ({ gameData ,handleUserSelection}) => {
    const firstHalfCards = cardData.slice(0, 6); // Cards for the first half
    const secondHalfCards = cardData.slice(7, 13); // Cards for the second half

    return (
        <div className="grid grid-cols-12 bg-white gap-x-4 mt-2 p-6">
            {/* Left Side */}
            <div className="col-span-6">
                <div className="grid grid-cols-2">
                    <div className="col-span-1 px-3 py-2 flex justify-center">
                        <p className="text-md font-bold text-black">{gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "4" : "0"} </p>
                    </div>
                    <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
                        <p className="text-md font-bold text-black">{gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "4" : "0"} </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 px-2">
                    <div className="flex justify-center items-center gap-x-1">
                        {/* First Row of Left Side */}
                        {firstHalfCards.slice(0, 3).map((card, index) => (
                            <Card key={index} imageSrc={card.image} cardName={card.name} gameData={gameData} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-x-1">
                        {/* Second Row of Left Side */}
                        {firstHalfCards.slice(3).map((card, index) => (
                            <Card key={index} imageSrc={card.image} cardName={card.name} gameData={gameData} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="col-span-6">
                <div className="grid grid-cols-2">
                    <div className="col-span-1 px-3 py-2 flex justify-center">
                        <p className="text-md font-bold text-black">{gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "4" : "0"} </p>
                    </div>
                    <div className="col-span-1 px-3 py-2 border-l border-white/[0.2] flex justify-center">
                        <p className="text-md font-bold text-black">{gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "4" : "0"} </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 px-2">
                    <div className="flex justify-center items-center gap-x-1">
                        {/* First Row of Right Side */}
                        {secondHalfCards.slice(0, 3).map((card, index) => (
                            <Card key={index} imageSrc={card.image} cardName={card.name} gameData={gameData} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-x-1">
                        {/* Second Row of Right Side */}
                        {secondHalfCards.slice(3).map((card, index) => (
                            <Card key={index} imageSrc={card.image} cardName={card.name} gameData={gameData} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LRCards;
