import React, { useContext, useEffect, useState, useRef } from "react";
import AlarmOnRoundedIcon from "@mui/icons-material/AlarmOnRounded";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useSearchParams } from "next/navigation";
import { NAVContext } from "@/app/context/NavContext";
import { isAuthenticated } from "../funcStore/authenticate";
import { AuthContext } from "@/app/context/AuthContext";
import PushPinIcon from "@mui/icons-material/PushPin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HouseIcon from "@mui/icons-material/House";

export default function MobileBottomNavKhiladi({
  toggleSideBar,
  setHideSideBar,
  globalSettings,
}) {
  const { setView, setCurrentCenter, setAccountViewOpen } =
    useContext(NAVContext);

  const searchParams = useSearchParams();
  const [toggle, setToggle] = useState(false);

  return (
    <div className="grid grid-cols-5">
      {/* <div className="col-span-5 grid grid-cols-5">
                <div className=""></div>
                <div className=""></div>
                <div className="text-transparent rounded-t-full pt-4 -mb-5 bg-white drop-shadow-[0_0_25px_rgba(0,0,0,0.7)" >o</div>
                <div className=""></div>
                <div className=""></div>
            </div> */}

      <div className=" bottom-tabs ">
        <ul>
          <li
            onClick={() => {
              setView((prev) => ({
                ...prev,
                currentView: "",
              }));
              setCurrentCenter("in-play");
            }}
            // className="basis-1/5 text-center flex flex-col justify-center h-[50px]"
          >
            <a>
              {/* <a className="flex flex-col items-center tracking-wide basis-1/5 text-center justify-center h-[50px] " onClick={() => setHideSideBar && setHideSideBar(false)}> */}
              <svg
                // className="inline-block m-0 mx-auto h-[20px] w-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                class="bottomIcon"
              >
                <path
                  _ngcontent-aru-c55=""
                  d="M8 14.5V5.5L14 10M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                  fill="#4F0A9B"
                ></path>
              </svg>
              {/* <span className="text-sm font-medium text-gray-300">In-play</span> */}
              In-play
            </a>
          </li>
          <li
            onClick={() => {
              setCurrentCenter("profile");
            }}
            // className="basis-1/5 text-center flex flex-col justify-center h-[50px]"
          >
            <a>
              {/* <a className="flex flex-col items-center tracking-wide basis-1/5 text-center justify-center h-[50px] " onClick={() => setHideSideBar && setHideSideBar(false)}> */}
              <svg
                // className="inline-block m-0 mx-auto h-[20px] w-[20px]"
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="20"
                viewBox="0 0 25 20"
                fill="none"
                class="bottomIcon"
              >
                <g _ngcontent-aru-c55="" clip-path="url(#clip0_1291_32)">
                  <path
                    _ngcontent-aru-c55=""
                    d="M0 16.8938C0 12.2987 0 7.70303 0 3.10793C0.0124875 3.07955 0.0333 3.05235 0.0368678 3.02278C0.206341 1.52794 1.5318 0.00294445 3.57618 0.00294445C9.29663 0.00176182 15.0177 -0.00474263 20.7381 0.00649233C22.798 0.0106315 24.3036 1.54391 24.3084 3.59222C24.3108 4.48155 24.3084 5.3703 24.3084 6.25963C24.3084 6.33591 24.3084 6.41219 24.3084 6.51094H24.0295C22.7082 6.51094 21.3869 6.51094 20.0656 6.51094C19.3062 6.51094 18.5463 6.50207 17.7869 6.51272C15.2674 6.5482 13.5989 8.98382 14.5099 11.2893C15.0415 12.634 16.3324 13.4861 17.8577 13.489C19.9068 13.4926 21.9566 13.4902 24.0057 13.4902H24.2965C24.3018 13.5488 24.3078 13.586 24.3078 13.6239C24.3078 14.6232 24.3244 15.6225 24.3012 16.6212C24.2602 18.3845 22.8622 19.8338 21.0931 19.9763C20.9201 19.9905 20.7459 19.9982 20.5716 19.9982C14.938 19.9994 9.30437 20.0012 3.67073 19.9982C2.12525 19.997 0.982943 19.3212 0.313376 17.9245C0.160553 17.604 0.102278 17.2386 0 16.8938Z"
                    fill="#5700A3"
                  ></path>
                  <path
                    _ngcontent-aru-c55=""
                    d="M24.2952 12.0888H24.0484C22.0005 12.0888 19.9531 12.0865 17.9052 12.09C17.0049 12.0912 16.3205 11.7329 15.8917 10.9298C15.224 9.6804 16.1076 8.0602 17.5282 7.93011C17.615 7.92243 17.7018 7.91415 17.7886 7.91415C19.9151 7.91297 22.0421 7.91297 24.1686 7.91415C24.2066 7.91415 24.2447 7.92065 24.2952 7.92538V12.0894V12.0888ZM18.2263 10.7004C18.3845 10.7004 18.5432 10.7087 18.7002 10.6986C19.1052 10.6738 19.3954 10.3817 19.3989 10.0056C19.4025 9.63191 19.1135 9.32502 18.7109 9.30433C18.3958 9.28836 18.0782 9.28895 17.7625 9.30314C17.3575 9.32148 17.0673 9.61891 17.0638 9.99498C17.0602 10.3782 17.3593 10.6774 17.7756 10.6992C17.9254 10.7075 18.0759 10.7004 18.2263 10.6998V10.7004Z"
                    fill="#5700A3"
                  ></path>
                </g>
                <defs _ngcontent-aru-c55="">
                  <clipPath _ngcontent-aru-c55="" id="clip0_1291_32">
                    <rect
                      _ngcontent-aru-c55=""
                      width="24.3137"
                      height="20"
                      fill="white"
                    ></rect>
                  </clipPath>
                </defs>
              </svg>
              {/* <span className="text-sm font-medium text-gray-300">Wallet</span> */}
              Wallet
            </a>
          </li>
          <li className="truncate">
            <a href="#"></a>
          </li>
          <li
            onClick={() => {
              // setView(prev => ({
              //     ...prev,
              //     currentView: ""
              // }))
              setCurrentCenter("home");
              toggleSideBar();
            }}
            className="big"
          >
            <a
              _ngcontent-aru-c55=""
              routerlinkactive="f-active"
              class="footermenu active-menu"
            >
              <svg
                _ngcontent-aru-c55=""
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  _ngcontent-aru-c55=""
                  d="M0.000146866 11.7188C0.000146866 11.9062 0.000146866 12.0938 0.000146866 12.2813C0.423889 13.2918 0.742458 13.4999 1.86492 13.4999C2.23709 13.4999 2.60944 13.4999 3.0001 13.4999C3.0001 13.6183 3.0001 13.7102 3.0001 13.8024C3.0001 16.6763 2.99925 19.5502 3.00061 22.4241C3.00095 23.21 3.42452 23.7567 4.18092 23.9622C4.21043 23.9701 4.23741 23.9871 4.26556 24C5.84366 24 7.42175 24 8.99985 24C8.99985 21.5259 8.99849 19.052 9.00036 16.5779C9.00104 15.6418 9.6392 15.0028 10.5717 15.0005C11.5004 14.9983 12.4291 14.9996 13.3579 15C14.384 15.0003 14.9996 15.6181 14.9998 16.6479C15.0001 19.0986 14.9998 21.5491 14.9998 23.9998C16.5779 23.9998 18.156 23.9998 19.734 23.9998C20.722 23.6441 20.9995 23.247 20.9995 22.1898C20.9995 19.3863 20.9995 16.5826 20.9995 13.7791C20.9995 13.6892 20.9995 13.5995 20.9995 13.4996C21.5264 13.4996 22.018 13.5045 22.5092 13.4984C23.2076 13.4899 23.7487 13.0746 23.9479 12.4061C23.9606 12.3632 23.9822 12.3226 23.9995 12.2811C23.9995 12.0936 23.9995 11.906 23.9995 11.7186C23.856 11.2117 23.5141 10.84 23.1549 10.4809C19.9418 7.26962 16.7283 4.05898 13.5153 0.847656C13.156 0.488543 12.7862 0.145884 12.2809 0C12.0934 0 11.9058 0 11.7184 0C11.2305 0.142322 10.8655 0.464455 10.5169 0.813899C9.58525 1.74756 8.65074 2.67833 7.71708 3.60996C7.65873 3.66814 7.59698 3.7231 7.49944 3.81454C7.49944 3.52277 7.50148 3.27663 7.49911 3.03066C7.4908 2.15688 6.84534 1.50821 5.97428 1.50091C5.5217 1.49701 5.06894 1.49955 4.61636 1.50023C3.62232 1.50159 3.00061 2.12669 3.0001 3.12718C2.99925 4.78958 2.9979 6.45199 3.00315 8.11422C3.00366 8.26757 2.95736 8.37359 2.8493 8.48012C2.18807 9.13219 1.53329 9.79087 0.876469 10.4475C0.5065 10.8175 0.150442 11.1973 0.000146866 11.7188Z"
                  fill="#4F0A9B"
                ></path>
              </svg>
            </a>
          </li>
          {/* <div onClick={() => {
                    // setView(prev => ({
                    //     ...prev,
                    //     currentView: ""
                    // }))
                    setCurrentCenter("sports")
                    toggleSideBar()
                }} className={`mb-1 flex items-center justify-center gap-1  rounded  px-2 hover:text-white cursor-pointer`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>

                    <p className="flex flex-col items-center tracking-wide basis-1/5 text-center justify-center h-[50px] " onClick={() => setHideSideBar && setHideSideBar(false)}>
                        <svg _ngcontent-aru-c55="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="bottomIcon"><path _ngcontent-aru-c55="" d="M0.000146866 11.7188C0.000146866 11.9062 0.000146866 12.0938 0.000146866 12.2813C0.423889 13.2918 0.742458 13.4999 1.86492 13.4999C2.23709 13.4999 2.60944 13.4999 3.0001 13.4999C3.0001 13.6183 3.0001 13.7102 3.0001 13.8024C3.0001 16.6763 2.99925 19.5502 3.00061 22.4241C3.00095 23.21 3.42452 23.7567 4.18092 23.9622C4.21043 23.9701 4.23741 23.9871 4.26556 24C5.84366 24 7.42175 24 8.99985 24C8.99985 21.5259 8.99849 19.052 9.00036 16.5779C9.00104 15.6418 9.6392 15.0028 10.5717 15.0005C11.5004 14.9983 12.4291 14.9996 13.3579 15C14.384 15.0003 14.9996 15.6181 14.9998 16.6479C15.0001 19.0986 14.9998 21.5491 14.9998 23.9998C16.5779 23.9998 18.156 23.9998 19.734 23.9998C20.722 23.6441 20.9995 23.247 20.9995 22.1898C20.9995 19.3863 20.9995 16.5826 20.9995 13.7791C20.9995 13.6892 20.9995 13.5995 20.9995 13.4996C21.5264 13.4996 22.018 13.5045 22.5092 13.4984C23.2076 13.4899 23.7487 13.0746 23.9479 12.4061C23.9606 12.3632 23.9822 12.3226 23.9995 12.2811C23.9995 12.0936 23.9995 11.906 23.9995 11.7186C23.856 11.2117 23.5141 10.84 23.1549 10.4809C19.9418 7.26962 16.7283 4.05898 13.5153 0.847656C13.156 0.488543 12.7862 0.145884 12.2809 0C12.0934 0 11.9058 0 11.7184 0C11.2305 0.142322 10.8655 0.464455 10.5169 0.813899C9.58525 1.74756 8.65074 2.67833 7.71708 3.60996C7.65873 3.66814 7.59698 3.7231 7.49944 3.81454C7.49944 3.52277 7.50148 3.27663 7.49911 3.03066C7.4908 2.15688 6.84534 1.50821 5.97428 1.50091C5.5217 1.49701 5.06894 1.49955 4.61636 1.50023C3.62232 1.50159 3.00061 2.12669 3.0001 3.12718C2.99925 4.78958 2.9979 6.45199 3.00315 8.11422C3.00366 8.26757 2.95736 8.37359 2.8493 8.48012C2.18807 9.13219 1.53329 9.79087 0.876469 10.4475C0.5065 10.8175 0.150442 11.1973 0.000146866 11.7188Z" fill="#4F0A9B"></path></svg>
                        <span className="text-sm font-medium text-gray-300">Sports</span>
                    </p>

                </div> */}
          <li
            onClick={() => {
              // setView(prev => ({
              //     ...prev,
              //     currentView: ""
              // }))
              setCurrentCenter("allcasinos");
              toggleSideBar();
            }}
          >
            <a>
              <svg
                _ngcontent-aru-c55=""
                width="25"
                height="20"
                viewBox="-4 0 34 34"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  _ngcontent-aru-c55=""
                  id="icons"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    _ngcontent-aru-c55=""
                    id="ui-gambling-website-lined-icnos-casinoshunter"
                    transform="translate(-1907.000000, -413.000000)"
                    fill="#4F0A9B"
                    fill-rule="nonzero"
                  >
                    <g
                      _ngcontent-aru-c55=""
                      id="1"
                      transform="translate(1350.000000, 120.000000)"
                    >
                      <path
                        _ngcontent-aru-c55=""
                        d="M579,293 C581.209139,293 583,294.790861 583,297 L583,323 C583,325.209139 581.209139,327 579,327 L561,327 C558.790861,327 557,325.209139 557,323 L557,297 C557,294.790861 558.790861,293 561,293 L579,293 Z M578,321 L576,321 C575.447715,321 575,321.447715 575,322 C575,322.552285 575.447715,323 576,323 L576,323 L578,323 C578.552285,323 579,322.552285 579,322 C579,321.447715 578.552285,321 578,321 L578,321 Z M572.183447,305 C571.450961,305 570.743698,305.242203 570.168489,305.682402 L570.168489,305.682402 L570,305.820357 C569.397478,305.293118 568.621855,305 567.816039,305 C566.936433,305 566.092804,305.349258 565.471028,305.971041 C564.849253,306.592823 564.5,307.436459 564.5,308.316071 C564.5,309.190497 564.845347,310.029434 565.46072,310.650272 L565.46072,310.650272 L569.273113,314.686848 C569.461592,314.886659 569.724957,315 570,315 C570.275043,315 570.538408,314.886659 570.727109,314.686612 L570.727109,314.686612 L574.54717,310.641584 C575.15448,310.029701 575.5,309.190733 575.5,308.316071 C575.5,307.436694 575.150398,306.592989 574.528458,305.971041 C573.906556,305.349133 573.06339,305 572.183447,305 Z M572.183447,306.9996 C572.532612,306.9996 572.867655,307.138396 573.114635,307.385379 C573.361242,307.632362 573.499897,307.967112 573.499897,308.316071 C573.499897,308.615179 573.398028,308.903847 573.213456,309.135923 L573.213456,309.135923 L573.10434,309.257058 L569.999988,312.54371 L566.894311,309.255942 L566.791941,309.141607 C566.601814,308.904071 566.500103,308.615555 566.500103,308.316071 C566.500103,307.966673 566.638543,307.632204 566.885365,307.385379 C567.132457,307.138284 567.467032,306.9996 567.816039,306.9996 C568.165191,306.9996 568.500085,307.138375 568.746445,307.385111 L568.746445,307.385111 L569.292831,307.931504 L569.386977,308.014638 C569.779015,308.319466 570.345939,308.291788 570.706703,307.931969 L570.706703,307.931969 L571.25294,307.385212 L571.363887,307.286148 C571.595719,307.101598 571.88456,306.9996 572.183447,306.9996 Z M565.5,308.316071 L565.507362,308.499528 L565.503845,308.44948 L565.5,308.316071 Z M566.313125,306.553672 L566.197,306.66 L566.244566,306.614509 C566.267064,306.593756 566.289918,306.573469 566.313125,306.553672 Z M571.703,306.051 L571.466831,306.113372 L571.650289,306.061871 L571.650289,306.061871 L571.703,306.051 Z M571.837936,306.025544 L571.703,306.051 L571.729516,306.044887 L571.837936,306.025544 L571.837936,306.025544 Z M564,297 L562,297 C561.447715,297 561,297.447715 561,298 C561,298.552285 561.447715,299 562,299 L562,299 L564,299 C564.552285,299 565,298.552285 565,298 C565,297.447715 564.552285,297 564,297 L564,297 Z"
                        id="casino-card"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
              Casino
            </a>
          </li>
          <li
            onClick={() => {
              setAccountViewOpen((prev) => !prev);
            }}
          >
            <a>
              <svg
                _ngcontent-aru-c55=""
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                class="bottomIcon"
              >
                <path
                  _ngcontent-aru-c55=""
                  d="M10 0C11.3261 0 12.5979 0.526784 13.5355 1.46447C14.4732 2.40215 15 3.67392 15 5C15 6.32608 14.4732 7.59785 13.5355 8.53553C12.5979 9.47322 11.3261 10 10 10C8.67392 10 7.40215 9.47322 6.46447 8.53553C5.52678 7.59785 5 6.32608 5 5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0ZM10 12.5C15.525 12.5 20 14.7375 20 17.5V20H0V17.5C0 14.7375 4.475 12.5 10 12.5Z"
                  fill="#4F0A9B"
                ></path>
              </svg>
              Account
            </a>
          </li>
          {/* <div className="flex flex-col justify-center items-center" onClick={() => {
                    loggedIn ?
                        setToggle(prev => !prev) : setOpenLogin(true)
                }}>
                      <p className="flex flex-col items-center tracking-wide ">
                      <AccountCircleIcon
                        fontSize="large"
                        className={`rounded-full`}
                        color={`white`}
                    />
                        <span className="text-sm font-medium text-gray-300">Account</span>
                    </p>
                  
                </div> */}
        </ul>
      </div>
    </div>
  );
}
