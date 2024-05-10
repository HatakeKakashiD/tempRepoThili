import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import logo from "../images/logo.jpg";
import jsPDF from "jspdf";
import Navbar from "./Navbar";


export default function UserProfile() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setEmail] = useState("");
  const [type, setType] = useState("Customer");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [licenseYear, setLicenseYear] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (id) { // Check if id is defined
      axios
        .get(`http://localhost:8070/customer/get/${id}`)
        .then((response) => {
          const userData = response.data.user;
          setName(userData.name);
          setAge(userData.age);
          setEmail(userData.address);
          setType(userData.type);
          setDrivingExperience(userData.drivingExperiance);
          setLicenseYear(userData.liscenceYear);
        })
        .catch((err) => {
          console.error("Error fetching user details:", err.response);
        });
    }
  }, [id]);

  const deleteUser = () => {
    axios
      .delete(`http://localhost:8070/customer/delete/${id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error("Error deleting user:", err.response);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("User Details", 20, 20);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Age: ${age}`, 20, 40);
    doc.text(`Email: ${address}`, 20, 50);
    doc.text(`Type: ${type}`, 20, 60);
    if (type === "Driver") {
      doc.text(`Driving Experience: ${drivingExperience}`, 20, 70);
      doc.text(`License Year: ${licenseYear}`, 20, 80);
    }
    doc.save("user_details.pdf");
  };

  return (
    <div>
       <Navbar />
       
    <div className="center-container">
     
      <form className="form-container">
        <div>
          <label htmlFor="nameInput">Name</label>
          <input
            type="text"
            id="nameInput"
            className="input-field"
            placeholder="Enter name"
            value={name}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="ageInput">Age</label>
          <input
            type="number"
            id="ageInput"
            className="input-field"
            placeholder="Enter age"
            value={age}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="emailInput">Email Address</label>
          <input
            type="email"
            id="emailInput"
            className="input-field"
            placeholder="Enter email"
            value={address}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="typeSelect">Type</label>
          <select
            id="typeSelect"
            value={type}
            className="input-field"
            readOnly
          >
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        {type === "Driver" && (
          <div>
            <div>
              <label htmlFor="drivingExperienceInput">Driving Experience</label>
              <textarea
                id="drivingExperienceInput"
                className="input-field"
                placeholder="Type your driving experience"
                value={drivingExperience}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="licenseYearInput">Year of License</label>
              <input
                type="number"
                id="licenseYearInput"
                className="input-field"
                placeholder="Enter license year"
                value={licenseYear}
                readOnly
              />

            </div>
          </div>
        )}
        <button className="delete-btn" onClick={deleteUser}>Delete</button>
      </form>
      <button className="generate-pdf-btn" onClick={generatePDF}>
        Generate PDF
      </button>
      <Link to={`/update/${id}`} className="update-link">Update Profile</Link>
    </div>
    </div>
  );
}
