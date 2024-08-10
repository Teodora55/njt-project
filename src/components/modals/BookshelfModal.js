import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";

const BookshelfModal = ({ onChange }) => {
  const [bookshelf, setBookshelf] = useState({
    name: "",
  });
  const [isBookshelfValid, setIsBookshelfValid] = useState(true);

  const addBookshelfHandler = async () => {
    if (!validateInput()) return;
    const response = await fetch("http://localhost:8080/bookshelf", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(bookshelf),
      credentials: "include",
    });
    const data = await response.text();
    onChange(data);
  };

  const validateInput = () => {
    const nameRegex = /^[a-zA-Z0-9 .,:;-]{2,30}$/;
    const validBookshelf = nameRegex.test(bookshelf.name);
    setIsBookshelfValid(validBookshelf);
    return validBookshelf;
  };

  return (
    <Box className="modal-body">
      <TextField
        variant="outlined"
        label="Bookshelf"
        className="modal-element"
        value={bookshelf.name}
        onChange={(e) =>
          setBookshelf((prev) => ({ ...prev, name: e.target.value }))
        }
        fullWidth
        error={!isBookshelfValid}
      />
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className="modal-element"
        onClick={addBookshelfHandler}
      >
        Add
      </Button>
    </Box>
  );
};

export default BookshelfModal;
