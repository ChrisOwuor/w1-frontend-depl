import axios from "axios";

export const fetchGameData = async (casino_id) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/api/casino/getCasinoData`,
      {
        casino_id,
      }
    );

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

// gap

export const getGapCasinos = async ({ type, provider, category }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getCasinos`,
      {
        type,
        provider,
        category
      }
    );

    const data = response.data;
    return data.data;
  } catch (error) {
    console.error(`Error fetching game data:`, error);
    return null; // Return null if there's an error
  }
};

export const getProviders = async (casino_code) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getProviders`
    );

    const data = response.data;
    return data.data;
  } catch (error) {
    console.error(`Error fetching game data for ${casino_code}:`, error);
    return null; // Return null if there's an error
  }
};

export const getCategories = async ({provider}) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/getCategories?p=${provider}`
    );

    const data = response.data;
    
    return data.data;
  } catch (error) {
    console.error(`Error fetching game data for ${casino_code}:`, error);
    return null; // Return null if there's an error
  }
};


const getip = async () => {
  let clientIp = null;
  let attempts = 0;

  while (!clientIp && attempts < 5) {
    // Retry up to 5 times
    try {
      // Fetch the client's IP address
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      attempts++;
      console.error(
        `Attempt ${attempts}: Error fetching client IP address. Retrying...`,
        error
      );

      // Wait for 2 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (!clientIp) {
    throw new Error(
      "Unable to fetch client IP address after multiple attempts."
    );
  }

  return clientIp;
};

export const launchGame = async (casino) => {
  try {
    // Get the user's token
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Fetch the client's IP address with retry
    const ip = await getip();

    // Make the API call to launch the game
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/launchCasino`,
      {
        game_code: casino.game_code,
        game_id: casino.game_id,
        game_name: casino.game_name,
        sub_provider_name: casino.sub_provider_name,
        category: casino.category,
        provider_name: casino.provider_name,
        clientIp: ip,
      }
    );

    // Check the response status
    if (response && response.status === 200) {
      // Extract the URL and token
      const gameUrl = response.data.data.url;
      // window.location.replace(gameUrl);

      return { code: 1, gameUrl };
    }
  } catch (error) {
    console.error("Error launching casino game:", error);
  }
};
export const launchGame2 = async (casino) => {
  try {
    // Get the user's token
    const token = localStorage.getItem("tk");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Fetch the client's IP address with retry
    const ip = await getip();

    // Make the API call to launch the game
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/casino/launchCasino`,
      {
        game_code: casino.game_code,
        game_id: casino.game_id,
        game_name: casino.game_name,
        sub_provider_name: casino.sub_provider_name,
        category: casino.category,
        provider_name: casino.provider_name,
        clientIp: ip,
      }
    );

    // Check the response status
    if (response && response.status === 200) {
      // Extract the URL and token
      const gameUrl = response.data.data.url;
      // window.location.replace(gameUrl);

      return { code: 1, gameUrl };
    }
  } catch (error) {
    console.error("Error launching casino game:", error);
  }
};
