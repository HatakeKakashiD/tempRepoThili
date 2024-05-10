import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Addinquiry.css";

export default function AddInquiry() {
  const [inquirycategory, setInquiryCategory] = useState("");
  const [inquiryprioritization, setInquiryPrioritization] = useState("");
  const [personemail, setPersonEmail] = useState("");
  const [personum, setPersonum] = useState("");
  const [personinquiry, setPersonInquiry] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(""); // State to store phone number validation error

  function sendData(e) {
    e.preventDefault();

    // Phone number validation
    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(personum)) {
      setPhoneNumberError("Please enter a 10-digit phone number.");
      return;
    }

    const newInquiry = {
      inquirycategory,
      inquiryprioritization,
      personemail,
      personum,
      personinquiry
    };

    axios.post("http://localhost:8070/inquiry/add", newInquiry)
      .then(() => {
        alert("Package Added");
        window.location.reload(); // Refresh the page
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container-2">
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label className="form-label">Inquiry Category:</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="booking"
              name="inquirycategory"
              value="Booking"
              checked={inquirycategory === "Booking"}
              onChange={(e) => setInquiryCategory(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="booking" className="form-check-label">Booking</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="payment"
              name="inquirycategory"
              value="Payment"
              checked={inquirycategory === "Payment"}
              onChange={(e) => setInquiryCategory(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="payment" className="form-check-label">Payment</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="general"
              name="inquirycategory"
              value="General"
              checked={inquirycategory === "General"}
              onChange={(e) => setInquiryCategory(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="general" className="form-check-label">General</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="complaints"
              name="inquirycategory"
              value="Complaints"
              checked={inquirycategory === "Complaints"}
              onChange={(e) => setInquiryCategory(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="complaints" className="form-check-label">Complaints</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Inquiry Prioritization:</label>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="urgent"
              name="inquiryprioritization"
              value="Urgent"
              checked={inquiryprioritization === "Urgent"}
              onChange={(e) => setInquiryPrioritization(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="urgent" className="form-check-label">Urgent</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="special"
              name="inquiryprioritization"
              value="Special"
              checked={inquiryprioritization === "Special"}
              onChange={(e) => setInquiryPrioritization(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="special" className="form-check-label">Special</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              type="radio"
              id="normal"
              name="inquiryprioritization"
              value="Normal"
              checked={inquiryprioritization === "Normal"}
              onChange={(e) => setInquiryPrioritization(e.target.value)}
              className="form-check-input"
            />
            <label htmlFor="normal" className="form-check-label">Normal</label>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="personEmail" className="form-label">Person Email</label>
          <input
            type="email"
            className="form-control"
            id="personEmail"
            placeholder="Enter Person Email"
            value={personemail}
            onChange={(e) => setPersonEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="personum" className="form-label">Person Number</label>
          <input
            type="text"
            className="form-control"
            id="personum"
            placeholder="Enter Personum"
            value={personum}
            onChange={(e) => setPersonum(e.target.value)}
          />
          {phoneNumberError && <div className="text-danger">{phoneNumberError}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="personInquiry" className="form-label">Person Inquiry</label>
          <textarea
            className="form-control"
            id="personInquiry"
            rows="3"
            placeholder="Enter Person Inquiry"
            value={personinquiry}
            onChange={(e) => setPersonInquiry(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/view-inquiries" className="btn btn-secondary ml-2">View Inquiries</Link>
      </form>
    </div>
  );
}
