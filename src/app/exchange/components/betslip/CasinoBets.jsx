import React, { useContext, useEffect, useState } from 'react';
import { getUserBets } from '../../../auth/casino/casino';
import { NAVContext } from '@/app/context/NavContext';
import { CasinoContext } from '@/app/context/CasinoContext';

const CasinoBets = () => {
  const [bets, setBets] = useState([]);
  const { openBetForm } = useContext(CasinoContext);
  const { activeCasino } = useContext(NAVContext);

  useEffect(() => {
    let intervalId;

    const fetchBets = async () => {
      try {
        if (activeCasino) {
          const bets_ = await getUserBets(activeCasino.name);
          setBets(bets_);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch the bets every 5 seconds
    if (activeCasino) {
      fetchBets(); // Fetch immediately
      intervalId = setInterval(fetchBets, 5000);
    }


    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [activeCasino, openBetForm]);
  const styles_01 = `px-3 py-1  text-md text-black font-bold tracking-wide`
  return (
    <div className="flex flex-col">
      <div className="flex items-center bg-black p-2">
        <p
          className='text-md font-bold'> My Bets</p>
      </div>
      <table className="w-full text-left rtl:text-right">
        <thead className="text-black tracking-wider text-md font-medium">
          <tr>
            <th scope="col" className="px-3 py-2">
              Market Name
            </th>
            <th scope="col" className="px-3 py-2">
              Odds
            </th>
            <th scope="col" className="px-3 py-2">
              Stake
            </th>
          </tr>
        </thead>
        <tbody className='bg-gray'>
          {bets && bets.length > 0 &&
            bets.map((betObj, i) => {

              return (
                <tr key={i} className={`border-b border-gray-500 bg-back hover:bg-gray-200/[0.1]`}>
                  <td className={styles_01}>{`${i + 1}. `}{`${betObj.selection}`}</td>
                  <td className={styles_01}>{parseFloat(betObj.rate).toFixed(2)}</td>
                  <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>

                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CasinoBets;
