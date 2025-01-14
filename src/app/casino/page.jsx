import { Suspense } from "react";
import Wrapper from "./Wrapper";

const CasinoHome = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center text-white font-bold text-lg sm:text-3xl leading-[3rem] h-screen w-screen">
          PLAYRUNEXCHANGE CASINO LOADING <span className="animate-bounce p-2 ml-4 font-bold text-6xl">..</span>
        </div>
      }
    >
      <Wrapper />
    </Suspense>
  );
};

export default CasinoHome;
