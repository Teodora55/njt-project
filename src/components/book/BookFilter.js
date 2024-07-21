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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BookFilter = ({ authors, bookshelves, onFilterChange }) => {
  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    onFilterChange(name, checked);
  };

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
            </FormGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default BookFilter;
