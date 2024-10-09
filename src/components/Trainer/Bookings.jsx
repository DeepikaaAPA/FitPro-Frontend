import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faSquare } from "@fortawesome/free-solid-svg-icons";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get(`/trainer/getBookings`);
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
        <i className="fa fa-book"> All Bookings </i>{" "}
      </h2>
      <div className="border bg-gray-700 w-1/2 ">
        <ul className=" p-3  flex flex-wrap justify-center items-center">
          <li className="text-gray-200 mx-3">
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            Past bookings
          </li>
          <li className="text-green-200 mx-3">
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            Today's bookings
          </li>{" "}
          <li className="text-blue-200 mx-3">
            <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            Upcoming bookings
          </li>
        </ul>
      </div>
      <div className="overflow-x-auto flex justify-center">
        <table className=" mt-3 border border-gray-200">
          <thead>
            <tr className="bg-green-200 text-blue-400">
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">User</th>

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
                    ? "bg-gray-50 text-gray-500"
                    : new Date(booking.bookedDate) === currentDate
                    ? "bg-green-50"
                    : "bg-blue-50"
                }
              >
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b capitalize">
                  {booking.user.firstname + " " + booking.user.lastname}
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

export default Bookings;
