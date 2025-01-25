import React, { useContext, useEffect, useState } from "react";
import { NAVContext } from "@/app/context/NavContext";
import { AuthContext } from "@/app/context/AuthContext";
import { isAuthenticated } from "@/app/components/funcStore/authenticate";

const AccountHome = () => {
  const { setCurrentCenter } = useContext(NAVContext);

  const { setOpenLogin } =
    useContext(AuthContext);
  useEffect(() => {

    const loggedIN = isAuthenticated();
    if (!loggedIN) {
      setOpenLogin(true)
      setCurrentCenter("userconsent")

    }
  }, []);

  return (
    <div className="relative w-full bg-white flex items-center p-4">
      <div className="w-full  shadow-lg rounded-b-lg mt-2">
        <div className="flex flex-col space-y-4">
          <div
            onClick={() => {
              setCurrentCenter("ac_statements");
              // setToggle((prev) => !prev);
            }}
            className="cursor-pointer px-4 py-2 text-black text-md font-bold transition duration-300 border-b border-black/[0.2]"
          >
            Account Statements
          </div>
          <div
            onClick={() => {
              setCurrentCenter("p&l");
              // setToggle((prev) => !prev);
            }}
            className="cursor-pointer px-4 py-2 text-black text-md font-bold transition duration-300 border-b border-black/[0.2]"
          >
            Profit & Loss
          </div>
          <div
            onClick={() => {
              setCurrentCenter("bet_history");
              // setToggle((prev) => !prev);
            }}
            className="cursor-pointer px-4 py-2 text-black text-md font-bold transition duration-300 border-b border-black/[0.2]"
          >
            Bet History
          </div>
          <div
            onClick={() => {
              setCurrentCenter("profile");
              // setToggle((prev) => !prev);
            }}
            className="cursor-pointer px-4 py-2 text-black text-md font-bold transition duration-300 border-b border-black/[0.2]"
          >
            Profile
          </div>
        </div>
      </div>
    </div>
  );
};

function calculateTotalProfitLoss(arrayOfObjects) {
  const totalProfitLoss = arrayOfObjects.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.profitLoss;
  }, 0);
  return totalProfitLoss;
}

export default AccountHome;
