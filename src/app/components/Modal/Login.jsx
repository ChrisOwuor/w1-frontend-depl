"use client";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, PasswordInput } from "@mantine/core";
import axios from "axios";
import { AuthContext } from "src/app/context/AuthContext";
import jwt_decode from "jwt-decode";

export default function Login() {
  const [errorM, setErrorM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setOpenRegister, setOpenLogin } = useContext(AuthContext);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const action = localStorage.getItem("openLogin");
    if (action) {
      localStorage.removeItem("openLogin");
    }
    if (form.values.username.trim() == "" || form.values.password.trim() == "") {
      alert("input all the fields");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        form.values
      );
      if (res && res.status === 200) {
        if (res.data.statusCode === 200) {
          setLoading(false);
          const token_key = res.data.token;
          localStorage.setItem("tk", token_key);
          const decoded = jwt_decode(token_key);
          if (decoded.status === "locked") {
            setSuccess(false);
            return alert("Your account has been blocked")
          }
          setSuccess(true);
          if (decoded.role === "systemControl") {
            window.location.replace("/u/systemcontrol");
          } else if (decoded.role === "king") {
            window.location.replace("/u/control");
          } else if (decoded.role === "mainAdmin") {
            window.location.replace("/u/main_admin");
          } else if (decoded.role === "admin") {
            window.location.replace("/u/admin");
          } else if (decoded.role === "master") {
            window.location.replace("/u/master");
          } else if (decoded.role === "super") {
            window.location.replace("/u/super");
          } else if (decoded.role === "panel") {
            window.location.replace("/u/panel");
          } else if (decoded.role === "normalUser") {
            window.location.replace("/");
          } else {
            alert(
              "Oops you dont have permission to access any services contact support for help!"
            );
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

  const handleRegister = () => {
    setOpenRegister(true);
    setOpenLogin(false);
    localStorage.removeItem("openLogin");
    localStorage.setItem("openRegister", true);
  };
  useEffect(() => {
    setTimeout(() => {
      setErrorM("");
    }, 7000);
  }, [errorM]);

  return (
    <div className="">
      <form>
        {errorM && (
          <div className="">
            <p className="text-red-700 font-bold">{errorM}</p>
          </div>
        )}
        <TextInput
          withAsterisk
          label="Username"
          placeholder="username"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <div className=" my-4 text-center  text-white">
          <Button className="bg-black" disabled={loading} onClick={handleLogin}>
            {loading ? "Processing" : success ? "Redirecting.." : "Login"}
          </Button>
        </div>
        <div className="mt-2 mb-2 text-center">
          <p className="text-black">
            You don&apos;t have an account yet?
            <span
              className="text-green-900 ml-4 italic cursor-pointer underline"
              onClick={() => handleRegister()}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
