import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for user state
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa"; // Icons for login/register/logout

const Header = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-2xl font-bold">
          E-Library
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-yellow-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/books" className="hover:text-yellow-500">
              All Books
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-yellow-500">
              About Us
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        {!user ? (
          <>
            <Link to="/login" className="mr-4 hover:text-yellow-500">
              <FaSignInAlt className="inline mr-1" /> Login
            </Link>
            <Link to="/register" className="hover:text-yellow-500">
              <FaUserPlus className="inline mr-1" /> Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="hover:text-yellow-500">
            <FaSignOutAlt className="inline mr-1" /> Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
