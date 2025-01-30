"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Modal } from "@mantine/core";
import Create from "@/app/components/Modal/Create";
import Login from "@/app/components/Modal/Login";

import { fetchUserData } from "src/app/api/exchange";
import { NAVContext } from "../../context/NavContext";
import LoginPageTopBar from "@/app/components/auth/LoginTopBar";
import { useRouter } from "next/navigation";
import { launchGame } from "@/app/api/casino/casino";
const IconLink = ({
  name,
  currentPage,
  setCurrentPage,
  setView,
  setCurrentCenter,
  router,
}) => (
  <div
    onClick={() => {
      if (name === "Aviator") {
        (async (game) => {
          const loggedIN = isAuthenticated();
          if (!loggedIN) {
            setCurrentCenter("userconsent");
            return;
          }

          const gamelink = await launchGame({
            game_code: "spribe_aviator",
            game_id: "860001",
            game_name: "Aviator",
            sub_provider_name: "SPRIBE",
            category: "Others",
            provider_name: "SPRIBE",
          });
          if (gamelink && gamelink.code == 1) {
            localStorage.setItem("qq", gamelink.gameUrl);
            setTimeout(() => {
              router.push(`/casino?v=v`);
            }, 100);
          }
        })();
      } else {
        router.push("/?");
        setTimeout(() => {
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
        }, 300);
      }
    }}
    className={`${
      currentPage === name ? "text-black" : "text-white"
    } flex justify-center items-center max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer border-r-2 border-black text-sm`}
  >
    <p className="font-bold text-sm w-full">
      {name === "Aviator" && <img src="/aviator.png" className="h-6" />}
    </p>
    <p className="font-bold text-sm w-full" style={{ whiteSpace: "nowrap" }}>
      {name === "Aviator" ? (
        <span
          className="text-sm font-bold"
          style={{
            animation: "colorChange 2s infinite",
            color: "red",
          }}
        >
          Aviator
        </span>
      ) : (
        name
      )}
    </p>
  </div>
);

const AccountDropdownLink = ({
  link,
  setView,
  setToggle,
  setCurrentCenter,
  router,
}) => (
  <div
    onClick={() => {
      router.push("/?");
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
    className="flex items-center border-b border-darkstroke p-1.5 hover:bg-yellow-500/[0.5] cursor-pointer"
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
  { name: "Aviator" },
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
  { name: "Profit & Loss", url: "/?", code: "p&l" },
];

export default function Bottom({ toggleSideBar, globalSettings }) {
  const [userBal, setUserBal] = useState("");
  const [userExposure, setUserExposure] = useState("");
  const [currentPage, setCurrentPage] = useState("Home");
  const router = useRouter();

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
        className="flex w-full justify-between items-center text-center px-2"
      >
        <div
          onClick={() => window.location.replace("/")}
          className="cursor-pointer w-auto h-10 sm:h-14 flex items-center justify-center sm:-ml-4"
        >
          <img
            src={`/lognobg.png`}
            alt=""
            className=" h-full w-full object-cover  "
          />
        </div>

        <div className="flex gap-1 items-center justify-end min-w-[15vw]">
          {!loggedIN ? (
            <div className="ml-10 space-x-4 flex items-center">
              <LoginPageTopBar />
            </div>
          ) : (
            <div className="relative ml-1 space-x-2 flex items-center w-full">
              <div
                className={`flex items-center justify-end gap-x-1 rounded font-bold max-mk:hidden w-full border-none py-2`}
              >
                <div className="flex items-center align-middle gap-x-4">
                  <div className=" hidden md2:block">
                    <input
                      onChange={(e) => {
                        e.value;
                      }}
                      id=""
                      name=""
                      type="text"
                      placeholder="Search Events"
                      className="block rounded-md focus:border-gray border-gray w-72 text-sm  py-1 pl-3 pr-3 text-black placeholder:text-black font-thin  "
                    />
                  </div>

                  <div className=" flex items-center gap-x-1 justify-end">
                    <p className="text-[#feff00] uppercase text-[16px] font-[900] text-center ">
                      {" "}
                      Balance:
                    </p>
                    <p className="text-white text-[16px] font-[900]">
                      {userBal != "" ? parseFloat(userBal).toFixed(2) : "0"}
                    </p>
                  </div>
                  <div className=" flex items-center gap-x-1 justify-end">
                    <p className="text-[#feff00] uppercase text-[16px] font-[900]">
                      Exposure:
                    </p>
                    <p className="text-white text-[16px] font-[900]">
                      {userExposure != ""
                        ? `${parseFloat(userExposure).toFixed(2)}`
                        : "0"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer">
                  <div
                    className="text-accent  border border-accent rounded text-xs px-2 py-1 font-bold leading-tight"
                    // onClick={() => setToggle((prev) => !prev)}
                  >
                    DEMO-22
                  </div>
                </div>
              </div>
              {toggle && (
                <div className="bg-white rounded shadow-lg shadow-black min-w-[12vw] w-full right-0 top-16 absolute z-999">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center bg-[#E5E7EB] p-1.5 rounded-t justify-between">
                      <p className="text-black font-bold text-sm tracking-small">
                        MENU
                      </p>
                      <p
                        className="text-danger font-bold text-sm tracking-small cursor-pointer"
                        onClick={() => setToggle((prev) => !prev)}
                      >
                        X
                      </p>
                    </div>
                    {accountDropDownLink.map((link, i) => (
                      <AccountDropdownLink
                        key={i}
                        link={link}
                        setView={setView}
                        setToggle={setToggle}
                        setCurrentCenter={setCurrentCenter}
                        router={router}
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
    </div>
  );
}
