"use client";
import React, { useState, useEffect } from "react";
import CenterMessage from "./msgs/CenterMessage";
import Basketball from "./events/Basketball";
import Baseball from "./events/Baseball";
import AmericanFootball from "./events/Americanball";
import Tennis from "./events/Tennis";
import Volleyball from "./events/Volleyball";
import IceHockey from "./events/IceHockey";
import Rugby from "./events/Rugby";
import Golf from "./events/Golf";
import Cricket from "./events/Cricket";
import Soccer from "./events/Soccer";

export default function Center({ active }) {
  const [loading, setLoading] = useState(true);
  const [componentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    setLoading(true);
    let newComponentToRender = null;

    switch (active) {
      case "cricket":
        newComponentToRender = <Cricket />;
        break;
      case "football":
        newComponentToRender = <Soccer />;
        break;
      case "basketball":
        newComponentToRender = <Basketball />;
        break;
      case "baseball":
        newComponentToRender = <Baseball />;
        break;
      case "americanfootball":
        newComponentToRender = <AmericanFootball />;
        break;
      case "tennis":
        newComponentToRender = <Tennis />;
        break;
      case "volleyball":
        newComponentToRender = <Volleyball />;
        break;
      case "icehockey":
        newComponentToRender = <IceHockey />;
        break;
      case "golf":
        newComponentToRender = <Golf />;
        break;
      case "rugby":
        newComponentToRender = <Rugby />;
        break;
      default:
        newComponentToRender = <CenterMessage />;
    }

    setComponentToRender(newComponentToRender);
    setLoading(false);
  }, [active]);

  return (
    <>
      {loading ? (
        <div className="flex h-[40vh] items-center justify-center">
          <p>Loading ...</p>
        </div>
      ) : (
        componentToRender
      )}
    </>
  );
}
