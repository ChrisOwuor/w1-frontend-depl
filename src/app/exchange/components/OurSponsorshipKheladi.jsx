

"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
export default function OurSponsorshipKheladi() {
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
      {userData ? (
        <div className=" stake-settings py-[15px] ">
          <div className="header-password mt-[1rem] flex-flex-wrap">
            <div className="px-[0.5rem]">
              <div className="headerLine">
                <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                  Rules
                </h6>
              </div>
            </div>
          </div>
          <div className="text-center kh:w-[91.66666667%]">
            <div className="btn-top">
              
              <div className="text-center rw flex-flex-wrap my-[1.3rem]">
                <div className="mb-[1rem] w-full max-w-full">
                  <button className="btn-primary">
                    {loading ? "Processing" : success ? "SUBMIT" : "SUBMIT"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 p-5">loading</p>
      )}
    </div>
  );
};

