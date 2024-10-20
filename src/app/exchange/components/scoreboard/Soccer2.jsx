import React, { useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";

const SoccerScores2 = ({ incidents, scores }) => {
  const [currentCollpsed, setCurrentCollaped] = useState("Incidents");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      {scores && (
        <div className="bg-[#303131] flex flex-col items-start p-2">
          <div className="flex items-center bg-[#303131] text-white">
            <p className="text-lg font-medium tracking-wider">
              {scores.score &&
                `${scores.score.home.name}`}

              <span className="text-success font-bold ml-2">{scores.score &&
                `${scores.score.home.score}`}</span>
            </p>
            <p className="text-lg font-medium text-success">
              -
            </p>
            <p className="text-lg font-medium tracking-wider">
              <span className="text-success font-bold mr-2">{scores.score &&
                `${scores.score.away.score}`}</span>
              {scores.score &&
                `${scores.score.away.name}`}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-medium tracking-wider">
              <span className="mr-2">{scores &&scores.matchStatus == "Finished" &&
                `${scores.matchStatus}`}</span>
             <span className="text-success"> {scores &&
                `${scores.elapsedRegularTime}'`}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SoccerScores2;

