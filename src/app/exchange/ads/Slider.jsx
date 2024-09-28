import React, { useEffect, useState } from 'react';

const HorizontalSlides = ({ globalSettings }) => {
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Update banners when globalSettings change
    setBanners(globalSettings.banners || []);
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
      {/* Container for banners with a placeholder background */}
      <div
        id="center_main_top_flag"
        className={`relative w-full sm:h-[250px] ${banners.length === 0 ? 'bg-gray-800' : ''}`}
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
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${ad}`}
              alt={`Banner ${i + 1}`}
              style={{ display: i === current ? 'block' : 'none' }}
              className="w-full sm:h-[250px] h-full object-cover"
            />
          ))
        )}
      </div>
    </>
  );
};

export default HorizontalSlides;
