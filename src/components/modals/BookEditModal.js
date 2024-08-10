import React from "react";
import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import useBookModal from "../hooks/BookModalHook";

const EditBookModal = (props) => {
  const {
    book,
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
  } = useBookModal(props.book, props.onChange);

  return (
    <Box className="modal-body">
      <TextField
        variant="outlined"
        label="Book Name"
        className="modal-element"
        value={book.name}
        onChange={(e) => setBook((prev) => ({ ...prev, name: e.target.value }))}
        fullWidth
        error={!isValidInput.name}
      />
      <Box className="modal-element">
        <Autocomplete
          multiple
          options={matchingAuthorsAndBookshelfs.authors}
          getOptionLabel={(option) => option.lastname + " " + option.firstname}
          value={book.authors}
          onChange={handleAuthorChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search for an author"
              placeholder="Type to search"
              onChange={(e) => setSearchAuthor(e.target.value)}
              error={!isValidInput.authors}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option.id}
                label={option.lastname + " " + option.firstname}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </Box>
      <Box className="modal-element">
        <Autocomplete
          multiple
          options={matchingAuthorsAndBookshelfs.bookshelves}
          getOptionLabel={(option) => option.name}
          value={book.bookshelves}
          onChange={handleBookshelfChange}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Search for an bookshelf"
              placeholder="Type to search"
              onChange={(e) => setSearchBookshelf(e.target.value)}
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={option.id}
                label={option.name}
                {...getTagProps({ index })}
              />
            ))
          }
        />
      </Box>
      <Button
        variant="contained"
        component="label"
        fullWidth
        className="modal-element"
      >
        Upload Book Cover
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      <Box>
        {props.mode === "add" && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className="modal-element"
            onClick={addBookHandler}
          >
            Add
          </Button>
        )}
        {props.mode === "edit" && (
          <Button
            variant="contained"
            color="warning"
            fullWidth
            className="modal-element"
            onClick={editBookHandler}
          >
            Edit
          </Button>
        )}
        {props.mode === "edit" && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            className="modal-element"
            onClick={deleteBookHandler}
          >
            Delete
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default EditBookModal;
