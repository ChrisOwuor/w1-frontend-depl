"use client";

import Link from "next/link";
import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mantine/core";

export default function Navbar() {
  const { setOpenLogin } = useContext(AuthContext);
  const [disable, setDisable] = useState(false);
  const handleLogout = async () => {
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

  return (
    <header className="bg-orange-600 w-full">
      <nav className="px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4 lg:border-none">
          <div className="flex w-full items-center justify-between">
            <Link href="/">
              <p className="text-xl md:text-1xl font-bold">
                <span className="text-white">Aura-</span>
                <span className="text-orange-800 rounded p-1 bg-white">
                  Bet
                </span>
              </p>
            </Link>

            <div className="">
              <Button
                disabled={disable}
                onClick={handleLogout}
                className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-black hover:bg-indigo-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
