import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Upcoming() {
  const [bookings, setBookings] = useState([]);
  const [actions, setActions] = useState({});
  const navigate = useNavigate();
  const handleRemove = async (id) => {
    try {
      const answer = confirm("Are you sure you want to cancel ?");
      if (answer) {
        setActions((prevStatus) => ({
          ...prevStatus,
          [id]: "Cancelled",
        }));
        await instance.delete(`/user/cancel/${id}`);
      }
    } catch (err) {
      toast("error cancelling");
    }
  };

  const handleReschedule = (trainerId) => {
    navigate(`/browse`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/getUpcoming");
        setBookings(response.data.bookings);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-4">
      <ToastContainer></ToastContainer>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
        Upcoming Classes{" "}
      </h2>
      <div className="overflow-x-auto flex justify-center">
        <table className=" m-5 bg-white border border-gray-200">
          <thead>
            <tr className="bg-green-200">
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">Trainer</th>

              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Slots</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-blue-100" : "bg-green-100"}
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {booking.trainer.firstname + " " + booking.trainer.lastname}
                </td>

                <td className="py-2 px-4 border-b">
                  {new Date(booking.bookedDate).toDateString()}
                </td>
                <td className="py-2 px-4 border-b">{booking.bookedSlot}</td>
                <td className="py-2 px-4 border-b">
                  Rs. {booking.trainer.price}
                </td>
                <td className="py-2 px-4 border-b">
                  {!actions[booking._id] ? (
                    <button
                      onClick={() => handleRemove(booking._id)}
                      className=" bg-red-500  text-white p-3"
                    >
                      {" "}
                      Cancel{" "}
                    </button>
                  ) : (
                    <span className="py-2 text-gray-500">
                      {`${actions[booking._id]}   -  `}
                      <button
                        className=" rounded bg-green-400 p-3 text-gray-600"
                        onClick={() => handleReschedule(booking.trainerId)}
                      >
                        Reschedule
                      </button>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Upcoming;
