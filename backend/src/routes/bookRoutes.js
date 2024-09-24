const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
} = require("../controllers/bookControllers");
const { protect } = require("../middlewares/authMiddleware"); // Import Auth Middleware
const upload = require("../middlewares/uploadMiddleware"); // Import Shared Multer Middleware

const router = express.Router();

// Add a new book (Protected route)
router.post("/", protect, upload.single("image"), addBook);

// Get all books (Public route)
router.get("/", getBooks);

// Get book by ID (Public route)
router.get("/:id", getBookById);

// Update a book (Protected route)
router.put("/:id", protect, upload.single("image"), updateBook);

// Delete a book (Protected route)
router.delete("/:id", protect, deleteBook);

// Borrow a book (Protected route)
router.post("/:id/borrow", protect, borrowBook);

// Return a book (Protected route)
router.post("/:id/return", protect, returnBook);

module.exports = router;
