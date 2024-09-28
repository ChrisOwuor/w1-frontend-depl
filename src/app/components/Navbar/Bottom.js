import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from "axios";

import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "src/app/context/AuthContext";

import { Button, Modal } from "@mantine/core";
import Create from "../Modal/Create";
import Login from "../Modal/Login";

import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import HomeIcon from '@mui/icons-material/Home';
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import BedroomBabyTwoToneIcon from '@mui/icons-material/BedroomBabyTwoTone';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';

import { inhouseStyling } from "./constants";
import { fetchUserData } from 'src/app/api/exchange';
import { getIcon } from "src/app/exchange/utils/utils";
import { useRouter } from "next/navigation";


export default function Bottom({ toggleSideBar, refresh, setCurrentCenter }) {
  const [userBal, setUserBal] = useState("");
  const [userExposure, setUserExposure] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [currentPage, setCurrentPage] = useState("")

  const [guideToLeft, setGuideToLeft] = useState(false)


  const containerRef = useRef(null);
  const router = useRouter()

  const scrollToRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 100,
        behavior: 'smooth',
      });
    }
  };
  const scrollToLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: - 100,
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




  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false)
  const { openLogin, setOpenLogin, setOpenRegister, openRegister, userData, getfreshUserData } =
    useContext(AuthContext);

  // useEffect(() => {
  //   getfreshUserData("from bottom on refresh")
  // }, [refresh])


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
      const bal = parseInt(userData.availableBalance)
      const exposure = parseInt(userData.exposure)
      setUserBal(bal)
      setUserExposure(exposure)
    } else {
      getfreshUserData("from bottom if no user")
    }
  }, [userData])

  const accountDropDownLink = [
    {
      name: "Inplay",
      url: `/profile?ac=t`,
      code: "inplay",
      icon: (
        <SportsTennisIcon
          fontSize="small"
          className={`${inhouseStyling.default} h-[1.4rem] w-[1.4rem]`}
          color={`${iconColor === "tennis" ? "white" : "primary"}`}
        />
      ),
    },
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
      name: "Profit and Loss",
      url: "/profile/profit/loss",
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
      url: "/#",
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
    <div className="px-1 w-full bg-[#031123] flex justify-between gap-x-1 items-center">

      <div onClick={toggleSideBar} className={`min-w-[40px] md:hidden flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons.png" alt="external-menu-100-most-used-icons-flaticons-lineal-color-flat-icons" className="bg-white rounded-full h-[24px] w-[24px]" />

      </div>

      {
        currentPage &&
        <div className="flex items-center w-full gap-x-1 text-white text-sm overflow my-1"
          ref={containerRef}
          style={{
            "msOverflowStyle": "none",
            "scrollbarWidth": "none",
            "overflow": "auto"
          }}
        >
          {jj.map((link_, index) => {
            const icon = getIcon(link_.name)
            return (
              <div
                // href={
                //   `${link_.url === "/#" ? `/?mechi=all` : link_.url}`
                // }
                onClick={() => {
                  setCurrentPage(link_.name)
                  setCurrentCenter(link_.code)
                  localStorage.setItem("current_pg", JSON.stringify(link_.name))
                }}
                key={index}
                className={`${currentPage === link_.name ? "bg-gradient-to-r from-orange-500/[0.1] to-orange-600/[0.3]" : "bg-gray-500/[0.4]"} ${link_.name === "In-Play" && "bg-gradient-to-r from-green-900/[0.5] to-green-600"} flex justify-center items-center  max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer rounded`}
              >
                {
                  icon && icon != null ? (
                    <img className="h-[20px] w-[20px]" src={icon.url} alt="cricket-ball--v1" />
                  ) :
                    link_.icon
                }
                <p className="font-bold text-[0.9rem] w-full" style={{ whiteSpace: 'nowrap' }}>{link_.name === "Football" ? "Soccer" : link_.name}</p>

              </div>
            )
          })}


          {topLinks.map((modes, index) => {
            let iconName = modes.name === "Soccer" ? "Football" : modes.name
            const icon = getIcon(iconName)
            return (
              <Link
                href={
                  `${modes.url === "/#" ? `/?mechi=all` : modes.url}`
                }
                onClick={() => {
                  setCurrentPage(modes.name)
                  if (modes.name === "All Casinos") {
                    alert("Coming soon.")
                  }
                  localStorage.setItem("current_pg", JSON.stringify(modes.name))
                }}
                key={index}
                className={`${currentPage === modes.name ? "bg-gradient-to-r from-orange-500/[0.1] to-orange-600/[0.3]" : "bg-gray-500/[0.4]"} flex justify-center items-center  max-mk:px-3 py-2 px-6 gap-x-1 cursor-pointer rounded`}
              >
                {
                  icon && icon != null ? (
                    <img className="h-[20px] w-[20px]" src={icon.url} alt="cricket-ball--v1" />
                  ) :
                    modes.icon
                }
                <p className="font-bold text-[0.9rem] w-full" style={{ whiteSpace: 'nowrap' }}>{modes.name === "Football" ? "Soccer" : modes.name}</p>

              </Link>
            )
          })}
        </div>
      }

      <div className="flex flex-col justify-between gap-y-1 items-center px-2">
        <div className="flex justify-end items-center p-0" onClick={() => {
          setGuideToLeft(true)
          scrollToRight()
        }}>
          <EastRoundedIcon fontSize='smaller' className=' text-orange-400 rounded cursor-pointer' />
        </div>
        <div className="flex justify-end items-center p-0" onClick={scrollToLeft}>
          <WestRoundedIcon fontSize='smaller' className={`text-orange-400 ${guideToLeft && ""} rounded cursor-pointer`} />
        </div>
      </div>


      <div className="flex gap-1 items-center p-1 justify-end min-w-[15vw]" >
        {!loggedIN ? (
          <div className="ml-10 space-x-4 ">
            <div onClick={setOpened} className={`bg-gradient-to-l from-black to-yellow-400 flex items-center justify-center gap-1  rounded py-2 px-3 hover:text-white cursor-pointer`}>
              <VpnKeyIcon fontSize="small" color="white" />
              <p className="font-bold truncate">
                Login
              </p>
            </div>
          </div>
        ) : (
          <div className="relative ml-1 space-x-2 flex items-center w-full">
            <div className={`flex items-center justify-end gap-x-4 px-1 rounded font-bold max-mk:hidden w-full border-none bg-[#031133] glassmorphism py-2 cursor-pointer hover:bg-green-500/[0.2]`} onClick={() => setToggle(prev => !prev)}>

              {/* <div className="text-[0.7rem]">
                <p className="text-gray-200">  {userData.username}</p>

              </div> */}
              <div className="text-[0.785rem]">
                <p className="text-gray-200">Exposure</p>
                <p className="text-red-500">
                  {userExposure != "" ? `- ${parseInt(userExposure).toFixed(2)}` : "--"}
                </p>
              </div>
              <div className="text-[0.785rem]">
                <p className="text-gray-200">Balance</p>
                <p className="text-gray-200">
                  {userBal != "" ? parseInt(userBal).toFixed(2) : "--"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src="https://img.icons8.com/material-outlined/24/user-male-circle.png" alt="profile" className="w-[28px] h-[28px] bg-white rounded-full" />
                {/* <p className="text-[0.7rem] text-gray-300">Account</p> */}
              </div>
            </div>
            {
              toggle && (
                <div className="bg-black py-4 px-2 min-w-[12vw] w-full right-0 top-12 absolute z-40">
                  <div className="flex flex-col w-full">
                    {
                      accountDropDownLink.length > 0 && accountDropDownLink.map((link, i) => {
                        return (
                          <div
                            key={i}
                            // href={link.url}
                            onClick={() => {
                              setToggle(prev => !prev)
                              setCurrentCenter(link.code)
                            }}
                            className="w-full flex items-center bg-gray-800 p-1 mb-1 hover:bg-green-500/[0.2] cursor-pointer"
                          >

                            <p className="font-bold text-[0.8rem] w-full text-gray-200" style={{ whiteSpace: 'nowrap' }}>{link.name === "Football" ? "Soccer" : link.name}</p>

                          </div>
                        )

                      })
                    }

                    <div className="mt-10 flex justify-end items-center">
                      <button
                        type="button"
                        disabled={disable}
                        onClick={handleLogout}
                        className="inline-block rounded border-none font-bold bg-gray-700 px-4 py-1 hover:bg-orange-500/[0.2] tracking-wide text-white text-[0.7rem]"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )}

      </div>
      <Modal
        opened={opened}
        onClose={() => handleCloseLogin()}
        title="Login"
        size={""}
      >
        <Login />
      </Modal>
      <Modal
        opened={openedCreate}
        onClose={() => handleCloseRegister()}
        title="Register"
        size={""}
      >
        <Create />
      </Modal>
    </div>

  );
}


{/* <div className={`${!hideSideBar ? "hidden" : ""} fixed top-0 left-0 bottom-0  max_mk:min-w-[74%] min-w-[70%]  mk:min-w-[50%] max-h-screen z-50 md:col-span-2 bg-[#031123]  p-1 flex flex-col border-r-2 border-gray-500/[0.5]`}>
<MobileSideBar setSelectedLink={setSelectedLink} activeLink={selectedLink} toggleSideBar={toggleSideBar} />
</div> */}
