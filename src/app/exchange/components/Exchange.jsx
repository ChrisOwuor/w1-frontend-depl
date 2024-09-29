"use client"
import React, { useContext, useEffect, useState } from "react";
import Footer from "src/app/components/Footer";
import Bottom from "./BottomNav";
import Sidebar from "./SideBar";
import HorizontalSlides from "../ads/Slider";
import jwt_decode from "jwt-decode"
import Loading from "./Loading"
import MobileSideBar from "./MobileSidebar";
import MobileFooter from "src/app/components/MobileFooter";
import MobileBottom from "src/app/components/Navbar/MobileBottom";
import MobileBottomNav from "src/app/components/Navbar/MobileBottomNav";
import SlidingText from "../ads/SlidingText";
import MainSectionCenter from "./events/Cricket";
import Populars from "./events/Popular";
import ProfitLoss from "./ProfitLoss";
import { NAVContext } from "@/app/context/NavContext";
import AccountStatements from "./AccountStatements";
import BetHistory from "./BetHistory";
import MyProfile from "./Profile";
import InPlay from "./Inplay";
import Markets from "../(e)/ev_c/components/Markets";
import ExBetslip from "./betslip/Betslip";
import MarketsSidebar from "./MarketsSideBar";
import MobileMarketsSideBar from "../mobile/components/MobileMarketsSidebar";
import { getGlobalSetings } from "@/app/api/exchange";
import Casino from "./casino/Casino";
import AccountHome from "./Account";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import UserConsentWizard from "@/app/components/Modal/UserConsentWizard";
import LoginPage from "@/app/components/auth/LoginPage";

const Exchange = () => {
  const { currentCenter, setCurrentCenter, view, goToLogin, setGoToLogin } = useContext(NAVContext)
  const [globalSettings, setGlobalSettings] = useState({})
  const [selectedLink, setSelectedLink] = useState("cricket");
  const [display, setDisplay] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [hideMarketSideBar, setHideMarketSideBar] = useState(false)
  


  useEffect(() => {
    const tk = localStorage.getItem("tk");


    runner()
    if (tk) {
      const decoded = jwt_decode(tk);
      if (decoded.role === "normalUser") {
        setDisplay(true)
      } else {
        alert(
          "Oops you dont have permission to access any services contact support for help!"
        );
      }
    } else {
      setDisplay(true)
    }

  }, [])


  const [hideSideBar, setHideSideBar] = useState(false)
  const runner = async () => {
    try {
      const globalSettings_ = await getGlobalSetings()
      setGlobalSettings(globalSettings_)
    } catch (error) {
      console.error(error)
    }
  }



  const toggleSideBar = () => setHideSideBar(prev => !prev)

  const toggleMarketSideBar = () => {
    setHideMarketSideBar(prev => !prev)
  }


  return (

    <>

      {
        goToLogin ? (
          <div className="bg-gradient-to-b from-[#525252] to-[#000] h-screen w-full flex flex-col">
            <div className="flex items-center justify-end px-12 pt-6">
              <CloseRoundedIcon onClick={() => setGoToLogin(false)} fontSize="large" className="cursor-pointer bg-warning rounded-lg font-bold p-1.5 text-black" />
            </div>
            <div className="flex justify-center items-center h-full pb-22 max-sm:px-10">
              <LoginPage globalSettings={globalSettings} />
            </div>
          </div>
        )
          : <>
            {
              display ?

                <div className="relative w-full h-full bg-gray">
                  <div className=" text-white grid grid-cols-12 bg-gray gap-x-2">
                    {/* <Navbar /> */}
                    <div className="col-span-12 max-mk:hidden absolute sticky top-0 z-9999">
                      <Bottom toggleSideBar={toggleSideBar} setCurrentCenter={setCurrentCenter} globalSettings={globalSettings} />
                    </div>



                    <div className="col-span-12 md:mx-4 md:my-2 grid grid-cols-12 relative" >
                      <div className='col-span-2 bg-white sticky top-26 z-99'>
                        <div className="max-md:hidden">
                          {
                            currentCenter === "event_markets" ?
                              <MarketsSidebar />
                              :
                              <Sidebar setSelectedLink={setSelectedLink} activeLink={selectedLink} />
                          }
                        </div>
                        <div className={`${hideSideBar ? "slideInLeft" : "slideOutLeft"
                          } fixed top-14 left-0 bottom-0 right-0 w-full md:col-span-2 flex flex-col`}>
                          <MobileSideBar setSelectedLink={setSelectedLink} activeLink={selectedLink} toggleSideBar={toggleSideBar} />
                        </div>
                        <div className={`${!hideMarketSideBar ? "slideOutLeft" : "slideInLeft"
                          } fixed top-14 left-0 bottom-0 min-w-[100%] md:col-span-2 flex flex-col`}>
                          <MobileMarketsSideBar setSelectedLink={setSelectedLink} activeLink={selectedLink} toggleMarketSideBar={toggleMarketSideBar} />
                        </div>
                      </div>
                      <div className="col-span-12 md:col-span-7 bg-gray sm:p-2 ">
                        <div className="mk:hidden sticky right-0 left-0 top-0 z-999">
                          <MobileBottom toggleSideBar={toggleSideBar} globalSettings={globalSettings} />
                        </div>
                        <div className="col-span-1 max-sm:hidden">
                          <div className="w-full">
                            <SlidingText />
                          </div>
                        </div>

                        <div className="  min-h-[80vh]">
                          {
                            view != "" && currentCenter &&
                            (() => {
                              switch (currentCenter) {
                                case "events":
                                  return <MainSectionCenter />
                                case "home":
                                  return (
                                    <div className="w-full">
                                      <HorizontalSlides globalSettings={globalSettings} />
                                      <Populars />
                                      <Casino globalSettings={globalSettings} />
                                    </div>
                                  );
                                case "event_markets":
                                  return (
                                    <div className='relative z-1 cols-span-12  h-full'>
                                   <Markets toggleMarketSideBar={toggleMarketSideBar} refresh={refresh} setRefresh={setRefresh} globalSettings={globalSettings} />
                                    </div>
                                  )
                                case "p&l":
                                  return <ProfitLoss />
                                case "account":
                                  return <AccountHome />
                                case "userconsent":
                                  return (
                                    <div className="fixed top-0 z-999 bottom-0 right-0 left-0 flex justify-center items-center bg-black/[0.85]">
                                      <UserConsentWizard />
                                    </div>
                                  )
                                case "ac_statements":
                                  return <AccountStatements />
                                case "bet_history":
                                  return <BetHistory />
                                case "profile":
                                  return <MyProfile />
                                case "inplay":
                                  return <InPlay />
                                default:
                                  return null;
                              }
                            })()
                          }
                        </div>

                        <div className="max-mk:hidden py-10 ">
                          <Footer />
                        </div>
                        <div className="mk:hidden w-full p-2">
                          <MobileFooter globalSettings={globalSettings} />
                        </div>
                        <div className="mk:hidden fixed bottom-0 right-0 left-0 z-99999">
                          <MobileBottomNav toggleSideBar={toggleSideBar} setHideSideBar={setHideSideBar} globalSettings={globalSettings} />
                        </div>
                      </div>
                      <div className="col-span-3 bg-white max-md:hidden">
                        <ExBetslip />
                      </div>
                    </div>
                  </div>


                </div> : (
                  <Loading globalSettings={globalSettings} stylings={"h-screen w-screen justify-center flex"} />
                )
            }
          </>
      }
    </>
  );
};

export default Exchange;

