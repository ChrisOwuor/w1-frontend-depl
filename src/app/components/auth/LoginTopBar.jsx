"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "src/app/context/AuthContext";
import jwt_decode from "jwt-decode";
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { NAVContext } from "@/app/context/NavContext";


export default function LoginPageTopBar({ }) {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setOpenRegister, setOpenLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
    const {
      currentCenter,
      setCurrentCenter,
      setNewMobileNavOpen,
      newMobileNavOpen,
    } = useContext(NAVContext);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const action = localStorage.getItem("openLogin");
    if (action) {
      localStorage.removeItem("openLogin");
    }
    if (formValues.username.trim() === "" || formValues.password.trim() === "") {
      alert("Input all the fields");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        formValues
      );
      if (res && res.status === 200) {
        if (res.data.statusCode === 200) {
          setLoading(false);
          const token_key = res.data.token;
          localStorage.setItem("tk", token_key);
          const decoded = jwt_decode(token_key);
          if (decoded.status === "locked") {
            setSuccess(false);
            return alert("Your account has been blocked");
          }
          setSuccess(true);
          switch (decoded.role) {
            case "systemControl":
              window.location.replace("/u/systemcontrol");
              break;
            case "king":
              window.location.replace("/u/control");
              break;
            case "mainAdmin":
              window.location.replace("/u/main_admin");
              break;
            case "admin":
              window.location.replace("/u/admin");
              break;
            case "master":
              window.location.replace("/u/master");
              break;
            case "super":
              window.location.replace("/u/super");
              break;
            case "panel":
              window.location.replace("/u/panel");
              break;
            case "normalUser":
              window.location.replace("/");
              break;
            default:
              alert("Oops, you don't have permission to access any services. Contact support for help!");
          }
        } else {
          setErrorM(res.data.message);
          setLoading(false);
          setSuccess(false);
        }
      }
    } catch (error) {
      console.log(error);
      setErrorM("Something went wrong, contact support for help");
      setLoading(false);
    }
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorM("");
    }, 7000);
    return () => clearTimeout(timer);
  }, [errorM]);

  return (
    <div className="flex justify-center items-center">
      <div className="login mr-[0.5rem] cursor-pointer" onClick={() => setCurrentCenter("login")}>
        <p
          className="bg-[#ffff54] rounded-[4px] text-black text-[18px] uppercase py-1 px-[37px] font-[700] border border-black"
        >
          Login
        </p>
      </div>
      <div className="signup cursor-pointer">
        <p
          className=" text-[#fff] rounded-[4px] text-[18px] uppercase py-1 px-[37px] font-[700] border border-white"
        >
          SignUp
        </p>
      </div>

      {/* <form className="col-span-1 w-full rounded-lg shadow-lg flex items-center gap-x-4" onSubmit={handleLogin}>
        {errorM && (
          <div>
            <p className="text-red-700 font-bold">{errorM}</p>
          </div>
        )}

        <div className="flex  items-center w-full">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            className="w-full rounded-lg border border-stroke bg-white py-1.5 px-4 text-black outline-none focus:border-danger focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
            value={formValues.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className=" flex  items-center w-full">
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              // className="w-full  py-3 font-bold  text-lg text-black rounde-lgd border-2 focus:border-danger-400 bg-gray-300"
              className="w-full rounded-lg border border-stroke bg-white py-1.5 px-4 text-black outline-none focus:border-danger focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-0 bottom-0 text-black text-sm font-bold border-l-2 border-gray/[0.5] px-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {
                showPassword ?
                  <VisibilityOffIcon fontSize="small" className="" />
                  :
                  <VisibilityIcon fontSize="small" className="" />
              }
            </button>
          </div>
        </div>
        <div className=" text-center">
          <button
            type="submit"
            className="bg-warning font-bold text-md text-black flex items-center hover:bg-yellow-400 w-full px-4 py-1.5 rounded"
            disabled={loading}
          >
            {loading ? "Processing" : success ? "Redirecting.." : "Login"}
            <LoginRoundedIcon fontSize="medium" className="text-black" />
          </button>
        </div>

      </form> */}
    </div>
  );
}
