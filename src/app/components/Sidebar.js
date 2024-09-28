"use client";
import React, { useState } from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsRugbyIcon from "@mui/icons-material/SportsRugby";
import { ScrollArea } from "@mantine/core";

export default function Sidebar({ setSelectedLink, activeLink }) {
  const [iconColor, setIconColor] = useState("");
  const handleLinkClick = (link) => {
    setIconColor(link);
    setSelectedLink(link);
  };
  const games = [
    {
      name: "Cricket",
      id: "cricket",
      icon: (
        <SportsCricketIcon
          color={`${iconColor === "cricket" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Football",
      id: "football",
      icon: <SportsSoccerIcon color={`${iconColor === "football" ? "white" : "secondary"}`} />,
    },
    {
      name: "Basketball",
      id: "basketball",
      icon: <SportsBasketballIcon color={`${iconColor === "basketball" ? "white" : "primary"}`} />,
    },
    {
      name: "Baseball",
      id: "baseball",
      icon: (
        <SportsBaseballIcon
          color={`${iconColor === "baseball" ? "white" : "warning"}`}
        />
      ),
    },
    {
      name: "American Football",
      id: "americanfootball",
      icon: (
        <SportsFootballIcon
          color={`${iconColor === "americanfootball" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Tennis",
      id: "tennis",
      icon: (
        <SportsTennisIcon color={`${iconColor === "tennis" ? "white" : "secondary"}`} />
      ),
    },
    {
      name: "Golf",
      id: "golf",
      icon: <SportsGolfIcon color={`${iconColor === "golf" ? "white" : "warning"}`} />,
    },
    {
      name: "Rugby",
      id: "rugby",
      icon: <SportsRugbyIcon color={`${iconColor === "rugby" ? "white" : "success"}`}  />,
    },
    {
      name: "Volleyball",
      id: "volleyball",
      icon: (
        <SportsVolleyballIcon
          color={`${iconColor === "volleyball" ? "white" : "primary"}`}
        />
      ),
    },
    {
      name: "Ice Hockey",
      id: "icehockey",
      icon: <SportsHockeyIcon color={`${iconColor === "icehockey" ? "white" : "success"}`} />,
    },
  ];

  return (
    <div className="sticky top-0">
      <div className="flex items-center font-semibold text-white gap-x-4 p-2 overflow-x-auto">
        {games.map((game, index) => (
          <div
            key={index}
            onClick={() => handleLinkClick(game.id)}
            className={`flex flex-col justify-center items-center rounded p-1 gap-y-1 hover:text-gray-300 hover:bg-orange-600/[0.5] cursor-pointer ${
              activeLink === game.id ? "text-white bg-green-600/[0.7] p-1" : ""
            }`}
          >
            <div>{game.icon}</div>
            <p
              className={`text-[0.7rem] rounded text-black ${
                activeLink === game.id ? "text-white bg-gray-900 p-1" : ""
              }`}
            >
              {game.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
