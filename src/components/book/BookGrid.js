import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

const BookGrid = ({ books }) => {
  const handleClick = async (id) => {
    const url = new URL("http://localhost:8080/rental/borrow");
    const response = await fetch(url, {
      method: "POST",
      body: id,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      credentials: "include",
    });

    if (response.ok) {
      // const data = await response.json();
    } else {
    }
  };

  return (
    <Grid container spacing={3} className="book-grid">
      {books.map((book) => (
        <Grid item key={book.id} xs={6} sm={4} md={3} className="book-block">
          <Card onClick={() => handleClick(book.id)}>
            <CardMedia
              component="img"
              alt={book.name}
              height="140"
              image={book.coverUrl}
              title={book.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="book-name"
              >
                {book.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookGrid;
