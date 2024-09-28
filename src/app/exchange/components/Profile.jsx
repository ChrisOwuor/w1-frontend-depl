"use client";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { NAVContext } from "@/app/context/NavContext";
import SettingsComponent from "./Settings";

function MyProfile() {
  const [userData, setUserData] = useState({});
  const { setCurrentCenter } = useContext(NAVContext)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            setUserData(res.data.other);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    const token_d = localStorage.getItem("tk");
    if (token_d) {
      // setLoggedIn(true);
      fetchData();
    }
  }, []);

  

  return (
    <div className="">
     <div className="flex justify-between items-center pb-2">
        <p className='font-bold text-gray-300 text-[0.885rem] tracking-wide mt-2 mx-1'>My Profile</p>
        <div className="flex justify-end items-center cursor-pointer" onClick={() => setCurrentCenter("home")}>
          <KeyboardDoubleArrowLeftIcon className="text-orange-400" fontSize="small" />
          <p className="text-gray-300 font-bold text-[0.8rem]">Home</p>
        </div>
      </div>

      {userData ? (
        <div className="bg-gray-300 p-2">


          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2">
            <div className="col-span-1 md:col-span-2 ">
           
              <div className="mt-20 col-span-1">
                <SettingsComponent />
              </div>
            </div>

          </div>
        </div>
      ) : (
        <p className="text-gray-800 p-5">loading</p>
      )}
    </div>
  );
}

export default MyProfile;
