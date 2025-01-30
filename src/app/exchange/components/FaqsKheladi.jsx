"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
import AccordionKheladi from "./AccordionKheladi";
export default function FaqsKheladi () {
  const [errorM, setErrorM] = useState("");
  const [successM, setSuccessM] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false);

  const [userData, setUserData] = useState({});
  const { setCurrentCenter } = useContext(NAVContext);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("tk");
      if (token) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res) {
          if (res.status === 200) {
            setUserData(res.data.other);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token_d = localStorage.getItem("tk");
    if (token_d) {
      // setLoggedIn(true);
      fetchData();
    }
  }, []);

  let rules = [
   

    {
      heading: " 1. How do I make a deposit? ( 𝗗𝗲𝗽𝗼𝘀𝗶𝘁 )",
      data: [
        "Click “Deposit” from the top right corner on the homepage, this action will lead you to WhatsApp, where you can obtain the payment details. Proceed to make the payment using the provided account details. Once the payment is complete, kindly share the payment acknowledgement on WhatsApp."
      ],
    },
    {
      heading: " 2. What payment methods are accepted? ( 𝗗𝗲𝗽𝗼𝘀𝗶𝘁 ) ",
      data: [

        " We accept bank transfer, payment through Google Pay, Phone Pay and Payment. "
      ],
    },
    {
      heading: " 3. What is the minimum and maximum deposit amount? ( 𝗗𝗲𝗽𝗼𝘀𝗶𝘁 )  ",
      data: [

" The minimum deposit starts from 100 INR to unlimited. "      ],
    },
  ];

  return (
    <div className="relative mt-[5px]  px-[12px]">
      <div className=" stake-settings py-[15px] ">
        <div className="header-password mt-[1rem] flex-flex-wrap">
          <div className="px-[0.5rem]">
            <div className="headerLine">
              <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                FAQ
              </h6>
            </div>
          </div>
        </div>
        <div className="text-center w-full">
          <div className="btn-top">
            {rules &&
              rules.map((rule, index) => (
                <div
                  key={index}
                  className="text-center rw flex-flex-wrap my-[1.3rem]"
                >
                  <div className="mb-[1rem] w-full max-w-full">
                    <AccordionKheladi
                      heading={rule.heading}
                      bg={"#fff"}
                      text={rule.data}
                      color={"#ededed"}
                      textColor={"black"}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
