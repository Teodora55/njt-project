import { TextField } from "@mui/material";
import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      placeholder="Search..."
      value={searchTerm}
      onChange={onSearchChange}
      className="search-bar"
    />
  );
};

export default SearchBar;
