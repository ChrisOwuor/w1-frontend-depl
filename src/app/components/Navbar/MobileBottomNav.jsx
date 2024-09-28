import React, { useContext, useEffect, useState, useRef } from "react";
import AlarmOnRoundedIcon from '@mui/icons-material/AlarmOnRounded';
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useSearchParams } from "next/navigation";
import { NAVContext } from "@/app/context/NavContext";
import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "@/app/context/AuthContext";
import PushPinIcon from '@mui/icons-material/PushPin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HouseIcon from '@mui/icons-material/House';


export default function MobileBottomNav({ toggleSideBar, setHideSideBar, globalSettings }) {
    const { setView, setCurrentCenter } = useContext(NAVContext)
    const { setOpenLogin } = useContext(AuthContext);
    const loggedIn = isAuthenticated()
    const searchParams = useSearchParams()
    const prof = searchParams.get("ac")
    const [toggle, setToggle] = useState(false)


    return (
        <div className="grid grid-cols-5">
            <div className="col-span-5 grid grid-cols-5">
                <div className=""></div>
                <div className=""></div>
                <div className="text-transparent rounded-t-full pt-4 -mb-5" style={{ backgroundColor: globalSettings.mobileBottomBg || "#1F3340" }}>o</div>
                <div className=""></div>
                <div className=""></div>
            </div>

            <div className="grid grid-cols-5 col-span-5 relative px-4 w-full gap-x-1 items-center" style={{ backgroundColor: globalSettings.mobileBottomBg || "#1F3340" }}>
                <div className={`${toggle ? "" : "hidden"} absolute left-0 bottom-0 right-0 h-[100vh] w-[100vw] bg-gray-900/[0.8] flex flex-col `}>
                    <div className="rounded-r-[0px] bg-gray relative h px-1">
                        <div className="flex justify items-center my-6">
                            <p className="rounded-full bg-gray-500  text-sm font-bold" onClick={() => setToggle(prev => !prev)}>
                                <img src="https://img.icons8.com/ios/50/circled-left--v1.png" className="h-[26px] w-[26px] bg-white border rounded-full" alt="left-arrow" />
                            </p>
                        </div>
                        <div className=" grid grid-cols-1 items-center gap-2">
                            <div
                                onClick={() => {
                                    setCurrentCenter("ac_statements")
                                    setToggle(prev => !prev)
                                }}
                                className="col-span-1 rounded flex  justify-end gap-x-4 items-center"
                            >
                                <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Acc. Statements</p>
                                <img src="/ac_statements.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentCenter("p&l")
                                    setToggle(prev => !prev)
                                }}
                                className="col-span-1 rounded flex  justify-end gap-x-4 items-center"
                            >
                                <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Profit & Loss</p>
                                <img src="/pl.png" alt="home-icon" className="bg-white w-[26px] h-[26px] rounded" />
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentCenter("bet_history")
                                    setToggle(prev => !prev)
                                }}
                                className="col-span-1 rounded flex  justify-end gap-x-4 items-center">
                                <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Bet History</p>
                                <img src="/profitloss.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                            </div>
                            <div
                                onClick={() => {
                                    setCurrentCenter("profile")
                                    setToggle(prev => !prev)
                                }}
                                className="col-span-1 rounded flex  justify-end gap-x-4 items-center">
                                <p className="bg-gray-200 px-2 py-1 rounded text-black text-[0.85rem] mt-1 font-bold">Profile</p>
                                <img src="/user_profile.png" alt="home-icon" className="w-[26px] h-[26px] rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => {
                        setView(prev => ({
                            ...prev,
                            currentView: ""
                        }))
                        setCurrentCenter("home")
                    }}

                >
                    <p className="flex flex-col items-center tracking-wide " onClick={() => setHideSideBar && setHideSideBar(false)}>
                        {/* <img src="https://img.icons8.com/office/16/home--v1.png" alt="home-icon" className="w-[22px] h-[22px] rounded-full" /> */}
                        <HouseIcon
                            fontSize="large"
                            className={`rounded-full`}
                            color={`white`}
                        />

                        <span className="text-sm font-medium text-gray-300">Home</span>
                    </p>
                </div>
                <div
                    onClick={() => {
                        setCurrentCenter("inplay")
                    }}
                >
                    <p className="flex flex-col items-center tracking-wide ">
                        <AlarmOnRoundedIcon
                            fontSize="large"
                            className={`rounded-full`}
                            color={`white`}
                        />
                        <span className="text-sm font-medium text-gray-300">Inplay</span>
                    </p>
                </div>
                <div onClick={() => {
                    // setView(prev => ({
                    //     ...prev,
                    //     currentView: ""
                    // }))
                    toggleSideBar()
                }} className={`mb-1 flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                    <p className="flex flex-col items-center tracking-wide ">
                        <SportsSoccerIcon
                            fontSize="large"
                            className={`rounded-full`}
                            color={`white`}
                        />
                        <span className="text-sm font-medium text-gray-300">Sports</span>
                    </p>

                </div>
                <div onClick={() => {
                    // setView(prev => ({
                    //     ...prev,
                    //     currentView: ""
                    // }))
                    toggleSideBar()
                }} className={`flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                    <p className="flex flex-col items-center tracking-wide ">
                        <PushPinIcon
                            fontSize="large"
                            className={`rounded-full`}
                            color={`white`}
                        />


                        <span className="text-sm font-medium text-gray-300">Multi M..</span>
                    </p>

                </div>
                <div onClick={() => {
                    setCurrentCenter("account")
                }} className={`flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                    <p className="flex flex-col items-center tracking-wide ">
                        <AccountCircleIcon
                            fontSize="large"
                            className={`rounded-full`}
                            color={`white`}
                        />


                        <span className="text-sm font-medium text-gray-300">Account</span>
                    </p>

                </div>
                {/* <div className="flex flex-col justify-center items-center" onClick={() => {
                    loggedIn ?
                        setToggle(prev => !prev) : setOpenLogin(true)
                }}>
                      <p className="flex flex-col items-center tracking-wide ">
                      <AccountCircleIcon
                        fontSize="large"
                        className={`rounded-full`}
                        color={`white`}
                    />
                        <span className="text-sm font-medium text-gray-300">Account</span>
                    </p>
                  
                </div> */}
            </div>
        </div>

    );
}