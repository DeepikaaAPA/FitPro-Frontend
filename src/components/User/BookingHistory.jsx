import React, { useEffect, useState } from "react";

import instance from "../../services/instance";

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

  return (
    <div className="container mx-auto py-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
        <i className="fa fa-history"> Booking History </i>{" "}
      </h2>
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
                className={index % 2 === 0 ? "bg-gray-50" : "bg-green-50"}
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
                  {new Date(new Date(booking.bookedOn).toLocaleDateString()).toDateString()}
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
