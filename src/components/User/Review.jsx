import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { toast, ToastContainer } from "react-toastify";

import { Rating } from "@material-tailwind/react";

import ReviewCard from "./ReviewCard";

function Past() {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user/getTrainersReviews");
        setData(response.data);
        setInitialData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReview = (e, index) => {
    setData(
      data.map((item, i) =>
        i === index ? { ...item, review: e.target.value } : item
      )
    );
    console.log(data);
  };

  const handleSave = async (index) => {
    try {
      const { trainerId, trainer, userId, user, review, rating } = data[index];
      await instance.post("/user/postReview", {
        trainerId,
        trainer,
        userId,
        user,
        review,
        rating,
      });
      toast(" ✔ Review saved. ");
    } catch (error) {
      toast(" ⚠️ An error occured.");
      console.log(error);
    }
  };
  const handleCancel = (index) => {
    setData(data.map((item, i) => (i === index ? initialData[index] : item)));
  };
  const handleRating = (e, index) => {
    setData(
      data.map((item, i) =>
        i === index ? { ...item, rating: e.target.value } : item
      )
    );
    console.log(data);
  };
  const whitestar = "☆";
  const blackstar = "★";
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      <h4 className="text-blue-400 text-center text-4xl "><i className="fa fa-comments"> Provide Feedback</i> </h4>
      <ToastContainer></ToastContainer>
      <div className="flex flex-wrap ">
        {!data.length ? (
          <p> ⚠️ You are yet to attend classes.</p>
        ) : (
          data.map((trainer, index) => (
            <div className=" border m-3 ">
              <ReviewCard key={index} trainer={trainer.trainer} />

              <div className="p-2 pb-2 bg-yellow-100  text-sm flex flex-col ">
                <span className=" text-blue-400 text-sm font-bold fa-solid fa-star">
                  {" "}
                  Rate
                </span>
                <div className="p-2">
                  <p className="text-center text-yellow-500 ">
                    {stars.map((number) =>
                      number <= trainer.rating ? (
                        <i>{blackstar}</i>
                      ) : (
                        <i>{whitestar}</i>
                      )
                    )}

                    <select
                      className="bg-green-50 px-2 mx-2 text-gray-500 text-xs"
                      value={trainer.rating}
                      onChange={(e) => handleRating(e, index)}
                    >
                      <option value="">--Select--</option>
                      <option value="1">Poor</option>
                      <option value="2">Average</option>
                      <option value="3">Good</option>
                      <option value="4">Very Good</option>
                      <option value="5">Excellent</option>
                    </select>
                  </p>
                </div>
                <span className=" text-blue-400 text-sm font-bold fa-solid fa-pen">
                  {" "}
                  Review
                </span>
                <textarea
                  className="text-gray-600 p-3 my-2"
                  name="review"
                  value={trainer.review}
                  onChange={(e) => handleReview(e, index)}
                ></textarea>
                <div className="text-center">
                  <button
                    className="button bg-blue-400 text-white  m-2 w-30 p-2 rounded "
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>
                  <button
                    className="button bg-gray-400 text-white m-2 w-30 p-2 rounded "
                    onClick={() => handleCancel(index)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Past;
