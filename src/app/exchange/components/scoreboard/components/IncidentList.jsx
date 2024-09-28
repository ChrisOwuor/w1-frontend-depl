import React from 'react';

// Component for rendering a single incident item
const IncidentItem = ({ time, type, playerIn, playerOut, homeScore, awayScore }) => (
    <div className="col-span-12 grid grid-cols-12 border-b border-gray-400/[0.5] py-2">
        <div className="col-span-2 flex gap-x-2 items-center">
            <p className='text-gray-100 text-[0.75rem] font-bold'>{time}"</p>
            <p className='text-gray-100 text-[0.75rem] font-bold'>{type}</p>
        </div>
        <div className="col-span-10 border-l border-gray-400/[0.5] px-1 flex gap-x-4 items-start">
            {type === 'substitution' && (
                <>
                    <p className='text-gray-100 text-[0.85rem] font-bold'><span className='text-green-500'>In: </span>{playerIn.name}</p>
                    <p className='text-gray-100 text-[0.85rem] font-bold'><span className='text-orange-500'>Out: </span>{playerOut.name}</p>
                </>
            )}
            {type === 'goal' && (
                <>
                    <p className='text-gray-100 text-[0.85rem] font-bold'>{playerIn && playerIn.name}</p>
                    <div className="flex justify-center items-start gap-x-2">
                        <p className='text-gray-100 text-[0.85rem] font-bold '>{homeScore && homeScore}</p>
                        <p className='text-gray-100 text-[0.85rem] font-bold mx-1'>-</p>
                        <p className='text-gray-100 text-[0.85rem] font-bold'>{awayScore && awayScore}</p>
                    </div>
                </>
            )}
            {type === 'card' && (
                <>
                    <p className='text-gray-100 text-[0.85rem] font-bold '>{"In: "}{playerIn && playerIn.name}</p>
                    <p className='text-gray-100 text-[0.85rem] font-bold '>{"Out: "}{playerOut && playerOut.name}</p>
                </>
            )}
        </div>
    </div>
);

// Main component
const IncidentList = ({ incidents }) => {
    if (!incidents || !incidents.incidents) return null;

    return (
        <div className="grid grid-cols-12 w-full gap-x-1">
            {incidents.incidents.map((incident, i) => (
                <IncidentItem key={i} {...incident} />
            ))}
        </div>
    );
};

export default IncidentList;
