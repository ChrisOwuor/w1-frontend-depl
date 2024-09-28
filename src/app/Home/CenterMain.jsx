import React, { useContext, useEffect, useState } from "react";
import Center from "../components/Center";
import Ads from "../components/Slider/Ads";
import { OpenEventContext } from "../context/OpenEventContext";

const CenterMain = ({ active }) => {
  const { eventOpen } = useContext(OpenEventContext);
  const [eventMode, setEventMode] = useState(false);

  useEffect(() => {
    if (eventOpen) {
      setEventMode(true);
    }
    console.log(eventMode);
  }, [eventOpen]);

  console.log(eventOpen);

  return (
    <div className="">
      <Center active={active} />
    </div>
  );
};

export default CenterMain;
