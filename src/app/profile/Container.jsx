// "use client";
// import Footer from "../components/Footer";
// import Navbar from "./Navbar";
// import Content from "./Content";
// import { useContext, useEffect, useState } from "react";
// import { isAuthenticated } from "../components/funcStore/authenticate";
// import { AuthContext } from "../context/AuthContext";
// import jwt_decode from "jwt-decode";
// import Bottom from "../components/Navbar/Bottom";
// import MobileFooter from "../components/MobileFooter";
// import MobileBottomNav from "../components/Navbar/MobileBottomNav";
// import MobileBottom from "../components/Navbar/MobileBottom";

// export default function ProfileContainer() {
//   const { openLogin, setOpenLogin } = useContext(AuthContext);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [verified, setVerified] = useState(false);

//   useEffect(() => {
//     const tk = isAuthenticated();
//     if (tk) {
//       const tokenD = localStorage.getItem("tk");
//       const token = jwt_decode(tokenD);
//       const roleToUrlMap = {
//         systemControl: "/u/systemcontrol",
//         king: "/u/control",
//         mainAdmin: "/u/main_admin",
//         admin: "/u/admin",
//         master: "/u/master",
//         super: "/u/super",
//         panel: "/u/panel",
//         normalUser: "/profile",
//       };

//       const redirectUrl = roleToUrlMap[token.role];

//       if (redirectUrl === "/profile") {
//         setVerified(true);
//         setLoggedIn(true);
//         return;
//       } else {
//         setLoggedIn(false);
//         window.location.replace(redirectUrl);
//         return
//       }

//       if (!token.emailConfirm) {
//         setVerified(true);
//         setLoggedIn(true);
//         // setVerified(false);
//         // window.location.replace("/confirmcode");
//         // to be changed later
//       } else {
//         setVerified(true);
//         setLoggedIn(true);
//       }
//     } else {
//       setOpenLogin(true);
//       window.location.replace("/u/login");
//       setLoggedIn(false);
//       return;
//     }
//   }, []);

//   return (
//     <>
//       {!loggedIn ? (
//         <div className="min-h-screen flex justify-center items-center">
//           <p className="text-white">Loading ...</p>
//         </div>
//       ) : (
//         <main className="flex min-h-screen flex-col items-center">
//           <div className="flex flex-col w-full">
//             <Bottom />
//           </div>
//           {/* sidebar */}
//           <div className="w-full grid grid-cols-12">
//             <div className="col-span-12">
//               {/* <Bottom /> */}
//               <div className="flex">
               
            
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* footer */}
        
//           <div className="relative text-white min-h-screen grid grid-cols-12">
                 
//                   <div className="col-span-12 md:col-span-10">
//                     <div className="max-mk:hidden">
//                       <Bottom/>
//                     </div>
//                     <div className="mk:hidden absolute fixed top-0 right-0 left-0 z-50">
//                       <MobileBottom toggleSideBar={toggleSideBar} />
//                     </div>
//                     <div className="min-h-[80vh]">
//                     <Content />
//                     </div>
//                     <div className="max-mk:hidden">
//                       <Footer />
//                     </div>
//                     <div className="mk:hidden w-full">
//                       <MobileFooter />
//                     </div>
//                     <div className="mk:hidden absolute fixed bottom-0 left-0 right-0 z-50">
//                       <MobileBottomNav toggleSideBar={toggleSideBar} />
//                     </div>
//                   </div>
//                 </div>
//         </main>
//       )}
//     </>
//   );
// }
