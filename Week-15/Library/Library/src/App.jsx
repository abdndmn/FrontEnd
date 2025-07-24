import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import PublisherPage from "./pages/PublisherPage";
import AuthorPage from "./pages/AuthorPage";
import BookPage from "./pages/BookPage";
import CategoryPage from "./pages/CategoryPage";
import BorrowPage from "./pages/BorrowPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/publishers" element={<PublisherPage />} />
            <Route path="/authors" element={<AuthorPage />} />
            <Route path="/books" element={<BookPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/borrows" element={<BorrowPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
