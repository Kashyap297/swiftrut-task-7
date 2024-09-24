import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance for API requests

const EditBook = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
    availableCopies: 1,
  });
  const [image, setImage] = useState(null); // State for storing the new image
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch the current book details using the book ID
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await api.get(`/books/${id}`);
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          genre: book.genre,
          publicationDate: book.publicationDate.split("T")[0], // Format for date input
          availableCopies: book.availableCopies,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setError("Failed to load book details.");
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle input changes for the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for the image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("author", formData.author);
    updatedData.append("genre", formData.genre);
    updatedData.append("publicationDate", formData.publicationDate);
    updatedData.append("availableCopies", formData.availableCopies);

    if (image) {
      updatedData.append("image", image); // Append the image only if it's updated
    }

    try {
      await api.put(`/books/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // For handling file uploads
        },
      });
      navigate("/my-books"); // Redirect to "My Books" page after successful update
    } catch (error) {
      console.error("Error updating the book:", error);
      setError("Failed to update the book. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Book</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Publication Date</label>
          <input
            type="date"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload New Image</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
