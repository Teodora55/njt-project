import { useState, useEffect } from "react";

const useBookModal = (initialBook, onChange) => {
  const [book, setBook] = useState(initialBook);
  const [file, setFile] = useState(null);
  const [isValidInput, setIsValidInput] = useState({
    name: true,
    authors: true,
  });
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
            (!book.authors ||
              !book.authors.map((a) => a.id).includes(author.id)) &&
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
  }, [searchAuthor, allAuthorsAndBookshelfs, book.authors]);

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
      authors: value,
    }));
  };

  const handleBookshelfChange = (event, value) => {
    setBook((prev) => ({
      ...prev,
      bookshelves: value,
    }));
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const editBookHandler = async () => {
    if (!validateBook()) return;
    const response = await fetch(`http://localhost:8080/book/${book.id}`, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
      credentials: "include",
    });
    if (response.ok) {
      if (file) uploadBookCover();
    }
    const data = await response.text();
    onChange(data);
  };

  const addBookHandler = async () => {
    if (!validateBook()) return;
    const response = await fetch("http://localhost:8080/book", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
      credentials: "include",
    });
    if (response.ok) {
      if (file) uploadBookCover();
    }
    const data = await response.text();
    onChange(data);
  };

  const validateBook = () => {
    const bookRegex = /^[a-zA-Z0-9 .,'!?:;"-]{2,50}$/;
    const validBook = bookRegex.test(book.name);
    const validAuthor = book.authors && book.authors.length > 0;
    setIsValidInput({
      name: validBook,
      authors: validAuthor,
    });
    return validAuthor && validBook;
  };

  const uploadBookCover = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `http://localhost:8080/book/cover/${book.id}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
  };

  const deleteBookHandler = async () => {
    const response = await fetch(`http://localhost:8080/book/${book.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });
    const data = await response.text();
    onChange(data);
  };

  return {
    book,
    searchAuthor,
    searchBookshelf,
    matchingAuthorsAndBookshelfs,
    isValidInput,
    setSearchAuthor,
    setSearchBookshelf,
    handleAuthorChange,
    handleBookshelfChange,
    handleFileChange,
    addBookHandler,
    editBookHandler,
    deleteBookHandler,
    setBook,
  };
};

export default useBookModal;
