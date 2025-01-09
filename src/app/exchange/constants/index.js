import React from "react";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import SportsRugbyIcon from "@mui/icons-material/SportsRugby";

const games = [
  {
    name: "Cricket",
    id: "cricket",
    icon: <SportsCricketIcon color="primary" fontSize="small" />,
  },
  {
    name: "Football",
    id: "football",
    icon: <SportsSoccerIcon color="secondary" fontSize="small" />,
  },
  {
    name: "Basketball",
    id: "basketball",
    icon: <SportsBasketballIcon color="primary" fontSize="small" />,
  },
  {
    name: "Baseball",
    id: "baseball",
    icon: <SportsBaseballIcon color="warning" fontSize="small" />,
  },
  {
    name: "American Football",
    id: "americanfootball",
    icon: <SportsFootballIcon color="primary" fontSize="small" />,
  },
  {
    name: "Tennis",
    id: "tennis",
    icon: <SportsTennisIcon color="secondary" fontSize="small" />,
  },
  {
    name: "Golf",
    id: "golf",
    icon: <SportsGolfIcon color="warning" fontSize="small" />,
  },
  {
    name: "Rugby",
    id: "rugby",
    icon: <SportsRugbyIcon color="success" fontSize="small" />,
  },
  {
    name: "Volleyball",
    id: "volleyball",
    icon: <SportsVolleyballIcon color="primary" fontSize="small" />,
  },
  {
    name: "Ice Hockey",
    id: "icehockey",
    icon: <SportsHockeyIcon color="success" fontSize="small" />,
  },
  {
    name: "Darts",
    id: "darts",
    icon: <SportsHockeyIcon color="success" fontSize="small" />,
  },
];

export default games;


export const cricket_events = [
  {
    event_id: 123,
    home_team: "India",
    away_team: "Sri Lanka",
    odds: {
      backing_odds: [
        {
          odds: 2.3,
          amount: 4,
        },
        {
          odds: 2.1,
          amount: 3,
        },
        {
          odds: 2.3,
          amount: 4,
        },
      ],
      laying_odds: [
        {
          odds: 5.1,
          amount: 8,
        },
        {
          odds: 4.5,
          amount: 6,
        },
        {
          odds: 2.3,
          amount: 4,
        },
      ],
    },
  },
  {
    event_id: 123,
    home_team: "South Africa",
    away_team: "Ethiopia",
    odds: {
      backing_odds: [
        {
          odds: 4.01,
          amount: 5,
        },
        {
          odds: 4.01,
          amount: 5,
        },
        {
          odds: 5.25,
          amount: 8,
        },
      ],
      laying_odds: [
        {
          odds: 2.35,
          amount: 4.2,
        },
        {
          odds: 2.32,
          amount: 4,
        },
        {
          odds: 2.3,
          amount: 4,
        },
      ],
    },
  },
  {
    event_id: 123,
    home_team: "Dubai",
    away_team: "Pakistan",
    odds: {
      backing_odds: [
        {
          odds: 2.3,
          amount: 4,
        },
        {
          odds: 1.3,
          amount: 2,
        },
        {
          odds: 2.1,
          amount: 3,
        },
      ],
      laying_odds: [
        {
          odds: 2.3,
          amount: 5,
        },
        {
          odds: 2.5,
          amount: 5.9,
        },
        {
          odds: 2.3,
          amount: 4,
        },
      ],
    },
  },
];


