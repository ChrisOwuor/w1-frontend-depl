import { styling1 } from "@/app/exchange/(e)/custom_styling/styling";
import React, { useEffect, useState } from "react"


const EmptyOddCell = ({ type, team, handlePlaceBet, eventId, setSelectedOdd, eventName, marketId, styling1, selectionId, marketName, dontShowSize }) => {
    return (
        <div
            className={`${styling1.oddsStyle} ${type === "back" ? styling1.backOdd : styling1.layOdd}`}
            onClick={() => {
                handlePlaceBet({
                    betType: type,
                    selectionName: team,
                    price: 1.00,
                    stake: 0,
                    eventId: eventId,
                    eventName: eventName,
                    mktId: marketId,
                    selectionId,
                    marketName
                });
                setSelectedOdd(eventId);

            }}
        >
            <p className={` ${styling1.oddsP}`}>
                <span className='text-transparent'>0</span>
            </p>
            {
                !dontShowSize && (
                    <p className={` ${styling1.oddsP}`}>
                        <span className='text-transparent'>0</span>
                    </p>
                )
            }

        </div>
    );
};


const NoSelection = ({ type, dontShowSize }) => {
    return (
        <div
            className={`${styling1.oddsStyle} ${type === "back" ? styling1.backOdd2 : styling1.layOdd2}`}
        >
            <p className={` ${styling1.oddsP}`}>
                <span className='text-transparent'>0</span>
            </p>
            {!dontShowSize &&
                <p className={` ${styling1.oddsP}`}>
                    <span className='text-transparent'>0</span>
                </p>}

        </div>
    );
};


const OddsComponent = ({ type, team, price, size, handlePlaceBet, eventId, setSelectedOdd, eventName, marketId, styling1, selectionId, marketName, dontShowSize }) => {
    const [isFlicker, setIsFlicker] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsFlicker(false);
        }, 200)

    }, [isFlicker]);


    useEffect(() => {
        setIsFlicker(prev => !prev);
    }, [price]);

    return (
        <div
            className={`${styling1.oddsStyle} ${type === "back" ? styling1.backOdd : styling1.layOdd} ${isFlicker ? 'bg-secondary/[0.3]' : ''}`}
            onClick={() => {
                handlePlaceBet({
                    betType: type,
                    selectionName: team,
                    price: price,
                    stake: 0,
                    eventId: eventId,
                    eventName: eventName,
                    mktId: marketId,
                    selectionId,
                    marketName
                });
                setSelectedOdd(eventId);
            }}
        >
            <p className={`${styling1.oddsT1}`}>{price}</p>

            {
                !dontShowSize && <p className={`${styling1.oddsP}`}>{size}</p>
            }
        </div>
    );
};


export {
    OddsComponent,
    EmptyOddCell,
    NoSelection
}