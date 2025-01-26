"use client";
import React, { useContext, useEffect, useState } from "react";
import { Group, Collapse, Box, Loader, ScrollArea } from "@mantine/core";
import { CompetitionContext } from "src/app/context/exchange/CompetitonContext";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import { getIcon, startsWithStr } from "../utils/utils";
import { useSearchParams } from "next/navigation";
import { fetchUserData, getEvents, getSeries } from "src/app/api/exchange";
import { NAVContext } from "@/app/context/NavContext";
import { AuthContext } from "@/app/context/AuthContext";
import { Button, Modal } from "@mantine/core";
import { isAuthenticated } from "@/app/components/funcStore/authenticate";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
const AccountViewKheladi = ({ setSelectedLink, activeLink }) => {
  const [currentPage, setCurrentPage] = useState("");
  const [opened, setOpened] = useState(false);
  const [openedCreate, setOpenedCreate] = useState(false);
  const [loggedIN, setLoggedIN] = useState(false);
  const [disable, setDisable] = useState(false);
  const {
    currentCenter,
    setCurrentCenter,
    setNewMobileNavOpen,
    newMobileNavOpen,
  } = useContext(NAVContext);
  const {
    openUserconsentwizard,
    setOpenUserconsentwizard,
    openLogin,
    setOpenLogin,
    setOpenRegister,
    openRegister,
    userData,
    getfreshUserData,
  } = useContext(AuthContext);

  useEffect(() => {
    const crnturl = localStorage.getItem("current_pg");
    if (crnturl) {
      const currentpg = JSON.parse(crnturl);
      setCurrentPage(currentpg);
    } else {
      setCurrentPage("Home");
    }
    const loggedIN = isAuthenticated();
    if (loggedIN) {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const action = localStorage.getItem("openLogin");
    if (action) {
      setOpened(true);
    }
    const auth = isAuthenticated();
    if (auth) {
      setLoggedIN(true);
    }
  }, []);
  useEffect(() => {
    const action = localStorage.getItem("openRegister");
    if (action) {
      setOpenedCreate(true);
    }
  }, [openRegister]);
  useEffect(() => {
    if (openLogin) {
      setOpened(true);
    } else {
      opened && setOpened(false);
    }
  }, [openLogin]);

  const handleLogout = async () => {
    console.log("loggin out");
    setDisable(true);

    try {
      const tk = localStorage.getItem("tk");
      if (!tk) {
        window.location.replace("/");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tk}`,
          },
        }
      );
      if (res && res.status === 200) {
        localStorage.removeItem("tk");
        if (localStorage.getItem("openLogin")) {
          localStorage.removeItem("openLogin");
        }
        setOpenLogin(false);
        window.location.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData != {}) {
      // const bal = parseInt(userData.availableBalance)
      // const exposure = parseInt(userData.exposure)
      // setUserBal(bal)
      // setUserExposure(exposure)
    } else {
      getfreshUserData();
    }
  }, [userData]);

  const menuItems = [
    {
      name: "Edit Password",
      case: "profile",
      svg: (
        <svg
          _ngcontent-asr-c58=""
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 17 15"
          fill="none"
          class="ng-tns-c53-1"
        >
          <path
            _ngcontent-asr-c58=""
            d="M9.4725 0C13.62 0 16.98 3.375 16.98 7.5C16.98 11.625 13.62 15 9.4725 15C6.84 15 4.5375 13.635 3.195 11.5725L4.38 10.635C5.4375 12.3525 7.32 13.5 9.48 13.5C11.0713 13.5 12.5974 12.8679 13.7226 11.7426C14.8479 10.6174 15.48 9.0913 15.48 7.5C15.48 5.9087 14.8479 4.38258 13.7226 3.25736C12.5974 2.13214 11.0713 1.5 9.48 1.5C6.42 1.5 3.9 3.795 3.5325 6.75H5.6025L2.7975 9.5475L0 6.75H2.0175C2.3925 2.9625 5.5875 0 9.4725 0ZM11.6925 6.18C12.0675 6.1875 12.375 6.4875 12.375 6.87V10.3275C12.375 10.7025 12.0675 11.0175 11.685 11.0175H7.5375C7.155 11.0175 6.8475 10.7025 6.8475 10.3275V6.87C6.8475 6.4875 7.155 6.1875 7.53 6.18V5.4225C7.53 4.275 8.4675 3.345 9.6075 3.345C10.755 3.345 11.6925 4.275 11.6925 5.4225V6.18ZM9.6075 4.395C9.045 4.395 8.58 4.8525 8.58 5.4225V6.18H10.6425V5.4225C10.6425 4.8525 10.1775 4.395 9.6075 4.395Z"
            fill="#4F0A9B"
            class="ng-tns-c53-1"
          ></path>
        </svg>
      ),
    },
    {
      name: "Account Statement",
      case: "ac_statements",
      svg: (
        <svg
          _ngcontent-asr-c58=""
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 15"
          fill="none"
          class="ng-tns-c53-1"
        >
          <path
            _ngcontent-asr-c58=""
            d="M10.3266 9.54545H5.5075V8.18182H10.3266V9.54545ZM12.3919 6.81818H5.5075V5.45455H12.3919V6.81818ZM12.3919 4.09091H5.5075V2.72727H12.3919V4.09091ZM1.37688 2.72727V13.6364H12.3919V15H1.37688C1.01171 15 0.661492 14.8563 0.403278 14.6006C0.145063 14.3449 0 13.998 0 13.6364V2.72727H1.37688ZM13.7688 0C14.1339 0 14.4841 0.143668 14.7424 0.3994C15.0006 0.655131 15.1456 1.00198 15.1456 1.36364V10.9091C15.1456 11.6659 14.5329 12.2727 13.7688 12.2727H4.13063C3.76546 12.2727 3.41524 12.1291 3.15703 11.8733C2.89881 11.6176 2.75375 11.2708 2.75375 10.9091V1.36364C2.75375 0.606818 3.36646 0 4.13063 0H13.7688ZM4.13063 1.36364V10.9091H13.7688V1.36364H4.13063Z"
            fill="#4F0A9B"
            class="ng-tns-c53-1"
          ></path>
        </svg>
      ),
    },
    {
      name: "Profit / Loss",
      case: "p&l",
      svg: (
        <svg
          _ngcontent-asr-c58=""
          _ngcontent-pix-c53=""
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 14"
          fill="none"
          class="ng-tns-c53-1"
        >
          <path
            _ngcontent-asr-c58=""
            _ngcontent-pix-c53=""
            d="M11.5875 9.5475L15 3.645V12.4125V13.9125H0V0.4125H1.5V9.8175L5.625 2.6625L10.5 5.4975L13.68 0L14.9775 0.75L11.055 7.5375L6.1725 4.725L1.7325 12.4125H3.4275L6.72 6.7425L11.5875 9.5475Z"
            fill="#4F0A9B"
            class="ng-tns-c53-1"
          ></path>
        </svg>
      ),
    },
    {
      name: "Unsettled Bets",
      case: "bet_history",
      svg: (
        <svg
          _ngcontent-asr-c58=""
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 17"
          fill="none"
          class="ng-tns-c53-1"
        >
          <path
            _ngcontent-asr-c58=""
            d="M13.5 7.5825V3C13.5 2.175 12.8325 1.5 12 1.5H8.865C8.55 0.63 7.725 0 6.75 0C5.775 0 4.95 0.63 4.635 1.5H1.5C0.675 1.5 0 2.175 0 3V13.5C0 14.3325 0.675 15 1.5 15H6.0825C7.0275 15.93 8.3175 16.5 9.75 16.5C12.6525 16.5 15 14.1525 15 11.25C15 9.8175 14.43 8.5275 13.5 7.5825ZM6.75 1.5C7.1625 1.5 7.5 1.8375 7.5 2.25C7.5 2.6625 7.1625 3 6.75 3C6.3375 3 6 2.6625 6 2.25C6 1.8375 6.3375 1.5 6.75 1.5ZM1.5 13.5V3H3V4.5H10.5V3H12V6.51C11.3175 6.1875 10.56 6 9.75 6H3V7.5H6.075C5.625 7.9275 5.28 8.4375 5.01 9H3V10.5H4.56C4.5225 10.7475 4.5 10.995 4.5 11.25C4.5 12.06 4.6875 12.8175 5.01 13.5H1.5ZM9.75 15C7.68 15 6 13.32 6 11.25C6 9.18 7.68 7.5 9.75 7.5C11.82 7.5 13.5 9.18 13.5 11.25C13.5 13.32 11.82 15 9.75 15ZM10.125 11.4375L12.27 12.705L11.7075 13.62L9 12V8.25H10.125V11.4375Z"
            fill="#4F0A9B"
            class="ng-tns-c53-1"
          ></path>
        </svg>
      ),
    },
    {
      name: "Stake Settings",
      case: "account",
      svg: (
        <svg
          _ngcontent-asr-c58=""
          _ngcontent-fpn-c50=""
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
        >
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M15.0207 7.23158C15.0196 7.20669 15.0185 7.17727 15.0128 7.15012C14.9212 5.15766 14.1393 3.4458 12.6888 2.0598C11.2361 0.671529 9.47558 -0.0231707 7.47068 0.000589438C3.39639 0.0447153 0.135595 3.28062 0.0473434 7.36735C0.00434889 9.36207 0.678684 11.1203 2.05224 12.5923C3.3319 13.9636 4.92156 14.7567 6.78277 14.9536L6.78503 15H8.16425L8.16651 14.9547C9.96775 14.8111 11.5393 14.0801 12.8405 12.779C14.1789 11.4394 14.911 9.79201 15.0162 7.88329C15.0354 7.79503 15.0343 7.61401 15.0207 7.23158ZM3.81728 6.38187C3.65662 7.34472 3.5876 8.23856 3.60457 9.11429C3.61702 9.75694 3.66906 10.3939 3.75958 11.0083C3.86706 11.7369 4.02886 12.4068 4.25288 13.0494L4.23138 13.0358C4.12163 12.9679 4.01189 12.9001 3.90101 12.8344C3.85575 12.8073 3.82746 12.7677 3.80936 12.7066C3.79126 12.6466 3.77202 12.5867 3.75166 12.5267L3.74034 12.4927C3.69509 12.3536 3.60118 12.2438 3.47559 12.1839C3.40996 12.1522 3.33755 12.1352 3.26401 12.1352C3.20404 12.1352 3.14181 12.1454 3.07958 12.168C3.07732 12.1658 3.0728 12.1624 3.06827 12.1578C2.13258 11.2527 1.51368 10.1495 1.23082 8.88121C1.10863 8.3336 1.05998 7.77693 1.086 7.22366C1.15162 5.83652 1.61664 4.58403 2.46861 3.50124C3.01283 2.80994 3.67585 2.24648 4.44183 1.82785C4.44862 1.82446 4.45428 1.82107 4.46106 1.81767C4.54479 1.97155 4.69075 2.05867 4.88648 2.07111C5.0958 2.08356 5.26665 1.98399 5.36621 1.78939C5.40807 1.70792 5.44654 1.6242 5.48388 1.5416C5.51217 1.4805 5.54045 1.41941 5.56987 1.35831C5.57326 1.35039 5.57779 1.34473 5.58118 1.34021C5.70112 1.30739 5.82105 1.27571 5.94211 1.24517C5.31643 2.02812 4.82199 2.93326 4.43165 4.01152C4.16237 4.74922 3.95645 5.54688 3.81728 6.38187ZM13.9753 8.04282C13.8859 9.12786 13.5386 10.1348 12.9434 11.0332C12.1277 12.2653 11.0019 13.1354 9.5989 13.6174C8.97548 13.8324 8.28192 13.9432 7.47973 13.9557C7.42995 13.7305 7.21158 13.5461 6.98869 13.5416C6.98529 13.5416 6.98077 13.5416 6.97737 13.5416C6.7658 13.5416 6.59382 13.6615 6.50104 13.8697C6.44107 13.8606 6.38111 13.8527 6.32227 13.8392C6.1503 13.8007 5.97832 13.7577 5.80634 13.7158L5.70338 13.6909C5.67622 13.6841 5.6536 13.6706 5.62644 13.6208C5.26665 12.9464 5.01207 12.1771 4.84575 11.2674C4.74279 10.7028 4.67943 10.1247 4.65907 9.54876C4.63531 8.91742 4.64549 8.33133 4.68735 7.75657C4.73374 7.13315 4.82765 6.49841 4.96795 5.8682C5.20668 4.79674 5.53253 3.88254 5.96361 3.07356C6.37998 2.29174 6.87328 1.65361 7.47181 1.12184C7.55893 1.04377 7.62455 1.02001 7.7128 1.03133C7.83387 1.04717 7.95606 1.05509 8.07486 1.06301C8.09862 1.06414 8.12238 1.0664 8.14614 1.06753C8.21403 1.34021 8.35433 1.48277 8.59419 1.52576C8.72657 1.54839 8.92118 1.51218 9.11804 1.2248C9.53215 1.33794 9.86819 1.45674 10.1703 1.59478C11.6728 2.28156 12.7771 3.39036 13.4514 4.89065C13.7173 5.48125 13.8859 6.1058 13.9538 6.74733C14.0024 7.19877 14.0092 7.62306 13.9753 8.04282Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M5.14106 7.54612C5.14106 7.55291 5.14106 7.55969 5.14106 7.56648C5.13879 7.66605 5.13653 7.76901 5.14558 7.87197C5.16821 8.1503 5.37639 8.34265 5.65359 8.34265C5.65473 8.34265 5.65586 8.34265 5.65699 8.34265C5.92853 8.34151 6.165 8.1141 6.17519 7.84595C6.1865 7.54272 6.18989 7.23497 6.19216 6.93854V6.88423C6.19329 6.75864 6.14237 6.64437 6.0462 6.55272C5.88554 6.40224 5.69093 6.36151 5.49519 6.43958C5.29946 6.51765 5.18518 6.68057 5.16482 6.91138C5.1535 7.03132 5.14671 7.15238 5.14106 7.27344C5.13879 7.32549 5.1354 7.37867 5.132 7.43071L5.13653 7.54725L5.14106 7.54612Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M6.84387 4.33851C6.83255 4.29212 6.81784 4.23328 6.78503 4.17897C6.67189 3.99002 6.5067 3.89951 6.30644 3.91761C6.07789 3.93685 5.91496 4.0647 5.8482 4.27515C5.73732 4.62363 5.66039 4.89291 5.59929 5.14861C5.56535 5.29004 5.58798 5.43147 5.66491 5.54688C5.74185 5.66228 5.86178 5.73922 6.00321 5.76298C6.03602 5.76864 6.0677 5.7709 6.09938 5.7709C6.33359 5.7709 6.52593 5.62155 6.60061 5.37151C6.67528 5.12259 6.74883 4.87367 6.82124 4.62476C6.83255 4.58629 6.83934 4.54782 6.84726 4.50256C6.85066 4.4822 6.85518 4.46183 6.85971 4.43807L6.86536 4.40979L6.85631 4.3815C6.85066 4.36906 6.84726 4.35435 6.84387 4.33851Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M5.7475 10.6847C5.9885 10.6281 6.14916 10.412 6.13898 10.1586C6.12879 9.89724 6.11861 9.63588 6.11295 9.37452C6.10616 9.08826 5.90703 8.8665 5.63775 8.8484C5.35829 8.82917 5.11616 9.03735 5.08674 9.32134C5.07882 9.40167 5.07543 9.482 5.07203 9.56007C5.0709 9.59402 5.06977 9.62909 5.06751 9.66303L5.06185 9.7807H5.08222C5.08109 9.8418 5.07995 9.9029 5.08674 9.96626L5.09127 10.0115C5.10258 10.1326 5.11503 10.257 5.15689 10.377C5.22591 10.5761 5.41033 10.6994 5.62078 10.6994C5.66151 10.6994 5.70451 10.6938 5.7475 10.6847Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M6.47954 11.9169L6.42523 11.7392C6.35508 11.5129 6.09599 11.3308 5.89233 11.3647C5.60381 11.4122 5.41939 11.6204 5.42278 11.8942V11.9044C5.42278 11.9157 5.42392 11.927 5.42505 11.9383C5.46352 12.2472 5.56195 12.5561 5.72601 12.8831C5.80747 13.0449 5.98397 13.1399 6.16613 13.1399C6.23855 13.1399 6.31209 13.1252 6.38111 13.0924C6.61871 12.9815 6.74204 12.6964 6.65491 12.4577C6.59042 12.2812 6.53385 12.0956 6.47954 11.9169Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M7.69357 1.80635C7.46276 1.68076 7.15953 1.77354 7.01697 2.0134C6.88346 2.23743 6.75901 2.45579 6.64473 2.66398C6.61531 2.71828 6.59834 2.77599 6.58363 2.8269C6.57798 2.84727 6.57119 2.86763 6.5644 2.888L6.55648 2.91063L6.55874 2.93439C6.57685 3.15728 6.72167 3.35302 6.91967 3.4209C6.97285 3.43901 7.02829 3.44806 7.0826 3.44806C7.24779 3.44806 7.40619 3.3666 7.49557 3.2263C7.66415 2.96041 7.80332 2.72168 7.92099 2.49652C8.0545 2.24082 7.95833 1.95004 7.69357 1.80635Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M2.58062 9.1539C2.59985 9.1539 2.61795 9.15277 2.63719 9.15051C2.90873 9.12109 3.10786 8.8801 3.09202 8.60176C3.07505 8.29854 3.05582 7.99532 3.03432 7.69209C3.01622 7.41942 2.78654 7.20331 2.51726 7.2101C2.23327 7.21689 2.00924 7.44544 2.00811 7.72943V7.81655L1.98096 7.81881L1.99227 7.93196C2.00019 8.00889 2.00811 8.08696 2.0149 8.1639C2.03187 8.33927 2.04998 8.52143 2.0726 8.7002C2.10768 8.96382 2.32491 9.1539 2.58062 9.1539Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M3.25834 4.78655C3.11578 4.67115 2.92796 4.6406 2.75598 4.70396C2.57948 4.77071 2.46407 4.90648 2.42221 5.09883C2.37695 5.30362 2.33848 5.51293 2.30115 5.71546C2.28531 5.80032 2.26947 5.88404 2.25363 5.96777L2.2491 5.98927L2.25363 6.01076C2.25815 6.03226 2.26041 6.05489 2.26381 6.07639C2.27173 6.13183 2.27965 6.18953 2.30341 6.2461C2.37808 6.4226 2.57608 6.54933 2.7673 6.54933C2.78201 6.54933 2.79558 6.54819 2.81029 6.54706C3.04676 6.52217 3.23345 6.36038 3.27644 6.14427C3.32962 5.87386 3.38958 5.55819 3.4371 5.24478C3.46426 5.06941 3.39637 4.89856 3.25834 4.78655Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M3.18253 10.1122C3.14632 9.84632 2.93701 9.65058 2.68357 9.64832C2.54214 9.64832 2.41429 9.70036 2.31472 9.79879C2.20384 9.90854 2.13822 10.0658 2.13708 10.2321V10.2412L2.13822 10.2502C2.15179 10.334 2.16424 10.4166 2.17782 10.5003C2.20723 10.6926 2.23778 10.8906 2.27625 11.0852C2.32377 11.3262 2.54214 11.5016 2.77634 11.5016C2.8035 11.5016 2.83065 11.4993 2.85781 11.4948C3.14972 11.4428 3.32283 11.2097 3.28662 10.9167C3.25381 10.6485 3.21874 10.3804 3.18253 10.1122Z"
            fill="#5700A3"
          ></path>
          <path
            _ngcontent-asr-c58=""
            _ngcontent-fpn-c50=""
            d="M3.9836 2.42412C3.75166 2.36076 3.50161 2.46711 3.40204 2.66964C3.2708 2.93666 3.15086 3.21839 3.04338 3.46617C3.01622 3.53066 3.00717 3.61439 3.02075 3.69019C3.06374 3.93006 3.23006 4.09638 3.45635 4.12353C3.48351 4.12693 3.50953 4.12806 3.53442 4.12806C3.746 4.12806 3.91232 4.01831 4.00849 3.81239C4.12276 3.568 4.22007 3.35303 4.30719 3.15389C4.32869 3.10524 4.34 3.05546 4.35018 3.0102C4.35358 2.9921 4.3581 2.97513 4.36263 2.95703L4.36715 2.94005L4.36602 2.92195C4.35245 2.68322 4.19857 2.48295 3.9836 2.42412Z"
            fill="#5700A3"
          ></path>
        </svg>
      ),
    },

    // { name: 'Live Sports', case: 'in-play' },
   
    // { name: 'Promotions', case: 'virtualsports' },
    // { name: 'Our Sponsorship', case: 'event_markets' },
    // { name: 'FAQs', case: 'userconsent' },
    // { name: 'Rules', case: 'userconsent' },
    // { name: 'Log Out', case: 'sign_out' },
  ];
 const { setCurrentCompetition, setCurCompObj, } =
   useContext(CompetitionContext);
  const { view, setView, setAccountViewOpen } = useContext(NAVContext);
  
  const searchParams = useSearchParams();

  const sp = searchParams.get("sp");
  const [competitions, setCompetitions] = useState([]);
  const [loadin, setLoadin] = useState(false);
  const [events, setEvents] = useState([]);
  const [active, setActive] = useState(sp);
  const [fetched, setFetched] = useState(false);
  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };
  useEffect(() => {
    if (active != null) {
      if (startsWithStr(active)) {
        setCompetitions([]);
        setFetched(true);
        setLoadin(false);
        return;
      }
      (async () => {
        setLoadin(true);
        const competitions = await getSeries(active);
        if (competitions && competitions.length > 0) {
          setCompetitions(competitions);
          setFetched(true);
          setLoadin(false);
        } else {
          setCompetitions([]);
          setFetched(true);
          setLoadin(false);
        }
      })();
    }
  }, [active]);

  const fetcheEvents = async () => {
    try {
      setLoadin(true);
      const eventTypes = await getEvents();
      if (eventTypes) {
        setEvents(eventTypes);
        setLoadin(false);
      }
    } catch (error) {
      console.log(error);
      setLoadin(false);
    }
  };

  useEffect(() => {
    fetcheEvents();
  }, []);
  useEffect(() => {
    if (competitions.length > 0) {
      setCurrentCompetition(competitions[0].series_id);
    }
  }, [competitions]);

  return (
    <div
      className={`${
        newMobileNavOpen ? "fixed h-screen w-full " : "fixed "
      } text-black font-semibold bg-white sidebar-nav block h-full w-[240px]`}
    >
      <p
        onClick={() => {
          setAccountViewOpen((prev) => !prev);
        }}
        className=" text-[#5700a3] absolute top-0 text-[12px] "
      >
        <CloseIcon />
      </p>
      <div className="profile mt-[15px]">
        <p className="p-icon mx-auto my-0 bg-[#EDEDED] h-[100px] w-[100px] flex justify-center items-center rounded-full">
          <PersonIcon sx={{ fontSize: 50 }} />
        </p>
        <h5 className="text-center text-[12px] mx-[15px] text-[700] py-[12px] text-[#5700a3]">
          Demo123
        </h5>
      </div>
      <div className="acc-det bg-[#EDE6F5] text-[#000] rounded-[5px] my-0 mx-[10px] py-[8px] px-[15px] ">
        <h4 className="text-[14px] text-[700]">Balance Info:</h4>
        <p className="bal flex text-[11px] font-[400] justify-between">
          <span>Wallet Balance</span>
          <b className="text-[#5700a3]">0</b>
        </p>
        <p className="bal flex text-[11px] font-[400] justify-between">
          <span>Wallet Balance</span>
          <b className="text-[#5700a3]">0</b>
        </p>
      </div>
      <ul className="mt-[15px]">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item">
            <p
              onClick={() => {
                setActive("");
                setCompetitions([]);
                // handleLinkClick(item)
                setAccountViewOpen((prev) => !prev);
                setCurrentCenter(item.case);
                setView({
                  currentView: "home",
                  from: "/",
                  sportName: "",
                  sportId: "",
                  competitionName: "",
                  competitionId: "",
                  eventName: "",
                  eventId: "",
                  showCompetition: false,
                });
                setCurCompObj({
                  sportName: "",
                  compObj: {},
                });
              }}
              className=" nav-item flex items-center text-[15px] text-[#3a3a3a] font-[500]  transition-all duration-300 px-4 py-3 capitalize border-b  border-gray  cursor-pointer"
            >
              <a className=" nav-link ">{item.svg}</a>
              {item.name}
            </p>
          </li>
        ))}
        <li>
          <p className=" nav-item flex items-center text-[15px] text-[#3a3a3a] font-[500]  transition-all duration-300 px-4 py-3 capitalize border-b  border-gray  cursor-pointer">
            <a href="" className="nav-link">
              <svg
                _ngcontent-elp-c57=""
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 15"
                fill="none"
                class="ng-tns-c53-1"
              >
                <path
                  _ngcontent-elp-c57=""
                  d="M4.52941 3.75L4.52941 6L10.7059 6L10.7059 9L4.52941 9L4.52941 11.25L0.117648 7.5L4.52941 3.75ZM6.29412 15C5.82609 15 5.37723 14.842 5.04628 14.5607C4.71534 14.2794 4.52941 13.8978 4.52941 13.5L4.52941 12L6.29412 12L6.29412 13.5L14.2353 13.5L14.2353 1.5L6.29412 1.5L6.29412 3L4.52941 3L4.52941 1.5C4.52941 1.10217 4.71534 0.720644 5.04628 0.43934C5.37723 0.158034 5.82609 -8.89432e-07 6.29412 -8.48515e-07L14.2353 -1.54275e-07C14.7033 -1.13359e-07 15.1522 0.158035 15.4831 0.439341C15.8141 0.720645 16 1.10218 16 1.5L16 13.5C16 13.8978 15.8141 14.2794 15.4831 14.5607C15.1522 14.842 14.7033 15 14.2353 15L6.29412 15Z"
                  fill="#4F0A9B"
                  class="ng-tns-c53-1"
                ></path>
              </svg>
            </a>{" "}
            Sign Out
          </p>
        </li>
      </ul>
    </div>
  );
};

export default AccountViewKheladi;
