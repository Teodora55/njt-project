import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const EditBookModal = (props) => {
  const [book, setBook] = useState(props.book);

  const [searchTerm, setSearchTerm] = useState("");
  const [allAuthors, setAllAuthors] = useState([]);
  const [matchingAuthors, setMatchingAuthors] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setMatchingAuthors(
        allAuthors.filter(
          (author) =>
            !book.author.map((a) => a.id).includes(author.id) &&
            (author.firstname
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              author.lastname.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    } else {
      setMatchingAuthors([]);
    }
  }, [searchTerm]);

  const handleAuthorChange = (event, value) => {
    setBook((prev) => ({
      ...prev,
      author: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (props.mode === "edit") editBookHandler();
    else if (props.mode === "add") addBookHandler();
  };

  const editBookHandler = async () => {
    const response = await fetch("http://localhost:8080/book/" + book.id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
    });
    if (response.ok) {
      props.onChange();
    }
  };

  const addBookHandler = async () => {
    const response = await fetch("http://localhost:8080/book", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(book),
    });
    if (response.ok) {
      props.onChange();
    }
  };

  const loadAuthors = async () => {
    const response = await fetch("http://localhost:8080/author/all");
    const data = await response.json();
    for (const key in data) {
      const author = {
        id: data[key].id,
        firstname: data[key].firstname,
        lastname: data[key].lastname,
      };
      setAllAuthors((prev) => [...prev, author]);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, [book]);

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
            options={matchingAuthors}
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
        <FormControl
          fullWidth
          sx={{ marginBottom: "16px" }}
          className="modal-element"
        >
          <InputLabel id="genre-label">Book Genre</InputLabel>
          <Select
            labelId="genre-label"
            value={book.genre}
            onChange={(e) =>
              setBook((prev) => ({ ...prev, genre: e.target.value }))
            }
            label="Book Genre"
          >
            <MenuItem value="ADVENTURE">Adventure</MenuItem>
            <MenuItem value="COMEDY">Comedy</MenuItem>
            <MenuItem value="HORROR">Horror</MenuItem>
            <MenuItem value="ACTION">Action</MenuItem>
            <MenuItem value="BIOGRAPHY">Biography</MenuItem>
            <MenuItem value="CLASSIC">Classic</MenuItem>
            <MenuItem value="FANTASY">Fantasy</MenuItem>
            <MenuItem value="CRIME">Crime</MenuItem>
          </Select>
        </FormControl>
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
