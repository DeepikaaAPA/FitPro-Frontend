import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faEnvelope,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar2 = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 left-0 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 md:w-20 lg:w-64`}
      >
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold ${
              open ? "block" : "hidden"
            } md:block`}
          >
            My App
          </h1>
          <button onClick={toggleSidebar} className="md:hidden">
            <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-10">
          <a href="#" className="flex items-center p-2 hover:bg-gray-700">
            <FontAwesomeIcon icon={faHome} className="h-6 w-6" />
            <span className={`ml-4 ${open ? "block" : "hidden"} md:block`}>
              Home
            </span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-700">
            <FontAwesomeIcon icon={faInfoCircle} className="h-6 w-6" />
            <span className={`ml-4 ${open ? "block" : "hidden"} md:block`}>
              About
            </span>
          </a>
          <a href="#" className="flex items-center p-2 hover:bg-gray-700">
            <FontAwesomeIcon icon={faEnvelope} className="h-6 w-6" />
            <span className={`ml-4 ${open ? "block" : "hidden"} md:block`}>
              Contact
            </span>
          </a>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <button onClick={toggleSidebar} className="md:hidden">
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Main Content</h1>
      </div>
    </div>
  );
};

export default Sidebar2;
