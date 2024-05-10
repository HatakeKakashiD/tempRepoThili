import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar, Pie } from "react-chartjs-2";
import "./Allinquiries.css";

export default function AllInquiries() {
  const [showStatistics, setShowStatistics] = useState(false);
  const [categoryTypeCounts, setCategoryTypeCounts] = useState({});
  const [prioritizationCounts, setPrioritizationCounts] = useState({});
  const [inquiries, setInquiries] = useState([]);
  const [uniqueKey, setUniqueKey] = useState(0); // For forcing re-render of charts
  const navigate = useNavigate();
  const [categoryChart, setCategoryChart] = useState(null);
  const [prioritizationChart, setPrioritizationChart] = useState(null);

  // Define default status options
  const statusOptions = ["Pending", "In Progress", "Resolved"];
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/inquiry/")
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inquiries: ", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8070/inquiry/delete/${id}`)
      .then((response) => {
        console.log(response.data);
        setInquiries((prevInquiries) =>
          prevInquiries.filter((inquiry) => inquiry._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting inquiry: ", error);
      });
  };

  const handleStatusChange = (id, newStatus) => {
    axios
      .put(`http://localhost:8070/inquiry/updateStatus/${id}`, { status: newStatus })
      .then((response) => {
        console.log(response.data);
        setInquiries((prevInquiries) =>
          prevInquiries.map((inquiry) => {
            if (inquiry._id === id) {
              return { ...inquiry, status: newStatus };
            }
            return inquiry;
          })
        );
      })
      .catch((error) => {
        console.error("Error updating inquiry status: ", error);
      });
  };

  const countByCategoryType = (categoryType) => {
    return inquiries.filter((inquiry) => inquiry.inquirycategory === categoryType).length;
  };

  const countByPrioritization = (priorityLevel) => {
    return inquiries.filter((inquiry) => inquiry.inquiryprioritization === priorityLevel).length;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const columns = ["Category", "Prioritization", "Email", "Personum", "Inquiry"];
    const data = inquiries.map((inquiry) => [
      inquiry.inquirycategory,
      inquiry.inquiryprioritization,
      inquiry.personemail,
      inquiry.personum,
      inquiry.personinquiry,
    ]);

    const footer = (data) => {
      const categoryCounts = {};
      const prioritizationCounts = {};

      inquiries.forEach((inquiry) => {
        const category = inquiry.inquirycategory;
        const prioritization = inquiry.inquiryprioritization;

        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        prioritizationCounts[prioritization] = (prioritizationCounts[prioritization] || 0) + 1;
      });

      const categoryFooter = Object.entries(categoryCounts).map(([category, count]) => [
        `${category} Count:`,
        count,
      ]);
      const prioritizationFooter = Object.entries(prioritizationCounts).map(([prioritization, count]) => [
        `${prioritization} Count:`,
        count,
      ]);

      const totalCount = data.length;

      const footerData = [
        ["Category Type Counts:", ...categoryFooter],
        ["Prioritization Counts:", ...prioritizationFooter],
        ["Total Inquiries:", totalCount],
      ];

      return footerData;
    };

    doc.autoTable({
      head: [columns],
      body: data,
      foot: footer(data),
    });

    doc.save("inquiries.pdf");
  };

  const handleSearch = () => {
    axios
      .get(`http://localhost:8070/inquiry/search?priority=${searchTerm}`)
      .then((response) => {
        setInquiries(response.data);
      })
      .catch((error) => {
        console.error("Error searching inquiries: ", error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleReply = (id, email) => {
    const subject = encodeURIComponent("Reply to your inquiry");
    const body = encodeURIComponent("Please enter your reply here...");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    // Update status to Resolved
    handleStatusChange(id, "Resolved");
  };

  const handleReview = (id) => {
    navigate(`/review/${id}`);
  };

  const handleStatistics = () => {
    setShowStatistics(true);
  };

  // Destroy the charts when switching back to the inquiries view
  useEffect(() => {
    if (!showStatistics && categoryChart && prioritizationChart) {
      categoryChart.destroy();
      prioritizationChart.destroy();
    }
  }, [showStatistics]);

  if (showStatistics) {
    const categoryChartData = {
      labels: Object.keys(categoryTypeCounts),
      datasets: [
        {
          label: "Category Type Counts",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: Object.values(categoryTypeCounts),
        },
      ],
    };

    const prioritizationChartData = {
      labels: Object.keys(prioritizationCounts),
      datasets: [
        {
          label: "Prioritization Counts",
          backgroundColor: ["rgba(255,99,132,0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
          borderColor: ["rgba(255,99,132,1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
          borderWidth: 1,
          data: Object.values(prioritizationCounts),
        },
      ],
    };

    return (
      <div>
        <h2>Statistics</h2>
        <div className="chart-container">
          <Bar
            data={categoryChartData}
            options={{
              maintainAspectRatio: false,
            }}
            key={`category-chart-${uniqueKey}`}
            ref={(ref) => setCategoryChart(ref)}
          />
          <Pie
            data={prioritizationChartData}
            options={{
              maintainAspectRatio: false,
            }}
            key={`prioritization-chart-${uniqueKey}`}
            ref={(ref) => setPrioritizationChart(ref)}
          />
        </div>
        <button onClick={() => setShowStatistics(false)}>Back to Inquiries</button>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h3>Category Type Counts:</h3>
        <ul>
          <li>Booking: {countByCategoryType("Booking")}</li>
          <li>Payment: {countByCategoryType("Payment")}</li>
          <li>Complaints: {countByCategoryType("Complaints")}</li>
          <li>General: {countByCategoryType("General")}</li>
        </ul>
      </div>
      <div>
        <h3>Prioritization Counts:</h3>
        <ul>
          <li>Urgent: {countByPrioritization("Urgent")}</li>
          <li>Special: {countByPrioritization("Special")}</li>
          <li>Normal: {countByPrioritization("Normal")}</li>
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch} className="search-btn">
          Search by Prioritization
        </button>
      </div>
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
              <td style={{ position: "relative" }}>
                <span>{inquiry.personemail}</span>
                <button
                  onClick={() => handleReply(inquiry._id, inquiry.personemail)}
                  className="btn btn-secondary"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  Reply
                </button>
              </td>
              <td>{inquiry.personum}</td>
              <td>{inquiry.personinquiry}</td>
              <td>
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                  className="form-control"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button onClick={() => handleDelete(inquiry._id)} className="btn btn-danger">
                  Delete
                </button>
                <button onClick={() => handleReview(inquiry._id)} className="btn btn-primary ml-2">
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={generatePDF} className="btn btn-primary">
        Download PDF
      </button>
      <button onClick={handleStatistics}>Statistics</button>
    </div>
  );
}
