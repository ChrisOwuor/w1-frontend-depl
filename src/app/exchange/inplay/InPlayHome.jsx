import React, { useState } from "react";
import Footer from "src/app/components/Footer";
import Bottom from "src/app/components/Navbar/Bottom";
import Sidebar from "../components/SideBar";
import { AuthProvider } from "src/app/context/AuthContext";
import { OpenExchangeEventProvider } from "src/app/context/exchange/OpenExchangeEventProvider";
import { UserExchangeBetslipProvider } from "src/app/context/exchange/UserExchangeBetslipContext";
import { CompetitionProvider } from "src/app/context/exchange/CompetitonContext";
import { MarketBookProvider } from "src/app/context/exchange/MarketBookContext";
import { MantineProvider } from '@mantine/core';
import MobileSideBar from "../components/MobileSidebar";
import MobileFooter from "src/app/components/MobileFooter";
import MobileBottom from "src/app/components/Navbar/MobileBottom";
import MobileBottomNav from "src/app/components/Navbar/MobileBottomNav";
import InPlayCenter from "./components/events/InplayComponent";
import SlidingText from "../ads/SlidingText";
import { useSearchParams } from "next/navigation";
import { NAVProvider } from "@/app/context/NavContext";


const InPlayHome = () => {
  const [selectedLink, setSelectedLink] = useState("cricket");
  const [hideSideBar, setHideSideBar] = useState(false)


  const searchParams = useSearchParams()
  const sp = searchParams.get("sp")
  const cp = searchParams.get("cp")
  const inp = searchParams.get("inp")


  const toggleSideBar = () => {
    inp === "on" ? setHideSideBar(true) :
      setHideSideBar(prev => !prev)
  }
  return (
    <AuthProvider>
      <OpenExchangeEventProvider>
        <UserExchangeBetslipProvider>
          <CompetitionProvider>
            <MarketBookProvider>
              <MantineProvider>
                <NAVProvider>
                  <div className=" text-white grid grid-cols-12">
                    <div className={`${!hideSideBar ? "hidden" : ""} fixed top-0 left-0 bottom-0  min-w-[100%]  z-50 md:col-span-2    flex flex-col border-r-2 border-gray-500/[0.5]`}>
                      <MobileSideBar setSelectedLink={setSelectedLink} activeLink={selectedLink} toggleSideBar={toggleSideBar} />
                    </div>
                    <div className='col-span-2 border-r-2 border-gray-900/[0.9]'>
                      <div className="max-md:hidden absolute h-[100vh] bg-white sticky top-0 bottom-0 left-0 z-50">
                        <Sidebar setSelectedLink={setSelectedLink} activeLink={selectedLink} />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-10">
                      {/* <Navbar /> */}
                      <div className="max-mk:hidden absolute sticky top-0 z-50">
                        <Bottom toggleSideBar={toggleSideBar} />
                      </div>

                      <div className="mk:hidden sticky right-0 left-0 top-0 z-30">
                        <MobileBottom toggleSideBar={toggleSideBar} />
                      </div>
                      <div className="col-span-10">
                        <div className="w-full">
                          <SlidingText />
                        </div>
                      </div>
                      <div className="min-h-[60vh] mx-1">
                        <InPlayCenter />
                      </div>
                      <div className="max-mk:hidden">
                        <Footer />
                      </div>
                      <div className="mk:hidden w-full">
                        <MobileFooter />
                      </div>
                      <div className="mk:hidden fixed bottom-0 right-0 left-0 z-50">
                        <MobileBottomNav toggleSideBar={toggleSideBar} />
                      </div>
                    </div>
                  </div>
                </NAVProvider>
              </MantineProvider>
            </MarketBookProvider>
          </CompetitionProvider>
        </UserExchangeBetslipProvider>
      </OpenExchangeEventProvider>
    </AuthProvider >
  );
};

export default InPlayHome;

