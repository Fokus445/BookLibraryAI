import React, { useState } from "react";
import { Signup } from "../";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './login.css'

import axios from 'axios';



const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showSignup, setShowSignup] = useState(false);
  
  const [open, setOpen] = useState(true)

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false); // New loading state


  const onCloseModal = () => {
    setOpen(false);
    props.onClose();
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        response => {
          console.log("Success login")
          setOpen(false)
          clearForm();
          window.location.reload();
        },
        (error) => {
          if (error.response && error.response.data) {
            setErrors(error.response.data);
          }
        } 
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleShowSignup = () => {
    if (!showSignup) {
      setShowSignup(true)
      setOpen(false)
    } else {
      setShowSignup(false)
    }
    
  }

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2 className="login-header">Login</h2>

        <form onSubmit={handleLogin}>
        {errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
        <input className="input-email"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
        <input className="input-password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.non_field_errors && (
          <div className="error-message error-center">{errors.non_field_errors}</div>
        )}
        {loading ? (
              <div className="loading-animation">Loading...</div>
            ) : (
              <button className="login-submit" type="submit">Log in</button>
            )}
        <div className="signup-login-link">
          <p>Don't have an account?</p>
          <a href="#" onClick={handleShowSignup}>Sign Up</a>
        </div>
      </form>
      </Modal>
      {showSignup && <Signup onClose={handleShowSignup} />}
      </div>
  );
};

export default Login;