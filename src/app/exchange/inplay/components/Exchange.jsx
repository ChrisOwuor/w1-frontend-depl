import React, { useState } from "react";
import Footer from "src/app/components/Footer";
import Bottom from "src/app/components/Navbar/Bottom";

import Main from "./Main";

import { AuthProvider } from "src/app/context/AuthContext";
import { OpenExchangeEventProvider } from "src/app/context/exchange/OpenExchangeEventProvider";
import { UserExchangeBetslipProvider } from "src/app/context/exchange/UserExchangeBetslipContext";
import { CompetitionProvider } from "src/app/context/exchange/CompetitonContext";
import Sidebar from "./SideBar";
import { MarketBookProvider } from "src/app/context/exchange/MarketBookContext";
import MobileBottom from "src/app/components/Navbar/MobileBottom";


const Exchange = () => {
  const [selectedLink, setSelectedLink] = useState("cricket");
  const [hideSideBar, setHideSideBar] = useState(false)
  const toggleSideBar = () => setHideSideBar(prev => !prev)
  return (

    <AuthProvider>
      <OpenExchangeEventProvider>
        <UserExchangeBetslipProvider>
          <CompetitionProvider>
            <MarketBookProvider>
              <div className="relative text-white bg-gray-900 relative grid grid-cols-12">

                <div className='relative col-span-2 bg-[#031123] p-1 flex flex-col border-r-2 border-gray-500/[0.5]'>
                  <Sidebar setSelectedLink={setSelectedLink} activeLink={selectedLink} />
                </div>
                <div className="col-span-10 bg-gray-900 m-1">
                  <div className="max-mk:hidden">
                    <Bottom toggleSideBar={toggleSideBar} />
                  </div>
                  <div className="mk:hidden">
                    <MobileBottom toggleSideBar={toggleSideBar} />
                  </div>
                  <div className="min-h-[80vh]">
                    <Main selectedLink={selectedLink} />
                  </div>
                  <div className="">
                    <Footer />
                  </div>
                </div>
              </div>
            </MarketBookProvider>
          </CompetitionProvider>
        </UserExchangeBetslipProvider>
      </OpenExchangeEventProvider>
    </AuthProvider >
  );
};

export default Exchange;

