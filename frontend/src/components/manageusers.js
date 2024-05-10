import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash"; // Import lodash
import { Link } from "react-router-dom"; // Import Link from React Router
import "./AddCustomer.css"; // Import your CSS file
import logo from "../images/logo.jpg";
import "./manageusers.css";
import { colors } from "@mui/material";

export default function AddCustomer() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8070/Customer/");
      setUsers(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredUsers = _.filter(users, (user) =>
    user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Customer/delete/${id}`);
      getUsers(); // Refresh the user list after deletion
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="center-container">
      <img src={logo} alt="Logo" className="logo-img" />

      <input
        type="text"
        placeholder="Search by type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="user-list">
        <h2>All Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Type</th>
              <th>Driving Experience</th>
              <th>License Year</th>
              <th>Actions</th> {/* New column for buttons */}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
                <td>{user.type}</td>
                <td>{user.type === "Driver" ? user.drivingExperiance : "-"}</td>
                <td>{user.type === "Driver" ? user.liscenceYear : "-"}</td>
                <td>
                  <Link to={`/update/${user._id}`}>Update</Link>
                  <button className="delete-button"style={{color:"white",backgroundColor:"red"}}  onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
