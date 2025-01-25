import React from "react";

const MarketOddsComponentTemp = ({
  mktBk,
  styling2,
  ii,
  handleEventPlaceBet,
  showLastTradedPrice,
  formatNumber,
  runner,
  market,
  eventData,
  otherMarkets,
}) => {
  const defaultStake = 50;
  return (
    <div class="col-4 kh:w-[58.33333333%] w-[41.66666667%]  change flex justify-content-end ">
      {eventData && (
        <>
          <div className={`bl-buttons mobile-hide hidden kh:flex`}>
            {mktBk && mktBk.status === "CLOSED" ? (
              mktBk.inplay === true ? (
                <div
                  className={`bg-[#F5ACD4]/[0.9] flex justify-center
                     col-span-7 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}
                >
                  <p className="font-medium text-black uppercase">
                    Betting Paused
                  </p>
                </div>
              ) : (
                <div
                  className={`
                     ${
                       mktBk.status === "CLOSED"
                         ? "bg-[#F5ACD4]/[0.9]"
                         : "bg-[#F5ACD4]"
                     } flex justify-center
                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}
                >
                  <p className="font-medium text-black uppercase">
                    {mktBk.status}
                  </p>
                </div>
              )
            ) : (
              ""
            )}

            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack.length > 2 ? (
                <button
                  className={`back-3 bet-sec bl-btn eon1 spark  ${
                    otherMarkets === true && "hidden"
                  } bg-back/[0.2]`}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[2].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {" "}
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToBack[2].price}
                  <span className="size2">
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[2].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`back-3 bet-sec bl-btn eon1 spark  ${
                    otherMarkets === true && "hidden"
                  } `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`back-3 bet-sec bl-btn eon1 spark ${
                  otherMarkets === true && "hidden"
                } `}
                onClick={() =>
                  handleEventPlaceBet(
                    `back`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}
            {/* 2 */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack.length > 1 ? (
                <button
                  className={`$back-2 bet-sec bl-btn eon2  ${
                    otherMarkets === true && "min-md:hidden"
                  }`}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[1].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToBack[1].price}

                  <span className={`size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[1].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`back-2 bet-sec bl-btn eon2`}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`back-2 bet-sec bl-btn eon2 ${
                  otherMarkets === true && "hidden"
                }`}
                onClick={() =>
                  handleEventPlaceBet(
                    `back`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}

            {/* 1 */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack.length > 0 ? (
                <button
                  className={`back back-1 bet-sec bl-btn waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[0].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToBack[0].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[0].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`back back-1 bet-sec bl-btn waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`back back-1 bet-sec bl-btn waves-effect waves-light `}
                onClick={() =>
                  handleEventPlaceBet(
                    `back`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0
                <span _ngcontent-xck-c85="" class="size2">
                  0
                </span>
              </button>
            )}

            {/* lay */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay.length > 0 ? (
                <button
                  className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[0].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToLay[0].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[0].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                onClick={() =>
                  handleEventPlaceBet(
                    `lay`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}
            {/* 2 */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay.length > 1 ? (
                <button
                  className={`bet-sec bl-btn eon3 lay-2`}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[1].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToLay[1].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[1].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`bet-sec bl-btn eon3 lay-2 `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`bet-sec bl-btn eon3 lay-2} ${
                  otherMarkets === true && "hidden"
                }`}
                onClick={() =>
                  handleEventPlaceBet(
                    `lay`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}
            {/* 3 */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay.length > 2 ? (
                <button
                  className={`bet-sec bl-btn eon4 lay-3  ${
                    otherMarkets === true && "hidden"
                  } `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[2].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToLay[2].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[2].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`bet-sec bl-btn eon4 lay-3}  ${
                    otherMarkets === true && "hidden"
                  } `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`bet-sec bl-btn eon4 lay-3  ${
                  otherMarkets === true && "hidden"
                } `}
                onClick={() =>
                  handleEventPlaceBet(
                    `lay`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}
          </div>
          {/* mobile view */}
          <div className={`bl-buttons desktop-hide  flex kh:hidden`}>
            {mktBk && mktBk.status === "CLOSED" ? (
              mktBk.inplay === true ? (
                <div
                  className={`bg-[#F5ACD4]/[0.9] flex justify-center
                     col-span-7 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}
                >
                  <p className="font-medium text-black uppercase">
                    Betting Paused
                  </p>
                </div>
              ) : (
                <div
                  className={`
                     ${
                       mktBk.status === "CLOSED"
                         ? "bg-[#F5ACD4]/[0.9]"
                         : "bg-[#F5ACD4]"
                     } flex justify-center
                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}
                >
                  <p className="font-medium text-black uppercase">
                    {mktBk.status}
                  </p>
                </div>
              )
            ) : (
              ""
            )}

            {/* back */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToBack.length > 0 ? (
                <button
                  className={`back back-1 bet-sec bl-btn waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[0].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToBack[0].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToBack[0].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`back back-1 bet-sec bl-btn waves-effect waves-light`}
                  onClick={() =>
                    handleEventPlaceBet(
                      `back`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <div
                className={`back back-1 bet-sec bl-btn waves-effect waves-light `}
                onClick={() =>
                  handleEventPlaceBet(
                    `back`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </div>
            )}

            {/* lay */}
            {mktBk && mktBk.runners && mktBk.runners.length > 0 ? (
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay &&
              mktBk.runners[ii] &&
              mktBk.runners[ii].ex.availableToLay.length > 0 ? (
                <button
                  className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[0].price,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  {mktBk.runners[ii] &&
                    mktBk.runners[ii].ex.availableToLay[0].price}

                  <span className={` size2`}>
                    {formatNumber(
                      mktBk.runners[ii] &&
                        mktBk.runners[ii].ex.availableToLay[0].size
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                  onClick={() =>
                    handleEventPlaceBet(
                      `lay`,
                      runner.runnerName,
                      1.0,
                      defaultStake,
                      runner.runnerName,
                      market.marketName,
                      runner.selectionId,
                      market.marketId
                    )
                  }
                >
                  0<span className="size2">0</span>
                </button>
              )
            ) : (
              <button
                className={`bet-sec bl-btn lay lay-1 waves-effect waves-light `}
                onClick={() =>
                  handleEventPlaceBet(
                    `lay`,
                    runner.runnerName,
                    1.0,
                    defaultStake,
                    runner.runnerName,
                    market.marketName,
                    runner.selectionId,
                    market.marketId
                  )
                }
              >
                0<span className="size2">0</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MarketOddsComponentTemp;
