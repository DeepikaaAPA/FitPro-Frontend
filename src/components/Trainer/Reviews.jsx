import React, { useEffect, useState } from "react";

import instance from "../../services/instance";
import { toast, ToastContainer } from "react-toastify";
import ReviewCard from "./ReviewCard";

function Reviews() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/trainer/getReviews");
        setData(response.data.reviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const whitestar = "☆";
  const blackstar = "★";
  const stars = [1, 2, 3, 4, 5];
  return (
    <div>
      <h4 className="text-blue-400 text-center text-4xl ">
        <i className="fa fa-comments"> Feedback </i>{" "}
      </h4>
      <ToastContainer></ToastContainer>
      <div className="flex flex-wrap ">
        {!data.length ? (
          <p> ⚠️ No reviews yet.</p>
        ) : (
          data.map((review, index) => (
            <div key={index} className=" border  md:m-3 ">
              <div className="p-2 pb-2 bg-yellow-100  text-sm flex flex-col ">
                <ReviewCard
                  key={review.user._id}
                  user={review.user}
                ></ReviewCard>
                <span className=" text-blue-400 text-sm font-bold fa-solid fa-star">
                  {" "}
                  Rating - ({review.rating})
                </span>
                <div className="p-2">
                  <p
                    className={
                      " text-center text-2xl " +
                      (review.rating > 3
                        ? " text-green-500 "
                        : review.rating < 3
                        ? " text-red-300 "
                        : " text-yellow-500")
                    }
                  >
                    {stars.map((number) =>
                      number <= review.rating ? (
                        <i key={number}>{blackstar}</i>
                      ) : (
                        <i key={number}>{whitestar}</i>
                      )
                    )}
                  </p>
                </div>
                <span className=" text-blue-400 text-sm font-bold fa-solid fa-pen">
                  {" "}
                  Review
                </span>
                <textarea
                  className="text-gray-600 p-3 my-2"
                  name="review"
                  value={review.review}
                ></textarea>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Reviews;
