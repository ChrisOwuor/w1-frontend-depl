"use client"
import React, { useEffect, useState } from 'react';

export const EditStakeButtons = () => {

    const [buttons, setButtons] = useState({
        b1: 100,
        b2: 500,
        b3: 1000,
        b4: 5000,
        b5: 20000,
        b6: 50000,
        b7: 80000,
        b8: 100000
    })

    useEffect(() => {
        console.log(buttons)
    }, [buttons])


    return (
        <div className="min-w-[200px]">
            <div className="flex items-center p gap-x-2">
                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 1</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b1: e.target.value
                        }
                    ))} id="" placeholder={buttons.b1} />
                </div>
                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 2</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b2: e.target.value
                        }
                    ))} id="" placeholder={buttons.b2} />
                </div>
                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 3</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b3: e.target.value
                        }
                    ))} id="" placeholder={buttons.b3} />
                </div>
            

                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 4</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b4: e.target.value
                        }
                    ))} id="" placeholder={buttons.b4} />
                </div>
                

                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 5</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b5: e.target.value
                        }
                    ))} id="" placeholder={buttons.b5} />
                </div>

                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 6</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b6: e.target.value
                        }
                    ))} id="" placeholder={buttons.b6} />
                </div>
                
                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 7</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b7: e.target.value
                        }
                    ))} id="" placeholder={buttons.b7} />
                </div>

                <div className="flex flex-col gap-y-1 sButton">
                    <lable className="t_c_1 p_2_sm font-bold">Button 8</lable>
                    <input type="text" name="stakeButtons" className='t_c_1 p_1_sm font-bold rounded' onChange={(e) => setButtons(prev => (
                        {
                            ...prev,
                            b8: e.target.value
                        }
                    ))} id="" placeholder={buttons.b8} />
                </div>
            </div>

            <div className="flex items-center ">
                <button type='button' className="submit bg_1 rounded" onClick={()=>alert('Coming soon!')}>Submit</button>
            </div>
        </div>
    );
}