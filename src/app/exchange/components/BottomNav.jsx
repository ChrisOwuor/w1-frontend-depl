"use client"
import React, { useContext, useEffect, useState, useRef } from "react";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import axios from "axios";

import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";

import { Modal } from "@mantine/core";
import Create from "@/app/components/Modal/Create";
import Login from "@/app/components/Modal/Login";

import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import HomeIcon from '@mui/icons-material/Home';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import BedroomBabyTwoToneIcon from '@mui/icons-material/BedroomBabyTwoTone';
import { inhouseStyling } from "@/app/components/Navbar/constants";
import { fetchUserData } from 'src/app/api/exchange';
import { getIcon } from "src/app/exchange/utils/utils";
import { NAVContext } from "@/app/context/NavContext";
import LoginPageTopBar from "@/app/components/auth/LoginTopBar";


export default function Bottom({ toggleSideBar, globalSettings }) {
  const [userBal, setUserBal] = useState("");
  const [userExposure, setUserExposure] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [currentPage, setCurrentPage] = useState("")

  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false)
  const { openUserconsentwizard, setOpenUserconsentwizard, openLogin, setOpenLogin, setOpenRegister, openRegister, userData, getfreshUserData } =
    useContext(AuthContext);
  const { setView, setCurrentCenter } = useContext(NAVContext)

  const containerRef = useRef(null);

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const crnturl = localStorage.getItem("current_pg")
    if (crnturl) {
      const currentpg = JSON.parse(crnturl)
      setCurrentPage(currentpg)
    } else {
      setCurrentPage("Home")
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


  const topLinks = [

    {
      name: "Cricket",
      url: "/#",
      icon: (
        <SportsCricketIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "cricket" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Soccer",
      url: "/#",
      icon: (
        <SportsSoccerIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "soccer" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Tennis",
      url: "/#",
      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Basketball",
      url: "/#",
      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Virtual Sports",
      url: "/#",
      icon: (
        <SportsSoccerIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "virtualSports" ? "white" : "primary"}`}
        />
      ),
    },

    {
      name: "All Casinos",
      url: "/#",
      icon: (
        <CasinoTwoToneIcon
          fontSize="small"
          className={`${inhouseStyling.default} shadow-lg shadow-purple-500`}
          color={`${iconColor === "allCasino" ? "white" : "white"}`}
        />
      ),
    },
    {
      name: "Horse Racing",
      url: "/#",
      icon: (
        <BedroomBabyTwoToneIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "horseRacing" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Greyhound Racing",
      url: "/#",
      icon: (
        <SportsSoccerIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "greyhoundRacing" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Politics",
      url: "/#",
      icon: (
        <SportsSoccerIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "politics" ? "white" : "primary"}`}
        />
      ),
    },
  ];

  const [toggle, setToggle] = useState(false)


  useEffect(() => {
    if (userData != "") {
      const bal = parseFloat(userData.availableBalance)
      const exposure = parseFloat(userData.exposure)
      setUserBal(bal)
      setUserExposure(exposure)
    } else {
      getfreshUserData("from bottom if no user")
    }
  }, [userData])

  const accountDropDownLink = [
    {
      name: "My Profile",
      url: `/profile?ac=t`,
      code: "profile",
      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Bet history",
      url: "/exchange/ds/bets",
      code: "bet_history",
      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Account Statement",
      url: "/profile/accounts-statements",
      code: "ac_statements",

      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Profit & Loss",
      url: "#",
      code: "p&l",
    },
  ];
  let jj = [
    {
      name: "Home",
      code: "home",
      url: "/",
      icon: (
        <HomeIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "home" ? "white" : "pink"}`}
        />
      ),
    },
    {
      name: "In-Play",
      url: "/exchange/inplay",
      code: "inplay",
      icon: (
        <AlarmOnRoundedIcon
          fontSize="small"
          className={`${inhouseStyling.default} shadow-lg shadow-green-500 rounded-full animate-bounce`}
          color={`${iconColor === "live" ? "white" : "warning"}`}
        />
      ),
    },
  ]

  return (
    <div className="w-full flex flex-col max-h-35">
      <div
        style={{
          backgroundColor: globalSettings && globalSettings.topBarBgColor || "#002C5C",
        }}
        className="flex w-full justify-between items-center text-center p-2"
      >
        <div onClick={() => window.location.reload()} className="cursor-pointer">
          <img
            src={
              globalSettings?.businessLogo
                ? `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}api/${globalSettings.businessLogo}`
                : `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}api/uploads/betlogo.png`
            }
            alt="profile"
            className="w-22 h-full object-contain"
          />
        </div>




        <div className="flex gap-1 items-center justify-end min-w-[15vw]" >
          {!loggedIN ? (
            <div className="ml-10 space-x-4 flex items-center">
              <LoginPageTopBar />
              {/* <div onClick={() => { setOpenLogin(true) }} className={`bg-gradient-to-l from-black to-yellow-400 flex items-center justify-center gap-1  rounded py-2 px-3 hover:text-white cursor-pointer`}>
                <VpnKeyIcon fontSize="small" color="white" />
                <p className="font-bold truncate">
                  Login
                </p>
              </div> */}
            </div>
          ) : (
            <div className="relative ml-1 space-x-2 flex items-center w-full">
              <div className={`flex items-center justify-end gap-x-4 px-1 rounded font-bold max-mk:hidden w-full border-none  py-2 cursor-pointer hover:bg-green-500/[0.2]`} onClick={() => setToggle(prev => !prev)}>
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
                      {userExposure != "" ? `${parseFloat(userExposure).toFixed(2)}` : "--"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                  <img src="https://img.icons8.com/material-outlined/24/user-male-circle.png" alt="profile" className="w-[28px] h-[28px] bg-white rounded-full" />
                  {/* <p className="text-[0.7rem] text-gray-300">Account</p> */}
                </div>
              </div>
              {
                toggle && (
                  <div className="bg-white rounded shadow-lg shadow-black min-w-[12vw] w-full right-0 top-16 absolute z-999">
                    <div className="flex flex-col w-full">
                      <div className="flex items-center bg-[#E5E7EB] p-1.5 rounded-t">
                        <p className="text-black font-bold text-sm tracking-small">exchange</p>
                      </div>
                      {
                        accountDropDownLink.length > 0 && accountDropDownLink.map((link, i) => {
                          return (
                            <div
                              key={i}

                              onClick={() => {
                                setView(prev => ({
                                  currentView: "home",
                                  from: "/",
                                  sportName: "",
                                  sportId: "",
                                  competitionName: "",
                                  competitionId: "",
                                  eventName: "",
                                  eventId: "",
                                  showCompetition: false,
                                }))
                                setToggle(prev => !prev)
                                setCurrentCenter(link.code)
                              }}
                              className="flex items-center border-b border-darkstroke p-1.5 hover:bg-green-500/[0.2] cursor-pointer"
                            >

                              <p className="font-medium text-md text-black" style={{ whiteSpace: 'nowrap' }}>{link.name === "Football" ? "Soccer" : link.name}</p>

                            </div>
                          )

                        })
                      }

                      <div className=" flex justify-center items-center p-2">
                        <button
                          type="button"
                          disabled={disable}
                          onClick={handleLogout}
                          className="inline-block w-full rounded border-none font-bold bg-[#294352] px-4 py-1 tracking-wide text-white sm:text-md"
                        >
                          LOGOUT
                          <LoginRoundedIcon className="text-white" fontSize="medium" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          )}

        </div>

      </div>
      <div style={{ backgroundColor: globalSettings && globalSettings.topMenuBgColor || "#0A5BAB" }} className={`bg-[${globalSettings && globalSettings.topMenuBgColor || "#0A5BAB"}]  px-1 w-full  flex justify-between gap-x-1 items-center`}>


        <div onClick={toggleSideBar} className={`min-w-[40px] md:hidden flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

          <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons.png" alt="external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons" className="bg-white rounded-full h-[24px] w-[24px]" />

        </div>

        {
          currentPage &&
          <div className="flex items-center w-full gap-x-1 text-white text-sm overflow"
            ref={containerRef}
            style={{
              "msOverflowStyle": "none",
              "scrollbarWidth": "none",
              "overflow": "auto"
            }}
          >
            {jj.map((link_, index) => {
              // const icon = getIcon(link_.name)
              return (
                <div
                  onClick={() => {
                    setView(prev => ({
                      currentView: "home",
                      from: "/",
                      sportName: "",
                      sportId: "",
                      competitionName: "",
                      competitionId: "",
                      eventName: "",
                      eventId: "",
                      showCompetition: false,
                    }))
                    setCurrentPage(link_.name)
                    setCurrentCenter(link_.code)
                    localStorage.setItem("current_pg", JSON.stringify(link_.name))
                  }}
                  key={index}
                  className={`${currentPage === link_.name ? "text-black" : "text-white"} flex justify-center items-center  max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer  border-r-2 border-black text-sm`}
                // className={`${currentPage === link_.name ? "bg-gradient-to-r from-orange-500/[0.1] to-orange-600/[0.3]" : "bg-gray-500/[0.4]"} ${link_.name === "In-Play" && "bg-gradient-to-r from-green-900/[0.5] to-green-600"} flex justify-center items-center  max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer rounded`}
                >
                  {/* {
                    icon && icon != null ? (
                      <img className="h-[20px] w-[20px]" src={icon.url} alt="cricket-ball--v1" />
                    ) :
                      link_.icon
                  } */}
                  <p className="font-bold text-sm w-full" style={{ whiteSpace: 'nowrap' }}>{link_.name === "Football" ? "Soccer" : link_.name}</p>

                </div>
              )
            })}


            {topLinks.map((modes, index) => {
              let iconName = modes.name === "Soccer" ? "Football" : modes.name
              const icon = getIcon(iconName)
              return (
                <div
                  onClick={() => {
                    setView(prev => ({
                      ...prev,
                      currentView: "home"
                    }))
                    setCurrentPage(modes.name)
                    if (modes.name === "All Casinos") {
                      alert("Coming soon.")
                    }
                    localStorage.setItem("current_pg", JSON.stringify(modes.name))
                  }}
                  key={index}

                  className={`${currentPage === modes.name ? "text-black" : "text-white"} flex justify-center items-center  max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer  border-r-2 border-black text-sm`}
                >
                
                  <p className="font-bold text-[0.9rem] w-full" style={{ whiteSpace: 'nowrap' }}>{modes.name === "Football" ? "Soccer" : modes.name}</p>

                </div>
              )
            })}
          </div>
        }



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

