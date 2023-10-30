import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine, RiUser3Fill } from 'react-icons/ri';
import { useParams, Link } from 'react-router-dom';

import './navbar.css';
import { Login, Signup, Logout, Popout} from '../';

import axios from "axios";

import ProfileService from "../../services/profile.service";


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSingup] = useState(false);

  useEffect(() => {
    ProfileService.me()
      .then((response) => {
        setProfile(response); // Set the profile info
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleShowLogin = () => {
    if (!showLogin) {
      setShowLogin(true)
    } else {
      setShowLogin(false)
    }
  };

  const handleShowSignup = () => {
    if (!showSignup) {
      setShowSingup(true)
    } else {
      setShowSingup(false)
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <p className="logo-text">Book Recommender</p>
        </div>
        <div className="navbar-links_container">
          <p><a href="/">Home</a></p>
          <p><a href="#">Library</a></p>
          <p><a href="#">Features</a></p>
          <p><a href="#">Blog</a></p>
        </div>
      </div>
      {!profile ? (
        <div className="navbar-sign">
            <button className="login-btn" onClick={handleShowLogin}>Log In</button>
            {showLogin && <Login onClose={handleShowLogin} />}
            <button className="singup-btn" onClick={handleShowSignup}>
            Sign Up
          </button>
          {showSignup && <Signup onClose={handleShowSignup} />}
            
        </div>
      ) : (<div className="navbar-sign">
            <Link to={`/profiles/me/`} className="profile-detail-btn">
             <div className="user-info">
                <RiUser3Fill className="user-icon"/>
                <span className="user-name">{profile.first_name}</span>
              </div>
            </Link>
            <Logout/>
          </div>)

      }
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="var(--color-text)" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="var(--color-text)" size={27} onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <p><a href="/">Home</a></p>
              <p><a href="#">Library</a></p>
              <p><a href="#">Features</a></p>
              <p><a href="#">Blog</a></p>
            </div>
            {!profile && (
              <div className="navbar-menu_container-links-sign">
                <Login/>
                <Signup/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;