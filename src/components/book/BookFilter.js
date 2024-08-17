import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "../modals/Modal";
import AuthorModal from "../modals/AuthorModal";
import BookshelfModal from "../modals/BookshelfModal";
import { useBookFilter } from "../hooks/BookFilterHook";

const BookFilter = ({
  authors,
  bookshelves,
  onFilterChange,
  fetchAuthors,
  fetchBookShelves,
}) => {
  const {
    user,
    showAuthorModal,
    setShowAuthorModal,
    showBookshelfModal,
    setShowBookshelfModal,
    showMessageModal,
    message,
    handleFilterChange,
    handleCloseModal,
    handleCloseMessageModal,
    changeHandler,
  } = useBookFilter(fetchAuthors, fetchBookShelves, onFilterChange);

  return (
    <div className="sidebar">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="authors-content"
          id="authors-header"
        >
          <Typography variant="h5" fontFamily={"Georgia"}>
            Authors
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {authors.map((author) => (
                <FormControlLabel
                  key={author}
                  className="option"
                  control={
                    <Checkbox name={author} onChange={handleFilterChange} />
                  }
                  label={author}
                />
              ))}
              {user.role === "ADMIN" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowAuthorModal(true)}
                  sx={{ marginTop: 2 }}
                >
                  + Add Author
                </Button>
              )}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="bookshelves-content"
          id="bookshelves-header"
        >
          <Typography variant="h5" fontFamily={"Georgia"}>
            Bookshelves
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormGroup>
              {bookshelves.map((shelf) => (
                <FormControlLabel
                  key={shelf}
                  control={
                    <Checkbox name={shelf} onChange={handleFilterChange} />
                  }
                  label={shelf}
                />
              ))}
              {user.role === "ADMIN" && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowBookshelfModal(true)}
                  sx={{ marginTop: 2 }}
                >
                  + Add Bookshelf
                </Button>
              )}
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      {showAuthorModal && (
        <Modal onClose={handleCloseModal}>
          <AuthorModal onChange={changeHandler} />
        </Modal>
      )}
      {showBookshelfModal && (
        <Modal onClose={handleCloseModal}>
          <BookshelfModal onChange={changeHandler} />
        </Modal>
      )}
      {showMessageModal && (
        <Modal onClose={handleCloseMessageModal}>
          <Typography variant="h6" className="message">
            {message}
          </Typography>
        </Modal>
      )}
    </div>
  );
};

export default BookFilter;
