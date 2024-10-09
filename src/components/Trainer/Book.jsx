import { useState } from "react";
import instance from "../../services/instance";

import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../features/cartSlice";
import { toast, ToastContainer } from "react-toastify";
function Book({ trainerId, user, trainer }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBook = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  const handleDateChange = async (date) => {
    // console.log("date :", `${date.toLocaleString().split(",")[0]}`);
    setSelectedDate(`${date.toLocaleString().split(",")[0]}`);
    const response = await instance.get(`/trainer/slots`, {
      params: { date: `${date.toLocaleString().split(",")[0]}`, trainerId },
    });
    //  console.log(response.data);
    setAvailableSlots(response.data);
  };

  const toggleSlotSelection = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleAddToCart = () => {
    // Add selected slots to cart logic
    console.log("selected slots :", selectedSlots, selectedDate);

    dispatch(
      addToCart({
        trainerId,
        user,
        selectedDate,
        selectedSlots,
        trainer,
      })
    );
    toast(
      "Added to cart :" +
        selectedSlots.join(" ,") +
        " on " +
        selectedDate +
        " Trainer :" +
        trainer.firstname +
        " " +
        trainer.lastname
    );
    setSelectedSlots([]);
    setIsOpen(false);
  };
  const tileDisabled = ({ date, view }) => {
    return (
      view === "month" &&
      new Date(date.toLocaleString()) < new Date(new Date().toLocaleString())
    );
  };
  const handleCancel = () => {
    setSelectedSlots([]);
  };

  const handleClose = () => {
    setSelectedDate("");
    setAvailableSlots([]);
    handleCancel();
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleBook} className="p-2 bg-blue-500  rounded text-white">
        Book
      </button>
      <ToastContainer></ToastContainer>
      {isOpen && (
        <div className="fixed p-5  inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white py-5 rounded-md shadow-md ">
            <button
              onClick={handleClose}
              className=" bg-red-500 p-3 m-2 text-white"
            >
              x
            </button>
            <div className="flex flex-wrap justify-center  border bg-blue-50">
              <div className="mr-5">
                <p className="text-left font-bold uppercase text-xl text-blue-700">
                  Choose a date
                </p>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  tileDisabled={tileDisabled}
                />
              </div>
              <div className="w-1/2">
                <h4 className="uppercase text-left text-xl text-blue-500 font-bold">
                  Select a slot :
                </h4>
                <div className=" flex flex-wrap ">
                  {availableSlots.length ? (
                    availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => toggleSlotSelection(slot)}
                        className={`p-2 m-2 w-40 text-white rounded hover:shadow  ${
                          selectedSlots.includes(slot)
                            ? "bg-blue-400"
                            : "bg-green-600"
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <div className="text-blue-400 font-bold">
                      No slots available{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className=" rounded p-2 bg-blue-500 text-white mt-4"
              disbled={selectedSlots.length ? false : true}
            >
              Add to Cart
            </button>
            <button
              onClick={handleCancel}
              className="rounded p-2 bg-gray-500 text-white mt-4 mx-4"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
