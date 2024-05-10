import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [editedEmail, setEditedEmail] = useState(""); // State to store edited email
  const [editId, setEditId] = useState(null); // State to store ID of inquiry being edited
  const [emailError, setEmailError] = useState(""); // State to store email validation error

  useEffect(() => {
    // Fetch inquiries when component mounts
    axios.get("http://localhost:8070/inquiry/")
      .then(response => {
        setInquiries(response.data);
      })
      .catch(error => {
        console.error('Error fetching inquiries: ', error);
      });
  }, []);

  // Function to handle deletion of an inquiry
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8070/inquiry/delete/${id}`)
      .then(response => {
        console.log(response.data);
        // Refresh the inquiries list after deletion
        setInquiries(prevInquiries => prevInquiries.filter(inquiry => inquiry._id !== id));
      })
      .catch(error => {
        console.error('Error deleting inquiry: ', error);
      });
  };

  // Function to handle editing of email
  const handleEditEmail = (id, currentEmail) => {
    // Set the ID of the inquiry being edited and current email
    setEditId(id);
    setEditedEmail(currentEmail); // Set current email as edited email
    setEmailError(""); // Clear any previous email validation error
  };

  // Function to handle submission of edited email
  const handleSubmitEdit = () => {
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(editedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Send a request to your backend to update the email address
    axios.put(`http://localhost:8070/inquiry/update/${editId}`, { personemail: editedEmail })
      .then(response => {
        console.log(response.data);
        // Reset editId and editedEmail states after successful update
        setEditId(null);
        setEditedEmail("");
        // Refresh inquiries list
        axios.get("http://localhost:8070/inquiry/")
          .then(response => {
            setInquiries(response.data);
          })
          .catch(error => {
            console.error('Error fetching inquiries: ', error);
          });
      })
      .catch(error => {
        console.error('Error updating email: ', error);
      });
  };

  return (
    <div className="container">
      <h2 style={{ color: 'white' }}>View Inquiries</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Category</th>
            <th scope="col">Prioritization</th>
            <th scope="col">Email</th>
            <th scope="col">Personum</th>
            <th scope="col">Inquiry</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.inquirycategory}</td>
              <td>{inquiry.inquiryprioritization}</td>
              <td>
                {editId === inquiry._id ? (
                  <div>
                    <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                    <button onClick={handleSubmitEdit} className="btn btn-primary ml-2">Save</button>
                    {emailError && <div className="text-danger">{emailError}</div>}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {inquiry.personemail}
                    <button onClick={() => handleEditEmail(inquiry._id, inquiry.personemail)} className="btn btn-primary mt-2">Edit Email</button>
                  </div>
                )}
              </td>
              <td>{inquiry.personum}</td>
              <td>{inquiry.personinquiry}</td>
              <td>{inquiry.status}</td>
              <td>
                <button onClick={() => handleDelete(inquiry._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
