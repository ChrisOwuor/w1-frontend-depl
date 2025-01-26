"use client";
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { NAVContext } from "@/app/context/NavContext";
import SettingsComponent from "./Settings";
import { EditPassword } from "@/app/auth/EditPassword";

function ProfileKheladi() {
  const [userData, setUserData] = useState({});
  const { setCurrentCenter } = useContext(NAVContext);
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
    <div className="relative mt-[5px]  px-[12px]">
      {userData ? (
          <EditPassword />
        
      ) : (
        <p className="text-gray-800 p-5">loading</p>
      )}
    </div>
  );
}

export default ProfileKheladi;
