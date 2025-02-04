"use client";
import React, { useContext, useEffect, useState } from "react";
import Bottom from "./BottomNav";
import HorizontalSlides from "./betslip/ads/Slider";
import jwt_decode from "jwt-decode";
import Loading from "./Loading";
import MobileBottom from "src/app/components/Navbar/MobileBottom";
import SlidingText from "./betslip/ads/SlidingText";
import MainSectionCenter from "./events/Cricket";
import ProfitLoss from "./ProfitLoss";
import { NAVContext } from "@/app/context/NavContext";
import AccountStatements from "./AccountStatements";
import BetHistory from "./BetHistory";
import MyProfile from "./Profile";
import Markets from "../(e)/ev_c/components/Markets";
import { getGlobalSetings } from "@/app/api/exchange";
import AccountHome from "./Account";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import UserConsentWizard from "@/app/components/Modal/UserConsentWizard";
import LoginPage from "@/app/components/auth/LoginPage";
import PlaceBetCasino from "./betslip/PlaceBetCasino";
import { CasinoContext } from "@/app/context/CasinoContext";
import CasinoNotifications from "@/app/components/casino_uis/modals/CasinoNotifications";
import CricketHome from "./events/CricketHome";
import RaceMarkets from "@/app/components/markets/RaceMarkets";
import { useSearchParams } from "next/navigation";
import Sidebar2 from "./Sidebar2";
import TopCasinoGames from "./events/TopCasinoGames";
import Populars2 from "./events/Populars2";
import CasinoProvider from "./events/CasinoProvider";
import CasinoPopulars from "./events/CasinoPopulars";
import FooterKhiladi from "@/app/components/FooterKhiladi";
import MobileBottomNavKhiladi from "@/app/components/Navbar/MobileBottomNavKhiladi";
import Inplay from "./events/Inplay";
import AccountViewKheladi from "./AccountViewKheladi";
import ProfileKheladi from "./ProfileKheladi";
import StakeSettingsKheladi from "./StakeSettingsKheladi";
import ProfitLossKheladi from "./ProfitLossKheladi";
import BetHistoryKheladi from "./BetHistoryKheladi";
import MarketsKheladi from "../(e)/ev_c/components/MarketsKheladi";
import ExBetslip from "./betslip/Betslip";
import RulesKheladi from "./RulesKheladi";
import FaqsKheladi from "./FaqsKheladi";
import PomotionsKheladi from "./PomotionsKheladi";
import OurSponsorshipKheladi from "./OurSponsorshipKheladi";