export const iconOBJS = [
  {
    id: 1,
    name: "Cricket",
    url: `https://img.icons8.com/plasticine/100/000000/cricket-ball--v1.png`
  },
  {
    id: 2,
    name: "Snooker",
    url: `https://img.icons8.com/emoji/48/pool-8-ball.png`
  },
  {
    id: 3,
    name: "Basketball",
    url: `https://img.icons8.com/3d-fluency/94/basketball.png`
  },
  {
    id: 4,
    name: "Tennis",
    url: `https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/external-Tennis-sports-smashingstocks-flat-smashing-stocks.png`

  },
  {
    id: 5,
    name: "Basketball",
    url: `https://img.icons8.com/3d-fluency/94/basketball.png`
  }
  ,
  {
    id: 6,
    name: "Football",
    url: `https://img.icons8.com/external-becris-lineal-color-becris/64/external-soccer-football-becris-lineal-color-becris.png`


  }
  , {
    id: 7,
    name: "Ice Hockey",
    url: `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-ice-hockey-hockey-flaticons-lineal-color-flat-icons-7.png`

  }
  , {
    id: 8,
    name: "Rugby Union",
    url: `https://img.icons8.com/officel/16/rugby.png`
  }
  , {
    id: 9,
    name: "Rugby League",
    url: `https://img.icons8.com/officel/16/rugby.png`
  }
  , {
    id: 10,
    name: "Boxing",
    url: `https://img.icons8.com/external-flaticons-flat-flat-icons/64/external-boxing-fitness-and-healthy-living-flaticons-flat-flat-icons.png`
  }
  , {
    id: 11,
    name: "Esports",
    url: `https://img.icons8.com/external-wanicon-flat-wanicon/64/external-esports-sport-wanicon-flat-wanicon.png`
  }
  , {
    id: 12,
    name: "Volleyball",
    url: `https://img.icons8.com/arcade/64/volleyball.png`
  }, {
    id: 13,
    name: "Australian Rules",
    url: `https://img.icons8.com/color-glass/48/rules-book.png`
  }
  ,
  {
    id: 14,
    name: "Handball",
    url: `https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-handball-summer-olympics-flaticons-lineal-color-flat-icons-2.png`

  }, {
    id: 15,
    name: "Darts",
    url: `https://img.icons8.com/papercut/60/goal.png`

  }
  , {
    id: 16,
    name: "Gaelic Games",
    url: `https://img.icons8.com/papercut/60/games-folder.png`

  }, {
    id: 17,
    name: "Mixed Martial Arts",
    url: `https://img.icons8.com/office/16/mma-fighter-glove.png`

  }, {
    id: 16,
    name: "Basketball",
    url: `https://img.icons8.com/3d-fluency/94/basketball.png`
  }, {
    id: 16,
    name: "Basketball",
    url: `https://img.icons8.com/3d-fluency/94/basketball.png`
  }
  , {
    id: 17,
    name: "Horse Racing",
    url: `https://img.icons8.com/emoji/48/horse-racing.png`
  }, {
    id: 18,
    name: "Greyhound Racing",
    url: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-race-snowboarding-vitaliy-gorbachev-blue-vitaly-gorbachev.png"
  },
  {
    id: 19,
    name: "Politics",
    url: "https://img.icons8.com/external-justicon-flat-justicon/64/external-politics-woman-day-justicon-flat-justicon.png"
  },
  {
    id: 20,
    name: "Virtual Sports",
    url: "https://img.icons8.com/arcade/64/virtual-reality.png"
  },
  {
    id: 21,
    name: "All Casinos",
    url: "https://img.icons8.com/papercut/60/slot-machine.png"
  },
  {
    id: 22,
    name: "Baseball",
    url: "https://img.icons8.com/external-goofy-color-kerismaker/96/external-Baseball-sport-goofy-color-kerismaker.png"
  },
  {
    id: 23,
    name: "Cycling",
    url: "https://img.icons8.com/external-kosonicon-lineal-color-kosonicon/64/external-cycling-hobbies-kosonicon-lineal-color-kosonicon.png"
  },
  {
    id: 24,
    name: "Golf",
    url: "https://img.icons8.com/emoji/48/person-golfing.png"
  },
  {
    id: 25,
    name: "Winter Sports",
    url: "https://img.icons8.com/arcade/64/winter.png"
  },
  {
    id: 26,
    name: "American Football",
    url: "https://img.icons8.com/emoji/48/american-football-emoji.png"
  },
  {
    id: 27,
    name: "Motor Sport",
    url: "https://img.icons8.com/emoji/48/chequered-flag.png"
  },
  {
    id: 28,
    name: "Greyhounds - Today's Card",
    url: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/60/external-race-snowboarding-vitaliy-gorbachev-blue-vitaly-gorbachev.png"
  },
  {
    id: 29,
    name: "Horse Racing - Today's Card",
    url: `https://img.icons8.com/emoji/48/horse-racing.png`
  },
  {
    id: 30,
    name: "In-Play",
    url: `https://img.icons8.com/3d-fluency/94/time.png`
  }


]

