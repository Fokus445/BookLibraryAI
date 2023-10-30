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

const rate_book = (book_uuid, rating) => {
  return axios
    .post(API_URL + `/rate_book/${book_uuid}/`, {
      rating
    })
    .then((response) => {
      console.log(response)
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

const remove_rating = ( rating_uuid ) => {
  return axios
    .delete(API_URL + "/remove_rating/" + rating_uuid)
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } 
      })
    .catch((error) => {
      if (error.response.status === 401) {
        console.log("U must log in")
      } else {
        console.error("Error:", error);
        throw error;
      }
    });
};

const check_rating = ( book_id ) => {
  return axios.get(API_URL + `/check_rating/${book_id}/`)
  .then((response) => {
    if (response.status === 200){
      return response.data.rating
    }
    else if (response.status === 404) {
      return false
    } 
    }).catch((error) => {
      if (error.response.status==401) {
        console.log("Check Rating Error")
        console.log(error)
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