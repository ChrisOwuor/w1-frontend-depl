import axios from "axios";

export const addMsg = async (message) => {
    try {

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/add`,
            { message },
        );
        if (res && res.data) {
            return res.data
        }
    } catch (error) {
        console.error(error);
    }
};


export const getMessage = async () => {
    try {

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/messages/`,
        );
        if (res && res.data) {
            return res.data
        }
    } catch (error) {
        console.error(error);
    }
};

