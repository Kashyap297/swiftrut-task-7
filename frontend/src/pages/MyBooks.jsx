import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the Axios instance for making API requests
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for routing
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch books added by the logged-in user
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books/mycreatedbooks");
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Handle Delete book
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/books/${bookId}`);
        setBooks(books.filter((book) => book._id !== bookId)); // Update UI by removing deleted book
      } catch (error) {
        console.error("Failed to delete book:", error);
      }
    }
  };

  // Navigate to edit book page
  const handleEdit = (bookId) => {
    navigate(`/edit-book/${bookId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Books</h1>
      {books.length === 0 ? (
        <p>You have not added any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {books.map((book) => (
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
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-600">
                Available Copies: {book.availableCopies}
              </p>

              {/* Edit and Delete buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(book._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
