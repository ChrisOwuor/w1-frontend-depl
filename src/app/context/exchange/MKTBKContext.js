import React, { createContext, useEffect, useState } from "react";
import { fetchMKTBK } from "@/app/api/exchange";
import { INTERVAL } from "@/app/exchange/constants/mktfetchInterval";

export const MKTBKContext = createContext();

export const MKTBKProvider = ({ children }) => {
    const [mktBk, setMktBk] = useState({})
    const [mktIds, setMktIds] = useState([])

    const runner = async () => {
        try {
            console.log("Hitting here")
            const mkt_book = await fetchMKTBK(mktIds)
            if (mkt_book.length > 0) {
                // console.log(mkt_book)
                setMktBk(mkt_book[0])
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        if (mktIds.length>0) {
            runner(mktIds)
            const intervalId = setInterval(runner, INTERVAL);
            return () => clearInterval(intervalId);
        }
    }, [mktIds])

    const addToMktIds = (mktIds_) => {
        console.log("adding")
        let currentListState = mktIds
        if (mktIds_.length > 0) {
            mktIds_.map(i => currentListState.push(i))
        }
        setMktIds(currentListState)
    }


    return (
        <MKTBKContext.Provider
            value={{ addToMktIds, mktBk }}
        >
            {children}
        </MKTBKContext.Provider>
    );
};
