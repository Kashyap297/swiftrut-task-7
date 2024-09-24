const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String },
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // references the user who borrowed it
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
