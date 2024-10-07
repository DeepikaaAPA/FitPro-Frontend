import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserTie,
  faBell,
  faBellSlash,
  faComments,
  faHistory,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed h-full w-64 flex flex-col">
      <ul className="flex-grow">
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="" className="flex items-center">
            <FontAwesomeIcon icon={faPerson} className="mr-2" />
            User Profile
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="upcoming" className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            Upcoming Classes
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="review" className="flex items-center">
            <FontAwesomeIcon icon={faComments} className="mr-2" />
            Provide Feedback
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="history" className="flex items-center">
            <FontAwesomeIcon icon={faHistory} className="mr-2" />
            View History
          </Link>
        </li>
   
      </ul>
    </nav>
  );
};

export default Sidebar;
