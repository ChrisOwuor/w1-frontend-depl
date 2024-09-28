"use client";
import { Button } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../components/funcStore/authenticate";

const Confirmemail = () => {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [mounting, setMounting] = useState(false);
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const action = isAuthenticated();
    if (action) {
      setMounting(true);
      setAuth(true)
    } else {
      setTimeout(()=>{
        window.location.replace("/");
      },3000)
      
    }
  }, []);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("tk");
      if (!token) {
        setErrorM("Something went wrong, contanct support for help");
        setSuccess(false);
        setLoading(false);
        return;
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/confirmemail`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          setLoading(false);
          setSuccess(true);
          localStorage.setItem("tk", res.data.token);
          localStorage.removeItem("openLogin");
          localStorage.removeItem("openRegister");
          window.location.replace("/profile");
        } else {
          setLoading(false);
          setErrorM(res.data.message);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSuccess(false);
      setErrorM("Something went wrong contanct support or help");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
    }, 7000);
  }, [errorM]);
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      {mounting ? (
        <div className="rounded">
          <div className="flex my-3">
            <p className="text-white text-2xl font-bold">SmartBet</p>
          </div>
          <div className="bg-gray-600 p-3 rounded">
            <p className="text-white text-sm font-bold">
              We sent you a confirmation code to your email
            </p>
            {errorM && (
              <p className="text-red-600 text-sm font-bold">{errorM}</p>
            )}
            <div className="my-2 flex items-center gap-3">
              <input
                type="text"
                name=""
                placeholder="Enter code here"
                id=""
                onChange={(e) => setCode(e.target.value)}
                className="rounded text-black focus:text-black"
              />
              <Button
                type="button"
                name=""
                id=""
                disabled={loading}
                onClick={() => handleConfirm()}
                className="bg-orange-600 p-2 rounded cursor-pointer"
              >
                {loading
                  ? "Processing.."
                  : success
                  ? "Redirecting.."
                  : "Confirm"}
              </Button>
            </div>{" "}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-white text-sm font-bold">Loading ...</p>
        </div>
      )}
    </div>
  );
};

export default Confirmemail;
