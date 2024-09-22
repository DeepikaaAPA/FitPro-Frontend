import React, { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../services/instance";

const ViewApplications = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    instance
      .get("/admin/getEnquiries")
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the enquiries!", error);
      });
  }, []);

  const handleApprove = (id) => {
    axios
      .post(`/api/enquiries/${id}/approve`)
      .then((response) => {
        console.log("Enquiry approved:", response.data);
      })
      .catch((error) => {
        console.error("There was an error approving the enquiry!", error);
      });
  };

  const handleReject = (id) => {
    axios
      .post(`/api/enquiries/${id}/reject`, { reason })
      .then((response) => {
        console.log("Enquiry rejected:", response.data);
        setEnquiries(
          enquiries.map((enquiry) =>
            enquiry.id === id ? { ...enquiry, reason } : enquiry
          )
        );
        setSelectedEnquiry(null);
        setReason("");
      })
      .catch((error) => {
        console.error("There was an error rejecting the enquiry!", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <>Applicaitons</>
    </div>
  );
};

export default ViewApplications;
