import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import Update from "./components/update";
import ManageUsers from "./components/manageusers";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Aboutus from "./components/Aboutus";
import RealHome from "./components/realhome.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/home" element={<Home />} />
       <Route path="/get/:id" element={<UserProfile />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/manageusers" element={<ManageUsers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/RealHome" element={<RealHome />} />

       
      </Routes>
    </Router>
  );
}

export default App;
