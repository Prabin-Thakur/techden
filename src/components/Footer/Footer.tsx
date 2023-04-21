import React from "react";
import "./Footer.scss";
import payment from "../../assets/images/payment.png";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <Link to="/products/camera" className="link">
            Camera
          </Link>
          <Link to="/products/smartphone" className="link">
            Smartphone
          </Link>
          <Link to="/products/wearable" className="link">
            Wearable
          </Link>
          <Link to="/products/audio" className="link">
            Audio
          </Link>
          <Link to="/products/pc" className="link">
            Pc
          </Link>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Experience the latest in technology with our online store. Shop a
            wide selection of cutting-edge products and gadgets for all your
            needs.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            We'd love to hear from you! Send us a message and we'll get back to
            you as soon as possible.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <p className="logo">
            TECH<span>DEN</span>
          </p>
          <span className="copyright">
            © Copyright 2023. All Rights Reserved
          </span>
        </div>
        <div className="right">
          <img src={payment} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
