import React from "react";
import CenterMain from "./CenterMain";

const Main = ({ selectedLink }) => {

  return (
    <div className="grid grid-cols-12 gap-x-1" id="center_main_top_flag">
      <div className="col-span-12 rounded">
        <CenterMain active={selectedLink} />
      </div>
    </div>
  );
};

export default Main;
