"use client";
import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/app/context/AuthContext";
import { useForm } from "@mantine/form";
import { NAVContext } from "@/app/context/NavContext";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function UserConsentWizard() {
  const [errorM, setErrorM] = useState("");
  const { setGoToLogin,setCurrentCenter } = useContext(NAVContext)

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    setGoToLogin(true)
  };

  const handleExit = () => {
    window.location.replace("https://www.google.com");
  };

  useEffect(() => {
    if (errorM) {
      const timer = setTimeout(() => setErrorM(""), 7000);
      return () => clearTimeout(timer);
    }
  }, [errorM]);

  return (
    <div className="z-9999 text-center bg-gradient-to-b from-[#4D4D4D] to-black my-[10vh] mx-2 rounded-lg p-2  gap-y-4 flex flex-col justify-center max-w-[500px]">
      <div className="flex items-center justify-end">
        <CloseRoundedIcon onClick={() => setCurrentCenter("")} fontSize="large" className="cursor-pointer bg-warning rounded-full font-bold p-1.5 text-black" />
      </div>
      <div className="border-b border-gray w-full py-2 m-2">
        <p className="text-white md:text-xl text-lg font-bold">
          Non-Gambling Territories.
        </p>
      </div>

      <div className="m-2">
        <p className="text-white md:text-xl text-lg font-bold">
          Connecting to our site from non-gambling countries, it will be the user&apos;s responsibility
          to ensure that their use of the service is lawful.
        </p>
        <p className="text-white md:text-xl text-lg font-bold mb-2 py-4 border-b border-gray">Underage gambling is prohibited.</p>
        <p className="text-white md:text-xl text-lg font-bold">Please confirm if you are 18 years old and above.</p>
      </div>

      <div className="mt-4 grid grid-cols-2 items-center gap-x-6 sm:mx-30">
        <p className="cursor-pointer bg-white text-black md:text-xl text-md font-bold border border-gray rounded px-2 py-1" onClick={handleLogin}>
          Confirm
        </p>
        <p className="cursor-pointer border border-gray md:text-xl text-md rounded px-2 py-1" onClick={handleExit}>
          Exit
        </p>
      </div>

      {errorM && <p className="mt-4 text-red-500 text-dm">{errorM}</p>}
    </div>
  );
}
