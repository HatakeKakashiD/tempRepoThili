// Import the necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams from react-router-dom

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState(null); // State for error handling
  const { userId } = useParams(); // Extract userId from URL params

  useEffect(() => {
    axios
      .get(`http://localhost:8070/Customer/get/${userId}`)
      .then((response) => {
        console.log("Response data:", response.data); // Log the response data
        setUserDetails(response.data); // Assuming the response contains user details directly
      })
      .catch((err) => {
        setError(err); // Set error state
      });
  }, [userId]);

  if (error) {
    return (
      <div className="container">
        <h1>Error</h1>
        <p>Error fetching user details: {error.message}</p>
      </div>
    );
  }

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
