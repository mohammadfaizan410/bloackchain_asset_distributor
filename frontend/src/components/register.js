import React from "react";
import blueGradient from "../assets/images/blue-gradient.png";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="register-wrapper">
        <div className="register-main">
        <div className="app-info-register">
        </div>
        <div className="register-form"></div>
        </div>
        {/* <Link to="/login">Login</Link> */}
    </div>
  );
}