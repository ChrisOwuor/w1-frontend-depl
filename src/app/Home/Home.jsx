"use client";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import RightBar from "../components/Right/RightBar";
import { useState } from "react";
import { UserBetslipProvider } from "../context/BetslipContext";
import BottomAd from "../components/adverts/BottomAds";
import { AuthProvider } from "../context/AuthContext";
import { OpenEventProvider } from "../context/OpenEventContext";
import CenterMain from "./CenterMain";
import Bottom from "../components/Navbar/Bottom";
import Link from "next/link";

export default function Home() {
  const [selectedLink, setSelectedLink] = useState("cricket");
  return (
    <UserBetslipProvider>
      <AuthProvider>
        <OpenEventProvider>
          <main className="relative flex min-h-screen flex-col items-center">
            <Navbar />

            <div className="relative bg-black flex items-cente w-full h-[50vh]">
              <img
                alt="..."
                className="w-full h-full object-cover"
                src="https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              />
              {/* custom shadow for */}
              <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900/[0.8]">
                <div className="grid grid-cols-4 h-[50vh]">
                  <div className="col-span-1"></div>
                  <div className="col-span-1 items-center justify-center  flex flex-col">
                    <div className="">
                      <div className="flex flex-col gap-2">
                        <p className="text-white uppercase font-bolder text-5xl">
                          EASY
                        </p>
                        <p className="text-white uppercase font-bolder text-5xl">
                          BETS
                        </p>
                        <p className="mt-2 text-white uppercase font-bold text-2xl">
                          WITH THE LOWEST
                        </p>
                        <p className="text-white uppercase font-bold text-2xl">
                          COMMISSIONS
                        </p>
                      </div>
                      <div className="flex my-2">
                        <p className="text-white rounded hover:bg-white hover:text-black cursor-pointer p-2 border  border-white">
                          <Link href="/register">Join Us</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1"></div>
                  <div className="col-span-1"></div>
                </div>
              </div>
            </div>

            <div className="sticky top-0 w-full z-50 mb-4">
              <Bottom />
            </div>

            <div className="flex min-h-screen flex-col items-center mx-0 md2:mx-[8%] lg1:mx-[12%]">
              {/* sidebar */}
              <div className="w-full rounded-b">
                <Sidebar
                  setSelectedLink={setSelectedLink}
                  activeLink={selectedLink}
                />
              </div>

              <div className="w-full grid grid-cols-10 gap-x-1">
                <div className="col-span-7 flex flex-col h-auto">
                  <CenterMain active={selectedLink} />
                </div>

                <div className="col-span-3">
                  <RightBar />
                </div>
              </div>
              {/* bottom ads */}
              <div className="w-full grid grid-cols-12">
                <div className="col-span-2"></div>
                <div className="col-span-7">
                  <BottomAd />
                </div>
                <div className="col-span-3"></div>
              </div>
            </div>
            {/* footer */}
            <div className="w-full bg-gray-900">
              <div className="md2:mx-[8%] lg1:mx-[12%]">
                <Footer />
              </div>
            </div>
          </main>
        </OpenEventProvider>
      </AuthProvider>
    </UserBetslipProvider>
  );
}
