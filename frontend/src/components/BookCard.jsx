// src/components/BookCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Redirect to book details on click
  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div
      onClick={handleClick} // Add onClick handler
      className="border p-4 rounded shadow-md cursor-pointer hover:bg-gray-100"
    >
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
      <p className="text-gray-600">{book.genre}</p>
      <p className="text-gray-600">Available Copies: {book.availableCopies}</p>
    </div>
  );
};

export default BookCard;
