
import React, { useState } from 'react';

const Casino = ({globalSettings}) => {
    const casinoGames = [
        { name: "Baccarat 2", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat2", videoUrl: "https://winx777.com/casino/?id=3033" },
        { name: "Race 20", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=race20", videoUrl: "https://winx777.com/casino/?id=3036" },
        { name: "32 Cards b", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=lucky7", videoUrl: "https://winx777.com/casino/?id=3058" },
        { name: "32 Cards b", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32eu", videoUrl: "https://winx777.com/casino/?id=3034" },
        { name: "Casino Meter", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmeter", videoUrl: "https://winx777.com/casino/?id=3046" },
        { name: "20-20 Dragon Tiger 2", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt202", videoUrl: "https://winx777.com/casino/?id=3059" },
        { name: "Teenpatti onday", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=Teen", videoUrl: "https://winx777.com/casino/?id=3031" },
        { name: "Andar Bahar", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=ab20", videoUrl: "https://winx777.com/casino/?id=3053" },
        { name: "Bollywood Casino", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=btable", videoUrl: "https://winx777.com/casino/?id=3041" },
        { name: "Andar Bahar 2", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=abj", videoUrl: "https://winx777.com/casino/?id=3043" },
        { name: "20-20 Poker", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker20", videoUrl: "https://winx777.com/casino/?id=3052" },
        { name: "Worli Matka", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli", videoUrl: "https://winx777.com/casino/?id=3054" },
        { name: "Teenpatti Test", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen9", videoUrl: "https://winx777.com/casino/?id=3048" },
        { name: "Amar Akbar Anthony", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=aaa", videoUrl: "https://winx777.com/casino/?id=3056" },
        { name: "3 Card", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=3cardj", videoUrl: "https://winx777.com/casino/?id=3039" },
        { name: "32 Card A", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32", videoUrl: "https://winx777.com/casino/?id=3055" },
        { name: "One Day Poker", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker", videoUrl: "https://winx777.com/casino/?id=3051" },
        { name: "Baccarat", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat", videoUrl: "https://winx777.com/casino/?id=3044" },
        { name: "1 Day Dragon Tiger", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt6", videoUrl: "https://winx777.com/casino/?id=3057" },
        { name: "20-20 Teenpatti", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen20", videoUrl: "https://winx777.com/casino/?id=3030" },
        { name: "Super Over", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=superover", videoUrl: "https://winx777.com/casino/?id=3060" },
        { name: "Casino war", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=war", videoUrl: "https://winx777.com/casino/?id=3038" },
        { name: "Teenpatti open", dataURL: "https://diamondsocket.winx777.com/v2/api/casinoData?casinoType=teen8", videoUrl: "https://winx777.com/casino/?id=3049" },
        { name: "Cricket Match 20-20", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmatch20", videoUrl: "https://winx777.com/casino/?id=3045" },
        { name: "Lucky7 B", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=lucky7eu", videoUrl: "https://winx777.com/casino/?id=3032" },
        { name: "20-20 Dragon Tiger", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt20", videoUrl: "https://winx777.com/casino/?id=3035" },
        { name: "Queen", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=queen", videoUrl: "https://winx777.com/casino/?id=3037" },
        { name: "instant Worli", dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli2", videoUrl: "https://winx777.com/casino/?id=3040" }
    ];
    const [activeGame, setActiveGame] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const videoUrl = activeGame ? activeGame.videoUrl : '';


    const handleClick = (game) => {
        setActiveGame(game);
        setShowVideo(prev=>!prev)
    };
    return (
        
        <div 
        className="flex flex-col w-full border-b border-black/[0.2] p-4"
        style={{
            backgroundImage: "url(/bgcasino.png)",
            backgroundSize: "contain",
            backgroundAttachment: "fixed",
        }}
    >
        {!showVideo ? (
            <>
            {/* nav */}
                <div className='flex items-center bg-black'>
                    {casinoGames.map((game, index) => (
                        <p 
                            key={index} 
                            className={`font-bold uppercase px-4 py-2 rounded-[40px] whitespace-nowrap  ${activeGame?.name === game.name ? 'bg-warning text-black' : 'border-r border-gray-100 text-white'}`}
                            onClick={() => handleClick(game)}
                        >
                            {game.name}
                        </p>
                    ))}
                </div>
                {/* body */}
                
                <div className='grid md:grid-cols-4 grid-cols-2 gap-6'>
  {casinoGames.map((game, index) => (
   <div 
   key={index} 
   className={`p-6 font-bold uppercase text-md flex flex-col justify-center items-center text-black`}
   onClick={() => handleClick(game)}
 >
   <div className="relative kasino-container">
     <div 
       className="fancy-shape shape-one"  
       style={{ backgroundColor: globalSettings.topMenuBgColor || "#0A5BAB" }} 
     />
     <div 
       className="fancy-shape shape-two" 
       style={{ backgroundColor: globalSettings.topMenuBgColor || "#F6A21E" }}
     />
     
     {/* Separate div for the image to prevent rotation */}
     <div className="image-wrapper">
       <img src="b11.png" alt="game image" className="top-image kasino-img" 
        style={{height: "110px"}}
        />
     </div>
   </div>
   
   <p className="text-black text-lg p-2">{game.name}</p>
 </div>
 
  ))}
</div>

            </>
        ) : (
            <div className="flex justify-center items-center">
                <iframe 
                    src={videoUrl} 
                    title="Casino Game Video" 
                    width="800" 
                    height="450" 
                    className="rounded-lg"
                    allowFullScreen
                />
            </div>
        )}
    </div>
    );
};

export default Casino;
