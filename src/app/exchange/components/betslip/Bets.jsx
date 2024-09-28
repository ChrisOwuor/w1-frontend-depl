import React from 'react';

const Bets = ({ bets, type }) => {
  const styles_01 = `px-3 py-1 border-r border-gray-500 text-[0.725rem] text-black font-bold tracking-wide`
  return (
    <div className="flex flex-col">
      <section className="w-full">
        <table className="bg-gray-100 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-black tracking-wider bg-gray-700 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-3 py-1">
                Market Name
              </th>
              <th scope="col" className="px-3 py-1">
                Odds
              </th>
              <th scope="col" className="px-3 py-1">
                Stake
              </th>
              <th scope="col" className="px-3 py-1">
                Potential Profit
              </th>
            </tr>
          </thead>
          <tbody className='bg-gray-900'>
            {/* {bets.length === 0  && (
              <p className="px-3 py-1 text-[0.8rem] font-bold tracking-wide">No data at the moment</p>
            )} */}
            {bets && bets.length > 0 &&
              bets.map((betObj, i) => {
            
                return (
                  <tr key={i} className={`border-b border-gray-500 ${betObj.type === 'back' ? 'bg-[#629DDC]/[0.4]' : 'bg-[#F4AED8]/[0.4]'} hover:bg-gray-200/[0.1]`}>
                    <td className={styles_01}>{`${i + 1}. `}{`${betObj.market_name}: ${betObj.selection_name}`}</td>
                    <td className={styles_01}>{parseFloat(betObj.price).toFixed(2)}</td>
                    <td className={styles_01}>{parseFloat(betObj.stack).toFixed(2)}</td>
                    <td className={styles_01}>{parseFloat(betObj.potential_profit).toFixed(2)}</td>

                  </tr>
                )
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Bets;
