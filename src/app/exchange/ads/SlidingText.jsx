import { getMessage } from 'src/app/api/exchange/messages'
import React, { useEffect, useState } from 'react'

const SlidingText = () => {
    const [msg, setMsg] = useState("🚀 Aura Bet")
    const [contentIndex, setContentIndex] = useState(0);
    const [contents, setContents] = useState([])

    useEffect(() => {
        const handleAnimationIteration = () => {
            setContentIndex((prevIndex) => (prevIndex + 1) % contents.length);
        };

        const animatedElements = document.querySelectorAll('.animate-slideRight');

        animatedElements.forEach((element) => {
            element.addEventListener('animationiteration', handleAnimationIteration);
        });

        return () => {
            animatedElements.forEach((element) => {
                element.removeEventListener('animationiteration', handleAnimationIteration);
            });
        };
    }, []);


    useEffect(() => {
        (async () => {
            const msg = await getMessage()
            if (msg) {
                if (msg.length > 0) {
                    setContents([msg[0].message])
                } else {
                    setContents(["Welcome to Aurabet"])
                }
            }
        })()
    }, [])

    return (

        <div className="relative h-[4vh]  min-mk:mt-2">
            <img src="/sliding_screen_bg.png" alt="" className='h-[4vh] opacity-60 w-full object-cover rounded-t' />
            <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden flex sliding- to-orange-500/[0.1] h-[4vh]">

                <div className={`flex justify-end items-center overflow-hidden  animate-slidindAds min-w-[1300px]  text-gray-200 `}>
                    <p className={`text-end pr-1 pl-0 tracking-wider  w-full py-1 `}>
                        {contents[0]}
                    </p>

                </div>
            </div>
        </div>

    )
}

export default SlidingText

