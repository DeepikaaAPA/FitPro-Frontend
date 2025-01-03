import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faCog,
  faBook,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed h-full w-20 md:w-64  flex flex-col">
      <ul className="flex-grow">
        <li className="p-4 hover:bg-green-50 hover:text-blue-900">
          <Link to="" className="flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-2 w-10" />
            <span className="collapse md:visible  ">Trainer Account</span>
          </Link>
        </li>
        <li className="p-4 hover:bg-green-50 hover:text-blue-900">
          <Link to="profile" className="flex items-center">
            <FontAwesomeIcon icon={faUserTie} className="mr-2 w-10" />
            <span className="collapse md:visible ">View your profile </span>
          </Link>
        </li>
        <li className="p-4 hover:bg-green-50 hover:text-blue-900">
          <Link to="bookings" className="flex items-center">
            <FontAwesomeIcon icon={faBook} className="mr-2 w-10" />
            <span className="collapse md:visible  "> View bookings </span>
          </Link>
        </li>
        <li className="p-4 hover:bg-green-50 hover:text-blue-900">
          <Link to="reviews" className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-2 w-10" />
            <span className="collapse md:visible  "> View Reviews </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
