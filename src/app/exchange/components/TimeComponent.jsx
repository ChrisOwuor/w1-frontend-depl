import { fetcheEventScores } from 'src/app/api/exchange'
import React, { useEffect, useState } from 'react'
import { SCORES_INTERVAL } from '../constants/mktfetchInterval'

const TimeComponent = ({ eventId, pass }) => {
    const [scores, setScores] = useState({})
    const [loadin, setLoadin] = useState(true)
    useEffect(() => {
        if (eventId) {
            const run = async () => {
                console.log(eventId)
                const scores = await fetcheEventScores(eventId)
                console.log(scores)
                if (scores.length > 0) {
                    setScores(scores[0])
                    setLoadin(false)
                }
            }
            run()
            const intervalId = setInterval(run, SCORES_INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [])

    return (
        <div>
            {pass ?
                <div className="flex justify-center items-center w-full h-full">
                    <p className='text-[0.8rem]  tracking-wide text-gray-200 font-small'>In Play</p>
                </div> :
                <div className="flex flex-col justify-center items-center">
                    <p className='text-[0.8rem]  tracking-wide text-gray-200 font-small'>{date_.date}</p>
                    <p className='text-[0.8rem]  tracking-wide text-gray-200 font-small'>{date_.time} <span className='text-[0.5rem]'>UTC</span></p>
                </div>}
        </div>
    )
}

export default TimeComponent