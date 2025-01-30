"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "src/app/context/AuthContext";
import jwt_decode from "jwt-decode";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function LoginPage({ globalSettings }) {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setOpenRegister, setOpenLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

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
      setLoading(false);
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

  const handleDemoLogin = async () => {
    // setFormValues({ username: "DEMO", password: "123456" });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          username: "DEMO",
          password: "123456"
        }
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
    <div className="max-sm:w-screen min-w-[270px] flex flex-col justify-center p-2">
      <div className="col-span-1 flex items-end justify-center mb-3">
        <img
          src="/banner4.webp"
          alt="banner"
          className="w-full h-full object-contain"
        />
      </div>
      <form className="col-span-1 w-full rounded-lg " onSubmit={handleLogin}>
        {errorM && (
          <div>
            <p className="text-red-700 font-bold">{errorM}</p>
          </div>
        )}
        <div className="mb-7 flex flex-col items-start justify-start w-full">
          <label _ngcontent-jqf-c76="" for="password" class="login-page-label">
            Username
          </label>
          <div className="relative w-full flex items-center">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-6 pr-10 text-black outline-none focus:border-danger dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
              value={formValues.username}
              onChange={handleChange}
              required
            />
            <div className="absolute right-0 top-0 bottom-0 font-bold border-l-2 border-gray/[0.5] px-2 flex items-center justify-center">
              <PersonIcon fontSize="medium" className="text-black" />
            </div>
          </div>
        </div>
        <div className="mb-7 flex  flex-col items-start justify-start w-full">
          <label _ngcontent-jqf-c76="" for="password" class="login-page-label">
            Password
          </label>
          <div className="relative w-full flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-6 pr-10 text-black outline-none focus:border-danger dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-danger"
              value={formValues.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-0 top-0 bottom-0 text-black text-sm font-bold border-l-2 border-gray/[0.5] px-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>
          </div>
        </div>
        <div className="my-1 text-center">
          <button
            type="submit"
            className="bg-[#5700a3] font-bold text-lg w-full px-4 py-2.5 rounded"
            disabled={loading}
          >
            {loading ? "Processing" : success ? "Redirecting.." : "Login"}
          </button>
        </div>
        <div className="my-1 text-center">
          <button
            type="button"
            className="bg-[#ffff54] font-bold text-lg text-black hover:bg-[#5700a3] w-full px-4 py-2.5 rounded"
            disabled={loading}
            onClick={handleDemoLogin}
          >
            {loading ? "Processing" : "Login with Demo ID"}
          </button>
        </div>
      </form>
    </div>
  );
}
