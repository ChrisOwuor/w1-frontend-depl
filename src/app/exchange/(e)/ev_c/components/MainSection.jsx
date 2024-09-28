"use client"
import React from 'react'
import Markets from './Markets';



const MainSection = () => {

    return (
        <div className='flex flex-col gap-y-2'>
            <div className='grid grid-cols-12'>
                {/* <div className='col-span-12'></div> */}
                <div className='col-span-12 bg-gray-800 w-full overflow-hidden'>
                    <p className='slide-text text-gray-200 tracking-wide uppercase mr-1 w-full'>
                        🚀 Aura Betting Experience! Grab our number 1 offer now and the thrill of victory awaits! 🏆💰 #BetBold #WinBig 🎲🎉
                    </p>
                </div>

            </div>
            <div className='grid grid-cols-8 h-full'>

                <div className='col-span-8 max-md:col-span-8'>
                    <Markets />
                </div>

            </div>
        </div>
    )
}

export default MainSection