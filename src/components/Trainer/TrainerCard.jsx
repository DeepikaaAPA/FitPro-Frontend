import React from "react";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow bg-blue-50 m-3 ">
      <img className="w-full" src={trainer.image} alt={trainer.name} />
      <div className="px-6 py-4">
        <div className=" capitalize font-bold text-xl mb-2 text-blue-400">
          {trainer.firstname + " " + trainer.lastname}
        </div>
        <p className="text-gray-700 text-base">
          {trainer.disciplines.join(", ")}
        </p>
        <p className="text-green-500 text-base">Rating: {trainer.rating}</p>
      </div>
      <div className="px-2 pt-4 pb-2 flex justify-evenly">
        <Link to="/profile" state={{ trainerIdProp: trainer.userId }}>
          <button className="mx-3 bg-blue-400 hover:bg-blue-600 text-white py-2 px-4 rounded">
            View
          </button>
        </Link>
        <button className="bg-green-500 hover:bg-green-700 text-white  py-2 px-4 rounded">
          Book
        </button>
      </div>
    </div>
  );
};

export default TrainerCard;