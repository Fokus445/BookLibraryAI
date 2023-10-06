import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./logout.css"

import axios from 'axios';


const Logout = () => {


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await AuthService.logout().then(
        (response) => {
          console.log("Success logout")
          console.log(response.access)

          window.location.href = "/"
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      
    </div>
  );
};

export default Logout;