/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./node_modules/flowbite-react/**/*.js",
  "./node_modules/flowbite/**/*.js",
];
export const theme = {
  extend: {
    backgroundImage: {
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }
      mk: "768px",
      mm: "870px",
      md: "1300px",
      
      // => @media (min-width: 960px) { ... }
      md1: "1000px",
      // => @media (min-width: 1000px) { ... }
      md2: "1300px",
      // => @media (min-width: 1300px) { ... }
      lg0: "1360px",
      // => @media (min-width: 1360px) { ... }
      lg1: "1400px",
      // => @media (min-width: 1400px) { ... }
      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
      kh: '768px',
      // => @media (min-width: 768px) { ... }

    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#1C2434',
      'black-2': '#010101',
      body: '#64748B',
      bodydark: '#AEB7C0',
      bodydark1: '#DEE4EE',
      bodydark2: '#8A99AF',
      primary1: '#FFD700',
      primary: '#002C5C',
      primary2: "#42C8B7",
      primary3: "#0A5BAB",
      accent: "#FEFF01",
      accent1: '#DAA520',
      secondary: '#1A73E8',
      'secondary-dark': '#0D4F8C',
      stroke: '#E2E8F0',
      gray: '#EDEDED',
      graydark: '#333A48',
      'gray-2': '#F7F9FC',
      'gray-3': '#FAFAFA',
      whiten: '#F1F5F9',
      whiter: '#F5F7FD',
      back: "#78B5EA",
      lay: "#F5ACD4",
      boxdark: '#24303F',
      'boxdark-2': '#1A222C',
      strokedark: '#2E3A47',
      'form-strokedark': '#3d4d60',
      'form-input': '#1d2a39',
      'meta-1': '#DC3545',
      'meta-2': '#EFF2F7',
      'meta-3': '#10B981',
      'meta-4': '#313D4A',
      'meta-5': '#259AE6',
      'meta-6': '#FFBA00',
      'meta-7': '#FF6766',
      'meta-8': '#F0950C',
      'meta-9': '#E5E7EB',
      success: '#219653',
      danger: '#D34053',
      warning: '#FFA70B',
    }
    ,
    fontSize: {
      'title-xxl': ['44px', '55px'],
      'title-xl': ['36px', '45px'],
      'title-xl2': ['33px', '45px'],
      'title-lg': ['28px', '35px'],
      'title-md': ['24px', '30px'],
      'title-md2': ['26px', '30px'],
      'title-sm': ['20px', '26px'],
      'title-xsm': ['18px', '24px'],
    },
    spacing: {
      4.5: '1.125rem',
      5.5: '1.375rem',
      6.5: '1.625rem',
      7.5: '1.875rem',
      8.5: '2.125rem',
      9.5: '2.375rem',
      10.5: '2.625rem',
      11: '2.75rem',
      11.5: '2.875rem',
      12.5: '3.125rem',
      13: '3.25rem',
      13.5: '3.375rem',
      14: '3.5rem',
      14.5: '3.625rem',
      15: '3.75rem',
      15.5: '3.875rem',
      16: '4rem',
      16.5: '4.125rem',
      17: '4.25rem',
      17.5: '4.375rem',
      18: '4.5rem',
      18.5: '4.625rem',
      19: '4.75rem',
      19.5: '4.875rem',
      21: '5.25rem',
      21.5: '5.375rem',
      22: '5.5rem',
      22.5: '5.625rem',
      24.5: '6.125rem',
      25: '6.25rem',
      25.5: '6.375rem',
      26: '6.5rem',
      27: '6.75rem',
      27.5: '6.875rem',
      29: '7.25rem',
      29.5: '7.375rem',
      30: '7.5rem',
      31: '7.75rem',
      32.5: '8.125rem',
      34: '8.5rem',
      34.5: '8.625rem',
      35: '8.75rem',
      36.5: '9.125rem',
      37.5: '9.375rem',
      39: '9.75rem',
      39.5: '9.875rem',
      40: '10rem',
      42.5: '10.625rem',
      44: '11rem',
      45: '11.25rem',
      46: '11.5rem',
      47.5: '11.875rem',
      49: '12.25rem',
      50: '12.5rem',
      52: '13rem',
      52.5: '13.125rem',
      54: '13.5rem',
      54.5: '13.625rem',
      55: '13.75rem',
      55.5: '13.875rem',
      59: '14.75rem',
      60: '15rem',
      62.5: '15.625rem',
      65: '16.25rem',
      67: '16.75rem',
      67.5: '16.875rem',
      70: '17.5rem',
      72.5: '18.125rem',
      73: '18.25rem',
      75: '18.75rem',
      90: '22.5rem',
      94: '23.5rem',
      95: '23.75rem',
      100: '25rem',
      115: '28.75rem',
      125: '31.25rem',
      132.5: '33.125rem',
      150: '37.5rem',
      171.5: '42.875rem',
      180: '45rem',
      187.5: '46.875rem',
      203: '50.75rem',
      230: '57.5rem',
      242.5: '60.625rem',
    },
    maxWidth: {
      2.5: '0.625rem',
      3: '0.75rem',
      4: '1rem',
      11: '2.75rem',
      13: '3.25rem',
      14: '3.5rem',
      15: '3.75rem',
      22.5: '5.625rem',
      25: '6.25rem',
      30: '7.5rem',
      34: '8.5rem',
      35: '8.75rem',
      40: '10rem',
      42.5: '10.625rem',
      44: '11rem',
      45: '11.25rem',
      70: '17.5rem',
      90: '22.5rem',
      94: '23.5rem',
      125: '31.25rem',
      132.5: '33.125rem',
      142.5: '35.625rem',
      150: '37.5rem',
      180: '45rem',
      203: '50.75rem',
      230: '57.5rem',
      242.5: '60.625rem',
      270: '67.5rem',
      280: '70rem',
      292.5: '73.125rem',
    },
    maxHeight: {
      35: '8.75rem',
      70: '17.5rem',
      90: '22.5rem',
      550: '34.375rem',
      300: '18.75rem',
    },
    minWidth: {
      22.5: '5.625rem',
      42.5: '10.625rem',
      47.5: '11.875rem',
      75: '18.75rem',
    },
    zIndex: {
      999999: '999999',
      99999: '99999',
      9999: '9999',
      999: '999',
      99: '99',
      9: '9',
      1: '1',
      0: '0',
    },
    opacity: {
      65: '.65',
    },
    backgroundImage: {
      video: "url('../images/video/video.png')",
    },
    content: {
      'icon-copy': 'url("../images/icon/icon-copy-alt.svg")',
    },
    transitionProperty: { width: 'width', stroke: 'stroke' },
    borderWidth: {
      6: '6px',
    },
    boxShadow: {
      default: '0px 8px 13px -3px rgba(0, 0, 0, 0.07)',
      card: '0px 1px 3px rgba(0, 0, 0, 0.12)',
      'card-2': '0px 1px 2px rgba(0, 0, 0, 0.05)',
      switcher:
        '0px 2px 4px rgba(0, 0, 0, 0.2), inset 0px 2px 2px #FFFFFF, inset 0px -1px 1px rgba(0, 0, 0, 0.1)',
      'switch-1': '0px 0px 5px rgba(0, 0, 0, 0.15)',
      1: '0px 1px 3px rgba(0, 0, 0, 0.08)',
      2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      3: '0px 1px 5px rgba(0, 0, 0, 0.14)',
      4: '0px 4px 10px rgba(0, 0, 0, 0.12)',
      5: '0px 1px 1px rgba(0, 0, 0, 0.15)',
      6: '0px 3px 15px rgba(0, 0, 0, 0.1)',
      7: '-5px 0 0 #313D4A, 5px 0 0 #313D4A',
      8: '1px 0 0 #313D4A, -1px 0 0 #313D4A, 0 1px 0 #313D4A, 0 -1px 0 #313D4A, 0 3px 13px rgb(0 0 0 / 8%)',
    },
    dropShadow: {
      1: '0px 1px 0px #E2E8F0',
      2: '0px 1px 4px rgba(0, 0, 0, 0.12)',
    },
    keyframes: {
      rotating: {
        '0%, 100%': { transform: 'rotate(360deg)' },
        '50%': { transform: 'rotate(0deg)' },
      },
      colorChange: {
        '0%': { color: 'red' },
        '33%': { color: 'white' },
        '66%': { color: 'yellow' },
        '100%': { color: 'red' },
      },
    },
    animation: {
      'ping-once': 'ping 5s cubic-bezier(0, 0, 0.2, 1)',
      rotating: 'rotating 30s linear infinite',
      
      'spin-1.5': 'spin 1.5s linear infinite',
      'spin-2': 'spin 2s linear infinite',
      'spin-3': 'spin 3s linear infinite',
      
      'color-change': 'colorChange 3s infinite',
    },
    darkMode: "class",
    keyframes: {
      slidein: {
        from: {
          opacity: "0",
          transform: "translateX(-10px)",
        },
        to: {
          opacity: "1",
          transform: "translateX(0)",
        },
      },
      spin: {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
    },
    animation: {
      slidein: "slidein 1s ease 200ms",
    },
    clipPath: {
      'custom-shape': 'polygon(84.055% 72.197%, 86.147% 69.885%, 88.005% 67.632%, 89.628% 65.439%, 91.016% 63.306%, 92.169% 61.232%, 93.086% 59.218%, 93.767% 57.264%, 94.211% 55.369%, 94.418% 53.534%, 94.388% 51.759%, 94.171% 49.997%, 93.807% 48.215%, 93.298% 46.411%, 92.642% 44.586%, 91.841% 42.741%, 90.894% 40.874%, 89.802% 38.987%, 88.563% 37.078%, 87.18% 35.149%, 85.651% 33.198%, 84.007% 31.24%, 82.279% 29.296%, 80.466% 27.368%, 78.569% 25.454%, 76.586% 23.555%, 74.519% 21.67%, 72.366% 19.799%, 70.128% 17.943%, 67.805% 16.1%, 65.397% 14.27%, 62.976% 12.517%, 60.604% 10.892%, 58.282% 9.395%, 56.011% 8.027%, 53.789% 6.787%, 51.618% 5.677%, 49.498% 4.695%, 47.429% 3.842%, 45.411% 3.117%, 43.443% 2.523%, 41.562% 2.05%, 39.812% 1.694%, 38.192% 1.453%, 36.703% 1.327%, 35.344% 1.317%, 34.115% 1.421%, 33.017% 1.64%, 32.048% 1.973%, 31.21% 2.421%, 30.501% 2.983%, 29.838% 3.683%, 29.126% 4.536%, 28.363% 5.542%, 27.552% 6.701%, 26.691% 8.012%, 25.78% 9.476%, 24.821% 11.094%, 23.811% 12.865%, 22.753% 14.789%, 21.645% 16.866%, 20.561% 19.054%, 19.565% 21.321%, 18.657% 23.666%, 17.837% 26.09%, 17.107% 28.593%, 16.465% 31.175%, 15.913% 33.836%, 15.45% 36.576%, 15.078% 39.395%, 14.796% 42.294%, 14.587% 45.219%, 14.444% 48.136%, 14.367% 51.047%, 14.356% 53.95%, 14.412% 56.845%, 14.534% 59.733%, 14.722% 62.613%, 14.978% 65.485%, 15.3% 68.348%, 15.688% 71.203%, 16.163% 73.998%, 16.751% 76.672%, 17.455% 79.224%, 18.272% 81.656%, 19.205% 83.967%, 20.252% 86.158%, 21.415% 88.229%, 22.692% 90.179%, 24.085% 92.01%, 25.592% 93.722%, 27.198% 95.236%, 28.894% 96.499%, 30.68% 97.509%, 32.556% 98.266%, 34.522% 98.771%, 36.578% 99.023%, 38.723% 99.022%, 40.957% 98.767%, 43.28% 98.259%, 45.692% 97.496%, 48.051% 96.635%, 50.205% 95.841%, 52.154% 95.113%, 53.898% 94.452%, 55.437% 93.857%, 56.771% 93.328%, 57.901% 92.864%, 58.825% 92.466%, 59.544% 92.131%, 60.059% 91.862%, 60.5% 91.607%, 61.01% 91.307%, 61.589% 90.963%, 62.237% 90.573%, 62.953% 90.138%, 63.738% 89.659%, 64.591% 89.134%, 65.512% 88.566%, 66.502% 87.953%, 67.56% 87.295%, 68.703% 86.533%, 69.959% 85.603%, 71.328% 84.507%, 72.81% 83.246%, 74.404% 81.818%, 76.111% 80.224%, 77.929% 78.465%, 79.859% 76.541%, 81.901% 74.451%, 84.055% 72.197%)',
    },
  },
};
import flowbitePlugin from "flowbite/plugin";
export const plugins = [flowbitePlugin,
function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hidden': {
      /* Hide scrollbar for Chrome, Safari, and Opera */
      '-webkit-overflow-scrolling': 'touch',
      '-ms-overflow-style': 'none', /* IE and Edge */
      'scrollbar-width': 'none', /* Firefox */
    },
    '.scrollbar-hidden::-webkit-scrollbar': {
      'display': 'none', /* Chrome, Safari and Opera */
    },
  });
},
];