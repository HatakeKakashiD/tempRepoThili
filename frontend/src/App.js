// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from "./components/AddCustomer";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile"; // Import UserProfile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/" element={<Home />} />
        {/* Route for user profile */}
        <Route path="/get/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
