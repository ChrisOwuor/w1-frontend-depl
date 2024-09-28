import axios from "axios";

// tunnel
/**
 * 
 * @param {String} url 
 * @param {String} method 
 * @param {Object} data 
 * @returns 
 */
export const sendHttpRequest = async (url, method, data = {}) => {
  try {
    const token = localStorage.getItem("tk");
    if (token) {
      let response;
      switch (method.toLowerCase()) {
        case "post":
          response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "get":
          response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        case "patch":
          response = await axios.patch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api${url}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          break;
        default:
          throw new Error("Unsupported method.");
      }
      return response;
    }
  } catch (error) {
    console.error("Request failed:", error);
    throw error;
  }
};

export const editExposureLimitSender = async (formData) => {
  try {
    const response = await sendHttpRequest("/users/exposure_limit_patch", "post", formData);
    return response;
  } catch (error) {
    console.error("Failed to handle exposure:", error);
    throw error;
  }
};
export const transact = async (formData, transaction_type) => {
  try {
    const response = await sendHttpRequest(`/ctr/${transaction_type === "deposit" ? "deposit" : "withdraw"}`, "post", formData);
    return response;
  } catch (error) {
    console.error("Failed to handle exposure:", error);
    throw error;
  }
};

export const editCreditRefSender = async (formData) => {
  try {
    const response = await sendHttpRequest("/users/credit_ref_patch", "post", formData);
    return response;
  } catch (error) {
    console.error("Failed to handle credit_ref:", error);
    throw error;
  }
};
