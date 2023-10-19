import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "./signup.css";
import { Popout } from '../';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const handleSignUpSuccess = () => {
    setShowSignUpSuccess(true);
    setTimeout(() => {
      setShowSignUpSuccess(false);
    }, 5000);
  };

  const clearForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword1("");
    setPassword2("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation

    try {
      await AuthService.signup(email, first_name, last_name, password1, password2).then(
        (response) => {
          console.log("Success login");
          setOpen(false); // Close the Modal
          clearForm();
          handleSignUpSuccess();
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

  return (
    <div>
      {showSignUpSuccess && (
        <Popout message="Registration successful. Activate your email." />
      )}

      <button className="singup-btn" onClick={onOpenModal}>
        Sign Up
      </button>
      {open && (
        <Modal open={open} onClose={onCloseModal} center className="modal">
          <h2 className="signup-header">Sign Up</h2>
          <form onSubmit={handleSignup} className="modal-form">
            {errors.email && <div className="error-message">{errors.email}</div>}
            <input
              className="input-email"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="input-container">
              <div className="input-container-half">
                {errors.first_name && (
                  <div className="error-message">{errors.first_name}</div>
                )}
                <input
                  className="input-firstname"
                  type="text"
                  placeholder="first name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="input-container-half">
                {errors.last_name && (
                  <div className="error-message">{errors.last_name}</div>
                )}
                <input
                  className="input-lastname"
                  type="text"
                  placeholder="last name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            {errors.password1 && (
              <div className="error-message">{errors.password1}</div>
            )}

            <input
              className="input-password"
              type="password"
              placeholder="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
            {errors.password2 && (
              <div className="error-message">{errors.password2}</div>
            )}
            <input
              className="input-password"
              type="password"
              placeholder="repeat password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {errors.non_field_errors && (
              <div className="error-message error-center">{errors.non_field_errors}</div>
            )}
            {loading ? (
              <div className="loading-animation">Loading...</div>
            ) : (
              <button className="btn-submit btn-submit__singup" type="submit">
                Loading...
              </button>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Signup;
