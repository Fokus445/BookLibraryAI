import axios from "axios";

const API_URL = "/api/v1/auth";

const signup = (email, first_name, last_name, password1, password2) => {
  return axios
    .post(API_URL + "/registration/", {
      email,
      first_name,
      last_name,
      password1,
      password2
    })
    .then((response) => {
      if (response.status === 201) {
        // Registration successful, send activation email
        console.log(response)
        console.log("Registration successful. Activation email sent.");
      }
      return response.data;
    });
};


const login = (email, password) => {
  return axios
    .post(API_URL + "/jwt/create", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;