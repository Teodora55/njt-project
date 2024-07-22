import { useContext, useEffect, useReducer, useState } from "react";
import { UserContext } from "../../context/UserContext";

const modalReducer = (state, action) => {
  if (action.type === "SHOW_EDIT_MODAL") {
    return {
      mode: "edit",
      showing: true,
      book: action.book,
    };
  }
  if (action.type === "SHOW_ADD_MODAL") {
    return {
      mode: "add",
      showing: true,
      book: {},
    };
  }
  if (action.type === "CLOSE_MODAL") {
    return {
      showing: false,
    };
  }
  return { mode: "", showing: false, book: {} };
};

const useBook = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookshelves, setBookshelves] = useState([]);
  const [filters, setFilters] = useState({
    authors: [],
    bookshelves: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    mode: "",
    showing: false,
    book: {},
  });
  const [availableToRent, setAvailableToRent] = useState({
    message: "",
    available: false,
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchBookShelves();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) => {
        return (
          book.authors.some((bookAuthor) =>
            filters.authors.includes(
              bookAuthor.firstname + " " + bookAuthor.lastname
            )
          ) ||
          book.bookshelves.some((shelf) =>
            filters.bookshelves.includes(shelf.name)
          ) ||
          (searchTerm !== "" &&
            book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      })
    );
  }, [books, filters, searchTerm]);

  const fetchBooks = async () => {
    const response = await fetch("http://localhost:8080/book/all", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setBooks(data);
    } else {
      console.error("Error fetching books");
    }
  };

  const fetchAuthors = async () => {
    const response = await fetch("http://localhost:8080/author/all", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setAuthors(
        data.map((author) => author.firstname + " " + author.lastname)
      );
    } else {
      console.error("Error fetching books");
    }
  };

  const fetchBookShelves = async () => {
    const response = await fetch("http://localhost:8080/bookshelf/all", {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setBookshelves(data.map((bookshelf) => bookshelf.name));
    } else {
      console.error("Error fetching books");
    }
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

  const handleCloseMessageModal = () => setShowMessageModal(false);

  const editBookHandler = (id) => {
    const book = books.find((el) => {
      return el.id === id;
    });
    dispatchModal({ type: "SHOW_EDIT_MODAL", book: book });
  };

  const bookToRentHandler = async (id) => {
    const book = books.find((el) => {
      return el.id === id;
    });
    setAvailableToRent({
      available: false,
      message: `Sorry, '${book.name}' is currently not available`,
    });
    const response = await fetch(
      `http://localhost:8080/bookCopies/available/${id}`,
      {
        credentials: "include",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data > 0)
        setAvailableToRent({
          available: true,
          message: `Do you want to rent '${book.name}'?`,
        });
      dispatchModal({ type: "SHOW_EDIT_MODAL", book: book });
    }
  };

  const addBookHandler = () => {
    dispatchModal({ type: "SHOW_ADD_MODAL" });
  };

  const handleCloseActionModal = () => {
    dispatchModal({ type: "CLOSE_MODAL" });
    fetchBooks();
  };

  const handleBorrowBook = async () => {
    const url = new URL("http://localhost:8080/rental/borrow");
    const response = await fetch(url, {
      method: "POST",
      body: modalState.book.id,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });
    dispatchModal({ type: "CLOSE_MODAL" });
    setShowMessageModal(true);
    if (response.status === 201) {
      setModalMessage(`'${modalState.book.name}' is successfully rented!`);
    } else if (response.status === 208) {
      setModalMessage(`You have already rented '${modalState.book.name}'!`);
    } else {
      setModalMessage(`There were problem renting book`);
    }
  };

  return {
    user,
    books,
    filteredBooks,
    authors,
    bookshelves,
    filters,
    searchTerm,
    modalMessage,
    showMessageModal,
    modalState,
    availableToRent,
    setSearchTerm,
    handleFilterChange,
    handleCloseMessageModal,
    handleBorrowBook,
    editBookHandler,
    bookToRentHandler,
    addBookHandler,
    handleCloseActionModal,
  };
};

export default useBook;
