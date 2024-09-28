"use client";

import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box } from "@mantine/core";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { BetslipContext } from "src/app/context/BetslipContext";
import { formatUnixTimestamp } from "src/app/components/funcStore/editTime";

// Reusable function for rendering collapsible sections
export function CollapseCricketGroups({ groupTitle, onClick, opened, games, filterByLeague }) {

  return (
    <Box mx="auto" className="bg-white">
      <Group position="start" mb={5} onClick={onClick} className="bg-gray-500/[0.9]">
        <div className="flex justify-between text-black items-center w-full">
          <p className="text-sm text-black p-2">{groupTitle}</p>
          {opened ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
      </Group>

      <Collapse in={opened} className="bg-white text-black">
        {/* LEAGUES */}
        <div className="grid grid-cols-2 p-2">
          {games ? (
            games.map((game, gameIndex) => (
              <div
                className="col-span-1 my-3 mx-1"
                key={gameIndex}
                onClick={() => filterByLeague(game)}
              >
                <p className="text-black bg-gray-500/[0.2] px-2 py-1 text-[0.8rem] cursor-pointer">
                  {game}
                </p>
              </div>
            ))
          ) : (
            <div className="min-h-[50vh] flex justify-center align-center">
              <p className="text-black">
                {games.length === 0 && "No matches at the moment"}
              </p>
            </div>
          )}
        </div>
      </Collapse>
    </Box>
  );
}
