import React from "react";
import LockIcon from '@mui/icons-material/Lock';

const cardDataDragon = [
    { name: "Dragon Card 1", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/A.png" },
    { name: "Dragon Card 2", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/2.png" },
    { name: "Dragon Card 3", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/3.png" },
    { name: "Dragon Card 4", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/4.png" },
    { name: "Dragon Card 5", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/5.png" },
    { name: "Dragon Card 6", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/6.png" },
    { name: "Dragon Card 7", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/7.png" },
    { name: "Dragon Card 8", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/8.png" },
    { name: "Dragon Card 9", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/9.png" },
    { name: "Dragon Card 10", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/10.png" },
    { name: "Dragon Card J", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/J.png" },
    { name: "Dragon Card Q", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/Q.png" },
    { name: "Dragon Card K", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/K.png" },
]
const cardDataTiger = [
    { name: "Tiger Card 1", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/A.png" },
    { name: "Tiger Card 2", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/2.png" },
    { name: "Tiger Card 3", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/3.png" },
    { name: "Tiger Card 4", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/4.png" },
    { name: "Tiger Card 5", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/5.png" },
    { name: "Tiger Card 6", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/6.png" },
    { name: "Tiger Card 7", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/7.png" },
    { name: "Tiger Card 8", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/8.png" },
    { name: "Tiger Card 9", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/9.png" },
    { name: "Tiger Card 10", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/10.png" },
    { name: "Tiger Card J", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/J.png" },
    { name: "Tiger Card Q", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/Q.png" },
    { name: "Tiger Card K", image: "https://versionobj.ecoassetsservice.com/v21/static/front/img/cards/K.png" },
];

const Card = ({ imageSrc, cardName, gameData, onClick }) => {
    const isLocked = gameData && gameData.t2 && gameData.t2.find(item => item.nation == cardName)?.gstatus == 0;

    return (
        <div className="flex justify-center items-center relative" onClick={onClick}>
            <img src={imageSrc} className="w-full object-cover" alt={cardName} />
            {isLocked && (
                <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/[0.8] z-99">
                    <LockIcon fontSize='small' className="text-white" />
                </div>
            )}
        </div>
    );
};

const CardGrid = ({ gameData, handleUserSelection }) => {
    return (
        <div className="flex justify-between bg-white mt-2">
            {/* First flex box for DRAGON */}
            <div className="bg-white mt-2 p-10 flex-1">
                <div className="flex justify-center items-center w-full gap-x-2 mb-4">
                    <p className="text-lg text-black font-bold">DRAGON</p>
                    <p className="text-md font-bold text-black">
                        {gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "12" : "0"}
                    </p>
                </div>

                {/* Flex for first 12 cards */}
                <div className="flex flex-wrap justify-center items-center gap-3 mb-3">
                    {cardDataDragon.map(card => (
                        <Card
                            key={card.name}
                            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === card.name), selection: card.name })}
                            imageSrc={card.image}
                            cardName={card.name}
                            gameData={gameData}
                        />
                    ))}
                </div>

                {/* Last card centered */}
                {/* <div className="flex justify-center">
                    <Card key={cardDataDragon[12].name} imageSrc={cardDataDragon[12].image} cardName={cardDataDragon[12].name} gameData={gameData} />
                </div> */}
            </div>

            {/* Second flex box for TIGER */}
            <div className="bg-white mt-2 p-10 flex-1">
                <div className="flex justify-center items-center w-full gap-x-2 mb-4">
                    <p className="text-lg text-black font-bold">TIGER</p>
                    <p className="text-md font-bold text-black">
                        {gameData && gameData.t2 && gameData.t2.find(item => item.nation == "Card 7")?.gstatus === "1" ? "12" : "0"}
                    </p>
                </div>

                {/* Flex for first 12 cards */}
                <div className="flex flex-wrap justify-center items-center gap-3 mb-3">
                    {cardDataTiger.map(card => (
                        <Card
                            key={card.name}
                            onClick={() => handleUserSelection({ data: gameData?.t2?.find(item => item.nation === card.name), selection: card.name })}
                            imageSrc={card.image}
                            cardName={card.name}
                            gameData={gameData}
                        />
                    ))}
                </div>

                {/* Last card centered */}
                {/* <div className="flex justify-center">
                    <Card key={cardDataDragon[12].name} imageSrc={cardDataDragon[12].image} cardName={cardDataDragon[12].name} gameData={gameData} />
                </div> */}
            </div>
        </div>
    );
};

export default CardGrid;
