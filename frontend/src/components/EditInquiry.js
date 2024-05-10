import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate

export default function EditInquiry() {
  const { id } = useParams(); // Get the inquiry ID from the URL
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const [email, setEmail] = useState(""); // State to store edited email

  useEffect(() => {
    // Fetch the inquiry details when component mounts
    axios.get(`http://localhost:8070/inquiry/${id}`)
      .then(response => {
        setEmail(response.data.personemail); // Set the email from the response
      })
      .catch(error => {
        console.error('Error fetching inquiry details: ', error);
      });
  }, [id]);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to update the email address
    axios.put(`http://localhost:8070/inquiry/update/${id}`, { personemail: email })
      .then(response => {
        console.log(response.data);
        // Navigate to view inquiries page after successful update
        navigate("/view-inquiries");
      })
      .catch(error => {
        console.error('Error updating inquiry: ', error);
      });
  };

  return (
    <div className="container">
      <h2>Edit Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="personemail">Email:</label>
          <input type="text" className="form-control" id="personemail" name="personemail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save Email</button>
      </form>
    </div>
  );
}
