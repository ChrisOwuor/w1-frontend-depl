import React, { useContext, useState } from 'react'
import { AuthProvider } from "src/app/context/AuthContext";
import { UserExchangeBetslipProvider } from "src/app/context/exchange/UserExchangeBetslipContext";
import MyBets from './bets/Mybets';
import Sidebar from '../components/SideBar';
import Bottom from 'src/app/components/Navbar/Bottom';
import Footer from 'src/app/components/Footer';


import { OpenExchangeEventProvider } from "src/app/context/exchange/OpenExchangeEventProvider";
import { CompetitionProvider } from "src/app/context/exchange/CompetitonContext";
import { MarketBookProvider } from "src/app/context/exchange/MarketBookContext";
import MobileFooter from 'src/app/components/MobileFooter';
import MobileBottomNav from '@/app/components/Navbar/MobileBottomNav';
import MobileSideBar from '../components/MobileSidebar';
import MobileBottom from '@/app/components/Navbar/MobileBottom';


const Dashboard = () => {
  const [selectedLink, setSelectedLink] = useState("");
  const [hideSideBar, setHideSideBar] = useState(true)
  const toggleSideBar = () => setHideSideBar(prev => !prev)
  return (
    <AuthProvider>
      <OpenExchangeEventProvider>
        <UserExchangeBetslipProvider>
          <CompetitionProvider>
            <MarketBookProvider>
              <div className="relative text-white h-[100vh] grid grid-cols-12">
                <div className={`${hideSideBar ? "hidden" : ""} fixed top-0 left-0 bottom-0  min-w-[100%]  z-50 md:col-span-2    flex flex-col border-r-2 border-gray-500/[0.5]`}>
                  <MobileSideBar setSelectedLink={setSelectedLink} activeLink={selectedLink} toggleSideBar={toggleSideBar} />
                </div>

                <div className='col-span-2 border-r-2 border-gray-900/[0.9]'>
                  <div className="max-md:hidden absolute h-[100vh] bg-white sticky top-0 bottom-0 left-0 z-50">
                    <Sidebar setSelectedLink={setSelectedLink} activeLink={selectedLink} />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-10">
                  <div className="max-mk:hidden sticky top-0 z-50">
                    <Bottom toggleSideBar={toggleSideBar} />
                  </div>
                  <div className="mk:hidden sticky top-0 z-50">
                    <MobileBottom toggleSideBar={toggleSideBar} />
                  </div>
                  <div className="min-h-[80vh]">
                    <MyBets />
                  </div>
                  <div className="max-mk:hidden">
                    <Footer />
                  </div>
                  <div className="mk:hidden w-full">
                    <MobileFooter />
                  </div>
                  <div className="mk:hidden sticky bottom-0 z-50">
                    <MobileBottomNav toggleSideBar={toggleSideBar} />
                  </div>
                </div>
              </div>


            </MarketBookProvider>
          </CompetitionProvider>
        </UserExchangeBetslipProvider>
      </OpenExchangeEventProvider>
    </AuthProvider >
  )
}

export default Dashboard