const Exchange = () => {
  const {
    currentCenter,
    setCurrentCenter,
    view,
    goToLogin,
    activeCasino,
    setGoToLogin,
    newMobileNavOpen,
    accountViewOpen,
    setAccountViewOpen,
  } = useContext(NAVContext);
  const { openBetForm, message } = useContext(CasinoContext);
  const [globalSettings, setGlobalSettings] = useState({});
  const [hideSideBar, setHideSideBar] = useState(false);
  const [selectedLink, setSelectedLink] = useState("cricket");
  const [display, setDisplay] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [hideMarketSideBar, setHideMarketSideBar] = useState(false);
  const [visible, setVisible] = useState(false);
  const searchParams = useSearchParams();
  const showCasino = searchParams.get("v");

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const tk = localStorage.getItem("tk");

    runner();
    if (tk) {
      const decoded = jwt_decode(tk);
      if (decoded.role === "normalUser") {
        setDisplay(true);
      } else {
        alert(
          "Oops you dont have permission to access any services contact support for help!"
        );
      }
    } else {
      setDisplay(true);
    }
  }, []);

  const runner = async () => {
    try {
      const globalSettings_ = await getGlobalSetings();

      setGlobalSettings(globalSettings_);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSideBar = () => setHideSideBar((prev) => !prev);

  const toggleMarketSideBar = () => {
    setHideMarketSideBar((prev) => !prev);
  };
  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 320px)").matches;

    if (openBetForm && isSmallScreen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openBetForm]);

  return (
    <>
      {goToLogin ? (
        <div className="bg-gradient-to-b from-[#525252] to-[#000] h-screen w-full flex flex-col">
          <div className="flex items-center justify-end px-12 pt-6">
            <CloseRoundedIcon
              onClick={() => setGoToLogin(false)}
              fontSize="large"
              className="cursor-pointer bg-warning rounded-lg font-bold p-1.5 text-black"
            />
          </div>
          <div className="flex justify-center items-center h-full pb-22 max-sm:px-10">
            <LoginPage globalSettings={globalSettings} />
          </div>
        </div>
      ) : (
        <>
          {display ? (
            <div className="relative w-full h-full bg-white">
              {openBetForm && (
                <div className="sm:hidden fixed top-0 bottom-0 left-0 right-0 z-9999 bg-black/[0.9] flex overflow-hidden">
                  <div className="flex items-start w-full">
                    <PlaceBetCasino />
                  </div>
                </div>
              )}

              {message !== "" && (
                <div className="fixed top-0 left-0 right-0 z-99999 overflow-hidden">
                  <div
                    className={`w-full flex items-start justify-center transition-transform duration-500 ${
                      visible ? "slide-in" : "slide-out"
                    }`}
                  >
                    <CasinoNotifications />
                  </div>
                </div>
              )}
              <div className=" text-white grid grid-cols-12 bg-gray">
                {/* <Navbar /> */}
                <div
                  className={`col-span-12 ${
                    showCasino ? "" : "sticky"
                  } top-0 z-9999`}
                >
                  <div className="max-kh:hidden">
                    <Bottom
                      toggleSideBar={toggleSideBar}
                      setCurrentCenter={setCurrentCenter}
                      globalSettings={globalSettings}
                    />
                  </div>
                  <div className="kh:hidden">
                    <MobileBottom
                      toggleSideBar={toggleSideBar}
                      globalSettings={globalSettings}
                    />
                  </div>
                  {/* casino */}
                  {showCasino && (
                    <div className="col-span-12 h-full ">
                      <GapView />
                    </div>
                  )}
                </div>

                {/* exchange */}

                <div
                  className={`col-span-12 flex sm:mx-2 ${
                    showCasino && "idden"
                  }`}
                >
                  {/* side section */}
                  <div
                    className={` ${
                      newMobileNavOpen
                        ? "block bg-white absolute z-30 w-[240px] "
                        : "hidden bg-white fixed"
                    } shadow-md  kh:block h-screen py-[5px] kh:w-[240px] w-0 `}
                  >
                    <Sidebar2
                      setSelectedLink={setSelectedLink}
                      activeLink={selectedLink}
                    />
                  </div>
                  {/* <div className="col-span-2 bg-white max-md:hidden">
                    {currentCenter === "event_markets" ? (
                      ["7", "4339"].includes(view.sportId) ? (
                        <MarketsSidebar />
                      ) : (
                        <MarketsSidebar />
                      )
                    ) : (
                      <Sidebar
                        setSelectedLink={setSelectedLink}
                        activeLink={selectedLink}
                      />
                    )}
                  </div> */}
                  {/* center section */}
                  {/* <div className="  bg-green-200  overflow-y-scroll hide-scrollbar ml-[256px] h-screen w-[calc(100%-256px)]">
                    hello from center
                    </div> */}
                  <div className="bg-[#f6f9ff]  h-full w-full   kh:ml-[240px]  ml:0 kh:w-[calc(100%-240px)] ">
                    {/* <div className="col-span-12 sm:col-span-9 md:col-span-7 bg-gray  overflow-y-scroll hide-scrollbar"> */}
                    <div className="col-span-1 max-sm:hidden ">
                      <div className="w-full ">
                        {view != "" && currentCenter == "home" && (
                          <SlidingText />
                        )}
                      </div>
                    </div>

                    <div className="">
                      {view != "" &&
                        currentCenter &&
                        (() => {
                          switch (currentCenter) {
                            case "events":
                              return <MainSectionCenter />;
                            case "home":
                              return (
                                <div className="w-full">
                                  <HorizontalSlides
                                    globalSettings={globalSettings}
                                  />
                                  <TopCasinoGames />
                                  <Populars2 />
                                  {/* <CasinoView globalSettings={globalSettings} /> */}
                                  <CasinoProvider />
                                </div>
                              );
                            case "cricket":
                            case "football":
                            case "tennis":
                            case "politics":
                            case "basketball":
                            case "greyhoundracing":
                            case "horseracing":
                              return (
                                <div className="w-full">
                                  <HorizontalSlides
                                    globalSettings={globalSettings}
                                  />
                                  <CricketHome />
                                </div>
                              );
                            case "virtualsports":
                              return (
                                <div className="w-full">
                                  <HorizontalSlides
                                    globalSettings={globalSettings}
                                  />
                                  <p className="text-lg font-bold leading-loose p-10 text-primary uppercase">
                                    {currentCenter + " "} Coming soon
                                  </p>
                                </div>
                              );
                            case "allcasinos":
                              return (
                                <div className="w-full">
                                  {/* <HorizontalSlides
                                    globalSettings={globalSettings}
                                  /> */}
                                  {/* <CasinoView globalSettings={globalSettings} /> */}
                                  <CasinoPopulars />
                                </div>
                              );
                            case "event_markets":
                              return (
                                <div className="relative z-1 cols-span-12  h-full">
                                  {["7", "4339"].includes(view.sportId) ? (
                                    <RaceMarkets
                                      toggleMarketSideBar={toggleMarketSideBar}
                                      refresh={refresh}
                                      setRefresh={setRefresh}
                                      globalSettings={globalSettings}
                                    />
                                  ) : (
                                    // <Markets
                                    //   toggleMarketSideBar={toggleMarketSideBar}
                                    //   refresh={refresh}
                                    //   setRefresh={setRefresh}
                                    //   globalSettings={globalSettings}
                                    // />
                                    <MarketsKheladi
                                      toggleMarketSideBar={toggleMarketSideBar}
                                      refresh={refresh}
                                      setRefresh={setRefresh}
                                      globalSettings={globalSettings}
                                    />
                                  )}
                                </div>
                              );
                            case "khasino":
                              return <CasinoWindow />;
                            case "login":
                              return <LoginPage/>;
                            case "rules":
                              return <RulesKheladi />;
                            case "faqs":
                              return <FaqsKheladi />;
                            case "promotions":
                              return <PomotionsKheladi />;
                            case "our_sponsorship":
                              return <OurSponsorshipKheladi />;
                            case "supplycasino":
                              return <GapView />;
                            case "p&l":
                              // return <ProfitLoss />;
                              return <ProfitLossKheladi />;
                            case "account":
                              // return <AccountHome />;
                              return <StakeSettingsKheladi />;
                            case "sports":
                              return (
                                <div className="w-full">
                                  <HorizontalSlides
                                    globalSettings={globalSettings}
                                  />
                                  <Populars2 />
                                  {/* <CasinoView globalSettings={globalSettings} /> */}
                                </div>
                              );
                            // return (
                            //   <MobileSideBar
                            //     setSelectedLink={setSelectedLink}
                            //     activeLink={selectedLink}
                            //     toggleSideBar={toggleSideBar}
                            //   />
                            // );
                            case "userconsent":
                              return (
                                <div className="fixed top-0 z-999 bottom-0 right-0 left-0 flex justify-center items-center bg-black/[0.85]">
                                  <UserConsentWizard />
                                </div>
                              );
                            case "ac_statements":
                              return <AccountStatements />;
                            case "unsettled_bets":
                              // return <BetHistory />;
                              return <BetHistoryKheladi />;
                            // case "profile":
                            //   return <MyProfile />;
                            case "profile":
                              return <ProfileKheladi />;
                            case "bet_history":
                              return <ExBetslip />;

                            case "in-play":
                              // return <InPlay />;
                              return (
                                <>
                                  <HorizontalSlides
                                    globalSettings={globalSettings}
                                  />
                                  <Inplay />
                                </>
                              );
                            default:
                              return null;
                          }
                        })()}
                    </div>

                    <div className="max-mk:hidden  ">
                      {/* <Footer /> */}
                      <FooterKhiladi globalSettings={globalSettings} />
                    </div>
                    <div className="mk:hidden w-full pb-[70px]">
                      {/* <MobileFooter globalSettings={globalSettings} /> */}
                      <FooterKhiladi globalSettings={globalSettings} />
                    </div>
                    <div className="mk:hidden ">
                      {/* <MobileBottomNav
                        setCurrentCenter={setCurrentCenter}
                        toggleSideBar={toggleSideBar}
                        setHideSideBar={setHideSideBar}
                        globalSettings={globalSettings}
                        /> */}
                      <MobileBottomNavKhiladi
                        setCurrentCenter={setCurrentCenter}
                        toggleSideBar={toggleSideBar}
                        setHideSideBar={setHideSideBar}
                        globalSettings={globalSettings}
                      />
                    </div>

                    {/* </div> */}
                  </div>
                  {/* right section */}
                  {/* <div className="col-span-3 bg-white max-sm:hidden">
                    {activeCasino && currentCenter == "khasino" ? (
                      <>
                        <PlaceBetCasino />
                        <CasinoBets />
                      </>
                    ) : (
                      <ExBetslip />
                    )}
                  </div> */}
                  <div
                    className={` ${
                      accountViewOpen
                        ? "block  absolute right-0 z-30 w-[240px] "
                        : "hidden w-0"
                    } shadow-md h-screen `}
                  >
                    <div className="text fixed bg-white  h-screen w-[240px]">
                      <AccountViewKheladi
                        setSelectedLink={setSelectedLink}
                        activeLink={selectedLink}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loading
              globalSettings={globalSettings}
              stylings={"h-screen w-screen justify-center flex"}
            />
          )}
        </>
      )}
    </>
  );
};

export default Exchange;
