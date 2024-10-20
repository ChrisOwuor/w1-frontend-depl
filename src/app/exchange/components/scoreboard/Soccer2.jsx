import React, { useState } from "react";
import { Box, Collapse, Group } from "@mantine/core";

const SoccerScores2 = ({ incidents, scores }) => {
  const [currentCollpsed, setCurrentCollaped] = useState("Incidents");
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  // Get the elapsed time in minutes
  const elapsedTime = scores ? scores.elapsedRegularTime : 0;

  // Calculate the percentage fill for the first half and second half
  const firstHalfElapsed = Math.min(elapsedTime, 45);
  const secondHalfElapsed = Math.max(elapsedTime - 45, 0);

  const firstHalfFill = (firstHalfElapsed / 45) * 100;
  const secondHalfFill = (secondHalfElapsed / 45) * 100;

  return (
    <>
      {scores && (
        <div className="bg-[#303131] flex flex-col items-start">
          <div className="flex items-center bg-[#303131] text-white p-2">
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
          <div className="flex items-center p-2">
            <p className="text-lg font-medium tracking-wider">
              <span className="mr-2">{scores &&scores.matchStatus == "Finished" &&
                `${scores.matchStatus}`}</span>
             <span className="text-success"> {scores &&
                `${scores.elapsedRegularTime}'`}</span>
            </p>
          </div>

          <div className="w-full border-t border-white p-2 sm:p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* First Half Progress Bar */}
              <div className="bg-[#D2D2D2] h-1">
                <div
                  className="bg-[#04A807] h-1"
                  style={{ width: `${firstHalfFill}%` }}
                ></div>
              </div>

              {/* Second Half Progress Bar */}
              <div className="bg-[#D2D2D2] h-1">
                <div
                  className="bg-[#04A807] h-1"
                  style={{ width: `${secondHalfFill}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SoccerScores2;

