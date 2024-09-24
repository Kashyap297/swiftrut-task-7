// src/components/BookCard.js
import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="border p-4 rounded shadow-md">
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
