// src/pages/MyBorrowedBooks.js
import React, { useEffect, useState, useContext } from "react";
import api from "../api/api"; // Import the API instance
import { AuthContext } from "../context/AuthContext"; // Import AuthContext to get logged-in user context

const MyBorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]); // State to store borrowed books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { user } = useContext(AuthContext); // Access the logged-in user

  // Fetch borrowed books when component loads
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await api.get("/books/myborrowedbooks"); // API call to get borrowed books
        setBorrowedBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching borrowed books");
        setLoading(false);
      }
    };

    if (user) {
      fetchBorrowedBooks(); // Only fetch if the user is logged in
    }
  }, [user]);

  // Handle the return of a book
  const handleReturn = async (bookId) => {
    try {
      await api.post(`/books/${bookId}/return`); // Call the return book API
      setBorrowedBooks(borrowedBooks.filter((book) => book._id !== bookId)); // Remove the returned book from the list
    } catch (err) {
      setError("Error returning book");
    }
  };

  if (loading) return <div>Loading borrowed books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          This is your bookshelf
        </h1>
        {borrowedBooks.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven't borrowed any books yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {borrowedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={
                      book.imageUrl
                        ? `http://localhost:8000${book.imageUrl}`
                        : "/no-image.png"
                    }
                    alt={book.title}
                    className="w-full h-96 object-fit"
                  />
                  <div className="absolute bottom-0 left-0 bg-yellow-500 px-3 py-1 text-white font-semibold">
                    Borrowed
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                  <p className="text-gray-600 text-lg mb-2">By {book.author}</p>
                  <p className="text-gray-500 mb-2">Genre: {book.genre}</p>
                  <p className="text-gray-500 mb-2">
                    Published:{" "}
                    {new Date(book.publicationDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500 mb-4">
                    Available Copies: {book.availableCopies}
                  </p>

                  {/* Return book button */}
                  <button
                    onClick={() => handleReturn(book._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg w-full hover:bg-red-600 transition-colors duration-300"
                  >
                    Return Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBorrowedBooks;
