import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import axios from "axios";
import MenuIcon from '@mui/icons-material/Menu';
import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";

import { Button, Modal } from "@mantine/core";
import Create from "../Modal/Create";
import Login from "../Modal/Login";

import { fetchUserData } from "src/app/api/exchange";
import UserConsentWizard from "../Modal/UserConsentWizard";
import { NAVContext } from "@/app/context/NavContext";
import { Menu } from "@mui/icons-material";

export default function MobileBottom ({ toggleSideBar, globalSettings }) {
  const [currentPage, setCurrentPage] = useState("");
  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false);
  const { currentCenter, setCurrentCenter, setNewMobileNavOpen, newMobileNavOpen } = useContext(NAVContext);
  const {
    openUserconsentwizard,
    setOpenUserconsentwizard,
    openLogin,
    setOpenLogin,
    setOpenRegister,
    openRegister,
    userData,
    getfreshUserData,
  } = useContext(AuthContext);

  useEffect(() => {
    const crnturl = localStorage.getItem("current_pg");
    if (crnturl) {
      const currentpg = JSON.parse(crnturl);
      setCurrentPage(currentpg);
    } else {
      setCurrentPage("Home");
    }
    const loggedIN = isAuthenticated();
    if (loggedIN) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const action = localStorage.getItem("openLogin");
    if (action) {
      setOpened(true);
    }
    const auth = isAuthenticated();
    if (auth) {
      setLoggedIN(true);
    }
  }, []);
  useEffect(() => {
    const action = localStorage.getItem("openRegister");
    if (action) {
      setOpenedCreate(true);
    }
  }, [openRegister]);
  useEffect(() => {
    if (openLogin) {
      setOpened(true);
    } else {
      opened && setOpened(false);
    }
  }, [openLogin]);

  const handleCloseLogin = () => {
    setOpenUserconsentwizard(false);
    setOpened(false);
    const op = localStorage.getItem("openLogin");
    op && localStorage.removeItem("openLogin");
  };
  const handleCloseRegister = () => {
    setOpenRegister(false);
    setOpenedCreate(false);
    const op = localStorage.getItem("openRegister");
    op && localStorage.removeItem("openRegister");
  };

  const handleLogout = async () => {
    console.log("loggin out");
    setDisable(true);

    try {
      const tk = localStorage.getItem("tk");
      if (!tk) {
        window.location.replace("/");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      if (res && res.status === 200) {
        localStorage.removeItem("tk");
        if (localStorage.getItem("openLogin")) {
          localStorage.removeItem("openLogin");
        }
        setOpenLogin(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData != {}) {
      // const bal = parseInt(userData.availableBalance)
      // const exposure = parseInt(userData.exposure)
      // setUserBal(bal)
      // setUserExposure(exposure)
    } else {
      getfreshUserData();
    }
  }, [userData]);

  const [isScreenSmall, setIsScreenSmall] = useState("false");

  useEffect(() => {
    // Define the width at which the screen is considered small
    const screenWidthThreshold = 768; // Example threshold, you can change it as needed

    // Function to handle screen size change
    const handleScreenSizeChange = (e) => {
      if (e.matches) {
        setIsScreenSmall("true"); // Set state to "true" if screen is small
      } else {
        setIsScreenSmall("false"); // Set state to false if screen is not small
      }
    };

    // Listen for changes in screen size
    const mediaQuery = window.matchMedia(
      `(max-width: ${screenWidthThreshold}px)`
    );

    // Initial check for screen size
    handleScreenSizeChange(mediaQuery);

    // Add event listener for screen size changes
    mediaQuery.addEventListener("change", handleScreenSizeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenSizeChange);
    };
  }, []);

  return (
    <div
      className="w-full flex justify-between gap-x-1 px-2 items-center"
      style={{
        backgroundColor:
          (globalSettings && globalSettings.topBarBgColor) || "#002C5C",
      }}
    >
      <div className="w-full flex justify-start items-center">
        <div
          className={` ${
            loggedIN ? "h-12" : "h-14"
          } cursor-pointer aspect-video w-4/5 flex items-center justify-start gap-0 `}
        >
          <MenuIcon
            fontSize={`${loggedIN ? "large" : "large"}`}
            onClick={() => {
              setNewMobileNavOpen(!newMobileNavOpen);
            }}
          />

          <div className=" ">
            <img
              // onClick={() => window.location.reload()}
              src={`/lognobg.png`}
              alt=""
              className=" h-full w-full object-cover  "
            />
          </div>
        </div>
      </div>
      <div className="flex gap-1 items-center justify-end w-full">
        {!loggedIN ? (
          <div className="flex items-center justify-end cursor-pointer">
            <div
              className="login mr-[0.5rem] cursor-pointer"
              onClick={() => setCurrentCenter("login")}
            >
              <p className="bg-[#ffff54] rounded-[4px] text-black text-[12px] uppercase p-[8px]  font-[700] border border-black">
                Login
              </p>
            </div>
            <div className="signup cursor-pointer">
              <p className=" text-[#fff] rounded-[4px] text-[12px] uppercase p-[8px] font-[700] border border-white">
                SignUp
              </p>
            </div>
          </div>
        ) : (
          <div
            className={`flex items-center  px-1 rounded font-bold py-2 cursor-pointer text-white  text-[0.8rem]`}
            onClick={() =>
              isScreenSmall === "false" && setToggle((prev) => !prev)
            }
          >
            <div className="flex flex-col flex-nowrap w-[max-content] ">
              <div className="flex items-center gap-x-2  ">
                <p className="text-[11px] font-[900] text-[#feff00] uppercase">
                  Balance :
                </p>
                {userData != {} && userData.availableBalance ? (
                  <p className="white">
                    {parseInt(userData.availableBalance).toFixed(2)}
                  </p>
                ) : (
                  <p className="white">0</p>
                )}
              </div>
              <div className="flex items-center gap-x-2 ">
                <p className="text-[11px] font-[900] text-[#feff00] uppercase">
                  Exposure :
                </p>

                {userData != {} && userData.exposure ? (
                  <p className="text-white">
                    {parseInt(userData.exposure).toFixed(2)}
                  </p>
                ) : (
                  <p className="text-white">
                    (<span className="text-white ">0</span>)
                  </p>
                )}
              </div>
            </div>

            <div className="text-[#feff00] rounded-[2px] text-[600] uppercase px-[5px] py-[2px] ml-[10px] text-[11px] border-[#feff00] border-[1px]">
              Demo123
            </div>
          </div>
        )}
      </div>

      <Modal
        opened={openUserconsentwizard}
        onClose={() => handleCloseLogin()}
        title="Login"
        size={""}
        zIndex={9999}
      >
        <Login />
      </Modal>
      <Modal
        opened={openRegister}
        onClose={() => handleCloseRegister()}
        title="Register"
        size={""}
      >
        <Create />
      </Modal>
    </div>
  );
}
