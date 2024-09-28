"use client";
// import Footer from "../components/Footer";
// import Navbar from "./Navbar";
// import Content from "./Content";
import { useContext, useEffect, useState } from "react";
// import { isAuthenticated } from "../components/funcStore/authenticate";
// import { AuthContext } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import { AuthContext } from "@/app/context/AuthContext";
import Footer from "@/app/components/Footer";
import Bottom from "@/app/components/Navbar/Bottom";
import Account_table from "./Account_table";
import MobileBottomNav from "@/app/components/Navbar/MobileBottomNav";
import MobileFooter from "@/app/components/MobileFooter";
import MobileBottom from "@/app/components/Navbar/MobileBottom";
// import Bottom from "../components/Navbar/Bottom";

export default function Account_statement() {
  const { openLogin, setOpenLogin } = useContext(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  const [verified, setVerified] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(false);
  const toggleSideBar = () => setHideSideBar((prev) => !prev);

  useEffect(() => {
    const tk = isAuthenticated();
    if (tk) {
      const tokenD = localStorage.getItem("tk");
      const token = jwt_decode(tokenD);
      const roleToUrlMap = {
        systemControl: "/u/systemcontrol",
        king: "/u/control",
        mainAdmin: "/u/main_admin",
        admin: "/u/admin",
        master: "/u/master",
        super: "/u/super",
        panel: "/u/panel",
        normalUser: "/profile",
      };

      const redirectUrl = roleToUrlMap[token.role];

      if (redirectUrl === "/profile") {
        setVerified(true);
        setLoggedIn(true);
        return;
      } else {
        setLoggedIn(false);
        window.location.replace(redirectUrl);
        return;
      }
    } else {
      setOpenLogin(true);
      window.location.replace("/u/login");
      setLoggedIn(false);
      return;
    }
  }, []);

  return (
    <>
      {!loggedIn ? (
        <div className="min-h-screen flex justify-center items-center">
          <p className="text-white">Loading ...</p>
        </div>
      ) : (
        <div className="relative text-white h-screen grid grid-cols-12 mt-12">
          <div className="col-span-12">
            <div className="max-mk:hidden  fixed top-0 right-0 left-0 z-50">
              {/* <Bottom /> */}
            </div>
            <div className="mk:hidden  fixed top-0 right-0 left-0 z-50">
              <MobileBottom toggleSideBar={toggleSideBar} />
            </div>
            <div className="rounded  md:min-h-[60vh]  mk:mx-auto mk:max-w-[70%] max-mk:m-1 mt-10">
              <Account_table />
            </div>
            <div className="max-mk:hidden">
              <Footer />
            </div>
            <div className="mk:hidden w-full">
              <MobileFooter />
            </div>
            <div className="mk:hidden  fixed bottom-0 left-0 right-0 z-50">
              <MobileBottomNav toggleSideBar={toggleSideBar} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