export  const casinoGames = [
  {
    name: "20-20 Teenpatti",
    image: "/casino/teen20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen20",
    videoUrl: "https://winx777.com/casino/?id=3030",
  },
  {
    name: "20-20 Dragon Tiger",
    image: "/casino/dt20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt20",
    videoUrl: "https://winx777.com/casino/?id=3035",
  },
  {
    name: "20-20 Dragon Tiger 2",
    image: "/casino/dt202.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt202",
    videoUrl: "https://winx777.com/casino/?id=3059",
  },
  {
    name: "Lucky7 B",
    image: "/casino/lucky7B.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=lucky7eu",
    videoUrl: "https://winx777.com/casino/?id=3032",
  },
  {
    name: "Teenpatti Test",
    image: "/casino_assets/teentest.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=teen9",
    videoUrl: "https://winx777.com/casino/?id=3048",
  },
  {
    name: "Teenpatti open",
    image: "/casino_assets/teenpattiopen.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v2/api/casinoData?casinoType=teen8",
    videoUrl: "https://winx777.com/casino/?id=3049",
  },
  {
    name: "Baccarat",
    image: "/casino_assets/baccarat.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat",
    videoUrl: "https://winx777.com/casino/?id=3044",
  },
  {
    name: "Baccarat 2",
    image: "/casino_assets/b11.png",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=baccarat2",
    videoUrl: "https://winx777.com/casino/?id=3033",
  },
  {
    name: "1 Day Dragon Tiger",
    image: "/casino_assets/1DAYDRAGONTIGER.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=dt6",
    videoUrl: "https://winx777.com/casino/?id=3057",
  },
  {
    name: "Race 20",
    image: "/casino_assets/race20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=race20",
    videoUrl: "https://winx777.com/casino/?id=3036",
  },
  {
    name: "3 Card",
    image: "/casino_assets/3card.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=3cardj",
    videoUrl: "https://winx777.com/casino/?id=3039",
  },
  {
    name: "32 Card A",
    image: "/casino_assets/card32.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32",
    videoUrl: "https://winx777.com/casino/?id=3055",
  },

  {
    name: "32 Cards b",
    image: "/casino_assets/32CARDB.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=card32eu",
    videoUrl: "https://winx777.com/casino/?id=3034",
  },
  {
    name: "Casino Meter",
    image: "/casino_assets/cmeter.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmeter",
    videoUrl: "https://winx777.com/casino/?id=3046",
  },

  {
    name: "Teenpatti onday",
    image: "/casino_assets/1teenpatti.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=Teen",
    videoUrl: "https://winx777.com/casino/?id=3031",
  },
  {
    name: "Andar Bahar",
    image: "/casino_assets/andarbahar20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=ab20",
    videoUrl: "https://winx777.com/casino/?id=3053",
  },
  {
    name: "Bollywood Casino",
    image: "/casino_assets/bollywoodcasino.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=btable",
    videoUrl: "https://winx777.com/casino/?id=3041",
  },
  {
    name: "Andar Bahar 2",
    image: "/casino_assets/andarbahar2.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=abj",
    videoUrl: "https://winx777.com/casino/?id=3043",
  },
  {
    name: "20-20 Poker",
    image: "/casino_assets/poker20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker20",
    videoUrl: "https://winx777.com/casino/?id=3052",
  },
  {
    name: "Worli Matka",
    image: "/casino_assets/worlimatka.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli",
    videoUrl: "https://winx777.com/casino/?id=3054",
  },

  {
    name: "One Day Poker",
    image: "/casino_assets/poker1day.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=poker",
    videoUrl: "https://winx777.com/casino/?id=3051",
  },

  {
    name: "Super Over",
    image: "/casino_assets/superover.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=superover",
    videoUrl: "https://winx777.com/casino/?id=3060",
  },
  {
    name: "Casino war",
    image: "/casino_assets/casinowar.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=war",
    videoUrl: "https://winx777.com/casino/?id=3038",
  },

  {
    name: "Cricket Match 20-20",
    image: "/casino_assets/cmatch20.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=cmatch20",
    videoUrl: "https://winx777.com/casino/?id=3045",
  },

  {
    name: "Queen",
    image: "/casino_assets/queen.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=queen",
    videoUrl: "https://winx777.com/casino/?id=3037",
  },
  {
    name: "instant Worli",
    image: "/casino_assets/worli2.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=worli2",
    videoUrl: "https://winx777.com/casino/?id=3040",
  },
  {
    name: "Amar Akbar Anthony",
    image: "/casino_assets/amarakbaranthony.jpg",
    dataURL:
      "https://diamondsocket.winx777.com/v1/api/casinoData?casinoType=aaa",
    videoUrl: "https://winx777.com/casino/?id=3056",
  },
];