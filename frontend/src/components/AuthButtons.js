import React from "react";
import { Link } from "react-router-dom"; // Assuming you are using React Router
import "./AuthButtons.css";

const AuthButtons = () => {
  return (
    <div className="auth-buttons">
      <Link to="/add" className="signup-button">Sign Up</Link>
      <Link to="/Login" className="login-button">Login</Link>
    </div>
  );
};

export default AuthButtons;
