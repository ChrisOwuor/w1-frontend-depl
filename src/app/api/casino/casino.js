import axios from "axios";

export const fetchGameData = async (casino_id) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_URL}/api/casino/getCasinoData`,
            {
                casino_id,
            }
        )

        const data = response.data;
        // console.log(data)
        return data.data; 
    } catch (error) {
        console.error(`Error fetching game data for ${casino_id}:`, error);
        return null; // Return null if there's an error
    }
};


export const getTeen2020 = async (casino_id) => {
    try {
        // const response = await axios.get(`http://178.156.145.55:8000/scrape?file_name=20-20%20Teenpatti`)

        // const data = response.data;
        // // console.log(data)
        // return data.data; 
    } catch (error) {
        console.error(`Error fetching game data for ${casino_id}:`, error);
        return null; // Return null if there's an error
    }
};

