import React from "react";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

const BookFilter = ({ authors, bookshelves, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange(name, checked);
  };

  return (
    <div className="sidebar">
      <div className="filter-group">
        <Typography variant="h6">Authors</Typography>
        <FormControl component="fieldset">
          <FormGroup>
            {authors.map((author) => (
              <FormControlLabel
                key={author}
                control={
                  <Checkbox name={author} onChange={handleFilterChange} />
                }
                label={author}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
      <div className="filter-group">
        <Typography variant="h6">Bookshelves</Typography>
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
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default BookFilter;
