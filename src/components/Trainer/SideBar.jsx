import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserTie,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed h-full w-64 flex flex-col">
      <ul className="flex-grow">
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="profile" className="flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Trainer Profile
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="/admin/applications" className="flex items-center">
            <FontAwesomeIcon icon={faUserTie} className="mr-2" />
            Upcoming Classes
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="/notifications" className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
           Booking History
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="/notifications" className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
            View Schedule
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="/notifications" className="flex items-center">
            <FontAwesomeIcon icon={faBell} className="mr-2" />
           Trainer Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;