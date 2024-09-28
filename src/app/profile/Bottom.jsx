import Link from "next/link";
import React from "react";

const games = [
  {
    title: "Home",
    link:'/'
  },
  {
    title: "Sports",
    link:'/'
  },
  {
    title: "Live",
    link:'/live',
  },
];

export default function Bottom() {
  return (
    <div className="bg-[#333333] flex justify-between items-center">

      <div className="flex gap-2 px-4 sm:px-6 lg:px-8 text-gray-400 text-sm">

        {games.map((modes, index) => (
          <div key={index}>
            <div className="py-4 pr-3 hover:text-white cursor-pointer">
              <Link href={modes.link}>{modes.title}</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mr-10">
        {/* <p className="text-sm text-white">Account</p> */}
      </div>
      
    </div>
  );
}
