import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';



import { BookDetails, Footer, Header, Library} from './containers';
import { Navbar } from './components';

import './App.css';

import axios from "axios";




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
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} />
        <Header />
          <Routes>
            <Route path="/" element={<Library/>} />
            <Route path="/book/:isbn" element={<BookDetails/>} />
          </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
