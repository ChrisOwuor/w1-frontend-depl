import React from "react";
import MarketComponent from "./MarketComponent";

const MarketGrid = ({
  otherMarkets,
  mkts,
  currentMkt,
  mktBks,
  evId,
  setRefresh,
  cricketEvent,
  view,
  spName,
  evName,
}) => {
  if (otherMarkets !== "premium" || !mkts) {
    return null;
  }

  // Sort the markets based on the number of runners
  const sortedMkts = [...mkts].sort((a, b) => a.runners.length - b.runners.length);


  return (
    <div className="columns-1 w-full">
      {sortedMkts.map((market, i) => {
        if (market.marketName !== currentMkt.mkt_name && market.marketName !== "Match Odds") {
          return (
            <div className="break-inside-avoid" key={i}>
              <MarketComponent
                marketBookOdds={mktBks}
                eventId={evId}
                setRefresh={setRefresh}
                market={market}
                openedd={[0, 1, 2, 3, 4, 5, 6, 7].includes(i) || false}
                eventData={cricketEvent}
                eventTypeId={view.sportId}
                sportName={spName}
                eventName={evName}
                otherMarkets={true}
                isLineMarket={true}
              />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MarketGrid;
