import axios from "axios";

const API_URL = "/api/v1/ratings";


const ratings = () => {
    return axios
      .get(API_URL)
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

const rate_book = (book_id, rating) => {
  return axios
    .post(API_URL + `/rate_book/${book_id}/`, {
      rating
    })
    .then((response) => {
      if (response.status === 201) {
        return response.data
      } 
    })
    .catch((error) => {
      if(error.response.status==401){
        console.log("U must login rate book")
        return error
      }
      else {
        console.error("Error:", error);
        return error
      }
    });
};

const remove_rating = ( rating_id ) => {
  return axios
    .delete(API_URL + "/remove_rating/" + rating_id + "/")
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } 
      })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log("U must log in")
        return error
      } else {
        console.error("Error:", error);
        return error
      }
    });
};

const check_rating = ( book_id ) => {
  return axios.get(API_URL + `/check_rating/${book_id}/`)
  .then((response) => {
    if (response.status === 200){
      return response.data
    }
    }).catch((error) => {
      if (error.response.status==401) {
        console.log("Check Rating Error")
        console.log(error)
        return error
      }
      else if (error.response.status==404) {
        return error
      }
  })};



const ratingService = {
    ratings,
    rate_book,
    remove_rating,
    check_rating,
  };
  
  export default ratingService;