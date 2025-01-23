
import React from "react";

export default function CasinoProvider () {
    const imageUrls = [
        "https://www.reddybook.club/assets/images/mac88_cp580-299.webp",
        "https://tezcdn.io/casino/casino-highlight/mac88-500*299.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/mac88virtualgame.webp",
        "https://tezcdn.io/casino/casino-highlight/fungames_500-299.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/evolution.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/ezugi.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/vivogaming.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/turbogames.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/spribe.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/gamzix.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/jili.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/aesexy.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/evoplay.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/bombaylive.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/kingmaker.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/smartsoft.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/playtech.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/betgames.webp",
        "https://tezcdn.io/casino/casino-provider-500*299/vsport.webp"
    ];


    return (
        <div className="mb-4 mt-4 mx-[1%]">
            <h5 className="text-[#4f0a9b] text-[13px] font-bold leading-normal mb-2 py-[7px_0_5px_0] relative">
               Casino Provider</h5>
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
