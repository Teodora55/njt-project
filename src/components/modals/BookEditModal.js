import React from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import useBookModal from "../hooks/BookModalHook";

const EditBookModal = (props) => {
  const {
    book,
    matchingAuthorsAndBookshelfs,
    setSearchAuthor,
    setSearchBookshelf,
    handleAuthorChange,
    handleBookshelfChange,
    submitHandler,
    setBook,
  } = useBookModal(props.book, props.mode, props.onChange);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="hidden" name="id" value={book.id} />
        <Typography variant="h6" className="modal-element">
          Book Information
        </Typography>
        <TextField
          variant="outlined"
          label="Book Name"
          className="modal-element"
          value={book.name}
          onChange={(e) =>
            setBook((prev) => ({ ...prev, name: e.target.value }))
          }
          fullWidth
          sx={{ marginBottom: "16px" }}
        />
        <Box sx={{ width: 500 }} className="modal-element">
          <Autocomplete
            multiple
            options={matchingAuthorsAndBookshelfs.authors}
            getOptionLabel={(option) =>
              option.lastname + " " + option.firstname
            }
            value={book.author}
            onChange={handleAuthorChange}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search for an author"
                placeholder="Type to search"
                onChange={(e) => setSearchAuthor(e.target.value)}
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
        <Box sx={{ width: 500 }} className="modal-element">
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
        <div>
          {props.mode === "add" && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="modal-element"
              id="add"
              sx={{ marginTop: "16px" }}
            >
              Add
            </Button>
          )}
          {props.mode === "edit" && (
            <Button
              type="submit"
              variant="contained"
              color="warning"
              className="modal-element"
              id="edit"
              sx={{ marginTop: "16px" }}
            >
              Edit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditBookModal;
