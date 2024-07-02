import { useEffect, useState } from "react";
import BookGrid from "./BookGrid";
import BookFilter from "./BookFilter";
import SearchBar from "../UI/SearchBar";
import "./../css/BookPage.css";

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [filters, setFilters] = useState({
    authors: [],
    bookshelves: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchBookShelves();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        return (
          book.author.some((bookAuthor) =>
            filters.authors.includes(
              bookAuthor.firstname + " " + bookAuthor.lastname
            )
          ) ||
          book.bookshelves.some((shelf) =>
            filters.bookshelves.includes(shelf.name)
          ) ||
          book.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }, [books, filters, searchTerm]);

  const fetchBooks = async () => {
    fetch("http://localhost:8080/book/all", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  const fetchAuthors = async () => {
    fetch("http://localhost:8080/author/all", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        setAuthors(
          data.map((author) => author.firstname + " " + author.lastname)
        )
      )
      .catch((error) => console.error("Error fetching authors:", error));
  };

  const fetchBookShelves = async () => {
    fetch("http://localhost:8080/bookshelf/all", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setBookshelves(data.map((bookshelf) => bookshelf.name)))
      .catch((error) => console.error("Error fetching bookshelves:", error));
  };

  const handleFilterChange = (name, checked) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (authors.includes(name)) {
        newFilters.authors = checked
          ? [...newFilters.authors, name]
          : newFilters.authors.filter((author) => author !== name);
      } else if (bookshelves.includes(name)) {
        newFilters.bookshelves = checked
          ? [...newFilters.bookshelves, name]
          : newFilters.bookshelves.filter((shelf) => shelf !== name);
      }
      return newFilters;
    });
  };

  return (
    <div className="container">
      <div className="search-bar-container">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <BookFilter
        authors={authors}
        bookshelves={bookshelves}
        onFilterChange={handleFilterChange}
      />
      <div className="content">
        <BookGrid
          books={
            filters.authors.length === 0 && filters.bookshelves.length === 0
              ? books
              : filteredBooks
          }
        />
      </div>
    </div>
  );
};

export default BookPage;
