import React from "react";

const ReviewCard = ({ user }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow bg-blue-50 m-3 ">
      <div className="px-6 py-2 text-center">
        <div className=" capitalize  text-xl mb-2  pb-2 text-blue-400 border-b border-gray-500">
          {user.firstname + " " + user.lastname}
        </div>

        <p className=" text-sm text-blue-400 text-base text-left py-2">
          {user.email}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
