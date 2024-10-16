import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/getBookingHistory");
        setBookings(response.data.bookings);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);
  const currentDate = new Date(new Date().toLocaleDateString());
  return (
    <div className="container mx-auto py-4 flex flex-col items-center ">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
        <i className="fa fa-history"> Booking History </i>{" "}
      </h2>
      <div className="border bg-blue-400 w-1/2 ">
        <ul className=" p-3  flex flex-wrap justify-center items-center">
          <li className="text-gray-300 mx-3">
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            Past classes
          </li>

          <li className="text-green-200 mx-3">
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            Upcoming classes
          </li>
        </ul>
      </div>
      <div className="overflow-x-auto flex justify-center">
        <table className=" m-5 bg-white border border-gray-200">
          <thead>
            <tr className="bg-green-200 text-blue-400">
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">Trainer</th>

              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Slots</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Booked On</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className={
                  new Date(booking.bookedDate) < currentDate
                    ? "bg-gray-50 text-gray-600"
                    : "bg-green-50 text-gray-800"
                }
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
                  {new Date(
                    new Date(booking.bookedOn).toLocaleDateString()
                  ).toDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingHistory;
