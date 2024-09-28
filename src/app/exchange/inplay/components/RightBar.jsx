"use client";
import Advertising from "src/app/components/Right/Advertising";
import React from "react";
import Betslip from "./betslip/Betslip";
import MainAdvertising from "src/app/components/Right/MainAds";

const RightBar = () => {
  return (
    <div className="ml-1 sticky top-16 w-full">
      <div className=" pb-10  rounded w-full">
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
