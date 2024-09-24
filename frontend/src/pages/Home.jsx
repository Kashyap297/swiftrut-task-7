// src/pages/Home.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Ensure API instance is imported
import BookCard from "../components/BookCard"; // Import BookCard component

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all books from backend API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/books");
        setBooks(response.data); // Store fetched books in state
        setLoading(false);
      } catch (err) {
        setError("Error fetching books");
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Explore Our Popular Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
