import React, { useState, useEffect } from 'react';


import { Footer, Header } from './containers';
import { Navbar } from './components';

import './App.css';

import axios from "axios";
import { Library } from './containers';

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true); // If a token is present, set loggedIn to true
      setAuthToken(token);
    }
  }, []);

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} />
      <Header />
      <Library />
      <Footer />
    </div>
  );
};

export default App;
