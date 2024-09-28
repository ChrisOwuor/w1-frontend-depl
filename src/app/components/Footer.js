"use client";
import { Text } from "@mantine/core";
import React from "react";


export default function Footer() {
  return (
    <div className="relative bg-gray grid grid-cols-12 items-center pt-10 border-t-2 border-black/[0.2]">
      <div className="footer-gradient z-0 absolute"></div>

      <div className="col-span-12 flex flex-col  justify-center h-full">
        <div className="flex justify-center items-center">
          <div className="flex gap-x-4 items-center">
            <Text color="dimmed" className="text-sm font-bold text-black tracking-wide border-r-2 px-2 border-black/[0.2]">
              Privacy Policy
            </Text>
            <Text color="dimmed" className="text-sm font-bold text-black tracking-wide border-r-2 px-2 border-black/[0.2]">
              KYC
            </Text>
            <Text color="dimmed" className="text-sm font-bold text-black tracking-wide border-r-2 px-2 border-black/[0.2]">
              Terms and Conditions
            </Text>
            <Text color="dimmed" className="text-sm font-bold text-black tracking-wide border-r-2 px-2 border-black/[0.2]">
              Rules and Regulations
            </Text>
            <Text color="dimmed" className="text-sm font-bold text-black tracking-wide">
              Responsible Gambling
            </Text>
          </div>

        </div>
        {/* <div className="flex items-center w-full md:gap-x-10">

          <p className={`${styles.footer_p}`}>Contact Us</p>
          <p className={`${styles.footer_p}`}>Help Center</p>
          <p className={`${styles.footer_p}`}>Responsible Gambling</p>
          <p className={`${styles.footer_p}`}><Link href="#">Cookie Policiy</Link></p>
          <p className={`${styles.footer_p}`}>Terms & Conditions</p>
        </div> */}

        {/* 

        <div className="flex text-white items-center gap-x-20 text-[0.7rem] py-20 font-semibold ">

          <div className="flex items-center">
            <Text
              color="dimmed"
              size="sm"
              className="text-[0.8rem] text-orange-500 text-center rounded uppercase font-bold"
            >
              Responsible Gaming
            </Text>
          </div>

          
          <div className="flex items-center">
            <Image
              src={eighteenPlus}
              width="50"
              height="50"
              
              alt="alt"
            />
          </div>

          <div className="flex items-center">
            <Text
              color="dimmed"
              size="sm"
              className="text-[0.7rem] text-gray-400 uppercase font-bold"
            >
              AuraBet is a product which operates in accordance with the License granted by SVG Gambling Commission under the license <span className="underline lowercase cursor-pointer" onClick={() => alert("Please contact support for more details")}> Click</span>
            </Text>
          </div>


        </div> */}



      </div>
    </div>
  );
}
