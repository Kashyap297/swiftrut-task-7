const Book = require("../models/bookModel");
const multer = require("multer");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Create Book with Image Upload
const addBook = async (req, res) => {
  try {
    const { title, author, genre, publicationDate } = req.body;

    // Get image URL from Multer
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const book = await Book.create({
      title,
      author,
      genre,
      publicationDate,
      imageUrl, // Save image URL to the database
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error });
  }
};

// Update Book with Image Upload
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, genre, publicationDate } = req.body;

    // Update fields
    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationDate = publicationDate || book.publicationDate;

    // Update image if new image is uploaded
    if (req.file) {
      book.imageUrl = `/uploads/${req.file.filename}`;
    }

    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Optionally: Add authorization check if only the creator can delete it
    // if (book.author.toString() !== req.user.id) {
    //   return res.status(401).json({ message: "User not authorized" });
    // }

    await Book.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};

// Borrow book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (!book.available) {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    book.available = false;
    book.borrowedBy = req.user.id;
    await book.save();

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};

// Return book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.available) {
      return res.status(400).json({ message: "Book is not borrowed" });
    }

    book.available = true;
    book.borrowedBy = null;
    await book.save();

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error returning book", error });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
};
