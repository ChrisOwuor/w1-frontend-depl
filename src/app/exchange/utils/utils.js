import { iconOBJS } from "../constants";

export function formatNumber(number) {
  if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber} K`;
  } else {
    return `${Math.round(number)}`;
  }
}

export function separateTeams(matchString) {
  let indexOfV = matchString.indexOf(' v ');
  if (indexOfV === -1) {
    indexOfV = matchString.indexOf(' @ ');
  }

  // Separate the string into two parts based on the index of " v " or " @ "
  if (indexOfV !== -1) {
    const team1 = matchString.slice(0, indexOfV).trim();
    const team2 = matchString.slice(indexOfV + (matchString[indexOfV + 1] === '@' ? 2 : 3)).trim();
    return [team1, team2];
  } else {
    // If neither " v " nor " @ " is found, return the whole string as team1
    return [matchString.trim(), ''];
  }
}



export const getIcon = (name) => {
  const found = iconOBJS.filter(icon => icon.name === name)
  if (found.length > 0) {
    return found[0]
  } else {
    return null
  }
}

/**
 * 
 * @param {Number} stake 
 * @param {Number} price 
 * @param {Boolean} isLineMarket 
 * @returns 
 */
export const updateProfit = (stake, price, isLineMarket) => {
  if (stake > 0 && price > 0) {
    if (isLineMarket) {
      return parseFloat(stake).toFixed(2);
    } else {
      const profit = ((stake * price) - stake).toFixed(2);
      if (profit > 0) {
        return parseFloat(profit);
      } else {
        return 0.00;
      }
    }
  } else {
    return 0.00;
  }
}

export const updateBookmakerProfit = (price) => {
  return parseFloat(price).toFixed(2);
}


export const startsWithStr = (inputString) => {
  return typeof inputString === 'string' && inputString.startsWith("str_");
}