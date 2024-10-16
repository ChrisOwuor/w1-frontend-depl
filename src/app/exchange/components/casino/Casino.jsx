
import { NAVContext } from '@/app/context/NavContext';
import React, { useContext, useState } from 'react';

const Casino = ({ globalSettings }) => {
    const casinoGames = [
        {
            name: "20-20 Teenpatti",
            image: "/casino_assets/teenpatti2020.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen20",
            videoUrl: "https://winx777.com/casino/?id=3030"
        },
        {
            name: "20-20 Dragon Tiger",
            image: "/casino_assets/dragontiger2020.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt20",
            videoUrl: "https://winx777.com/casino/?id=3035"
        },
        {
            name: "20-20 Dragon Tiger 2",
            image: "/casino_assets/dt202.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt202",
            videoUrl: "https://winx777.com/casino/?id=3059"
        },
        {
            name: "Lucky7 B",
            image: "/casino_assets/lucky7B.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=lucky7eu",
            videoUrl: "https://winx777.com/casino/?id=3032"
        },
        {
            name: "Baccarat 2",
            image: "/casino_assets/b11.png",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat2",
            videoUrl: "https://winx777.com/casino/?id=3033"
        },
        {
            name: "Race 20",
            image: "/casino_assets/race20.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=race20",
            videoUrl: "https://winx777.com/casino/?id=3036"
        },
        {
            name: "3 Card",
            image: "/casino_assets/3card.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=3cardj",
            videoUrl: "https://winx777.com/casino/?id=3039"
        },
        {
            name: "32 Card A",
            image: "/casino_assets/card32.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32",
            videoUrl: "https://winx777.com/casino/?id=3055"
        },

        {
            name: "32 Cards b",
            image: "/casino_assets/32CARDB.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32eu",
            videoUrl: "https://winx777.com/casino/?id=3034"
        },
        {
            name: "Casino Meter",
            image: "/casino_assets/cmeter.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmeter",
            videoUrl: "https://winx777.com/casino/?id=3046"
        },

        {
            name: "Teenpatti onday",
            image: "/casino_assets/1teenpatti.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=Teen",
            videoUrl: "https://winx777.com/casino/?id=3031"
        },
        {
            name: "Andar Bahar",
            image: "/casino_assets/andarbahar20.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=ab20",
            videoUrl: "https://winx777.com/casino/?id=3053"
        },
        {
            name: "Bollywood Casino",
            image: "/casino_assets/bollywoodcasino.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=btable",
            videoUrl: "https://winx777.com/casino/?id=3041"
        },
        {
            name: "Andar Bahar 2",
            image: "/casino_assets/andarbahar2.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=abj",
            videoUrl: "https://winx777.com/casino/?id=3043"
        },
        {
            name: "20-20 Poker",
            image: "/casino_assets/poker20.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker20",
            videoUrl: "https://winx777.com/casino/?id=3052"
        },
        {
            name: "Worli Matka",
            image: "/casino_assets/worlimatka.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli",
            videoUrl: "https://winx777.com/casino/?id=3054"
        },
        {
            name: "Teenpatti Test",
            image: "/casino_assets/teentest.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen9",
            videoUrl: "https://winx777.com/casino/?id=3048"
        },

        {
            name: "One Day Poker",
            image: "/casino_assets/poker1day.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker",
            videoUrl: "https://winx777.com/casino/?id=3051"
        },
        {
            name: "Baccarat",
            image: "/casino_assets/baccarat.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat",
            videoUrl: "https://winx777.com/casino/?id=3044"
        },
        {
            name: "1 Day Dragon Tiger",
            image: "/casino_assets/1DAYDRAGONTIGER.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt6",
            videoUrl: "https://winx777.com/casino/?id=3057"
        },

        {
            name: "Super Over",
            image: "/casino_assets/superover.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=superover",
            videoUrl: "https://winx777.com/casino/?id=3060"
        },
        {
            name: "Casino war",
            image: "/casino_assets/casinowar.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=war",
            videoUrl: "https://winx777.com/casino/?id=3038"
        },
        {
            name: "Teenpatti open",
            image: "/casino_assets/teenpattiopen.jpg",
            dataURL: "https://diamondsocket.winx777.com/v2/api/casinoData?casinoType=teen8",
            videoUrl: "https://winx777.com/casino/?id=3049"
        },
        {
            name: "Cricket Match 20-20",
            image: "/casino_assets/cmatch20.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmatch20",
            videoUrl: "https://winx777.com/casino/?id=3045"
        },


        {
            name: "Queen",
            image: "/casino_assets/queen.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=queen",
            videoUrl: "https://winx777.com/casino/?id=3037"
        },
        {
            name: "instant Worli",
            image: "/casino_assets/worli2.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli2",
            videoUrl: "https://winx777.com/casino/?id=3040"
        }, {
            name: "Amar Akbar Anthony",
            image: "/casino_assets/amarakbaranthony.jpg",
            dataURL: "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=aaa",
            videoUrl: "https://winx777.com/casino/?id=3056"
        },
    ];
    const { setCurrentCenter, activeCasino, setActiveCasino } = useContext(NAVContext)
    const [activeGame, setActiveGame] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const videoUrl = activeGame ? activeGame.videoUrl : '';


    const handleClick = (game) => {
        setCurrentCenter("khasino")
        setActiveGame(game);
        setActiveCasino(game)
        // setShowVideo(prev=>!prev)
    };
    return (

        <div
            className="flex flex-col w-full border-b border-black/[0.2] "
            style={{
                backgroundImage: "url(/bgcasino.png)",
                backgroundSize: "contain",
                backgroundAttachment: "fixed",
            }}
        >
            {!showVideo ? (
                <>
                    {/* nav */}
                    <div className='flex items-center bg-black overflow-x-auto'>
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

                    <div className='grid md:grid-cols-4 grid-cols-3 gap-6'>
                        {casinoGames.map((game, index) => (
                            <div
                                key={index}
                                className={`sm:p-6 smp-2 font-bold uppercase text-md flex flex-col justify-start items-center text-black`}
                                onClick={() => handleClick(game)}
                            >
                                <div className="relative kasino-container sm:h-[130px] h-[70px] sm:w-[130px] w-[80px]">
                                    <div
                                        className="fancy-shape shape-one"
                                        style={{ backgroundColor: globalSettings && globalSettings.topMenuBgColor || "#0A5BAB" }}
                                    />


                                    <div
                                        className="fancy-shape shape-two overflow-hidden"
                                        style={{ backgroundColor:globalSettings && globalSettings.topMenuBgColor || "#F6A21E" }}
                                    >
                                        <img
                                            src={game.image || "b11.png"}
                                            alt="game image"
                                            className="w-full h-full object-cover  top-image kasino-img"
                                        />


                                    </div>
                                </div>

                                <p className="text-black text-center sm:text-lg text-ms p-2">{game.name}</p>
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
