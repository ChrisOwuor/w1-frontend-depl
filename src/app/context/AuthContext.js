import React, { createContext, useEffect, useState } from "react";
import { fetchUserData } from "../api/exchange";
import { isAuthenticated } from "../components/funcStore/authenticate";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ openUserconsentwizard, setOpenUserconsentwizard] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const loggedIn = isAuthenticated();

  const [userData, setUserData] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      runner();
      const interval = setInterval(() => {
        if (!isRequesting) {
          runner();
        }
      }, 5000);
      return () => clearInterval(interval);
    } else {
      setOpenLogin(true);
    }
  }, [loggedIn]);

  const runner = async () => {
    try {
      setIsRequesting(true);
      const userData_ = await fetchUserData();
      if (userData_) {
        setUserData(userData_);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      runner();
    } else {
      setOpenLogin(true);
    }
  }, [loggedIn]);

  const getfreshUserData = (from) => {
    // alert(`${from} -ok`)
    if (!isRequesting) {
      runner();
    }
  };

  useEffect(() => {
    if (openLogin) {
      localStorage.setItem("openLogin", true);
    }
  }, [openLogin]);

  useEffect(() => {
    if (openRegister) {
      localStorage.setItem("openRegister", true);
      setOpenLogin(false);
    }
  }, [openRegister]);

  return (
    <AuthContext.Provider
      value={{
        openLogin,
        setOpenLogin,
        openRegister,
        setOpenRegister,
        getfreshUserData,
        setUserData,
        userData,
        setOpenUserconsentwizard,
        openUserconsentwizard
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
