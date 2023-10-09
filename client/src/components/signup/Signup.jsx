import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./signup.css"



import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}

const Signup = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(email, first_name, last_name, password1, password2).then(
        (response) => {
          console.log("Success login")
          console.log(response.access)
          const token = response.access;



          setAuthToken(token);

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
      <button onClick={onOpenModal}>Sign Up</button>
      {open &&  (<Modal open={open} onClose={onCloseModal} center className="modal">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup} className="modal-form">

        <input className='input-email'
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input className='input-email'
          type="text"
          placeholder="first name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
         <input className='input-email'
          type="text"
          placeholder="last name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input className="input-password"
          type="password"
          placeholder="password"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
        />
        <input className=" input-password"
          type="password"
          placeholder="repeat password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button className="btn-submit btn-submit__singup" type="submit">Sign up</button>
      </form>
      </Modal>)}
      
    </div>
  );
};

export default Signup;