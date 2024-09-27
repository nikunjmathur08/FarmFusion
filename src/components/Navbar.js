import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-transparent absolute top-0 left-0 right-0 z-50">
      {/* Left Section: Logo */}
      <div className="text-white font-bold text-3xl">FarmFusion</div>

      {/* Middle Section: Links */}
      <ul className="flex space-x-12"> {/* Increase space between links */}
        <li>
          <a
            href="/services"
            className="text-white text-lg transition-colors duration-300 ease-in-out hover:text-gray-300"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/solutions"
            className="text-white text-lg transition-colors duration-300 ease-in-out hover:text-gray-300"
          >
            Solutions
          </a>
        </li>
        <li>
          <a
            href="#about"
            className="text-white text-lg transition-colors duration-300 ease-in-out hover:text-gray-300"
          >
            About
          </a>
        </li>
      </ul>

      {/* Right Section: Buttons */}
      <div className="flex items-center space-x-6">
        <a
          href="/signin"
          className="text-white text-lg transition-colors duration-300 ease-in-out hover:text-gray-300"
        >
          Log In
        </a>
        <a
          href="/signin"
          className="bg-white text-black rounded-full py-3 px-8 text-lg font-bold hover:bg-black hover:text-white transition-all duration-300"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
