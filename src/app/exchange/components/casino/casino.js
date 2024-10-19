// place bet

import axios from "axios";


export const placeCasinoBet = async (betData) => {
    try {
        const token = localStorage.getItem("tk");

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/placeBet`,
            { ...betData },
            {

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.status == 200) {
            return {
                message: res.data.message,
                status: "0"
            }
        }
        if (res.status == 400) {
            return {
                message: res.data.message,
                status: "1"
            }
        }
    } catch (error) {
        console.error(error)
        return {
            message: error?.response?.data?.message,
            status: "1"
        }
    }
}

export const getUserBets = async (casino_id) => {
    try {
        const token = localStorage.getItem("tk");

        // Make a POST request to get user bets
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getUserBets`,
            { casino_id },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res) {
            return res.data.data;
        }
    } catch (error) {
        console.error("Error fetching user bets:", error);
    }
};
