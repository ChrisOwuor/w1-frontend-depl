import React from "react";

const games = [
  {
    title: "Sports",
  },
  {
    title: "In-play",
  },
  {
    title: "Casino",
  },
  {
    title: "Live Casino",
  },
  {
    title: "Poker",
  },
  {
    title: "Extra",
  },
];

export default function Top() {
  return (
    <div className="bg-gray-900">
      <div className="md2:mx-[8%] lg1:mx-[12%] py-1 flex justify-end items-center">
        <div className="">
          <p className="text-white text-[0.7rem] uppercase">
            Responsible gaming
          </p>
        </div>
      </div>
    </div>
  );
}
