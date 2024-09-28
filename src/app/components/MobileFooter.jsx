"use client";
import { Text } from "@mantine/core";
import React from "react";
import Image from "next/image";

export default function MobileFooter({ globalSettings }) {
  return (
    <>
      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center bg-gray pb-40 pt-10 justify-center">
        <p className="text-sm font-semibold text-primary text-center m-0 px-4 cursor-pointer">Privacy Policy</p>
        <p className="text-sm font-semibold text-primary text-center m-0 px-4 cursor-pointer">KYC</p>
        <p className="text-sm font-semibold text-primary text-center m-0 px-4 cursor-pointer">Terms and Conditions</p>
        <p className="text-sm font-semibold text-primary text-center m-0 px-4 cursor-pointer">Rules and Regulations</p>
        <p className="text-sm font-semibold text-primary text-center m-0 px-4 cursor-pointer">Responsible Gambling</p>
      </div>
      {/* <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${globalSettings?.businessLogo || "uploads/betlogo.png"}`} alt="profile" className="w-26 h-full" /> */}
    </>
  );
}
