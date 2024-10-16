import axios from "axios";

export const fetchGameData = async (casino_id) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getCasinoData`,
            {
                casino_id,
            }
        )

        const data = response.data;
        return data.data; // Return the relevant data
    } catch (error) {
        console.error(`Error fetching game data for ${casino_id}:`, error);
        return null; // Return null if there's an error
    }
};
