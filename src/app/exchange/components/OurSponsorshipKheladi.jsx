"use client";
import React, { useEffect, useState, useContext } from "react";
import { Visibility } from "@mui/icons-material";
import axios from "axios";
import { NAVContext } from "@/app/context/NavContext";
import AccordionKheladi from "./AccordionKheladi";
import OurSponsorshipAccodion from "./OurSponsorshipAccodion";
export default function OurSponsorshipKheladi () {
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
      heading: "Brand Ambassador",
      data: [
        { h1: "Shahid Kapoor", h2: "Bollywood Actor", text: "Bollywood Superstar and the most versatile actor of India, Shahid Kapoor is the official Brand Ambassador of Khiladi.com Shahid has been a massive presence in Social Media and has been the main presence in India’s biggest web-series of 2023." }
      ],
    },
    {
      heading: "Team Sponsorship",
      data: [

        { h1: "ILT20 League, 2023", h2: "Principal Sponsor, Team ADKR", text: "A dream partnership with the Knights, we are proud to be associated with The Abu DhabiKnight Riders from the inaugural edition of the International League T20. A team with some ofthe Biggest Match-Winners in the history of T20 cricket & A Legacy of a franchise like knight riders." },
        {
          h1: "Legends Cricket Trophy, 2023", h2: "Title Sponsor", text: "Khiladix was the proud sponsor of the ‘Legends Cricket Trophy,’ where some of the biggest namesin the world of cricket came toe to toe to play a legendary tournament with the game’s greatestsuccess, featuring never-seen-before match-upsbetween cricketing legends. Khiladix is honored to be associated with such a legendary league, where iconic player like Sehwag, Harbajan Singh, Suresh Raina, Sanath Jayasuriya, and many others graced this epic tournament."
        }],
    },
    {
      heading: "Partnership",
      data: [

        {
          h1: "Title Sponsor", h2: "", text: "Khiladix was the proud sponsor of the ‘Legends Cricket Trophy,’ where some of the biggest namesin the world of cricket came toe to toe to play a legendary tournament with the game’s greatestsuccess, featuring never-seen-before match-upsbetween cricketing legends. Khiladix is honored to be associated with such a legendary league, where iconic player like Sehwag, Harbajan Singh, Suresh Raina, Sanath Jayasuriya, and many others graced this epic tournament."

        },
        {
          h1: "Telugu Indian Idol", h2: "", text: "Khiladi.com as an official sponsor of Telugu Indian Idol, encouraged the winners of the show and also each individual episode with musical instruments. With guests such as Allu Arjun, Nandamuri Balakrishna gracing the show, it was a pleasure to be associated with a show of such massive scale."

        },
        {
          h1: "Family Dhamaka", h2: "", text: "One of the most recognized and well known game shows throughout the world, Family Feud, will be sponsored by Khiladi.com for Indian Audience. The Indian version of the show will be hosted by Tollywood Star Vishwak Sen."
        }
      ],
    },
  ];

  return (
    <div className="relative mt-[5px]  px-[12px]">
      {!userData ? (
        <div className=" stake-settings py-[15px] ">
          <div className="header-password mt-[1rem] flex-flex-wrap">
            <div className="px-[0.5rem]">
              <div className="headerLine">
                <h6 className="text-[#5700a3] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                  OUR SPONSORSHIPS
                </h6>
              </div>
            </div>
          </div>
          <div className="text-center kh:w-[91.66666667%]">
            <div className="btn-top">
              {rules &&
                rules.map((rule, index) => (
                  <div key={index} className="text-center rw flex-flex-wrap my-[1.3rem]">
                    <div className="mb-[1rem] w-full max-w-full">
                      <OurSponsorshipAccodion heading={rule.heading} bg={"#dbcdeb"} text={rule.data} color={"#f1f1f1"} textColor={"black"} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 p-5">loading</p>
      )}
    </div>
  );
}
