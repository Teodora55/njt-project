import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const BookCopyModal = ({ book, onChange }) => {
  const [bookCopy, setBookCopy] = useState({
    book: book,
    isbn: "",
  });
  const [isIsbnValid, setIsIsbnValid] = useState(true);

  const addBookCopyHandler = async () => {
    if (!validateInput()) return;
    const response = await fetch("http://localhost:8080/bookCopies", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(bookCopy),
      credentials: "include",
    });
    const data = await response.text();
    onChange(data);
  };

  const validateInput = () => {
    const nameRegex = /^(?:\d{10}|\d{13})$/;
    const valid = nameRegex.test(bookCopy.isbn);
    setIsIsbnValid(valid);
    return valid;
  };

  return (
    <Box className="modal-body">
      <TextField
        variant="outlined"
        label="Isbn"
        className="modal-element"
        value={bookCopy.isbn}
        onChange={(e) =>
          setBookCopy((prev) => ({ ...prev, isbn: e.target.value }))
        }
        fullWidth
        error={!isIsbnValid}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className="modal-element"
        onClick={addBookCopyHandler}
      >
        Add
      </Button>
    </Box>
  );
};

export default BookCopyModal;
