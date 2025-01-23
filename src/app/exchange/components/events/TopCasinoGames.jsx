import React from "react";

export default function TopCasinoGames () {
    const imageUrls = [
        "https://tezcdn.io/casino/casino-highlight/aviator-730-280.gif",
        "https://tezcdn.io/casino/casino-highlight/fungames-500_299.gif",
        "https://tezcdn.io/casino/casino-highlight/wingogames-500-299.gif",
        "https://tezcdn.io/casino/casino-highlight/evoplay-730-280.gif",
        "https://cdn.dreamdelhi.com/mac88/bbb.webp",
        "https://cdn.dreamdelhi.com/mac88/ak47tp.webp",
        "https://cdn.dreamdelhi.com/mac88/lucky15.webp",
        "https://cdn.dreamdelhi.com/mac88/lucky5.webp",
        "https://cdn.dreamdelhi.com/mac88/lankesh.jpeg",
        "https://speedcdn.io/assets/thumbs/pushpa.webp",
        "https://tezcdn.io/casino/od-baccarat.webp",
        "https://cdn.dreamdelhi.com/mac88/sbc.webp",
        "https://cdn.dreamdelhi.com/mac88/mtp.webp",
        "https://cdn.dreamdelhi.com/mac88/iw.webp",
        "https://cdn.dreamdelhi.com/mac88/so.webp",
        "https://cdn.dreamdelhi.com/mac88/cc.webp",
        "https://cdn.dreamdelhi.com/mac88/2020tp2.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/andarbahar.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/dragontiger.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/dragontigerlion.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/dragontigeroneday.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/dt2.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/baccarat.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/29baccarat.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/sicbo.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/roulette.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/20-20poker.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/poker.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/lucky7.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/onedayteenpatti.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/teenpattitest.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/2cardsteenpatti.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/muflisteenpattioneday.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/2020teenpatti.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/2cardonedayteenpatti.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/openteenpatti.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/32cards.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/amarakbaranthony.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/3cardjudgement.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/queenrace.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/race20.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/casinowar.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/worlimatka.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/trio.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/bollywoodcasino.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/10kadum.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/1-card-20-20.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/one-card-one-day.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/race17.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/note-umber.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/raceto2nd.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/centercardoneday.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/lottery.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/superoveroneday.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/fivecricket.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/cricket2020.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/high_low.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/6pp.webp",
        "https://tezcdn.io/casino/mac88-500*299/blue/10-10-cricket.webp",
        "https://cdn.dreamdelhi.com/macexcite/dt2.webp"
    ];


    return (
        <div className="mb-4 mx-[1%]">
            <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-[7px_0_5px_0] relative">
                Top Casino Games</h5>
            <div className="imagesec grid grid-rows-2 grid-flow-col gap-x-1 gap-y-1 overflow-x-scroll mb-1 justify-between">
                {imageUrls.map((url, index) => (
                    <a href="" className="w-[170px] relative mb-0">
                        <img
                            key={index}
                            src={url}
                            alt={`Casino Game ${index + 1}`}
                            className="w-full h-full max-w-full rounded-[5px] align-middle "
                        />
                    </a>
                ))}
            </div>
        </div>

    );
}
