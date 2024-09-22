import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id} className="border-t">
              <td className="py-2">{enquiry.id}</td>
              <td className="py-2">{enquiry.name}</td>
              <td className="py-2">{enquiry.email}</td>
              <td className="py-2">
                <button
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                  onClick={() => handleApprove(enquiry.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setSelectedEnquiry(enquiry.id)}
                >
                  Reject
                </button>
                {selectedEnquiry === enquiry.id && (
                  <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded">
                      <h2 className="text-lg mb-2">Reject Reason</h2>
                      <textarea
                        className="w-full p-2 border rounded mb-2"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => handleReject(enquiry.id)}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={() => setSelectedEnquiry(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {enquiry.reason && (
                  <div className="mt-2 text-red-500">
                    Reason: {enquiry.reason}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplications;
