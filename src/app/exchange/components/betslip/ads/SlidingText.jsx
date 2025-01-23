import { getMessage } from "src/app/api/exchange/messages";
import React, { useEffect, useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";

const SlidingText = () => {
  const [msg, setMsg] = useState("🚀 Aura Bet");
  const [contentIndex, setContentIndex] = useState(0);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const handleAnimationIteration = () => {
      setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
    };

    const animatedElements = document.querySelectorAll(".animate-slideRight");

    animatedElements.forEach((element) => {
      element.addEventListener("animationiteration", handleAnimationIteration);
    });

    return () => {
      animatedElements.forEach((element) => {
        element.removeEventListener(
          "animationiteration",
          handleAnimationIteration
        );
      });
    };
  }, []);

  useEffect(() => {
    (async () => {
      const msg = await getMessage();
      if (msg) {
        if (msg.length > 0) {
          setContents([msg[0].message]);
        } else {
          setContents([
            "Exciting News: Our virtual games are back on. Play anytime, anywhere, 24/7! Don't miss out on the fun and thrill.",
            "BETWIN9   TRADE   BETTER BETWIN9   TRADE   BETTER BETWIN9   TRADE   BETTER BETWIN9   TRADE   BETTER BETWIN9   TRADE   BETTER BETWIN9   TRADE  BETTER ",
          ]);
        }
      }
    })();
  }, []);

  return (
    <div className="relative h-[4vh]  min-mk:mt-2">
      <div className="flex items-center text-black">
        
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden z-[99] flex items-center to-orange-500/[0.1] h-[4vh]">
      <HiSpeakerWave size={20} color="#080403" />
        <div
          className={`flex justify-end items-center overflow-hidden  animate-slidindAds min-w-[1300px]`}
        >
          <p
            className={`text-end  text-black text-xs leading-[0.7rem] font-bold pr-1 pl-0 tracking-wider  w-full px-1 `}
          >
            {contents[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SlidingText;
