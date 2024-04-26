import React, { useState } from "react";
import axios from "axios";
import "./AddCustomer.css";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [Address, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [type, setType] = useState("Customer");
  const [drivingExperiance, setDrivingExperience] = useState("");
  const [liscenceYear, setLicenseYear] = useState("");

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  function sendData(e) {
    e.preventDefault();

    const newCustomer = {
      name,
      age,
      type,
      Address,
      Password,
      drivingExperiance,
      liscenceYear,
    };
    axios
      .post("http://localhost:8070/Customer/add", newCustomer)
      .then(() => {
        alert("Customer Added");
      })
      .catch((err) => {
        alert(err);
      });

    console.log("Form submitted");
    // Display alert
    alert("Form submitted");
    // You can perform further operations like sending data to a server here
  }

  return (
    <div className="container">
      <form onSubmit={sendData} className="border p-4">
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ageInput" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="ageInput"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="Enter email"
            value={Address}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Enter password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="typeSelect" className="form-label">
            Type
          </label>
          <select
            className="form-select"
            id="typeSelect"
            value={type}
            onChange={handleTypeChange}
          >
            <option value="Customer">Customer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>
        {type === "Driver" && (
          <div>
            <div className="mb-3">
              <label htmlFor="drivingExperienceInput" className="form-label">
                Driving Experience
              </label>
              <textarea
                type="text"
                className="form-control"
                id="drivingExperienceInput"
                placeholder="Type your driving experience"
                value={drivingExperiance}
                onChange={(e) => setDrivingExperience(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="licenseYearInput" className="form-label">
                Year of License
              </label>
              <input
                type="number"
                className="form-control"
                id="licenseYearInput"
                placeholder="Enter license year"
                value={liscenceYear}
                onChange={(e) => setLicenseYear(e.target.value)}
              />
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
