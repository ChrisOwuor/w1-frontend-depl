"use client";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import RightBar from "../../../components/Right/RightBar";
import React from "react";
import { UserBetslipProvider } from "../../../context/BetslipContext";
import { AuthProvider } from "../../../context/AuthContext";
import { OpenEventProvider } from "../../../context/OpenEventContext";
import Crickets from "./components/Crickets";
import Link from "next/link";
import Bottom from "src/app/components/Navbar/Bottom";

const Container = () => {
  return (
    <UserBetslipProvider>
      <AuthProvider>
        <OpenEventProvider>
          <main className="relative flex min-h-screen flex-col text-white items-center">
            <Navbar />
            <div className="sticky top-0 w-full z-50">
              <Bottom />
            </div>

            <div className="md2:mx-[8%] lg1:mx-[12%]">
              <div className="w-full grid grid-cols-12 ">
                <div className="col-span-2 flex flex-col">
                  <div className="mt-3">
                    <Link
                      href="/"
                      className="bg-gray-900 p-2 rounded font-bold text-sm"
                    >
                      {"<"} Back
                    </Link>
                  </div>
                </div>

                <div className="col-span-7 flex flex-col m-2">
                  <Crickets />
                </div>

                <div className="col-span-3">
                  <RightBar />
                </div>
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
};

export default Container;
