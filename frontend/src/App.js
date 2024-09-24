import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { AuthProvider } from "./context/AuthContext";
import AddBook from "./pages/AddBook"; // New page for adding e-books
import MyBooks from "./pages/MyBooks"; // New page to view user-specific books
import MyBorrowedBooks from "./pages/MyBorrowedBooks"; // New page for borrowed books
import EditBook from "./pages/EditBook"; // Import the EditBook component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Public routes for Login and Register */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/my-books" element={<MyBooks />} />
              <Route path="/my-borrowed-books" element={<MyBorrowedBooks />} />
              <Route path="/edit-book/:id" element={<EditBook />} />{" "}
              {/* Edit book route */}
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
