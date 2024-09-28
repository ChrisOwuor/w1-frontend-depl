import React from "react";
import CenterMain from "./events/CenterMain";
import InPlayCenter from "./events/InplayComponent";
import SlidingText from "../../ads/SlidingText";

const Main = ({ selectedLink }) => {

  return (
    <div className="grid grid-cols-12 gap-x-1">

      <div className="col-span-12 mb-1">
        <div className="grid grid-cols-12">
          <div className='col-span-12'>
            <SlidingText />
          </div>
        </div>
      </div>
      <div className="col-span-12 rounded">
        <InPlayCenter />
      </div>
    </div>
  );
};

export default Main;
