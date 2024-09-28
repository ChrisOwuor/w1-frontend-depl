"use client";
import React from "react";
import Betslip from "./Betslip";
import Advertising from "./Advertising";
import MainAdvertising from "./MainAds";
import Ads from "../Slider/Ads";

const RightBar = () => {
  return (
    <div className="ml-1 sticky top-16 w-full">
      <div className="my- bg-gray-900  rounded w-full">
      {/* betslip */}
      <div className="px-1">
        <Advertising />
        <Betslip />
      </div>
      <div className="p-1">
        <MainAdvertising />
      </div>
    </div>
    </div>
  );
};

export default RightBar;
