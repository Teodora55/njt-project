import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
      book: { name: "", authors: [], bookshelves: [] },
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

  const fetchData = async (url, onSuccess, errorMessage) => {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else {
      console.error(errorMessage);
    }
  };

  const fetchBooks = useCallback(async () => {
    fetchData(
      "http://localhost:8080/book/all",
      setBooks,
      "Error fetching books"
    );
  }, []);

  const fetchAuthors = useCallback(async () => {
    fetchData(
      "http://localhost:8080/author/all",
      (data) =>
        setAuthors(
          data.map((author) => author.firstname + " " + author.lastname)
        ),
      "Error fetching authors"
    );
  }, []);

  const fetchBookShelves = useCallback(async () => {
    fetchData(
      "http://localhost:8080/bookshelf/all",
      (data) => setBookshelves(data.map((bookshelf) => bookshelf.name)),
      "Error fetching books"
    );
  }, []);

  useEffect(() => {
    fetchBooks();
    fetchAuthors();
    fetchBookShelves();
  }, [fetchBooks, fetchAuthors, fetchBookShelves]);

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

  const handleOpenMessageModal = (message) => {
    setShowMessageModal(true);
    setModalMessage(message);
  };

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

  const handleCloseActionModal = (message = null) => {
    dispatchModal({ type: "CLOSE_MODAL" });
    if (message) handleOpenMessageModal(message);
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
    const data = await response.text();
    handleOpenMessageModal(data);
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
    fetchAuthors,
    fetchBookShelves,
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
