import axios from "axios";

export const placeBet = async (toSend) => {
  try {
    const token = localStorage.getItem("tk");

    const requiredFields = [
      'sport_id', 'sport_name', 'match_id', 'match_name',
      'market_name', 'market_id', 'selection_name', 'selection_id',
      'stack', 'price', 'type',
    ];

    // Check for missing properties
    const missingFields = requiredFields.filter(field => !toSend[field]);
    if (missingFields.length > 0) {
      alert(`Missing required fields: ${missingFields.join(', ')}`);
      return false;
    }

    if (!token) {
      alert("Oops, insufficient privileges");
      return false;
    }

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bets/placebet/ex`,
      toSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200 && res.data.statusCode === 200) {
      alert("Bet successfully placed");
      return true;
    } else {
      alert("Bet not placed");
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};