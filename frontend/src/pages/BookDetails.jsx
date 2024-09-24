// src/pages/BookDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api"; // Import API instance

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`); // Fetch book details by ID
        setBook(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching book details");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

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
        </div>
      )}
    </div>
  );
};

export default BookDetails;
