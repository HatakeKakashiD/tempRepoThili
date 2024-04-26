import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8070/customer/get/${id}`)
      .then((response) => {
        setUserDetails(response.data.user);
        console.log(response);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err.response);
      });
  }, [id]);

  return (
    <div className="container">
      <h1>User Profile</h1>
      <div>
        <strong>Name:</strong> {userDetails.name}
      </div>
      <div>
        <strong>Age:</strong> {userDetails.age}
      </div>
      <div>
        <strong>Type:</strong> {userDetails.type}
      </div>
      <div>
        <strong>Address:</strong> {userDetails.Address}
      </div>
      {/* Additional details based on type */}
      {userDetails.type === "Driver" && (
        <div>
          <strong>Driving Experience:</strong> {userDetails.drivingExperiance}
        </div>
      )}
      {userDetails.type === "Driver" && (
        <div>
          <strong>License Year:</strong> {userDetails.liscenceYear}
        </div>
      )}
    </div>
  );
}
