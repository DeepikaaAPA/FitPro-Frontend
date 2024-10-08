import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../services/instance";

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);

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

  const handleClose = (id) => {
    instance
      .delete(`/admin/closeEnquiry/${id}`)
      .then((response) => {
        console.log("Enquiry closed:", response.data);
        toast(response.data, {
          autoClose: 1000, // 5000 milliseconds = 5 seconds
        });
        setEnquiries(enquiries.filter((e) => e._id !== id));
      })
      .catch((error) => {
        console.error("There was an error closing the enquiry!", error);
        toast(error, {
          autoClose: 1000, // 5000 milliseconds = 5 seconds
        });
      });
  };

  return (
    <div className="container mx-auto p-4 ">
      <h2 className="text-center">  <i className="fa fa-envelope text-blue-400  text-2xl"> View Enquiries </i>{" "} </h2>
     
      <ToastContainer></ToastContainer>
      <div className="overflow-x-auto">
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
                Query
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry._id} className="py-2  border-b border-gray-200">
                <td className="px-4">
                  {enquiry.firstname || " " || enquiry.lastname}
                </td>
                <td className="px-4">{enquiry.email}</td>
                <td className="px-4">{enquiry.phone}</td>
                <td className="px-4">{enquiry.query}</td>
                <td className="px-4">
                  <button
                    className="bg-red-400 text-white px-4 py-2 mr-2 rounded"
                    onClick={() => handleClose(enquiry._id)}
                  >
                    Close
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewEnquiries;
