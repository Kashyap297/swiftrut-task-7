// src/pages/BookDetails.js
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Import API instance
import { AuthContext } from "../context/AuthContext"; // Import AuthContext for user

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false); // Track if the user has borrowed the book
  const { user } = useContext(AuthContext); // Get the logged-in user (can be null if not logged in)

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`); // Fetch book details by ID
        setBook(response.data);
        setLoading(false);

        // Check if the book is borrowed by the current user (if user is logged in)
        if (user && response.data.borrowedBy.includes(user._id)) {
          setIsBorrowed(true); // If the user has already borrowed the book
        }
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id, user]);

  // Handle Borrow Book action (only for logged-in users)
  const handleBorrow = async () => {
    try {
      await api.post(`/books/${id}/borrow`);
      setIsBorrowed(true); // Update state to reflect the book has been borrowed
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies - 1,
      }));
    } catch (err) {
      setError("Error borrowing book");
    }
  };

  // Handle Return Book action (only for logged-in users)
  const handleReturn = async () => {
    try {
      await api.post(`/books/${id}/return`);
      setIsBorrowed(false); // Update state to reflect the book has been returned
      setBook((prevBook) => ({
        ...prevBook,
        availableCopies: prevBook.availableCopies + 1,
      }));
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {book && (
        <div className="border p-4 rounded shadow-md">
          <img
            src={
              book.imageUrl
                ? `http://localhost:8000${book.imageUrl}`
                : "/no-image.png"
            }
            alt={book.title}
            className="w-full h-96 object-cover mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600 text-lg">Author: {book.author}</p>
          <p className="text-gray-600 text-lg">Genre: {book.genre}</p>
          <p className="text-gray-600 text-lg">
            Published: {new Date(book.publicationDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 text-lg">
            Available Copies: {book.availableCopies}
          </p>
          <p className="text-gray-600 mt-4">{book.description}</p>

          {/* Display either the Borrow or Return button if the user is logged in */}
          {user && (
            <div className="mt-4">
              {isBorrowed ? (
                <button
                  onClick={handleReturn}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Return Book
                </button>
              ) : book.availableCopies > 0 ? (
                <button
                  onClick={handleBorrow}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Borrow Book
                </button>
              ) : (
                <p className="text-red-500">
                  No copies available for borrowing
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetails;
