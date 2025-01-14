"use client";

import React, { useContext, useEffect, useState } from "react";
import { NAVContext } from "@/app/context/NavContext";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { useSearchParams } from "next/navigation";
import { launchGame2 } from "@/app/api/casino/casino";
import Bottom from "../BottomNav";
import { getGlobalSetings } from "@/app/api/exchange";
import CasinoTopbar from "../CasinoTopbar";

ChartJS.register(ArcElement, Tooltip, Legend);

const GapView = () => {
  const {currentCenter, setCurrentCenter } = useContext(NAVContext);
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true); // Track loading state
  const [qq, setQq] = useState(null); // Store localStorage data in state
  const gamecode = searchParams.get("q");
  const [globalSettings, setGlobalSettings] = useState();

  useEffect(() => {
    launchGame2(gamecode).finally(() => setLoading(false)); // End loading after game launch
  }, [gamecode]);

  // useEffect(() => {
  //   if (!isAuthenticated()) {
  //     setCurrentCenter("userconsent");
  //     return;
  //   }
  // }, [currentCenter]);

  // Access localStorage safely
  useEffect(() => {
    runner();
    if (typeof window !== "undefined") {
      const storedQq = localStorage.getItem("qq");
      setQq(storedQq);
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
  

  return (
    <div className="flex flex-col  w-full h-[100vh] text-black">
      <Bottom
        // toggleSideBar={toggleSideBar}
        setCurrentCenter={setCurrentCenter}
        globalSettings={globalSettings}
      />
      {loading ? (
        <div className="text-xl font-bold">Loading...</div> // Display loading message
      ) : qq ? (
        <iframe
          src={qq}
          title="GAME UI"
          width="100%"
          height="100%"
          allowFullScreen
        />
      ) : (
        <div className="text-xl font-bold">Game data not available.</div>
      )}
    </div>
  );
};

export default GapView;
