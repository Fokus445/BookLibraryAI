import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(email, password, re_password).then(
        (response) => {
          // check for token and user already exists with 200
          //   console.log("Sign up successfully", response);
          //window.location.reload();
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
        <input className="input-password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className=" input-password"
          type="re_password"
          placeholder="repeat password"
          value={re_password}
          onChange={(e) => setRe_password(e.target.value)}
        />
        <button className="btn-submit btn-submit__singup" type="submit">Sign up</button>
      </form>
      </Modal>)}
      
    </div>
  );
};

export default Signup;