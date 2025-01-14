import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { NAVContext } from "@/app/context/NavContext";
import React, { useContext, useEffect, useState } from "react";
import { casinoGames } from "../../constants";
import {
  getCategories,
  getGapCasinos,
  getProviders,
  launchGame,
} from "@/app/api/casino/casino";
import { useRouter } from "next/navigation";

const CasinoHome = ({ globalSettings }) => {
  const router = useRouter();
  const { setCurrentCenter, setActiveCasino, setCurrentGame } =
    useContext(NAVContext);
  const [activeGame, setActiveGame] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [category, setCategory] = useState("");
  const [gapcasinoGames, setGapCasinoGames] = useState([]);
  const [providers, setProviders] = useState([]);
  const [categories, setCategories] = useState([]);

  const fillData = async () => {
    try {
      const providers_ = await getProviders();
      setProviders(providers_);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories_ = async () => {
    try {
      const categories_ = await getCategories({ provider: currentTab });
      setCategories(categories_);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fillData();
    getCategories_();
  }, []);

  useEffect(() => {
    (async () => {
      getCategories_();
      const ourCasino = await getGapCasinos({
        type: currentTab == 0 ? "popular" : "ourcasino",
        provider: currentTab,
        category: category,
      });
      if (ourCasino) {
        setGapCasinoGames(ourCasino);
      }
    })();
  }, [currentTab, category]);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  const handleClick = async (game) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setCurrentCenter("userconsent");
      return;
    }

    setCurrentCenter("khasino");
    setActiveGame(game);
    setActiveCasino(game);
    const gamelink = await launchGame(game);
    if (gamelink && gamelink.code == 1) {
      setCurrentGame(gamelink.gameUrl);
    }
  };
  const lauchGame = async (game) => {
    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setCurrentCenter("userconsent");
      return;
    }

    // setCurrentCenter("supplycasino");
    // setActiveGame(game);
    // setActiveCasino(game);
    const gamelink = await launchGame(game);
    if (gamelink && gamelink.code == 1) {
      // setCurrentGame({ url: gamelink.gameUrl, source: "gap" });
      localStorage.setItem("qq", gamelink.gameUrl);
      setTimeout(() => {
        router.push(`/casino?v=v`);
      }, 100);
    }
  };

  const GameList = () => (
    <>
      <div className="flex items-center bg-black overflow-x-auto scrollbar-hide">
        {casinoGames.map((game, index) => (
          <p
            key={index}
            className={`font-bold uppercase px-4 py-4 text-xs rounded-[40px] whitespace-nowrap  ${
              activeGame?.name === game.name
                ? "bg-warning text-black"
                : "border-r border-gray-100 text-white"
            }`}
            onClick={() => handleClick(game)}
          >
            {game.name}
          </p>
        ))}
      </div>
      <div className="grid md:grid-cols-4 grid-cols-3 gap-6 pt-4">
        {casinoGames.map((game, index) => (
          <div
            key={index}
            className={`sm:p-6 smp-2 font-bold uppercase text-md flex flex-col justify-start items-center text-black`}
            onClick={() => handleClick(game)}
          >
            <div className="relative kasino-container sm:h-[130px] h-[70px] sm:w-[130px] w-[80px]">
              <div
                className="fancy-shape shape-one"
                style={{
                  backgroundColor:
                    (globalSettings && globalSettings.topMenuBgColor) ||
                    "#0A5BAB",
                }}
              />
              <div
                className="fancy-shape shape-two overflow-hidden"
                style={{
                  backgroundColor:
                    (globalSettings && globalSettings.topMenuBgColor) ||
                    "#F6A21E",
                }}
              >
                <img
                  src={game.image || "b11.png"}
                  alt="game image"
                  className="w-full h-full object-cover  top-image kasino-img"
                />
              </div>
            </div>
            <p className="text-black text-center sm:text-lg text-ms p-2">
              {game.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );

  const GapList = () => (
    <>
      {/* {currentTab !== 0 && (
        
      )} */}

      <div className="flex items-center bg-black gap-x-2 overflow-x-auto px-4 py-2 scrollbar-hide">
        {currentTab === 0 ? (
          ""
        ) : categories.length > 0 ? (
          categories.map((categoryItem, index) => (
            <p
              key={index}
              className={`font-medium uppercase hover:border-b  text-xs px-4 py-1 rounded-[20px] whitespace-nowrap cursor-pointer transition-all duration-700 ease-in-out  text-white ${
                category === categoryItem.category
                  ? "border-yellow-400 border"
                  : "border-r border-gray-100"
              } `}
              onClick={() => setCategory(categoryItem.category)}
            >
              {categoryItem.category}
            </p>
          ))
        ) : ""}
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 px-4 gap-6 mt-4">
        {gapcasinoGames.map((game, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-cente bg-primary rounded-b-lg rounded-t-[20px] shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => lauchGame(game)}
          >
            <div className="relative w-full h-40 sm:h-48 rounded-t-[20px] overflow-hidden">
              <img
                src={game.url}
                alt={game.game_name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white uppercase text-center font-semibold text-md py-1">
              {game.game_name}
            </p>
            {/* <p className="text-gray-500 text-xs text-center">
              {game.category}
            </p> */}
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div
      className="flex flex-col w-full border-b border-black/[0.2] "
      style={{
        backgroundImage: "url(/bgcasino.png)",
        backgroundSize: "contain",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex items-center w-full gap-x-4 bg-primary text-white overflow-x-auto scrollbar-hide">
        <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 0 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(0);
            setCategory("");
          }}
        >
          POPULAR CASINO
        </div>
        <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 1 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(1);
            setCategory("");
          }}
        >
          ALL CASINO
        </div>
        <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 2 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(2);
            setCategory("");
          }}
        >
          OTHER CASINO
        </div>
        {providers &&
          providers.map((provider) => {
            return (
              <div
                key={provider.provider_name}
                className={`uppercase text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
                  currentTab === provider.provider_name
                    ? "bg-warning text-black"
                    : ""
                }`}
                onClick={() => {
                  setCurrentTab(provider.provider_name);
                  setCategory("");
                }}
              >
                {provider.provider_name}
              </div>
            );
          })}
      </div>

      {currentTab == 2 ? (
        <>
          <GameList />
        </>
      ) : currentTab == 0 ? (
        <>
          <GapList />
        </>
      ) : (
        <>
          <GapList />
        </>
      )}
    </div>
  );
};

export default CasinoHome;
