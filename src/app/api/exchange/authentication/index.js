import axios from "axios";

export const handleKey = async (passcode, token) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/handlekey`,
            { passcode },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res && res.data) {
            return res.data
        }
    } catch (error) {
        console.error(error);
    }
};