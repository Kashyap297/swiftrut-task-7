// src/components/Header.js
import React, { useContext } from "react";
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

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="text-2xl font-bold">
          E-Library
        </Link>
      </div>

      {/* Navigation items */}
      <div className="flex items-center space-x-8 mx-auto">
        {user && (
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/add-book"
                className="hover:text-yellow-500 flex items-center"
              >
                <FaPlus className="inline mr-1" /> Add E-book
              </Link>
            </li>
            <li>
              <Link
                to="/my-books"
                className="hover:text-yellow-500 flex items-center"
              >
                <FaBook className="inline mr-1" /> View My E-books
              </Link>
            </li>
            <li>
              <Link
                to="/my-borrowed-books"
                className="hover:text-yellow-500 flex items-center"
              >
                <FaBookReader className="inline mr-1" /> My Borrowed Books
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* User and Logout */}
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
            {/* Display logged-in user's name */}
            <span className="text-yellow-500">{user.username}</span>

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
