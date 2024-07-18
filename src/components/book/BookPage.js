import React from "react";
import Books from "./Books";
import BookFilter from "./BookFilter";
import SearchBar from "../UI/SearchBar";
import Modal from "../modals/Modal";
import useBook from "../hooks/BookHook";
import "./../css/BookPage.css";
import { Button, Typography } from "@mui/material";
import EditBookModal from "../modals/BookEditModal";

const BookPage = () => {
  const {
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
    setSearchTerm,
    handleFilterChange,
    handleCloseMessageModal,
    handleBorrowBook,
    editBookHandler,
    addBookHandler,
    handleCloseActionModal,
  } = useBook();

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
        <Button
          variant="contained"
          className="add-button"
          onClick={addBookHandler}
        >
          Add book
        </Button>
        <Books
          books={
            filters.authors.length === 0 &&
            filters.bookshelves.length === 0 &&
            searchTerm === ""
              ? books
              : filteredBooks
          }
          onClick={editBookHandler}
        />
      </div>
      {showMessageModal && (
        <Modal onClose={handleCloseMessageModal}>
          <Typography variant="h6" className="title">
            {modalMessage}
          </Typography>
        </Modal>
      )}
      {modalState.showing && user.role === "ADMIN" && (
        <Modal onClose={handleCloseActionModal}>
          <EditBookModal
            mode={modalState.mode}
            book={modalState.book}
            onChange={handleCloseActionModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookPage;
