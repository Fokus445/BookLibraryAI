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

  useEffect(() => {
    ProfileService.me()
      .then((response) => {
        setProfile(response); // Set the profile info
        console.log(response)
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error as needed, e.g., show an error message to the profile.
      });
  }, []);

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
            <Login/>
            <Signup/>
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
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        ) : (
          <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
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