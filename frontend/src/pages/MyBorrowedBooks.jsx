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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Borrowed Books</h1>
      {borrowedBooks.length === 0 ? (
        <p>You haven't borrowed any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {borrowedBooks.map((book) => (
            <div key={book._id} className="border p-4 rounded shadow-md">
              <img
                src={
                  book.imageUrl
                    ? `http://localhost:8000${book.imageUrl}`
                    : "/no-image.png"
                }
                alt={book.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-600">
                Available Copies: {book.availableCopies}
              </p>

              {/* Return book button */}
              <button
                onClick={() => handleReturn(book._id)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
              >
                Return Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBorrowedBooks;
