import React from 'react';
import './footer.css';

const Footer = () => (
  <div className="footer section__padding">
    <div className="footer-heading">
      <h1 className="gradient__text">Try It Out</h1>
    </div>

    <div className="footer-links">
      <div className="footer-links_logo">
       
        <p>BookRecommender, <br /> All Rights Reserved</p>
      </div>
      <div className="footer-links_div">
        <h4>Links</h4>
        <p>Overons</p>
        <p>Social Media</p>
        <p>Counters</p>
        <p>Contact</p>
      </div>
      <div className="footer-links_div">
        <h4>Company</h4>
        <p>Terms & Conditions </p>
        <p>Privacy Policy</p>
        <p>Contact</p>
      </div>
      <div className="footer-links_div">
        <h4>Get in touch</h4>
        <p>info@bookrecommender.com</p>
      </div>
    </div>

    <div className="footer-copyright">
      <p>@2023 BookRecommender. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
