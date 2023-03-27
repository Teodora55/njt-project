import { useCallback, useEffect, useState, useReducer } from "react";
import Book from "./Book";
import EditBookModal from "./modals/BookEditModal";
import Modal from "./modals/Modal";

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
      book:{}
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
    const response = await fetch(
      "http://localhost:8080/spring/api/book/" + id,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      setBooks((prev) => prev.filter((book) => book.id !== id));
    }
  };

  const rentBookHandler = async (id) => {
    const customerId = 0;
    const response = await fetch(
      "http://localhost:8080/spring/api/rental/customers/" + customerId + "/books/" + id + "/borrow",
      {
        method: "POST",
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
    const response = await fetch("http://localhost:8080/spring/api/book");
    if (response.ok) {
      setBooks([]);
      const data = await response.json();
      for (const key in data) {
        const book = {
          id: data[key].id,
          isbn: data[key].isbn,
          name: data[key].name,
          author: data[key].author,
          numPages: data[key].numPages,
          genre: data[key].genre,
        };
        setBooks((prev) => [...prev, book]);
      }
    }
  }, []);

  useEffect(() => {
    fillTable();
  }, [fillTable]);

  const changeHandler = () => {
    closeHandler();
    fillTable();
  };

  return (
    <>
      <table id="bookTable" className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">ISBN</th>
            <th scope="col">Number of Pages</th>
            <th scope="col">Genre</th>
            <th scope="col"><button onClick={addBookHandler} className="open-AddBookDialog-2 btn btn-primary">Add</button></th>
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
