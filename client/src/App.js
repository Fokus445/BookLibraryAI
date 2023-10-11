import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';



import { BookDetails, Footer, Header, Library} from './containers';
import { Navbar } from './components';

import './App.css';

import axios from "axios";

const API_URL = "/api/v1";





const App = () => {
  const [loggedIn, setLoggedIn] = useState(false); 

  useEffect(() => {
    axios.get(API_URL + "/profiles/me/")
    .then((response) => {
      if (response.status === 200) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false)
      }
      
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setLoggedIn(false); 
      } else {
        console.error("Error:", error);
      }
    });

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
