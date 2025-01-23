import React, { useEffect, useState } from 'react';

const HorizontalSlides = ({ globalSettings }) => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Update banners when globalSettings change
    setBanners(globalSettings?.banners || []);
  }, [globalSettings]);

  useEffect(() => {
    // Set up the interval to change slides
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      
      <div
        id="center_main_top_flag"
        className={`relative mb-4 w-full sm:h-[40vh] h-[15vh] ${banners.length === 0 ? 'bg-gray-800' : ''}`}
        style={{ backgroundColor: banners.length === 0 ? '#333' : '' }}
      >
        {banners.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {/* <p>No Banners </p> */}
          </div>
        ) : (
          banners.map((ad, i) => (
            <img
              key={i} 
              src={`${process.env.NEXT_PUBLIC_UPLINE_BACKEND}api/${ad}`}
              alt={`Banner ${i + 1}`}
              style={{ display: i === current ? 'block' : 'none' }}
              className="w-full h-full object-cover ease-in-out duration-500"
            />
          ))
        )}
      </div>
    </>
  );
};

export default HorizontalSlides;
