"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";

import { Modal } from "@mantine/core";
import Create from "@/app/components/Modal/Create";
import Login from "@/app/components/Modal/Login";

import { fetchUserData } from "src/app/api/exchange";
import { NAVContext } from "@/app/context/NavContext";
import LoginPageTopBar from "@/app/components/auth/LoginTopBar";

const IconLink = ({
  name,
  currentPage,
  setCurrentPage,
  setView,
  setCurrentCenter,
}) => (
  <div
    onClick={() => {
      setView((prev) => ({
        currentView: "home",
        from: "/",
        sportName: "",
        sportId: "",
        competitionName: "",
        competitionId: "",
        eventName: "",
        eventId: "",
        showCompetition: false,
      }));
      setCurrentPage(name);
      setCurrentCenter(name.toLowerCase().replace(" ", ""));
      localStorage.setItem("current_pg", JSON.stringify(name));
    }}
    className={`${
      currentPage === name ? "text-black" : "text-white"
    } flex justify-center items-center max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer border-r-2 border-black text-sm`}
  >
    <p className="font-bold text-sm w-full" style={{ whiteSpace: "nowrap" }}>
      {name}
    </p>
  </div>
);

const AccountDropdownLink = ({
  link,
  setView,
  setToggle,
  setCurrentCenter,
}) => (
  <div
    onClick={() => {
      setView((prev) => ({
        currentView: "home",
        from: "/",
        sportName: "",
        sportId: "",
        competitionName: "",
        competitionId: "",
        eventName: "",
        eventId: "",
        showCompetition: false,
      }));
      setToggle((prev) => !prev);
      setCurrentCenter(link.code);
    }}
    className="flex items-center border-b border-darkstroke p-1.5 hover:bg-green-500/[0.2] cursor-pointer"
  >
    <p
      className="font-medium text-md text-black"
      style={{ whiteSpace: "nowrap" }}
    >
      {link.name}
    </p>
  </div>
);

const topLinks = [
  { name: "Home" },
  { name: "In-Play" },
  { name: "Cricket" },
  { name: "Football" },
  { name: "Tennis" },
  { name: "Basketball" },
  { name: "Virtual Sports" },
  { name: "All Casinos" },
  { name: "Horse Racing" },
  { name: "Greyhound Racing" },
  { name: "Politics" },
];

const accountDropDownLink = [
  { name: "My Profile", url: `/profile?ac=t`, code: "profile" },
  { name: "Bet history", url: "/exchange/ds/bets", code: "bet_history" },
  {
    name: "Account Statement",
    url: "/profile/accounts-statements",
    code: "ac_statements",
  },
  { name: "Profit & Loss", url: "#" },
];

export default function Bottom({ toggleSideBar, globalSettings }) {
  const [userBal, setUserBal] = useState("");
  const [userExposure, setUserExposure] = useState("");
  const [currentPage, setCurrentPage] = useState("Home");

  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false);
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
  const { setView, setCurrentCenter } = useContext(NAVContext);

  const containerRef = useRef(null);

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
    setOpenLogin(false);
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
    console.log("logging out");
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

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (userData != "") {
      const bal = parseFloat(userData.availableBalance);
      const exposure = parseFloat(userData.exposure);
      setUserBal(bal);
      setUserExposure(exposure);
    } else {
      getfreshUserData("from bottom if no user");
    }
  }, [userData]);

  return (
    <div className="w-full flex flex-col max-h-35">
      <div
        style={{
          backgroundColor:
            (globalSettings && globalSettings.topBarBgColor) || "#002C5C",
        }}
        className="flex w-full justify-between items-center text-center p-2"
      >
        <div
          onClick={() => window.location.reload()}
          className="cursor-pointer w-auto h-16 flex items-center justify-center"
        >
          {globalSettings && globalSettings.businessLogo && (
            <img
              src={
                globalSettings?.businessLogo &&
                `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}api/${globalSettings.businessLogo}`
              }
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex gap-1 items-center justify-end min-w-[15vw]">
          {!loggedIN ? (
            <div className="ml-10 space-x-4 flex items-center">
              <LoginPageTopBar />
            </div>
          ) : (
            <div className="relative ml-1 space-x-2 flex items-center w-full">
              <div
                className={`flex items-center justify-end gap-x-4 px-1 rounded font-bold max-mk:hidden w-full border-none py-2 cursor-pointer hover:bg-green-500/[0.2]`}
                onClick={() => setToggle((prev) => !prev)}
              >
                <div className="flex flex-col">
                  <div className="text-sm flex items-center gap-x-1">
                    <p className="text-white">Main PTI</p>
                    <p className="text-white">
                      {userBal != "" ? parseFloat(userBal).toFixed(2) : "--"}
                    </p>
                  </div>
                  <div className="text-sm flex items-center gap-x-1">
                    <p className="text-gray-200">Exposure</p>
                    <p className="text-red-500">
                      {userExposure != ""
                        ? `${parseFloat(userExposure).toFixed(2)}`
                        : "--"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="https://img.icons8.com/material-outlined/24/user-male-circle.png"
                    alt="profile"
                    className="w-[28px] h-[28px] bg-white rounded-full"
                  />
                </div>
              </div>
              {toggle && (
                <div className="bg-white rounded shadow-lg shadow-black min-w-[12vw] w-full right-0 top-16 absolute z-999">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center bg-[#E5E7EB] p-1.5 rounded-t">
                      <p className="text-black font-bold text-sm tracking-small">
                        exchange
                      </p>
                    </div>
                    {accountDropDownLink.map((link, i) => (
                      <AccountDropdownLink
                        key={i}
                        link={link}
                        setView={setView}
                        setToggle={setToggle}
                        setCurrentCenter={setCurrentCenter}
                      />
                    ))}
                    <div className="flex justify-center items-center p-2">
                      <button
                        type="button"
                        disabled={disable}
                        onClick={handleLogout}
                        className="inline-block w-full rounded border-none font-bold bg-[#294352] px-4 py-1 tracking-wide text-white sm:text-md"
                      >
                        LOGOUT
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          backgroundColor:
            (globalSettings && globalSettings.topMenuBgColor) || "#0A5BAB",
        }}
        className={`bg-[${
          (globalSettings && globalSettings.topMenuBgColor) || "#0A5BAB"
        }] px-1 w-full flex justify-between gap-x-1 items-center`}
      >
        <div
          onClick={toggleSideBar}
          className={`min-w-[40px] md:hidden flex items-center justify-center gap-1 rounded px-2 hover:text-white cursor-pointer`}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons.png"
            alt="external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons"
            className="bg-white rounded-full h-[24px] w-[24px]"
          />
        </div>
        {currentPage && (
          <div
            className="flex items-center w-full gap-x-1 text-white text-sm overflow"
            ref={containerRef}
            style={{
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              overflow: "auto",
            }}
          >
            {topLinks.map((modes, index) => (
              <IconLink
                key={index}
                name={modes.name}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                setView={setView}
                setCurrentCenter={setCurrentCenter}
              />
            ))}
          </div>
        )}
        <Modal
          opened={openUserconsentwizard}
          onClose={() => handleCloseLogin()}
          title="Login"
          size={""}
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
    </div>
  );
}
