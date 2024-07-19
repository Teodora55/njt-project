import React from "react";
import Books from "./Books";
import BookFilter from "./BookFilter";
import SearchBar from "../UI/SearchBar";
import Modal from "../modals/Modal";
import useBook from "../hooks/BookHook";
import "./../css/BookPage.css";
import { Button, Typography } from "@mui/material";
import EditBookModal from "../modals/BookEditModal";
import RentBookModal from "../modals/RentBookModal";

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
    availableToRent,
    setSearchTerm,
    handleFilterChange,
    handleCloseMessageModal,
    handleBorrowBook,
    editBookHandler,
    bookToRentHandler,
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
        {user.role === "ADMIN" && (
          <Button
            variant="contained"
            className="add-button"
            onClick={addBookHandler}
          >
            Add book
          </Button>
        )}
        <Books
          books={
            filters.authors.length === 0 &&
            filters.bookshelves.length === 0 &&
            searchTerm === ""
              ? books
              : filteredBooks
          }
          onClick={user.role === "ADMIN" ? editBookHandler : bookToRentHandler}
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
      {modalState.showing && user.role === "USER" && (
        <Modal onClose={handleCloseActionModal}>
          <RentBookModal
            message={availableToRent.message}
            availableRent={availableToRent.available}
            handleRent={handleBorrowBook}
          />
        </Modal>
      )}
    </div>
  );
};

export default BookPage;
