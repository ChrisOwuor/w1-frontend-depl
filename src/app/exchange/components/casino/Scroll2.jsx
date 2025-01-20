import React, { useRef } from "react";

const ProviderScroll = ({  currentTab, setCategory, setCurrentTab, providers }) => {
  const providerRef = useRef(null);

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <div></div>
        <div className="flex gap-x-2">
          <button
            className="bg-black text-white px-2 py-1 rounded-full"
            onClick={() => {
              if (providerRef.current) {
                providerRef.current.scrollBy({
                  left: -150,
                  behavior: "smooth",
                });
              }
            }}
          >
            &#8592;
          </button>
          <button
            className="bg-black text-white px-2 py-1 rounded-full"
            onClick={() => {
              if (providerRef.current) {
                providerRef.current.scrollBy({
                  left: 150,
                  behavior: "smooth",
                });
              }
            }}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={providerRef}
        className="flex items-center w-full gap-x-4 bg-primary text-white overflow-x-auto scrollbar-hide"
      >
        <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 0 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(0);
            setCategory("");
          }}
        >
          POPULAR CASINO
        </div>
        <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 1 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(1);
            setCategory("");
          }}
        >
          ALL CASINO
        </div>
        {/* <div
          className={`text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
            currentTab === 2 ? "bg-warning text-black" : ""
          }`}
          onClick={() => {
            setCurrentTab(2);
            setCategory("");
          }}
        >
          OTHER CASINO
        </div> */}
        {providers &&
          providers.map((provider) => (
            <div
              key={provider.provider_name}
              className={`uppercase text-sm whitespace-nowrap sm:text-md font-bold cursor-pointer py-3 px-2 sm:px-4 ${
                currentTab === provider.provider_name
                  ? "bg-warning text-black"
                  : ""
              }`}
              onClick={() => {
                setCurrentTab(provider.provider_name);
                setCategory("");
              }}
            >
              {provider.provider_name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProviderScroll;
