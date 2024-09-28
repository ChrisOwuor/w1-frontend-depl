import React, { useState, useEffect } from 'react';

const InPlayFeed = () => {
    const [orangeOn, setOrangeOn] = useState(true);
    const [greenOn, setGreenOn] = useState(false);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Toggle the state of orange and green lights
        setOrangeOn(prevState => !prevState);
        setGreenOn(prevState => !prevState);
      }, 500);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className='flex items-center gap-x-1'>
        {/* <p className={`box ${orangeOn ? 'bg-orange-500' : 'bg-white'} text-transparent rounded-full h-[5px] w-[5px]`}>1</p> */}
        <p className={`box ${greenOn ? 'bg-green-500' : ''} text-transparent rounded-full h-[5px] w-[5px]`}>1</p>
      </div>
    );
  };
  
  export default InPlayFeed;