import React from 'react';

const MarketOddsComponent = ({ mktBk, styling2, ii, handleEventPlaceBet, showLastTradedPrice, formatNumber, runner, market, eventData, otherMarkets }) => {
    const defaultStake = 50
    return (

        <div className='w-full'>
            {
                eventData && (
                    <>
                        <div className={`max-sm:hidden relative grid max-mk:grid-cols-4 ${otherMarkets === true ? "mk:grid-cols-5" : "mk:grid-cols-6"} gap-x-1`}>
                            {
                                mktBk && mktBk.status === "CLOSED" ?
                                    mktBk.inplay === true ?
                                        <div className={`bg-[#F5ACD4]/[0.9] flex justify-center
                     col-span-7 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}>
                                            <p className='font-medium text-black uppercase'>Betting  Paused</p>
                                        </div> : <div className={`
                     ${mktBk.status === "CLOSED" ? "bg-[#F5ACD4]/[0.9]" : "bg-[#F5ACD4]"} flex justify-center
                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}>
                                            <p className='font-medium text-black uppercase'>{mktBk.status}</p>
                                        </div> : ""
                            }
                            {/* 4 */}
                            {/* {
                            mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                <div
                                    className={`${styling2.lastTradedPriceC} ${styling2.lastTradedPrice} max-mk:hidden`}

                                >
                                    <p className={` ${styling2.oddsT11}`}>
                                        {mktBk.runners[ii] && mktBk.runners[ii].lastPriceTraded}
                                    </p>
                                    <p className={` ${styling2.oddsP}`}>
                                        {mktBk.runners[ii] && mktBk.runners[ii].totalMatched}
                                    </p>
                                </div>
                                : <span className='text-transparent'>0</span>

                        } */}



                            {/* 3 */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack.length > 2 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} bg-back/[0.2]`}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[2].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[2].price}
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[2].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} `}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>
                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} `}
                                        onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }
                            {/* 2 */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack.length > 1 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside2} bg-back/[0.5]`}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[1].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[1].price}
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[1].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside2}`}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.sidebyside2} ${otherMarkets === true && "hidden"}`}
                                        onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }

                            {/* 1 */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack.length > 0 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT2}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].price}
                                            </p>
                                            <p className={` ${styling2.oddsP2}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                        onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }

                            {/* lay */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay.length > 0 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT2}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].price}
                                            </p>
                                            <p className={` ${styling2.oddsP2}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                        onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsT1}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }
                            {/* 2 */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay.length > 1 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside2} bg-lay/[0.5]`}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[1].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[1].price}
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[1].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside2} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.sidebyside2} ${otherMarkets === true && "hidden"}`}
                                        onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }
                            {/* 3 */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay.length > 2 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} bg-lay/[0.2]`}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[2].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[2].price}
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[2].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.sidebyside}  ${otherMarkets === true && "hidden"} `}
                                        onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }

                        </div>
                        {/* mobile view */}
                        <div className={`sm:hidden relative grid max-mk:grid-cols-2 ${otherMarkets === true ? "mk:grid-cols-2" : "mk:grid-cols-2"}`}>
                            {
                                mktBk && mktBk.status === "CLOSED" ?
                                    mktBk.inplay === true ?
                                        <div className={`bg-[#F5ACD4]/[0.9] flex justify-center
                     col-span-7 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}>
                                            <p className='font-medium text-black uppercase'>Betting  Paused</p>
                                        </div> : <div className={`
                     ${mktBk.status === "CLOSED" ? "bg-[#F5ACD4]/[0.9]" : "bg-[#F5ACD4]"} flex justify-center
                     col-span-5 absolute top-0 bottom-0 right-0 left-0 md:col-span-3 items-center`}>
                                            <p className='font-medium text-black uppercase'>{mktBk.status}</p>
                                        </div> : ""
                            }


                            {/* back */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack.length > 0 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT2}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].price}
                                            </p>
                                            <p className={` ${styling2.oddsP2}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToBack[0].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                            onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.backOdd} `}
                                        onClick={() => handleEventPlaceBet(`back`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }

                            {/* lay */}
                            {
                                mktBk && mktBk.runners && mktBk.runners.length > 0 ?
                                    mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay && mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay.length > 0 ?
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].price, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT2}`}>
                                                {mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].price}
                                            </p>
                                            <p className={` ${styling2.oddsP2}`}>
                                                {formatNumber(mktBk.runners[ii] && mktBk.runners[ii].ex.availableToLay[0].size)}
                                            </p>
                                        </div> :
                                        <div
                                            className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                            onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                        >
                                            <p className={` ${styling2.oddsT1}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                            <p className={` ${styling2.oddsP}`}>
                                                <span className='text-transparent'>0</span>
                                            </p>
                                        </div>

                                    :
                                    <div
                                        className={`${styling2.oddsStyle} ${styling2.layOdd} `}
                                        onClick={() => handleEventPlaceBet(`lay`, runner.runnerName, 1.0, defaultStake, runner.runnerName, market.marketName, runner.selectionId, market.marketId)}
                                    >
                                        <p className={` ${styling2.oddsT1}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                        <p className={` ${styling2.oddsP}`}>
                                            <span className='text-transparent'>0</span>
                                        </p>
                                    </div>
                            }

                        </div>
                    </>
                )
            }
        </div>
    );
};

export default MarketOddsComponent;
