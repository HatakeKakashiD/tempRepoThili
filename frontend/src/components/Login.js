import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";
import "./Login.css";
import Navbar from "./Navbar";


export default function Login() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  function handleLogin(e) {
    e.preventDefault();
  
    if (!validateEmail(address)) {
      setLoginError("Please enter a valid email address");
      return;
    }
  
    axios
      .post("http://localhost:8070/Customer/login", { address, password })
      .then((response) => {
        console.log('Response:', response);  // Log the entire response
        if (response.data.status === "success") {
          console.log('User ID:', response.data.userId);  // Log the userId
          alert("Login successful");
          navigate(`/get/${response.data.userId}`);
        } else {
          setLoginError("Invalid email or password"); 
        }
      })
      .catch((err) => {
        console.error('Error:', err);  // Log any errors
        alert(err);
      });
  }
  
  

  return (
    <div>
      <Navbar/>
    <div className="center-container">
      <form onSubmit={handleLogin} className="form-container">
        <div>
          <label htmlFor="emailInput">Email Address</label>
          <input
            type="email"
            id="emailInput"
            className="input-field"
            placeholder="Enter email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {loginError && <div className="error-message">{loginError}</div>}
        </div>
        <div>
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            id="passwordInput"
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
    </div>
  );
}
