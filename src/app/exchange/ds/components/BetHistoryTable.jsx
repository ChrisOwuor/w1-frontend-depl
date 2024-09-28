import React from 'react'

const BetHistoryTable = (bets, initialFetch) => {
    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-200 tracking-wider bg-gray-700 dark:bg-gray-700 dark:text-gray-200">
                <tr>
                    <th scope="col" className="px-3 py-3">
                        Sport Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Event Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Market Name
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Selection
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Odds Req.
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Stack
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Profit & Loss
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Bet Placing Time
                    </th>
                    <th scope="col" className="px-3 py-3">
                        Bet Finishing Time
                    </th>
                </tr>
            </thead>
            <tbody>
                {bets.length === 0 && initialFetch && (
                    <p className="px-3 py-2 text-[0.8rem] font-bold tracking-wide">No data at the moment</p>
                )}
                {bets.length > 0 &&
                    bets.map((betObj, i) => (
                        <tr key={i} className="border-b border-gray-300 hover:bg-gray-200/[0.5]">
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{betObj.sportName}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{"--"}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{betObj.marketType}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{betObj.selection}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{betObj.type}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{"--"}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{"--"}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{"--"}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{Date.now()}</td>
                            <td className="px-3 py-2 border-r text-[0.8rem] font-bold tracking-wide">{Date.now()}</td>

                        </tr>
                    ))}
            </tbody>
        </table>
    )
}

export default BetHistoryTable