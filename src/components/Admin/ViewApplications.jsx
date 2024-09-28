import React, { useState, useEffect } from "react";
//import axios from "axios";

import instance from "../../services/instance";
const ViewApplications = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("No new applications!");
  const [actions, setActions] = useState({});
  useEffect(() => {
    instance
      .get("/admin/getApplications")
      .then((response) => {
        setEnquiries(response.data);
      })
      .catch((error) => {
        setMessage("error");
        console.error("There was an error fetching the enquiries!", error);
      });
  }, []);

  const handleApprove = (id) => {
    instance
      .post(`/admin/approveTrainer/${id}`)
      .then((response) => {
        setActions((prevStatus) => ({
          ...prevStatus,
          [id]: "Approved",
        }));
      })
      .catch((error) => {
        console.error("There was an error approving!", error);
      });
  };

  const handleReject = (id) => {
    instance
      .post(`/admin/rejectTrainer/${id}`, { reason })
      .then((response) => {
        //console.log("Trainer rejected:", response.data);

        setActions((prevStatus) => ({
          ...prevStatus,
          [id]: "Rejected",
        }));
        setEnquiries(
          enquiries.map((enquiry) =>
            enquiry.id === id ? { ...enquiry, reason } : enquiry
          )
        );
        setSelectedEnquiry(null);
        setReason("");
      })
      .catch((error) => {
        console.error("There was an error rejecting the trainer!", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold text-green-700 "> APPLICATIONS FOR TRAINER </h2>

      {enquiries.length ? (
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Email
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Phone
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Discipline
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Experience(yrs)
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="border-t">
                <td className="py-2">
                  {enquiry.firstname + " " + enquiry.lastname}
                </td>
                <td className="py-2">{enquiry.email}</td>
                <td className="py-2">{enquiry.phone}</td>
                <td className="py-2">{enquiry.discipline}</td>
                <td className="py-2 text-center">{enquiry.experience}</td>
                {actions[enquiry._id] ? (
                  <td className="py-2 text-blue-500">{actions[enquiry._id]}</td>
                ) : (
                  <td className="py-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                      onClick={() => handleApprove(enquiry._id)}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => setSelectedEnquiry(enquiry._id)}
                    >
                      Reject
                    </button>
                    {selectedEnquiry === enquiry._id && (
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
                            onClick={() => handleReject(enquiry._id)}
                          >
                            Submit
                          </button>
                          <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={() => {
                              setSelectedEnquiry(null);
                              setReason("");
                            }}
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        message
      )}
    </div>
  );
};

export default ViewApplications;
