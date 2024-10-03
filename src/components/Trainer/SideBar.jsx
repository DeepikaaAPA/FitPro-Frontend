import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUserTie,
  faBell,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <nav className="bg-gray-900 text-white fixed h-full w-64 flex flex-col">
      <ul className="flex-grow">
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="" className="flex items-center">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            Trainer Account 
          </Link>
        </li>
        <li className="p-4 hover:bg-white hover:text-blue-900">
          <Link to="profile" className="flex items-center">
            <FontAwesomeIcon icon={faUserTie} className="mr-2" />
            View your profile
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
