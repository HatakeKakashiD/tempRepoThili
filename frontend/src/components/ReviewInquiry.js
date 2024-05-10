import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ReviewInquiry({ location }) {
  const [inquiry, setInquiry] = useState(null);
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.inquiry) {
      const inquiryId = location.state.inquiry._id;

      // Fetch the inquiry details and the reply for the inquiry
      axios
        .all([
          axios.get(`http://localhost:8070/inquiry/${inquiryId}`),
          axios.get(`http://localhost:8070/inquiry/${inquiryId}/reply`)
        ])
        .then((responses) => {
          setInquiry(responses[0].data);
          setReply(responses[1].data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
    }
  }, [location.state]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {inquiry && (
            <div>
              <h2>Inquiry Details</h2>
              <p><strong>Category:</strong> {inquiry.inquirycategory}</p>
              <p><strong>Prioritization:</strong> {inquiry.inquiryprioritization}</p>
              <p><strong>Email:</strong> {inquiry.personemail}</p>
              <p><strong>Personum:</strong> {inquiry.personum}</p>
              <p><strong>Inquiry:</strong> {inquiry.personinquiry}</p>
            </div>
          )}
          {reply && (
            <div>
              <h2>Reply</h2>
              <p><strong>User:</strong> {reply.user}</p>
              <p><strong>Message:</strong> {reply.message}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
