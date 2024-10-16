import { Rating, Textarea } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ trainer }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow bg-blue-50 m-3 ">
      <img className="w-full" src={trainer.image} alt={trainer.name} />
      <div className="px-6 py-2 text-center">
        <div className=" capitalize  text-xl mb-2  pb-2 text-blue-400 border-b border-gray-500">
          {trainer.firstname + " " + trainer.lastname}
        </div>
        <p className="text-gray-700 text-base text-sm">
          {trainer.disciplines.join(", ")}
        </p>
        <p className=" text-sm text-blue-400 text-base text-left py-2">
          Avg.Rating: {trainer.avgRating.toFixed(1)}{" "}
        </p>
        <p className="m-6 text-blue-500  bg-gray-50 text-center border text-base">
          <i className="fa fa-inr"></i> {trainer.price}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
