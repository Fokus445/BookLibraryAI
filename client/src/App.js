import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';



import { BookDetails, Footer, Header, Library} from './containers';
import { Navbar } from './components';

import './App.css';

import axios from "axios";

import Cookies from 'js-cookie';



const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    const token = Cookies.get();
    console.log(token)
    if (token) {
      setLoggedIn(true); // If a token is present, set loggedIn to true
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
