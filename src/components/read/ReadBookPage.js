import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const ReadBooksPage = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchRentals = async () => {
      const response = await fetch(`http://localhost:8080/rental/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setRentals(data);
      } else {
        console.error("Failed to fetch rentals");
      }
    };

    fetchRentals();
  }, []);

  const handleReadBook = async (isbn) => {
    const url = `http://localhost:8080/rental/read/${isbn}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Currently Rented Books
      </Typography>
      <List>
        {rentals.map((rental) => (
          <ListItem
            key={rental.id}
            onClick={() => handleReadBook(rental.bookCopy.isbn)}
          >
            <ListItemText
              primary={rental.bookCopy.book.name}
              secondary={rental.bookCopy.isbn}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ReadBooksPage;
