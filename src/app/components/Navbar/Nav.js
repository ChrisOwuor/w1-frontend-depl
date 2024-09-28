"use client";

import { Button, Modal } from "@mantine/core";
import Create from "../Modal/Create";
import Login from "../Modal/Login";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/app/context/AuthContext";
import { isAuthenticated } from "../funcStore/authenticate";
import axios from "axios";

const navigation = [
  { name: "Sports", href: "#" },
  { name: "Live", href: "#" },
];

export default function Example() {
  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false);

  const { openLogin, setOpenLogin, setOpenRegister, openRegister } =
    useContext(AuthContext);

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

  return (
    <header className="bg-orange-600">
      <div className="md2:mx-[8%] lg1:mx-[12%]">
        <nav className="" aria-label="Top">
          <div className="flex w-full items-center justify-between border-b py-4 lg:border-none">
            <div className="flex w-full items-center justify-between">
              <Link href="/">
                <p className="text-xl md:text-1xl font-bold">
                  <span className="text-white">Aura-</span>
                  <span className="text-orange-800 rounded p-1 bg-white">
                    Bet
                  </span>
                </p>
              </Link>

              <div className="gap-x-2 flex items-center">
                

                {!loggedIN ? (
                  <div className="ml-10 space-x-4">
                    <Button
                      onClick={setOpenedCreate}
                      className="inline-block rounded-md border-none bg-gray-900 py-2 px-4 text-white uppercase text-[0.8rem]"
                    >
                      Register
                    </Button>
                    <Button
                      onClick={setOpened}
                      className="inline-block rounded-md border-none bg-gray-900 py-2 px-4  text-white uppercase text-[0.8rem]"
                    >
                      Login
                    </Button>
                  </div>
                ) : (
                  <div className="ml-10 space-x-4 ">
                    <Button
                      disabled={disable}
                      onClick={handleLogout}
                      className="inline-block rounded-md border-none bg-gray-900 py-2 px-4  text-white uppercase text-[0.8rem]"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        <Modal
          opened={opened}
          onClose={() => handleCloseLogin()}
          title="Login"
          size={"xl"}
        >
          <Login />
        </Modal>
        <Modal
          opened={openedCreate}
          onClose={() => handleCloseRegister()}
          title="Register"
          size={"xl"}
        >
          <Create />
        </Modal>
      </div>
    </header>
  );
}
