import { eventTypesList } from "src/app/exchange/constants/events";
import axios from "axios";

export const fetchPopularSportsEvents = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/popular/?temp=2`;
    const res = await axios.get(url);
    if (res && res.data) {
      // console.log(res.data)
      return res.data.popular;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const getSportHomeMatch = async (sp) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/getSportHome?sp=${sp}&temp=2`;
    const res = await axios.get(url);
    if (res && res.data) {
      // console.log(res.data)
      return res.data.popular;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchPopularEvents = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/popular`;
    const res = await axios.get(url);
    if (res && res.data && res.data.length > 0) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};


export const fetchMKTBK = async (marketIds) => {
  const chunkSize = 20
  const chunks = [];

  // Chunk the marketIds into groups
  for (let i = 0; i < marketIds.length; i += chunkSize) {
    chunks.push(marketIds.slice(i, i + chunkSize));
  }

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requests = chunks.map((chunk) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/mktbk`,
        { mkt: chunk.join(",") },
        config
      )
    );

    // Wait for all requests to complete
    const responses = await Promise.all(requests);

    // Combine all responses
    const combinedResponse = responses.reduce((acc, response) => {
      return acc.concat(response.data || []);
    }, []);

    return combinedResponse;
  } catch (error) {
    console.error("Error while fetching market books:", error);
    return [];
  }
};
export const fetchCompetitions = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/cricket/competitions`
    );
    if (res && res.data) {
      const competitions__ = res.data.data.competitions;
      return competitions__.length > 0 ? competitions__ : [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSeries = async (eventTypeId) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getSeries`,
        {
          sport_id: eventTypeId,
          // is_active: "1",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data) {
        return res.data.series
        // console.log(res)
      }
    }
  } catch (error) {
    console.error(error);
  }
};



export const getMatches = async (sport_id, series_id) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getMatches`,
        {
          sport_id: sport_id,
          series_id: series_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data) {
        return res.data.matches
        // console.log(res)
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const getRaceEvents = async (sport_id, series_id) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getRaceEvents`,
        {
          sport_id: sport_id,
          series_id: series_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res && res.data) {
        return res.data.matches
        // console.log(res)
      }
    }
  } catch (error) {
    console.error(error);
  }
};


export const fetcheSportCompetitions = async (eventTypeId) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competitions/${eventTypeId}`
    );
    if (res && res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchSportCompetitionEventsBySportAndCompetitionId = async (
  sportId,
  competitionId
) => {
  try {
    if (sportId && competitionId) {
      const queryParams = new URLSearchParams({
        sportId,
        competitionId,
      }).toString();

      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_competition_events?${queryParams}`;
      const res = await axios.get(url);

      if (res && res.data) {
        const data = res.data.length > 0 ? res.data : [];
        return data;
      }
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};




export const fetchSportCompetitionEvents = async (sport_id, competitionId) => {
  try {
    if (sport_id) {
      const queryParams = new URLSearchParams({
        sport_id,
      }).toString();
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sport_events?${queryParams}`;
      const res = await axios.get(url);
      if (res && res.data && res.data.length > 0) {
        return res.data[0].events;
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetcheEventsTypes = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/sports`
    );
    if (res && res.data && res.data.length > 0) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getEvents = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActiveEvents`
    );
    if (res && res.data) {
      return res.data.events;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetcheEventMarkets = async (event_id, sport_id) => {
  try {
    if (event_id && sport_id) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/event_markets`,
        {
          match_id: event_id,
          sport_id: sport_id
        }
      );
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const getDefaultMarket = async (event_id, sport_id) => {
  try {
    if (event_id && sport_id) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getDefaultMarket`,
        {
          match_id: event_id,
          sport_id: sport_id
        }
      );
      if (res && res.data && res.data.length > 0) {
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchEventFancyMarkets = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/event_fancy?${queryParams}`
      );
      if (res && res.data && !res.data.data) {
        // console.log(res)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};




export const getBookmakerMarket = async (event_id) => {
  try {
    if (event_id) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getBookmakerMarkets`,
        { match_id: event_id }
      );
      if (res && res.status === 200 && res.data && res.data.code === 0) {
        return res.data.bookmakerMarkets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};




/**
 * 
 * @param {string} event_id 
 * @returns 
 */
export const getFancyMarkets = async (event_id, category) => {
  try {
    if (event_id) {
      const body = {
        is_active: "1",
        category: category,
        match_id: event_id,
        pageno: "",
        limit: "",
      }
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getFancyMarkets`,
        body

      );
      if (res && res.status === 200) {
        return res.data.markets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const fetcheEventScores = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_s?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getScores = async (event_id) => {
  try {
    if (event_id) {

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/getScores`,
        {
          match_id: event_id
        }
      )
      if (res && res.status === 200) {
        return res.data.scores;
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const fetchEventInnings = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_in?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};



export const fetchEventIncidents = async (event_id) => {
  try {
    if (event_id) {
      const queryParams = new URLSearchParams({
        eventId: event_id,
      }).toString();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/exchange/e_inc?${queryParams}`
      );
      if (res) {
        // console.log(res.data)
        return res.data;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getInplayMatches = async (sportName, sportId, page) => {
  try {
    if (sportName) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getInplayMatches`
        ,
        {
          sport_name: sportName,
          sport_id: sportId,
          pageno: page,
        }
      );
      if (res && res.status === 200) {
        return res.data;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const getActiveMarkets = async (match_id, sportId) => {
  try {
    if (sportId) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/getActiveMarkets`
        ,
        {
          match_id: match_id,
          sport_id: sportId,
        }
      );
      if (res && res.status === 200 && res.data) {
        return res.data.markets;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/userdata`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const user = res.data.other;
          return user;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserAcStatements = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getAccountStatements`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const ac_statements = res.data.account_statements;
          return ac_statements;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};


export const getAccountStatements = async (body) => {
  try {
    0
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/getAccountStatements`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res && res.status) {
        if (res.data.error != 3) {
          return res.data.account_statements
        }
      }
    }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}


export const fetchPL = async () => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/pl`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res) {
        if (res.status === 200) {
          const pl = res.data.profitLoss;
          return pl;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formatedDte =
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
  return formatedDte;
};

export const DisplayTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const today = new Date();
  const today_date = today.toDateString().toString();
  const new_date = date.toDateString().toString();
  const options = { hour12: true, hour: "numeric", minute: "2-digit" };
  const formatedTime =
    today_date === new_date
      ? "Today" + " " + date.toLocaleTimeString(undefined, options)
      : "Starts" + " " + date.toLocaleTimeString(undefined, options);
  return formatedTime;
};

export const formatTime = (timestamp) => {
  let now = new Date().getTime();
  let timedif = now - timestamp * 1000;
  const date = new Date(timedif);
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  return `${mins + ":" + secs}`;
};


export const getGlobalSetings = async () => {
  try {
    
    const token = localStorage.getItem("tk")
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_UPLINE_BACKEND}api/v1/getGlobalSettings`,
      {
        key: `${process.env.NEXT_PUBLIC_KEY}`
      },
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
    console.log(error);
  }
};