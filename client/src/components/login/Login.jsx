import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './login.css'

import axios from 'axios';



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  /*const navigate = useNavigate();*/

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        response => {
          console.log("Success login")
          console.log(response.access)

          window.location.href = "/"
        /*navigate("");
        window.location.reload();*/
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
      <button className="login-btn" onClick={onOpenModal}>Log In</button>
      {open && (<Modal open={open} onClose={onCloseModal} center>
        <h2 className="login-header">Login</h2>

        <form onSubmit={handleLogin}>

        <input className="input-email"
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
        <button className="login-submit" type="submit">Log in</button>
      </form>
      </Modal>)}
      

    </div>
  );
};

export default Login;