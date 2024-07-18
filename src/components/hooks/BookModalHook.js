import { useState, useEffect } from "react";

const useBookModal = (initialBook, mode, onChange) => {
  const [book, setBook] = useState(initialBook);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchBookshelf, setSearchBookshelf] = useState("");
  const [allAuthorsAndBookshelfs, setAllAuthorsAndBookshelfs] = useState({
    authors: [],
    bookshelves: [],
  });
  const [matchingAuthorsAndBookshelfs, setMatchingAuthorsAndBookshelfs] =
    useState({
      authors: [],
      bookshelves: [],
    });

  useEffect(() => {
    const loadAuthors = async () => {
      const response = await fetch("http://localhost:8080/author/all", {
        credentials: "include",
      });
      const data = await response.json();
      const authors = data.map((author) => ({
        id: author.id,
        firstname: author.firstname,
        lastname: author.lastname,
      }));
      setAllAuthorsAndBookshelfs((prev) => ({ ...prev, authors }));
    };

    const loadBookshelves = async () => {
      const response = await fetch("http://localhost:8080/bookshelf/all", {
        credentials: "include",
      });
      const data = await response.json();
      const bookshelves = data.map((bookshelf) => ({
        id: bookshelf.id,
        name: bookshelf.name,
      }));
      setAllAuthorsAndBookshelfs((prev) => ({ ...prev, bookshelves }));
    };

    loadAuthors();
    loadBookshelves();
  }, []);

  useEffect(() => {
    if (searchAuthor) {
      setMatchingAuthorsAndBookshelfs((prev) => ({
        ...prev,
        authors: allAuthorsAndBookshelfs.authors.filter(
          (author) =>
            (!book.author ||
              !book.author.map((a) => a.id).includes(author.id)) &&
            (author.firstname
              .toLowerCase()
              .includes(searchAuthor.toLowerCase()) ||
              author.lastname
                .toLowerCase()
                .includes(searchAuthor.toLowerCase()))
        ),
      }));
    } else {
      setMatchingAuthorsAndBookshelfs((prev) => ({
        ...prev,
        authors: [],
      }));
    }
  }, [searchAuthor, allAuthorsAndBookshelfs, book.author]);

  useEffect(() => {
    if (searchBookshelf) {
      setMatchingAuthorsAndBookshelfs((prev) => ({
        ...prev,
        bookshelves: allAuthorsAndBookshelfs.bookshelves.filter(
          (bookshelf) =>
            (!book.bookshelves ||
              !book.bookshelves.map((bs) => bs.id).includes(bookshelf.id)) &&
            bookshelf.name.toLowerCase().includes(searchBookshelf.toLowerCase())
        ),
      }));
    } else {
      setMatchingAuthorsAndBookshelfs((prev) => ({
        ...prev,
        bookshelves: [],
      }));
    }
  }, [searchBookshelf, allAuthorsAndBookshelfs, book.bookshelves]);

  const handleAuthorChange = (event, value) => {
    setBook((prev) => ({
      ...prev,
      author: value,
    }));
  };

  const handleBookshelfChange = (event, value) => {
    setBook((prev) => ({
      ...prev,
      bookshelves: value,
    }));
  };

  const editBookHandler = async () => {
    const response = await fetch("http://localhost:8080/book/" + book.id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
      credentials: "include",
    });
    if (response.ok) {
      onChange();
    }
  };

  const addBookHandler = async () => {
    const response = await fetch("http://localhost:8080/book", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
      credentials: "include",
    });
    if (response.ok) {
      onChange();
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (mode === "edit") editBookHandler();
    else if (mode === "add") addBookHandler();
  };

  return {
    book,
    searchAuthor,
    searchBookshelf,
    matchingAuthorsAndBookshelfs,
    setSearchAuthor,
    setSearchBookshelf,
    handleAuthorChange,
    handleBookshelfChange,
    submitHandler,
    setBook,
  };
};

export default useBookModal;
