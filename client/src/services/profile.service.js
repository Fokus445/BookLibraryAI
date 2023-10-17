import axios from "axios";

const API_URL = "/api/v1/profiles";

const me = () => {
  return axios
    .get(API_URL + "/me/")
    .then((response) => {
      if (response.status === 200) {
        return response.data.profile // Include profile info here
      } else {
        return false
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        return false

      } else {
        console.error("Error:", error);
        throw error; // Re-throw the error for higher-level error handling
      }
    });
};



const searched_books = () => {
  return axios
    .get(API_URL + "/me/searched_books/")
    .then((response) => {
      if (response.status === 200) {
        return response.data; // Return the data on success
      } else {
        // Handle unexpected status codes here
        throw new Error(`Unexpected status code: ${response.status}`);
      }
    })
    .catch((error) => {
      // Handle any network errors, e.g., when the server is unreachable
      if (axios.isCancel(error)) {
        // Request was canceled
        console.error("Request was canceled:", error.message);
      } else if (axios.isAxiosError(error)) {
        // Axios-related error
        console.error("Axios error:", error);
      } else {
        // Other error
        console.error("Error:", error);
      }

      throw error; // Re-throw the error for higher-level error handling
    });
};




const profileService = {
  me,
  searched_books,

};

export default profileService;