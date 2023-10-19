import axios from "axios";

const API_URL = "/api/v1/ratings";


const ratings = () => {
    return axios
      .get(API_URL + "/books/")
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