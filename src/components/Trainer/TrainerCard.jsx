import React from "react";
import { Link } from "react-router-dom";
const whitestar = "☆";
const blackstar = "★";
const stars = [1, 2, 3, 4, 5];
const TrainerCard = ({ trainer }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow bg-blue-50 m-3 w-64 ">
      <img className="" src="" alt={trainer.name} />
      <div className="px-6 py-2 text-center">
        <div className=" capitalize font-bold text-xl pb-2 text-blue-400 border-b ">
          {trainer.firstname + " " + trainer.lastname}
        </div>
        <p className="text-gray-700 text-base">
          {trainer.disciplines.join(", ")}
        </p>

        <p className="text-center text-lg text-yellow-500 ">
          {!trainer.avgRating ? (
            <span className="text-xs text-blue-400"> No Ratings yet </span>
          ) : (
            <span className="text-blue-400">
              {" "}
              {trainer.avgRating.toFixed(1)}{" "}
            </span>
          )}
          {stars.map((number, index) =>
            number <= trainer.avgRating ? (
              <i key="index">{blackstar}</i>
            ) : (
              <i key="index">{whitestar}</i>
            )
          )}
        </p>
        <p className="mx-12 text-blue-400 rounded  bg-yellow-100  p-2 text-center font-bold border text-base">
          <i className="fa fa-inr"></i> {trainer.price}
        </p>
      </div>
      <div className="px-2 pb-1 flex justify-evenly">
        <Link to="/profile" state={{ trainerIdProp: trainer.userId }}>
          <button className="mx-3 bg-green-600 hover:bg-blue-600 text-white py-1 px-4 rounded">
            View
          </button>
        </Link>
        {/* <button className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded">
          Book
        </button> */}
      </div>
    </div>
  );
};

export default TrainerCard;
