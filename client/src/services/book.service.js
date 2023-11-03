import axios from "axios";

const API_URL = "/api/v1/books";


const details = (book_id) => {
    return axios
      .get(API_URL + `/${book_id}/`,)
      .then((response) => {
        if (response.status === 200) {
          return response.data
        } 
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          throw error.response
        } else {
          console.error("Error:", error);
          throw error;
        }
      });
};

const recommend = (title) => {
  return axios
    .post(API_URL + `/recommend/`,{
      title
    })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } 
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        throw error.response
      } else {
        console.error("Error:", error);
        throw error;
      }
    });
};



const bookService = {
  details,
  recommend,
};

export default bookService;