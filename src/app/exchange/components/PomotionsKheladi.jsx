
"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
import AccordionKheladi from "./AccordionKheladi";
export default function PomotionsKheladi () {
  const [errorM, setErrorM] = useState("");
  const [successM, setSuccessM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

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
        <div className=" stake-settings py-[15px] ">
          <div className="header-password mt-[1rem] flex-flex-wrap">
            <div className="px-[0.5rem]">
              <div className="headerLine">
                <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                  Promotions
                </h6>
              </div>
            </div>
          </div>
          <div className="text-center w-full">
            <div className="btn-top">
              <div className="text-center rw flex-flex-wrap   my-[1.3rem]">
                <div className="mb-[1rem] w-full max-w-full flex justify-between py-[5px] rounded-b-lg px-[15px] items-center bg-[#ededed]">
                  <p className="text-[#351045] text-[12px]">World Cup Challenge</p>
                  <a className="bg-[#5700a3] rounded-[5px] px-[8px] text-[#ffff54] py-[5px] " href="javascript:void(0)">Know more</a>
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
}
