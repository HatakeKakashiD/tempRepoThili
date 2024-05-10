import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./update.css"; // Import the CSS file
import logo from "../images/logo.jpg"; 
import Navbar from "./Navbar";

export default function UpdateProfile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    age: "",
    type: "",
    address: "",
    drivingExperience: "", 
    licenseYear: "", 
  });
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/customer/get/${id}`)
      .then((response) => {
        const userData = response.data.user;
        const updatedDetails = {
          name: userData.name || "",
          age: userData.age || "",
          type: userData.type || "",
          address: userData.address || "", 
          drivingExperience: userData.drivingExperiance || "",
          licenseYear: userData.liscenceYear || "", 
        };
        setUserDetails(updatedDetails);
        console.log(response);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err.response);
      });
  }, [id]);
  

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  
  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8070/customer/update/${id}`,
        {
          name: userDetails.name,
          age: userDetails.age,
          type: userDetails.type,
          address: userDetails.address,
          drivingExperience: userDetails.drivingExperience || "",
          licenseYear: userDetails.licenseYear || "",
        }
      )
      .then((response) => {
        console.log("User details updated successfully:", response);
      })
      .catch((err) => {
        console.error("Error updating user details:", err.response);
      });
  };
  return (
    <div>
       <Navbar />
    <div className="container">
      
      <h1>Update Profile</h1>

      <div className="form-container">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={userDetails.age || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={userDetails.type || ""}
            onChange={handleChange}
          >
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address || ""}
            onChange={handleChange}
          />
        </div>
        {userDetails.type === "Driver" && (
          <div>
            <label>Driving Experience:</label>
            <input
              type="text"
              name="drivingExperience"
              value={userDetails.drivingExperience || ""}
              onChange={handleChange}
            />
          </div>
        )}
        {userDetails.type === "Driver" && (
          <div>
            <label>License Year:</label>
            <input
              type="text"
              name="licenseYear"
              value={userDetails.licenseYear || ""}
              onChange={handleChange}
            />
          </div>
        )}
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
    </div>
  );
}
