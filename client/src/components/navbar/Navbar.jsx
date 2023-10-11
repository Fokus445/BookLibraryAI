import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import { Login, Signup, Logout, Popout} from '../';

const Navbar = ({ loggedIn }) => {
  const [toggleMenu, setToggleMenu] = useState(false);

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
      {!loggedIn ? (
        <div className="navbar-sign">
            <Login/>
            <Signup/>
        </div>
      ) : (<div className="navbar-sign">
          <div className="signin-btn">
            <Logout/>
          </div></div>)

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
            {!loggedIn && (
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