// src/components/Header.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for user state
import {
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaPlus,
  FaBook,
  FaBookReader,
} from "react-icons/fa"; // Icons for login/register/logout and additional options

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control E-books dropdown
  const [borrowedDropdownOpen, setBorrowedDropdownOpen] = useState(false); // State to control Borrowed Books dropdown

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle E-books dropdown visibility
  };

  const toggleBorrowedDropdown = () => {
    setBorrowedDropdownOpen(!borrowedDropdownOpen); // Toggle Borrowed Books dropdown visibility
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold">
          E-Library
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!user ? (
          <div className="flex space-x-4">
            <Link to="/login" className="hover:text-yellow-500">
              <FaSignInAlt className="inline mr-1" /> Login
            </Link>
            <Link to="/register" className="hover:text-yellow-500">
              <FaUserPlus className="inline mr-1" /> Register
            </Link>
          </div>
        ) : (
          <>
            {/* First Dropdown for E-books (Add and View My E-books) */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="hover:text-yellow-500 flex items-center"
              >
                E-books <FaBook className="inline ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/add-book"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        <FaPlus className="inline mr-2" /> Add E-book
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/my-books"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        <FaBook className="inline mr-2" /> View My E-books
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Second Dropdown for Borrowed Books */}
            <div className="relative">
              <button
                onClick={toggleBorrowedDropdown}
                className="hover:text-yellow-500 flex items-center"
              >
                Borrowed Books <FaBookReader className="inline ml-1" />
              </button>
              {borrowedDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-700 rounded-md shadow-lg">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/my-borrowed-books"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        <FaBookReader className="inline mr-2" /> My Borrowed
                        Books
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="hover:text-yellow-500 flex items-center ml-4"
            >
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
