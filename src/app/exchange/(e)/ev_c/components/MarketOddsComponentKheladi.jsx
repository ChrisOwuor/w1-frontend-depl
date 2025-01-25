import React from "react";

const MarketOddsComponentKheladi = ({
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
      {
        <>
          <div
            _ngcontent-xck-c85=""
            class="bl-buttons desktop-hide  flex kh:hidden"
            bis_skin_checked="1"
          >
            <button
              _ngcontent-xck-c85=""
              type="button"
              class="back back-1 bet-sec bl-btn waves-effect waves-light"
            >
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <button
              _ngcontent-xck-c85=""
              type="button"
              class="bet-sec bl-btn lay lay-1 waves-effect waves-light"
            >
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <div
              _ngcontent-xck-c85=""
              class="suspend-market"
              bis_skin_checked="1"
            >
              <span _ngcontent-xck-c85="" class="stats-text">
                CLOSED
              </span>
            </div>
          </div>
          <div
            _ngcontent-xck-c85=""
            class="bl-buttons mobile-hide hidden kh:flex"
            bis_skin_checked="1"
          >
            
              <button
                _ngcontent-xck-c85=""
                class="back-3 bet-sec bl-btn eon1 spark"
              >
                {" "}
                0{" "}
                <span _ngcontent-xck-c85="" class="size2">
                  0
                </span>
              </button>
            
            <button _ngcontent-xck-c85="" class="back-2 bet-sec bl-btn eon2">
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <button
              _ngcontent-xck-c85=""
              class="back back-1 bet-sec bl-btn waves-effect waves-light"
            >
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <button
              _ngcontent-xck-c85=""
              type="button"
              class="bet-sec bl-btn lay lay-1 waves-effect waves-light"
            >
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <button _ngcontent-xck-c85="" class="bet-sec bl-btn eon3 lay-2">
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <button _ngcontent-xck-c85="" class="bet-sec bl-btn eon4 lay-3">
              {" "}
              0{" "}
              <span _ngcontent-xck-c85="" class="size2">
                0
              </span>
            </button>
            <div
              _ngcontent-xck-c85=""
              class="suspend-market"
              bis_skin_checked="1"
            >
              <span _ngcontent-xck-c85="" class="stats-text">
                CLOSED
              </span>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default MarketOddsComponentKheladi;
