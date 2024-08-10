import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { AuthorModalHook } from "../hooks/AuthorModalHook";

const AuthorModal = ({ onChange }) => {
  const { author, setAuthor, isAuthorValid, addAuthorHandler } =
    AuthorModalHook();

  return (
    <Box className="modal-body">
      <TextField
        variant="outlined"
        label="Firstname"
        className="modal-element"
        value={author.firstname}
        onChange={(e) =>
          setAuthor((prev) => ({ ...prev, firstname: e.target.value }))
        }
        fullWidth
        error={!isAuthorValid.firstname}
      />
      <TextField
        variant="outlined"
        label="Lastname"
        className="modal-element"
        value={author.lastname}
        onChange={(e) =>
          setAuthor((prev) => ({ ...prev, lastname: e.target.value }))
        }
        fullWidth
        error={!isAuthorValid.lastname}
      />
      <Box className="modal-element" sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          variant="outlined"
          label="Year of Birth"
          type="number"
          value={author.yearOfBirth}
          onChange={(e) =>
            setAuthor((prev) => ({ ...prev, yearOfBirth: e.target.value }))
          }
          fullWidth
          error={!isAuthorValid.yearOfBirth}
        />
        <TextField
          variant="outlined"
          label="Year of Death"
          type="number"
          value={author.yearOfDeath}
          onChange={(e) =>
            setAuthor((prev) => ({ ...prev, yearOfDeath: e.target.value }))
          }
          fullWidth
          error={!isAuthorValid.yearOfDeath}
        />
      </Box>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        className="modal-element"
        onClick={() => addAuthorHandler(onChange)}
      >
        Add
      </Button>
    </Box>
  );
};

export default AuthorModal;
