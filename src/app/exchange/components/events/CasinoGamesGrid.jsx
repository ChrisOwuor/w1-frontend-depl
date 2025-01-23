import React from 'react'

export default function CasinoGamesGrid() {

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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 p-4">
          {imageUrls.map((url, index) => (
              <div
                  key={index}
                  className="overflow-hidden rounded-lg "
              >
                  <img
                      src={url}
                      alt={`Image ${index + 1}`}
                      className="w-full h-auto object-cover"
                  />
              </div>
          ))}
      </div>
  )
}
