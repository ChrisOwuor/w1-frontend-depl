import React from "react"
import LockIcon from '@mui/icons-material/Lock';

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

const Card = ({ imageSrc, cardName, gameData }) => {
    const isLocked = gameData && gameData.t2 && gameData.t2.find(item => item.nation == cardName)?.gstatus == 0;

    return (
        <div className="flex flex-col relative">
            <img src={imageSrc} className="w-9" alt={cardName} />
            {isLocked && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                </div>
            )}
        </div>
    );
};



const CardGrid = ({ gameData }) => {
    return (
        <div className="bg-white gap-x-4 mt-2 px-1">
            <div
                className="flex justify-center items-center w-full">
                <p className="text-md font-bold text-black">{gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "12" : "0"} </p>
            </div>
            <div className="flex justify-around items-center px-10 pb-4">
                {cardData.map(card => (
                    <Card key={card.name} imageSrc={card.image} cardName={card.name} gameData={gameData} />
                ))}
            </div>
        </div>
    );
};


export default CardGrid