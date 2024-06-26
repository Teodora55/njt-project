import {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useContext,
} from "react";
import Book from "./Book";
import EditBookModal from "./modals/BookEditModal";
import Modal from "./modals/Modal";
import { UserContext } from "../context/UserContext";

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

const BooksTable = (props) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(false);
  const { user } = useContext(UserContext);
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    mode: "",
    showing: false,
    book: {},
  });

  const editBookHandler = (id) => {
    const book = books.find((el) => {
      return el.id === id;
    });
    dispatchModal({ type: "SHOW_EDIT_MODAL", book: book });
  };

  const deleteBookHandler = async (id) => {
    const response = await fetch("http://localhost:8080/book/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const rentBookHandler = async (id) => {
    const response = await fetch(
      "http://localhost:8080/rental/customers/" +
        user.customerId +
        "/books/" +
        id +
        "/borrow",
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (response.ok) {
      props.onRentBook();
    }
  };

  const addBookHandler = () => {
    dispatchModal({ type: "SHOW_ADD_MODAL" });
  };

  const closeHandler = () => {
    dispatchModal({ type: "CLOSE_MODAL" });
  };

  const fillTable = useCallback(async () => {
    const url = new URL("http://localhost:8080/book/all");
    if (filter !== "") url.searchParams.append("filter", filter);

    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      setBooks([]);
      setError(false);
      const data = await response.json();
      for (const key in data) {
        const book = {
          id: data[key].id,
          name: data[key].name,
          author: data[key].author,
          price: data[key].price,
          genre: data[key].genre,
        };
        setBooks((prev) => [...prev, book]);
      }
    } else {
      setError(true);
    }
  }, [filter]);

  useEffect(() => {
    fillTable();
  }, []);

  const changeHandler = () => {
    closeHandler();
    fillTable();
  };

  return (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search Here"
          id="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      {error && <h1>No books found</h1>}
      {!error && (
        <table id="bookTable" className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Genre</th>
              <th scope="col">
                <button
                  onClick={addBookHandler}
                  className="open-AddBookDialog-2 btn btn-primary"
                >
                  Add
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onEditBook={() => {
                  editBookHandler(book.id);
                }}
                onDeleteBook={() => {
                  deleteBookHandler(book.id);
                }}
                onRentBook={() => {
                  rentBookHandler(book.id);
                }}
              />
            ))}
          </tbody>
        </table>
      )}
      {modalState.showing && (
        <Modal onClose={closeHandler}>
          <EditBookModal
            mode={modalState.mode}
            book={modalState.book}
            onChange={changeHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default BooksTable;
